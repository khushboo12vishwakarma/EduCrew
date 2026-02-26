// // import React, { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { authAPI } from '../services/api';
// // import { useAuth } from '../context/AuthContext';
// // import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

// // const Login = () => {
// //   const navigate = useNavigate();
// //   const { login } = useAuth();
// //   const [formData, setFormData] = useState({
// //     username: '',
// //     password: '',
// //   });
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //     setError('');
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError('');

// //     try {
// //       const response = await authAPI.login(formData);
      
// //       // Use context login function
// //       login(response.data.access, response.data.refresh, formData.username);

// //       // Redirect to home
// //       navigate('/');
// //     } catch (err) {
// //       setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center px-4">
// //       <div className="max-w-md w-full">
// //         {/* Logo and Title */}
// //         <div className="text-center mb-8">
// //           <h1 className="text-4xl font-bold text-white mb-2">
// //             🎓 EduCrew
// //           </h1>
// //           <p className="text-white/80">Sign in to your account</p>
// //         </div>

// //         {/* Login Card */}
// //         <div className="bg-white rounded-2xl shadow-2xl p-8">
// //           {/* Error Message */}
// //           {error && (
// //             <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
// //               <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
// //               <p className="text-red-700 text-sm">{error}</p>
// //             </div>
// //           )}

// //           {/* Login Form */}
// //           <form onSubmit={handleSubmit}>
// //             {/* Username Field */}
// //             <div className="mb-4">
// //               <label className="block text-gray-700 font-medium mb-2">
// //                 Username
// //               </label>
// //               <div className="relative">
// //                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //                 <input
// //                   type="text"
// //                   name="username"
// //                   value={formData.username}
// //                   onChange={handleChange}
// //                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //                   placeholder="Enter your username"
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             {/* Password Field */}
// //             <div className="mb-6">
// //               <label className="block text-gray-700 font-medium mb-2">
// //                 Password
// //               </label>
// //               <div className="relative">
// //                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //                 <input
// //                   type="password"
// //                   name="password"
// //                   value={formData.password}
// //                   onChange={handleChange}
// //                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //                   placeholder="Enter your password"
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             {/* Submit Button */}
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-50"
// //             >
// //               {loading ? (
// //                 <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// //               ) : (
// //                 <>
// //                   <LogIn className="w-5 h-5 mr-2" />
// //                   Sign In
// //                 </>
// //               )}
// //             </button>
// //           </form>

// //           {/* Sign Up Link */}
// //           <div className="mt-6 text-center">
// //             <p className="text-gray-600">
// //               Don't have an account?{' '}
// //               <Link to="/signup" className="text-primary-500 font-semibold hover:text-primary-600">
// //                 Sign Up
// //               </Link>
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;



// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { authAPI } from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import { 
//   Mail, 
//   Lock, 
//   LogIn, 
//   AlertCircle, 
//   Eye, 
//   EyeOff,
//   ArrowRight,
//   GraduationCap,
//   Shield
// } from 'lucide-react';

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [touched, setTouched] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (error) setError('');
//   };

//   const handleBlur = (e) => {
//     const { name } = e.target;
//     setTouched(prev => ({
//       ...prev,
//       [name]: true
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Mark all fields as touched
//     setTouched({ username: true, password: true });
    
//     // Basic validation
//     if (!formData.username.trim() || !formData.password.trim()) {
//       setError('Please fill in all fields');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const response = await authAPI.login(formData);
      
//       // Use context login function
//       login(response.data.access, response.data.refresh, formData.username);

//       // Redirect to home
//       navigate('/');
//     } catch (err) {
//       const status = err.response?.status;
//       const errorData = err.response?.data;
      
//       let errorMsg = 'Login failed. Please check your credentials.';
      
//       if (status === 401) {
//         errorMsg = 'Invalid username or password';
//       } else if (errorData?.detail) {
//         errorMsg = errorData.detail;
//       }
      
