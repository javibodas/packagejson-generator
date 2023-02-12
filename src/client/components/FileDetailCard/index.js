import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function FileDetailCard({ fileDetail, handleClick, handleDelete }) {

	if (!fileDetail) {
		return(<>
			<div className='file' onClick={handleClick} data-testid='file-new'>
				<span className='file-new'><FontAwesomeIcon icon={faPlus} size="8x"/></span>
			</div>
			<style>{`
                .file {
                    display: flex;
                    flex-direction: column;
                    background-color: white;
                    padding: 2rem;
                    border-radius: 4px;
                    border: 2px solid white;
                    height: 150px;
                    width: 150px;
                }

                .file:hover {
                    cursor: pointer;
                    border: 2px solid #c12127;
                }

                .file .file-new {
                    margin: auto auto;
                }

                .file:hover .file-new {
                    color: #c12127;
                }
            `}</style>
		</>)
	}
    
	const { id, name, version, description, createdAt } = fileDetail

	return (<>
		<div className='file' onClick={(e) => handleClick(e, id)} data-testid={`file-saved-${id}`}>
			<div className='file-title'>
				<h3 data-testid="file-title">{name}</h3>
				<span className='version' data-testid="file-version">{version}</span>
			</div>
			<div className='file-content'>
				<span className='description'>{description}</span>
				<div className='footer'>
					<span className='dateCreation' data-testid="file-description">{(new Date(createdAt)).toDateString()}</span>
					<span className='badge-remove-icon' onClick={(e) => handleDelete(e, id)}  data-testid={`btn-delete-file-saved-${id}`}><FontAwesomeIcon icon={faTrash} size="lg"/></span>
				</div>
			</div>
		</div>
		<style>{`
                .file {
                    display: flex;
                    flex-direction: column;
                    background-color: white;
                    padding: 2rem;
                    border-radius: 4px;
                    border: 2px solid white;
                    height: 150px;
                    width: 150px;
                }

                .file:hover {
                    cursor: pointer;
                    border: 2px solid #c12127;
                }

                .file .file-title {
                    display: flex;
                    flex-direction: row;
                    gap: 0.2rem;
                }

                .file .file-title .version {
                    font-size: calc(0.35em + 0.35vw);
                    font-weight: bold;
                    color: #c12127;
                    align-self: flex-end;
                }

                .file .file-content {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }

                .file .file-content .description {
                    font-size: calc(0.35em + 0.35vw);
                    color: #808080;
                    height: 100%
                }

                .file .file-content .footer {
                    display: flex;
                    flex-direction: row;
                }

                .file .file-content .dateCreation {
                    font-weight: bold;
                    font-size: calc(0.35em + 0.35vw);
                    width: 100%;
                    margin: auto 0;
                }

                .file .file-content .badge-remove-icon:hover {
                    color: #c12127;
                }
        `}</style>
	</>)
}