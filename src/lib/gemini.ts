import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'your-gemini-api-key'
const genAI = new GoogleGenerativeAI(API_KEY)

export const generateQuiz = async (programmingLanguage: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = `
Generate a quiz about ${programmingLanguage} programming language with EXACTLY 10 questions.

⚠️ VERY IMPORTANT RULES:
1. At least **6 out of 10 questions MUST include a code snippet**.
2. Code snippets MUST be inside Markdown triple backticks with correct language tagging.
3. Code-based questions should ask about:
   - Output of the code
   - Errors in the code
   - Best practice improvements
   - Concept demonstrated by the code
4. Do NOT explain the code inside the question text.

Return ONLY valid JSON. Do NOT include any extra text, markdown explanations, or commentary.

JSON FORMAT (STRICT):
{
  "questions": [
    {
      "question": "Question text here (include code if required)",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Brief explanation of why this option is correct"
    }
  ]
}

EXAMPLE QUESTION FORMAT (follow this style):

{
  "question": "What will be the output of the following ${programmingLanguage} code?\\n\\n\`\`\`${programmingLanguage}\\n<code here>\\n\`\`\`",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 1,
  "explanation": "Short and clear explanation"
}

Make the questions moderately challenging and educational.
`;


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
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

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

export const generateLibraryNotes = async (programmingLanguage: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = `Generate comprehensive programming notes for ${programmingLanguage}. 
    Format the response as a JSON object with the following structure:
    {
      "theory": "Detailed explanation of the language, its features, use cases, and core concepts",
      "codeExamples": [
        {
          "title": "Example title",
          "description": "Brief description of what this code does",
          "code": "Complete, runnable code example"
        }
      ]
    }
    
    Include at least 5-7 practical code examples covering:
    - Basic syntax and variables
    - Functions/methods
    - Data structures (arrays, objects, etc.)
    - Control flow (loops, conditionals)
    - Error handling
    - A practical mini-project example
    
    Make the theory section comprehensive but accessible, covering the language's history, 
    key features, advantages, common use cases, and fundamental concepts.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    const cleanText = text.replace(/```json\n?|\n?```/g, '').trim()
    console.log('Library Notes Response:', cleanText)
    return JSON.parse(cleanText)
  } catch (error) {
    console.error('Error generating library notes:', error)
    return {
      theory: `${programmingLanguage} is a powerful programming language with many applications in software development. It offers a rich set of features and is widely used in the industry for various types of projects.`,
      codeExamples: [
        {
          title: 'Hello World',
          description: 'A simple program that displays "Hello, World!"',
          code: `// Hello World example\nconsole.log("Hello, World!");`
        }
      ]
    }
  }
}