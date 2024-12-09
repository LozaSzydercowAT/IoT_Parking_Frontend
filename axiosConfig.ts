import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:3200/api',
})

export default instance
