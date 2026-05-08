from fastapi import APIRouter
from schema.trip import TripRequest
from services.ai_service import generate_itinerary

router = APIRouter()

@router.post("/generate-itinerary")
def create_itinerary(data: TripRequest):
    itinerary = generate_itinerary(
    data.destination,
    data.days,
    data.budget,
    data.interests
)



    return itinerary
