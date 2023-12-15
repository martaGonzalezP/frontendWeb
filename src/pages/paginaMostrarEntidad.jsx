import NavbarPage from "../navbar/navbar.js";
import Fotos from "../fotos/fotos.js"
import ConjFotos from "../fotos/conjFotos.js"


function paginaMostrarEntidad() {
    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h2>MostrarInfo Entidad</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Fotos></Fotos>
                        <a>--------------------------------------------------------------------</a>
                        <ConjFotos></ConjFotos>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default paginaMostrarEntidad