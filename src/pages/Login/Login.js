import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../../components/ThemeContext/ThemeContext';

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login attempt with:', { email, password });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`max-w-md w-full space-y-8 p-10 rounded-xl shadow-lg ${theme ? 'bg-gray-700' : 'bg-white'}`}>
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${theme ? 'text-blue-300' : 'text-blue-600'}`}>
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm">
            Or{' '}
            <Link to="/signup" className={`font-medium ${theme ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-500'}`}>
              create a new account
            </Link>
          </p>
        </div>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${theme ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
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