import React from "react";
import "tachyons";

const Rank = (props) =>{
    const { name, entries } = props
    return(
        <div>
            <div className="white f3">
                {`${name}, your current entry count is...`}
            </div>
            <div className="white f1">
                {entries}
            </div>

        </div>        
        )
    }

export default Rank;