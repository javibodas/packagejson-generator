type AvatarProps = {
    avatar: string
}

export default function Avatar({ avatar }: AvatarProps): JSX.Element  {
	return(<>
		<div className='avatar'>
			<img src={avatar ? avatar : 'default-avatar.png'}/>
		</div>
		<style jsx>{`
            .avatar{
                display: flex; flex-direction: row;
                padding: .25rem;
            }

            .avatar img{
                width: 100%; height: 100%;
                height: 49px; width: 49px;
                border-radius: 9999px; border: solid 2px #2DD8E1;
            }

            .avatar img:hover{
                cursor: pointer;
            }
        `}</style>
	</>)
}