from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pickle
import numpy as np
import os

router = APIRouter()

MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'models', 'yield_rf_model.pkl')

class YieldRequest(BaseModel):
    crop_type: str # In real scenario, this would be mapped to an integer/one-hot
    area: float
    rainfall: float
    temperature: float
    fertilizer_used: float

# Try to load model on startup
model = None
try:
    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)
except Exception as e:
    print(f"Warning: Could not load yield model. {e}")

# Simple mapping for mock model
CROP_MAPPING = {
    "rice": 1, "wheat": 2, "maize": 3, "cotton": 4, "sugarcane": 5
}

@router.post("/predict")
def predict_yield(data: YieldRequest):
    if model is None:
        # Mock logic
        base_yield = data.area * 3.5 # 3.5 tons per hectare base
        # Add variance based on rainfall and fertilizer
        variance = (data.rainfall * 0.05) + (data.fertilizer_used * 0.1)
        expected = base_yield + variance
        return {
            "expected_yield_tons": round(expected, 2),
            "yield_per_hectare": round(expected / data.area, 2) if data.area > 0 else 0
        }
    
    crop_val = CROP_MAPPING.get(data.crop_type.lower(), 0) # Default 0 if unknown
    
    # Feature extraction
    features = np.array([[crop_val, data.area, data.rainfall, data.temperature, data.fertilizer_used]])
    
    prediction = model.predict(features)
    
    return {
        "expected_yield_tons": round(prediction[0], 2),
        "yield_per_hectare": round(prediction[0] / data.area, 2) if data.area > 0 else 0
    }
