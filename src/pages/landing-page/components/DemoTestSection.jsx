import React, { useState } from 'react';
import { generateQuestion, GeminiAPIError } from '../../../services/geminiService';

const DemoTestSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const subjects = ['Physics', 'Chemistry', 'Mathematics'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const topics = {
    Physics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics'],
    Chemistry: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
    Mathematics: ['Algebra', 'Calculus', 'Geometry', 'Statistics']
  };

  const generateNewQuestion = async (subject = null, difficulty = null, topic = null) => {
    setLoading(true);
    setError(null);
    setShowResult(false);
    setSelectedAnswer(null);
    
    try {
      const selectedSubject = subject || subjects[Math.floor(Math.random() * subjects.length)];
      const selectedDifficulty = difficulty || difficulties[Math.floor(Math.random() * difficulties.length)];
      const availableTopics = topics[selectedSubject];
      const selectedTopic = topic || availableTopics[Math.floor(Math.random() * availableTopics.length)];
      
      const question = await generateQuestion(selectedSubject, selectedDifficulty, selectedTopic);
      setCurrentQuestion(question);
      setRetryCount(0);
    } catch (err) {
      console.error('Error generating question:', err);
      
      if (err instanceof GeminiAPIError) {
        setError({
          message: err.message,
          code: err.code,
          retryAfter: err.retryAfter
        });
      } else {
        setError({
          message: 'Failed to generate question. Please try again.',
          code: 'GENERATION_ERROR'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    generateNewQuestion();
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
  };

  const resetTest = () => {
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowResult(false);
    setError(null);
    setRetryCount(0);
  };

  // Error display component
  const ErrorDisplay = ({ error, onRetry }) => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div className="text-red-600 mb-4">
        <svg className="mx-auto h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold">Unable to Generate Question</h3>
      </div>
      <p className="text-red-700 mb-4">{error.message}</p>
      {error.code === 'QUOTA_EXCEEDED' && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4">
          <p className="text-amber-800 text-sm">
            💡 <strong>Tip:</strong> Our AI service has a daily usage limit. Try again in a few minutes or contact support for priority access.
          </p>
        </div>
      )}
      <div className="flex justify-center space-x-3">
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={resetTest}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Try Our AI-Powered Practice Test
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience how our AI generates personalized questions tailored to your learning needs.
            Perfect for JEE and NEET preparation.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Generating your personalized question...</p>
            </div>
          )}

          {error && (
            <ErrorDisplay error={error} onRetry={handleRetry} />
          )}

          {!currentQuestion && !loading && !error && (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Ready to test your knowledge?
              </h3>
              <p className="text-gray-600 mb-6">
                Click below to generate a random question from Physics, Chemistry, or Mathematics.
              </p>
              <button
                onClick={() => generateNewQuestion()}
                className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Generate Question
              </button>
            </div>
          )}

          {currentQuestion && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {currentQuestion.question}
                </h3>
                <div className="space-y-3">
                  {currentQuestion.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-3 rounded-md border transition-colors ${
                        selectedAnswer === index
                          ? 'bg-blue-50 border-blue-300 text-blue-900' :'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      } ${showResult && index === currentQuestion.correct
                        ? 'bg-green-50 border-green-300 text-green-900' :''
                      } ${showResult && selectedAnswer === index && index !== currentQuestion.correct
                        ? 'bg-red-50 border-red-300 text-red-900' :''
                      }`}
                    >
                      <span className="font-medium">{String.fromCharCode(65 + index)})</span> {option}
                    </button>
                  ))}
                </div>
              </div>

              {!showResult && (
                <div className="text-center">
                  <button
                    onClick={submitAnswer}
                    disabled={selectedAnswer === null}
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Submit Answer
                  </button>
                </div>
              )}

              {showResult && (
                <div className="bg-gray-50 rounded-md p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {selectedAnswer === currentQuestion.correct ? '✅ Correct!' : '❌ Incorrect'}
                  </h4>
                  <p className="text-gray-700 mb-3">
                    <strong>Solution:</strong> {currentQuestion.solution}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Explanation:</strong> {currentQuestion.explanation}
                  </p>
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => generateNewQuestion()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Try Another Question
                    </button>
                    <button
                      onClick={resetTest}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      End Demo
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            This is just a sample of our AI-powered question generation. Get access to thousands more!
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 transition-colors font-medium">
            Start Your Free Trial
          </button>
        </div>
      </div>
    </section>
  );
};

export default DemoTestSection;