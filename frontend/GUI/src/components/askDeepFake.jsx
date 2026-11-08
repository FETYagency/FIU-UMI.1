import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons"
export function AskDeepFake({file,setFile}){
    return(
        <div>
            <label
            htmlFor="file-upload"
            className="w-full h-[150px] gap-[16px] text-black font-bold flex justify-center items-center cursor-pointer bg-white/50 px-5 py-3 transition-all duration-300 hover:bg-white/80"
            >


                {file==null
                ?
                <>
                    <FontAwesomeIcon icon={faCloudArrowUp} style={{color: "black", width:"30px", height:"60px"}} />
                    <p>upload your image 🔥⚡🌟☄️</p>
                </>
                :(file && (<p className="font-normal">⚡let's predict⚡: ⚡{file.name}⚡</p>))
                }
                
            </label>
            

            <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={e=>{
                setFile(e.target.files[0])
            }}
            className="hidden"
            />
        </div>
    )
}