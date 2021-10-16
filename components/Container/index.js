import Form from 'components/Form';
import TextEditor from 'components/TextEditor';
import Keypad from 'components/Keypad';
import { useEffect } from 'react';

export default function Container(){

    useEffect(() => {
        document.addEventListener('mousedown', function(e) {
            document.getElementById('err-popbox').style.display = 'none'
            document.getElementById('cp-uri-popbox').style.display = 'none'
        })
    }, [])

    return(<>
            <div className='row my-container'>
                <div className='col-forms'>
                    <Form />
                    <Keypad />
                </div>
                <div className='col-editor'>
                    <TextEditor />
                 </div>
            </div>
            <style jsx>{`
                .my-container{
                    max-width: 80%;
                    margin: 0 auto;
                    padding: 2rem 2rem 2rem 2rem;
                    background-color: white;
                    min-height: 80vh;
                    -webkit-box-shadow: 5px 5px 69px -14px rgba(0,0,0,1);
                    -moz-box-shadow: 5px 5px 69px -14px rgba(0,0,0,1);
                    box-shadow: 5px 5px 69px -14px rgba(0,0,0,1);

                    display: grid;
                    grid-template-columns: 1.15fr 0.85fr;
                }

                .col-forms{
                    grid-column: 1;
                    grid-row: 1;
                }

                .col-editor{
                    grid-column: 2;
                    grid-row: 1;
                }
                
                `}</style>
            </>
    )
}