// // // // import React, { useState } from 'react';
// // // // import { Link, useNavigate } from 'react-router-dom';
// // // // import { authAPI } from '../services/api';
// // // // import { Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';

// // // // const Signup = () => {
// // // //   const navigate = useNavigate();
// // // //   const [formData, setFormData] = useState({
// // // //     username: '',
// // // //     email: '',
// // // //     password: '',
// // // //     password2: '',
// // // //   });
// // // //   const [error, setError] = useState('');
// // // //   const [success, setSuccess] = useState(false);
// // // //   const [loading, setLoading] = useState(false);

// // // //   const handleChange = (e) => {
// // // //     setFormData({
// // // //       ...formData,
// // // //       [e.target.name]: e.target.value,
// // // //     });
// // // //     setError('');
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     setLoading(true);
// // // //     setError('');

// // // //     // Validate passwords match
// // // //     if (formData.password !== formData.password2) {
// // // //       setError('Passwords do not match');
// // // //       setLoading(false);
// // // //       return;
// // // //     }

// // // //     // Validate password length
// // // //     if (formData.password.length < 8) {
// // // //       setError('Password must be at least 8 characters long');
// // // //       setLoading(false);
// // // //       return;
// // // //     }

// // // //     try {
// // // //       await authAPI.register({
// // // //         username: formData.username,
// // // //         email: formData.email,
// // // //         password: formData.password,
// // // //         password2: formData.password2,
// // // //       });

// // // //       setSuccess(true);
// // // //       setTimeout(() => {
// // // //         navigate('/login');
// // // //       }, 2000);
// // // //     } catch (err) {
// // // //       const errorMsg = err.response?.data?.username?.[0] 
// // // //         || err.response?.data?.email?.[0]
// // // //         || err.response?.data?.password?.[0]
// // // //         || 'Registration failed. Please try again.';
// // // //       setError(errorMsg);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen flex items-center justify-center px-4 py-8">
// // // //       <div className="max-w-md w-full">
// // // //         {/* Logo and Title */}
// // // //         <div className="text-center mb-8">
// // // //           <h1 className="text-4xl font-bold text-white mb-2">
// // // //             🎓 EduCrew
// // // //           </h1>
// // // //           <p className="text-white/80">Create your account</p>
// // // //         </div>

// // // //         {/* Signup Card */}
// // // //         <div className="bg-white rounded-2xl shadow-2xl p-8">
// // // //           {/* Success Message */}
// // // //           {success && (
// // // //             <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
// // // //               <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
// // // //               <p className="text-green-700 text-sm">Account created successfully! Redirecting to login...</p>
// // // //             </div>
// // // //           )}

// // // //           {/* Error Message */}
// // // //           {error && (
// // // //             <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
// // // //               <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
// // // //               <p className="text-red-700 text-sm">{error}</p>
// // // //             </div>
// // // //           )}

// // // //           {/* Signup Form */}
// // // //           <form onSubmit={handleSubmit}>
// // // //             {/* Username Field */}
// // // //             <div className="mb-4">
// // // //               <label className="block text-gray-700 font-medium mb-2">
// // // //                 Username
// // // //               </label>
// // // //               <div className="relative">
// // // //                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // // //                 <input
// // // //                   type="text"
// // // //                   name="username"
// // // //                   value={formData.username}
// // // //                   onChange={handleChange}
// // // //                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// // // //                   placeholder="Choose a username"
// // // //                   required
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //             {/* Email Field */}
// // // //             <div className="mb-4">
// // // //               <label className="block text-gray-700 font-medium mb-2">
// // // //                 Email
// // // //               </label>
// // // //               <div className="relative">
// // // //                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // // //                 <input
// // // //                   type="email"
// // // //                   name="email"
// // // //                   value={formData.email}
// // // //                   onChange={handleChange}
// // // //                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// // // //                   placeholder="Enter your email"
// // // //                   required
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //             {/* Password Field */}
// // // //             <div className="mb-4">
// // // //               <label className="block text-gray-700 font-medium mb-2">
// // // //                 Password
// // // //               </label>
// // // //               <div className="relative">
// // // //                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // // //                 <input
// // // //                   type="password"
// // // //                   name="password"
// // // //                   value={formData.password}
// // // //                   onChange={handleChange}
// // // //                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// // // //                   placeholder="Create a password (min 8 characters)"
// // // //                   required
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //             {/* Confirm Password Field */}
// // // //             <div className="mb-6">
// // // //               <label className="block text-gray-700 font-medium mb-2">
// // // //                 Confirm Password
// // // //               </label>
// // // //               <div className="relative">
// // // //                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // // //                 <input
// // // //                   type="password"
// // // //                   name="password2"
// // // //                   value={formData.password2}
// // // //                   onChange={handleChange}
// // // //                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// // // //                   placeholder="Confirm your password"
// // // //                   required
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //             {/* Submit Button */}
// // // //             <button
// // // //               type="submit"
// // // //               disabled={loading || success}
// // // //               className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-50"
// // // //             >
// // // //               {loading ? (
// // // //                 <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// // // //               ) : (
// // // //                 'Create Account'
// // // //               )}
// // // //             </button>
// // // //           </form>

// // // //           {/* Login Link */}
// // // //           <div className="mt-6 text-center">
// // // //             <p className="text-gray-600">
// // // //               Already have an account?{' '}
// // // //               <Link to="/login" className="text-primary-500 font-semibold hover:text-primary-600">
// // // //                 Sign In
// // // //               </Link>
// // // //             </p>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Signup;




