import axios from "axios"

export const axiosWithAuth=()=>{
    //grabs an auth token from localStorage
    const token=JSON.parse(localStorage.getItem('token'));
    return axios.create({
        headers: {
            Authorization: token
        },
        baseURL: 'http://localhost:5000'
    })
}