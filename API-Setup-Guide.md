# RAG Backend API Setup Guide

Quick guide to set up and run your RAG backend API for local testing with your portfolio chatbot frontend.

## Prerequisites

- Node.js (v16 or higher)
- Google AI API key (for Gemini)
- Pinecone account and API key

## Setup Steps

### 1. Navigate to API Directory
```bash
cd portfolio-chatbot-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env file with your API keys
```

Your `.env` file should contain:
```env
# Google AI API Key for Gemini LLM
GOOGLE_AI_API_KEY=your_gemini_api_key_here

# Pinecone Vector Database Configuration
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_INDEX=your_pinecone_index_name_here

# Server Configuration
PORT=3000
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000
```

### 4. Seed Your Portfolio Content
```bash
# Update with your personal content
npm run update-content

# Seed the vector database
npm run seed
```

### 5. Start the Development Server
```bash
npm run dev
```

The API will be running on `http://localhost:3000`

## API Endpoints

### Main Chat Endpoint
```
POST http://localhost:3000/api/chat
Content-Type: application/json

Body:
{
  "message": "Tell me about your projects"
}

Response:
{
  "response": "AI-generated response about your portfolio..."
}
```

### Health Check
```
GET http://localhost:3000/health

Response:
{
  "status": "healthy",
  "timestamp": "2025-01-07T06:17:26.000Z",
  "service": "portfolio-chatbot-api"
}
```

### Search Endpoint (for testing)
```
POST http://localhost:3000/api/search
Content-Type: application/json

Body:
{
  "query": "projects",
  "topK": 5
}

Response:
{
  "results": [...]
}
```

## Frontend Integration

To connect your frontend, make HTTP requests to the chat endpoint:

```javascript
const response = await fetch('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Your user message here'
  })
});

const data = await response.json();
console.log(data.response); // AI response
```

## Testing the API

### Quick Test with curl
```bash
# Health check
curl http://localhost:3000/health

# Test chat
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

### Using PowerShell (Windows)
```powershell
# There's already a test script included
.\test-api.ps1
```

## CORS Configuration

The API accepts requests from any origin by default. For production, update `FRONTEND_URL` in your `.env` file to your specific domain.

## Troubleshooting

- **Port 3000 in use**: Change `PORT` in `.env` file
- **CORS errors**: Verify `FRONTEND_URL` setting
- **API key errors**: Double-check your Gemini and Pinecone keys
- **Empty responses**: Make sure you've run the seeding steps

## Ready for Integration

Once the server is running and you see:
```
🚀 Portfolio Chatbot API server running on port 3000
📍 Health check: http://localhost:3000/health
💬 Chat endpoint: http://localhost:3000/api/chat
```

Your API is ready to integrate with your frontend chatbot!