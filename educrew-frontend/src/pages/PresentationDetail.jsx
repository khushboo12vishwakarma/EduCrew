// src/pages/PresentationDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';

const PresentationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [presentation, setPresentation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchPresentation();
  }, [id]);

  const fetchPresentation = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/presentations/${id}/`);
      setPresentation(response.data);
    } catch (err) {
      console.error('Error fetching presentation:', err);
      setError('Failed to load presentation');
    } finally {
      setLoading(false);
    }
  };

  // FIXED: Proper download function with correct headers
 const downloadPPT = async () => {
  try {
    const response = await api.get(`/presentations/${id}/download/`, {
      responseType: 'blob',  // Must be set here
    });
    
    const blob = new Blob([response.data], { 
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' 
    });
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${presentation?.title || 'presentation'}.pptx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    
  } catch (err) {
    console.error('Download error:', err);
    alert('Download failed: ' + (err.response?.data?.detail || err.message));
  }
};

  if (loading) return <Loading />;
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => navigate('/my-presentations')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Presentations
        </button>
      </div>
    </div>
  );
  
  if (!presentation) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-500">
      Presentation not found
    </div>
  );

  const slides = presentation.slides || [];
  const hasMultipleSlides = slides.length > 0;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/my-presentations')}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold">{presentation.title}</h1>
            <p className="text-sm text-slate-400">Topic: {presentation.topic}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={downloadPPT}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PPT
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Slide Thumbnails Sidebar */}
        {hasMultipleSlides && (
          <div className="w-64 bg-slate-800 border-r border-slate-700 overflow-y-auto p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-4">Slides</h3>
            <div className="space-y-2">
              {slides.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentSlide === idx 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono opacity-60">{idx + 1}</span>
                    <span className="text-sm truncate">{slide.title || `Slide ${idx + 1}`}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Slide Viewer */}
        <div className="flex-1 flex flex-col">
          {/* Slide Display */}
          <div className="flex-1 flex items-center justify-center p-8 bg-slate-950">
            <div className="w-full max-w-4xl aspect-video bg-white rounded-lg shadow-2xl overflow-hidden text-slate-900">
              {hasMultipleSlides ? (
                <div className="h-full p-12 flex flex-col">
                  <h2 className="text-3xl font-bold mb-6 text-blue-900">
                    {slides[currentSlide].title}
                  </h2>
                  <div className="flex-1 overflow-y-auto">
                    {slides[currentSlide].content && (
                      <div 
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: slides[currentSlide].content }}
                      />
                    )}
                    {slides[currentSlide].bullet_points && slides[currentSlide].bullet_points.length > 0 && (
                      <ul className="list-disc list-inside space-y-3 text-lg text-slate-700">
                        {slides[currentSlide].bullet_points.map((point, idx) => (
                          <li key={idx} className="leading-relaxed">{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="mt-6 pt-4 border-t text-sm text-slate-500 flex justify-between">
                    <span>Slide {currentSlide + 1} of {slides.length}</span>
                    <span>{presentation.title}</span>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4 text-blue-900">{presentation.title}</h2>
                    <p className="text-slate-600">{presentation.topic}</p>
                    <p className="text-slate-400 mt-4">No slide data available</p>
                    {presentation.file_url && (
                      <button 
                        onClick={downloadPPT}
                        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Download PPTX File
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Bar */}
          {hasMultipleSlides && (
            <div className="bg-slate-800 border-t border-slate-700 px-6 py-4 flex items-center justify-between">
              <button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">
                  {currentSlide + 1} / {slides.length}
                </span>
              </div>

              <button
                onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                disabled={currentSlide === slides.length - 1}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center gap-2 transition-colors"
              >
                Next
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PresentationDetail;