import io

from fuzzywuzzy import process
from starlette.responses import StreamingResponse

from models import ExtractRequest, ExtractResponse, TextToSpeechRequest
from nltk.tokenize import sent_tokenize


def execute_extract(req: ExtractRequest, ctx) -> ExtractResponse:
    summary = ctx['services'].extractive_summarizer.extract_summary(req.text)
    summary_sents = sent_tokenize(summary)
    deduped_summary_sents = list(process.dedupe(summary_sents))
    return ExtractResponse(sentences=deduped_summary_sents)


def execute_text_to_speech(req: TextToSpeechRequest, ctx):
    audio_bytes = ctx['services'].text_to_speech_svc.convert_to_voice(req.text)
    return StreamingResponse(io.BytesIO(audio_bytes), media_type="audio/mpeg")
