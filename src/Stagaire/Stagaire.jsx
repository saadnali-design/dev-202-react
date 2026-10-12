
import logo from './Images.jfif';
import './Style.css';

export default function Stagaire() {
    let loger = require('./Images.jfif');

    return (
        <div>
            <img src={logo} className="stg" alt="Image 1" />
            <img src={loger} className="stg" alt="Image 2" />
        </div>
    );
}
