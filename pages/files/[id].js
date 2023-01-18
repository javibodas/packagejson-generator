import HomePage from 'pages'
 
export default function File({file: { json, id}, error}){

    return(<HomePage file={{ json, id }} />)
}

export async function getServerSideProps(context) {
    const id = context.params.id

    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/files/' + id)
    const jsonRes = await res.json()
  
    return { props: { file: {json: jsonRes.data.jsonFile, id}, error: jsonRes.error } }
}