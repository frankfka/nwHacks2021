from services.extractive_summarizer import ExtractiveSummarizer


class AppServices:

    extractive_summarizer: ExtractiveSummarizer

    def __init__(self):
        self.extractive_summarizer = ExtractiveSummarizer()
        print("Initialized app services")

