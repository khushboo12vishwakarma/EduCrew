import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  FileCheck, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Download,
  Loader2,
  Search,
  AlignLeft,
  Quote,
  ExternalLink,
  LayoutTemplate,
  Type
} from 'lucide-react';
import logo from "../components/logo.jpeg";
import { motion, AnimatePresence } from 'framer-motion';
import 'jspdf-autotable';
import { qualityReviewerAPI } from '../services/api';

// --- Helper Functions (OUTSIDE COMPONENT) ---

// Helper to convert image to base64
const getBase64FromUrl = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
    });
  } catch (error) {
    console.error('Failed to convert image:', error);
    return null;
  }
};

// Helper to draw graduation cap in PDF
const drawGraduationCap = (pdf, x, y) => {
  pdf.setFillColor(255, 255, 255);
  pdf.setDrawColor(255, 255, 255);
  
  // Cap top (diamond shape)
  const capSize = 4;
  pdf.triangle(
    x - capSize, y - 2,
    x + capSize, y - 2,
    x, y - capSize - 2,
    'F'
  );
  
  // Cap base
  pdf.rect(x - capSize - 1, y - 2, (capSize + 1) * 2, 1.5, 'F');
  
  // Tassel
  pdf.setLineWidth(0.5);
  pdf.line(x + capSize, y - 2, x + capSize + 2, y + 2);
  pdf.circle(x + capSize + 2, y + 2, 0.5, 'F');
  
  // Person head (circle)
  pdf.circle(x, y + 1, 2, 'F');
  
  // Star above
  pdf.circle(x, y - 6, 1, 'F');
};

// --- Components ---

