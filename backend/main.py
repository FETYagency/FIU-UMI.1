from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import time
from stats.fakenews import *
import math
from datetime import datetime, timezone
# import list finishes


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
     allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Loading models for the fake news
model = joblib.load("./model/lr_model.jb")
vectorizer = joblib.load("./model/vectorizer.jb")

# ########################################################################

@app.get("/")
def home():
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
        "confidence": math.ceil(float(max(probability[0])))*100,
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

