
import Useaxios from "./Useaxios";

export default function TestUseaxios() {
    const [data] = Useaxios(
        "https://jsonplaceholder.typicode.com/users"
    );

    return (
        <div style={{border:"2px black solid",padding:"20px"}}>
            {data && data.map((item) => (
                <p key={item.id}>{item.name}   -   {item.email}</p>
            ))}
        </div>
    );
}
