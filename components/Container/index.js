import Form from 'components/Form';
import TextEditor from 'components/TextEditor';
import Keypad from 'components/Keypad';

export default function Container(){
    return(<>
            <div className='row my-container'>
                <div className='editor'>
                    <TextEditor />
                 </div>
                 <div className='form'>
                    <Form />
                </div>
                <div className='keypad'>
                    <Keypad />
                </div>
            </div>
            <style jsx>{`
                .my-container {
                    display: grid;
                    grid-template-areas:
                        "form editor editor"
                        "form editor editor"
                        "keypad editor editor";
                    grid-template-columns: 1.4fr 0.6fr 1fr; 
                    grid-template-rows: 1fr 1.5fr 0.5fr;
                    max-width: 80%;
                    min-height: 80vh;
                    margin: 0 auto;
                    border-radius: 4px;

                    background-color: white;
                    -webkit-box-shadow: 5px 5px 69px -14px rgb(0 0 0 / 0.3);
                    -moz-box-shadow: 5px 5px 69px -14px rgb(0 0 0 / 0.3);
                    box-shadow: 5px 5px 69px -14px rgb(0 0 0 / 0.3);
                }

                .form {
                    grid-area: form;
                    padding: 2rem 2rem 2rem 2rem;
                }

                .keypad {
                    grid-area: keypad;
                    padding: 2rem 2rem 2rem 2rem;
                }

                .editor {
                    grid-area: editor;
                }

                @media (max-width: 500px) {
                    .editor {
                      display: none;
                    }
                }
                `}</style>
            </>
    )
}