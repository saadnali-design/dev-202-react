import { useState } from "react"
import Fetchc from './Fetchc'

export default function Fetch(){
    const [users,setusers]=useState([])
    function getusers(){
        const getdata=async()=>{const reponse=await fetch("https://jsonplaceholder.typicode.com/users")
        const user=await reponse.json()
        return user
        }
    getdata().then((user)=>setusers(user))
    }
    return (
        <div>
            <button onClick={getusers}>GET USERS : FETCH</button>
            {users.map((user)=>
            <div key={user.id}>
                
              <p style={{color : 'red'}}> utilisateur {user.id} :</p>
                <Fetchc user={user}/>
                
            </div>)}

        </div>
    )
}