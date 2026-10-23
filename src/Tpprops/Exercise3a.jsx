import { useState } from "react"

export default function Exercise3a(props){
    return (
        <div>
            <div>
                <p>Nom : {props.namea}</p>
                <p>Price : {props.pricea}</p>
                <p>Stock : {props.stocka ? 'Disponible' : ' Rupture de stock'}</p>
            </div>
            <br />
                
            

        </div>
    )

}