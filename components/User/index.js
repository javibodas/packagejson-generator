import Avatar from 'components/Avatar';
import Button from 'components/Button';

export default function User({ user, logout }){
    return (<>
        <div className='user'>
            <ul>
                <li><Button click={logout}>Logout</Button></li>
            </ul>
            <Avatar avatar={user.avatar} name={user.username}/>
        </div>
        <style jsx>
            {`
                .user {
                    display: flex;
                    flex-direction: row;
                }

                .user ul {
                    margin: auto 0;
                }

                .user ul li {
                    display:inline;
                }                
            `}
        </style>
    </>)
}