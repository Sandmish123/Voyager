
from pydantic import BaseModel

from typing import List

class TripRequest(BaseModel):
    destination: str
    days: int
    budget: int
    interests: List[str]
