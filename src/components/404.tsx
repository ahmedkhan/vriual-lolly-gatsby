import React from "react";
import { Lolly } from "../components/Lolly";
import Header from "../components/Header";
import { useQuery, gql } from "@apollo/client";

const GET_LOLLY_BY_PATH = gql`
  query getLollies($link: String!) {
    getLollyByPath(link: $link) {
        color1
        color2
        color3
        link
        message
        reciever
        sender
      }
  }
`

export default function NotFound({ location }) {
    var queryLollies = location.pathname.slice(0, 9)
    var queryPath = location.pathname.slice(9)
  
    const { loading, error, data } = useQuery(GET_LOLLY_BY_PATH, {
      variables: { link: queryPath },
    })
  
    return (
      <div>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : !!data && queryLollies === "/lollies/" ? (
          <div>
            <Header/>
            <h5 className="sharableLinkContainer">Your sharable link: </h5>{" "}
            <span className="sharableLink">
              {" "}
              {`https://sharelolly.netlify.app/lollies/${data.getLollyByPath.link}`}
            </span>
            <div className="recievedContentContainer">
              <Lolly               
                top={data.getLollyByPath.color1}
                middle={data.getLollyByPath.color2}
                bottom={data.getLollyByPath.color3}
              />
  
              <div className="recievedTextContainer">
                <h3>HI {data.getLollyByPath.reciever.toUpperCase()}</h3>
                <p>{data.getLollyByPath.message}</p>
                <h4>From: {data.getLollyByPath.sender}</h4>
              </div>
            </div>
          </div>
        ) : (
          <div className="pageNotFound">404. Page not found.</div>
        )}
      </div>
    )
  }

  