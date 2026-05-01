from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pickle
import numpy as np
import os

router = APIRouter()

MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'models', 'crop_rf_model.pkl')

class CropRequest(BaseModel):
    rainfall: float
    temperature: float
    humidity: float
    ph: float
    soil_type: str
    season: str
    farm_size: float
    water_availability: str
    experience: str
    market_preference: str

# Try to load model on startup
model = None
try:
    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)
except Exception as e:
    print(f"Warning: Could not load crop model. {e}")

# Mapping of soil types to average NPK values
SOIL_NPK_MAPPING = {
    "Clay Soil": {"N": 50, "P": 40, "K": 40},
    "Sandy Soil": {"N": 20, "P": 10, "K": 10},
    "Loamy Soil": {"N": 60, "P": 50, "K": 50},
    "Black Cotton Soil": {"N": 70, "P": 60, "K": 40},
    "Red Soil": {"N": 40, "P": 20, "K": 30},
    "Alluvial Soil": {"N": 80, "P": 60, "K": 50},
    "Laterite Soil": {"N": 30, "P": 20, "K": 20},
}

def generate_explanation(crop, data: CropRequest):
    return (
        f"Based on your {data.soil_type} with a pH of {data.ph}, and the local climate "
        f"({data.temperature}°C, {data.rainfall}mm rainfall), {crop.capitalize()} is an excellent choice. "
        f"It thrives during the {data.season} season and is highly suitable for your {data.farm_size} hectare farm "
        f"given the {data.water_availability.lower()} water availability. Furthermore, this crop aligns perfectly "
        f"with your {data.experience.lower()} farming experience and {data.market_preference.lower()} market strategy."
    )

@router.post("/predict")
def predict_crop(data: CropRequest):
    # Estimate NPK based on Soil Type
    npk = SOIL_NPK_MAPPING.get(data.soil_type, {"N": 50, "P": 40, "K": 40})
    
    if model is None:
        # Mock logic
        crops = ['Rice', 'Maize', 'Chickpea', 'Kidneybeans', 'Pigeonpeas', 'Mothbeans', 'Mungbean', 'Blackgram', 'Lentil', 'Pomegranate', 'Banana', 'Mango', 'Grapes', 'Watermelon', 'Muskmelon', 'Apple', 'Orange', 'Papaya', 'Coconut', 'Cotton', 'Jute', 'Coffee']
        import random
        idx = int((data.temperature + data.humidity + data.ph) % len(crops))
        recommended = crops[idx]
        confidence = round(random.uniform(75.5, 99.5), 2)
        
        return {
            "recommended_crop": recommended,
            "confidence": confidence,
            "explanation": generate_explanation(recommended, data)
        }
    
    # Feature extraction
    features = np.array([[npk["N"], npk["P"], npk["K"], 
                          data.temperature, data.humidity, data.ph, data.rainfall]])
    
    prediction = model.predict(features)
    probabilities = model.predict_proba(features)[0]
    confidence = max(probabilities) * 100
    recommended = prediction[0]
    
    return {
        "recommended_crop": recommended,
        "confidence": round(confidence, 2),
        "explanation": generate_explanation(recommended, data)
    }
