import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'your-gemini-api-key'
const genAI = new GoogleGenerativeAI(API_KEY)

export const generateQuiz = async (programmingLanguage: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const prompt = `Generate a quiz about ${programmingLanguage} programming language with exactly 10 questions. 
    Format the response as a JSON object with the following structure:
    {
      "questions": [
        {
          "question": "Question text here",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 0,
          "explanation": "Brief explanation of the correct answer"
        }
      ]
    }
    
    Make sure the questions cover various aspects like syntax, concepts, best practices, and common patterns in ${programmingLanguage}.
    Each question should have exactly 4 options and the correctAnswer should be the index (0-3) of the correct option.
    Make the questions moderately challenging and educational.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Clean up the response to ensure it's valid JSON
    const cleanText = text.replace(/```json\n?|\n?```/g, '').trim()
    return JSON.parse(cleanText)
  } catch (error) {
    console.error('Error generating quiz:', error)
    // Fallback quiz data
    return {
      questions: [
        {
          question: `What is a key feature of ${programmingLanguage}?`,
          options: ['Speed', 'Simplicity', 'Flexibility', 'All of the above'],
          correctAnswer: 3,
          explanation: `${programmingLanguage} is known for its combination of speed, simplicity, and flexibility.`
        }
      ]
    }
  }
}

export const generateRoadmap = async (programmingLanguage: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const prompt = `Create a comprehensive learning roadmap for ${programmingLanguage} programming language.
    Format the response as a JSON object representing a tree structure:
    {
      "title": "${programmingLanguage} Learning Roadmap",
      "phases": [
        {
          "phase": "Beginner",
          "duration": "2-3 months",
          "topics": [
            {
              "title": "Topic name",
              "description": "Brief description",
              "subtopics": ["Subtopic 1", "Subtopic 2"]
            }
          ]
        }
      ]
    }
    
    Include 4 phases: Beginner, Intermediate, Advanced, and Expert.
    Each phase should have 3-5 main topics with relevant subtopics.
    Focus on practical skills and real-world applications.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    const cleanText = text.replace(/```json\n?|\n?```/g, '').trim()
    return JSON.parse(cleanText)
  } catch (error) {
    console.error('Error generating roadmap:', error)
    return {
      title: `${programmingLanguage} Learning Roadmap`,
      phases: [
        {
          phase: 'Beginner',
          duration: '2-3 months',
          topics: [
            {
              title: 'Getting Started',
              description: 'Learn the basics and set up your development environment',
              subtopics: ['Installation', 'Basic Syntax', 'Hello World']
            }
          ]
        }
      ]
    }
  }
}