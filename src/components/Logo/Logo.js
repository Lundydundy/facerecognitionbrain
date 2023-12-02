import React from "react";
import "tachyons";
import Tilt from 'react-parallax-tilt';
import "./Logo.css"
import brain from "./brain.png"

const Logo = () =>{
    return(
        <Tilt className="Tilt br2 shadow-2" style={{ height: '150px', width:"150px", marginLeft: "10px" }}>
            <div className="inner-tilt">
                <img src={brain} alt="logo"></img>
            </div>        
        </Tilt>
    )
}

export default Logo