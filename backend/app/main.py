from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pathlib import Path
from routes.itinerary import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

BASE_DIR = Path(__file__).resolve().parent.parent.parent

frontend_dir = BASE_DIR / "frontend"

# Static files
app.mount(
    "/static",
    StaticFiles(directory=frontend_dir / "static"),
    name="static"
)

# Templates
templates = Jinja2Templates(
    directory=frontend_dir / "templates"
)

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):

    return templates.TemplateResponse(
        request=request,
        name="index.html"
    )
