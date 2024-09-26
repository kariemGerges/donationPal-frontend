import { useState, useEffect } from "react";
import axios from "axios";


export default function useUserInfoFetcher() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const SERVER_URL = 'https://donationpal-backend.onrender.com';

    useEffect(() => {
        const fetchUserInfo = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${SERVER_URL}/users/me`, { withCredentials: true });
                const userData = response.data.user;
                setUser(userData);
            } catch (err)  {
                // check if the error response has data
                if (err.response && err.response.data) {
                    if (err.response.status === 400) {
                        // validation errors
                        const validationErrors = err.response.data.errors;
                        const errorMessages = validationErrors.map((e) => e.msg).join('_');
                        setError(errorMessages);
                    } else if (err.response.status === 401) {
                        // duplicate user error
                        setError(err.response.data.message || 'User not found');
                    } else {
                        // other errors
                        setError(err.response.data.message || 'Unfortunately something went wrong');
                        
                } } else if (err.request) {
                    // no response from server
                    setError('No response from server');
                } else {
                    // other errors
                    setError(err, 'No Data was found, please try again later');
                }
            } 
            finally {
                setIsLoading(false);
            }
        };

        fetchUserInfo();
    }, []);


    return { user, isLoading, error };


};