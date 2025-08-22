import { useEffect, useState } from "react"



export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
const ChatPage:React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}
const Chat:React.FC = () => {

useEffect(()=> {
    let ws:WebSocket 
function createWS() {
ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
ws.addEventListener('close', ()=> {console.log('close')})
}
    createWS()

}, [])


    return (
        <div>
            <Messages ws={
                //@ts-ignore
                //не совсем понимаю, в чем ошибка, проверю
                ws}/>
            <AddMessageForm ws={
                //@ts-ignore
                ws}/>
        </div>
    )
}
const Messages:React.FC<{ws:WebSocket}> = ({ws})=> {

    const [messages, setMessages] = useState<ChatMessageType[]>([])
//чтобы интегрировать веб сокет, ддобавляем его с помощью хука. Это первый раз при вмонтировании, веб сокет подписывается на событие 
// "сообщение"
        useEffect(()=> {
        ws.addEventListener('message', (e)=> {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages)=> [...prevMessages, ...newMessages])
        })
    }, [])

    return (
        <div style={{height:"500px", overflowY:"auto"}}>
{messages.map((m, index) => <Message key ={index} message={m}/>)}

        </div>
    )
}
const AddMessageForm:React.FC<{ws:WebSocket}> = ({ws})=> {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    useEffect(()=> {ws.addEventListener('open', ()=> {setReadyStatus('ready')})}, [])
    const sendMessage = () => {
        if(!message) {
            return
        }
        ws.send(message)
        setMessage('')
    }
    return (
        <div>
            <div><textarea onChange={(e)=> {setMessage(e.currentTarget.value)}} value ={message}/></div>
            <div>
            <button disabled={readyStatus !== 'ready'} onClick={sendMessage}>send</button>
            </div>
        </div>
    )
}
const Message:React.FC<{message:ChatMessageType}> = ({message})=> {

    return (
        <div>
            <div>
                <img src={message.photo}/>
                <b>{message.userName}</b>
            </div>
            <div>{message.message}</div>
            <hr/>
        </div>
    )
}
export default ChatPage