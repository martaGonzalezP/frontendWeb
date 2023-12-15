import React, { useState, useEffect } from 'react';
import { redirect, useParams } from 'react-router-dom';
import NavbarPage from "../navbar/navbar.js";

const CompCrearEvento = () => {

    const {idUsuario} = useParams()
    const [nombre,setNombre]=useState('')
    const [lugar,setLugar]=useState('')
    const [fecha, setFecha]=useState('')
    const [hora,setHora] = useState('')
    const [idnuevoEvento,setEvento]=useState('')


    const mostrarParte2 = async(e) => {
        e.preventDefault()

        var raw = JSON.stringify({
            "nombre": nombre,
            "lugar": lugar,
            "fecha": fecha+'T'+hora,
            "organizador": JSON.parse(localStorage.getItem('objetoToken')).correo
          });

        fetch('https://backend-web-martas-projects-510c4efc.vercel.app/eventos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        }).then(response => response.text())
            .then(result => {
                console.log(result)
                setEvento(result)
            })
            .catch(error => {
                console.error('Error al crear producto:', error);
            });
        document.getElementById('parte1').style.display = 'none';
        document.getElementById('parte2').style.display = 'block';
    }

    const subirFotoIdentificativa = async(e) => {
        e.preventDefault()
        const input = document.getElementById('archivo');
        const archivos = input.files;
        if (archivos.length>0){    
            const archivo = archivos[0];
            
            var formdata = new FormData();
            formdata.append("foto", archivo);
    
            fetch('https://backend-web-martas-projects-510c4efc.vercel.app/eventos/subirFoto', {
                    method: 'POST',
                    body : formdata
                }).then(response => response.json())
                    .then(result =>{
                        var raw = JSON.stringify({
                            "imagen" : result.imageUrl
                          });
                        console.log("este es el id:", idnuevoEvento)
                        console.log(result.imageUrl)
                        fetch(`https://backend-web-martas-projects-510c4efc.vercel.app/eventos/${idnuevoEvento.replace(/"/g, '')}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: raw
                        }).then(response => response.text())
                        .then(result => {
                            console.log(result)
                            alert("Evento Creado")
                            window.location.href = `/`;
                        })
                            .catch(error => {
                                console.error('Error al subir la imagen:', error);
                            });
                            })
                    .catch(error => {
                        console.error('Error al subir la imagen:', error);
                    });
        }else{
            alert("Producto Creado")
            window.location.href = `/`;
        }        
    }


return(
    <div className='container'>
        <NavbarPage></NavbarPage>
        <div id="parte1" className="formularioCrear">
            <h2>Paso 1 de 2 </h2>
            <form id="formularioParte1" onSubmit={mostrarParte2}>
                <a>Nombre:</a><br/>
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} 
                type="text" id="nombre" className="form-control" required/>
                <br/>

                <a>Fecha:</a><br/>
                <input value={fecha} onChange={(e) => setFecha(e.target.value)} 
                 type="date" id="fecha" className="form-control" required></input>
                <br/>

                <a>Hora:</a><br/>
                <input value={hora} onChange={(e) => setHora(e.target.value)} 
                type="time" id="hora" className="form-control" required/><span className="input-group-text">€</span>
                <br/>

                <a>Lugar:</a><br/>
                <input value={lugar} onChange={(e) => setLugar(e.target.value)} 
                type="text" id="lugar" className="form-control" required/>
                <br/>

                <button className=" btn btn-secondary " type="submit" >Continuar</button>
            </form>
        </div>

        <div id="parte2" className="formularioCrear" style={{display: 'none'}}>
            <h2>Parte 2</h2>
            <form id="formularioParte2" onSubmit={subirFotoIdentificativa}>
                <div style={{flexdirection: 'row'}} >
                    <a>Añade imagen promocional:</a><br/> <br/>
                    <input type="file" className="form-control" id="archivo" aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept=".png , .jpg"/>
                    <button className="btn btn-secondary" type="submit">Enviar</button>
                </div>
            </form>
        </div>        
    </div>

    )
}

export default CompCrearEvento;