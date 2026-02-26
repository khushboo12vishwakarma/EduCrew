// src/pages/MyCodeSessions.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Loading from '../components/Loading';

const MyCodeSessions = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await api.get('/code-sessions/my-sessions/');
      setSessions(response.data.sessions || []);
    } catch (err) {
      console.error('Error fetching sessions:', err);
      setError('Failed to load code sessions');
    } finally {
      setLoading(false);
    }
  };

  const getLanguageColor = (lang) => {
    const colors = {
      python: 'bg-blue-100 text-blue-700',
      javascript: 'bg-yellow-100 text-yellow-700',
      java: 'bg-red-100 text-red-700',
      cpp: 'bg-purple-100 text-purple-700',
      c: 'bg-gray-100 text-gray-700',
    };
    return colors[lang?.toLowerCase()] || 'bg-slate-100 text-slate-700';
  };

  if (loading) return <Loading />;
  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-500">
      {error}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Code Sessions</h1>
            <p className="text-slate-500 mt-2">All your coding practice and interview sessions</p>
          </div>
          <Link 
            to="/code"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            + New Session
          </Link>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">{sessions.length}</p>
              <p className="text-slate-500">Total Sessions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">
                {sessions.filter(s => s.is_interview).length}
              </p>
              <p className="text-slate-500">Interviews</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {sessions.filter(s => !s.sandbox_error).length}
              </p>
              <p className="text-slate-500">Successful Runs</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {[...new Set(sessions.map(s => s.language))].length}
              </p>
              <p className="text-slate-500">Languages Used</p>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        {sessions.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-200">
            <p className="text-slate-500 mb-4">No code sessions yet</p>
            <Link 
              to="/code"
              className="text-purple-600 hover:underline"
            >
              Start your first coding session →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <div 
                key={session.id} 
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 capitalize">
                        {session.language} {session.is_interview ? 'Interview' : 'Practice'}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {new Date(session.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${getLanguageColor(session.language)}`}>
                      {session.language}
                    </span>
                    
                    {session.is_interview && session.interview_score && (
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        session.interview_score >= 80 ? 'bg-green-100 text-green-700' :
                        session.interview_score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        Score: {session.interview_score}%
                      </span>
                    )}
                    
                    {!session.sandbox_error ? (
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                        ✓ Success
                      </span>
                    ) : (
                      <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
                        ✗ Error
                      </span>
                    )}
                    
                    <Link 
                      to={`/code-session/${session.id}`}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCodeSessions;