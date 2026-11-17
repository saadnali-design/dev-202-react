import Header from "./Pages/Header";
import Formulaire from "./Pages/Formulaire";
import Liste from "./Pages/Liste";
import Information from "./Pages/Information";
import Vider from "./Pages/Vider";

function App() {
    return (
        <div style={{background: "#f0e9dc"}}>
            <Header />
            <Information />
            <Liste />
            <Formulaire />
            <Vider />    
        </div>
    );
}

export default App;