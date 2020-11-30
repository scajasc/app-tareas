

const AUTH = 'AUTH'
const AUTH_USER = 'USER'

export function setAuth(Auth) {
    localStorage.setItem(AUTH, Auth);
}

export function getAuth() {
    return localStorage.getItem(AUTH);
}

export function deleteAuth() {
    localStorage.removeItem(AUTH);
}

export function setUser(user) {
    localStorage.setItem(AUTH_USER, user);
}

export function getUser() {
    return localStorage.getItem(AUTH_USER);
}

export function deleteUser() {
    localStorage.removeItem(AUTH_USER);
}



export default {
    setAuth,
    getAuth,
    deleteAuth,
};