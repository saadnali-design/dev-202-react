
import { useState, useEffect } from "react";
import axios from "axios";

const Useaxios = (url) => {
    const [data, setdata] = useState(null);

    useEffect(() => {
        axios.get(url)
            .then((reponse) => setdata(reponse.data));
    }, [url]);

    return [data];
};

export default Useaxios;