//       setError(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isFormValid = formData.username.trim() && formData.password.trim();

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
//             Welcome back
//           </h1>
//           <p className="mt-2 text-slate-600 text-base">
//             Sign in to continue your learning journey
//           </p>
//         </div>

//         {/* Main Card */}
//         <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-900/5 overflow-hidden">
//           {/* Progress Indicator */}
//           <div className="bg-slate-50/50 px-8 py-4 border-b border-slate-100">
//             <div className="flex items-center justify-between text-sm">
//               <span className="font-medium text-slate-900">Sign In</span>
//               <span className="text-slate-500">Secure Connection</span>
//             </div>
//             <div className="mt-2 h-1 bg-slate-200 rounded-full overflow-hidden">
//               <div className="h-full w-full bg-indigo-600 rounded-full" />
//             </div>
//           </div>

//           <div className="p-8">
//             {/* Error Message */}
//             {error && (
//               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start animate-in fade-in slide-in-from-top-2">
//                 <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
//                 <p className="text-red-800 text-sm font-medium">{error}</p>
//               </div>
//             )}

//             {/* Login Form */}
//             <form onSubmit={handleSubmit} className="space-y-5">
//               {/* Username Field */}
//               <div className="space-y-1.5">
//                 <label htmlFor="username" className="block text-sm font-semibold text-slate-700">
//                   Username
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <Mail className={`h-5 w-5 transition-colors ${
//                       touched.username && !formData.username ? 'text-red-400' : 'text-slate-400 group-focus-within:text-indigo-500'
//                     }`} />
//                   </div>
//                   <input
//                     id="username"
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className={`block w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ${
//                       touched.username && !formData.username
//                         ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
//                         : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
//                     }`}
//                     placeholder="Enter your username"
//                     required
//                   />
//                 </div>
//                 {touched.username && !formData.username && (
//                   <p className="text-xs text-red-600">Username is required</p>
//                 )}
//               </div>

//               {/* Password Field */}
//               <div className="space-y-1.5">
//                 <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
//                   Password
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <Lock className={`h-5 w-5 transition-colors ${
//                       touched.password && !formData.password ? 'text-red-400' : 'text-slate-400 group-focus-within:text-indigo-500'
//                     }`} />
//                   </div>
//                   <input
//                     id="password"
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className={`block w-full pl-11 pr-12 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ${
//                       touched.password && !formData.password
//                         ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
//                         : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
//                     }`}
//                     placeholder="Enter your password"
//                     required
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
//                 {touched.password && !formData.password && (
//                   <p className="text-xs text-red-600">Password is required</p>
//                 )}
//               </div>

//               {/* Forgot Password Link */}
//               <div className="flex items-center justify-end">
//                 <Link 
//                   to="/forgot-password" 
//                   className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors underline-offset-2 hover:underline"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading || !isFormValid}
//                 className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg ${
//                   isFormValid
//                     ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30'
//                     : 'bg-slate-200 text-slate-500 cursor-not-allowed'
//                 }`}
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                     <span>Signing in...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>Sign In</span>
//                     <ArrowRight className="w-4 h-4" />
//                   </>
//                 )}
//               </button>
//             </form>

//             {/* Sign Up Link */}
//             <div className="mt-8 text-center">
//               <p className="text-sm text-slate-600">
//                 Don't have an account?{' '}
//                 <Link 
//                   to="/signup" 
//                   className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors underline-offset-2 hover:underline"
//                 >
//                   Create account
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

