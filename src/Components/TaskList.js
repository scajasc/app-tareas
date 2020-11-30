import * as taskService from '../Services/task.service'
import React, { useEffect, useState } from 'react'

function TaskList(props) {
    const [tasks, setTasks] = useState([]);
    const [tipoL, setTipo] = useState(props.tipo);

    useEffect(() => {
        setTipo(props.tipo);
        //console.log(tipoL);
    }, []);

    useEffect(() => {
        getTasks();
        console.log(props.tipo)
    }, [props.clic]);


    const mensaje = () => {
        console.log("esta llamando al mensaje")
    }

    const getTasks = async () => {
        const data = await taskService.getTasks();
        const tareas = filtrarTareas(data);
        console.log(tareas);
        setTasks(tareas);
    }

    const filtrarTareas= (data) =>{
        if (props.tipo == "hecho") {
            return data.filter(task => task.todo == "true" ); 
        } else if(props.tipo == "porHacer"){
            return data.filter(task => task.todo == "false" ); 
        }else{
            return data;
        }
    }

    const deleteTask = async (id) => {
        console.log(id)
        const res = await taskService.deleteTask(id);
        getTasks();
        console.log(res);
    }

    const updateTask = async (data) => {
        const res = await taskService.updateTask(data);
        getTasks();
        console.log(res);
    }

    const onChange = (e, data) => {
        data = {...data, todo: e.target.checked.toString(),};
        updateTask(data);
    }

    const cambiarTarjeta = (e) =>{
        if (e == "true") {
            return "secondary"
        } else {
            return "dark"
        }
    }

    const mostrarVista = (e) =>{
        console.log(props.tipo + "asdsad");
        if (props.tipo == "hecho") {
            return (e == "true");
        } else if(props.tipo == "porHacer"){
            return (e == "false");
        }else{
            return true;
        }
    }

    return (

        <div className="row">
            {
                tasks.map(task => {
                    return <div className="col-md-4 p-3">
                        <div className="card" key={task.id} >
                            <div className={"card-header bg-"+cambiarTarjeta(task.todo)+" text-white d-flex justify-content-between"}>
                                <h4>{task.title}</h4>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id={task.id} name={task.id} onClick={(e) =>onChange(e,task)} defaultChecked={(task.todo == "true")} />
                                    <label className="custom-control-label" htmlFor={task.id}>Hecho</label>
                                </div>
                            </div>
                            <div className="card-body">
                                <p>
                                    {task.description}
                                </p>
                                
                            </div>
                            <div className="card-footer text-center">
                                <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>
                                    <i className="fa fa-trash" aria-hidden="true"></i> Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default TaskList
