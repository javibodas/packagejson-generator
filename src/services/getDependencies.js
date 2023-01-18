const getDependencies = (str) => {
    const  URI = `/api/dependencies/${str}`
    return fetch(URI).then(res => res.json() )
}

export default getDependencies