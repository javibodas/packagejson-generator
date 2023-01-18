const getUserFiles = (userId) => {
    const  URI = `/api/user/${userId}`
    return fetch(URI).then(res => res.json() )
}

export default getUserFiles