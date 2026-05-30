import { useRouter } from 'next/router'
import HomePage from 'src/pages'
import Loading from 'front/components/Loading'
import useClientFile from 'front/hooks/useClientFile'

export default function File(): JSX.Element {
	const router = useRouter()
	const { id } = router.query
	const fileId = typeof id === 'string' ? id : undefined

	const { file, loading, error } = useClientFile(fileId)

	if (loading) return <Loading />

	if (error || !file) {
		return (
			<div className="error-container">
				<h1>File not found</h1>
				<p>The requested file could not be found.</p>
				<style jsx>{`
					.error-container {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						min-height: 400px;
						text-align: center;
					}
				`}</style>
			</div>
		)
	}

	return <HomePage file={file} />
}