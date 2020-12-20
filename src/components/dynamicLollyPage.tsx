import React from "react";
import {Lolly} from "./Lolly";
import Header from "./Header";
import { graphql } from "gatsby";


export const query = graphql`
  query MyQuery($lollyPath: String!) {
    LOLLIES {
      getLollyByPath(lollyPath: $lollyPath) {
        color1
        color2
        color3
        link
        message
        reciever
        sender
      }
    }
  }
`
 
export default function DynamicLollyPage({ data }) {

  return (
    <div>
      <Header/>
      <h5 className="sharableLinkContainer">Your sharable link: </h5>{" "}
      <span className="sharableLink">
        {" "}
        {`https://sharelolly.netlify.app/lollies/${data.LOLLIES.getLollyByPath.link}`}
      </span>
      <div className="recievedContentContainer">
        <Lolly          
          top={data.LOLLIES.getLollyByPath.color1}
          middle={data.LOLLIES.getLollyByPath.color2}
          bottom={data.LOLLIES.getLollyByPath.color3}
        />

        <div className="recievedTextContainer">
          <h3>HI {data.LOLLIES.getLollyByPath.reciever.toUpperCase()}</h3>
          <p>{data.LOLLIES.getLollyByPath.message}</p>
          <h4>From: {data.LOLLIES.getLollyByPath.sender}</h4>
        </div>
      </div>
    </div>
  )
}