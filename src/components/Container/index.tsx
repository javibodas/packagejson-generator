import Form from 'src/components/Form'
import Keypad from 'src/components/Keypad'
import TextEditor from 'src/components/TextEditor'

export default function Container(): JSX.Element {
	return(<>
		<div className='container lg:max-w-80% max-w-full lg:min-h-80-vh min-h-92-vh mx-auto my-0 rounded-[4px] bg-white shadow-2xl lg:mt-2'>
			<div className='editor hidden lg:flex'>
				<TextEditor />
			</div>
			<div className='form p-4 sm:p-8'>
				<Form />
			</div>
			<div className='keypad py-4 px-0 sm:py-8 sm:px-8 flex'>
				<Keypad />
			</div>
		</div>
		<style jsx>{`
				.container {
                    display: grid;
                    grid-template-areas:
                        "form editor editor"
                        "form editor editor"
                        "keypad editor editor";
                    grid-template-columns: 1.4fr 0.6fr 1fr; 
                    grid-template-rows: 1fr 1.5fr 0.5fr;
                }

                .form {
                    grid-area: form;
                }

				.keypad {
                    grid-area: keypad;
                }

                .editor {
                    grid-area: editor;
                }

                @media (max-width: 1000px) {
                    .container {
                        grid-template-areas:
                            "form"
                            "form"
                            "keypad";
                    }
                }
                `}</style>
	</>
	)
}