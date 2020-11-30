import React from 'react'
import { Link, useHistory } from "react-router-dom";
import * as authService from '../Services/auth.service'


export default function Navegation() {

    let history = useHistory();

    const logOut = () => {
        authService.deleteAuth();
        authService.deleteUser();
        history.push('/');
    }

    return (
        <div>
             <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/notas"><i className="fa fa-home" aria-hidden="true"></i> Inicio</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/notas"><i className="fa fa-archive" aria-hidden="true"></i> Tareas <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/notas"><i className="fas fa-user-cog    "></i> Cuenta</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={logOut} ><i className="fa fa-user-times" aria-hidden="true"></i> Salir</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
