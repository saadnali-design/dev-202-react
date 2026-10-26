
import { useState } from 'react';
import Client from './Exercise/Client';
import Visiteur from './Exercise/Visiteur';
import Formulaire from './Formulaire/Formulaire';
import Stagaire from './Formulaire/Stagaire';
import Exercise1 from './Tpprops/Exercise1';
import Exercise2 from './Tpprops/Exercise2';
import Exercise3 from './Tpprops/Exercise3';
import Exercise4 from './Tpprops/Exercise4';
import Exercise5 from './Tpprops/Exercise5';
import Try from './Try/Try'
import Recherche1 from './Recherche/Recherche1'
import Fetch from './Recherche/Fetch'
import Axios from './Recherche/Axios'
import Recetteliste from './Tp4/Recetteliste'
import {Routes,Route} from "react-router-dom"


import Ex1 from './Tp3/Ex1'
import Ex2 from './Tp3/Ex2'

import TestUseaxios from './Hooks/TestUseaxios';


function App() {
  const [connecte, setConnect] = useState(false);

  const [n, operation] = useState(10);

  const [name,setName]=useState('aicha')

  function fplus() {
    operation(n + 2);
  }

  function fmoin() {
    operation(n - 5);
  }

  function changerEtat() {
    setConnect(!connecte);
  }

  return (
    <div>
      {/* <button onClick={changerEtat}>
        {connecte === true ? 'Déconnecter' : 'Connecter'}
      </button>

      {connecte ? <Client nom="saad" /> : <Visiteur />}

      <div>
        <button onClick={fplus}>+</button>
        {n}
        <button onClick={fmoin}>-</button>
      </div>

      <form >
        <input type="text" value={name}  onChange={(e)=>setName(e.target.value)}/>
        <br/>
        {name}
        <hr/>
        <p>saad nali</p>
        <hr/>

      </form>
    




      <hr/>
      <hr/>
      <Formulaire/>
      <hr/>
      <hr/>
      <Stagaire/>
      <br />
      <br />
      <hr />
      <Exercise1/>

      <hr />
      <br />
      <br />
      <Exercise2/>
      <br /><br/>
      <hr />
      <Exercise3/>

      <hr />
      <br />
      <br />
      <br />
      <Exercise4/>
           <hr />
      <br />
      <br />
      <br />
      <Exercise5/>

         <br />
      <br />
      <br />
      <Try/>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Ex1/> }


           <br />
      <br />
      <br />
      <br />
      <br />
      <Ex2/>
      

<br/>
<br/>
<br/>
<Recherche1/>
<br/>
<br/>
<br/>
<Fetch/>
<br/>
<br/>
<br/>
<Axios/>*/}



<br/>
<br/>
<br/>


<Routes>
  <Route path="/recette" element={<Recetteliste/>} />
  <Route path="/axios" element={<TestUseaxios/>} />
</Routes>
      


 




    </div>
  );
}

export default App;
