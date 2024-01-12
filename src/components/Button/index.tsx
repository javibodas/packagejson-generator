type ButtonProps = {
    name?: string,
    styles?: string,
    testid: string,
    click(): void | Promise<void> | Promise<boolean>,
    children: string | JSX.Element | JSX.Element[] | (string | JSX.Element)[]
}

export default function Button({ name, styles, testid, click, children }: ButtonProps): JSX.Element {

	return(<button className={'btn font-bold text-xs lg:text-base mx-1 rounded-[2px] border-solid border-1 border-garnet text-garnet bg-white transition ease delay-5 hover:bg-garnet hover:text-white ' 
        + (name === 'btn-add-script' ? '' : 'py-2 px-8') + (styles ? styles : '')} onClick={click} data-testid={testid}>
		{children}
	</button>)
}