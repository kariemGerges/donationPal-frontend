import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useCampaignsFetcher from '../../hooks/useCampaignsFetcher';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import ThemeContext from '../../components/ThemeContext/ThemeContext';
import Loading from '../../components/Loading/Loading';

const CampaignCard = React.memo(({ campaign }) => {

  const { theme } = useContext(ThemeContext);
  const progress = (campaign.currentAmount / campaign.goal) * 100;

  return (
    <Card 
      className={`w-full border h-full
        ${theme ? 'border-yellow-300 hover:border-orange-400 ' : 'border-red-600 hover:border-gray-700'} transition duration-300`}
    >
      <CardHeader>
        <CardTitle>{campaign.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <p 
          className={`${theme ? 'text-blue-300' : 'text-blue-600'} text-sm mb-4`}
        >
          {campaign.description}
        </p>
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between text-sm">
            <span>${(campaign.currentAmount || 0).toFixed(2)} raised</span>
            <span>Goal: ${(campaign.goal || 0).toFixed(2)}</span>
          </div>
        </div>
        
      </CardContent>
      <CardFooter className='h-12 flex justify-center b'>
        <Link to="/AllCampaigns" 
          className={`${theme ? 'bg-white text-orange-400' : 'bg-orange-400 text-white'} 
                      px-4 py-2 rounded-full font-bold text-lg hover:bg-opacity-90 transition duration-300`}>
              Donating Now
        </Link>
      </CardFooter>
    </Card>
  );
});

const AllCampaigns = () => {
  
  const { donationsData, isLoading, error } = useCampaignsFetcher();

  if (error) return <div className="text-center text-red-500">Error: {error.message || 'Failed to fetch campaigns'}</div>;

  if (isLoading) return <div className='flex items-center justify-center'>
  <p className='text-3xl font-bold pb-2'>Loading</p>
  <Loading  color={'orange'} />
</div>

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold text-center mb-8">All Campaigns</h1>
      {/* {isLoading &&
        <div className='flex items-center justify-center'>
          <p className='text-3xl font-bold pb-2'>Loading</p>
          <Loading  color={'orange'} />
        </div>
      } */}
      {donationsData && donationsData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donationsData.map((campaign) => (
            <Link to={'/CampaignDetails'} state={{ campaign }} key={campaign._id}>
            <   CampaignCard key={campaign._id} campaign={campaign} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center">No campaigns available.</p>
      )}
    </div>
  );
};

export default AllCampaigns;