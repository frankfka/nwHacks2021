from summarizer import Summarizer


class ExtractiveSummarizer:

    def __init__(self):
        self.summarizer = Summarizer('distilbert-base-uncased')

    def extract_summary(self, input_text: str) -> str:
        return self.summarizer(input_text)
