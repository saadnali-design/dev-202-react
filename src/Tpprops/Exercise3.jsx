import Exercise3a from './Exercise3a';

export default function Exercise3(){
    let products = [
{ id: 1, name: "Clavier", price: 150, stock: true },
{ id: 2, name: "Souris", price: 80, stock: true },
{ id: 3, name: "Écran", price: 1200, stock: false },
{ id: 4, name: "Casque", price: 250, stock: true }
];

    return (
        <div>
            {products.map((e)=>
            <div key={e.id}>
                <Exercise3a namea={e.name} pricea={e.price} stocka={e.stock}/>
            </div>)}

        </div>
    )
}