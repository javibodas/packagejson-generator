export default function FileDetailCard({ name, version, description, timestamp }) {
    return (<>
        <div className='file'> 
            <div className='file-title'>
                <h3>{name}</h3>
                <span className='version'>{version}</span>
            </div>
            <span className='description'>{description}</span>
            <span className='dateCreation'>{(new Date(timestamp.seconds*1000)).toDateString()}</span>
        </div>
        <style>{`
            .file {
                display: flex;
                flex-direction: column;
                background-color: white;
                padding: 2rem;
                border-radius: 4px;
                border: 1px solid white; 
            }

            .file:hover {
                cursor: pointer;
                border: 1px solid #c12127;
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

            .file .description {
                font-size: calc(0.35em + 0.35vw);
                color: #808080;
            }

            .file .dateCreation {
                align-self: flex-end;
            }
        `}</style>
    </>)
}