import { useEffect, useState } from 'react';

export default function Badge(props){

    const stylesValuesBadge = ['badge-value-blue', 'badge-value-green']
    const [ styleValue, setStyleValue ] = useState(stylesValuesBadge[0]);

    useEffect(function(){
        (props.type == 'script') ? setStyleValue(stylesValuesBadge[1]) : setStyleValue(stylesValuesBadge[0])
    }, [])

    return(<>
            <div className='my-badge'>
                <div className='badge-key'>
                    <span>{props.objKey}</span>
                </div>
                {props.objValue ? <div className={styleValue}><span>{props.objValue}</span></div> : null}
                <div className='badge-close' onClick={() => {props.remove(props.objKey)}}>
                    <span>X</span>
                </div>
            </div>
            <style jsx>{`

                .my-badge{
                    display: flex;
                    flex-direction: row;
                    font-size: 12px;
                    text-align: center;
                    align-items: center;
                    padding: .15rem .15rem .15rem .15rem;
                }

                .my-badge:hover{
                    cursor: context-menu;
                }

                .my-badge > div{
                    min-height: 15px;
                    padding: .1em .25em;
                }

                .my-badge .badge-close{
                    border: 2px solid #dc3545;
                    background-color: white;
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                    font-weight: bold;
                    color: #dc3545;
                }

                .my-badge .badge-close:hover{
                    cursor:pointer;
                    color: white;
                    background-color: #dc3545;
                }

                .my-badge .badge-key{
                    background-color: #5a5a5a;
                    border: 1px solid #5a5a5a;
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                    color: white;
                    
                }

                .my-badge .badge-value-blue{
                    color: white;
                    border-top: 1px solid #0976b4;
                    border-bottom: 1px solid #0976b4;
                    background-color: #0976b4;
                    
                }

                .my-badge .badge-value-green{
                    color: white;
                    border-top: 1px solid green;
                    border-bottom: 1px solid green;
                    background-color: green;
                    
                }
            `}</style>
            </>);
}