export const URL = 'http://localhost:5005';

export const getUser = () => {
    try {
        return JSON.parse(window.localStorage.getItem('user'))
    } catch { }
}