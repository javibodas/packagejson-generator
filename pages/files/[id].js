import HomePage from 'pages'
 
export default function PackageJson({file, error}){

    return(<HomePage jsonFile={file.jsonFile} />)
}

export async function getServerSideProps(context) {
    const id = context.params.id

    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/files/' + id)
    const jsonRes = await res.json()
  
    return { props: { file: jsonRes.data, error: jsonRes.error } }
}