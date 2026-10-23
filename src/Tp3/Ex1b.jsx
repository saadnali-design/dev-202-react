
export default function Ex1b(props) {
    return (
        <div>
            <fieldset>
                <legend>Pas d'incrémentation</legend>

                <button onClick={() => props.incrementer(1)}>1</button>
                <button onClick={() => props.incrementer(2)}>2</button>
                <button onClick={() => props.incrementer(3)}>3</button>
                <button onClick={() => props.incrementer(4)}>4</button>
            </fieldset>

            <fieldset>
                <legend>Pas de décrémentation</legend>

                <button onClick={() => props.decrementer(1)}>1</button>
                <button onClick={() => props.decrementer(2)}>2</button>
                <button onClick={() => props.decrementer(3)}>3</button>
                <button onClick={() => props.decrementer(4)}>4</button>
            </fieldset>
        </div>
    );
}
