import { useContext } from 'react';
import Badge from 'src/components/Badge';
import useDependencies from 'src/hooks/useDependencies';
import JSONCtx from 'src/context';


export default function Dependencies(props){

    const { state, dispatch } = useContext(JSONCtx);
    const { packages, typePackage, addPackage, removePackage, outFocusInputDependencie } = useDependencies({'classType': props.classType, 'type': props.type, 'dispatch': dispatch, 'state': state })
    

    return (<>
                <div id={'formdepd' +  props.type} className = 'form-group dependencies'>
                    <div className='dependencies-box'>
                        <div className='data-box'>
                            <label className='label-title'>{props.title}</label>
                            <section className='section-input'>
                                <input id = {'inpt-dependencies' + props.type} className = 'input-form input-dependencie' placeholder="NPM Package" onChange={typePackage} onBlur={outFocusInputDependencie} data-testid={'input-' + props.classType}/>
                                <div id = {'packlist' + props.type} className='packages-list' data-testid={'combo-' + props.classType}>
                                    <ul>
                                        {packages.map(pack => <li key={pack.name} onClick={addPackage}>{pack.name}<span className='pckg-version' data-testid={props.classType + '-list-item'}>{' (' + pack.version+')'}</span></li>)}
                                    </ul>
                                </div>
                            </section>
                        </div>
                        <div id={'depdlist' + props.type} className='dependencies-list' data-testid={props.classType + '-list'}>
                                {state[props.classType] ? 
                                    Object.keys(state[props.classType]).map(dependencie => <Badge key={dependencie} type={props.type} objKey={dependencie} objValue={state[props.classType][dependencie]} remove={removePackage}/>)
                                : null
                                }
                        </div>
                    </div>
                </div>
                <style jsx>{`
         
                    .dependencies .packages-list{
                        color: black; background-color: white;
                        max-height: 0; position: fixed; z-index: 10; width: 400px;
                        transition: all 0.5s;
                        overflow-y: scroll;
                    }

                    .dependencies .packages-list.active{
                        max-height: 100px;
                    }

                    .dependencies .packages-list ul{
                        list-style: none;
                        padding: 0 0 0 0rem;
                    }

                    .dependencies .packages-list li{
                        border-bottom: solid 1px #c12127;
                        font-style: italic;
                        font-size: 14px;
                        padding: 0.25rem;
                    }

                    .dependencies .packages-list li:hover{
                        font-weight: bold;
                        cursor: pointer;
                    }

                    .dependencies .packages-list li .pckg-version{
                        position: absolute;
                        right: 0;
                        font-size: 10px;
                        color: red;
                    }

                    .dependencies .packages-list li:hover .pckg-version{
                        font-weight: bold;
                    }

                    .dependencies .dependencies-list{
                        padding: 1rem 0 1rem 1rem;
                        display: flex;
                        flex-flow: row wrap;
                        overflow-y: auto;
                    }

                `}</style>
            </>)
}