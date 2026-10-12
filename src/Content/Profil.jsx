import Detail from './Detail';
import General from './General';
import Other from './Other';

export default function Profil(){
    return (
        <div>
            <h1>student profil</h1>
            <div style={{display:"flex"}}>
                <Detail/>
                <div>
                    <General/>
                    <Other/>
                </div>
            </div>


        </div>
    )
}