// export default Login;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Mail, 
  Lock, 
  ArrowRight,
  GraduationCap,
  Shield,
  AlertCircle,
  Eye, 
  EyeOff,
  ChevronLeft,
  CheckCircle,
  X
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});
  
  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotError, setForgotError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setTouched({ username: true, password: true });
    
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      
      // Store remember me preference
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('savedUsername', formData.username);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('savedUsername');
      }
      
      login(response.data.access, response.data.refresh, formData.username);
      navigate('/');
    } catch (err) {
      const status = err.response?.status;
      const errorData = err.response?.data;
      
      let errorMsg = 'Login failed. Please check your credentials.';
      
      if (status === 401) {
        errorMsg = 'Invalid username or password';
      } else if (errorData?.detail) {
        errorMsg = errorData.detail;
      }
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Handle forgot password submit
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    
    if (!forgotEmail.trim()) {
      setForgotError('Please enter your email address');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotEmail)) {
      setForgotError('Please enter a valid email address');
      return;
    }

    setForgotLoading(true);
    setForgotError('');

    try {
      await authAPI.forgotPassword({ email: forgotEmail });
      setForgotSuccess(true);
    } catch (err) {
      setForgotError(err.response?.data?.error || 'Failed to send reset instructions. Please try again.');
    } finally {
      setForgotLoading(false);
    }
  };

  const closeForgotModal = () => {
    setShowForgotModal(false);
    setForgotEmail('');
    setForgotSuccess(false);
    setForgotError('');
  };

  const isFormValid = formData.username.trim() && formData.password.trim();

  // Load saved username on mount
  useState(() => {
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedRememberMe && savedUsername) {
      setRememberMe(true);
      setFormData(prev => ({ ...prev, username: savedUsername }));
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-100/50 to-pink-100/50 rounded-full blur-3xl" />
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center relative">
              <button
                onClick={closeForgotModal}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-3">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Forgot Your Password?</h2>
              <p className="text-white/80 text-sm mt-1">
                No worries! Enter your email and we'll send you reset instructions.
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {!forgotSuccess ? (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  {forgotError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                      <AlertCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-red-700 text-sm">{forgotError}</p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="forgot-email" className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        id="forgot-email"
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5">
                      Enter the email address associated with your EduCrew account.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all disabled:opacity-50 flex items-center justify-center"
                  >
                    {forgotLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      'Send Reset Instructions'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={closeForgotModal}
                    className="w-full flex items-center justify-center gap-2 text-slate-600 hover:text-slate-800 font-medium text-sm py-2 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Login
                  </button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Check Your Email</h3>
                  <p className="text-slate-600 text-sm mb-6">
                    We've sent password reset instructions to <strong>{forgotEmail}</strong>
                  </p>
                  <button
                    onClick={closeForgotModal}
                    className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Back to Login
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {!forgotSuccess && (
              <div className="px-6 pb-6 text-center">
                <p className="text-sm text-slate-600">
                  Remember your password?{' '}
                  <button
                    onClick={closeForgotModal}
                    className="font-semibold text-indigo-600 hover:text-indigo-700 underline-offset-2 hover:underline"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4 ring-1 ring-slate-900/5">
            <GraduationCap className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-slate-600 text-base">
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-900/5 overflow-hidden">
          <div className="bg-slate-50/50 px-8 py-4 border-b border-slate-100">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-900">Sign In</span>
              <span className="text-slate-500">Secure Connection</span>
            </div>
            <div className="mt-2 h-1 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full w-full bg-indigo-600 rounded-full" />
            </div>
          </div>

          <div className="p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username Field */}
              <div className="space-y-1.5">
                <label htmlFor="username" className="block text-sm font-semibold text-slate-700">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 transition-colors ${
                      touched.username && !formData.username ? 'text-red-400' : 'text-slate-400 group-focus-within:text-indigo-500'
                    }`} />
                  </div>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`block w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ${
                      touched.username && !formData.username
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                    }`}
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 transition-colors ${
                      touched.password && !formData.password ? 'text-red-400' : 'text-slate-400 group-focus-within:text-indigo-500'
                    }`} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`block w-full pl-11 pr-12 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ${
                      touched.password && !formData.password
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                    }`}
                    placeholder="Enter your password"
                    required
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
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 focus:ring-2 transition-all"
                  />
                  <span className="ml-2 text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                    Remember me
                  </span>
                </label>
                
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors underline-offset-2 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg ${
                  isFormValid
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-600">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors underline-offset-2 hover:underline"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
          <Shield className="w-4 h-4" />
          <span>Secured with 256-bit encryption</span>
        </div>
      </div>
    </div>
  );
};

export default Login;