import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://whatsapp-clone-chat-app.herokuapp.com/'
})

export default instance