// // import React, { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { authAPI } from '../services/api';
// // import { 
// //   Mail, 
// //   Lock, 
// //   User, 
// //   AlertCircle, 
// //   CheckCircle, 
// //   Eye, 
// //   EyeOff,
// //   ArrowRight,
// //   GraduationCap,
// //   Shield,
// //   FileText
// // } from 'lucide-react';

// // const Signup = () => {
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState({
// //     username: '',
// //     email: '',
// //     password: '',
// //     password2: '',
// //   });
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [error, setError] = useState('');
// //   const [success, setSuccess] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [agreements, setAgreements] = useState({
// //     terms: false,
// //     privacy: false,
// //   });
// //   const [touched, setTouched] = useState({});

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //     if (error) setError('');
// //   };

// //   const handleBlur = (e) => {
// //     setTouched(prev => ({
// //       ...prev,
// //       [e.target.name]: true,
// //     }));
// //   };

// //   const handleAgreementChange = (e) => {
// //     const { name, checked } = e.target;
// //     setAgreements(prev => ({
// //       ...prev,
// //       [name]: checked,
// //     }));
// //     if (error) setError('');
// //   };

// //   const validateForm = () => {
// //     if (formData.password !== formData.password2) {
// //       setError('Passwords do not match');
// //       return false;
// //     }
// //     if (formData.password.length < 8) {
// //       setError('Password must be at least 8 characters long');
// //       return false;
// //     }
// //     if (!agreements.terms || !agreements.privacy) {
// //       setError('Please accept both Terms of Service and Privacy Policy');
// //       return false;
// //     }
// //     return true;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!validateForm()) return;

// //     setLoading(true);
// //     setError('');

// //     try {
// //       await authAPI.register({
// //         username: formData.username,
// //         email: formData.email,
// //         password: formData.password,
// //         password2: formData.password2,
// //       });

// //       setSuccess(true);
// //       setTimeout(() => {
// //         navigate('/login');
// //       }, 2000);
// //     } catch (err) {
// //       const errorMsg = err.response?.data?.username?.[0] 
// //         || err.response?.data?.email?.[0]
// //         || err.response?.data?.password?.[0]
// //         || err.response?.data?.non_field_errors?.[0]
// //         || 'Registration failed. Please try again.';
// //       setError(errorMsg);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getPasswordStrength = (password) => {
// //     if (!password) return 0;
// //     let strength = 0;
// //     if (password.length >= 8) strength += 1;
// //     if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
// //     if (password.match(/[0-9]/)) strength += 1;
// //     if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
// //     return strength;
// //   };

// //   const passwordStrength = getPasswordStrength(formData.password);
// //   const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
// //   const strengthColors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

// //   return (
// //     <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
// //       {/* Background Pattern */}
// //       <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
// //         <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-full blur-3xl" />
// //         <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-100/50 to-pink-100/50 rounded-full blur-3xl" />
// //       </div>

// //       <div className="relative z-10 w-full max-w-lg">
// //         {/* Logo Section */}
// //         <div className="text-center mb-10">
// //           <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4 ring-1 ring-slate-900/5">
// //             <GraduationCap className="w-8 h-8 text-indigo-600" />
// //           </div>
// //           <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
// //             Create your account
// //           </h1>
// //           <p className="mt-2 text-slate-600 text-base">
// //             Join EduCrew and start your learning journey
// //           </p>
// //         </div>

// //         {/* Main Card */}
// //         <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-900/5 overflow-hidden">
// //           {/* Progress Indicator */}
// //           <div className="bg-slate-50/50 px-8 py-4 border-b border-slate-100">
// //             <div className="flex items-center justify-between text-sm">
// //               <span className="font-medium text-slate-900">Step 1 of 1</span>
// //               <span className="text-slate-500">Account Setup</span>
// //             </div>
// //             <div className="mt-2 h-1 bg-slate-200 rounded-full overflow-hidden">
// //               <div className="h-full w-full bg-indigo-600 rounded-full" />
// //             </div>
// //           </div>

// //           <div className="p-8">
// //             {/* Alert Messages */}
// //             {success && (
// //               <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start animate-in fade-in slide-in-from-top-2">
// //                 <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
// //                 <div>
// //                   <p className="text-green-800 font-medium">Account created successfully!</p>
// //                   <p className="text-green-600 text-sm mt-1">Redirecting to login...</p>
// //                 </div>
// //               </div>
// //             )}

// //             {error && (
// //               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start animate-in fade-in slide-in-from-top-2">
// //                 <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
// //                 <p className="text-red-800 text-sm font-medium">{error}</p>
// //               </div>
// //             )}

// //             <form onSubmit={handleSubmit} className="space-y-5">
// //               {/* Username Field */}
// //               <div>
// //                 <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-2">
// //                   Username
// //                 </label>
// //                 <div className="relative group">
// //                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// //                     <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
// //                   </div>
// //                   <input
// //                     id="username"
// //                     type="text"
// //                     name="username"
// //                     value={formData.username}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     disabled={success || loading}
// //                     className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     placeholder="johndoe"
// //                     required
// //                     minLength={3}
// //                   />
// //                 </div>
// //               </div>

// //               {/* Email Field */}
// //               <div>
// //                 <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
// //                   Email Address
// //                 </label>
// //                 <div className="relative group">
// //                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// //                     <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
// //                   </div>
// //                   <input
// //                     id="email"
// //                     type="email"
// //                     name="email"
// //                     value={formData.email}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     disabled={success || loading}
// //                     className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     placeholder="john@example.com"
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               {/* Password Field */}
// //               <div>
// //                 <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
// //                   Password
// //                 </label>
// //                 <div className="relative group">
// //                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// //                     <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
// //                   </div>
// //                   <input
// //                     id="password"
// //                     type={showPassword ? 'text' : 'password'}
// //                     name="password"
// //                     value={formData.password}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     disabled={success || loading}
// //                     className="block w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     placeholder="••••••••"
// //                     required
// //                     minLength={8}
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowPassword(!showPassword)}
// //                     className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
// //                     tabIndex={-1}
// //                   >
// //                     {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
// //                   </button>
// //                 </div>
                
// //                 {/* Password Strength Indicator */}
// //                 {formData.password && (
// //                   <div className="mt-2 space-y-1">
// //                     <div className="flex gap-1 h-1">
// //                       {[1, 2, 3, 4].map((level) => (
// //                         <div
// //                           key={level}
// //                           className={`flex-1 rounded-full transition-all duration-300 ${
// //                             passwordStrength >= level ? strengthColors[passwordStrength - 1] : 'bg-slate-200'
// //                           }`}
// //                         />
// //                       ))}
// //                     </div>
// //                     <p className={`text-xs font-medium ${
// //                       passwordStrength === 0 ? 'text-slate-500' :
// //                       passwordStrength === 1 ? 'text-red-600' :
// //                       passwordStrength === 2 ? 'text-yellow-600' :
// //                       passwordStrength === 3 ? 'text-blue-600' : 'text-green-600'
// //                     }`}>
// //                       {strengthLabels[passwordStrength - 1] || 'Enter password'}
// //                     </p>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Confirm Password Field */}
// //               <div>
// //                 <label htmlFor="password2" className="block text-sm font-semibold text-slate-700 mb-2">
// //                   Confirm Password
// //                 </label>
// //                 <div className="relative group">
// //                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// //                     <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
// //                   </div>
// //                   <input
// //                     id="password2"
// //                     type={showConfirmPassword ? 'text' : 'password'}
// //                     name="password2"
// //                     value={formData.password2}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     disabled={success || loading}
// //                     className={`block w-full pl-11 pr-12 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
// //                       formData.password2 && formData.password !== formData.password2
// //                         ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
// //                         : formData.password2 && formData.password === formData.password2
// //                         ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20'
// //                         : 'border-slate-200'
// //                     }`}
// //                     placeholder="••••••••"
// //                     required
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                     className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
// //                     tabIndex={-1}
// //                   >
// //                     {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
// //                   </button>
// //                 </div>
// //                 {formData.password2 && formData.password !== formData.password2 && (
// //                   <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
// //                 )}
// //               </div>

// //               {/* Agreements */}
// //               <div className="space-y-3 pt-2">
// //                 <label className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
// //                   agreements.terms 
// //                     ? 'bg-indigo-50 border-indigo-200' 
// //                     : 'bg-slate-50 border-slate-200 hover:border-slate-300'
// //                 }`}>
// //                   <input
// //                     type="checkbox"
// //                     name="terms"
// //                     checked={agreements.terms}
// //                     onChange={handleAgreementChange}
// //                     disabled={success || loading}
// //                     className="mt-1 w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 focus:ring-2 disabled:opacity-50"
// //                   />
// //                   <div className="flex-1">
// //                     <div className="flex items-center gap-2">
// //                       <FileText className="w-4 h-4 text-slate-500" />
// //                       <span className="text-sm font-medium text-slate-700">
// //                         Terms of Service
// //                       </span>
// //                     </div>
// //                     <p className="text-xs text-slate-500 mt-1">
// //                       I agree to the{' '}
// //                       <Link to="/terms" className="text-indigo-600 hover:text-indigo-700 font-medium underline-offset-2 hover:underline" target="_blank">
// //                         Terms of Service
// //                       </Link>
// //                     </p>
// //                   </div>
// //                 </label>

// //                 <label className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
// //                   agreements.privacy 
// //                     ? 'bg-indigo-50 border-indigo-200' 
// //                     : 'bg-slate-50 border-slate-200 hover:border-slate-300'
// //                 }`}>
// //                   <input
// //                     type="checkbox"
// //                     name="privacy"
// //                     checked={agreements.privacy}
// //                     onChange={handleAgreementChange}
// //                     disabled={success || loading}
// //                     className="mt-1 w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 focus:ring-2 disabled:opacity-50"
// //                   />
// //                   <div className="flex-1">
// //                     <div className="flex items-center gap-2">
// //                       <Shield className="w-4 h-4 text-slate-500" />
// //                       <span className="text-sm font-medium text-slate-700">
// //                         Privacy Policy
// //                       </span>
// //                     </div>
// //                     <p className="text-xs text-slate-500 mt-1">
// //                       I agree to the{' '}
// //                       <Link to="/privacy" className="text-indigo-600 hover:text-indigo-700 font-medium underline-offset-2 hover:underline" target="_blank">
// //                         Privacy Policy
// //                       </Link>
// //                     </p>
// //                   </div>
// //                 </label>
// //               </div>

// //               {/* Submit Button */}
// //               <button
// //                 type="submit"
// //                 disabled={loading || success || !agreements.terms || !agreements.privacy}
// //                 className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3.5 px-4 rounded-xl font-semibold text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 mt-6"
// //               >
// //                 {loading ? (
// //                   <>
// //                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// //                     <span>Creating account...</span>
// //                   </>
// //                 ) : (
// //                   <>
// //                     <span>Create Account</span>
// //                     <ArrowRight className="w-4 h-4" />
// //                   </>
// //                 )}
// //               </button>
// //             </form>

// //             {/* Footer */}
// //             <div className="mt-8 text-center">
// //               <p className="text-sm text-slate-600">
// //                 Already have an account?{' '}
// //                 <Link 
// //                   to="/login" 
// //                   className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors underline-offset-2 hover:underline"
// //                 >
// //                   Sign in
// //                 </Link>
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Security Note */}
// //         <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
// //           <Shield className="w-4 h-4" />
// //           <span>Secured with 256-bit encryption</span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Signup;



