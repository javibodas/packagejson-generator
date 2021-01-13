export default function Button(props){

    return(<>
            <button className={'mybtn ' + props.name} onClick={props.click}>{props.children}</button>
            <style jsx>
            {`
                .mybtn{
                    color: white;
                    font-weight: bold;
                    border: none;
                    margin-left: 2rem;
                    padding: 0.5rem 2rem 0.5rem 2rem;
                    font-family: Poppins,sans-serif;
                }

                .btn-exportjson{
                    background: #b30ad2;
                    border-bottom: solid 5px #e81aa8;
                    transition: background 0.5s ease;
                }

                .btn-exportjson:hover{
                    background: #e81aa8;
                }
                
                .btn-generateuri{
                    background: #fa8717;
                    border-bottom: solid 5px #c12127;
                    transition: background 0.5s ease;
                }

                .btn-generateuri:hover{
                    background: #c12127;
                }

                .btn-add-script{
                    background: #fa8717;
                    border-radius: 9999px;
                    padding: 0.25rem;
                    text-align: center;
                    margin-left: 0.25rem;
                }

                .btn-add-script:hover{
                    background: #c12127;
                }

                .btn-clear{
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