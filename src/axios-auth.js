import axios from 'axios'

let axiosInstance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1'
})

//  axiosInstance.defaults.headers.common['xyz'] = 'xyz'
export default axiosInstance