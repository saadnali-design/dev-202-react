
import './Formulaire.css';
import { useState } from 'react';

export default function Formulaire() {
    let states = [
        'Ohio', 'California', 'Texas', 'New York',
        'Florida', 'Washington', 'Arizona',
        'Illinois', 'Georgia', 'Nevada'
    ];

    let ms = ['Bronze', 'Silver', 'Gold', 'Platinum'];

    const [fn, setfn] = useState('');
    const [ln, setln] = useState('');
    const [sa, setsa] = useState('');
    const [al2, setal2] = useState('');
    const [c, setc] = useState('');
    const [s, sets] = useState('');
    const [zc, setzc] = useState('');
    const [pn, setpn] = useState('');
    const [ea, setea] = useState('');
    const [membership, setmembership] = useState('');
    const [affichage, setaffichage] = useState(false);
    const [erreurs, setErreurs] = useState({});

    function afficher() {
        let err = {};

        if (fn.trim() === '') {
            err.fn = 'First Name est obligatoire';
        }

        if (ln.trim() === '') {
            err.ln = 'Last Name est obligatoire';
        }

        if (sa.trim() === '') {
            err.sa = 'Street Address est obligatoire';
        }

        if (c.trim() === '') {
            err.c = 'City est obligatoire';
        }

        if (s === '') {
            err.s = 'Veuillez sélectionner un State';
        }

        if (zc.trim() === '') {
            err.zc = 'Zip code est obligatoire';
        }

        if (pn.trim() === '') {
            err.pn = 'Phone Number est obligatoire';
        } else if (!/^\d{10}$/.test(pn)) {
            err.pn = 'Le numéro doit contenir 10 chiffres';
        }

        if (ea.trim() === '') {
            err.ea = 'Email Address est obligatoire';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ea)) {
            err.ea = 'Email Address est invalide';
        }

        if (membership === '') {
            err.membership = 'Veuillez choisir un membership';
        }

        setErreurs(err);

        if (Object.keys(err).length === 0) {
            setaffichage(true);
        } else {
            setaffichage(false);
        }
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <h1>Membership Registration</h1>
                        </td>
                    </tr>

                    <tr>
                        <td><label htmlFor="fn">First Name</label></td>
                        <td><label htmlFor="ln">Last Name</label></td>
                    </tr>

                    <tr>
                        <td>
                            {erreurs.fn && <p className="error">{erreurs.fn}</p>}
                            <input
                                type="text"
                                id="fn"
                                value={fn}
                                onChange={(e) => setfn(e.target.value)}
                            />
                        </td>
                        <td>
                            {erreurs.ln && <p className="error">{erreurs.ln}</p>}
                            <input
                                type="text"
                                id="ln"
                                value={ln}
                                onChange={(e) => setln(e.target.value)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2}>
                            <label htmlFor="sa">Street Address</label>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            {erreurs.sa && <p className="error">{erreurs.sa}</p>}
                            <input
                                type="text"
                                id="sa"
                                value={sa}
                                onChange={(e) => setsa(e.target.value)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2}>
                            <label htmlFor="al2">Address Line 2</label>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <input
                                type="text"
                                id="al2"
                                value={al2}
                                onChange={(e) => setal2(e.target.value)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td><label htmlFor="c">City</label></td>
                        <td><label htmlFor="s">State</label></td>
                    </tr>
                    <tr>
                        <td>
                            {erreurs.c && <p className="error">{erreurs.c}</p>}
                            <input
                                type="text"
                                id="c"
                                value={c}
                                onChange={(e) => setc(e.target.value)}
                            />
                        </td>
                        <td>
                            {erreurs.s && <p className="error">{erreurs.s}</p>}
                            <select
                                name="state"
                                id="s"
                                value={s}
                                onChange={(e) => sets(e.target.value)}
                            >
                                <option value="">Select State</option>
                                {states.map((e, key) => (
                                    <option key={key} value={e}>{e}</option>
                                ))}
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td><label htmlFor="zc">Zip code</label></td>
                        <td><label htmlFor="pn">Phone Number</label></td>
                    </tr>
                    <tr>
                        <td>
                            {erreurs.zc && <p className="error">{erreurs.zc}</p>}
                            <input
                                type="text"
                                id="zc"
                                value={zc}
                                onChange={(e) => setzc(e.target.value)}
                            />
                        </td>
                        <td>
                            {erreurs.pn && <p className="error">{erreurs.pn}</p>}
                            <input
                                type="tel"
                                id="pn"
                                value={pn}
                                onChange={(e) => setpn(e.target.value)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2}>
                            <label htmlFor="ea">Email Address</label>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            {erreurs.ea && <p className="error">{erreurs.ea}</p>}
                            <input
                                type="email"
                                id="ea"
                                value={ea}
                                onChange={(e) => setea(e.target.value)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2}>Choose your membership level</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            {erreurs.membership && (
                                <p className="error">{erreurs.membership}</p>
                            )}

                            {ms.map((a, key) => (
                                <label key={key}>
                                    <input
                                        type="radio"
                                        name="membership"
                                        value={a}
                                        checked={membership === a}
                                        onChange={(e) => setmembership(e.target.value)}
                                    />
                                    {a}
                                </label>
                            ))}
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2}>
                            <input
                                type="submit"
                                value="Submit"
                                onClick={afficher}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

            {affichage && (
                <div className="registration">
                    <h2>Registration Details</h2>
                    <p><strong>First Name:</strong> {fn}</p>
                    <p><strong>Last Name:</strong> {ln}</p>
                    <p><strong>Street Address:</strong> {sa}</p>
                    <p><strong>Address Line 2:</strong> {al2 || 'Not provided'}</p>
                    <p><strong>City:</strong> {c}</p>
                    <p><strong>State:</strong> {s}</p>
                    <p><strong>Zip code:</strong> {zc}</p>
                    <p><strong>Phone Number:</strong> {pn}</p>
                    <p><strong>Email:</strong> {ea}</p>
                    <p><strong>Membership:</strong> {membership}</p>
                </div>
            )}
        </div>
    );
}
