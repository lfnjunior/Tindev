import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Main.css';
import api from '../services/api';
import Global from '../services/Global'

import logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';
import itsamatch from '../assets/itsamatch.png';

export default function Main({ match }) {
    //Função setUsers carrega a var users - inicializada com um array vazio
    //sempre deve ser utilizado a função setUsers, não se deve usar .push() por exemplo  
    const [users, setUsers] = useState([]); // conceito de React Hook
    const [matchDev, setMatchDev] = useState(null);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id
                }
            })
            setUsers(response.data);
        }
        loadUsers();
    }, [match.params.id]);//match.params.id é a id do usuário que foi pessada pela URL

    useEffect(() => {
        const socket = io(Global.BACKEND_URL, {
            query: { user: match.params.id }
        });
        socket.on('match', dev => {
            setMatchDev(dev);
        })
        socket.on('userIn', newListUsers => {
            console.log("New list")
            console.log(newListUsers)
            setUsers(newListUsers);
        })
    }, [match.params.id]);

    //gerar like
    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id },
        })
        setUsers(users.filter(user => user._id !== id));
    }

    //gerar dislike
    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id },
        })
        /*filtra a variavel users
          para não apresentar a dev que foi dado dislike
          o react então percebe a alteração da variavel users e  */
        setUsers(users.filter(user => user._id !== id));
        }

    //renderiza os desenvolvedores
    return (
        <div className="main-container">
            <Link to="/">
                <img className="logotipo" src={logo} alt="Tindev" /></Link>
                { users.length > 0 ? (
                    <ul>
                    {users.map(user => ( /*users.map percorre o array*/
                        <li key={user._id/* React identifica esse elemento */}>
                        <img src={user.avatar} 
                             alt={user.name} />
                        <footer>
                            <strong>{user.name}</strong>
                            <p>{user.bio}</p>
                        </footer>
                            <div className="buttons">
                                <button type="button" 
                                        onClick={() => handleDislike(user._id)}>
                                    <img src={dislike} 
                                         alt="dislike" />
                                </button>
                                <button type="button" 
                                        onClick={() => handleLike(user._id)}>
                                    <img src={like} 
                                         alt="like" />
                                </button>
                            </div>
                        </li>
                ))}
                    </ul>
                ) : (
                    <div className="empty">Acabou :(</div>
                ) }

                { matchDev && (
                    
                    <div className="match-container">
                        <img src={itsamatch} alt="It's a match" />

                        <img className="avatar" src={matchDev.avatar} alt="" />
                        <strong>{matchDev.name}</strong>
                        <p>{matchDev.bio}</p>
                        
                        <button type="button" onClick={() => setMatchDev(null)}>FECHAR</button>
                    </div>
                ) }
        </div>
    )
}
