import { useState, useEffect } from "react";
import axios from "axios";


const useUsersFetcher = (apiURL) => {
    const [user, setUser] = useState([]);
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [userError, setError] = useState(null);

    console.log("apiURL:", apiURL);
    useEffect(() => {
        const fetchUsers = async () => {
            setIsUserLoading(true);
            try {
                const response = await axios.get(apiURL);
                setUser(response.data);
                setIsUserLoading(false);
                setError(null);
            } catch (userError) {
                setError(userError);
                setIsUserLoading(false);
                console.log("userError fetching user:", userError);
            }
        };

        fetchUsers();
    }, [apiURL]);

    return { user, isUserLoading, userError };
};

export default useUsersFetcher;