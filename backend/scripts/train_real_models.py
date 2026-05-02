import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import pickle
import os

def train_real_crop_model():
    print("--- Training Real Crop Recommendation Model ---")
    data_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'Crop_recommendation.csv')
    model_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'models')
    
    # Check if data file exists
    if not os.path.exists(data_path):
        print(f"Error: Dataset not found at {data_path}")
        return
    
    # Load real dataset
    print(f"Loading dataset from {data_path}...")
    df = pd.read_csv(data_path)
    
    print(f"Dataset shape: {df.shape}")
    print(f"Features: {df.columns.tolist()}")
    
    # Split features and target
    X = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
    y = df['label']
    
    # Split into train and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    print(f"Training on {len(X_train)} samples, testing on {len(X_test)} samples.")
    
    # Train Random Forest Classifier
    print("Training Random Forest Classifier...")
    rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
    rf_model.fit(X_train, y_train)
    
    # Evaluate model
    y_pred = rf_model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"\nModel Accuracy: {accuracy * 100:.2f}%")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    # Save the model
    os.makedirs(model_dir, exist_ok=True)
    model_path = os.path.join(model_dir, 'crop_rf_model.pkl')
    
    with open(model_path, 'wb') as f:
        pickle.dump(rf_model, f)
        
    print(f"\nSuccessfully trained and saved real model to {model_path}")

if __name__ == '__main__':
    train_real_crop_model()
