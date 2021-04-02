import React, { useState } from 'react'
import './ChatForm.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faPaperclip, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import axios from '../axios'
function ChatForm() {
    const [input, setInput] = useState("")
    const sendMessage = async (e) => {
        e.preventDefault()

        await axios.post('/messages/new', {
            name: 'Ganesh Kulkarni',
            message: input,
            timeStamp: 'now niw',
            received: false
        })
        setInput("")
    }
    return (

        <div className="chat-form">
            <div className="action-btn">
                <FontAwesomeIcon className="icon-block" icon={faSmile} />
                <FontAwesomeIcon className="icon-block" icon={faPaperclip} />
            </div>
            <input className="chat-input" value={input} onChange={e => setInput(e.target.value)} placeholder="message" />
            <FontAwesomeIcon onClick={sendMessage} className="icon-block" icon={faMicrophone} />
        </div>
    )
}

export default ChatForm