// import React, { useState, useCallback, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { authAPI } from '../services/api';
// import { 
//   Mail, 
//   Lock, 
//   User, 
//   AlertCircle, 
//   CheckCircle, 
//   Eye, 
//   EyeOff,
//   ArrowRight,
//   GraduationCap,
//   Shield,
//   XCircle,
//   Info
// } from 'lucide-react';

// // Validation constants
// const VALIDATION_RULES = {
//   username: {
//     minLength: 3,
//     maxLength: 30,
//     pattern: /^[a-zA-Z0-9_-]+$/,
//     patternMessage: 'Only letters, numbers, underscores, and hyphens allowed'
//   },
//   email: {
//     maxLength: 254,
//     pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//     patternMessage: 'Please enter a valid email address'
//   },
//   password: {
//     minLength: 8,
//     maxLength: 128,
//     requireUppercase: true,
//     requireLowercase: true,
//     requireNumber: true,
//     requireSpecial: true
//   }
// };

// const Signup = () => {
//   const navigate = useNavigate();
  
//   // Form state
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     password2: '',
//   });
  
//   // UI state
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
  
//   // Validation state
//   const [touched, setTouched] = useState({});
//   const [fieldErrors, setFieldErrors] = useState({});
//   const [globalError, setGlobalError] = useState('');
//   const [agreed, setAgreed] = useState(false);

