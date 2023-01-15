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

                .btn-add-script {
                    padding: .05em .7em;
                }
            `}
            </style>
            </>)
}