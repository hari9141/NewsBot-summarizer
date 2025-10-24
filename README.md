# NewsBot AI News Summarizer 📝

A full-stack AI-powered news summarizer application with beautiful UI inspired by QuillBot.

## Features ✨

- **AI Summarization**: Uses free Hugging Face models (BART, PEGASUS, T5)
- **Multiple Modes**: Paragraph, Bullet Points, Custom Formats
- **Language Support**: English, Deutsch, Français, Español, Nederlands, Português
- **Dark Mode**: Beautiful dark/light theme toggle
- **Full-Screen UI**: Responsive design that works on all devices
- **Drag & Drop**: Upload files by dragging
- **Animated Splash Screen**: 3-second intro animation

## Tech Stack 🛠️

**Frontend:**
- React 19
- Vite
- Axios
- CSS3 with animations

**Backend:**
- FastAPI (Python)
- Hugging Face Inference API
- Uvicorn

## Quick Start 🚀

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm
- Hugging Face API Token (free)

### Setup

1. **Clone Repository**

git clone https://github.com/YOUR_USERNAME/Newsbot-summarizer.git
cd Newsbot-summarizer



2. **Backend Setup**

cd backend
python -m venv venv
.\venv\Scripts\activate # Windows

or
source venv/bin/activate # Mac/Linux
pip install -r requirements.txt

3. **Create .env File**

Create backend/.env
HF_API_TOKEN=your_hugging_face_token_here
HF_API_URL=https://api-inference.huggingface.co/models


4. **Frontend Setup**

cd ../frontend
npm install

5. **Run Application**

Terminal 1 - Backend
cd backend
.\venv\Scripts\activate
python -m uvicorn main:app --reload

Terminal 2 - Frontend
cd frontend
npm run dev


6. **Open Browser**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

## Get Hugging Face Token 🔑

1. Go to https://huggingface.co/settings/tokens
2. Click "New token"
3. Select "Read" permissions
4. Copy token
5. Add to `.env` file as `HF_API_TOKEN`

## Deployment 🌍

### Deploy Frontend to Netlify
1. Push code to GitHub
2. Connect to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

### Deploy Backend to Railway
1. Push code to GitHub
2. Connect to Railway
3. Select Python environment
4. Railway auto-detects `requirements.txt`
5. Deploy!

## Features Explained 📚

### Modes
- **Paragraph**: Standard paragraph summary
- **Bullet Points**: Summary in bullet format
- **Custom**: User-defined format (e.g., "numbered list")

### Summary Length
- Very Short: 10-30 words
- Short: 30-50 words
- Medium: 50-75 words
- Long: 75-100 words
- Very Long: 100-150 words

### Dark Mode
- Toggle with profile button dropdown
- Smooth transition animation
- Persistent (saved in browser)

### Languages
- English, Deutsch, Französisch, Español, Nederlands, Português
- All UI text translates instantly

## API Endpoints 🔌

POST /api/summarize
{
"text": "article text here",
"min_length": 50,
"max_length": 100,
"model": "bart",
"mode": "paragraph",
"custom_format": ""
}

GET /api/models
GET /health


## Models Used 🤖

1. **BART** (Recommended)
   - Best for news
   - Fastest

2. **PEGASUS**
   - News-specific
   - Highest quality

3. **T5**
   - General purpose
   - Most flexible

## License 📄

MIT License - Feel free to use commercially!

## Author 👨‍💻

Created by You with ❤️

## Support 💬

Having issues? Check:
1. Hugging Face token is valid
2. Backend is running on port 8000
3. Frontend is running on port 5173
4. All dependencies installed

---

**Star ⭐ this repo if you find it helpful!**
