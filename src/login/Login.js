import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CompLogin = () => {
    const navigate = useNavigate()

    const volverAtras = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    useEffect (() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "1052996471072-3kmbovt9r51s48npcmqenmt0pd3qu3ip.apps.googleusercontent.com",
            callback: handleCallBackResponse
        });

        /* global google */
        google.accounts.id.renderButton(
            document.getElementById("singInDiv"),
            {theme: "outline", size:"large"}

        );
        
    }, []);

    function handleCallBackResponse (response){
        console.log("Encode JWT: "+  response.credential)
        fetch(`http://localhost:3003/entidades/loginToken/${response.credential}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
          .then(data => {
                // Actualizar el estado con los productos obtenidos
                if (data){
                    data.tokenCompleto= response.credential
                    localStorage.setItem('objetoToken', JSON.stringify(data));
                    window.location.href="/entidades"
                    //console.log(JSON.parse(localStorage.getItem('objetoToken')))
                }
                        
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
            });
    }

    function handleSingOut (e) {
        google.accounts.id.signOut().then(function () {
            console.log('User signed out.');
            });
    }


    return (
        <div className="container">
            {/*<button onClick={volverAtras} className='btn btn-secondary mt-2'> Volver atrás</button>*/}            
            <div id='singInDiv'></div>
        </div>
    )
}

export default CompLogin 