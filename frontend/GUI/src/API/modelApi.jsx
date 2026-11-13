const API_URL = import.meta.env.VITE_API_URL    
export async function predictNews(model, body){
        let url = API_URL
        url=model=="FN"?url.concat("fakeNews"):url.concat("deepFake")
        const predictDeepfake = async (body) => {
            const formData = new FormData();

            formData.append("file", body);

            const response = await fetch(
                url,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Failed to analyze image");
            }

            return await response.json();
        }
        
        const response = model=="FN" && await fetch(
            url,
            {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(body)
            }
        )

    const resolve =model=="FN" ?await response.json():await predictDeepfake(body)
    console.log(resolve)

    return resolve
}