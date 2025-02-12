import axios from 'axios'

const instance = axios.create({
// baseURL:'https://driver-manager-backend.vercel.app'
// baseURL:'http://192.168.100.108:4000/'
baseURL:'http://localhost:4000/'

})

export default instance