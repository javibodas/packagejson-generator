export default function Button(props){

    return(<>
            <button className={'mybtn ' + props.name} onClick={props.click} data-testid={props.testid}>{props.children}</button>
            <style jsx>
            {`
                .mybtn{
                    border: none;
                    margin-left: 2rem;
                    padding: 0.5rem 2rem 0.5rem 2rem;

                    color: white;
                    font-weight: bold;
                    font-size: calc(0.35em + 0.35vw);
                    font-family: system-ui;
                }

                .btn-exportjson{
                    border-radius: 2px;
                    background: #b30ad2;
                    border-bottom: solid 5px #e81aa8;
                    transition: background 0.5s ease;
                }

                .btn-exportjson:hover{
                    background: #e81aa8;
                }
                
                .btn-generateuri{
                    border-radius: 2px;
                    background: #fa8717;
                    border-bottom: solid 5px #c12127;
                    transition: background 0.5s ease;
                }

                .btn-generateuri:hover{
                    background: #c12127;
                }

                .btn-add-script{
                    background: #a4a19f;
                    border-radius: 9999px;
                    padding: 0.25rem;
                    text-align: center;
                    margin-left: 0.25rem;
                }

                .btn-add-script:hover{
                    background: #c12127;
                }

                .btn-clear{
                    border-radius: 2px;
                    background:#0c4094;
                    border-bottom: solid 5px #25eaf5;
                    transition: background 0.5s ease;
                }

                .btn-clear:hover{
                    background: #25eaf5;
                }
            `}
            </style>
            </>)
}