const ScoreCard = ({ label, value, delay, color = "indigo" }) => {
  const colorClasses = {
    indigo: "from-indigo-600 to-violet-600",
    emerald: "from-emerald-500 to-emerald-600",
    amber: "from-amber-500 to-amber-600",
    violet: "from-violet-500 to-violet-600",
    rose: "from-rose-500 to-rose-600"
  };

  const displayValue = typeof value === 'number' ? value : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center justify-center hover:shadow-md transition-shadow"
    >
      <div className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br ${colorClasses[color]} mb-2`}>
        {displayValue}
      </div>
      <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</div>
    </motion.div>
  );
};

const StatCard = ({ label, value, icon: Icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.3 }}
    className="flex items-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm"
  >
    <div className="p-3 rounded-lg bg-slate-50 text-slate-600 mr-4">
      <Icon size={20} />
    </div>
    <div>
      <div className="text-2xl font-bold text-slate-800">{value}</div>
      <div className="text-xs text-slate-500 font-medium uppercase">{label}</div>
    </div>
  </motion.div>
);

const MatchBar = ({ label, percentage, color }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <span className="text-sm font-bold text-slate-900">{percentage}%</span>
    </div>
    <div className="w-full bg-slate-200 rounded-full h-2.5">
      <div 
        className={`h-2.5 rounded-full ${color}`} 
        style={{ width: `${Math.min(percentage, 100)}%` }}
      ></div>
    </div>
  </div>
);

const QualityReviewer = () => {
  const [file, setFile] = useState(null);
  const [requirements, setRequirements] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [scanStep, setScanStep] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [logoBase64, setLogoBase64] = useState(null);
  
  const reportRef = useRef(null);

  const scanSteps = [
    "Uploading document...",
    "Extracting text...",
    "Running LLM quality analysis...",
    "Checking web sources for plagiarism...",
    "Compiling final report..."
  ];

  // Load logo on mount
    // Load logo on mount - FIXED VERSION
  useEffect(() => {
    const loadLogo = async () => {
      try {
        // Fetch the logo image and convert to base64
        const response = await fetch(logo);
        if (!response.ok) throw new Error('Failed to fetch logo');
        
        const blob = await response.blob();
        
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result;
          setLogoBase64(base64);
          console.log('Logo loaded successfully:', base64.substring(0, 50) + '...');
        };
        reader.onerror = () => {
          console.error('FileReader failed');
          setLogoBase64(null);
        };
        reader.readAsDataURL(blob);
        
      } catch (e) {
        console.error('Logo load failed:', e);
        setLogoBase64(null);
      }
    };
    
    loadLogo();
  }, []);

  // Handle scan steps animation
  useEffect(() => {
    if (!loading) return;
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < scanSteps.length - 1) {
        i++;
        setScanStep(i);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to review');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setScanStep(0);

    const formData = new FormData();
    formData.append('file', file);
    if (requirements.trim()) {
      formData.append('requirements', requirements);
    }

    try {
      const response = await qualityReviewerAPI.reviewDocument(formData);
      setResult(response.data);
    } catch (err) {
      console.error('API Error:', err);
      let errorMessage = 'Failed to analyze document. Please try again.';
      
      if (err.response) {
        if (err.response.status === 404) {
          errorMessage = 'API endpoint not found.';
        } else if (err.response.status === 401) {
          errorMessage = 'Authentication failed. Please login again.';
        } else if (err.response.data?.error) {
          errorMessage = err.response.data.error;
        } else if (err.response.data?.detail) {
          errorMessage = err.response.data.detail;
        }
      } else if (err.request) {
        errorMessage = 'Cannot connect to server. Please check if backend is running.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

 const handleExportReport = async () => {
  if (!result) {
    alert('No report to export');
    return;
  }
  
  setExporting(true);
  
  try {
    const { jsPDF } = await import('jspdf');
    await import('jspdf-autotable');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    // Color palette
    const colors = {
      primary: [0, 84, 97],

      primaryDark: [30, 64, 175],  // Blue-800
      secondary: [100, 116, 139],  // Slate-500
      dark: [15, 23, 42],          // Slate-900
      light: [248, 250, 252],      // Slate-50
      success: [16, 185, 129],     // Emerald-500
      warning: [245, 158, 11],     // Amber-500
      danger: [239, 68, 68],       // Red-500
      purple: [139, 92, 246]       // Violet-500
    };

    let currentY = 15;
    let pageNum = 1;

    // Helper: Add consistent footer
    const addFooter = () => {
      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(0.5);
      pdf.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
      
      pdf.setFontSize(8);
      pdf.setTextColor(148, 163, 184);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`EduCrew Plagiarism Report • Page ${pageNum}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    };

    // Helper: Check page break
    const checkPageBreak = (requiredSpace) => {
      if (currentY + requiredSpace > pageHeight - 25) {
        addFooter();
        pdf.addPage();
        pageNum++;
        currentY = margin;
        return true;
      }
      return false;
    };

    // ========== PROFESSIONAL HEADER ==========
    const headerHeight = 35;
    
    // Header background
    pdf.setFillColor(...colors.light);
    pdf.rect(0, 0, pageWidth, headerHeight, 'F');
    
    // Logo area
    const logoSize = 12;
    const logoX = margin;
    const logoY = 8;
    
    if (logoBase64 && logoBase64.startsWith('data:image')) {
      try {
        pdf.addImage(logoBase64, 'JPEG', logoX, logoY, logoSize, logoSize);
      } catch {
        try {
          pdf.addImage(logoBase64, 'PNG', logoX, logoY, logoSize, logoSize);
        } catch {
          // Fallback circle
          pdf.setFillColor(...colors.primary);
          pdf.circle(logoX + logoSize/2, logoY + logoSize/2, logoSize/2, 'F');
        }
      }
    } else {
      pdf.setFillColor(...colors.primary);
      pdf.circle(logoX + logoSize/2, logoY + logoSize/2, logoSize/2, 'F');
    }

    // Organization name
    pdf.setFontSize(20);
    pdf.setTextColor(...colors.primary);
    pdf.setFont('helvetica', 'bold');
    pdf.text('EduCrew', logoX + logoSize + 8, logoY + 8);
    
    // Report type
    pdf.setFontSize(11);
    pdf.setTextColor(...colors.secondary);
    pdf.setFont('helvetica', 'normal');
    pdf.text('EduCrew Plagiarism Report', logoX + logoSize + 8, logoY + 16);

    // Date on right
    pdf.setFontSize(9);
    pdf.setTextColor(...colors.secondary);
    const dateStr = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });
    pdf.text(dateStr, pageWidth - margin, logoY + 8, { align: 'right' });

    currentY = headerHeight + 10;

    // ========== DOCUMENT METADATA CARD ==========
    checkPageBreak(30);
    
    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(226, 232, 240);
    pdf.roundedRect(margin, currentY, contentWidth, 28, 4, 4, 'FD');
    
    // Decorative top border
    pdf.setFillColor(...colors.primary);
    pdf.rect(margin, currentY, contentWidth, 3, 'F');

    pdf.setFontSize(10);
    pdf.setTextColor(...colors.dark);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Document Information', margin + 8, currentY + 12);

    const metaY = currentY + 20;
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...colors.secondary);
    
    pdf.text(`Filename:`, margin + 8, metaY);
    pdf.setTextColor(...colors.dark);
    pdf.text(result.filename || 'Unknown', margin + 30, metaY);
    
    pdf.setTextColor(...colors.secondary);
    pdf.text(`Words:`, margin + 80, metaY);
    pdf.setTextColor(...colors.dark);
    pdf.text(`${result.word_count?.toLocaleString() || 'N/A'}`, margin + 95, metaY);
    
    pdf.setTextColor(...colors.secondary);
    pdf.text(`Pages:`, margin + 120, metaY);
    pdf.setTextColor(...colors.dark);
    pdf.text(`${result.page_count || 'N/A'}`, margin + 135, metaY);

    currentY += 35;

    // ========== EXECUTIVE SUMMARY ==========
    checkPageBreak(40);
    
    pdf.setFontSize(14);
    pdf.setTextColor(...colors.dark);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Executive Summary', margin, currentY);

    currentY += 8;
    
    // Summary box
    const summaryText = result.overall_feedback || 'No summary available.';
    pdf.setFillColor(240, 253, 244);
    pdf.setDrawColor(187, 247, 208);
    pdf.roundedRect(margin, currentY, contentWidth, 25, 3, 3, 'FD');
    
    pdf.setFontSize(9);
    pdf.setTextColor(...colors.dark);
    pdf.setFont('helvetica', 'normal');
    const summaryLines = pdf.splitTextToSize(summaryText, contentWidth - 16);
    pdf.text(summaryLines, margin + 8, currentY + 8);

    currentY += 35;

    // ========== QUALITY SCORES SECTION ==========
    checkPageBreak(50);
    
    pdf.setFontSize(14);
    pdf.setTextColor(...colors.dark);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Quality Assessment', margin, currentY);

    currentY += 12;

    // Score cards layout
    const scores = [
      { label: 'Overall', value: result.quality_score ?? 0, color: colors.primary, textColor: colors.primaryDark },
      { label: 'Grammar', value: result.grammar_score ?? 0, color: colors.success, textColor: [6, 95, 70] },
      { label: 'Style', value: result.style_score ?? 0, color: colors.warning, textColor: [146, 64, 14] },
      { label: 'Citations', value: result.citation_score ?? 0, color: colors.purple, textColor: [91, 33, 182] },
      { label: 'Requirements', value: result.requirement_match_score ?? 0, color: colors.danger, textColor: [153, 27, 27] }
    ];

    const cardWidth = 32;
    const cardHeight = 28;
    const gap = (contentWidth - (scores.length * cardWidth)) / (scores.length - 1);

    scores.forEach((score, idx) => {
      const x = margin + idx * (cardWidth + gap);
      
      // Card shadow effect
      pdf.setFillColor(226, 232, 240);
      pdf.roundedRect(x + 1, currentY + 1, cardWidth, cardHeight, 3, 3, 'F');
      
      // Card background
      pdf.setFillColor(255, 255, 255);
      pdf.setDrawColor(226, 232, 240);
      pdf.roundedRect(x, currentY, cardWidth, cardHeight, 3, 3, 'FD');
      
      // Top accent bar
      pdf.setFillColor(...score.color);
      pdf.rect(x, currentY, cardWidth, 3, 'F');
      
      // Score value
      pdf.setFontSize(18);
      pdf.setTextColor(...score.textColor);
      pdf.setFont('helvetica', 'bold');
      pdf.text(score.value.toString(), x + cardWidth/2, currentY + 17, { align: 'center' });
      
      // Label
      pdf.setFontSize(6);
      pdf.setTextColor(...colors.secondary);
      pdf.setFont('helvetica', 'normal');
      pdf.text(score.label.toUpperCase(), x + cardWidth/2, currentY + 24, { align: 'center' });
    });

    currentY += cardHeight + 15;

    // ========== SIMILARITY ANALYSIS ==========
    checkPageBreak(45);
    
    pdf.setFontSize(14);
    pdf.setTextColor(...colors.dark);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Similarity Analysis', margin, currentY);

    currentY += 10;

    // Similarity main metric
    const sim = result.similarity_percent || 0;
    const simColor = sim > 20 ? colors.danger : colors.success;
    
    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(226, 232, 240);
    pdf.roundedRect(margin, currentY, 55, 30, 4, 4, 'FD');
    
    pdf.setFontSize(8);
    pdf.setTextColor(...colors.secondary);
    pdf.setFont('helvetica', 'normal');
    pdf.text('OVERALL SIMILARITY', margin + 8, currentY + 8);
    
    pdf.setFontSize(24);
    pdf.setTextColor(...simColor);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${sim}%`, margin + 8, currentY + 24);

    // Breakdown bars
    const breakdownX = margin + 65;
    const breakdownWidth = contentWidth - 65;
    
    const matchData = [
      { label: 'Internet Sources', value: result.match_groups?.internet_sources || sim, color: colors.danger },
      { label: 'Publications', value: result.match_groups?.publications || 0, color: colors.warning },
      { label: 'Student Papers', value: result.match_groups?.student_papers || 0, color: [59, 130, 246] }
    ];

    matchData.forEach((item, idx) => {
      const y = currentY + (idx * 10);
      
      pdf.setFontSize(9);
      pdf.setTextColor(...colors.dark);
      pdf.setFont('helvetica', 'normal');
      pdf.text(item.label, breakdownX, y + 5);
      
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${item.value}%`, breakdownX + breakdownWidth - 5, y + 5, { align: 'right' });
      
      // Background bar
      pdf.setFillColor(241, 245, 249);
      pdf.roundedRect(breakdownX, y + 8, breakdownWidth, 4, 2, 2, 'F');
      
      // Fill bar
      const fillWidth = (Math.min(item.value, 100) / 100) * breakdownWidth;
      pdf.setFillColor(...item.color);
      pdf.roundedRect(breakdownX, y + 8, fillWidth, 4, 2, 2, 'F');
    });

    currentY += 40;

    // ========== ISSUES SECTION ==========
    if (result.quality_issues && result.quality_issues.length > 0) {
      checkPageBreak(30);
      
      pdf.setFontSize(14);
      pdf.setTextColor(...colors.dark);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Issues Identified (${result.quality_issues.length})`, margin, currentY);
      
      currentY += 10;

      result.quality_issues.forEach((issue, idx) => {
        const severity = (issue.severity || 'low').toLowerCase();
        const severityConfig = {
          high: { color: colors.danger, bg: [254, 242, 242] },
          medium: { color: colors.warning, bg: [255, 251, 235] },
          low: { color: [59, 130, 246], bg: [239, 246, 255] }
        };
        const config = severityConfig[severity] || severityConfig.low;
        
        const issueHeight = issue.suggestion ? 32 : 22;
        
        if (checkPageBreak(issueHeight + 5)) {
          currentY += 5;
        }
        
        // Issue card background
        pdf.setFillColor(...config.bg);
        pdf.setDrawColor(...config.color);
        pdf.roundedRect(margin, currentY, contentWidth, issueHeight, 3, 3, 'FD');
        
        // Left accent
        pdf.setFillColor(...config.color);
        pdf.rect(margin, currentY, 3, issueHeight, 'F');
        
        // Type badge
        const typeText = (issue.type || 'Issue').toUpperCase();
        pdf.setFillColor(255, 255, 255);
        pdf.setDrawColor(...config.color);
        pdf.roundedRect(margin + 8, currentY + 4, 22, 7, 2, 2, 'FD');
        
        pdf.setFontSize(6);
        pdf.setTextColor(...config.color);
        pdf.setFont('helvetica', 'bold');
        pdf.text(typeText.substring(0, 8), margin + 19, currentY + 8.5, { align: 'center' });
        
        // Severity badge
        pdf.roundedRect(pageWidth - margin - 20, currentY + 4, 16, 7, 2, 2, 'FD');
        pdf.text(severity.substring(0, 3).toUpperCase(), pageWidth - margin - 12, currentY + 8.5, { align: 'center' });
        
        // Message
        pdf.setFontSize(9);
        pdf.setTextColor(...colors.dark);
        pdf.setFont('helvetica', 'normal');
        const msgLines = pdf.splitTextToSize(issue.message || '', contentWidth - 20);
        pdf.text(msgLines, margin + 8, currentY + 16);
        
        // Suggestion
        if (issue.suggestion) {
          pdf.setFillColor(255, 255, 255);
          pdf.roundedRect(margin + 8, currentY + 22, contentWidth - 16, 8, 2, 2, 'F');
          pdf.setFontSize(7);
          pdf.setTextColor(...colors.secondary);
          pdf.setFont('helvetica', 'italic');
          const sugText = `Suggestion: ${issue.suggestion}`;
          pdf.text(sugText.substring(0, 120), margin + 12, currentY + 27);
        }
        
        currentY += issueHeight + 5;
      });
    }

    // ========== TOP SOURCES TABLE ==========
    if (result.top_sources && result.top_sources.length > 0) {
      checkPageBreak(40);
      
      pdf.setFontSize(14);
      pdf.setTextColor(...colors.dark);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Matching Sources', margin, currentY);
      
      currentY += 8;
      
      // Table header
      pdf.setFillColor(...colors.primary);
      pdf.rect(margin, currentY, contentWidth, 10, 'F');
      
      pdf.setFontSize(9);
      pdf.setTextColor(255, 255, 255);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Source Title', margin + 5, currentY + 6.5);
      pdf.text('Match %', pageWidth - margin - 5, currentY + 6.5, { align: 'right' });
      
      currentY += 10;
      
      // Table rows
      result.top_sources.slice(0, 5).forEach((source, idx) => {
        if (checkPageBreak(10)) {
          currentY += 5;
        }
        
        const isEven = idx % 2 === 0;
        pdf.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
        pdf.rect(margin, currentY, contentWidth, 10, 'F');
        
        pdf.setFontSize(8);
        pdf.setTextColor(...colors.dark);
        pdf.setFont('helvetica', 'normal');
        const title = (source.title || 'Unknown').substring(0, 55);
        pdf.text(title, margin + 5, currentY + 6.5);
        
        pdf.setTextColor(...colors.danger);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${source.similarity}%`, pageWidth - margin - 5, currentY + 6.5, { align: 'right' });
        
        currentY += 10;
      });
    }

    addFooter();
    
    // Save with sanitized filename
    const safeName = (result.filename || 'document')
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-z0-9]/gi, '_')
      .substring(0, 30);
    
    pdf.save(`EduCrew_Plagiarism_Report_${safeName}.pdf`);
    
  } catch (err) {
    console.error('PDF Export Error:', err);
    alert(`Export failed: ${err.message}`);
  } finally {
    setExporting(false);
  }
};

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-red-400 bg-red-50/50 text-red-900';
      case 'medium': return 'border-amber-400 bg-amber-50/50 text-amber-900';
      case 'low': return 'border-blue-400 bg-blue-50/50 text-blue-900';
      default: return 'border-gray-200 bg-gray-50 text-gray-900';
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getIssueTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'grammar': return <AlignLeft size={14} className="mr-1" />;
      case 'citation': return <Quote size={14} className="mr-1" />;
      case 'style': return <Type size={14} className="mr-1" />;
      case 'structure': return <LayoutTemplate size={14} className="mr-1" />;
      default: return <AlertCircle size={14} className="mr-1" />;
    }
  };

  return (
    // ... rest of your JSX (unchanged)
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Hero Section */}
      <div className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 opacity-90" />
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-600 blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-violet-600 blur-3xl opacity-20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6">
              <Sparkles size={14} className="mr-2" />
              AI-Powered Academic Assistant
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
              Plagiarism <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Checker</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              Ensure academic excellence with comprehensive analysis. 
              Check grammar, verify citations, detect plagiarism with real web sources.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        
        {/* Upload Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
        >
          <div className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="relative group">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Upload Document <span className="text-red-500">*</span>
                </label>
                <div className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 ${file ? 'border-indigo-500 bg-indigo-50/30' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}`}>
                  <input
                    type="file"
                    accept=".txt,.pdf,.doc,.docx"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="doc-upload"
                  />
                  <label htmlFor="doc-upload" className="cursor-pointer block">
                    <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Upload size={28} />
                    </div>
                    {file ? (
                      <div>
                        <p className="text-lg font-semibold text-indigo-900 mb-1">{file.name}</p>
                        <p className="text-sm text-indigo-800">Click to change file</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-slate-600 font-medium mb-1">Click to upload or drag and drop</p>
                        <p className="text-xs text-slate-400">PDF, TXT, DOC, DOCX (Max 10MB)</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div>
                  <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-slate-200"></div>
                    <span className="px-4 text-sm text-slate-500">or</span>
                    <div className="flex-1 h-px bg-slate-200"></div>
                  </div>

                  <textarea
                    placeholder="Paste your text..."
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all min-h-[100px] resize-y text-slate-700 placeholder:text-slate-400"
                  />
                </div>


              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start"
                  >
                    <AlertCircle className="text-red-500 mr-3 flex-shrink-0" size={20} />
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center"
              >
                {loading ? (
                  <span className="flex items-center">
                    <Loader2 className="animate-spin mr-3 h-5 w-5" />
                    {scanSteps[scanStep]}
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Search className="mr-2" size={20} />
                    Analyze Document
                  </span>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-12 space-y-8"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Analysis Results</h2>
                  <p className="text-slate-500 text-sm mt-1">{result.filename}</p>
                </div>
                <button 
                  onClick={handleExportReport}
                  disabled={exporting}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {exporting ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <Download size={16} className="mr-2" />
                      Export PDF Report
                    </>
                  )}
                </button>
              </div>

              <div ref={reportRef} className="space-y-8">
                
                 {/* Scores - Show all from backend */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <ScoreCard label="Overall" value={result.quality_score ?? 0} delay={0.1} color="indigo" />
                    <ScoreCard label="Grammar" value={result.grammar_score ?? 0} delay={0.2} color="emerald" />
                    <ScoreCard label="Style" value={result.style_score ?? 0} delay={0.3} color="amber" />
                    <ScoreCard label="Citations" value={result.citation_score ?? 0} delay={0.4} color="violet" />
                    <ScoreCard label="Requirements" value={result.requirement_match_score ?? 0} delay={0.5} color="rose" />
                  </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left: Feedback & Issues */}
                  <div className="lg:col-span-2 space-y-8">
                    
                    {/* Summary */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
                    >
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg mr-3">
                          <CheckCircle2 size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Executive Summary</h3>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {result.overall_feedback}
                      </p>
                    </motion.div>

                    {/* Issues */}
                    {result.quality_issues && result.quality_issues.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
                      >
                        <div className="flex items-center mb-6">
                          <div className="p-2 bg-amber-100 text-amber-600 rounded-lg mr-3">
                            <AlertTriangle size={20} />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900">Issues Detected ({result.quality_issues.length})</h3>
                        </div>
                        
                        <div className="space-y-4">
                          {result.quality_issues.map((issue, idx) => (
                            <div 
                              key={idx} 
                              className={`rounded-xl border-l-4 p-5 ${getSeverityColor(issue.severity)}`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-sm uppercase tracking-wide opacity-70 flex items-center">
                                  {getIssueTypeIcon(issue.type)}
                                  {issue.type || 'Issue'}
                                </span>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase border ${getSeverityBadge(issue.severity)}`}>
                                  {issue.severity}
                                </span>
                              </div>
                              <p className="font-medium mb-3 text-sm">{issue.message}</p>
                              {issue.suggestion && (
                                <div className="bg-white/60 rounded-lg p-3 text-sm border border-black/5">
                                  <span className="font-semibold">Suggestion:</span> {issue.suggestion}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Right: Similarity & Stats */}
                  <div className="space-y-8">
                    
                    {/* Similarity */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
                    >
                      <div className="flex items-center mb-6">
                        <div className="p-2 bg-rose-100 text-rose-600 rounded-lg mr-3">
                          <ShieldCheck size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Similarity Report</h3>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        <MatchBar 
                          label="Internet Sources" 
                          percentage={result.match_groups?.internet_sources || result.similarity_percent || 0}
                          color="bg-rose-500"
                        />
                        <MatchBar 
                          label="Publications" 
                          percentage={result.match_groups?.publications || 0}
                          color="bg-amber-500"
                        />
                        <MatchBar 
                          label="Student Papers" 
                          percentage={result.match_groups?.student_papers || 0}
                          color="bg-blue-500"
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <span className="font-semibold text-slate-700">Overall Similarity</span>
                        <span className={`text-2xl font-bold ${(result.similarity_percent || 0) > 20 ? 'text-rose-600' : 'text-emerald-600'}`}>
                          {result.similarity_percent || 0}%
                        </span>
                      </div>
                    </motion.div>

                    {/* Top Sources */}
                    {result.top_sources && result.top_sources.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                      >
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Top Matching Sources</h3>
                        <div className="space-y-3">
                          {result.top_sources.slice(0, 5).map((source, idx) => (
                            <div key={idx} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-slate-900 truncate" title={source.title}>
                                    {source.title}
                                  </p>
                                  <p className="text-xs text-slate-500 mt-0.5">{source.source_type}</p>
                                </div>
                                <span className="text-sm font-bold text-rose-600 ml-2">{source.similarity}%</span>
                              </div>
                              {source.url && (
                                <a 
                                  href={source.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-xs text-indigo-600 hover:text-indigo-700 mt-1"
                                >
                                  View Source <ExternalLink size={10} className="ml-1" />
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Stats */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="grid grid-cols-1 gap-4"
                    >
                      <StatCard label="Word Count" value={result.word_count?.toLocaleString()} icon={FileText} delay={0.8} />
                      <StatCard label="Pages" value={result.page_count} icon={FileCheck} delay={0.9} />
                    </motion.div>

                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default QualityReviewer;