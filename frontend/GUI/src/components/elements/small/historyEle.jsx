import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile } from "@fortawesome/free-solid-svg-icons"
import { faHexagonNodesBolt } from "@fortawesome/free-solid-svg-icons"
import ReactTimeAgo from "react-time-ago";
const styleObject = {
    confidenceStyle:{
        low:"text-[red]",
        moderate:"text-[#FE8F48]",
        high:"text-[green]",
    },
    bulletStyle:{
        low:"bg-[red] h-[6px] w-[6px] rounded-full",
        moderate:"bg-[#FE8F48] h-[6px] w-[6px] rounded-full",
        high:"bg-[green] h-[6px] w-[6px] rounded-full",
    }
}

export function RecentCheck({type, title, confidence, time}){
    let level
    if (confidence>80) {
        level = "high"
    }else if(confidence>40 && confidence<80){
        level = "moderate"
    }else{
        level = "low"
    }

    return(
        <li className="flex gap-[12px] text-[12px] border-t-[1px] border-t-gray-400 py-[10px] px-[24px]">
            <div>
                {
                    type=="DF"
                    ?<FontAwesomeIcon icon={faHexagonNodesBolt} />
                    :<FontAwesomeIcon icon={faFile} />
                }
            </div>
            <div>
                <p>{title}</p>
                <ul className="flex items-center gap-[6px]">
                    <li className={styleObject.confidenceStyle[level]}>{confidence}</li>
                    <li >
                        <div className={styleObject.bulletStyle[level]}></div>
                    </li>
                    <li className="text-gray-400">
                        <ReactTimeAgo date={time} locale="en"/>
                    </li>
                </ul>
            </div>
        </li>
    )
}