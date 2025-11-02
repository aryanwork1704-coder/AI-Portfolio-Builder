# Quick Setup Guide

## Step 1: Frontend Setup

```bash
cd frontend
npm install
```

## Step 2: Backend Setup

```bash
cd ../backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## Step 3: Configure Environment Variables

1. Create a `.env` file in the `backend` directory:

```bash
cd backend
# Copy the example and edit it
# Create .env file with your API key
```

2. Add your API key to `.env`:

```env
# Option 1: Use OpenAI GPT-4
OPENAI_API_KEY=sk-your-openai-api-key-here

# OR Option 2: Use Google Gemini
GEMINI_API_KEY=your-gemini-api-key-here
```

**Note:** You only need ONE API key. The backend will use OpenAI if `OPENAI_API_KEY` is set, otherwise it will try Gemini.

## Step 4: Run the Application

### Terminal 1 - Backend:
```bash
cd backend
# Activate virtual environment first
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # macOS/Linux

python main.py
```

Backend will run on `http://localhost:8000`

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:3000`

## Step 5: Open in Browser

Navigate to `http://localhost:3000`

## Getting API Keys

- **OpenAI**: https://platform.openai.com/api-keys
- **Google Gemini**: https://makersuite.google.com/app/apikey

