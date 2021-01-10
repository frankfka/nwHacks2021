from fuzzywuzzy import process

from models import ExtractRequest, ExtractResponse
from nltk.tokenize import sent_tokenize


def execute_extract(req: ExtractRequest, ctx) -> ExtractResponse:
    summary = ctx['services'].extractive_summarizer.extract_summary(req.text)
    summary_sents = sent_tokenize(summary)
    deduped_summary_sents = list(process.dedupe(summary_sents))
    return ExtractResponse(sentences=deduped_summary_sents)
