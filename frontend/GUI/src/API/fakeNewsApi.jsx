export async function predictNews(model, body){
        let url = "http://127.0.0.1:8000/"
        url=model=="FN"?url.concat("fakeNews"):url.concat("deepFake")
        const response = await fetch(
            url,
            {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(body)
            }
        )
        const resolve = await response.json()
        return resolve
}