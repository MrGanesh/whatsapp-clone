import React from 'react'
import { useDataLayerValue } from '../DataLayer'
import './Chat.scss'
function Chat() {
    const [{ message }, dispatch] = useDataLayerValue()
    console.log("messages >>>> " + message)
    return (

        <div className="chat-secton">
            {message.map(message => (

                <div className={`chat ${message.received ? "you" : "me"}`}>
                    <span className="name">{message.name}</span>
                    <p className="msg">
                        {message.message}
                    </p>
                    <span className="time">
                        {message.timeStamp}
                    </span>
                </div>
            ))}


            {/* <div className="chat me">
                <span className="name">Ganesh</span>
                <p className="msg">
                    This is a message
            </p>
                <span className="time">
                    10:30 PM
            </span>
            </div> */}
        </div>

    )
}

export default Chat
