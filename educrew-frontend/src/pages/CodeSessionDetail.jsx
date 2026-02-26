// src/pages/CodeSessionDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';

const CodeSessionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSession();
  }, [id]);

  const fetchSession = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/code-sessions/${id}/`);
      setSession(response.data);
    } catch (err) {
      console.error('Error fetching session:', err);
      setError('Failed to load code session');
    } finally {
      setLoading(false);
    }
  };

  const getLanguageColor = (lang) => {
    const colors = {
      python: 'bg-blue-100 text-blue-800',
      javascript: 'bg-yellow-100 text-yellow-800',
      java: 'bg-red-100 text-red-800',
      cpp: 'bg-purple-100 text-purple-800',
      c: 'bg-gray-100 text-gray-800',
    };
    return colors[lang?.toLowerCase()] || 'bg-slate-100 text-slate-800';
  };

  if (loading) return <Loading />;
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => navigate('/my-code-sessions')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg"
        >
          Back to Sessions
        </button>
      </div>
    </div>
  );
  if (!session) return <div className="min-h-screen flex items-center justify-center">Session not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/my-code-sessions')}
              className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900 capitalize">
                  {session.language} {session.is_interview ? 'Interview' : 'Practice'}
                </h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLanguageColor(session.language)}`}>
                  {session.language}
                </span>
              </div>
              <p className="text-sm text-slate-500">
                {new Date(session.created_at).toLocaleString()}
              </p>
            </div>
          </div>
          
          {session.is_interview && session.interview_score !== null && (
            <div className={`px-6 py-3 rounded-xl ${
              session.interview_score >= 80 ? 'bg-green-100 text-green-800' :
              session.interview_score >= 60 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              <span className="text-sm font-medium">Interview Score</span>
              <p className="text-3xl font-bold">{session.interview_score}%</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor View */}
          <div className="bg-slate-900 rounded-xl overflow-hidden">
            <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
              <span className="text-slate-400 text-sm font-mono">code.{session.language}</span>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
            </div>
            <pre className="p-4 text-sm font-mono text-slate-300 overflow-x-auto min-h-[400px] max-h-[600px]">
              <code>{session.code || '// No code saved for this session'}</code>
            </pre>
          </div>

          {/* Results / Output */}
          <div className="space-y-6">
            {/* Execution Result */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Execution Result
              </h3>
              
              {session.sandbox_error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-red-700 mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Execution Error</span>
                  </div>
                  <pre className="text-sm text-red-600 whitespace-pre-wrap">{session.sandbox_error}</pre>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-700 mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Success</span>
                  </div>
                  <pre className="text-sm text-green-800 whitespace-pre-wrap">{session.output || 'Code executed successfully with no output'}</pre>
                </div>
              )}
            </div>

            {/* Interview Details */}
            {session.is_interview && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Interview Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Difficulty</span>
                    <span className="font-medium capitalize">{session.interview_difficulty || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Score</span>
                    <span className={`font-bold ${
                      session.interview_score >= 80 ? 'text-green-600' :
                      session.interview_score >= 60 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {session.interview_score !== null ? `${session.interview_score}%` : 'N/A'}
                    </span>
                  </div>
                  {session.feedback && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 mb-1">Feedback:</p>
                      <p className="text-sm text-blue-800">{session.feedback}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Question / Prompt */}
            {session.question && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Problem Statement</h3>
                <div className="prose max-w-none text-slate-700">
                  {session.question}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSessionDetail;