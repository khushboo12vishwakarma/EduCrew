import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api'; 
import Loading from '../components/Loading';

const MyPresentations = () => {
  const [presentations, setPresentations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Icons (Consistent with your Dashboard style)
  const Icons = {
    presentation: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    calendar: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  };

  useEffect(() => {
    fetchPresentations();
  }, []);

  const fetchPresentations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Hits the path: /api/EduCrew_Backend/presentations/my-presentations/
      const response = await api.get('/presentations/my-presentations/');

      // Map the 'presentations' key from your Django Response
      if (response.data && response.data.presentations) {
        setPresentations(response.data.presentations);
      } else {
        setPresentations([]);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load presentations. Please check your backend connection.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  // Calculated Stats (Fixes the "Zero" problem)
  const totalSlides = presentations.reduce((acc, p) => acc + (p.slides_count || 0), 0);
  const avgSlides = presentations.length > 0 ? Math.round(totalSlides / presentations.length) : 0;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Presentations</h1>
            <p className="text-slate-500 mt-1">Manage and view your generated slide decks</p>
          </div>
          <button 
            onClick={() => navigate('/presentation')}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all shadow-sm"
          >
            + Create New Presentation
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center gap-3">
            <span className="font-medium">{error}</span>
            <button onClick={fetchPresentations} className="underline ml-auto">Retry</button>
          </div>
        )}

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm font-medium text-slate-500 mb-1">Total Decks</p>
            <h3 className="text-3xl font-bold text-slate-900">{presentations.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm font-medium text-slate-500 mb-1">Total Slides</p>
            <h3 className="text-3xl font-bold text-green-600">{totalSlides}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm font-medium text-slate-500 mb-1">Avg. Slides per Deck</p>
            <h3 className="text-3xl font-bold text-purple-600">{avgSlides}</h3>
          </div>
        </div>

        {/* Presentations List */}
        {presentations.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 shadow-sm">
            <div className="inline-flex p-4 bg-slate-100 rounded-full text-slate-400 mb-4">
              {Icons.presentation}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No presentations yet</h3>
            <p className="text-slate-500 mb-6">Start by creating your first AI-powered presentation.</p>
            <Link to="/presentation" className="text-blue-600 font-medium hover:underline">
              Create now →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presentations.map((p) => (
              <div 
                key={p.id} 
                className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                onClick={() => navigate(`/presentation/${p.id}`)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {Icons.presentation}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    {Icons.calendar}
                    {new Date(p.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2 truncate" title={p.title}>
                  {p.title}
                </h3>
                
                <p className="text-sm text-slate-500 mb-6 line-clamp-1">
                  Topic: {p.topic || 'General Topic'}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {p.slides_count || 0} Slides
                  </span>
                  <span className="text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform">
                    View Project →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPresentations;