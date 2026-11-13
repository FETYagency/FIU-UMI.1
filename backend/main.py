from fastapi import FastAPI, UploadFile, File, HTTPException
import tempfile
import os
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import time
from stats.fakenews import *
import math
from datetime import datetime, timezone
# from detector import predict
from pathlib import Path
# import list finishes
BASE_DIR = Path(__file__).resolve().parent

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
     allow_origins=[
        "http://127.0.0.1:5173",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Loading models for the fake news
model = joblib.load(BASE_DIR / "model" / "lr_model.jb")
vectorizer = joblib.load(BASE_DIR / "model" / "vectorizer.jb")

# ########################################################################

@app.get("/")
def home():
        print("request received sir")
        return {
            "TOTAL_ARTICLES_SCANNED":TOTAL_ARTICLES_SCANNED,
            "FAKE_NEWS_DETECTED":FAKE_NEWS_DETECTED,
            "SCORE":SCORE
        }

# ######################################################################

class newsTest(BaseModel):
    text:str

def shorten_text(text, limit = 30):
    return text[:limit]+"..." if len(text)>limit else text
     
def predict_news(text):

    vector = vectorizer.transform([text])
    prediction = model.predict(vector)
    probability = model.predict_proba(vector)

    return {
        "prediction": int(prediction[0]),
        "confidence": math.ceil(float(max(probability[0])*100)),
        "createdAt": datetime.now(timezone.utc).isoformat()
    }
@app.post("/fakeNews")
def fakeNewPredict(news:newsTest):
    start = time.perf_counter()
    result = predict_news(news.text)
    end = time.perf_counter()
    RESPONSE_TIME = round(end - start,3)
    title = shorten_text(news.text)
    return {
         "source": "FN",
         "title": title,
         "result":result,
         "RESPONSE_TIME":RESPONSE_TIME
    }

@app.post("/deepFake")
async def predictDeepFake(file:UploadFile = File(...)):

    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Please upload an image")

    tmp_path = None

    try:
        start = time.perf_counter()
        suffix = os.path.splitext(file.filename or "")[1] or ".jpg"

        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp:
            temp.write(await file.read())
            temp_path = temp.name

        result = predict(temp_path)
        end = time.perf_counter()
        RESPONSE_TIME = round(end - start,3)
        return {
            "source":"DF",
            "title":"deep fake image analyzes",
            "result": result,
            "RESPONSE_TIME":RESPONSE_TIME,
            }

    except Exception:
        raise HTTPException(status_code=500, detail="Image prediction failed")

    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)