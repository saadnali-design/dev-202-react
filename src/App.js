
import './App.css';
import Stagaire from './Stagaire';
import Menu from './componenet/Menu';
import HeaderImage from './componenet/Header';

import Header from './Header/Header';
import Navigation from './Navigation/Navigation';
import Footer from './Footer/Footer';
import Profil from './Content/Profil';

function Welcome() {
  return <h1>welcome message</h1>;
}

function App() {
  let stg = { nom: 'nali', prenom: 'saad', age: 18 };
  let liste = [0, 1, 2, 3, 4];
  let statut = '';

  var stylist = { color: 'red' };
  var stylist1 = { color: 'blue', fontSize: '30px' };
  const stylediv = { color: 'green' };

  if (stg.age >= 18) {
    statut = 'majeur';
  } else {
    statut = 'mineur';
  }

  return (
    <div style={stylediv}>
      <HeaderImage />
      <Welcome />

      <p>prenom : {stg.prenom}</p>
      <p>nom : {stg.nom}</p>
      <p>age : {stg.age}</p>

      <p style={stylist}>
        statut : {stg.age >= 18 ? 'majeur' : 'mineur'}
      </p>

      <p style={stylist1}>statut 2 : {statut}</p>
      <p>{liste[2]}</p>

      <Stagaire />
      <Menu />

      <hr />

      <Header />
      <Navigation />
      <Profil />
      <Footer />
    </div>
  );
}

export default App;