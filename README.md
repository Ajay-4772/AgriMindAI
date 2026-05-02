# 🌾 AgriMindAI – Intelligent Agriculture Platform

AgriMindAI is a full-stack, AI-powered agricultural decision-support system designed to help farmers make smarter, data-driven choices. Unlike traditional systems that only provide results, AgriMindAI explains *why* a recommendation is made — enabling users to learn and trust the system.

---

## 🌟 Key Features

* 🌱 **Crop Recommendation System**
  Suggests the most suitable crop based on environmental and soil conditions.

* 🧪 **Fertilizer Recommendation**
  Identifies nutrient deficiencies and recommends appropriate fertilizers.

* 🌾 **Yield Prediction**
  Estimates crop yield (tons per hectare) using machine learning.

* 🌿 **Plant Disease Detection**
  Uses deep learning to analyze plant leaf images and detect diseases.

* 🌦 **Real-time Weather Data**
  Fetches live weather information to improve predictions.

* 🧠 **Explainable AI (XAI)**
  Provides human-readable explanations for every recommendation.

---

## 🛠 Tech Stack

| Layer                | Technology Used                                |
| -------------------- | ---------------------------------------------- |
| **Frontend**         | Next.js 14 (React), Tailwind CSS, Lucide React |
| **Backend**          | FastAPI, Uvicorn                               |
| **Machine Learning** | Scikit-learn (Random Forest), PyTorch          |
| **Data Processing**  | Pandas, NumPy                                  |
| **API Integration**  | Open-Meteo (Weather API)                       |

---

## 📂 Project Structure

### 🔙 Backend (FastAPI - Python)

```
backend/
│
├── main.py                  # Entry point, handles routing and CORS
├── routers/
│   ├── crop.py             # Crop recommendation logic
│   ├── fertilizer.py       # Fertilizer suggestions (rule-based)
│   ├── yield_pred.py       # Yield prediction model
│   ├── disease.py          # Plant disease detection (PyTorch)
│   └── weather.py          # Weather API integration
│
└── scripts/
    └── train_real_models.py  # Model training using real datasets
```

---

### 🎨 Frontend (Next.js - TypeScript)

```
frontend/
│
├── src/
│   ├── app/
│   │   └── services/       # Pages for Crop, Yield, etc.
│   ├── components/
│   │   └── NavBar.tsx      # Navigation bar
│   └── app/globals.css     # Styling (Agri-Green theme)
```

---

## 🧠 How It Works

### 1️⃣ Smart Input System

Farmers often don't have access to technical soil data (N, P, K levels).
To solve this, AgriMindAI uses a **Soil Mapping System**:

* User selects soil type (e.g., Red Soil, Black Soil)
* Backend estimates NPK values automatically
* These values are used as input for ML models

---

### 2️⃣ AI Recommendation Engine

**Input Parameters:**

* Soil Type
* pH Level
* Rainfall
* Temperature
* Humidity
* Season

**Process:**

* A trained Random Forest model (2200+ real-world records) predicts the best crop

**Output:**

* Recommended crop
* Confidence score
* Detailed explanation

---

### 📝 Sample Input & Output

**Input:**

* Soil Type: Black Cotton Soil
* Rainfall: 1000 mm
* Temperature: 25°C
* Season: Kharif

**Output:**

* ✅ Crop: Cotton
* 📊 Confidence: 98.5%
* 💡 Explanation:
  Based on high water retention and estimated NPK levels (N:70, P:60, K:40), cotton is ideal for monsoon conditions.

---

## 🚀 Getting Started

### 🔧 Prerequisites

* Python 3.8+
* Node.js (v18+ recommended)
* npm or yarn

---

### ▶️ Backend Setup

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --port 8080 --reload
```

Backend runs on:
👉 http://localhost:8080

---

### ▶️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
👉 http://localhost:3000

---

## 📊 Model Training

To retrain models with real-world datasets:

```bash
python scripts/train_real_models.py
```

* Uses agricultural datasets (e.g., Kaggle)
* Trains Random Forest & Deep Learning models

---

## 🔐 API Overview

| Endpoint      | Description             |
| ------------- | ----------------------- |
| `/crop`       | Crop recommendation     |
| `/fertilizer` | Fertilizer suggestions  |
| `/yield`      | Yield prediction        |
| `/disease`    | Plant disease detection |
| `/weather`    | Real-time weather data  |

---

## 🌍 Future Improvements

* 📱 Mobile App Integration
* 🛰 Satellite Data Integration
* 🌐 Multi-language Support (for farmers)
* 📈 Market Price Prediction
* 🤖 Chatbot Assistant for farmers


