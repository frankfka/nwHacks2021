from services.extractive_summarizer import ExtractiveSummarizer
from services.text_to_speech import TextToSpeechService


class AppServices:

    extractive_summarizer: ExtractiveSummarizer
    text_to_speech_svc: TextToSpeechService

    def __init__(self):
        self.extractive_summarizer = ExtractiveSummarizer()
        self.text_to_speech_svc = TextToSpeechService()
        print("Initialized app services")

