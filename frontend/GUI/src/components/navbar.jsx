import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faCircleDot } from "@fortawesome/free-solid-svg-icons"
import { useStore } from "../store"
import { Loader } from "./elements/small/loader"
export function NavBar(){
    const scannedToday = useStore(state=>state.scansToday)
    const isOnline = useStore(state => state.isOnline)
    
    return(
        <header>
            <nav className="min-h-[72px] border-b-2 border-[#D91E1E] bg-[#090A0D] flex items-center justify-center px-[96px]">
                <ul className="text-white flex justify-between items-center w-full">
                    <li className="flex justify-center items-center gap-[24px]">
                        <p className="text-[32px]">
                            Detactor
                        </p>
                         <span className="text-gray-500 text-[16px] self-baseline-last">
                            v1.0.0
                        </span>
                    </li>
                    <li>
                        <ul className="flex gap-6 items-center justify-center">
                            <div className="flex items-center gap-[12px]">
                                {
                                    (!isOnline)
                                    ?<Loader/>
                                    :<FontAwesomeIcon icon={faCircleDot} style={{color:'rgb(99, 230, 190)'}} fade/>
                                }
                                <li>System online</li>
                            </div>
                            <li>{scannedToday} scans today</li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    )
}