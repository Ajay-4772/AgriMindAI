import os
import pickle
import numpy as np
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.model_selection import train_test_split
import torch
import torchvision.models as models

# Paths
MODELS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'models')
os.makedirs(MODELS_DIR, exist_ok=True)

CROP_MODEL_PATH = os.path.join(MODELS_DIR, 'crop_rf_model.pkl')
YIELD_MODEL_PATH = os.path.join(MODELS_DIR, 'yield_rf_model.pkl')
DISEASE_MODEL_PATH = os.path.join(MODELS_DIR, 'disease_model.pt')

def train_crop_model():
    print("Training Crop Recommendation Model...")
    # Synthetic Data
    np.random.seed(42)
    n_samples = 1000
    
    # Features: N, P, K, temperature, humidity, ph, rainfall
    # We will simplify for now
    X = np.random.rand(n_samples, 7) * [140, 140, 140, 45, 100, 14, 300]
    
    crops = ['Rice', 'Maize', 'Chickpea', 'Kidneybeans', 'Pigeonpeas', 'Mothbeans', 'Mungbean', 'Blackgram', 'Lentil', 'Pomegranate', 'Banana', 'Mango', 'Grapes', 'Watermelon', 'Muskmelon', 'Apple', 'Orange', 'Papaya', 'Coconut', 'Cotton', 'Jute', 'Coffee']
    
    y = np.random.choice(crops, size=n_samples)
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    with open(CROP_MODEL_PATH, 'wb') as f:
        pickle.dump(model, f)
    print(f"Saved Crop Model to {CROP_MODEL_PATH}")

def train_yield_model():
    print("Training Yield Prediction Model...")
    # Synthetic Data
    np.random.seed(42)
    n_samples = 1000
    
    # Features: Crop_Type (encoded), Area (hectares), Rainfall (mm), Temperature (C), Fertilizer (kg)
    # We will use simple numerical inputs for mock
    X = np.random.rand(n_samples, 5) * [20, 100, 500, 40, 200]
    
    # Target: Yield (tons/hectare) - some mock formula
    y = X[:, 1] * 0.5 + X[:, 2] * 0.01 + X[:, 4] * 0.1 + np.random.normal(0, 2, n_samples)
    y = np.maximum(y, 0)
    
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    with open(YIELD_MODEL_PATH, 'wb') as f:
        pickle.dump(model, f)
    print(f"Saved Yield Model to {YIELD_MODEL_PATH}")

def save_disease_model():
    print("Downloading and caching PyTorch MobileNetV2 for Disease Detection...")
    # Download weights
    weights = models.MobileNet_V2_Weights.DEFAULT
    model = models.mobilenet_v2(weights=weights)
    
    # We will just save the whole model architecture and weights for simplicity
    torch.save(model, DISEASE_MODEL_PATH)
    print(f"Saved Disease Model to {DISEASE_MODEL_PATH}")

if __name__ == "__main__":
    train_crop_model()
    train_yield_model()
    save_disease_model()
    print("All models initialized successfully!")
