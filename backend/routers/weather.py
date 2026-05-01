from fastapi import APIRouter, HTTPException
import httpx

router = APIRouter()

@router.get("/forecast")
async def get_weather(lat: float, lon: float):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto"
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url)
            response.raise_for_status()
            data = response.json()
            
            # Format the response
            current = data.get("current_weather", {})
            return {
                "temperature": current.get("temperature"),
                "windspeed": current.get("windspeed"),
                "weathercode": current.get("weathercode"),
                "forecast": data.get("daily", {})
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to fetch weather data: {str(e)}")
