
import { useState } from "react";
import Ex1a from "./Ex1a";
import Ex1b from "./Ex1b";

export default function Ex1() {
    const [count, setcount] = useState(0);
    const [pasp, setpasp] = useState(2);

    function incrementer(a) {
        setcount(count + a);
    }

    function decrementer(a) {
        setcount(count - a);
    }

    function initialiser() {
        setcount(0);
    }

    return (
        <div>
            <Ex1a counta={count} />

            <button onClick={() => incrementer(pasp)}>
                Incrementer
            </button>

            <button onClick={() => decrementer(pasp)}>
                Decrementer
            </button>

            <button onClick={initialiser}>
                Initialiser
            </button>

            <Ex1b
                incrementer={incrementer}
                decrementer={decrementer}
            />
        </div>
    );
}
