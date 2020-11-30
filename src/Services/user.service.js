import axios from 'axios'
import * as authService from './auth.service'


const url = process.env.REACT_APP_API_USER;
const config = {
    headers: {
        'Content-Type': 'application/json',
    }
}


export async function getUsers() {
    try {
        const data = await axios.get(url);
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getUser(id) {
    try {
        const data = await axios.get(url + id);
        return data.data;
    } catch (error) {
        console.log(error);
    }

}

export async function addUser(data) {

    try {
        const res = await axios.post(url, data, config);
        return res;
    } catch (error) {
        console.log(error);
    }

}

export async function updateUser(data) {

    try {
        const res = await axios.post(url + '/' +data.id , data, config);
        return res;
    } catch (error) {
        console.log(error);
    }

}

export async function deleteUser(id) {

    try {
        const data = await axios.delete(url + '/' +id, config);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }

}

export async function login(data) {

    try {
        const res = await obtenerUser(data);
        if(res){
            authService.setUser(res.id);
            authService.setAuth(true);
            return res;
        }else{
            return res;
        }
    } catch (error) {
        console.log(error);
    }

}

async function obtenerUser(data){
    const res = await getUsers();
    const r = false;
    for (const user of res) {
        if(user.email === data.email){
            if(user.password === data.password){
                return user;
            }
        }
    }

    return r;
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
 
