import { User } from 'src/client/types/User'
import { useRouter } from 'next/router'
import Avatar from 'src/client/components/Avatar'
import Button from 'src/client/components/Button'

type UserOptionsProps = {
	user: User,
	logout(): Promise<void>
}

export default function UserOptions({ user, logout }: UserOptionsProps): JSX.Element {
	const router = useRouter()

	return (<div className='flex flex-row'>
		<ul className='my-auto mx-0 pr-2 pl-10'>
			<li className='inline'><Button click={() => router.push('/users/' + user.id )} testid='btn-user-files'>Files</Button></li>
			<li className='inline'><Button click={logout} testid='btn-logout'>Logout</Button></li>
		</ul>
		<Avatar avatar={user.avatar}/>
	</div>)
}