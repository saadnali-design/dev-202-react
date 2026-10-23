import { useState } from "react";

export default function Exercise2(){
    const eleve={nom : 'nali' , prenom : 'saad' , filiere : 'dev202'}
    const [isvisible,setis]=useState(true)

    function afficher(e){
        e.preventDefault()
        if(isvisible){
            setis(false)
            alert('Les informations sont masquées ')
        }else{
            setis(true)
        }
    }
    return (
        <div>
            <button onClick={afficher}>
                {isvisible ?'Masquer mon profil'
                 :'Afficher mon profil'}
            </button>
            {isvisible ? <div>
                nom : {eleve.nom}
                <br/>
                prenom : {eleve.prenom}
                <br/>
                filiere : {eleve.filiere} 
            </div>: <div></div>}

        </div>
    )
}