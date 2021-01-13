export default function getDependencies(str){
    const  URI = `${process.env.NEXT_PUBLIC_URI_DEPENDENCIES}${str}`
    return fetch(URI).then(res => res.json() )
}