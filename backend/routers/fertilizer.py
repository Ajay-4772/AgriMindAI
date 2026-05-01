from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class FertilizerRequest(BaseModel):
    nitrogen: float
    phosphorus: float
    potassium: float
    crop_type: str

# Mock ideal NPK values for different crops
IDEAL_NPK = {
    "rice": {"N": 80, "P": 40, "K": 40},
    "wheat": {"N": 120, "P": 60, "K": 40},
    "maize": {"N": 100, "P": 50, "K": 50},
    "default": {"N": 50, "P": 50, "K": 50}
}

@router.post("/recommend")
def recommend_fertilizer(data: FertilizerRequest):
    crop = data.crop_type.lower()
    ideal = IDEAL_NPK.get(crop, IDEAL_NPK["default"])
    
    diff_N = ideal["N"] - data.nitrogen
    diff_P = ideal["P"] - data.phosphorus
    diff_K = ideal["K"] - data.potassium
    
    recommendation = []
    
    if diff_N > 10:
        recommendation.append("Urea (High Nitrogen)")
    if diff_P > 10:
        recommendation.append("DAP (Diammonium Phosphate)")
    if diff_K > 10:
        recommendation.append("MOP (Muriate of Potash)")
        
    if not recommendation:
        recommendation.append("Balanced NPK Fertilizer (19-19-19)")
        
    return {
        "recommended_fertilizers": recommendation,
        "n_deficiency": max(0, diff_N),
        "p_deficiency": max(0, diff_P),
        "k_deficiency": max(0, diff_K)
    }
