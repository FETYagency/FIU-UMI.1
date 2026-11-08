import { create } from "zustand"
import { produce } from "immer";

// the data i need
// today's scans X ===> generated per session - not living data
// recent checks ===> generated per session - not living data
// global stats
//   - Articles scanned today X ===> training data - API
//   - Fake news detected X ===> training data - API
//   - AVG credibility score X ===> training data - API
//   - AV response time X ===> live data generated every request


export const useStore = create((set)=>({
    isOnline : false,  
    scansToday: 0,
    isLoading:false,
    currentFeature: "FN",
    isShowingPrediction: false,
    isValidToAnalyze: false,

    recentChecks:[
    ],
    fakeNewsStats:{
        stats:{
            TOTAL_ARTICLES_SCANNED:null,
            FAKE_NEWS_DETECTED:null,
            SCORE:null,
            avgResponseTime: null
        },
    },

    
    // actions
    getIsLoading: data => set(
        produce(state=>{
            state.isLoading = data
        })
    ),
    getIsOnline: data => set(
        produce(state =>{
            state.isOnline = data
        })
    ),
    getIsValidToAnalyze: data => set(
        produce(state=>{
            state.isValidToAnalyze=data
        })
    ),
    getScansToday: data => set(
        produce(state => {
            state.scansToday += 1
        })
    ),
    getRecentChecks: data => set(
        produce(state=>{
            // check if the array has four items (limits)
            const isRecentChecksSizeLimited = state.recentChecks.length>=4
            if (isRecentChecksSizeLimited){
                state.recentChecks.pop()
            }
            state.recentChecks.unshift(data)

            // if no the push your arr ele if yes pop the last ele and push your current elem
        })
    ),
    getIsShowingPrediction: data => set(
        produce(state=>{
            state.isShowingPrediction = data
        })
    ),
    getArticlesScannedToday: data => set(
        produce(state=> {
            state.fakeNewsStats.stats.TOTAL_ARTICLES_SCANNED = data
        })),
    getFakeNewsDetected: data => set(
        produce(state=> {
            state.fakeNewsStats.stats.FAKE_NEWS_DETECTED = data
        })),
    getScore: data => set(
        produce(state=> {
            state.fakeNewsStats.stats.SCORE = data
        })),
    getCurrentFeature: data => set(
        produce(state=>{
            state.currentFeature = data
        })
    )
}));