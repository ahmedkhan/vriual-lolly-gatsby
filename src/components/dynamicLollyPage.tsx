import React from "react";
import {Lolly} from "./Lolly";
import Header from "./Header";


export interface Props {
    pageContext: {
    color1: string
    color2: string
    color3: string
    reciever: string
    sender: string
    message: string
    link: string
  }
}

 
export default function DynamicLollyPage({ pageContext }: Props) {

  return (
    <div>
      <Header/>
      <h5 className="sharableLinkContainer">Your sharable link: </h5>{" "}
      <span className="sharableLink">
        {" "}
        {`https://vriual-lolly-gatsby.netlify.app/lollies/${pageContext.link}`}
      </span>
      <div className="recievedContentContainer">
        <Lolly          
          top={pageContext.color1}
          middle={pageContext.color2}
          bottom={pageContext.color3}
        />

        <div className="recievedTextContainer">
          <h3>HI {pageContext.reciever.toUpperCase()}</h3>
          <p>{pageContext.message}</p>
          <h4>From: {pageContext.sender}</h4>
        </div>
      </div>
    </div>
  )
}