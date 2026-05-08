
from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class Trip(Base):
    __tablename__ = "trips"

    id = Column(Integer, primary_key=True, index=True)
    destination = Column(String)
    days = Column(Integer)
    budget = Column(Integer)
    interests = Column(Text)
    itinerary = Column(Text)
