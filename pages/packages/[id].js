import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import {getPackageJsonDB} from 'firebase/client';
 
export default function PackageJson(props){

    const [ jsonFile, setJsonFile ] = useState({})
    const router = useRouter()
    const { id } = router.query

    useEffect(function(){
        
        getPackageJsonDB(id)
        .then((result) => {
            const packageDB = result.data();
            setJsonFile(packageDB.jsonFile);
        })
        .catch((error) => { console.log(error)})

    }, [id])

    return(<div><pre>{JSON.stringify(jsonFile, 0, 4)}</pre></div>)
}