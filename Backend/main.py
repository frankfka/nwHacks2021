from fastapi import FastAPI
import uvicorn
import nltk

from models import ExtractRequest, TextToSpeechRequest
from services.app_services import AppServices
from endpoint_fns import execute_extract, execute_text_to_speech

app = FastAPI()

ctx = {}


@app.on_event('startup')
async def init_services():
    print("Startup Called")
    nltk.download('punkt')
    ctx['services'] = AppServices()


@app.get("/")
async def lifecheck():
    return {"message": "OK"}


@app.post('/extract')
async def extract(req: ExtractRequest):
    return execute_extract(req, ctx)


@app.post('/text-to-speech')
async def text_to_speech(req: TextToSpeechRequest):
    return execute_text_to_speech(req, ctx)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)