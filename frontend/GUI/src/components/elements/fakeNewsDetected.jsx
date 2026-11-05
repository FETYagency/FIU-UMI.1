import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"

import { Loader } from "./small/loader"

export function FakeNewsDetected({data}){

    return(
        <li className="flex items-center justify-between py-[10px] px-[24px]">
            <div className="flex items-center gap-[12px]">
                <div>
                    <FontAwesomeIcon icon={faCircleXmark} style={{color:"red"}}/>
                </div>
                <p>fake news detected</p>
            </div>
            <div>{data||<Loader/>}</div>
        </li>
    )
}