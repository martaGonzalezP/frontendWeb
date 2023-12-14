import NavbarPage from "../navbar/navbar.js";
import CompLogin from "../login/Login.js";

function paginaLogin() {
    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <CompLogin></CompLogin>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default paginaLogin