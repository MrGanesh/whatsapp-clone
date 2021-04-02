import React from 'react'
import './ChatHeader.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useDataLayerValue } from '../DataLayer';
function ChatHeader() {
    const [{ message }, dispatch] = useDataLayerValue()
    return (
        <div className="chat-header">
            <div className="img-container">
                <img alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNlAcNMi_lHFLnxKyqy4GOuEBxGaVnXDYruYa_afKoSHzvAI-&s" />
            </div>
            <div className="card-details">
                <h4 className="title">{message.name} </h4>
                <p className="desc"></p>
            </div>
            <div className="action-btn">
                <FontAwesomeIcon className="icon-block" icon={faEllipsisV} />
            </div>
        </div>
    )
}

export default ChatHeader
