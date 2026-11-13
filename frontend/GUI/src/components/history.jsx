import { RecentCheck } from "./elements/small/historyEle"
import { ArticlesScannedToday } from "./elements/ArticlesScannedToday"
import { FakeNewsDetected } from "./elements/fakeNewsDetected"
import { AvgCredibility } from "./elements/avgCredibility"
import { AvgResponseTime } from "./elements/avgResponsetime"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAlarmClock } from "@fortawesome/free-solid-svg-icons"
import { faFontAwesome } from "@fortawesome/free-solid-svg-icons"

import { useEffect } from "react"
import { useStore } from "../store"
const API_URL = import.meta.env.VITE_API_URL

export function History(){
        const articlesScannedToday = useStore(state => state.fakeNewsStats.stats.TOTAL_ARTICLES_SCANNED)
        const fakeNewsDetected = useStore(state => state.fakeNewsStats.stats.FAKE_NEWS_DETECTED)
        const score = useStore(state => state.fakeNewsStats.stats.SCORE)
        const recentChecks = useStore(state => state.recentChecks)
        const getIsOnline = useStore(state => state.getIsOnline)

        const setArticlesScanned = useStore(state => state.getArticlesScannedToday)
        const setFakeNewsDetected = useStore(state => state.getFakeNewsDetected)
        const setScore = useStore(state => state.getScore)
        useEffect(()=>{
            async function fetchStat(){
                    console.log(API_URL)
                    const response = await fetch(
                        `${API_URL}`
                    )
                    if(response.ok){
                        const data = await response.json()
                        setArticlesScanned(data.TOTAL_ARTICLES_SCANNED)
                        setFakeNewsDetected(data.FAKE_NEWS_DETECTED)
                        setScore(data.SCORE)
                        getIsOnline(true)
                    }
            }
            setTimeout(async () =>{
                await fetchStat()
            },1500)

        },[])

    return(
        <section className="history text-white flex flex-col gap-[24px]">
            <div className="recentChecks bg-[#111418] border-[1px] border-gray-400 rounded-[8px]">
                <div className="listHeader capitalize flex items-center gap-[8px] text-gray-400 py-[10px] px-[24px]">
                    <span>
                        <FontAwesomeIcon icon={faAlarmClock} />
                    </span>
                    <p>recent checks</p>
                </div>
                <ul>
                    {
                        recentChecks.map((items, index)=>{
                            return <RecentCheck key={index} title = {items.title} type={items.source} confidence={items.result.confidence} time={items.result.createdAt}/>
                        })
                    }
                </ul>
            </div>

            <div className="bg-[#111418] border-[1px] border-gray-400 rounded-[8px]">
                <div className="capitalize gap-[8px] text-gray-400 py-[10px] px-[24px]">
                    <h3># Global stats</h3>
                </div>
                <ul>
                    <ArticlesScannedToday data={articlesScannedToday}/>
                    <FakeNewsDetected data={fakeNewsDetected}/>
                    <AvgCredibility data={score}/>
                    <AvgResponseTime data={recentChecks}/>
                </ul>
            </div>

            <article className="bg-[#111418] border-[1px] border-gray-400 rounded-[8px] border-l-[orange] border-l-[3px] text-[12px] px-[24px] py-[10px]">
                <div className="flex items-center gap-[6px] text-[16px] mb-[10px] text-[orange]">
                    <div>
                        <FontAwesomeIcon icon={faFontAwesome} style={{color: "orange"}} />
                    </div>
                    <h3>disclaimer</h3>
                </div>
                <p className="text-gray-400">Detactor is an AI-powered tool and may make mistakes. Always verify important claims with multiple primary sources. This tool is for educational purposes only.</p>
            </article>
        </section>
    )
}