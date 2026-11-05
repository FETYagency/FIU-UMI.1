import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile } from "@fortawesome/free-solid-svg-icons"
import { faHexagonNodesBolt } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import ReactTimeAgo from "react-time-ago";




export function RecentCheck({type = "fk", title, confidence=50, time}){
    const [bulletColor, setBulletColor] = useState('green')
    useEffect(()=>{
        if (confidence>80) {
            setBulletColor("green")
        }else if(confidence>40 && confidence<80){
            setBulletColor("#FE8F48")
        }else{
            setBulletColor("red")
        }
    },[])
    
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
                                <li className={`text-[${bulletColor}]`}>{confidence}</li>
                                <li >
                                    <div className={`h-[6px] w-[6px] bg-[${bulletColor}] rounded-full`}></div>
                                </li>
                                <li className="text-gray-400">
                                    <ReactTimeAgo date={time} locale="en"/>
                                </li>
                            </ul>
                        </div>
                    </li>
    )
}