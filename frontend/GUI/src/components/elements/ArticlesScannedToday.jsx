import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { Loader } from "./small/loader"

export function ArticlesScannedToday({data}){

    return(
        <li className="flex items-center justify-between py-[10px] px-[24px]">
            <div className="flex items-center gap-[12px]">
                <div>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <p>articles scanned today</p>
            </div>
            <div>{data||<Loader/>}</div>
        </li>
    )
}