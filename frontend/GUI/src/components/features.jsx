import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBoltLightning} from "@fortawesome/free-solid-svg-icons"
import {faEye} from "@fortawesome/free-solid-svg-icons"
import {faChartLine} from "@fortawesome/free-solid-svg-icons"
export  function Features(){
    return(
        <div className="features text-white flex gap-[40px] flex ">
            <article className="bg-[#111418] rounded-[8px] p-[24px]">
                <FontAwesomeIcon icon={faBoltLightning} style={{color: "#D91E1E",}} />
                <h3 className="text-[16px] text-gray-400">pattern detection</h3>
                <p className="text-[14px]">identifies linguistic markers used in misinformation campaigns</p>
            </article>
            <article className="bg-[#111418] rounded-[8px] p-[24px]">
                <FontAwesomeIcon icon={faEye} style={{color: "yellow",}} />                
                <h3 className="text-[16px] text-gray-400">source verification</h3>
                <p className="text-[14px]">corss-checks against a database credible and flagged domains</p>
            </article>
            <article className="bg-[#111418] rounded-[8px] p-[24px]">
                <FontAwesomeIcon icon={faChartLine} style={{color: "rgb(99, 230, 190)",}} />                
                <h3 className="text-[16px] text-gray-400">credibility score</h3>
                <p className="text-[14px]">aggregates 12+ signals into a transparent 0-100 score</p>
            </article>
        </div>
    )
}
