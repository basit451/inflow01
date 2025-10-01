import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthPageProps {
  onNavigate: (page: string) => void;
}

export default function AuthPage({ onNavigate }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { user, signIn, signUp, signInWithGoogle } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      onNavigate('home');
    }
  }, [user, onNavigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
      } else {
        if (!formData.username) {
          throw new Error('Username is required');
        }
        await signUp(formData.email, formData.password, formData.username);
      }
      onNavigate('home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      await signInWithGoogle();
      onNavigate('home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ email: '', password: '', username: '' });
  };

  // Analytics Dashboard SVG for Login
  const LoginDashboard = () => (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      {/* Background */}
      <rect width="400" height="300" fill="#f8fafc" rx="12"/>
      
      {/* Header */}
      <rect x="20" y="20" width="360" height="40" fill="white" rx="8"/>
      <text x="30" y="35" className="text-xs font-semibold" fill="#1f2937">Analytics Dashboard</text>
      <text x="30" y="50" className="text-xs" fill="#6b7280">Last 30 days</text>
      
      {/* Active Users Chart */}
      <rect x="20" y="80" width="170" height="120" fill="white" rx="8"/>
      <text x="30" y="100" className="text-xs font-semibold" fill="#1f2937">Active Users</text>
      <text x="30" y="115" className="text-lg font-bold" fill="#059669">12,847</text>
      <text x="30" y="130" className="text-xs" fill="#059669">↗ +23% from last month</text>
      
      {/* Line chart */}
      <polyline
        points="30,180 50,165 70,155 90,140 110,135 130,125 150,115 170,110"
        fill="none"
        stroke="url(#gradient1)"
        strokeWidth="3"
      />
      <circle cx="170" cy="110" r="4" fill="#10b981"/>
      
      {/* Revenue Chart */}
      <rect x="210" y="80" width="170" height="120" fill="white" rx="8"/>
      <text x="220" y="100" className="text-xs font-semibold" fill="#1f2937">Monthly Revenue</text>
      <text x="220" y="115" className="text-lg font-bold" fill="#7c3aed">$89,247</text>
      <text x="220" y="130" className="text-xs" fill="#7c3aed">↗ +18% growth</text>
      
      {/* Bar chart */}
      <rect x="230" y="160" width="12" height="30" fill="#e5e7eb" rx="2"/>
      <rect x="250" y="150" width="12" height="40" fill="#e5e7eb" rx="2"/>
      <rect x="270" y="140" width="12" height="50" fill="#e5e7eb" rx="2"/>
      <rect x="290" y="135" width="12" height="55" fill="#7c3aed" rx="2"/>
      <rect x="310" y="145" width="12" height="45" fill="#e5e7eb" rx="2"/>
      <rect x="330" y="155" width="12" height="35" fill="#e5e7eb" rx="2"/>
      
      {/* Usage Comparison */}
      <rect x="20" y="220" width="360" height="60" fill="white" rx="8"/>
      <text x="30" y="240" className="text-xs font-semibold" fill="#1f2937">Feature Usage</text>
      
      {/* Progress bars */}
      <text x="30" y="255" className="text-xs" fill="#6b7280">CRM Tools</text>
      <rect x="100" y="248" width="100" height="6" fill="#e5e7eb" rx="3"/>
      <rect x="100" y="248" width="85" height="6" fill="#10b981" rx="3"/>
      <text x="210" y="255" className="text-xs" fill="#6b7280">85%</text>
      
      <text x="30" y="270" className="text-xs" fill="#6b7280">Automation</text>
      <rect x="100" y="263" width="100" height="6" fill="#e5e7eb" rx="3"/>
      <rect x="100" y="263" width="72" height="6" fill="#f59e0b" rx="3"/>
      <text x="210" y="270" className="text-xs" fill="#6b7280">72%</text>
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#059669" stopOpacity="1"/>
        </linearGradient>
      </defs>
    </svg>
  );

  // Analytics Dashboard SVG for Signup
  const SignupDashboard = () => (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      {/* Background */}
      <rect width="400" height="300" fill="#f8fafc" rx="12"/>
      
      {/* Header */}
      <rect x="20" y="20" width="360" height="40" fill="white" rx="8"/>
      <text x="30" y="35" className="text-xs font-semibold" fill="#1f2937">Getting Started</text>
      <text x="30" y="50" className="text-xs" fill="#6b7280">Your first dashboard preview</text>
      
      {/* Setup Progress */}
      <rect x="20" y="80" width="170" height="120" fill="white" rx="8"/>
      <text x="30" y="100" className="text-xs font-semibold" fill="#1f2937">Setup Progress</text>
      
      {/* Progress circle */}
      <circle cx="105" cy="140" r="25" fill="none" stroke="#e5e7eb" strokeWidth="4"/>
      <circle cx="105" cy="140" r="25" fill="none" stroke="#ff4da6" strokeWidth="4" 
              strokeDasharray="94.2" strokeDashoffset="18.8" transform="rotate(-90 105 140)"/>
      <text x="105" y="145" className="text-sm font-bold" fill="#1f2937" textAnchor="middle">80%</text>
      
      <text x="30" y="180" className="text-xs" fill="#6b7280">4 of 5 steps complete</text>
      <text x="30" y="190" className="text-xs" fill="#ff4da6">• Connect your first integration</text>
      
      {/* Growth Projections */}
      <rect x="210" y="80" width="170" height="120" fill="white" rx="8"/>
      <text x="220" y="100" className="text-xs font-semibold" fill="#1f2937">Growth Projection</text>
      <text x="220" y="115" className="text-lg font-bold" fill="#7c3aed">+247%</text>
      <text x="220" y="130" className="text-xs" fill="#7c3aed">Expected in 6 months</text>
      
      {/* Projection line chart */}
      <polyline
        points="230,180 250,175 270,165 290,150 310,135 330,120 350,105 370,90"
        fill="none"
        stroke="url(#gradient2)"
        strokeWidth="3"
        strokeDasharray="5,5"
      />
      <circle cx="370" cy="90" r="4" fill="#7c3aed"/>
      
      {/* First Report Preview */}
      <rect x="20" y="220" width="360" height="60" fill="white" rx="8"/>
      <text x="30" y="240" className="text-xs font-semibold" fill="#1f2937">Your First Report</text>
      
      {/* Mini chart bars */}
      <rect x="30" y="250" width="8" height="20" fill="#10b981" rx="1"/>
      <rect x="45" y="255" width="8" height="15" fill="#10b981" rx="1"/>
      <rect x="60" y="245" width="8" height="25" fill="#10b981" rx="1"/>
      <rect x="75" y="250" width="8" height="20" fill="#ff4da6" rx="1"/>
      
      <text x="100" y="260" className="text-xs" fill="#6b7280">Ready to generate insights</text>
      <text x="100" y="270" className="text-xs" fill="#059669">Connect data sources to begin</text>
      
      {/* Welcome metrics */}
      <rect x="250" y="245" width="60" height="25" fill="#f3f4f6" rx="4"/>
      <text x="255" y="255" className="text-xs" fill="#6b7280">Contacts</text>
      <text x="255" y="265" className="text-xs font-semibold" fill="#1f2937">0</text>
      
      <rect x="320" y="245" width="60" height="25" fill="#f3f4f6" rx="4"/>
      <text x="325" y="255" className="text-xs" fill="#6b7280">Campaigns</text>
      <text x="325" y="265" className="text-xs font-semibold" fill="#1f2937">0</text>
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#ff4da6" stopOpacity="1"/>
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Section - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 bg-white max-w-md lg:max-w-lg">
        <div className="w-full max-w-sm mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <div className="relative h-12 w-[140px] mx-auto">
              <div className="h-full w-full bg-gradient-to-r from-[#FF4DA6] to-[#7C3AED]"
                style={{
                  WebkitMaskImage: "url('/dffdf.png')",
                  maskImage: "url('/dffdf.png')",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }} />
              <img src="/dffdf.png" alt="Inflow Logo" className="h-full w-auto opacity-0" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Welcome'}
            </h1>
            <p className="text-gray-600">
              {isLogin 
                ? 'Enter your email and password to access your account.' 
                : 'Create your account to get started.'
              }
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full mb-6 bg-white hover:bg-gray-50 text-gray-900 py-3 px-4 rounded-xl font-medium transition-colors duration-300 flex items-center justify-center space-x-3 border border-gray-300 hover:border-gray-400 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-pink-500/25"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="mt-6 text-center">
            <span className="text-gray-600 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={toggleAuthMode}
              className="text-pink-600 hover:text-pink-700 font-medium text-sm transition-colors"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>

      {/* Right Section - Analytics Dashboard */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-gray-50 to-gray-100 items-center justify-center p-12">
        <div className="max-w-lg w-full">
          {isLogin ? <LoginDashboard /> : <SignupDashboard />}
        </div>
      </div>
    </div>
  );
}