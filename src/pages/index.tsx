import React from 'react';
import { Lolly } from '../components/Lolly';
import Header from "../components/Header"; 
import { navigate } from "gatsby";

export default function Home() {
    return (
        <div>
            <Header />
            <div className="lolliesContainer">
                <Lolly top="#6b6bde" middle="#4ac383" bottom="#d2ec27" />
                <Lolly top="#b71616" middle="#bf10f1" bottom="#10adf1" />
                <Lolly top="#ffc107" middle="#00a97e" bottom="#ec398f" />                
            </div>
            <button className="createLollyButton" onClick={() => navigate("/createNew")}>Create Lolly</button>
        </div>
    )
}
