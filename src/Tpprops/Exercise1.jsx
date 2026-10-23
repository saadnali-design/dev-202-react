import { useState } from "react";

export default function Exercise1(){
    const [val,setval]=useState('')
    const [affi,setaffi]=useState('')

    function afficher(e){
        e.preventDefault()
        if(val.length>20){
            setaffi('error')
        }
        else if(val.length>0){
            setaffi('Bonjour '+val)
        }else{
            setaffi('Bonjour anonyme !')
        }

    }
    return(
        <div>
            <form onSubmit={afficher}>
            Entrez un nom : <input type="text" value={val} onChange={e=>setval(e.target.value)} />
            <div>
                {val.length>=20 ? <span style={{color:'red'}}>{val.length}</span>: 
                <span>{val.length}</span>}
            </div>
                <button type="submit">Envoyer</button>
            </form>
            <p>{affi}</p>
        </div>
    )

}