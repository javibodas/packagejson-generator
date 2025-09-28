export default function Loading(): JSX.Element {
	return (
		<div className="loading-container">
			<div className="loading-spinner"></div>
			<p>Loading...</p>
			<style jsx>{`
				.loading-container {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					min-height: 200px;
					gap: 1rem;
				}
				.loading-spinner {
					width: 40px;
					height: 40px;
					border: 4px solid #f3f3f3;
					border-top: 4px solid #3498db;
					border-radius: 50%;
					animation: spin 1s linear infinite;
				}
				@keyframes spin {
					0% { transform: rotate(0deg); }
					100% { transform: rotate(360deg); }
				}
			`}</style>
		</div>
	)
}