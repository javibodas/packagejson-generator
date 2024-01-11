import { useContext } from 'react'
import Badge from 'src/components/Badge'
import FileCtx from 'src/context/file'
import useDependencies from 'src/hooks/useDependencies'

type DependenciesProps = {
    title: string,
    classType: string,
    type: string,
}

export default function Dependencies({ title, classType, type } : DependenciesProps): JSX.Element {

	const { file, dispatch } = useContext(FileCtx)
	const { packages, typePackage, addPackage, removePackage, outFocusInputDependencie } = useDependencies({ classType, type, dispatch, file })
    
	return (<div className='flex flex-col max-h-52'>
		<div className='grid grid-cols-5 py-1.5 px-0'>
			<label className='label-title mx-4 my-auto col-start-1 col-end-1 font-bold lg:text-base text-[10px]'>{title}</label>
			<section className='section-input col-start-2 col-end-6'>
				<input id = {'inpt-dependencies' + type} className = 'w-full py-1 px-0 input-dependencie border-b-1 border-solid border-gray-200 hover:border-garnet hover:outline-none focus:border-garnet focus:outline-none rounded-none lg:text-base text-[10px]' placeholder="NPM Package" onChange={typePackage} onBlur={outFocusInputDependencie} data-testid={'input-' + classType}/>
				<div id = {'packlist' + type} className='text-black text-xs bg-white hidden max-h-[100px] fixed z-10 w-400 transition-all delay-75 overflow-y-scroll' data-testid={'combo-' + classType}>
					<ul className='list-none p-0'>
						{
							packages.map(pack => 
								<li key={pack.name} onClick={addPackage} onTouchStart={addPackage} className='group text-xs italic p-1 cursor-pointer border-b-1 border-solid border-garnet hover:font-bold'>
									{pack.name}
									<span className='group-hover:font-bold absolute right-0 text-red' data-testid={classType + '-list-item'}>{' (' + pack.version+')'}</span>
								</li>
							)
						}
					</ul>
				</div>
			</section>
		</div>
		<div className='flex flex-row flex-wrap overflow-y-auto py-4 pl-0 pr-4' data-testid={classType + '-list'}>
			{file.json[classType] ? 
				Object.keys(file.json[classType]).map(dependencie => <Badge key={dependencie} type={type} label={dependencie} value={file.json[classType][dependencie]} remove={removePackage}/>)
				: null
			}
		</div>
	</div>)
}