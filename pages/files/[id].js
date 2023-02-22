import HomePage from 'pages'
import getFile from 'src/client/services/getFile'
 
export default function File({ json, id, createdBy, isPrivate }){

	return(<HomePage file={{ json, id, createdBy, isPrivate }} />)
}

export async function getServerSideProps(context) {
	const id = context.params.id

	try {
		const data = await getFile(id)

		if (data.error) throw new Error()

		return { props: { ...data }}
	} catch (e) {
		return {
			notFound: true
		}
	}
}