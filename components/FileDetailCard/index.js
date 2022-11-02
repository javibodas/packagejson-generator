import { useState } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function FileDetailCard({ id, fileDetail }) {

    const router = useRouter()

    const handleClickFile = (event) => {
        id ? router.push('/files/' + id)
        : router.push('/')
    }

    if (!id) {
        return(<>
            <div className='file' onClick={handleClickFile}>
                <span className='file-new'><FontAwesomeIcon icon={faPlus} size="10x"/></span>
            </div>
            <style>{`
                .file {
                    display: flex;
                    flex-direction: column;
                    background-color: white;
                    padding: 2rem;
                    border-radius: 4px;
                    border: 2px solid white;
                    max-height: 200px;
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
    
    const { createdAt, jsonFile } = fileDetail
    const { name, version, description, devDependencies, dependencies } = jsonFile
    const { seconds } = createdAt

    return (<>
        <div className='file' onClick={handleClickFile}>
            <div className='file-title'>
                <h3>{name}</h3>
                <span className='version'>{version}</span>
            </div>
            <div className='file-content'>
                <span className='description'>{description}</span>
                <span className='devDependencies'>{Object.keys(devDependencies).length > 0 ? Object.keys(devDependencies).slice(0,5).reduce((prevVal, nextVal) => { return prevVal + nextVal + ',' }, '') + '...' : null}</span>
                <span className='dateCreation'>{(new Date(seconds*1000)).toDateString()}</span>
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
                    max-height: 200px;
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
                }

                .file .file-content .dateCreation {
                    align-self: flex-end;
                    font-weight: bold;
                    font-size: calc(0.35em + 0.35vw);
                }
        `}</style>
    </>)
}