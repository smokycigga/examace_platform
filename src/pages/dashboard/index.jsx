import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Target, TrendingUp, Settings, Bell, Sun, Moon, User, LogOut, Play, Eye, RefreshCw, Flame, Trophy, Quote, ChevronDown, CheckCircle, XCircle, Bot, Send } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { generateText, generateStudyRecommendations, chatWithHistory } from '../../services/geminiService';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedExam, setSelectedExam] = useState('JEE Main');
  const [showExamDropdown, setShowExamDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [studyPlan, setStudyPlan] = useState('');
  const [aiRecommendations, setAiRecommendations] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [motivationalQuote, setMotivationalQuote] = useState('');

  // Sample data for charts
  const progressData = [
    { name: 'Week 1', score: 65 },
    { name: 'Week 2', score: 72 },
    { name: 'Week 3', score: 68 },
    { name: 'Week 4', score: 78 },
    { name: 'Week 5', score: 85 },
    { name: 'Week 6', score: 88 },
    { name: 'Week 7', score: 92 },
  ];

  const accuracyData = [
    { name: 'Correct', value: 65, color: '#10B981' },
    { name: 'Incorrect', value: 25, color: '#EF4444' },
    { name: 'Skipped', value: 10, color: '#6B7280' },
  ];

  const testHistory = [
    { date: '2024-01-15', score: 92, accuracy: 85, weakTopics: ['Thermodynamics', 'Optics'] },
    { date: '2024-01-14', score: 88, accuracy: 82, weakTopics: ['Organic Chemistry', 'Calculus'] },
    { date: '2024-01-13', score: 85, accuracy: 78, weakTopics: ['Mechanics', 'Algebra'] },
  ];

  const weakAreas = [
    { topic: 'Thermodynamics', accuracy: 45 },
    { topic: 'Organic Chemistry', accuracy: 52 },
    { topic: 'Optics', accuracy: 58 },
  ];

  const strengths = [
    { topic: 'Mechanics', accuracy: 92 },
    { topic: 'Algebra', accuracy: 88 },
    { topic: 'Inorganic Chemistry', accuracy: 85 },
  ];

  const studyPlanTasks = [
    { task: 'Review Thermodynamics - Heat Engines', completed: false, priority: 'high' },
    { task: 'Practice Organic Chemistry - Nomenclature', completed: true, priority: 'medium' },
    { task: 'Solve Optics - Ray Optics Problems', completed: false, priority: 'high' },
    { task: 'Daily Practice Test - Mixed Topics', completed: false, priority: 'low' },
  ];

  // Generate AI-powered study recommendations
  const generateAIRecommendations = async () => {
    setLoading(true);
    try {
      const performanceData = {
        weakAreas: weakAreas.map(area => ({ topic: area.topic, accuracy: area.accuracy })),
        strengths: strengths.map(strength => ({ topic: strength.topic, accuracy: strength.accuracy })),
        recentScores: progressData.map(data => data.score),
        exam: selectedExam
      };

      const recommendations = await generateStudyRecommendations(performanceData);
      setAiRecommendations(recommendations);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      setAiRecommendations('Unable to generate recommendations at this time. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Generate motivational quote
  const generateQuote = async () => {
    try {
      const quote = await generateText(`Generate a short motivational quote for ${selectedExam} exam preparation. Make it inspiring and relevant to competitive exam students. Return only the quote without any additional text.`);
      setMotivationalQuote(quote);
    } catch (error) {
      console.error('Error generating quote:', error);
      setMotivationalQuote('Success is not final, failure is not fatal: it is the courage to continue that counts.');
    }
  };

  // Handle AI chat
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatLoading(true);
    try {
      const prompt = `You are an AI tutor helping with ${selectedExam} preparation. Student question: ${chatInput}. Provide a helpful, accurate response.`;
      const { response, updatedHistory } = await chatWithHistory(prompt, chatHistory);
      
      setChatHistory(prevHistory => [
        ...prevHistory,
        { role: 'user', content: chatInput },
        { role: 'assistant', content: response }
      ]);
      setChatInput('');
    } catch (error) {
      console.error('Error in chat:', error);
      setChatHistory(prevHistory => [
        ...prevHistory,
        { role: 'user', content: chatInput },
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // Generate study plan
  const generateStudyPlan = async () => {
    setLoading(true);
    try {
      const prompt = `Create a detailed study plan for ${selectedExam} exam preparation based on weak areas: ${weakAreas.map(area => area.topic).join(', ')}. Include specific topics to focus on, time allocation, and practice suggestions. Format as a structured plan.`;
      const plan = await generateText(prompt);
      setStudyPlan(plan);
    } catch (error) {
      console.error('Error generating study plan:', error);
      setStudyPlan('Unable to generate study plan at this time. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateAIRecommendations();
    generateQuote();
  }, [selectedExam]);

  const examOptions = ['JEE Main', 'JEE Advanced', 'NEET'];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation Header */}
      <header className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold">AI Tutor</h1>
            </div>

            {/* Center - Exam Selector */}
            <div className="relative">
              <button
                onClick={() => setShowExamDropdown(!showExamDropdown)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' :'bg-white border-gray-200 hover:bg-gray-50'
                } transition-colors`}
              >
                <Target className="w-4 h-4" />
                <span>{selectedExam}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showExamDropdown && (
                <div className={`absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg border ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' :'bg-white border-gray-200'
                } z-10`}>
                  {examOptions.map((exam) => (
                    <button
                      key={exam}
                      onClick={() => {
                        setSelectedExam(exam);
                        setShowExamDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      } ${selectedExam === exam ? 'bg-blue-50 text-blue-600' : ''}`}
                    >
                      {exam}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right - Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                } transition-colors`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              } transition-colors relative`}>
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className={`flex items-center space-x-2 p-2 rounded-lg ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  } transition-colors`}
                >
                  <User className="w-5 h-5" />
                </button>

                {showProfileDropdown && (
                  <div className={`absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700' :'bg-white border-gray-200'
                  } z-10`}>
                    <div className="p-4 border-b border-gray-200">
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-gray-500">john.doe@email.com</p>
                    </div>
                    <div className="p-2">
                      <button className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      } flex items-center space-x-2`}>
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                      <button 
                        onClick={() => navigate('/')}
                        className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 ${
                          isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                        } flex items-center space-x-2 text-red-600`}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome back, John!</h2>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Here's your learning progress for {selectedExam}
          </p>
        </div>

        {/* Student Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Progress Overview */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm border ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Progress Trend</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-500 mt-2">+12% from last week</p>
          </div>

          {/* Accuracy Snapshot */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm border ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Accuracy</h3>
              <Target className="w-5 h-5 text-blue-500" />
            </div>
            <div className="h-32 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={accuracyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    dataKey="value"
                  >
                    {accuracyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-green-500">65% Correct</span>
              <span className="text-gray-500">Avg: 2.3s/q</span>
            </div>
          </div>

          {/* Weak Areas */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm border ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Weak Areas</h3>
              <XCircle className="w-5 h-5 text-red-500" />
            </div>
            <div className="space-y-2">
              {weakAreas.slice(0, 3).map((area, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm truncate">{area.topic}</span>
                  <span className="text-sm text-red-500">{area.accuracy}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm border ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Strengths</h3>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-2">
              {strengths.slice(0, 3).map((strength, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm truncate">{strength.topic}</span>
                  <span className="text-sm text-green-500">{strength.accuracy}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Smart Test Generator */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm border ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        } mb-8`}>
          <h3 className="text-lg font-semibold mb-4">Smart Test Generator</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <select className={`px-4 py-2 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600' :'bg-white border-gray-200'
            }`}>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Mathematics</option>
              <option>Biology</option>
            </select>
            <select className={`px-4 py-2 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600' :'bg-white border-gray-200'
            }`}>
              <option>Mixed Difficulty</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
            <select className={`px-4 py-2 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600' :'bg-white border-gray-200'
            }`}>
              <option>Practice Mode</option>
              <option>Timed Test</option>
              <option>Mock Test</option>
            </select>
            <select className={`px-4 py-2 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600' :'bg-white border-gray-200'
            }`}>
              <option>30 minutes</option>
              <option>60 minutes</option>
              <option>90 minutes</option>
              <option>180 minutes</option>
            </select>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
            <Play className="w-4 h-4 mr-2" />
            Generate & Start Test
          </Button>
        </div>

        {/* Test History */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm border ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        } mb-8`}>
          <h3 className="text-lg font-semibold mb-4">Test History</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Score</th>
                  <th className="text-left py-3 px-4">Accuracy</th>
                  <th className="text-left py-3 px-4">Weak Topics</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testHistory.map((test, index) => (
                  <tr key={index} className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-3 px-4">{test.date}</td>
                    <td className="py-3 px-4">
                      <span className={`font-semibold ${
                        test.score >= 90 ? 'text-green-500' : 
                        test.score >= 70 ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                        {test.score}%
                      </span>
                    </td>
                    <td className="py-3 px-4">{test.accuracy}%</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {test.weakTopics.map((topic, idx) => (
                          <span key={idx} className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-500 hover:text-blue-700">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-500 hover:text-green-700">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Learning Suggestions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* AI Study Plan */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm border ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">AI Study Plan</h3>
              <button 
                onClick={generateStudyPlan}
                disabled={loading}
                className="text-blue-500 hover:text-blue-700 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <div className="space-y-3">
              {studyPlanTasks.map((task, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    task.completed ? 'bg-green-500' : 
                    task.priority === 'high' ? 'bg-red-500' : 
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}></div>
                  <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.task}
                  </span>
                </div>
              ))}
            </div>
            {studyPlan && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm whitespace-pre-wrap">{studyPlan}</p>
              </div>
            )}
          </div>

          {/* AI Recommendations */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm border ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">AI Recommendations</h3>
              <button 
                onClick={generateAIRecommendations}
                disabled={loading}
                className="text-blue-500 hover:text-blue-700 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <div className="space-y-3">
              {loading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-500">Generating recommendations...</p>
                </div>
              ) : (
                <div className="text-sm whitespace-pre-wrap">
                  {aiRecommendations || 'Click the refresh button to generate AI-powered study recommendations.'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Extra Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Streak Tracker */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm border ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Study Streak</h3>
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">12</div>
              <p className="text-sm text-gray-500">Days</p>
            </div>
          </div>

          {/* Leaderboard */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm border ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Leaderboard</h3>
              <Trophy className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500">#3</div>
              <p className="text-sm text-gray-500">This Week</p>
            </div>
          </div>

          {/* Motivational Quote */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm border ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Daily Motivation</h3>
              <Quote className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-sm italic text-center">
              {motivationalQuote || 'Success is not final, failure is not fatal: it is the courage to continue that counts.'}
            </p>
          </div>
        </div>
      </main>

      {/* AI Assistant Chat */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className={`${showAIChat ? 'block' : 'hidden'} mb-4`}>
          <div className={`w-80 h-96 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl border ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          } flex flex-col`}>
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-sm text-gray-500">Ask me anything about {selectedExam}</p>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {chatHistory.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.role === 'user' ?'bg-blue-500 text-white' : isDarkMode ?'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className={`max-w-xs px-3 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask a question..."
                  className={`flex-1 px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600' :'bg-white border-gray-200'
                  }`}
                />
                <button
                  type="submit"
                  disabled={chatLoading || !chatInput.trim()}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <button
          onClick={() => setShowAIChat(!showAIChat)}
          className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
        >
          {showAIChat ? <XCircle className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;