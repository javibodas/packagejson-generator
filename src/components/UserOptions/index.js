import { useRouter } from 'next/router'
import Avatar from 'src/components/Avatar'
import Button from 'src/components/Button'

export default function UserOptions({ user, logout }){
	const router = useRouter()

	return (<>
		<div className='user'>
			<ul>
				<li><Button click={() => router.push('/users/' + user.uid )}>Files</Button></li>
				<li><Button click={logout}>Logout</Button></li>
			</ul>
			<Avatar avatar={user.avatar} name={user.username}/>
		</div>
		<style jsx>
			{`
                .user {
                    display: flex;
                    flex-direction: row;
                }

                .user ul {
                    margin: auto 0;
                    padding-right: .5rem;
                }

                .user ul li {
                    display:inline;
                }                
            `}
		</style>
	</>)
}