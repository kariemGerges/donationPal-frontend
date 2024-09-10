import axios from "axios";
import { useState, useEffect } from "react";

const useDonationFetcher = (apiURL) => {
    const [donations, setDonations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDonations = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(apiURL);
                setDonations(response.data);
                setIsLoading(false);
                setError(null);
            } catch (error) {
                setError(error);
                setIsLoading(false);
                console.error("Error fetching donations:", error);

            }
        };

        fetchDonations();
    }, [
        apiURL
    ]);

    return { donations, isLoading, error };

};

export default useDonationFetcher;
