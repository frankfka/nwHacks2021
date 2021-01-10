from typing import List

from pydantic import BaseModel


class ExtractRequest(BaseModel):
    text: str


class ExtractResponse(BaseModel):
    sentences: List[str]
