import { useContext } from 'react';
import JSONCtx from 'context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation, faCopy } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Button';
import useJSONFile from 'hooks/useJSONFile';


export default function Keypad(){

    const { state, dispatch } = useContext(JSONCtx)
    const { exportJSONFile, generateURIJSONFile, errorField, uriJSON } = useJSONFile({state})

    const copyClipboard = function(){
        document.getElementById('inpt-uri-json').select()
        document.execCommand("copy");
        document.getElementById('cp-uri-popbox').style.display = 'none'
    }

    const clearJSON = function(){
        dispatch({ type: "clearJSON" })
    }

    return(<>
            <Button name='btn-exportjson' click={exportJSONFile}>Generate</Button>
            <Button name='btn-generateuri' click={generateURIJSONFile}>Share</Button>
            <Button name='btn-clear' click={clearJSON}>Clear</Button>
            <div id='err-popbox' className='pop-up error-popup-box'>
                <FontAwesomeIcon icon={faExclamation} size='lg'/>
                The field <span style={{'fontStyle':'italic'}}>'{errorField}'</span> is empty.
                <div className='btn-close-error-popup'><button onClick={() => { document.getElementById('err-popbox').style.display = 'none'}}>X</button></div>
            </div>
            <div id='cp-uri-popbox' className='pop-up copy-uri-popup-box'>
                <input id='inpt-uri-json' value={uriJSON} />
                <div className='btn-copy-uri'><button onClick={copyClipboard}><FontAwesomeIcon icon={faCopy} size='lg'/></button></div>
            </div>
        <style jsx>{`

            .pop-up{
                display: flex;
                flex-direction: row;
                padding: 7px 5px;
                box-shadow: 0px 5px 10px rgba(0,0,0,.2);
                align-items: center;
                user-select: none;
                transition: all .5s ease-in-out;
            }

            .error-popup-box{
                display: none;
                flex-direction: row;
                position: relative;
                max-width: 50%;
                top: -20%;
                background: #dedede; color: red;
                border: 3px solid red;
                border-radius: 10px;
            }

            .copy-uri-popup-box{
                display: none;
                flex-direction: row;
                max-width: 50%;
                position: relative;
                top: -20%;
                background: #dedede;
            }

            .copy-uri-popup-box > input{
                width: 90%;
            }

            .copy-uri-popup-box div{
                width: 10%;
            }
            
            .btn-copy-uri > a, .btn-close-error-popup > a{
                text-decoration: none;
            }
        `}</style>
        </>)

}