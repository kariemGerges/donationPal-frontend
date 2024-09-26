import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRegisterRestOfData from "../../hooks/useRegisterRestOfData";

import { User, Map, Phone, Flag } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select.tsx";
import { Input } from "../../components/ui/input.tsx";
import { Label } from "../../components/ui/label.tsx";


const CompleteSignup = () => {

    const [formData, setFormData] = useState({
        gender: '',
        name: {
            title: '',
            first: '',
            last: ''
        },
        location: {
            street: {
                number: '',
                name: ''
            },
            city: '',
            state: '',
            country: '',
            postcode: ''
        },
        dob: {
            date: '',
            age: ''
        },
        phone: '',
        cell: '',
        nat: ''
    });

    const { registerRestOfData, isLoading, error } = useRegisterRestOfData();
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            await registerRestOfData(formData); // call registerRestOfData function from useRegisterRestOfData hook
            // console.log('userId from complete-signup', userData);
            
            navigate('/Login'); // redirect to login page

        } catch (error) {
            console.error(error); // error handling ( defined in useRegister )
        }
    }

    const handleChange = (e, section, subSection) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
          ...prevData,
          [section]: subSection
            ? { ...prevData[section], [subSection]: { ...prevData[section][subSection], [name]: value } }
            : { ...prevData[section], [name]: value }
        }));
    };

    return (
      <Card className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
        {/* <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold text-center">Tell Us About Yourself</CardTitle>
        </CardHeader> */}
        {error && <p className="text-red-500">{error}</p>}
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base sm:text-lg font-semibold flex items-center gap-2">
                <User size={20} /> Personal Information
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="col-span-2 sm:col-span-1">
                  <Label htmlFor="gender">Gender</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Mr, Ms, etc."
                    value={formData.name.title}
                    onChange={(e) => handleChange(e, 'name', null)}
                    name="title"
                  />
                </div>
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="First Name"
                    value={formData.name.first}
                    onChange={(e) => handleChange(e, 'name', null)}
                    name="first"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Last Name"
                    value={formData.name.last}
                    onChange={(e) => handleChange(e, 'name', null)}
                    name="last"
                  />
                </div>
              </div>
            </div>
  
            <div className="space-y-4">
              <Label className="text-base sm:text-lg font-semibold flex items-center gap-2">
                <Map size={20} /> Address
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
                <div className="col-span-1">
                  <Label htmlFor="streetNumber">Number</Label>
                  <Input
                    id="streetNumber"
                    placeholder="123"
                    value={formData.location.street.number}
                    onChange={(e) => handleChange(e, 'location', 'street')}
                    name="number"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <Label htmlFor="streetName">Street</Label>
                  <Input
                    id="streetName"
                    placeholder="Main St"
                    value={formData.location.street.name}
                    onChange={(e) => handleChange(e, 'location', 'street')}
                    name="name"
                  />
                </div>
                <div className="col-span-2 sm:col-span-3">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="City"
                    value={formData.location.city}
                    onChange={(e) => handleChange(e, 'location', null)}
                    name="city"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="State"
                    value={formData.location.state}
                    onChange={(e) => handleChange(e, 'location', null)}
                    name="state"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="Country"
                    value={formData.location.country}
                    onChange={(e) => handleChange(e, 'location', null)}
                    name="country"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input
                    id="postcode"
                    placeholder="Postcode"
                    value={formData.location.postcode}
                    onChange={(e) => handleChange(e, 'location', null)}
                    name="postcode"
                  />
                </div>
              </div>
            </div>
  
            <div className="space-y-4">
              <Label className="text-base sm:text-lg font-semibold flex items-center gap-2">
                <Phone size={20} /> Contact Information
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="cell">Cell</Label>
                  <Input
                    id="cell"
                    placeholder="Cell"
                    value={formData.cell}
                    onChange={(e) => setFormData(prev => ({ ...prev, cell: e.target.value }))}
                  />
                </div>
              </div>
            </div>
  
            <div className="space-y-4">
              <Label className="text-base sm:text-lg font-semibold flex items-center gap-2">
                <Flag size={20} /> Additional Information
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob.date}
                    onChange={(e) => handleChange(e, 'dob', null)}
                    name="date"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Age"
                    value={formData.dob.age}
                    onChange={(e) => handleChange(e, 'dob', null)}
                    name="age"
                  />
                </div>
                <div>
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    placeholder="Nationality"
                    value={formData.nat}
                    onChange={(e) => setFormData(prev => ({ ...prev, nat: e.target.value }))}
                  />
                </div>
              </div>
            </div>
  
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Submit{isLoading ? '...' : ''}
                </Button>
          </form>
        </CardContent>
      </Card>
    );
};



export default CompleteSignup;