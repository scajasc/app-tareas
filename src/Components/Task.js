import React, { useState, useEffect } from 'react'
import * as taskService from '../Services/task.service'
import * as authService from '../Services/auth.service'
import TaskList from './TaskList';
import TaskList2 from './TaskList2';


function Task() {

    const [clic, setClic] = useState(0);
    const [tipoL, setTipo] = useState("todo");
    const [estado, setEstado] = useState("lista");
    const [task, setTask] = useState({
        id: taskService.makeid(9),
        title: "",
        description: "",
        todo: "false",
        user_id: authService.getUser()
    });


    useEffect(() => {
        setClic(e => e + 1);
        console.log(clic)
    }, []);

    const addTask = async () => {
        const res = await taskService.addTask(task);
        console.log(res);
        setClic(e => e + 1);
        resetTask();
    }

    const resetTask = () => {
        setTask({
            id: taskService.makeid(9),
            title: "",
            description: "",
            todo: "false",
            user_id: authService.getUser()
        });
    }

    onsubmit = (e) => {
        e.preventDefault();
        addTask();
    }

    const onChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value, });
    }

    const cambairVista = (estado) => {
        if (estado == "hecho") {
            setTipo("hecho");
        } else if (estado == "porHacer") {
            setTipo("porHacer");
        } else {
            setTipo("todo");
        }
        setClic(e => e + 1);
    }

    const cambairEstado = (e) => {
        setEstado(e);
    }

    const cambairLista = (e) => {
        if (estado === e) {
            console.log(estado)
            return true;
        } else{
            return false;
        }
    }

    const valor = () => {
        //console.log(tipoL)
        return tipoL
    }




    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 p-3">
                    <div className="btn-group btn-block" role="group" aria-label="Basic example">
                        <button type="button" data-toggle="modal" data-target="#staticBackdrop" className="btn btn-primary"><i className="fas fa-plus" /> Agregar</button>
                        <button type="button" className="btn btn-secondary" onClick={() => cambairVista("todo")} ><i className="fas fa-tasks" /> Todos</button>
                        <button type="button" className="btn btn-secondary" onClick={() => cambairVista("hecho")} ><i className="fas fa-check" /> Hechos</button>
                        <button type="button" className="btn btn-secondary" onClick={() => cambairVista("porHacer")} ><i className="fas fa-dot-circle" /> Por hacer</button>
                    </div>
                </div>
                <div className="col-md-6 p-3">
                    <div className="btn-group btn-block" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-secondary" onClick={() => cambairEstado("lista")} ><i className="fas fa-grip-horizontal" /> Tarjetas</button>
                        <button type="button" className="btn btn-secondary" onClick={() => cambairEstado("cuadricula")} > <i className="fas fa-list-ul" /> Lista</button>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <form onsubmit={onsubmit}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Crear Tarea</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <input className="form-control"
                                        type="text" name="title"
                                        id="title"
                                        value={task.title}
                                        onChange={onChange}
                                        placeholder="Ingrese el Título de la tarea" />
                                </div>
                                <div className="form-group">

                                    <textarea className="form-control"
                                        name="description"
                                        id="description"
                                        value={task.description}
                                        onChange={onChange}
                                        placeholder="Ingrese la descripcion" ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={() => resetTask()} className="btn btn-secondary" data-dismiss="modal"><i className="fa fa-times" aria-hidden="true" ></i> Cerrar</button>
                                <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Guardar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
              
            {cambairLista("lista") && <TaskList clic={clic} tipo={valor()}></TaskList>}
            
            {cambairLista("cuadricula") && <TaskList2 clic={clic} tipo={valor()}></TaskList2> }

        </div>
    )
}

export default Task
