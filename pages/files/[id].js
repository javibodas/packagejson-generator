import HomePage from 'pages'
import getFile from 'src/client/services/getFile'
 
export default function File({ json, id }){

	return(<HomePage file={{ json, id }} />)
}

export async function getServerSideProps(context) {
	const id = context.params.id

	const data = await getFile(id)
	
	return { props: { ...data }}
}