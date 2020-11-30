import axios from 'axios'
import * as authService from './auth.service';

const url = process.env.REACT_APP_API_TASK;
const config = {
    headers: {
        'Content-Type': 'application/json',
    }
}

export function preuba(){
    console.log(url);
}

export async function getTasks() {
    try {
        const data = await axios.get(url);
        const listaByUser = data.data.filter(task => task.user_id == authService.getUser() ); 
        return listaByUser;
    } catch (error) {
        console.log(error);
    }
}

export async function getTask(id) {
    try {
        const data = await axios.get(url + id);
        return data.data;
    } catch (error) {
        console.log(error);
    }

}

export async function addTask(data) {

    try {
        const res = await axios.post(url, data, config);
        return res;
    } catch (error) {
        console.log(error);
    }

}

export async function updateTask(data) {

    try {
        const res = await axios.post(url + '/' +data.id , data, config);
        return res;
    } catch (error) {
        console.log(error);
    }

}

export async function deleteTask(id) {

    try {
        const data = await axios.delete(url + '/' +id, config);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }

}

export function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 
