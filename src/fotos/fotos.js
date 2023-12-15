import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CompFotos = () => {
    const idEntidad = '657b3dc32ceda90e6b49bdcf'

        const [entidad, setEntidad] = useState([]); 
        useEffect( () => {getUsuario()}, []);

        const getUsuario = async () => {
            fetch(`https://backend-web-martas-projects-510c4efc.vercel.app/entidades/${idEntidad}`, {
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
        
        const subirFotoIdentificativa = async(e) => {
            e.preventDefault()
            const input = document.getElementById('archivo');
            const archivos = input.files;
            if (archivos.length>0){    
                const archivo = archivos[0];
                
                var formdata = new FormData();
                formdata.append("foto", archivo);
        
                fetch('https://backend-web-martas-projects-510c4efc.vercel.app/entidades/subirFoto', {
                        method: 'POST',
                        body : formdata
                    }).then(response => response.json())
                        .then(result =>{
                            var raw = JSON.stringify({
                                "foto" : result.imageUrl
                            });
                            console.log(result.imageUrl)
                            fetch(`https://backend-web-martas-projects-510c4efc.vercel.app/entidades/${idEntidad}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: raw
                            }).then(response => response.text())
                            .then(result => {
                                console.log(result)
                                //window.location.href = `/entidades/`;
                            })
                                .catch(error => {
                                    console.error('Error al subir la imagen:', error);
                                });
                                })
                        .catch(error => {
                            console.error('Error al subir la imagen:', error);
                        });
            }else{
                alert("Selecciona una foto");   
                console.error('No se seleccionó ningún archivo.');
            }
            
        }

    return(
        <div className='container-fluid'>
            <img src={entidad.foto} alt="" style={{width:'20%'}} className="card-img-top img-fluid" />
            {(localStorage.getItem('objetoToken')!=undefined) ? 
            (<form id="formularioParte2" onSubmit={subirFotoIdentificativa}>
                <div style={{flexdirection: 'row', width:'90%'}} >
                    <input type="file" className="form-control" id="archivo" aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept=".png , .jpg"/>
                    <button className="btn btn-secondary mt-2" type="submit" >Cambiar foto</button>
                </div>
            </form>) :
            (<form id="formularioParte2" onSubmit={subirFotoIdentificativa}>
                <div style={{flexdirection: 'row', width:'90%'}} >
                    <input type="file" className="form-control" id="archivo" aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept=".png , .jpg"/>
                    <button className="btn btn-secondary mt-2" type="submit" disabled >Inicia sesion para subir foto</button>
                </div>
            </form>)
            }
        </div>
    )
}

export default CompFotos 