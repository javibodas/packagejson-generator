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

	return(<>
		<div className='badge'>
			<div className='badge-key text-ellipsis'>
				<span>{label}</span>
			</div>
			{value ? <div className={styleValue + ' text-ellipsis'}><span>{value}</span></div> : null}
			<div className='badge-close' onClick={() => {remove(label)}}>
				<span className='badge-close-icon'><FontAwesomeIcon icon={faTrash} size="xs"/></span>
			</div>
		</div>
		<style jsx>{`

                .badge {
                    display: flex;
                    flex-direction: row;
                    font-size: calc(0.35em + 0.35vw);
                    text-align: center;
                    align-items: center;
                    padding: .15rem .15rem .15rem .15rem;
                }

                .badge:hover {
                    cursor: context-menu;
                }

                .badge > div {
                    min-height: 15px;
                    padding: .1em .25em;
                }

                .badge .badge-close {
                    display: flex;
                    border: 1px solid #dc3545;
                    background-color: white;
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                    font-weight: bold;
                    color: #dc3545;
                }

                .badge .badge-close .badge-close-icon {
                    margin: auto 0;
                }

                .badge .badge-close:hover {
                    cursor:pointer;
                    color: white;
                    background-color: #dc3545;
                }

                .badge .badge-key {
                    background-color: #5a5a5a;
                    border: 1px solid #5a5a5a;
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                    color: white;
                }

                .badge .badge-value-blue {
                    color: white;
                    border-top: 1px solid #0976b4;
                    border-bottom: 1px solid #0976b4;
                    background-color: #0976b4;
                    
                }

                .badge .badge-value-green {
                    color: white;
                    border-top: 1px solid green;
                    border-bottom: 1px solid green;
                    background-color: green;
                }

                .text-ellipsis {
                    display: -webkit-box !important;
                    text-overflow: ellipsis;
                    white-space: normal;
                    overflow:hidden;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }

                @media (max-width: 1000px) {
                    .badge {
                        font-size: 10px;
                    }
                }
            `}</style>
	</>)
}