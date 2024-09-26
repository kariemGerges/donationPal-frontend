import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function useRegisterRestOfData(){

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const SERVER_URL = 'https://donationpal-backend.onrender.com';


    const { id } = useParams();
    const registerRestOfData = async (formData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${SERVER_URL}/users/register-complete/${id}`, formData);
            return response.data;

        } catch (err) {
            // check if the error response has data
            if (err.response && err.response.data) {
                if (err.response.status === 400) {
                    // validation errors
                    const validationErrors = err.response.data.errors;
                    const errorMessages = validationErrors.map((e) => e.msg).join('_');
                    setError(errorMessages);
                } else if (err.response.status === 409) {
                    // duplicate user error
                    setError(err.response.data.message);
                } else {
                    // other errors
                    setError(err.response.data.message || 'Registration failed');
                    
            } } else if (err.request) {
                // no response from server
                setError('No response from server');
            } else {
                // other errors
                setError('Registration failed');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { registerRestOfData, isLoading, error };

};