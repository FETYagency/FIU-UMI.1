import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAlarmClock } from "@fortawesome/free-solid-svg-icons"

export function AvgResponseTime({data=[]}){
    const avgTimesArr = data.length==0?0:Number(data.reduce((t,check)=>(t+check.RESPONSE_TIME),0)/data.length).toFixed(4)
    return(
        <li className="flex items-center justify-between py-[10px] px-[24px]">
            <div className="flex items-center gap-[12px]">
                <div>
                    <FontAwesomeIcon icon={faAlarmClock} style={{color:"green"}}/>
                </div>
                <p>avg respons time</p>
            </div>
            <p>{`${avgTimesArr}ms`}</p>
        </li>
    )
}