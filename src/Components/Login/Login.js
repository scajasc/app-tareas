
import './Login.css';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import * as userService from '../../Services/user.service'
import * as authService from '../../Services/auth.service'

export default function Login() {

    const [newUser, setNewUser] = useState({
        id: userService.makeid(10),
        user_name: "",
        password: "",
        email: ""
    });

    const [user, setUser] = useState({
        password: "",
        email: ""
    });

    let history = useHistory();

    const addUser = async () => {
        const res = await userService.addUser(newUser);
        if (res) {
            authService.setAuth(true);
            authService.setUser(newUser.id);
            history.push('/notas');
            resetUser();
        }
    }

    const login = async () => {
        const res = await userService.login(user);
        if(!res) return res;
        history.push('/notas');
    }

    const resetUser = () => {
        setNewUser({
            id: userService.makeid(10),
            user_name: "",
            password: "",
            email: ""
        });
    }

    onsubmit = (e) => {
        e.preventDefault();
        addUser();
    }

    const onChangeR = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value, });
    }

    const onSubmitL = (e) => {
        e.preventDefault();
        login();
        
    }

    const onChangeL = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value, });
    }

    return (
        <div>
            <div className="container login-container">
                <div className="row">
                    <div className="col-md-6 login-form-1">
                        <h3> <i className="fas fa-user-lock" /> Iniciar Sesión</h3>

                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Tu Email *" name="email" value={user.email} onChange={onChangeL} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Tu Contraseña *" name="password" value={user.password} onChange={onChangeL} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-dark btn-block" onClick={onSubmitL} >Ingresar</button>
                        </div>


                    </div>
                    <div className="col-md-6 login-form-2">
                        <form onsubmit={onsubmit}>
                            <h3><i className="fas fa-user-edit"></i> Registro</h3>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Email *" name="email" value={newUser.email} onChange={onChangeR} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Nombre de Usuario *" name="user_name" value={newUser.user_name} onChange={onChangeR} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Tu Contraseña *" name="password" value={newUser.password} onChange={onChangeR} />
                            </div>
                            <hr />
                            <div className="form-group">
                                <button type="submit" className="btn btn-dark btn-block" >Crear Cuenta</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
