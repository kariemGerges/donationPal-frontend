import React, { useState } from 'react';
import { Heart, Target, Award, TrendingUp, Calendar, ArrowRight, Edit2, X } from 'lucide-react';

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState('activity');
  const [isEditing, setIsEditing] = useState(false);

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'activity':
        return (
          <div className="space-y-4">
            <ActivityItem
              icon={<Heart className="text-red-500" />}
              title="Donated to Save the Forests"
              amount="$50"
              date="2 days ago"
            />
            <ActivityItem
              icon={<Target className="text-blue-500" />}
              title="Created fundraiser for Clean Water"
              amount="$500 goal"
              date="1 week ago"
            />
            <ActivityItem
              icon={<Heart className="text-red-500" />}
              title="Donated to Children's Education"
              amount="$25"
              date="2 weeks ago"
            />
          </div>
        );
      case 'impact':
        return (
          <div className="space-y-4">
            <ImpactItem icon={<Award />} title="Top Donor Badge" description="Awarded for consistent monthly donations" />
            <ImpactItem icon={<TrendingUp />} title="125 Trees Planted" description="Through various environmental campaigns" />
            <ImpactItem icon={<Calendar />} title="1 Year of Giving" description="Celebrating your first year on the platform" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-16">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full flex">
        <div 
          className={`transition-all duration-500 ease-in-out flex-shrink-0 ${
            isEditing ? 'w-1/2' : 'w-full'
          }`}
        >
          <div className="relative h-40 bg-gray-200">
            <img src="/api/placeholder/800/300" alt="Cover" className="w-full h-full object-cover" />
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <img src="/api/placeholder/150/150" alt="Avatar" className="w-32 h-32 rounded-full border-4 border-white" />
            </div>
          </div>
          <div className="pt-20 pb-8 px-6 text-center relative">
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-300"
            >
              <Edit2 size={20} />
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Alex Johnson</h1>
            <p className="text-gray-600 mt-2">Passionate Philanthropist</p>
            <div className="mt-6 flex justify-center items-center space-x-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">$1,250</p>
                <p className="text-sm text-gray-500">Total Donated</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">15</p>
                <p className="text-sm text-gray-500">Causes Supported</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <div className="flex">
              <button
                onClick={() => setSelectedTab('activity')}
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  selectedTab === 'activity' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'
                }`}
              >
                Activity
              </button>
              <button
                onClick={() => setSelectedTab('impact')}
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  selectedTab === 'impact' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'
                }`}
              >
                Impact
              </button>
            </div>
            <div className="p-6 overflow-y-auto" style={{ maxHeight: '300px' }}>
              {renderTabContent()}
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4">
            <button className="w-full bg-green-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-600 transition duration-300 flex items-center justify-center">
              Start a New Fundraiser
              <ArrowRight className="ml-2" size={18} />
            </button>
          </div>
        </div>
        <div 
          className={`transition-all duration-500 ease-in-out ${
            isEditing ? 'w-1/2 opacity-100' : 'w-0 opacity-0'
          } bg-gray-100 overflow-hidden`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 bg-white rounded-full hover:bg-gray-200 transition duration-300"
              >
                <X size={20} />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" defaultValue="Alex Johnson" />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea id="bio" name="bio" rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" defaultValue="Passionate Philanthropist" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" defaultValue="alex@example.com" />
              </div>
              <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-600 transition duration-300">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityItem = ({ icon, title, amount, date }) => (
  <div className="flex items-center space-x-4">
    <div className="flex-shrink-0">{icon}</div>
    <div className="flex-grow">
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
    <div className="flex-shrink-0 text-sm font-medium text-gray-900">{amount}</div>
  </div>
);

const ImpactItem = ({ icon, title, description }) => (
  <div className="flex items-center space-x-4">
    <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
);

export default ProfilePage;