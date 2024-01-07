import { FileDetail } from 'src/client/types/FileDetail'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MouseEvent } from 'react'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

type FileDetailCardProps = {
    fileDetail?: FileDetail
    handleClick(event: MouseEvent<HTMLDivElement>, id?: string): void
    handleDelete?(event: MouseEvent<HTMLSpanElement>, id: string): void
}

export default function FileDetailCard({ fileDetail, handleClick, handleDelete }: FileDetailCardProps): JSX.Element {

	if (!fileDetail)
		return(<div className='flex flex-col bg-white h-[150px] w-[150px] p-8 rounded-[4px] border-solid border-2 border-white hover:cursor-pointer hover:border-garnet hover:text-garnet box-content font-bold' onClick={handleClick} data-testid='file-new'>
			<span className='mx-auto my-auto'><FontAwesomeIcon icon={faPlus} size="8x"/></span>
		</div>)
    
	const { id, name, version, description, createdAt } = fileDetail

	return (<div className='flex flex-col bg-white p-8 rounded-[4px] border-solid border-2 border-white h-[150px] w-[150px] hover:cursor-pointer hover:border-garnet box-content font-bold' onClick={(e) => handleClick(e, id)} data-testid={`file-saved-${id}`}>
		<div className='flex flex-row gap-1'>
			<h3 data-testid="file-title">{name}</h3>
			<span className='font-bold text-garnet self-end text-base' data-testid="file-version">{version}</span>
		</div>
		<div className='flex flex-col h-full'>
			<span className='text-gray-400 text-base h-full'>{description}</span>
			<div className='flex flex-row'>
				<span className='font-bold text-base w-100 mx-auto my-0' data-testid="file-description">{(new Date(createdAt)).toDateString()}</span>
				<span className='hover:text-garnet' onClick={(e) => handleDelete(e, id)}  data-testid={`btn-delete-file-saved-${id}`}><FontAwesomeIcon icon={faTrash} size="lg"/></span>
			</div>
		</div>
	</div>)
}