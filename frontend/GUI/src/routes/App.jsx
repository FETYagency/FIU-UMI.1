// ==> components import <== \\

import {NavBar} from "../components/navbar"
import {AskAi} from "../components/askAi"
import {Features} from "../components/features"
import {History} from "../components/history"
import {Footer} from "../components/footer"
import { FakeNewsPrediction } from "../components/fakeNewsPrediction"
import { useStore } from "../../store"
// ==> Hooks import <== \\


// IMPORTS SECTION \\


function App() {
  return (
    <>
      <NavBar/>
      
      <main className="py-[56px] px-[96px] fatherGrid">
        <AskAi/>
        <History/>
        <Features/>
      </main>
      <Footer/>
    </>
  )
}

export default App
