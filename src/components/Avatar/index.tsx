type AvatarProps = {
    avatar: string
}

export default function Avatar({ avatar }: AvatarProps): JSX.Element  {
	return(<div className='flex flex-row p-1'>
		<img className='w-[49px] h-[49px] rounded-full border-solid border-2 border-garnet cursor-pointer' src={avatar ? avatar : 'default-avatar.png'}/>
	</div>)
}