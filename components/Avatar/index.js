export default function Avatar(props){
    
    return(<>
            <div className='avatar'>
                <strong>{props.name ? props.name : ''}</strong>
                <img src={props.avatar ? props.avatar : 'default-avatar.png'}/>
            </div>
            <style jsx>{`
                .avatar{
                    display: flex; flex-direction: row;
                }

                .avatar img{
                    width: 100%; height: 100%;
                    height: 49px; width: 49px;
                    border-radius: 9999px; border: solid 2px #2DD8E1;

                }

                .avatar img:hover{
                    cursor: pointer;
                }

                .avatar strong{
                    padding-right: 0.5rem;
                    margin: auto;
                }

            `}</style>
            </>)

}