//   // Check if form is valid
//   const isFormValid = useCallback(() => {
//     const hasErrors = Object.values(fieldErrors).some(error => error !== '');
//     const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
//     return !hasErrors && allFieldsFilled && agreed && !loading && !success;
//   }, [fieldErrors, formData, agreed, loading, success]);

//   // Validate single field
//   const validateField = useCallback((name, value) => {
//     const rules = VALIDATION_RULES[name];
//     if (!rules) return '';

//     // Trim value for validation (except password)
//     const trimmedValue = name === 'password' || name === 'password2' ? value : value.trim();

//     // Required check
//     if (!trimmedValue) return '';

//     // Length checks
//     if (rules.minLength && trimmedValue.length < rules.minLength) {
//       return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${rules.minLength} characters`;
//     }
//     if (rules.maxLength && trimmedValue.length > rules.maxLength) {
//       return `${name.charAt(0).toUpperCase() + name.slice(1)} must be less than ${rules.maxLength} characters`;
//     }

//     // Pattern check
//     if (rules.pattern && !rules.pattern.test(trimmedValue)) {
//       return rules.patternMessage;
//     }

//     // Password specific validations
//     if (name === 'password') {
//       if (rules.requireUppercase && !/[A-Z]/.test(trimmedValue)) {
//         return 'Password must contain at least one uppercase letter';
//       }
//       if (rules.requireLowercase && !/[a-z]/.test(trimmedValue)) {
//         return 'Password must contain at least one lowercase letter';
//       }
//       if (rules.requireNumber && !/\d/.test(trimmedValue)) {
//         return 'Password must contain at least one number';
//       }
//       if (rules.requireSpecial && !/[@$!%*?&]/.test(trimmedValue)) {
//         return 'Password must contain at least one special character (@$!%*?&)';
//       }
//     }

//     // Confirm password match
//     if (name === 'password2' && trimmedValue !== formData.password) {
//       return 'Passwords do not match';
//     }

//     return '';
//   }, [formData.password]);

//   // Handle input changes - FIXED: removed auto-validation on change, only on blur
// const handleChange = (e) => {
//   const { name, value } = e.target;
  
//   // Prevent spaces in username
//   let sanitizedValue = value;
//   if (name === 'username') {
//     sanitizedValue = value.replace(/\s/g, '');
//   }
  
//   setFormData(prev => ({
//     ...prev,
//     [name]: sanitizedValue
//   }));

//   // Only clear error on change, don't validate
//   if (fieldErrors[name]) {
//     setFieldErrors(prev => ({
//       ...prev,
//       [name]: ''
//     }));
//   }

//   setGlobalError('');
// };

//   // Handle field blur - validation happens here
//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched(prev => ({
//       ...prev,
//       [name]: true
//     }));
    
//     const error = validateField(name, value);
//     setFieldErrors(prev => ({
//       ...prev,
//       [name]: error
//     }));
//   };

//   // Handle agreement change
//   const handleAgreementChange = (e) => {
//     setAgreed(e.target.checked);
//     setGlobalError('');
//   };

//   // Calculate password strength
//   const getPasswordStrength = (password) => {
//     if (!password) return { score: 0, label: '', color: '' };
    
//     let score = 0;
//     const checks = {
//       length: password.length >= 8,
//       uppercase: /[A-Z]/.test(password),
//       lowercase: /[a-z]/.test(password),
//       number: /\d/.test(password),
//       special: /[@$!%*?&]/.test(password)
//     };

//     score = Object.values(checks).filter(Boolean).length;

//     const strengthMap = {
//       0: { label: 'Very Weak', color: 'bg-red-500' },
//       1: { label: 'Weak', color: 'bg-red-400' },
//       2: { label: 'Fair', color: 'bg-yellow-500' },
//       3: { label: 'Good', color: 'bg-blue-500' },
//       4: { label: 'Strong', color: 'bg-green-500' },
//       5: { label: 'Very Strong', color: 'bg-green-600' }
//     };

//     return { score, ...strengthMap[score], checks };
//   };

