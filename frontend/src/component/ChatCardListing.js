import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect } from 'react'
import './ChatCardListing.scss'
import { useDataLayerValue } from '../DataLayer';

function ChatCardListing() {
    const [{ isLogin, message }, dispatch] = useDataLayerValue()
    console.log(message.filter(function (item, pos) {
        return message.indexOf(item) == pos;
    }))
    console.log("message mobile >>> " + message.mobile)
    return (

        <div className="chat-card-listing">
            {
                message?.map(message => (
                    message.received === true && (
                        <div className="card">
                            <div className="img-container">
                                <img alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNlAcNMi_lHFLnxKyqy4GOuEBxGaVnXDYruYa_afKoSHzvAI-&s" />
                            </div>
                            <div className="card-details">
                                <h4 className="title">
                                    {message.name}
                                </h4>
                                <p className="description">{message.message}</p>
                                <div className="time">{message.timeStamp}</div>
                                <div className="action-btn">
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </div>
                            </div>
                        </div>)
                ))
            }

        </div>


    )
}

export default ChatCardListing
