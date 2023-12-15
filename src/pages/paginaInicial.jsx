import NavbarPage from "../navbar/navbar.js";
import Mostrar from "../eventos/mostrarEventos.js"

function paginaInicial() {
    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <Mostrar></Mostrar>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default paginaInicial