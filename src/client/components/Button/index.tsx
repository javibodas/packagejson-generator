type ButtonProps = {
    name?: string,
    testid: string,
    click(): void | Promise<void> | Promise<boolean>,
    children: string | JSX.Element | JSX.Element[] | (string | JSX.Element)[]
}

export default function Button({ name, testid, click, children }: ButtonProps): JSX.Element {

	return(<>
		<button className={'btn ' + name} onClick={click} data-testid={testid}>{children}</button>
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

                @media (max-width: 1000px) {
                    .btn {
                        font-size: 10px;
                    }
                }
            `}
		</style>
	</>)
}