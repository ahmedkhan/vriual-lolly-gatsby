import React, { useRef, useState } from 'react';
import {Lolly} from '../components/Lolly'
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const ADD_LOLLY = gql`
    mutation addLolly($color1: String!, 
        $color2: String!,
        $color3: String!,
        $reciever: String!,
        $sender: String!,
        $message: String!){
            addLolly(color1: $color1,color2: $color2,color3: $color3,reciever: $reciever,sender: $sender,message: $message){
                sender
                reciever
                message
                link
            }
    }
`

export default function Home() {

    const [color1, setColor1] = useState("#d52358")
    const [color2, setColor2] = useState("#e95946")
    const [color3, setColor3] = useState("#deaa43")
    const [addLolly, { data }] = useMutation(ADD_LOLLY);
    console.log(data)
    const handleSubmit = () => {
        console.log(senderField.current.value)
        console.log(recField.current.value)
        console.log(msgField.current.value)
        addLolly({
            variables: {
                color1, color2, color3,
                reciever: recField.current.value,
                sender: senderField.current.value,
                message: msgField.current.value
            }
        })
    }

    const senderField = useRef(null);
    const recField = useRef(null);
    const msgField = useRef(null);
  return (
    (<div className="container">
        <h1>Create Lolly</h1>
        <div className="main-container">

            <div>
                <Lolly top={color1} middle={color2} bottom={color3} />
                <br />
                <input type="color" value={color1} onChange={(e) => { setColor1(e.target.value) }} />
                <input type="color" value={color2} onChange={(e) => { setColor2(e.target.value) }} />
                <input type="color" value={color3} onChange={(e) => { setColor3(e.target.value) }} />
            </div>
            <div className="form-container">
                <input type="text" placeholder="To" ref={recField} />
                <textarea placeholder="Enter your message!" ref={msgField}></textarea>
                <input type="text" placeholder="From" ref={senderField} />
                <button onClick={handleSubmit}>Send</button>
            </div>
        </div>
    </div>
    )
  )
}
  