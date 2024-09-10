import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useCampaignsFetcher from '../../hooks/useCampaignsFetcher';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import ThemeContext from '../../components/ThemeContext/ThemeContext';

const CampaignCard = React.memo(({ campaign }) => {

  const { theme } = useContext(ThemeContext);
  const progress = (campaign.currentAmount / campaign.goal) * 100;

  return (
    <Card 
      className={`w-full border ${theme ? 'border-yellow-300' : 'border-red-600'}`}
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
    </Card>
  );
});

const AllCampaigns = () => {
  
  const { donationsData, isLoading, error } = useCampaignsFetcher();

  if (isLoading) return <div className="text-center">Loading campaigns...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message || 'Failed to fetch campaigns'}</div>;

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold text-center mb-8">All Campaigns</h1>
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