//   const passwordStrength = getPasswordStrength(formData.password);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Mark all fields as touched
//     const allTouched = Object.keys(formData).reduce((acc, key) => ({
//       ...acc,
//       [key]: true
//     }), {});
//     setTouched(allTouched);

//     // Validate all fields
//     const errors = {};
//     Object.keys(formData).forEach(key => {
//       errors[key] = validateField(key, formData[key]);
//       if (!formData[key].trim()) {
//         errors[key] = 'This field is required';
//       }
//     });
//     setFieldErrors(errors);

//     // Check for errors
//     const hasErrors = Object.values(errors).some(error => error !== '');
//     if (hasErrors) {
//       setGlobalError('Please fill in all required fields correctly');
//       return;
//     }

//     // Check agreement
//     if (!agreed) {
//       setGlobalError('You must agree to the Terms of Service and Privacy Policy');
//       return;
//     }

//     setLoading(true);
//     setGlobalError('');

//     try {
//       await authAPI.register({
//         username: formData.username.trim(),
//         email: formData.email.trim().toLowerCase(),
//         password: formData.password,
//         password2: formData.password2,
//       });

//       setSuccess(true);
//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);
//     } catch (err) {
//       const errorData = err.response?.data;
//       let errorMsg = 'Registration failed. Please try again.';
      
//       if (errorData) {
//         if (errorData.username) {
//           setFieldErrors(prev => ({ ...prev, username: errorData.username[0] }));
//         }
//         if (errorData.email) {
//           setFieldErrors(prev => ({ ...prev, email: errorData.email[0] }));
//         }
//         if (errorData.password) {
//           setFieldErrors(prev => ({ ...prev, password: errorData.password[0] }));
//         }
//         if (errorData.non_field_errors) {
//           errorMsg = errorData.non_field_errors[0];
//         }
//       }
      
//       setGlobalError(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Input field component
//  const InputField = ({ 
//   id, 
//   name, 
//   type = 'text', 
//   label, 
//   icon: Icon, 
//   placeholder, 
//   showPasswordToggle = false,
//   showPasswordState = false,
//   setShowPasswordState = null,
//   helperText = null
// }) => {
//   const hasError = touched[name] && fieldErrors[name];
//   // Only show success if touched AND no error AND has value
//   const hasSuccess = touched[name] && !fieldErrors[name] && formData[name];

//   return (
//     <div className="space-y-1.5">
//       <label htmlFor={id} className="block text-sm font-semibold text-slate-700">
//         {label}
//       </label>
//       <div className="relative group">
//         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//           <Icon className={`h-5 w-5 transition-colors ${
//             hasError ? 'text-red-400' : 
//             hasSuccess ? 'text-green-500' : 
//             'text-slate-400 group-focus-within:text-indigo-500'
//           }`} />
//         </div>
        
//         <input
//           id={id}
//           type={showPasswordState && showPasswordToggle ? 'text' : type}
//           name={name}
//           value={formData[name]}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           disabled={success || loading}
//           className={`block w-full pl-11 pr-${showPasswordToggle ? '12' : '4'} py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
//             hasError 
//               ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
//               : hasSuccess
//               ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20'
//               : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
//           }`}
//           placeholder={placeholder}
//           autoComplete={name === 'password' ? 'new-password' : name === 'email' ? 'email' : 'username'}
//         />
        
//         {showPasswordToggle && (
//           <button
//             type="button"
//             onClick={() => setShowPasswordState(!showPasswordState)}
//             className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
//             tabIndex={-1}
//           >
//             {showPasswordState ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//           </button>
//         )}
//       </div>
      
//       {/* Helper text */}
//       {helperText && !hasError && (
//         <p className="text-xs text-slate-500">{helperText}</p>
//       )}
      
//       {/* Error message */}
//       {hasError && (
//         <p className="text-xs text-red-600 flex items-center gap-1">
//           <XCircle className="w-3 h-3" />
//           {fieldErrors[name]}
//         </p>
//       )}
      
//       {/* Success indicator - only after blur */}
//       {hasSuccess && (
//         <p className="text-xs text-green-600 flex items-center gap-1">
//           <CheckCircle className="w-3 h-3" />
//           Looks good
//         </p>
//       )}
//     </div>
//   );
// };

//   return (
//     <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
//       {/* Background Pattern */}
//       <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-full blur-3xl" />
//         <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-100/50 to-pink-100/50 rounded-full blur-3xl" />
//       </div>

//       <div className="relative z-10 w-full max-w-lg">
//         {/* Logo Section */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4 ring-1 ring-slate-900/5">
//             <GraduationCap className="w-8 h-8 text-indigo-600" />
//           </div>
//           <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
//             Create your account
//           </h1>
//           <p className="mt-2 text-slate-600 text-base">
//             Join EduCrew and start your learning journey
//           </p>
//         </div>

//         {/* Main Card */}
//         <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-900/5 overflow-hidden">
//           {/* Progress Indicator */}
//           <div className="bg-slate-50/50 px-8 py-4 border-b border-slate-100">
//             <div className="flex items-center justify-between text-sm">
//               <span className="font-medium text-slate-900">Account Setup</span>
//               <span className="text-slate-500">Step 1 of 1</span>
//             </div>
//             <div className="mt-2 h-1 bg-slate-200 rounded-full overflow-hidden">
//               <div className="h-full w-full bg-indigo-600 rounded-full transition-all duration-500" />
//             </div>
//           </div>

//           <div className="p-8">
//             {/* Global Alert Messages */}
//             {success && (
//               <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start animate-in fade-in slide-in-from-top-2">
//                 <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
//                 <div>
//                   <p className="text-green-800 font-medium">Account created successfully!</p>
//                   <p className="text-green-600 text-sm mt-1">Redirecting to login...</p>
//                 </div>
//               </div>
//             )}

