import React from 'react'
import { useDataLayerValue } from '../DataLayer'
import Chat from './Chat'
import ChatForm from './ChatForm'
import ChatHeader from './ChatHeader'
import './ChatSection.scss'
function ChatSection() {
    const [{ message }, dispatch] = useDataLayerValue()
    return (
        <div className="chat-section">
            <ChatHeader messages={message} />
            <Chat message={message} />
            <ChatForm />
        </div>
    )
}

export default ChatSection
