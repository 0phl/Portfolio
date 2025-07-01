# RAG Implementation with Gemini LLM for Portfolio Chatbot

This guide explains how to implement Retrieval Augmented Generation (RAG) with Google's Gemini LLM for the portfolio chatbot.

## Table of Contents
- [Overview](#overview)
- [Backend Setup](#backend-setup)
- [Frontend Integration](#frontend-integration)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)

## Overview

The implementation consists of two main parts:
1. A backend service that handles RAG functionality
2. Frontend integration with the existing chatbot

### Architecture
```
├── portfolio-chatbot-api/    # Backend service
│   ├── src/
│   │   ├── index.ts         # Express server
│   │   ├── rag.ts           # RAG implementation
│   │   └── vectorStore.ts   # Vector database setup
│   ├── .env                 # Environment variables
│   └── package.json         # Dependencies
└── portfolio-frontend/      # Your existing portfolio
    └── src/
        └── components/
            └── Chatbot.tsx  # Modified chatbot component
```

## Backend Setup


 Install required dependencies:
```bash
npm install express @google/generative-ai @pinecone-database/pinecone dotenv cors typescript ts-node @types/express @types/node
```

3. Create the RAG service (`src/rag.ts`):
```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PineconeClient } from "@pinecone-database/pinecone";

export class RAGService {
  private model;
  private embedder;
  private vectorStore;

  constructor() {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);
    this.model = genAI.getGenerativeModel({ model: "gemini-pro" });
    this.embedder = genAI.getEmbeddingModel();
    this.vectorStore = new PineconeClient().Index(process.env.PINECONE_INDEX!);
  }

  async query(userInput: string) {
    // 1. Generate embeddings for user query
    const queryEmbedding = await this.embedder.embedText(userInput);
    
    // 2. Search vector store for relevant context
    const searchResults = await this.vectorStore.query({
      vector: queryEmbedding,
      topK: 3,
      includeMetadata: true
    });

    // 3. Create prompt with context
    const context = searchResults.matches
      .map(match => match.metadata.text)
      .join('\n');
    
    const prompt = `
      Context: ${context}
      
      User Question: ${userInput}
      
      Please provide a helpful response based on the context provided.
    `;

    // 4. Generate response using Gemini
    const result = await this.model.generateText(prompt);
    return result.response.text();
  }

  async addDocument(text: string, metadata = {}) {
    const embedding = await this.embedder.embedText(text);
    await this.vectorStore.upsert([{
      id: crypto.randomUUID(),
      values: embedding,
      metadata: { ...metadata, text }
    }]);
  }
}
```

4. Create the Express server (`src/index.ts`):
```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { RAGService } from './rag';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ragService = new RAGService();

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await ragService.query(message);
    res.json({ response });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Frontend Integration

Modify your existing Chatbot component to use the new API:

```typescript
// src/components/Chatbot.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!input.trim()) return;

  const userMessageId = `user-${Date.now()}`;
  const userMessage: Message = {
    text: input,
    sender: 'user',
    timestamp: new Date(),
    id: userMessageId
  };
  setMessages(prev => [...prev, userMessage]);
  setInput('');
  setIsTyping(true);

  try {
    const response = await fetch('https://your-api-url/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    
    const botMessageId = `bot-${Date.now()}`;
    const botMessage: Message = {
      text: data.response,
      sender: 'bot',
      timestamp: new Date(),
      id: botMessageId
    };
    
    setMessages(prev => [...prev, botMessage]);
  } catch (error) {
    console.error('Error:', error);
    const errorMessage: Message = {
      text: "I'm sorry, I encountered an error. Please try again.",
      sender: 'bot',
      timestamp: new Date(),
      id: `error-${Date.now()}`
    };
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsTyping(false);
    if (!isOpen) setHasNewMessage(true);
  }
};
```

## Deployment

### Backend Deployment (Vercel)

1. Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.ts"
    }
  ]
}
```

2. Add build scripts to `package.json`:
```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts"
  }
}
```

3. Deploy:
```bash
vercel
```

## Environment Variables

### Backend (.env)
```
GOOGLE_AI_API_KEY=your_gemini_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX=your_index_name
PORT=3000
```

### Frontend (.env)
```
VITE_API_URL=your_backend_api_url
```

## Initial Setup Steps

1. Create accounts and get API keys:
   - Google AI Studio for Gemini API
   - Pinecone for vector database

2. Set up Pinecone index:
   - Create a new index with dimension 768 (Gemini's embedding size)
   - Note down the index name and environment

3. Seed the vector database with your portfolio content:
```typescript
// scripts/seedVectorStore.ts
import { RAGService } from '../src/rag';

async function seedVectorStore() {
  const rag = new RAGService();
  
  // Add your portfolio content
  await rag.addDocument("About me content...");
  await rag.addDocument("Experience details...");
  await rag.addDocument("Projects information...");
  // Add more content as needed
}

seedVectorStore().catch(console.error);
```

## Error Handling

The implementation includes basic error handling. Consider adding:
- Rate limiting
- Request validation
- API key rotation
- Response caching
- Logging and monitoring

## Security Considerations

1. Always keep API keys in environment variables
2. Implement rate limiting
3. Use CORS properly
4. Validate user input
5. Set up proper error handling
6. Monitor API usage

## Testing

1. Test the RAG implementation:
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"message":"Tell me about your experience"}' \
  http://localhost:3000/api/chat
```

2. Monitor response quality and latency
3. Test error handling
4. Verify context retrieval accuracy

## Maintenance

1. Regularly update the vector database with new content
2. Monitor API usage and costs
3. Update dependencies
4. Review and optimize prompts
5. Monitor and analyze user interactions for improvements

## Resources

- [Gemini AI Documentation](https://ai.google.dev/docs)
- [Pinecone Documentation](https://docs.pinecone.io/)
- [Express.js Documentation](https://expressjs.com/)
- [Vercel Documentation](https://vercel.com/docs) 