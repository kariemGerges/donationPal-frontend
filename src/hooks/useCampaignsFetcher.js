import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const useCampaignsFetcher = () => {
    const [donationsData, setDonationsData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const socketRef = useRef(null);
    const sourceRef = useRef(null);

    // Hard-coded server URL
    const SERVER_URL = 'https://donationpal-backend.onrender.com';

    // Initial data fetcher from the backend server
    const fetchInitialData = useCallback(async () => {
        sourceRef.current = axios.CancelToken.source();
        try {
            console.log('Fetching initial data...');
            const response = await axios.get(`${SERVER_URL}/campaigns/allCampaigns`, {
                cancelToken: sourceRef.current.token,
            });
            setIsLoading(true);

            // console.log('Initial data received:', response.data);
            if (response.status === 200 && Array.isArray(response.data) && response.data.length > 0) {
                setDonationsData(response.data);
                sessionStorage.setItem('donationsData', JSON.stringify(response.data));
                // console.log('Initial data stored in session storage and state');
            } else {
                // console.warn('Received data is not in the expected format:', response.data);
                setError(new Error('Invalid data format received from server'));
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            } else {
                console.error('Error fetching initial data:', error);
                setError(error);
            }
        } finally {
            setIsLoading(false);
        }
    }, [SERVER_URL]);

    // Set the new data in case of change in the DB (insert, edit, delete)
    const updateDataAndStorage = useCallback((newData) => {
        console.log('Updating data and storage:', newData);
        setDonationsData(newData);
        sessionStorage.setItem('donationsData', JSON.stringify(newData));
    }, []);

    // Setup WebSocket
    useEffect(() => {
        const setupSocket = () => {
            socketRef.current = io(SERVER_URL, {
                transports: ['websocket'],
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
            });

            // Connected
            socketRef.current.on('connect', () => {
                console.log('Connected to WebSocket');
            });

            // Change data
            socketRef.current.on('dataChanged', (changeEvent) => {
                console.log('dataChanged event received:', changeEvent);

                setDonationsData((prevData) => {
                    if (!prevData) return prevData;

                    let newData;

                    switch (changeEvent.operationType) {
                        case 'insert':
                            newData = [...prevData, changeEvent.fullDocument];
                            break;
                        case 'update':
                            newData = prevData.map((campaign) =>
                                campaign._id === changeEvent.documentKey._id
                                    ? { ...campaign, ...changeEvent.updateDescription.updatedFields }
                                    : campaign
                            );
                            break;
                        case 'delete':
                            newData = prevData.filter((campaign) => campaign._id !== changeEvent.documentKey._id);
                            break;
                        default:
                            console.log('Unhandled operation type:', changeEvent.operationType);
                            return prevData;
                    }

                    console.log('Updated data from the socket change event', newData);
                    sessionStorage.setItem('donationsData', JSON.stringify(newData));
                    return newData;
                });
            });

            // Disconnect
            socketRef.current.on('disconnect', () => {
                console.log('Disconnected from WebSocket');
            });

            // Error
            socketRef.current.on('error', (error) => {
                console.error('WebSocket error:', error);
                setError(error);
            });
        };

        const cachedData = sessionStorage.getItem('donationsData');

        if (cachedData) {
            console.log('Using cached data from session storage');
            setDonationsData(JSON.parse(cachedData));
            setIsLoading(false);
        }

        fetchInitialData();
        setupSocket();

        return () => {
            console.log('Cleaning up useCampaignsFetcher hook');
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            if (sourceRef.current) {
                sourceRef.current.cancel('Component unmounted');
            }
        };
    }, [fetchInitialData, updateDataAndStorage, SERVER_URL]);

    return { donationsData, isLoading, error };
};

export default useCampaignsFetcher;











// import { useState, useEffect, useCallback, useRef } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';

// const useCampaignsFetcher = () => {
//     const [donationsData, setDonationsData] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const socketRef = useRef(null);
//     const sourceRef = useRef(null);

//     // initial data fetcher from BE server
//     const fetchInitialData = useCallback(async () => {
//         sourceRef.current = axios.CancelToken.source();
//         try {
//             console.log('Fetching initial data...');
//             // const response = await axios.get('http://localhost:3000/campaigns/allCampaigns', {
//             //     cancelToken: sourceRef.current.token,
//             // });
//             const response = await axios.get('https://donationpal-backend.onrender.com/campaigns/allCampaigns', {
//                 cancelToken: sourceRef.current.token,
//             });

//             console.log('Initial data received:', response.data);
//             if (response.status === 200 && Array.isArray(response.data) && response.data.length > 0) {
//                 setDonationsData(response.data);
//                 sessionStorage.setItem('donationsData', JSON.stringify(response.data));
//                 console.log('Initial data stored in session storage and state');
//             } else {
//                 console.warn('Received data is not in the expected format:', response.data);
//                 setError(new Error('Invalid data format received from server'));
//             }
//         } catch (error) {
//             if (axios.isCancel(error)) {
//                 console.log('Request canceled:', error.message);
//             } else {
//                 console.error('Error fetching initial data:', error);
//                 setError(error);
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     // set the new data in case of change in the DB ( insert, edit, delete )
//     const updateDataAndStorage = useCallback((newData) => {
//         console.log('Updating data and storage:', newData);
//         setDonationsData(newData);
//         sessionStorage.setItem('donationsData', JSON.stringify(newData));
//     }, []);

//     // setup webSocket
//     useEffect(() => {
//         const setupSocket = () => {
//             socketRef.current = io('http://localhost:3000', {
//                 transports: ['websocket'],
//                 reconnectionAttempts: 5,
//                 reconnectionDelay: 1000,
//             });
            
//             // connected
//             socketRef.current.on('connect', () => {
//                 console.log('Connected to WebSocket');
//             });

//             // change data
//             socketRef.current.on('dataChanged', (changeEvent) => {
//                 console.log('dataChanged event received:', changeEvent);
                
//                 setDonationsData((prevData) => {
//                     if (!prevData) return prevData;

//                     let newData;
                    
//                     switch (changeEvent.operationType) {
//                         case 'insert':
//                             newData = [...prevData, changeEvent.fullDocument];
//                             break;
//                         case 'update':
//                             newData = prevData.map(campaign => 
//                                 campaign._id === changeEvent.documentKey._id 
//                                     ? { ...campaign, ...changeEvent.updateDescription.updatedFields }
//                                     : campaign
//                             );
//                             break;
//                         case 'delete':
//                             newData = prevData.filter(campaign => campaign._id !== changeEvent.documentKey._id);
//                             break;
//                         default:
//                             console.log('Unhandled operation type:', changeEvent.operationType);
//                             return prevData;
//                     }

//                     console.log('Change data from the socket change event', newData);
//                     sessionStorage.setItem('donationsData', JSON.stringify(newData));
//                     console.log('new data after change and set it to setDonationData', donationsData)
//                     return newData;
//                 });
//             });

//             // disconnect
//             socketRef.current.on('disconnect', () => {
//                 console.log('Disconnected from WebSocket');
//             });

//             // error
//             socketRef.current.on('error', (error) => {
//                 console.error('WebSocket error:', error);
//                 setError(error);
//             });
//         };

//         const cachedData = sessionStorage.getItem('donationsData');

//         if (cachedData) {
//             console.log('Using cached data from session storage');
//             setDonationsData(JSON.parse(cachedData));
//             setIsLoading(false);
//         }

//         fetchInitialData();
//         setupSocket();

//         return () => {
//             console.log('Cleaning up useCampaignsFetcher hook');
//             if (socketRef.current) {
//                 socketRef.current.disconnect();
//             }
//             if (sourceRef.current) {
//                 sourceRef.current.cancel('Component unmounted');
//             }
//         };
//     }, [fetchInitialData, updateDataAndStorage]);

//     return { donationsData, isLoading, error };
// };

// export default useCampaignsFetcher;