import NavbarPage from "../navbar/navbar.js";

function paginaInicial() {
    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h2> Esta es nuestra pagina inicial</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default paginaInicial