import { useContext } from 'react';
import JSONCtx from 'context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation, faCopy } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Button';
import useJSONFile from 'hooks/useJSONFile';


export default function Keypad(){

    const { state, dispatch } = useContext(JSONCtx)
    const { exportJSONFile, generateURIJSONFile, errorField, uriJSON } = useJSONFile({state})

    const clearJSON = function(){
        dispatch({ type: "clearJSON" })
    }

    return(<>
            <Button name='btn-exportjson' click={exportJSONFile} testid='btn-exportjson'>Generate</Button>
            <Button name='btn-generateuri' click={generateURIJSONFile} testid='btn-generateuri'>Share</Button>
            <Button name='btn-clear' click={clearJSON} testid='btn-clear'>Clear</Button>
            <div id='err-popbox' className='pop-up error-popup-box' data-testid='error-fields-popup'>
                <div className='content'>
                    <FontAwesomeIcon icon={faExclamation} size='lg' style={{'padding': '0px 10px'}}/>
                    <p>The field <span style={{'fontStyle':'italic'}}>'{errorField}'</span> is empty.</p>
                </div>
                <div className='arrow'></div>
            </div>
            <div id='cp-uri-popbox' className='pop-up copy-uri-popup-box' data-testid='copy-uri-popup'>
                <div className='content'>
                    <div className='btn-copy-uri'><a href={uriJSON} target='_blank'>{uriJSON}</a></div>
                </div>
                <div className='arrow'></div>
            </div>
        <style jsx>{`
            .pop-up{
                display: flex;
                flex-direction: row;
                position: relative;
                align-items: center;
                user-select: none;
                transition: all .5s ease-in-out;
                border: 1px solid #c12127;
            }
            .pop-up .content {
                display: flex;
                width: 100%;
                align-items: center;
                justify-content: center;
            }
            .pop-up .arrow {
                position: relative;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
                width: 15px;
                height: 15px;
                background-color: #c12127;
                border: 1px solid #c12127;
            }
            .error-popup-box{
                display: none;
                color: red;
                max-width: 15rem;
                top: -6.2rem;
                right: -7rem;
            }
            .error-popup-box .arrow {
                top: 1.5rem;
                right: 6rem;
            }
            .copy-uri-popup-box{
                display: none;
                max-width: 25rem;
                padding: 15px 10px;
                top: -5.9rem;
                right: -5rem;
            }
            .copy-uri-popup-box .arrow {
                top: 1.5rem;
                right: 16rem;
            }
        `}</style>
        </>)

}