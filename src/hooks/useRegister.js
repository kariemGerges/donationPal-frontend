import { useState } from "react";
import axios from "axios";

export default function useRegister() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const SERVER_URL = 'https://donationpal-backend.onrender.com';

    const register = async (formData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${SERVER_URL}/users/register`, formData);
            const userId = response.data.user.id;
            const email = response.data.user.email;
            const userData = { id: userId, email: email };  
            console.log("userData", userData);          

            return userData; // return response data

        } catch (err) {
            // Check if the error response has data
            if (err.response && err.response.data) {
                if (err.response.status === 400) {
                // Validation errors
                const validationErrors = err.response.data.errors;
                const errorMessages = validationErrors.map((e) => e.msg).join('_');
                setError(errorMessages);
                } else if (err.response.status === 409) {
                // Duplicate user error
                setError(err.response.data.message);
                } else {
                // Other errors
                setError(err.response.data.message || 'Registration failed');
                }
            } else if (err.request) {
              // No response from server
                setError('No response from server');
            } else {
              // Other errors
                setError('An error occurred');
            }
            throw err;
        } finally {
            setIsLoading(false);
        }
    };
    return { register, isLoading, error };
}