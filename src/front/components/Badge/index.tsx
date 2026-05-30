import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

type BadgeProps = {
    type: string,
    label: string,
    value: string,
    remove(value: string): void
}

export default function Badge({ type, label, value, remove }: BadgeProps): JSX.Element {

	const stylesValuesBadge: Array<string> = ['badge-value-blue', 'badge-value-green']
	const styleValue: string = (type == 'script') ? stylesValuesBadge[1] : stylesValuesBadge[0]

	return(<div className='badge flex flex-row text-center p-0.5 cursor-context-menu lg:text-base text-2xs'>
		<div className='bg-bgray px-1 py-0 border-1 border-solid border-bgray rounded-tl-md rounded-bl-md text-white max-w-[150px] min-h-[15px] line-clamp-1'>
			<span>{label}</span>
		</div>
		{value 
			? <div className={
				(styleValue === 'badge-value-blue' 
					? 'border-t-bblue border-b-bblue bg-bblue' 
					: 'border-t-bgreen border-b-bgreen bg-bgreen') 
                    + ' px-1 py-0 text-white border-solid border-t-1 border-b-1 max-w-[300px] line-clamp-1 min-h-[15px]'}>
				<span>{value}</span>
			</div> 
			: null
		}
		<div className='flex min-h-[15px] px-1 py-0 border-1 border-solid border-red-500 bg-white rounded-tr-md rounded-br-md font-bold text-red-500 hover:cursor-pointer hover:text-white hover:bg-red-500' onClick={() => {remove(label)}}>
			<span className='mx-auto my-0'><FontAwesomeIcon icon={faTrash} size="xs"/></span>
		</div>
	</div>)
}