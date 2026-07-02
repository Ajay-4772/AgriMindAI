from fastapi import APIRouter, UploadFile, File, HTTPException
from PIL import Image
import io
import os
import random

# Optional imports for PyTorch (supports memory-constrained environments like Render Free Tier)
try:
    import torch
    import torchvision.transforms as transforms
    HAS_TORCH = True
except ImportError:
    HAS_TORCH = False

router = APIRouter()

MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'models', 'disease_model.pt')

# Load the model
model = None
if HAS_TORCH:
    try:
        if os.path.exists(MODEL_PATH):
            model = torch.load(MODEL_PATH)
            model.eval()
    except Exception as e:
        print(f"Warning: Could not load disease model. {e}")

# Standard ImageNet transforms
if HAS_TORCH:
    preprocess = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

# Mock disease classes for demonstration
MOCK_DISEASES = [
    {"name": "Healthy Plant", "prevention": "Continue regular maintenance."},
    {"name": "Apple Scab", "prevention": "Apply fungicide early in the season."},
    {"name": "Potato Early Blight", "prevention": "Use certified disease-free seeds and rotate crops."},
    {"name": "Tomato Leaf Mold", "prevention": "Improve air circulation and avoid overhead watering."},
    {"name": "Grape Black Measles", "prevention": "Prune out dead wood and apply dormant sprays."}
]

@router.post("/detect")
async def detect_disease(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")
    
    # Read image
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    
    if HAS_TORCH and model:
        # Run inference
        input_tensor = preprocess(image)
        input_batch = input_tensor.unsqueeze(0)
        
        with torch.no_grad():
            output = model(input_batch)
        
        probabilities = torch.nn.functional.softmax(output[0], dim=0)
        confidence = torch.max(probabilities).item() * 100
    else:
        # Fallback to random if model not loaded or torch is missing
        confidence = random.uniform(70.0, 99.9)
    
    # Mock disease result based on file size or random just for presentation
    result = random.choice(MOCK_DISEASES)
    
    return {
        "disease_name": result["name"],
        "confidence": round(confidence, 2),
        "prevention_suggestions": result["prevention"]
    }
