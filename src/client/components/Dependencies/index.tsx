import { useContext } from 'react'
import Badge from 'src/client/components/Badge'
import useDependencies from 'src/client/hooks/useDependencies'
import FileCtx from 'src/client/context/file'

type DependenciesProps = {
    title: string,
    classType: string,
    type: string,
}

export default function Dependencies({ title, classType, type } : DependenciesProps): JSX.Element {

	const { file, dispatch } = useContext(FileCtx)
	const { packages, typePackage, addPackage, removePackage, outFocusInputDependencie } = useDependencies({ classType, type, dispatch, file })
    
	return (<>
		<div id={'formdepd' +  type} className = 'form-group dependencies'>
			<div className='dependencies-box'>
				<div className='data-box'>
					<label className='label-title'>{title}</label>
					<section className='section-input'>
						<input id = {'inpt-dependencies' + type} className = 'input-form input-dependencie' placeholder="NPM Package" onChange={typePackage} onBlur={outFocusInputDependencie} data-testid={'input-' + classType}/>
						<div id = {'packlist' + type} className='packages-list' data-testid={'combo-' + classType}>
							<ul>
								{packages.map(pack => <li key={pack.name} onClick={addPackage} onTouchStart={addPackage}>{pack.name}<span className='pckg-version' data-testid={classType + '-list-item'}>{' (' + pack.version+')'}</span></li>)}
							</ul>
						</div>
					</section>
				</div>
				<div id={'depdlist' + type} className='dependencies-list' data-testid={classType + '-list'}>
					{file.json[classType] ? 
						Object.keys(file.json[classType]).map(dependencie => <Badge key={dependencie} type={type} label={dependencie} value={file.json[classType][dependencie]} remove={removePackage}/>)
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
                        cursor: pointer;
                    }

                    .dependencies .packages-list li:hover{
                        font-weight: bold;
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