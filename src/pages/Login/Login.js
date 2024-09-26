import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ThemeContext from '../../components/ThemeContext/ThemeContext';

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { Login, isLoading, error } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const success = await Login(formData);
      if ( success ) {
        toast.success('Welcome back!');
        navigate('/profile');
      }

    } catch (error) {
      console.error(error + "a7aa");
    }
  };


  return (
    <div className={`min-h-screen flex items-center justify-center ${theme ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`max-w-md w-full space-y-8 p-10 rounded-xl shadow-lg ${theme ? 'bg-gray-700' : 'bg-white'}`}>
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold`}>
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm">
            Or{' '}
            <Link to="/signup" className={`font-medium ${theme ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-500'}`}>
              create a new account
            </Link>
          </p>
        </div>
         {/* Display Error Message */}
          {error && (
            <div className="text-center text-red-600">
              {error}
            </div>
          )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${theme ? 'border-gray-600 bg-gray-800 placeholder-gray-500' : 'border-gray-300 placeholder-gray-500'} text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10`}
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${theme ? 'border-gray-600 bg-gray-800 placeholder-gray-500' : 'border-gray-300 placeholder-gray-500'} text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10`}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className={`h-4 w-4 ${theme ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} rounded focus:ring-blue-500`}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className={`font-medium ${theme ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-500'}`}>
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-700`}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );

};

export default Login;