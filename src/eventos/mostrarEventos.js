import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const CompMostrarEventos = () => {

    const [eventos, setEventos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const position = [36.72016,-4.42034]

    const {idUsuario} = useParams()
    useEffect(() => {
        getEventos()
       
    }, []);

    const getEventos = async () => {
        // Hacer la solicitud para obtener productos desde el backend
        fetch('https://backend-web-martas-projects-510c4efc.vercel.app/eventos/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
          .then(data => {
                // Actualizar el estado con los productos obtenidos
                setEventos(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
            });
    }

    const buscarEventos = async (e) => {
        e.preventDefault()

        if(busqueda!=""){
            console.log("desc")
            let raw = JSON.stringify({
                "direccion": busqueda.toString()
              });
            // Hacer la solicitud para obtener productos desde el backend
            fetch('https://backend-web-martas-projects-510c4efc.vercel.app/eventos/eventosCercanos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : raw
            }).then(response => response.json())
                .then(data => {
                    // Actualizar el estado con los productos obtenidos
                    setEventos(data);
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error al obtener productos:', error);
                });
        }else{
            limpiarSeleccion()
        }
    }

    const limpiarSeleccion = async () =>{
        setBusqueda("");
        getEventos()
    }


return(
    <div>
        <div className="row"> 
            <div className="buscador col 4">
                <form className="buscador" onSubmit={buscarEventos}>
                    <input value={busqueda} className="barrabusqueda col 1" 
                        onChange={(e) => setBusqueda(e.target.value)} type="string" placeholder="Busca aquí ..." />
                    <button className="botonBusqueda col 1" type="submit" >Buscar</button>
                    <button onClick={limpiarSeleccion} className="btn btn-outline-dark btn-sm col 1" >Limpiar</button>
                </form>
            </div>
        </div>

        <div className='row'>
            {position[0] !== 0 && position[1] !== 0 && (
            <MapContainer center={position} zoom={13} style={{ height: '400px', width: '80%', marginLeft: '10%', marginBottom: '2%'}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
                    OpenStreetMap</a> contributors'
                />
                
                {eventos && eventos.map((even, index) => (
                        <Marker
                            key={index}
                            position={[even.coordenadas.lat, even.coordenadas.lon]}
                        >
                            <Popup>{`${even.nombre}`}</Popup>
                        </Marker>
                    ))}
            </MapContainer>)}
        </div>

        <div className="row" style={{justifyContent: 'center'}}>  
            {eventos.length==0 ? (
                <p> No hay eventos que cumplan con los criterios de búsqueda.</p> 
            ) : eventos.map((even,index ) => (
                <div className="card tarjeta col-md-3 col-sm-2"  key={index}>
                    <div className="card-body">
                        <h5 className="card-title">{even.nombre}</h5>
                        <p className="card-text">Organizador: {even.organizador}</p>
                        {localStorage.getItem('objetoToken')!=undefined ?
                        (<a href={`/infoEvento/${even._id}`} className='btn btn-secondary'>Ver mas informacion</a>) :
                        (<a href={'/login'} className='btn btn-secondary'>Inicia sesion para ver mas informacion</a>)
                        }
                    </div>
                </div>
            ))}
        </div>
    </div>


    )
}

export default CompMostrarEventos