import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonFallingBurst } from "@fortawesome/free-solid-svg-icons"

import { Loader } from "./small/loader";


export function AvgCredibility({data}){
    return(
        <li className="flex items-center justify-between py-[10px] px-[24px]">
            <div className="flex items-center gap-[12px]">
                <div>
                    <FontAwesomeIcon icon={faPersonFallingBurst} style={{color:"orange"}}/>
                </div>
                <p>avg credibility score</p>
            </div>
            <div>{data?`${data} / 100`:<Loader/>}</div>
        </li>
    )
}