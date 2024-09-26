import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ThemeContext from '../../components/ThemeContext/ThemeContext';
import useDonationFetcher from '../../hooks/useDonationFetcher';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const CampaignDetails = () => {
  const location = useLocation();
  const { campaign } = location.state;
  const { theme } = useContext(ThemeContext);
  const [users, setUsers] = useState({});

  const { donations, isLoading, error } = useDonationFetcher(
    `https://donationpal-backend.onrender.com/donations/donationForCampaign/${campaign._id}`
  );

  // New useEffect to fetch users after donations are loaded
  useEffect(() => {
    if (donations && donations.donationsById) {
      const userIds = [
        ...new Set(donations.donationsById.map((donation) => donation.user_id)),
      ];

      const fetchUsers = async () => {
        try {
          const usersData = await Promise.all(
            userIds.map(async (userId) => {
              const response = await fetch(
                `https://donationpal-backend.onrender.com/users/aUser/${userId}`
              );
              const data = await response.json();
              return { userId, data };
            })
          );

          const usersMap = {};
          usersData.forEach(({ userId, data }) => {
            usersMap[userId] = data; 
          });

          setUsers(usersMap);
        } catch (error) {
          console.error('Error fetching users', error);
        }
      };

      fetchUsers();
    }
  }, [donations]);

  const totalRaised =
    donations?.donationsById?.reduce((sum, donation) => sum + donation.amount, 0) || 0;
  const progressPercentage = Math.min((totalRaised / campaign.goal) * 100, 100);

  const data = [
    { name: 'Raised', value: totalRaised },
    { name: 'Remaining', value: Math.max(campaign.goal - totalRaised, 0) },
  ];

  const COLORS = ['#E41B17', '#FFFFFF'];

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error.message}</div>;

  return (
    <div className={`min-h-screen`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">{campaign.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className={`mb-8 ${theme ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <CardHeader>
              <CardTitle>Campaign Progress</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {/* Pie chart */}
              <div className="w-48 h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <p className="text-lg font-semibold mb-2">
                ${totalRaised.toLocaleString()} raised of ${campaign.goal.toLocaleString()} goal
              </p>
              <p
                className={`text-sm ${
                  theme ? 'text-gray-300 dark:text-gray-400' : 'text-gray-700 dark:text-gray-400'
                }  mb-4`}
              >
                {progressPercentage.toFixed(1)}% Complete
              </p>
            </CardContent>
          </Card>

          {/* Second card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">
                <strong>Organizer:</strong> {campaign.organizer}
              </p>
              <p className="mb-2">
                <strong>Start Date:</strong>{' '}
                {new Date(campaign.start_date).toLocaleDateString()}
              </p>
              <p>
                <strong>Description:</strong> {campaign.description}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
          </CardHeader>
          <CardContent>
            {donations && donations.donationsById && donations.donationsById.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {donations.donationsById.map((donation, index) => {
                  const user = users[donation.user_id];

                  return (
                    <Card key={index} className="bg-opacity-50">
                      <CardContent className="p-4">
                        <p className="font-semibold">${donation.amount.toLocaleString()}</p>
                        <p className="text-sm">
                          {user ? `${user.name.first} ${user.name.last}` : 'Anonymous'}
                        </p>
                        <p
                          className={`text-sm ${
                            theme
                              ? 'text-gray-300 dark:text-gray-400'
                              : 'text-gray-700 dark:text-gray-400'
                          }  mb-4`}
                        >
                          {new Date(donation.date).toLocaleDateString()}
                        </p>
                        <p className="mt-2 text-sm">{donation.message || 'No message'}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <p className="text-center">No donations yet. Be the first to contribute!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignDetails;


// import React, { useContext, useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import ThemeContext from '../../components/ThemeContext/ThemeContext';
// import useDonationFetcher from '../../hooks/useDonationFetcher';
// import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
// // import { Button } from '@/components/ui/button';
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// const CampaignDetails = () => {
//   const location = useLocation();
//   const { campaign } = location.state;
//   const { theme } = useContext(ThemeContext);
//   const [users, setUsers] = useState({});

//   const { donations, isLoading, error } = useDonationFetcher(
//     // `http://localhost:3000/donations/donationForCampaign/${campaign._id}`
//     `https://donationpal-backend.onrender.com/donations/donationForCampaign/${campaign._id}`
//   );


//    // New useEffect to fetch users after donations are loaded
//    useEffect(() => {
//     if (donations && donations.donationsById) {
//       const userIds = [
//         ...new Set(donations.donationsById.map((donation) => donation.user_id)),
//       ];

//       const fetchUsers = async () => {
//         try {
//           const usersData = await Promise.all(
//             userIds.map(async (userId) => {
//               const response = await fetch(
//                 `https://donationpal-backend.onrender.com/users/aUser/${userId}`
//               );
//               const data = await response.json();
//               return { userId, data };
//             })
//           );

//           const usersMap = {};
//           usersData.forEach(({ userId, data }) => {
//             usersMap[userId] = data.user;
//           });

//           setUsers(usersMap);
//         } catch (error) {
//           console.error('Error fetching users', error);
//         }
//       };

//       fetchUsers();
//     }
//   }, [donations]);

//   const totalRaised = donations?.donationsById?.reduce((sum, donation) => sum + donation.amount, 0) || 0;
//   const progressPercentage = Math.min((totalRaised / campaign.goal) * 100, 100);

//   const data = [
//     { name: 'Raised', value: totalRaised },
//     { name: 'Remaining', value: Math.max(campaign.goal - totalRaised, 0) }
//   ];

//   const COLORS = ['#E41B17', '#FFFFFF'];

//   if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   if (error) return <div className="text-red-500 text-center">Error: {error.message}</div>;

//   return (
//     <div className={`min-h-screen`}>
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-center mb-8">{campaign.title}</h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <Card className={`mb-8 ${theme ? 'bg-gray-700' : 'bg-gray-200'}`} >
//             <CardHeader>
//               <CardTitle>Campaign Progress</CardTitle>
//             </CardHeader>
//             <CardContent className="flex flex-col items-center">

//             {/* pie chart */}
//               <div className="w-48 h-48 mb-4">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={data}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={60}
//                       outerRadius={80}
//                       fill="#8884d8"
//                       paddingAngle={5}
//                       dataKey="value"
//                       startAngle={90}
//                       endAngle={-270}
//                     >
//                       {data.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>

//               <p className="text-lg font-semibold mb-2">
//                 ${totalRaised.toLocaleString()} raised of ${campaign.goal.toLocaleString()} goal
//               </p>
//               <p className={`text-sm ${ theme ? 'text-gray-300 dark:text-gray-400' : 'text-gray-700 dark:text-gray-400'}  mb-4`}>
//                 {progressPercentage.toFixed(1)}% Complete
//               </p>
//               {/* <Button className="w-full">Donate Now</Button> */}
//             </CardContent>
//           </Card>

//           {/* second card */}
//           <Card className="mb-8">
//             <CardHeader>
//               <CardTitle>Campaign Details</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="mb-2"><strong>Organizer:</strong> {campaign.organizer}</p>
//                 <p className="mb-2"><strong>Start Date:</strong> {new Date(campaign.start_date).toLocaleDateString()}</p>
//               <p><strong>Description:</strong> {campaign.description}</p>
//             </CardContent>
//           </Card>

//         </div>
        
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Donations</CardTitle>
//           </CardHeader>
//           <CardContent>
//               {donations && donations.donationsById && donations.donationsById.length > 0 ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {donations.donationsById.map((donation, index) => (
//                     <Card key={index} className="bg-opacity-50">
//                       <CardContent className="p-4">
//                         <p className="font-semibold">${donation.amount.toLocaleString()}</p>
//                         <p className="text-sm">
//                             {
//                             () => {
//                               const user = users[donation.user_id];
//                               return user ? user.name.last : 'Anonymous';
//                             }
//                             }
//                         </p>
//                         <p>{donation.user_id}</p>
//                         <p className={`text-sm ${ theme ? 'text-gray-300 dark:text-gray-400' : 'text-gray-700 dark:text-gray-400'}  mb-4`}>
//                           {new Date(donation.date).toLocaleDateString()}
//                         </p>
//                         <p className="mt-2 text-sm">{donation.message || 'No message'}</p>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-center">No donations yet. Be the first to contribute!</p>
//               )}
//             </CardContent>
//         </Card>

//       </div>
//     </div>
//   );
// };

// export default CampaignDetails;