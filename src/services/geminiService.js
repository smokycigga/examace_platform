import genAI from './geminiClient';

/**
 * Custom error class for Gemini API errors
 */
class GeminiAPIError extends Error {
  constructor(message, code, retryAfter = null) {
    super(message);
    this.name = 'GeminiAPIError';
    this.code = code;
    this.retryAfter = retryAfter;
  }
}

/**
 * Handles API errors and provides user-friendly messages
 * @param {Error} error - The original error
 * @returns {GeminiAPIError} Formatted error with user-friendly message
 */
function handleGeminiError(error) {
  console.error('Gemini API Error:', error);
  
  if (error.message?.includes('429') || error.message?.includes('quota')) {
    return new GeminiAPIError(
      'Our AI service is currently experiencing high demand. Please try again in a few minutes.',
      'QUOTA_EXCEEDED',
      60000 // 1 minute retry
    );
  }
  
  if (error.message?.includes('401') || error.message?.includes('authentication')) {
    return new GeminiAPIError(
      'AI service authentication error. Please contact support.',
      'AUTH_ERROR'
    );
  }
  
  if (error.message?.includes('503') || error.message?.includes('unavailable')) {
    return new GeminiAPIError(
      'AI service is temporarily unavailable. Please try again later.',
      'SERVICE_UNAVAILABLE',
      30000 // 30 seconds retry
    );
  }
  
  return new GeminiAPIError(
    'An unexpected error occurred with our AI service. Please try again.',
    'UNKNOWN_ERROR'
  );
}

/**
 * Implements retry logic with exponential backoff
 * @param {Function} apiCall - The API call function
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise} The result of the API call
 */
async function retryWithBackoff(apiCall, maxRetries = 3, baseDelay = 1000) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      const geminiError = handleGeminiError(error);
      
      // Don't retry on quota exceeded errors
      if (geminiError.code === 'QUOTA_EXCEEDED' || attempt === maxRetries - 1) {
        throw geminiError;
      }
      
      // Calculate delay with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

/**
 * Generates a text response based on user input.
 * @param {string} prompt - The user's input prompt.
 * @returns {Promise<string>} The generated text.
 */
export async function generateText(prompt) {
  return retryWithBackoff(async () => {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  });
}

/**
 * Streams a text response chunk by chunk.
 * @param {string} prompt - The user's input prompt.
 * @param {Function} onChunk - Callback to handle each streamed chunk.
 */
export async function streamText(prompt, onChunk) {
  return retryWithBackoff(async () => {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        onChunk(text);
      }
    }
  });
}

/**
 * Generates text based on a text prompt and an image.
 * @param {string} prompt - The text prompt.
 * @param {File} imageFile - The image file.
 * @returns {Promise<string>} The generated text.
 */
export async function generateTextFromImage(prompt, imageFile) {
  return retryWithBackoff(async () => {
    // Use flash model instead of pro for better quota management
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Convert image file to base64
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = (error) => reject(error);
      });

    const imageBase64 = await toBase64(imageFile);
    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType: imageFile.type,
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    return response.text();
  });
}

/**
 * Manages a chat session with history.
 * @param {string} prompt - The user's input prompt.
 * @param {Array} history - The chat history.
 * @returns {Promise<{response: string, updatedHistory: Array}>} The response and updated history.
 */
export async function chatWithHistory(prompt, history = []) {
  return retryWithBackoff(async () => {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const chat = model.startChat({ history });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    const updatedHistory = [
      ...history,
      { role: 'user', parts: [{ text: prompt }] },
      { role: 'model', parts: [{ text }] },
    ];

    return { response: text, updatedHistory };
  });
}

/**
 * Generates a question based on subject and difficulty parameters.
 * @param {string} subject - The subject (e.g., 'Physics', 'Chemistry', 'Mathematics').
 * @param {string} difficulty - The difficulty level (e.g., 'Easy', 'Medium', 'Hard').
 * @param {string} topic - The specific topic within the subject.
 * @returns {Promise<Object>} The generated question object.
 */
export async function generateQuestion(subject, difficulty, topic) {
  return retryWithBackoff(async () => {
    const prompt = `Generate a ${difficulty} level ${subject} question on the topic of ${topic}. 
    Format the response as a JSON object with the following structure:
    {
      "question": "The question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct": 0,
      "solution": "Step-by-step solution",
      "explanation": "Brief explanation of the key concept"
    }
    
    Make sure the question is appropriate for JEE/NEET exam preparation and includes proper mathematical notation where needed.`;

    // Use flash model instead of pro for better quota management
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('Failed to parse question format');
    }
  });
}

/**
 * Generates a detailed solution for a given question.
 * @param {string} question - The question text.
 * @param {Array} options - Array of answer options.
 * @param {number} correctAnswer - Index of the correct answer.
 * @returns {Promise<Object>} The generated solution object.
 */
export async function generateSolution(question, options, correctAnswer) {
  return retryWithBackoff(async () => {
    const prompt = `Provide a detailed solution for this question:
    
    Question: ${question}
    Options: ${options.map((opt, idx) => `${String.fromCharCode(65 + idx)}) ${opt}`).join(', ')}
    Correct Answer: ${String.fromCharCode(65 + correctAnswer)}) ${options[correctAnswer]}
    
    Format the response as a JSON object with:
    {
      "solution": "Step-by-step solution with clear mathematical working",
      "explanation": "Brief explanation of the key concept or principle used",
      "keyInsight": "Main insight or trick that makes this problem easier"
    }
    
    Make the solution comprehensive but easy to understand.`;

    // Use flash model instead of pro for better quota management
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('Failed to parse solution format');
    }
  });
}

/**
 * Generates personalized study recommendations based on performance.
 * @param {Array} performanceData - Array of user performance data.
 * @returns {Promise<string>} The generated recommendations.
 */
export async function generateStudyRecommendations(performanceData) {
  return retryWithBackoff(async () => {
    const prompt = `Based on the following performance data, provide personalized study recommendations:
    
    Performance Data: ${JSON.stringify(performanceData)}
    
    Provide specific, actionable recommendations for improvement including:
    - Weak areas to focus on
    - Study strategies
    - Time management tips
    - Practice suggestions
    
    Keep the recommendations encouraging and practical.`;

    // Use flash model instead of pro for better quota management
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  });
}

// Export the custom error class for use in components
export { GeminiAPIError };