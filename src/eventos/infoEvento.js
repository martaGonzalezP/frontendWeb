import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'react-bootstrap';
import NavbarPage from "../navbar/navbar.js";

const CompShowInfoEvento = () => {

    const {idEvento} = useParams()
    const [evento, setEntidad] = useState([]); 

    useEffect( () => {getUsuario()}, []);

    const getUsuario = async () => {
        fetch(`http://localhost:3003/eventos/getporid/${idEvento}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
        .then(data => {
            setEntidad(data);
            console.log("usuario encontrado")
            console.log(data);
        })
        .catch(error => {
            console.error('Error al obtener el usuario:', error);
        })
    }
    

    return (
        <div className='container' style={{marginTop: '3%'}}>
            <NavbarPage></NavbarPage>
            <div className='row'>

                 <div className="card-body">
                        <img src={evento.imagen} className="card-img-top" style={{ objectFit: 'contain', height: '25vmin', textAlign: 'left'}}/>        
                        <h5 className="card-title">{evento.nombre}</h5>
                        <p className="card-text">Organizador: {evento.organizador}</p>
                        {(evento.organizador == JSON.parse(localStorage.getItem('objetoToken')).correo) ?
                            <div>
                                <a href={``} className='btn btn-secondary'>Borrar</a>
                                <a href={``} className='btn btn-secondary'>Editar</a>
                            </div>
                        : 
                        <div>
                            <a href={``} className='btn btn-secondary'>No puedes Borrar</a>
                            <a href={``} className='btn btn-secondary'>No puedes Editar</a>
                        </div> 
                        }

                </div>
            </div>
        </div>
    );
}

export default CompShowInfoEvento;