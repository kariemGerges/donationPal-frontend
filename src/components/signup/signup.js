import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useRegister from "../../hooks/useRegister";
import { Eye, EyeOff } from "lucide-react";
import LoginImg from "../../assets/AIDonation.jpeg";
import Loading from "../Loading/Loading";
import ThemeContext from "../../components/ThemeContext/ThemeContext";
import G from "../../assets/G.jpeg";

const Signup = () => {

    const [showPassword, setShowPassword] = useState(false);
    const  [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { register, isLoading, error } = useRegister();
    const navigate = useNavigate();

    const {theme} = useContext(ThemeContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await register(formData); // call register function from useRegister hook
            navigate(`/complete-signup/${userData.id}`); // redirect to complete-signup page

        } catch (error) {
            console.error(error); // error handling ( defined in useRegister )
        }
    }

    return (
    <div className="flex flex-col min-h-screen lg:flex-row">
        {/* Image section */}
        <div className="w-full h-64 lg:h-screen lg:w-1/2 relative overflow-hidden">
            <img 
                src={LoginImg} 
                alt="Login background" 
                className="absolute w-full h-full object-cover object-center"
            />
        </div>

        {/* Login Form section */}
        <div className="w-full flex-grow bg-gradient-to-br from-orange-400 to-yellow-200 flex items-center justify-center p-4 lg:w-1/2">
            <div className={`${theme ? 'bg-gray-600' : 'bg-white'}
                rounded-lg shadow-xl p-8 w-full max-w-md`}>
                <h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className={`block text-sm font-medium 
                                        ${theme ? 'text-gray-300' : 'text-gray-700'}`}>
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm shadow-sm 
                                        focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className={`block text-sm font-medium ${theme ? 'text-gray-300' : 'text-gray-700'}`}>
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                className="block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                            focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                placeholder="Shhhhhhhh"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className={`w-full flex justify-center py-2 px-4 border border-transparent 
                                rounded-md shadow-sm text-sm font-medium
                                text-white bg-orange-500 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loading type="spin" color="#ffffff" height={20} width={20} />
                            ) : (
                                'Register'
                            )}
                        </button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button 
                            className="w-full inline-flex justify-center py-2 px-4 border
                                border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium
                                text-gray-500 hover:bg-orange-50"
                            // onClick={signInWithGoogle}
                        >
                            <span className="sr-only">Sign in with Google</span>
                            <img src={G} alt="Google logo" className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Signup;
