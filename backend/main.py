import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import crop, yield_pred, disease, fertilizer, weather

app = FastAPI(title="AgriMindAI API")

# Setup CORS
allowed_origins = ["http://localhost:3000"]
env_origins = os.getenv("ALLOWED_ORIGINS")
if env_origins:
    allowed_origins = [origin.strip() for origin in env_origins.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(crop.router, prefix="/api/crop", tags=["Crop Recommendation"])
app.include_router(yield_pred.router, prefix="/api/yield", tags=["Yield Prediction"])
app.include_router(disease.router, prefix="/api/disease", tags=["Disease Detection"])
app.include_router(fertilizer.router, prefix="/api/fertilizer", tags=["Fertilizer Guide"])
app.include_router(weather.router, prefix="/api/weather", tags=["Weather Forecast"])

@app.get("/")
def read_root():
    return {"message": "Welcome to AgriMindAI API"}
