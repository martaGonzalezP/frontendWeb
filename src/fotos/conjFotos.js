
import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CompConjutoFotos = () => {
    const idEntidad = '657b3dc32ceda90e6b49bdcf'

    const [arrayFotos,setArrayFotos]= useState([]);
    const [entidad,setEntidad] = useState([]);

    useEffect( () => {getUsuario()}, []);

    const getUsuario = async () => {
        fetch(`http://localhost:3003/entidades/${idEntidad}`, {
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
        

    const subirFotos = async(e) => {
        e.preventDefault()
        const input2 = document.getElementById('archivos2');
        const archivos2 = input2.files;
        if(entidad.imagenes && entidad.imagenes.length > 0){
            for (let i = 0; i < entidad.imagenes.length; i++) {
                arrayFotos.push(entidad.imagenes[i])
                setArrayFotos(arrayFotos)
            }
        }
        if (archivos2.length>0){
            for (let i = 0; i < archivos2.length; i++) {
                const arch = archivos2[i];
                var formdata = new FormData();
                formdata.append("foto", arch);
        
                fetch('http://localhost:3003/entidades/subirFoto', {
                    method: 'POST',
                    body : formdata
                }).then(response => response.json())
                    .then(result =>{
                        arrayFotos.push(result.imageUrl)
                        setArrayFotos(arrayFotos)
                        if (i === (archivos2.length-1)){
                            actualizarElproducto()
                        }
                    })
                    .catch(error => {
                        console.error('Error al subir la imagen:', error);
                    });
            }
        }else{
            alert('Sin Archivos');
        }
    }

    const actualizarElproducto = async() => {
        var raw = JSON.stringify({
            "imagenes" : arrayFotos
            });
        fetch(`http://localhost:3003/entidades/${idEntidad}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        }).then(response => response.text())
        .then(result => {
            alert('Foto subida');
            setArrayFotos([])
            window.location.reload()
        })
            .catch(error => {
                console.error('Error al subir la imagen:', error);
            });
    }

    return(

        <div className='container-fluid'>
            {(entidad.imagenes && entidad.imagenes.length > 0) && 
           <div id="carouselExampleDark" className="carousel carousel-dark slide" style={{width: '20%'}}>
                <div className="carousel-inner">
                    {entidad.imagenes.map((imagen, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img src={imagen} className="d-block w-100" alt=" " style={{height: '30vmin'}} />
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
                </button>
            </div>
            }

            <form id="formularioParte2" onSubmit={subirFotos}>
                <div style={{flexdirection: 'row', width:'90%'}} >
                    <input type="file" className="form-control" id="archivos2" aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept=".png , .jpg" multiple/>
                    <button className="btn btn-secondary mt-2" type="submit" >Cambiar foto</button>
                </div>
            </form>
        </div>
    )
}

export default CompConjutoFotos 