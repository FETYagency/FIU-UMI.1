import { useState } from "react"
import { useEffect } from "react"
import ReactTimeAgo from "react-time-ago"
import { useStore } from "../../store"
export function FakeNewsPrediction({title="TEST CARD TEST ...", prediction, confidence, responseTime}){
        const predictionTranslate = prediction==0?"FAKE":"TRUE" 
        const predictionColor = prediction==0?"red":"green"
        const confidenceNotes = {
            high:"The model is highly confident in this prediction.",
            moderate:"The model has moderate confidence. Consider reviewing the source or additional information.",
            low:"The model is uncertain about this prediction. Results should be verified manually."
        }

        const getIsShowingPrediction = useStore(state => state.getIsShowingPrediction)
        const [confidenceColor, setConfidenceColor] = useState('green')
        const [confidenceNote, setConfidenceNote] = useState(confidenceNotes.high)
        useEffect(()=>{
            if (confidence>80) {
                setConfidenceColor("green")
                setConfidenceNote(confidenceNotes.high)
            }else if(confidence>40 && confidence<80){
                setConfidenceColor("#FE8F48")
                setConfidenceNote(confidenceNotes.moderate)
            }else{
                setConfidenceColor("red")
                setConfidenceNote(confidenceNotes.low)
            }
        },[])
    return(
        <div className="bg-gray-400/70 z-50 fixed inset-0 w-full h-full flex justify-center flex-col gap-[12px] items-center">
            <button type="button" className="bg-red-700 hover:bg-red-950 py-[10px] px-[16px] text-[16px] rounded-[16px] text-white"
                onClick={e=>getIsShowingPrediction(false)}
            >BACK</button>
            <div className="text-white bg-[#090A0D] w-[400px] p-[24px] rounded-[24px]">
                <h2 className="text-[28px] mb-[10px]">{title}</h2>
                <div>
                    {/* prediction REAL-FAKE*/}
                    <div className="bg-white rounded-[8px] px-[8px] flex justify-between items-center">
                        <p className={`text-[24px] text-[${predictionColor}]`}>{`~${predictionTranslate}~`}</p>
                        <div className={`text-[${predictionColor}] flex items-center gap-[8px]`}>
                            <div className={`w-[10px] h-[10px] rounded-full bg-[${predictionColor}]`}></div>
                            <p>{`${responseTime}ms`}</p>
                        </div>
                    </div>
                    {/* confidence + note */}
                    <div>
                        {/* 0-30 ~ WEAK-RED 31-80 ~ MUDIUM-ORANGE 81-100 ~STRONG-GREEN */}
                        <h3 className={`bg-[${confidenceColor}] text-[18px] text-center text-white rounded-[8px] mt-[10px] py-[6px] mb-[10px]`} >{`Confidence accuracy is |${confidence}|`}</h3>
                        {/* HARD CODED NOTE ABOUT THE CONFIDENCE */}
                        <p>{confidenceNote}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}