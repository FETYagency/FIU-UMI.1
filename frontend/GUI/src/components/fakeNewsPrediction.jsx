import { useStore } from "../store"

const predictionStyle = {
    fake:"text-[red] text-[24px]",
    real:"text-[green] text-[24px]"
}
const bulletResponseTimeStyle = {
    fake:"w-[10px] h-[10px] rounded-full bg-[red]",
    real:"w-[10px] h-[10px] rounded-full bg-[green]"
}
const responseTimeStyle = {
    fake:"text-[red]",
    real:"text-[green]"
}
const confidenceStyle = {
    low:"bg-[red] text-[18px] text-center text-white rounded-[8px] mt-[10px] py-[6px] mb-[10px]",
    moderate: "bg-[#FE8F48] text-[18px] text-center text-white rounded-[8px] mt-[10px] py-[6px] mb-[10px]",
    high: "bg-[green] text-[18px] text-center text-white rounded-[8px] mt-[10px] py-[6px] mb-[10px]"
}
const confidenceNotes = {
    high:"The model is highly confident in this prediction.",
    moderate:"The model has moderate confidence. Consider reviewing the source or additional information.",
    low:"The model is uncertain about this prediction. Results should be verified manually."
}
export function FakeNewsPrediction({type ,title, prediction, confidence, responseTime}){
    console.log(prediction)
    const getIsLoading = useStore(state => state.getIsLoading)
    const getIsShowingPrediction = useStore(state=>state.getIsShowingPrediction)
    let translatePrediction = () =>{
        console.log(prediction)
        if(prediction && type == "DF") return prediction
        return prediction == 0 ? "FAKE" : "TRUE"
    }
    let sign = () =>{return prediction == 0 || prediction == "DEEPFAKE" ? "fake" : "real"}
    let levelConfidence = ()=>{
        if (confidence>=80) {
            console.log("high")
            return "high"
        }else if(confidence>=40 && confidence<80){
            console.log("moderate")
            return "moderate"
        }else {
            console.log("low")
            return "low"
        }
    }

    return(
        <div className="bg-gray-400/70 z-50 fixed inset-0 w-full h-full flex justify-center flex-col gap-[12px] items-center">
            <button type="button" className="bg-red-700 hover:bg-red-950 py-[10px] px-[16px] text-[16px] rounded-[16px] text-white"
                onClick={e=>{
                    getIsShowingPrediction(false)
                    getIsLoading(false)
                }}
            >BACK</button>
            <div className="text-white bg-[#090A0D] w-[400px] p-[24px] rounded-[24px]">
                <h2 className="text-[28px] mb-[10px]">{title}</h2>
                <div>
                    {/* prediction REAL-FAKE*/}
                    <div className="bg-white rounded-[8px] px-[8px] flex justify-between items-center">
                        <p className={predictionStyle[sign()]}>{`~${translatePrediction()}~`}</p>
                        <div className={`flex items-center gap-[8px]`}>
                            <div className={bulletResponseTimeStyle[sign()]}></div>
                            <p className={responseTimeStyle[sign()]}>{`${responseTime}ms`}</p>
                        </div>
                    </div>
                    {/* confidence + note */}
                    <div>
                        {/* 0-30 ~ WEAK-RED 31-80 ~ MUDIUM-ORANGE 81-100 ~STRONG-GREEN */}
                        <h3 className={confidenceStyle[levelConfidence()]} >{`Confidence accuracy is |${confidence}|`}</h3>
                        {/* HARD CODED NOTE ABOUT THE CONFIDENCE */}
                        <p>{confidenceNotes[levelConfidence()]}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}