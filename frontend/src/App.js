import './App.scss';
import ProfileSection from './component/ProfileSection';
import SearchPeople from './component/SearchPeople';
import ChatCardListing from './component/ChatCardListing';
import ChatSection from './component/ChatSection';
import Login from './component/Login';
import Pusher from 'pusher-js'
import { useEffect, useState } from 'react'
import axios from './axios'
import { useDataLayerValue } from './DataLayer';
function App() {

  const [{ isLogin, message }, dispatch] = useDataLayerValue()

  useEffect(() => {
    axios.get('/messages/sync')
      .then(res => {
        // console.log(res)

        dispatch({
          type: 'SET_MESSAGE',
          message: res.data
        })
      })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('af6db6e1fbc26b9813d7', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function (newMessage) {
      alert(JSON.stringify(newMessage));
      dispatch({
        type: 'SET_MESSAGE',
        message: [...message, newMessage]
      })
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [message])

  console.log(message)

  console.log("user >>> " + isLogin)
  return (
    <>
      {
        !isLogin ? (<Login />) : (

          <div className="App">
            <div className="left-side">
              <ProfileSection />
              <SearchPeople />
              <ChatCardListing />
            </div>
            <div className="right-side">
              <ChatSection />
            </div>

          </div>
        )
      }
    </>
  );
}

export default App;