//             {globalError && (
//               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start animate-in fade-in slide-in-from-top-2">
//                 <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
//                 <p className="text-red-800 text-sm font-medium">{globalError}</p>
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-5">
//               {/* Username Field */}
//               <InputField
//                 id="username"
//                 name="username"
//                 label="Username"
//                 icon={User}
//                 placeholder="johndoe"
//                 helperText="3-30 characters, letters, numbers, underscores, hyphens only"
//               />

//               {/* Email Field */}
//               <InputField
//                 id="email"
//                 name="email"
//                 type="email"
//                 label="Email Address"
//                 icon={Mail}
//                 placeholder="john@example.com"
//               />

//               {/* Password Field */}
//               <div className="space-y-1.5">
//                 <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
//                   Password
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <Lock className={`h-5 w-5 transition-colors ${
//                       fieldErrors.password && touched.password ? 'text-red-400' : 
//                       passwordStrength.score >= 4 ? 'text-green-500' : 
//                       'text-slate-400 group-focus-within:text-indigo-500'
//                     }`} />
//                   </div>
//                   <input
//                     id="password"
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     disabled={success || loading}
//                     className={`block w-full pl-11 pr-12 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
//                       fieldErrors.password && touched.password
//                         ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
//                         : passwordStrength.score >= 4
//                         ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20'
//                         : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
//                     }`}
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
//                     tabIndex={-1}
//                   >
//                     {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                   </button>
//                 </div>

//                 {/* Password Strength Meter */}
//                 {formData.password && (
//                   <div className="mt-3 space-y-2 animate-in fade-in slide-in-from-top-2">
//                     <div className="flex gap-1 h-1.5">
//                       {[1, 2, 3, 4, 5].map((level) => (
//                         <div
//                           key={level}
//                           className={`flex-1 rounded-full transition-all duration-300 ${
//                             passwordStrength.score >= level ? passwordStrength.color : 'bg-slate-200'
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <p className={`text-xs font-medium ${
//                         passwordStrength.score <= 2 ? 'text-red-600' :
//                         passwordStrength.score <= 3 ? 'text-yellow-600' :
//                         passwordStrength.score === 4 ? 'text-blue-600' : 'text-green-600'
//                       }`}>
//                         {passwordStrength.label}
//                       </p>
//                       <span className="text-xs text-slate-500">
//                         {formData.password.length}/128
//                       </span>
//                     </div>
                    
//                     {/* Password Requirements Checklist */}
//                     <div className="grid grid-cols-2 gap-1.5 mt-2">
//                       {Object.entries(passwordStrength.checks || {}).map(([check, passed]) => (
//                         <div key={check} className={`flex items-center gap-1.5 text-xs ${
//                           passed ? 'text-green-600' : 'text-slate-400'
//                         }`}>
//                           {passed ? <CheckCircle className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-current" />}
//                           <span className="capitalize">
//                             {check === 'length' ? '8+ characters' : 
//                              check === 'special' ? 'Special char' : 
//                              check}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {touched.password && fieldErrors.password && (
//                   <p className="text-xs text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1">
//                     <XCircle className="w-3 h-3" />
//                     {fieldErrors.password}
//                   </p>
//                 )}
//               </div>

//               {/* Confirm Password Field */}
//               <InputField
//                 id="password2"
//                 name="password2"
//                 type="password"
//                 label="Confirm Password"
//                 icon={Lock}
//                 placeholder="••••••••"
//                 showPasswordToggle
//                 showPasswordState={showConfirmPassword}
//                 setShowPasswordState={setShowConfirmPassword}
//               />

//               {/* Combined Agreement Checkbox - LIKE YOUR SECOND IMAGE */}
//               <div className="pt-2">
//                 <label className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
//                   agreed 
//                     ? 'bg-indigo-50 border-indigo-200' 
//                     : 'bg-slate-50 border-slate-200 hover:border-slate-300'
//                 } ${touched.agreed && !agreed ? 'border-red-300 bg-red-50' : ''}`}>
//                   <input
//                     type="checkbox"
//                     checked={agreed}
//                     onChange={handleAgreementChange}
//                     disabled={success || loading}
//                     className="mt-0.5 w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 focus:ring-2 disabled:opacity-50 flex-shrink-0"
//                   />
//                   <span className="text-sm text-slate-700 leading-relaxed">
//                     By signing up, you agree to our{' '}
//                     <Link 
//                       to="/terms" 
//                       className="text-indigo-600 hover:text-indigo-700 font-semibold underline-offset-2 hover:underline"
//                       target="_blank"
//                     >
//                       Terms of Service
//                     </Link>
//                     {' '}and{' '}
//                     <Link 
//                       to="/privacy" 
//                       className="text-indigo-600 hover:text-indigo-700 font-semibold underline-offset-2 hover:underline"
//                       target="_blank"
//                     >
//                       Privacy Policy
//                     </Link>
//                   </span>
//                 </label>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={!isFormValid()}
//                 className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg mt-6 ${
//                   isFormValid()
//                     ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30'
//                     : 'bg-slate-200 text-slate-500 cursor-not-allowed'
//                 }`}
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                     <span>Creating account...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>Create Account</span>
//                     <ArrowRight className="w-4 h-4" />
//                   </>
//                 )}
//               </button>
//             </form>

