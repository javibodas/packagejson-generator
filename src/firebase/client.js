import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCTPdoKcFz1gsJNzL_uLHnorMmcWZPtoAo",
    authDomain: "packagejson-generator.firebaseapp.com",
    databaseURL: "https://packagejson-generator.firebaseio.com",
    projectId: "packagejson-generator",
    storageBucket: "packagejson-generator.appspot.com",
    messagingSenderId: "320777149161",
    appId: "1:320777149161:web:aeca9003110f8ff17e6e78",
    measurementId: "G-3D5B9YKHE9"
  }

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const dbService = firebase.firestore()

/** LOGIN FUNCTIONS */

const mapUserFromFirebaseAuth = (user) => {
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

export const getFile = async (fileId) => {
	const result = await dbService.collection('files').doc(fileId).get()

    return result.data()
}

export const getUser = async (userId) => {
    const result = await dbService.collection('users').doc(userId).get()

    return result.data()
}

export const getUserFiles = async (userId) => {
	const user = await getUser(userId)

    const userFiles = await Promise.all(
        user.files.map(async (fileId) => {
		    const file = await getFile(fileId)
            return {...file, id: fileId}
        })
  	)
    
  	return userFiles
}

export const addUser = (userId) => {
    return dbService.collection('users').doc(userId).set({ files: [] })
}

export const addFile = (jsonFile) => {
	return dbService.collection('files').add({
    	jsonFile,
    	createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  	})
}

export const addUserFile = async (jsonFile, userId) => {
	const newFile = await addFile(jsonFile)
    
    await dbService.collection('users').doc(userId).update({
        files: firebase.firestore.FieldValue.arrayUnion(newFile.id)
    })

    console.log(newFile)

    return newFile
}

export const updateFile = async (fileId, newValue) => {
    const result = await dbService.collection('files').doc(fileId)

    return result.set(newValue)
}

export const deleteFile = async (fileId) => {
	const result = await dbService.collection('files').doc(fileId)

    return result.delete()
}

export const deleteUserFile = async (fileId, userId) => {
    await dbService.collection('users').doc(userId).update({
        files: firebase.firestore.FieldValue.arrayRemove(fileId)
    })

    return deleteFile(fileId)
}
