import firebase from 'firebase'

const firebaseConfig = {
	apiKey: 'AIzaSyCTPdoKcFz1gsJNzL_uLHnorMmcWZPtoAo',
	authDomain: 'packagejson-generator.firebaseapp.com',
	databaseURL: 'https://packagejson-generator.firebaseio.com',
	projectId: 'packagejson-generator',
	storageBucket: 'packagejson-generator.appspot.com',
	messagingSenderId: '320777149161',
	appId: '1:320777149161:web:aeca9003110f8ff17e6e78',
	measurementId: 'G-3D5B9YKHE9'
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const dbService = firebase.firestore()

/** LOGIN FUNCTIONS */

const mapUserFromFirebaseAuth = (user) => {
	console.log(firebase.auth().currentUser)
	if (!user) return null

	return { 
		avatar: user.photoURL, 
		username: user.displayName, 
		email: user.email, 
		uid: user.uid
	}
}

export const onAuthStateChanged = (onChange) => { 
	return firebase.auth().onAuthStateChanged((user) => { 
		onChange(mapUserFromFirebaseAuth(user))
	}) 
}

export const loginWithGithub = async () => { 
	const result = await firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())
	const { user } = result

	const userDB = await dbService.collection('users').doc(user.uid).get()
	if (!userDB.exists) await addUser(user.uid)

	return { ...mapUserFromFirebaseAuth(user) }
}

export const logoutWithGithub = () => { return firebase.auth().signOut() }

/**  DATABASE FUNCTIONS */

export const userExists = async (userId) => {
	const user = await dbService.collection('users').doc(userId).get()
	return user.exists
}

export const fileExists = async (fileId) => {
	const file = await dbService.collection('files').doc(fileId).get()

	return file.exists
}

export const fileExistsInUser = async (fileId, userId) => {
	const user = await getUser(userId)

	return user.files.filter((file) => file.id === fileId).length > 0
}

export const createFile = async (jsonFile) => {
	try {
		const addedFile = await dbService.collection('files').add({
			jsonFile,
			createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
		})

		return addedFile.id
	} catch (e) {
		throw new Error('Internal Error: ' + e.message)
	}
}

export const getFile = async (fileId) => {
	try {
		const file = await (await dbService.collection('files').doc(fileId).get()).data()

		return file
	} catch (e) {
		throw new Error('Internal Error: ' + e.message)
	}
}

export const updateFile = async (fileId, newValue) => {
	try {
		const docFile = await dbService.collection('files').doc(fileId)

		await docFile.update({
			jsonFile: newValue,
			createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
		})
	} catch (e) {
		throw new Error('Internal Error: ' + e.message)
	}
}

export const deleteFile = async (fileId) => {
	try {
		const docFile = await dbService.collection('files').doc(fileId)

		await docFile.delete()
	} catch (e) {
		throw new Error('Internal Error: ' + e.message)
	}
}

export const getUser = async (userId) => {
	try {
		const userRef = await dbService.collection('users').doc(userId).get()
		const user = await userRef.data()
		const { files } = user

		const userFilesForFilter = await Promise.all(
			files.map(async (fileId) => { 
				const exists = await fileExists(fileId)
				return { id: fileId, exists }
			})
		)

		const userFilesFiltered = userFilesForFilter.filter((file) => file.exists)

		const userFiles = await Promise.all(
			userFilesFiltered
				.map(async ({ id }) => {
					const file = await getFile(id)

					return { 
						name: file.jsonFile.name,
						description: file.jsonFile.description,
						version: file.jsonFile.version, 
						createdAt: (new Date(file.createdAt.seconds*1000)).toDateString(), 
						id
					}
				})
		)
    
		return { id: userId, files: userFiles }
	} catch (e) {
		throw new Error('Internal Error: ' + e.message)
	}
}

export const addUser = (userId) => {
	return dbService.collection('users').doc(userId).set({ files: [] })
}

export const addFileToUser = async (userId, fileId) => {
	try {
		const docUser = await dbService.collection('users').doc(userId)

		await docUser.update({
			files: firebase.firestore.FieldValue.arrayUnion(fileId)
		})
	} catch (e) {
		throw new Error('Internal Error: ' + e.message)
	}
}

export const deleteUserFile = async (fileId, userId) => {
	try {
		const docUser = await dbService.collection('users').doc(userId)

		await docUser.update({
			files: firebase.firestore.FieldValue.arrayRemove(fileId)
		})
	} catch(e) {
		throw new Error('Internal error: ' + e.message)
	}
}
