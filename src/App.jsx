
import Stagaire from './Stagaire/Stagaire';

function App() {
  let filiere = [
    { id: 1, name: 'div' },
    { id: 2, name: 'ai' },
    { id: 3, name: 'securite' },
    { id: 4, name: 'infographie' },
  ];

  let notes=[20,13,19,13,14,19]

  return (
    <div>

        <div style={{ margin: '0 auto', width: '300px' }}>
            <Stagaire />
        </div>

      <hr/>
      {filiere.map((fi,index) => (
        <p key={index}>
          {fi.id} - {fi.name} -- index {index+1}
        </p>
      ))}
      <hr/>
      <ul>
        {notes.map((n,index)=>
        <li key={index}>
          {n} -- index : {index+1}
        </li>
        
        )}
      </ul>
    </div>
  );
}

export default App;
