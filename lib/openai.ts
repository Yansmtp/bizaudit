import OpenAI from 'openai'

const groqBase = process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1'

export const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || '',
  baseURL: groqBase,
})