//             {/* Footer */}
//             <div className="mt-8 text-center">
//               <p className="text-sm text-slate-600">
//                 Already have an account?{' '}
//                 <Link 
//                   to="/login" 
//                   className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors underline-offset-2 hover:underline"
//                 >
//                   Sign in
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Security Note */}
//         <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
//           <Shield className="w-4 h-4" />
//           <span>Secured with 256-bit encryption</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { 
  Mail, 
  Lock, 
  User, 
  AlertCircle, 
  CheckCircle, 
  Eye, 
  EyeOff,
  ArrowRight,
  GraduationCap,
  Shield,
  XCircle,
  Info
} from 'lucide-react';

// Validation constants
const VALIDATION_RULES = {
  username: {
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9_-]+$/,
    patternMessage: 'Only letters, numbers, underscores, and hyphens allowed'
  },
  email: {
    maxLength: 254,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    patternMessage: 'Please enter a valid email address'
  },
  password: {
    minLength: 8,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecial: true
  }
};

// --- MOVED OUTSIDE TO FIX CURSOR BUG ---
const InputField = ({ 
  id, 
  name, 
  type = 'text', 
  label, 
  icon: Icon, 
  placeholder, 
  formData, // Added to access state
  touched,  // Added to access state
  fieldErrors, // Added to access state
  handleChange, // Added to access handler
  handleBlur, // Added to access handler
  loading, // Added state
  success, // Added state
  showPasswordToggle = false,
  showPasswordState = false,
  setShowPasswordState = null,
  helperText = null
}) => {
  const hasError = touched[name] && fieldErrors[name];
  const hasSuccess = touched[name] && !fieldErrors[name] && formData[name];

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className={`h-5 w-5 transition-colors ${
            hasError ? 'text-red-400' : 
            hasSuccess ? 'text-green-500' : 
            'text-slate-400 group-focus-within:text-indigo-500'
          }`} />
        </div>
        
        <input
          id={id}
          type={showPasswordState && showPasswordToggle ? 'text' : type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={success || loading}
          className={`block w-full pl-11 pr-${showPasswordToggle ? '12' : '4'} py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
            hasError 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
              : hasSuccess
              ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20'
              : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
          }`}
          placeholder={placeholder}
          autoComplete={name === 'password' ? 'new-password' : name === 'email' ? 'email' : 'username'}
        />
        
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPasswordState(!showPasswordState)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
            tabIndex={-1}
          >
            {showPasswordState ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
      
      {helperText && !hasError && (
        <p className="text-xs text-slate-500">{helperText}</p>
      )}
      
      {hasError && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <XCircle className="w-3 h-3" />
          {fieldErrors[name]}
        </p>
      )}
      
      {hasSuccess && (
        <p className="text-xs text-green-600 flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Looks good
        </p>
      )}
    </div>
  );
};

const Signup = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Validation state
  const [touched, setTouched] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [agreed, setAgreed] = useState(false);

  // Check if form is valid
  const isFormValid = useCallback(() => {
    const hasErrors = Object.values(fieldErrors).some(error => error !== '');
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
    return !hasErrors && allFieldsFilled && agreed && !loading && !success;
  }, [fieldErrors, formData, agreed, loading, success]);

  // Validate single field
  const validateField = useCallback((name, value) => {
    const rules = VALIDATION_RULES[name];
    if (!rules) return '';

    const trimmedValue = name === 'password' || name === 'password2' ? value : value.trim();

    if (!trimmedValue) return '';

    if (rules.minLength && trimmedValue.length < rules.minLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${rules.minLength} characters`;
    }
    if (rules.maxLength && trimmedValue.length > rules.maxLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be less than ${rules.maxLength} characters`;
    }

    if (rules.pattern && !rules.pattern.test(trimmedValue)) {
      return rules.patternMessage;
    }

    if (name === 'password') {
      if (rules.requireUppercase && !/[A-Z]/.test(trimmedValue)) {
        return 'Password must contain at least one uppercase letter';
      }
      if (rules.requireLowercase && !/[a-z]/.test(trimmedValue)) {
        return 'Password must contain at least one lowercase letter';
      }
      if (rules.requireNumber && !/\d/.test(trimmedValue)) {
        return 'Password must contain at least one number';
      }
      if (rules.requireSpecial && !/[@$!%*?&]/.test(trimmedValue)) {
        return 'Password must contain at least one special character (@$!%*?&)';
      }
    }

    if (name === 'password2' && trimmedValue !== formData.password) {
      return 'Passwords do not match';
    }

    return '';
  }, [formData.password]);

