from fastapi import FastAPI
import uvicorn
import nltk

from models import ExtractRequest
from services.app_services import AppServices
from extract import execute_extract

app = FastAPI()

ctx = {}


@app.on_event('startup')
async def init_services():
    print("Startup Called")
    nltk.download('punkt')
    ctx['services'] = AppServices()


@app.get("/lifecheck")
async def lifecheck():
    return {"message": "OK"}


@app.post('/extract')
async def extract(req: ExtractRequest):
    return execute_extract(req, ctx)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)