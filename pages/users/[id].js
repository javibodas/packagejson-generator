import Header from "components/Header"
import FileDetailCard from "components/FileDetailCard"

export default function User({packages, error}){
    return(<>
            <Header />
            <div className='user-files'>
                <FileDetailCard key={0} />
                { packages.map(packageJson => <FileDetailCard key={packageJson.id} id={packageJson.id} fileDetail={packageJson}/>)}
            </div>
            <style>{`
                .user-files {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 20px;

                    max-width: 80%;
                    min-height: 80vh;
                    margin: 0 auto;
                }
            `}</style>
        </>)
}


export async function getServerSideProps(context) {
    const id = context.params.id

    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/user/' + id)
    const jsonRes = await res.json()
  
    return { props: { packages: jsonRes.data, error: jsonRes.error } }
}