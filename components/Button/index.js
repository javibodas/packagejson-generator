export default function Button(props){

    return(<>
            <button className={'btn ' + props.name} onClick={props.click} data-testid={props.testid}>{props.children}</button>
            <style jsx>
            {`
                .btn {
                    border-radius: 2px;
                    border: solid 1px #c12127;

                    font-family: system-ui;
                    font-size: calc(.35em + .35vw);
                    font-weight: bold;

                    color: #c12127;
                    background: white;

                    transition: background .5s ease;

                    padding: 0.5rem 2rem 0.5rem 2rem;
                    margin: 0 .25rem 0 .25rem;
                }

                .btn:hover {
                    color: white;
                    background: #c12127;
                }

                .btn-exportjson {
                    background: #b30ad2;
                    color: white;
                    border: none;
                    border-bottom: solid 5px #e81aa8;
                }

                .btn-exportjson:hover {
                    background: #e81aa8;
                }

                .btn-generateuri {
                    background: #fa8717;
                    color: white;
                    border: none;
                    border-bottom: solid 5px #c12127;
                }

                .btn-generateuri:hover {
                    background: #c12127;
                }

                .btn-clear {
                    background:#0c4094;
                    color: white;
                    border: none;
                    border-bottom: solid 5px #25eaf5;
                }

                .btn-clear:hover {
                    background: #25eaf5;
                }

                .btn-add-script {
                    padding: .05em .7em;
                }
            `}
            </style>
            </>)
}