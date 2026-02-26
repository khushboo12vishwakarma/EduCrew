// src/pages/MyStudyMaterials.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Loading from '../components/Loading';

const MyStudyMaterials = () => {
  const { user } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const response = await api.get('/study-materials/my-materials/');
      setMaterials(response.data.materials || []);
    } catch (err) {
      console.error('Error fetching materials:', err);
      setError('Failed to load study materials');
    } finally {
      setLoading(false);
    }
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
            <h1 className="text-3xl font-bold text-slate-900">My Study Materials</h1>
            <p className="text-slate-500 mt-2">All your generated notes and uploaded files</p>
          </div>
          <Link 
            to="/study"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Create New
          </Link>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{materials.length}</p>
              <p className="text-slate-500">Total Materials</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {materials.filter(m => m.file).length}
              </p>
              <p className="text-slate-500">File Uploads</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">
                {materials.filter(m => !m.file).length}
              </p>
              <p className="text-slate-500">Generated Notes</p>
            </div>
          </div>
        </div>

        {/* Materials Grid */}
        {materials.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-200">
            <p className="text-slate-500 mb-4">No study materials yet</p>
            <Link 
              to="/study"
              className="text-blue-600 hover:underline"
            >
              Create your first study material →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material) => (
              <div 
                key={material.id} 
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-xs text-slate-400">
                    {new Date(material.uploaded_at).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="font-bold text-slate-900 mb-2 truncate" title={material.filename}>
                  {material.filename}
                </h3>
                
                {material.summary && (
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                    {material.summary.substring(0, 100)}...
                  </p>
                )}

                <div className="flex items-center gap-2 mb-4">
                  {material.file ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">File</span>
                  ) : (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Generated</span>
                  )}
                  {material.flashcards?.length > 0 && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      {material.flashcards.length} Flashcards
                    </span>
                  )}
                </div>

                <Link 
                  to={`/study-material/${material.id}`}
                  className="block w-full text-center py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyStudyMaterials;