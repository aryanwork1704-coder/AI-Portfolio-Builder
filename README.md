# AI-Powered Portfolio Builder

A modern, full-stack web application that helps users create stunning portfolios with AI-generated descriptions. Built with React, TailwindCSS, Vite, and FastAPI.

## Features

- ✨ **AI-Powered Descriptions**: Automatically generate professional "About Me" and project descriptions using GPT-4 or Gemini 1.5 Pro
- 🎨 **Real-Time Preview**: See your portfolio come to life as you type
- 🌓 **Light/Dark Theme**: Switch between light and dark modes
- 📄 **Export Options**: Download your portfolio as HTML or PDF
- 💾 **Save & Load**: Save your portfolio data locally and on the server
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- 🎯 **Modern UI**: Minimalistic design with TailwindCSS

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **Axios** - HTTP client
- **html2canvas & jsPDF** - Export functionality

### Backend
- **FastAPI** - Python web framework
- **OpenAI API** - GPT-4 integration
- **Google Gemini API** - Alternative AI provider
- **JSON Storage** - Simple file-based database

## Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**
- An API key from either OpenAI or Google Gemini

## Installation

### 1. Clone the repository

```bash
cd "C:\Users\DELL\OneDrive\Desktop\AI portfolio builder"
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

### 3. Backend Setup

```bash
cd ../backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 4. Environment Variables

Copy the example environment file and add your API key:

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```env
# Option 1: Use OpenAI GPT-4
OPENAI_API_KEY=sk-your-openai-api-key-here

# OR Option 2: Use Google Gemini
GEMINI_API_KEY=your-gemini-api-key-here
```

**Note**: You only need to set ONE API key. The backend will use OpenAI if `OPENAI_API_KEY` is set, otherwise it will try Gemini.

### Getting API Keys

- **OpenAI**: Sign up at [OpenAI Platform](https://platform.openai.com/) and get your API key from [API Keys](https://platform.openai.com/api-keys)
- **Google Gemini**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Running the Application

### 1. Start the Backend Server

```bash
cd backend

# Activate virtual environment if not already active
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Run the server
python main.py
```

The backend will start on `http://localhost:8000`

### 2. Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000`

### 3. Open in Browser

Navigate to `http://localhost:3000` in your browser.

## Usage

1. **Landing Page**: Click "Generate My Portfolio" to start
2. **Fill in Details**:
   - Enter your name and professional title
   - Add skills (press Enter or click Add)
   - Add projects with names and technologies
3. **Generate Descriptions**: Click "✨ Generate Descriptions with AI" to auto-fill About and Project descriptions
4. **Preview**: See your portfolio update in real-time
5. **Theme**: Toggle between light/dark mode using the theme button
6. **Save**: Click "Save" to store your portfolio
7. **Export**: Use the Export menu to download as HTML or PDF

## Project Structure

```
AI portfolio builder/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Landing.jsx
│   │   │   ├── PortfolioBuilder.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Form.jsx
│   │   │   └── Preview.jsx
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── .env.example
│   └── portfolios.json (created automatically)
├── .gitignore
└── README.md
```

## API Endpoints

### `POST /api/ai/generate`
Generate AI descriptions for About and Projects sections.

**Request Body:**
```json
{
  "name": "John Doe",
  "title": "Full Stack Developer",
  "skills": ["React", "Python", "Node.js"],
  "projects": [
    {
      "name": "E-Commerce App",
      "technologies": ["React", "Node.js", "MongoDB"]
    }
  ]
}
```

**Response:**
```json
{
  "about": "Generated about text...",
  "projectDescriptions": ["Generated project description..."]
}
```

### `POST /api/portfolio`
Save portfolio data.

**Request Body:**
```json
{
  "name": "John Doe",
  "title": "Full Stack Developer",
  "skills": ["React", "Python"],
  "projects": [...],
  "about": "About text..."
}
```

### `GET /api/portfolio/{portfolio_id}`
Retrieve a saved portfolio.

### `GET /api/portfolios`
List all saved portfolio IDs.

## Customization

### Styling
Edit `frontend/tailwind.config.js` to customize colors and themes.

### AI Prompts
Modify the prompt templates in `backend/main.py` to change how descriptions are generated.

## Troubleshooting

### Backend won't start
- Ensure Python virtual environment is activated
- Check that all dependencies are installed: `pip install -r requirements.txt`
- Verify your API key is set in `.env`

### Frontend won't connect to backend
- Ensure backend is running on port 8000
- Check `frontend/vite.config.js` proxy configuration
- Verify CORS settings in `backend/main.py`

### AI generation fails
- Verify your API key is correct in `.env`
- Check you have API credits/quota available
- Ensure you have an internet connection

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Support

For issues or questions, please open an issue on the repository.

