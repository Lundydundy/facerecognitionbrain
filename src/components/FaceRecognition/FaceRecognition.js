import React from "react";
import "tachyons";
import "./FaceRecognition.css"

const FaceRecognition = ( { imageURL, box } ) =>{
    if(imageURL === ""){
        return(
            <div className="center ma">
                <div className="absolute mt2">
                    <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}} ></div>
                </div>
            </div>        
            )
        }else
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="input" src={imageURL} alt="face" width="500px" height="auto"/>
                <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}} ></div>
            </div>
        </div>        
        )
    }

export default FaceRecognition;