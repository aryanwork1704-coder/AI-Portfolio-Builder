from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

app = FastAPI(title="AI Portfolio Builder API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class Project(BaseModel):
    name: str
    technologies: Optional[List[str]] = []
    description: Optional[str] = ""

class PortfolioData(BaseModel):
    name: str
    title: str
    skills: List[str] = []
    projects: List[Project] = []
    about: Optional[str] = ""

class AIGenerateRequest(BaseModel):
    name: str
    title: str
    skills: List[str] = []
    projects: List[Project] = []

# Storage file
STORAGE_FILE = "portfolios.json"

def load_portfolios():
    """Load portfolios from JSON file"""
    if os.path.exists(STORAGE_FILE):
        with open(STORAGE_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_portfolios(portfolios):
    """Save portfolios to JSON file"""
    with open(STORAGE_FILE, 'w') as f:
        json.dump(portfolios, f, indent=2)

def generate_with_openai(name: str, title: str, skills: List[str], projects: List[Project]) -> dict:
    """Generate descriptions using OpenAI GPT-4"""
    try:
        from openai import OpenAI
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
        # Generate about section
        about_prompt = f"""Write a professional "About Me" section (2-3 paragraphs) for a portfolio website.
Name: {name}
Professional Title: {title}
Skills: {', '.join(skills) if skills else 'Not specified'}

Make it engaging, professional, and highlight their expertise and passion."""
        
        about_response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": about_prompt}],
            max_tokens=300
        )
        about = about_response.choices[0].message.content.strip()
        
        # Generate project descriptions
        project_descriptions = []
        for project in projects:
            project_prompt = f"""Write a brief project description (2-3 sentences) for a portfolio website.
Project Name: {project.name}
Technologies: {', '.join(project.technologies) if project.technologies else 'Not specified'}

Make it concise, highlight the key features and technologies used."""
            
            project_response = client.chat.completions.create(
                model="gpt-4",
                messages=[{"role": "user", "content": project_prompt}],
                max_tokens=150
            )
            project_descriptions.append(project_response.choices[0].message.content.strip())
        
        return {"about": about, "projectDescriptions": project_descriptions}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")

def generate_with_gemini(name: str, title: str, skills: List[str], projects: List[Project]) -> dict:
    """Generate descriptions using Google Gemini"""
    try:
        import google.generativeai as genai
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        model = genai.GenerativeModel('gemini-pro')
        
        # Generate about section
        about_prompt = f"""Write a professional "About Me" section (2-3 paragraphs) for a portfolio website.
Name: {name}
Professional Title: {title}
Skills: {', '.join(skills) if skills else 'Not specified'}

Make it engaging, professional, and highlight their expertise and passion."""
        
        about_response = model.generate_content(about_prompt)
        about = about_response.text.strip()
        
        # Generate project descriptions
        project_descriptions = []
        for project in projects:
            project_prompt = f"""Write a brief project description (2-3 sentences) for a portfolio website.
Project Name: {project.name}
Technologies: {', '.join(project.technologies) if project.technologies else 'Not specified'}

Make it concise, highlight the key features and technologies used."""
            
            project_response = model.generate_content(project_prompt)
            project_descriptions.append(project_response.text.strip())
        
        return {"about": about, "projectDescriptions": project_descriptions}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API error: {str(e)}")

@app.get("/")
def read_root():
    return {"message": "AI Portfolio Builder API", "status": "running"}

@app.post("/api/ai/generate")
async def generate_descriptions(request: AIGenerateRequest):
    """Generate About and Project descriptions using AI"""
    try:
        # Check which AI service to use
        openai_key = os.getenv("OPENAI_API_KEY")
        gemini_key = os.getenv("GEMINI_API_KEY")
        
        if openai_key:
            return generate_with_openai(
                request.name,
                request.title,
                request.skills,
                request.projects
            )
        elif gemini_key:
            return generate_with_gemini(
                request.name,
                request.title,
                request.skills,
                request.projects
            )
        else:
            raise HTTPException(
                status_code=500,
                detail="No AI API key configured. Please set OPENAI_API_KEY or GEMINI_API_KEY in .env file"
            )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating descriptions: {str(e)}")

@app.post("/api/portfolio")
async def save_portfolio(portfolio: PortfolioData):
    """Save portfolio data"""
    try:
        portfolios = load_portfolios()
        portfolio_id = f"{portfolio.name}_{datetime.now().strftime('%Y%m%d%H%M%S')}"
        
        portfolios[portfolio_id] = {
            "name": portfolio.name,
            "title": portfolio.title,
            "skills": portfolio.skills,
            "projects": [p.dict() for p in portfolio.projects],
            "about": portfolio.about,
            "created_at": datetime.now().isoformat()
        }
        
        save_portfolios(portfolios)
        return {"message": "Portfolio saved successfully", "id": portfolio_id}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving portfolio: {str(e)}")

@app.get("/api/portfolio/{portfolio_id}")
async def get_portfolio(portfolio_id: str):
    """Get portfolio by ID"""
    try:
        portfolios = load_portfolios()
        if portfolio_id not in portfolios:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        return portfolios[portfolio_id]
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving portfolio: {str(e)}")

@app.get("/api/portfolios")
async def list_portfolios():
    """List all saved portfolios"""
    try:
        portfolios = load_portfolios()
        return {"portfolios": list(portfolios.keys()), "count": len(portfolios)}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error listing portfolios: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

