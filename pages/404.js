import Image from 'next/image'

export default function NotFoundPage() {
	return <>
		<div className='container'>
			<section className='description'>
				<h1>4 &#123; &#125; 4</h1>
				<span>The resource was not found</span>
			</section>
			<Image src='/public/404.jpg' width={500} height={500}/>
		</div>
		<style jsx>{`
				@import url('https://fonts.googleapis.com/css2?family=Tilt+Neon&display=swap');

				.container {
					padding: 2rem;
					display: flex;
					flex-direction: column;
				}

				.container .description {
					margin: 0 auto;
					font-family: 'Tilt Neon', cursive;
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.container .description h1 {
					color: #c12127;
					font-size: 150px;
				}

				@media (max-width: 700px) {
					.container .description h1 {
						font-size: 100px;
					}
				}

				.container .description span {
					font-size: 18px;
				}
				
				.container img {
					margin: auto auto;
				}
		`}</style>
	</>
}