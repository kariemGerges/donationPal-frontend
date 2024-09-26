import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useUserInfoFetcher from '../../hooks/useUserInfoFetcher';
import EditProfileForm from '../../components/EditUserInfoForm/EditUserInfoForm';
import { Heart, Target, MapPinHouse , PhoneCall , Mail , ArrowRight, Edit2, X, LogOut  } from 'lucide-react';
import ThemeContext from '../../components/ThemeContext/ThemeContext';

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState('activity');
  const [isEditing, setIsEditing] = useState(false);

  const { user, isLoading, error } = useUserInfoFetcher();
  const Navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  // handle logout
  const handleLogout = async() => {
    const SERVER_URL = 'https://donationpal-backend.onrender.com';

    try {
      const response = await axios.post(`${SERVER_URL}/users/logout`, {} ,{ withCredentials: true });
      if (response.status === 200) {
        toast.success('Logged out successfully');
        Navigate('/');
      }
    } catch (error) {
      error.response.data.message && toast.error(error.response.data.message);
    }
    
  }

  // handle address object
  const handleAddressObject = (user) => {
    return user.location ? `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.postcode} ,${user.location.country}` : 'No address found';
  };

  if (isLoading) {
    return <div className=" text-red-500 *:first-letter:text-green-400 text-center ">Loading...</div>;
  }

  if (error) {
    if (error === 'Invalid token') {
      Navigate('/Login');
    }
    return <h1 className='text-red-500 text-center bg-orange-100 animate-fade-in'>
      {error === 'Invalid token' ? 
      'Please log in' : 
      'Something went wrong'
      }
      </h1>;
  }

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'activity':
        return (
          <div className="space-y-4">
            <ActivityItem
              icon={<Heart className="text-orange-500" />}
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
              icon={<Heart className="text-orange-500" />}
              title="Donated to Children's Education"
              amount="$25"
              date="2 weeks ago"
            />
          </div>
        );
      case 'Personal Information':
        return (
            <div className="space-y-4">
              <PersonalInfo icon={<MapPinHouse className='text-orange-700' />} title="Address" description={handleAddressObject(user)} />
                <PersonalInfo icon={<PhoneCall className='text-orange-500' />} title="Phone" description={user?.phone} />
              <PersonalInfo icon={<Mail className='text-orange-300' />} title="Email" description={user?.email} />
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 sm:p-8 md:p-16">
      { user && (
      <div className=" rounded-lg shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">

        <div 
          className={`transition-all duration-500 ease-in-out flex-shrink-0 ${
            isEditing ? 'md:w-1/2' : 'w-full'
          }`}
        >
          {/* Profile & cover image */}
          <div className="relative h-32 sm:h-40">
            <img src={user.image?.cover} alt="Cover" className="w-full h-full object-cover" />
            <div className="absolute -bottom-12 sm:-bottom-16 left-1/2 transform -translate-x-1/2">
              <img src={user.image?.profile} alt="Avatar" className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white" />
            </div>
          </div>
          
          {/* User details section + edit button + logout button */}
          <div className="pt-16 sm:pt-20 pb-6 sm:pb-8 px-4 sm:px-6 text-center relative">

            <button
              onClick={() => setIsEditing(true)}
              className={`absolute top-2 right-2 sm:top-4 sm:right-4 p-2 bg-gray-100 rounded-full hover:bg-teal-200 transition duration-300`}
            >
              <Edit2 size={18} className={`${theme ? 'text-red-500' : 'text-gray-900'}`} />
            </button>

            <h1 className="text-2xl sm:text-3xl font-bold">{user.name?.first} {user.name?.last}</h1>
            <p className="text-sm sm:text-base  mt-2">Passionate Philanthropist</p>
            <div className="mt-4 sm:mt-6 flex justify-center items-center space-x-4">
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold ">$1,250</p>
                <p className="text-xs sm:text-sm text-orange-600">Total Donated</p>
              </div>
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold ">15</p>
                <p className="text-xs sm:text-sm text-orange-600">Causes Supported</p>
              </div>
            </div>

            <button
              onClick={() => handleLogout()}
              className="absolute top-2 left-2 sm:top-4 sm:left-4 p-2 bg-gray-100 rounded-full hover:bg-teal-200 transition duration-300"
            >
              <LogOut size={18} className={`${theme ? 'text-red-500' : 'text-gray-900'}`} />
            </button>

          </div>

          {/* tabs section */}
          <div className="border-t border-green-200">

            <div className="flex">
              <button
                onClick={() => setSelectedTab('activity')}
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  selectedTab === 'activity' ? ' border-b-2 border-green-600' : 'text-green-500'
                }`}
              >
                Activity
              </button>
              <button
                onClick={() => setSelectedTab('Personal Information')}
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  selectedTab === 'Personal Information' ? ' border-b-2 border-green-600' : 'text-green-500'
                }`}
              >
                Personal Information
              </button>
            </div>

            <div className="p-6 overflow-y-auto" style={{ maxHeight: '300px' }}>
              {renderTabContent()}
            </div>

          </div>

          {/* Start a new fundraiser button */}
          <div className="bg-green-50 px-6 py-4">
            <button className="w-full px-4 py-2 rounded-md font-semibold  text-white bg-orange-500 hover:bg-orange-700 transition duration-300 flex items-center justify-center">
              Start a New Fundraiser
              <ArrowRight className="ml-2" size={18} />
            </button>
          </div>

        </div>

        {/* edit profile form section */}
        <div 
          className={`transition-all duration-500 ease-in-out ${
            isEditing ? 'md:w-1/2 opacity-100' : 'w-0 opacity-0 md:hidden'
          } overflow-hidden`}
        >
          <div className="pl-3 ">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-center ">Edit Profile</h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 bg-green-100 rounded-full hover:bg-green-200 transition duration-300"
                >
                  <X size={20} className="text-red-500" />
                </button>
            </div>
            <EditProfileForm />
          </div>
        </div>

      </div>
      )}
    </div>
  );
};

// ActivityItem and PersonalInfo components
const ActivityItem = ({ icon, title, amount, date }) => (
  <div className="flex items-center space-x-4">
    <div className="flex-shrink-0">{icon}</div>
      <div className="flex-grow">
        <p className="font-medium ">{title}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    <div className="flex-shrink-0 font-medium">{amount}</div>
  </div>
);

const PersonalInfo = ({ icon, title, description }) => (
  <div className="flex items-center space-x-4">
    <div className="flex-shrink-0 p-2 bg-gray-100 rounded-full">{icon}</div>
      <div>
        <p className="font-medium text-gray-400 pb-1">{title}</p>
        <p className="">{description}</p>
      </div>
  </div>
);

export default ProfilePage;