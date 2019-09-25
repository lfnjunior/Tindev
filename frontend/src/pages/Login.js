import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/logo.svg';

import api from '../services/api';
import Alert from '../Components/Alert/Alert';

export default function Login({ history }) {
    const [username, setUsername] = useState('');
    const [alert, setAlert] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault()
        setAlert(null);
        //grava usuário no via api nodejs no backend
        const resposta = await api.post('/devs', {
            username
        })
        if (resposta.data._id) {
            const { _id } = resposta.data;
            history.push(`/dev/${_id}`);
        } else {
            setAlert('Conta GitHub não encontrada!')
        }
    }

    return (
        <div className="login-container" >
            <form onSubmit={handleSubmit}>
                <img className="logotipo" src={logo} alt="Tindev" />
                <input
                    placeholder="Acesse com sua conta do Github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button className="btnSend" type="submit">Enviar</button>
            </form>
            { alert && 
                <Alert color="danger" message={alert} />
            }
        </div>
    );
}
