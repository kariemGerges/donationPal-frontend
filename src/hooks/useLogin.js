import { useState, useEffect } from "react";
import axios from "axios";

export default function useLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const SERVER_URL = 'https://donationpal-backend.onrender.com';


    const Login = async (formData) => {
        setIsLoading(true);
        // setError(null);
        try {
            const response = await axios.post(`${SERVER_URL}/users/login`, formData, { withCredentials: true });
            return true;
        } catch (err) {
            // Log the full error for debugging
            // console.error("Error occurred:", err.response.status , '', err.response.data.error);

            if (err.response && err.response.data) {
                // Handle specific errors based on status code
                if (err.response.status === 400) {
                    // Validation errors (400)
                    const validationErrors = err.response.data.errors;
                    const errorMessages = validationErrors.map(e => e.msg).join(', ');
                    setError(errorMessages);
                } else if (err.response.status === 401) {
                    // Authentication error (401)
                    const errorMessage = err.response.data.error || 'Invalid credentials';
                    setError(errorMessage);
                } else {
                    // Server error (500 or other)
                    setError(err.response.data.error || 'An error occurred. Please try again.');
                }
            } else if (err.request) {
                // No response from the server
                setError('No response from the server. Please try again.');
            } else {
                // Unexpected errors
                setError('An unexpected error occurred. Please try again.');
            }
            return false;
        } 
        finally {
            setIsLoading(false);
        }

    };
    useEffect(() => {
        console.log("Error updated:", error);  // This logs whenever `error` state changes
    }, [error]);

    return { Login, isLoading, error };
}