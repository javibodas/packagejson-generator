import { useRouter } from 'next/router'
import Avatar from 'src/client/components/Avatar'
import Button from 'src/client/components/Button'
import { User } from 'src/types/User'

type UserOptionsProps = {
	user: User,
	logout(): Promise<void>
}

export default function UserOptions({ user, logout }: UserOptionsProps): JSX.Element {
	const router = useRouter()

	return (<>
		<div className='user'>
			<ul>
				<li><Button click={() => router.push('/users/' + user.id )} testid='btn-user-files'>Files</Button></li>
				<li><Button click={logout} testid='btn-logout'>Logout</Button></li>
			</ul>
			<Avatar avatar={user.avatar}/>
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