const handleChange = (e) => {
  const { name, value } = e.target;
  let sanitizedValue = value;
  if (name === 'username') {
    sanitizedValue = value.replace(/\s/g, '');
  }
  
  setFormData(prev => ({
    ...prev,
    [name]: sanitizedValue
  }));

  if (fieldErrors[name]) {
    setFieldErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  }

  setGlobalError('');
};

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const error = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleAgreementChange = (e) => {
    setAgreed(e.target.checked);
    setGlobalError('');
  };

  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password)
    };

    score = Object.values(checks).filter(Boolean).length;

    const strengthMap = {
      0: { label: 'Very Weak', color: 'bg-red-500' },
      1: { label: 'Weak', color: 'bg-red-400' },
      2: { label: 'Fair', color: 'bg-yellow-500' },
      3: { label: 'Good', color: 'bg-blue-500' },
      4: { label: 'Strong', color: 'bg-green-500' },
      5: { label: 'Very Strong', color: 'bg-green-600' }
    };

    return { score, ...strengthMap[score], checks };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const allTouched = Object.keys(formData).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {});
    setTouched(allTouched);

    const errors = {};
    Object.keys(formData).forEach(key => {
      errors[key] = validateField(key, formData[key]);
      if (!formData[key].trim()) {
        errors[key] = 'This field is required';
      }
    });
    setFieldErrors(errors);

    const hasErrors = Object.values(errors).some(error => error !== '');
    if (hasErrors) {
      setGlobalError('Please fill in all required fields correctly');
      return;
    }

    if (!agreed) {
      setGlobalError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }

    setLoading(true);
    setGlobalError('');

    try {
      await authAPI.register({
        username: formData.username.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        password2: formData.password2,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const errorData = err.response?.data;
      let errorMsg = 'Registration failed. Please try again.';
      
      if (errorData) {
        if (errorData.username) {
          setFieldErrors(prev => ({ ...prev, username: errorData.username[0] }));
        }
        if (errorData.email) {
          setFieldErrors(prev => ({ ...prev, email: errorData.email[0] }));
        }
        if (errorData.password) {
          setFieldErrors(prev => ({ ...prev, password: errorData.password[0] }));
        }
        if (errorData.non_field_errors) {
          errorMsg = errorData.non_field_errors[0];
        }
      }
      
      setGlobalError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-100/50 to-pink-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4 ring-1 ring-slate-900/5">
            <GraduationCap className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Create your account
          </h1>
          <p className="mt-2 text-slate-600 text-base">
            Join EduCrew and start your learning journey
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-900/5 overflow-hidden">
          <div className="bg-slate-50/50 px-8 py-4 border-b border-slate-100">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-900">Account Setup</span>
              <span className="text-slate-500">Step 1 of 1</span>
            </div>
            <div className="mt-2 h-1 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full w-full bg-indigo-600 rounded-full transition-all duration-500" />
            </div>
          </div>

          <div className="p-8">
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start animate-in fade-in slide-in-from-top-2">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-800 font-medium">Account created successfully!</p>
                  <p className="text-green-600 text-sm mt-1">Redirecting to login...</p>
                </div>
              </div>
            )}

            {globalError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm font-medium">{globalError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <InputField
                id="username"
                name="username"
                label="Username"
                icon={User}
                placeholder="johndoe"
                formData={formData}
                touched={touched}
                fieldErrors={fieldErrors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                loading={loading}
                success={success}
                helperText="3-30 characters, letters, numbers, underscores, hyphens only"
              />

              <InputField
                id="email"
                name="email"
                type="email"
                label="Email Address"
                icon={Mail}
                placeholder="john@example.com"
                formData={formData}
                touched={touched}
                fieldErrors={fieldErrors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                loading={loading}
                success={success}
              />

              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 transition-colors ${
                      fieldErrors.password && touched.password ? 'text-red-400' : 
                      passwordStrength.score >= 4 ? 'text-green-500' : 
                      'text-slate-400 group-focus-within:text-indigo-500'
                    }`} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={success || loading}
                    className={`block w-full pl-11 pr-12 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                      fieldErrors.password && touched.password
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                        : passwordStrength.score >= 4
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20'
                        : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {formData.password && (
                  <div className="mt-3 space-y-2 animate-in fade-in slide-in-from-top-2">
                    <div className="flex gap-1 h-1.5">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`flex-1 rounded-full transition-all duration-300 ${
                            passwordStrength.score >= level ? passwordStrength.color : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className={`text-xs font-medium ${
                        passwordStrength.score <= 2 ? 'text-red-600' :
                        passwordStrength.score <= 3 ? 'text-yellow-600' :
                        passwordStrength.score === 4 ? 'text-blue-600' : 'text-green-600'
                      }`}>
                        {passwordStrength.label}
                      </p>
                      <span className="text-xs text-slate-500">
                        {formData.password.length}/128
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-1.5 mt-2">
                      {Object.entries(passwordStrength.checks || {}).map(([check, passed]) => (
                        <div key={check} className={`flex items-center gap-1.5 text-xs ${
                          passed ? 'text-green-600' : 'text-slate-400'
                        }`}>
                          {passed ? <CheckCircle className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-current" />}
                          <span className="capitalize">
                            {check === 'length' ? '8+ characters' : 
                             check === 'special' ? 'Special char' : 
                             check}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {touched.password && fieldErrors.password && (
                  <p className="text-xs text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1">
                    <XCircle className="w-3 h-3" />
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <InputField
                id="password2"
                name="password2"
                type="password"
                label="Confirm Password"
                icon={Lock}
                placeholder="••••••••"
                formData={formData}
                touched={touched}
                fieldErrors={fieldErrors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                loading={loading}
                success={success}
                showPasswordToggle
                showPasswordState={showConfirmPassword}
                setShowPasswordState={setShowConfirmPassword}
              />

              <div className="pt-2">
                <label className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  agreed 
                    ? 'bg-indigo-50 border-indigo-200' 
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                } ${touched.agreed && !agreed ? 'border-red-300 bg-red-50' : ''}`}>
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={handleAgreementChange}
                    disabled={success || loading}
                    className="mt-0.5 w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 focus:ring-2 disabled:opacity-50 flex-shrink-0"
                  />
                  <span className="text-sm text-slate-700 leading-relaxed">
                    By signing up, you agree to our{' '}
                    <Link 
                      to="/terms" 
                      className="text-indigo-600 hover:text-indigo-700 font-semibold underline-offset-2 hover:underline"
                      target="_blank"
                    >
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link 
                      to="/privacy" 
                      className="text-indigo-600 hover:text-indigo-700 font-semibold underline-offset-2 hover:underline"
                      target="_blank"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={!isFormValid()}
                className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg mt-6 ${
                  isFormValid()
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-600">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors underline-offset-2 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
          <Shield className="w-4 h-4" />
          <span>Secured with 256-bit encryption</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;