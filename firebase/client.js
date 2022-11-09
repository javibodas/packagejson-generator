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

  	const { displayName, email, photoURL, uid } = user
  	return { avatar: photoURL, username: displayName, email, uid }
}

export const onAuthStateChanged = (onChange) => {
    return firebase.auth().onAuthStateChanged( user => {
    	const normalizedUser = mapUserFromFirebaseAuth(user)
        onChange(normalizedUser)
    })
}

export const loginWithGithub = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider()
    return firebase.auth().signInWithPopup(githubProvider)
}

export const logoutWithGithub = () => { return firebase.auth().signOut() }

/**  DATABASE FUNCTIONS */

export const addFile = (jsonFile) => {
	return dbService.collection('files').add({
    	jsonFile,
    	createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  	})
}

export const deleteFile = async (fileId) => {
	const result = await dbService.collection('files').doc(fileId)

    return result.delete()
}

export const getFile = async (fileId) => {
	const result = await dbService.collection('files').doc(fileId).get()

    return result.data()
}

export const updateFile = async (fileId, newValue) => {
    const result = await dbService.collection('files').doc(fileId)

    return result.set(newValue)
}

export const getUser = async (userId) => {
    const result = await dbService.collection('users').doc(userId).get()
	
    return result.data()
}

export const removeUserFile = async (userId, fileId) => {
    const user = await getUser(userId)
    const userFileIds = user.files

    const indexOfFileInArray = userFileIds.indexOf(fileId);
    if (indexOfFileInArray > -1) {
        userFileIds.splice(indexOfFileInArray, 1);

        const result = await dbService.collection('users').doc(userId).set({
            files: userFileIds
        })
    }

    return deleteFile(fileId)
}

export const getUsersFiles = async (userId) => {
	const user = await getUser(userId)

    const userFiles = await Promise.all(
        user.files.map(async (fileId) => {
		    const file = await getFile(fileId)
            return {...file, id: fileId}
        })
  	)
    
  	return userFiles
}
