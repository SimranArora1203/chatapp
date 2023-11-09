import React,{useEffect, useState}from 'react'
import {user} from "../Join/Join";
import Picker from 'emoji-picker-react';
import './Cchat.css';
import sendLogo from "../../images/send.png"
import socketIo from "socket.io-client";
// import Message from "../Message/Message";
import Message from "../Message/Message";  
import closeIcon from "../../images/closeIcon.png"
import ReactScrollToBottom from "react-scroll-to-bottom"
const ENDPOINT="http://localhost:4500";
let socket;
const Cchat = () => {
    const [showPicker,setShowPicker]=useState(false);
    const [id,setid]=useState("")
     const [messages,setMessages]=useState([])
    //  const onEmojiClick=(event,emojiObject)=>{
    //     setInputStr(prevInput=>prevInput+emojiObject.emoji);
    //     setShowPicker(false);
    //  }
   const send=()=>{
    const message=document.getElementById('chatInput').value;
    socket.emit('message',{message,id});
    document.getElementById('chatInput').value="";
   }

   console.log(messages);
    useEffect(()=>{
          socket=socketIo(ENDPOINT,{transports:['websocket']});
        socket.on('connect',()=>{
            alert("connected");
            setid(socket.id);
        })
       console.log(socket)
      socket.emit('joined',{user});
       socket.on('welcome',(data)=>{
        setMessages([...messages,data]);
        console.log(data.user,data.message);
       }) 

       socket.on('userJoined',(data)=>{
        setMessages([...messages,data]);
        console.log(data.user,data.message);
       })

       socket.on('leave',(data)=>{
        setMessages([...messages,data]);
        console.log(data.user,data.message);
       })
        return()=>{
  socket.emit('userDisconnect');
  socket.off();
        }
    },[]);
    useEffect(()=>{
        socket.on('sendMessage',(data)=>{
            setMessages([...messages,data]);
            console.log(data.user,data.message,data.id);
        })
        return()=>{
            socket.off();
           
        }
    },[messages])
  return (
    <div className="chatPage">
    <div className="chatContainer">
        <div className="header">
         <h2>C CHAT</h2>
       <a href="/"><img src={closeIcon}alt="close"/></a>  
        </div>
        <ReactScrollToBottom className="chatBox">
        {
            messages.map((item,i)=> <Message user={item.id===id?'':item.user}  message={item.message} classs={item.id===id?`right`:`left`}/>
            )
        }
        
        </ReactScrollToBottom>
        <div className="inputBox">
            <input onKeyPress={(event)=>event.key==='Enter'?send():null}type="text"id="chatInput"/>

            <button onClick={send} className="sendBtn"><img src={sendLogo}alt="Send"/></button>
        </div>
    </div>
    
    </div>
  )
}

export default Cchat