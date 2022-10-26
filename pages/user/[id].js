import Header from "components/Header"

export default function User({packages, error}){
    return(<>
            <Header />
            <div>
                <ul>
                    { packages.map(packageJson => <li key={packageJson.id}>{packageJson.jsonFile.name}</li>) }
                </ul>
            </div>
        </>)
}


export async function getServerSideProps(context) {
    const id = context.params.id

    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/user/' + id)
    const jsonRes = await res.json()
  
    return { props: { packages: jsonRes.data, error: jsonRes.error } }
}