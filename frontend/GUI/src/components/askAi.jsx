import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faNewspaper } from "@fortawesome/free-solid-svg-icons"
import {faHexagonNodesBolt} from "@fortawesome/free-solid-svg-icons"
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"

import { useStore } from "../store"
import { useEffect, useState } from "react"
import { predictNews } from "../API/modelApi"
import { FakeNewsPrediction } from "./fakeNewsPrediction"
import { AskDeepFake } from "./askDeepFake"
import { Loader } from "./elements/small/loader"


export function AskAi(){
    const [article, setArticle] = useState("")
    const [file, setFile] = useState(null)
    const currentFeature = useStore(state => state.currentFeature)
    const getCurrentFeature = useStore(state => state.getCurrentFeature)
    const getIsShowingPrediction = useStore(state => state.getIsShowingPrediction)
    const isShowingPrediction = useStore(state => state.isShowingPrediction)
    const getRecentChecks = useStore(state => state.getRecentChecks)
    const lastRecentChecks = useStore(state => state.recentChecks[0])
    const getScansToday = useStore(state => state.getScansToday)
    const getIsValidToAnalyze = useStore(state => state.getIsValidToAnalyze)
    const isValidToAnalyze = useStore(state => state.isValidToAnalyze)
    const isLoading = useStore(state => state.isLoading)
    const getIsLoading = useStore(state => state.getIsLoading)


    const textBoxLabel = "Paste article text, headline, or any claim to analyze..."
    let isFN = currentFeature == "FN"
    let isDF = currentFeature == "DF"
    const wordCount = article.trim().split(/\s+/).length;
    useEffect(()=>{
        if(file!=null){
            getIsValidToAnalyze(true)
        }
    },[file])
    return(
        <section className="text-white askAi">
            {
                isShowingPrediction
                ?<FakeNewsPrediction
                    type={lastRecentChecks.source}
                    title={lastRecentChecks.title}
                    prediction={lastRecentChecks.result.prediction}
                    confidence={lastRecentChecks.result.confidence}
                    responseTime={lastRecentChecks.RESPONSE_TIME}
                />
                :null
            }
            <section>
                <h1 className="text-[56px] ">Detect <b className="text-[#D91E1E] font-normal">misinformation</b> Before it spreads.</h1>
                <p className="text-gray-400 text-[14px]">Paste any article, headline, or upload pictures. Our AI analyzes linguitic patterns, source credibility, an know misinformation signals to give you an instant credibility score.</p>
            </section>
            <form className="bg-[#111418] border-gray-400/50 border-[1px] rounded-[8px] mt-[32px]">
                <div className="flex InputHeader border-b-[1px] border-b-gray-400/50">
                    <button type="button" className={`flex justify-center items-center gap-[8px] hover:text-white ${isFN?"text-white":"text-gray-400 "} px-[24px] py-[16px] border-b-[4px] ${isFN?"border-b-[#59202B]":"border-b-[#090A0D]"}  ${isFN?"bg-gray-400/20":""}`} 
                        onClick={()=>{
                            getCurrentFeature("FN")
                        }}
                    >
                        <span>
                            <FontAwesomeIcon icon={faNewspaper} style={{color: "#59202B",}} />
                        </span>
                        <span>
                            text/article
                        </span>
                    </button>
                    <button type="button" className={`flex justify-center items-center gap-[8px] hover:text-white ${isDF?"text-white":"text-gray-400 "} px-[24px] py-[16px] border-b-[4px] ${isDF?"border-b-[#59202B]":"border-b-[#090A0D]"}  ${isDF?"bg-gray-400/20":""}`} 
                        onClick={()=>{
                            getCurrentFeature("DF")
                        }}
                    >
                        <span>
                            <FontAwesomeIcon icon={faHexagonNodesBolt} style={{color: "#59202B",}} />
                        </span>
                        <span>
                            Deep fake
                        </span>
                    </button>
                </div>
                <div>
                    {
                        currentFeature=="FN"
                        ?<textarea 
                            type="text" 
                            value={article} 
                            onInput={e=>{
                                setArticle(e.currentTarget.value)
                                if(article.length==0){
                                    getIsValidToAnalyze(true)
                                }
                            }} 
                            placeholder={textBoxLabel} 
                            className="placeholder:text-[12px] min-h-[200px] w-full p-[16px] resize-none focus:border-none focus:outline-none    " 
                        />
                        :<AskDeepFake file = {file} setFile={setFile}/>
                    }
                    <div className="flex justify-between items-center py-[24px] px-[24px]">
                        {
                            currentFeature=="DF"
                            ?<p>{file==null?"⚠️upload a file":"🟢File uploaded"}</p>
                            :<p className="text-gray-400 text-[12px]">{article.length==0?"awaiting input":`${wordCount} WORDS`}</p>
                        }
                        <button type="button" className="disabled:cursor-not-allowed disabled:opacity-20  transition-opacity duration-500 bg-[#D91E1E] hover:bg-[#D91E1E]/80 text-[12px] transpare px-[18px] py-[10px] rounded-[10px] flex items-center gap-[6px]"
                            disabled = {!isValidToAnalyze}
                            onClick={()=>{
                                const body = 
                                    currentFeature=="FN"
                                    ?{text:article}
                                    :file
                                getIsLoading(true)

                                const predictionHandle = async ()=>{
                                    const response = await predictNews(currentFeature, body)
                                    getRecentChecks(response)    
                                    getIsShowingPrediction(true)
                                    setArticle("")
                                    setFile(null)
                                    getIsValidToAnalyze(false)
                                    getScansToday()
                                }
                                setTimeout(async ()=>{
                                    await predictionHandle()
                                },1000)
                            }}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "white"}} />
                            
                            <span>
                                {
                                    isLoading
                                    ?<Loader/>
                                    :"analyze"
                                }
                            </span>
                        </button>
                    </div>
                </div>
            </form>
        </section>
    )
}