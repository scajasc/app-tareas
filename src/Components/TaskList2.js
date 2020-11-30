import * as taskService from '../Services/task.service'
import React, { useEffect, useState } from 'react'

export default function TaskList2(props) {

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

    const filtrarTareas = (data) => {
        if (props.tipo == "hecho") {
            return data.filter(task => task.todo == "true");
        } else if (props.tipo == "porHacer") {
            return data.filter(task => task.todo == "false");
        } else {
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
        data = { ...data, todo: e.target.checked.toString(), };
        updateTask(data);
    }

    const cambiarTarjeta = (e) => {
        if (e == "true") {
            return "success"
        } else {
            return "secondary"
        }
    }

    const mostrarVista = (e) => {
        console.log(props.tipo + "asdsad");
        if (props.tipo == "hecho") {
            return (e == "true");
        } else if (props.tipo == "porHacer") {
            return (e == "false");
        } else {
            return true;
        }
    }

    return (
        <div>
            <table className="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col" className="text-center">#</th>
                        <th scope="col" className="text-center">Título</th>
                        <th scope="col" className="text-center">Descripción</th>
                        <th scope="col" className="text-center">Estado</th>
                        <th scope="col" className="text-center">Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map((task, index) => {
                            return <tr key={task.id} className={"table-"+cambiarTarjeta(task.todo)} >
                                <th scope="row" className="text-center">{index + 1}</th>
                                <td className="text-center">{task.title}</td>
                                <td className="text-center">{task.description}</td>
                                <td className="text-center">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id={task.id} name={task.id} onClick={(e) => onChange(e, task)} defaultChecked={(task.todo == "true")} />
                                        <label className="custom-control-label" htmlFor={task.id}></label>
                                    </div>
                                </td>
                                <td className="text-center">
                                    <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>
                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                    </button>
                                </td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}
