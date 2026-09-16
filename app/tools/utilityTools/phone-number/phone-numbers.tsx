"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Phone, MapPin, Search, Calendar, Info, Shield, ArrowRight, User } from 'lucide-react';
import { Country, DeviceData, TrackerStatus } from '@/app/types';
import { COUNTRIES, MOCK_LOCATIONS, TRACKING_STEPS } from '@/app/components/constants';
import InteractiveMap from '@/app/components/InteractiveMap';
import TrackingOverlay from '@/app/components/TrackingOverlayProps';
import RelatedTools from '@/app/components/RelatedTools';

const PhoneNumber: React.FC = () => {
  const [status, setStatus] = useState<TrackerStatus>(TrackerStatus.IDLE);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [deviceData, setDeviceData] = useState<DeviceData | null>(null);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Generate a unique session ID on mount
    const randomId = Math.random().toString(16).substring(2, 10) + 
                     Math.random().toString(16).substring(2, 10);
    setSessionId(randomId);
  }, []);

  const startTracking = () => {
    if (!phoneNumber) return;
    setStatus(TrackerStatus.TRACKING);
    setProgress(0);
    setCurrentStepIndex(0);
    setDeviceData(null);
  };

  useEffect(() => {
    if (status === TrackerStatus.TRACKING) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            completeTracking();
            return 100;
          }
          const increment = Math.random() * 8;
          return Math.min(prev + increment, 100);
        });
      }, 400);

      const stepInterval = setInterval(() => {
        setCurrentStepIndex((prev) => (prev < TRACKING_STEPS.length - 1 ? prev + 1 : prev));
      }, 1500);

      return () => {
        clearInterval(interval);
        clearInterval(stepInterval);
      };
    }
  }, [status]);

  const completeTracking = () => {
    const mockLoc = MOCK_LOCATIONS[Math.floor(Math.random() * MOCK_LOCATIONS.length)];
    const data: DeviceData = {
      phoneNumber: selectedCountry.dialCode + phoneNumber,
      country: selectedCountry.name,
      region: mockLoc.region,
      city: mockLoc.city,
      street: mockLoc.street,
      build: Math.floor(Math.random() * 200).toString(),
      location: `${mockLoc.lat.toFixed(4)}, ${mockLoc.lng.toFixed(4)}`,
      routes: 'Active Data Link',
      latitude: mockLoc.lat,
      longitude: mockLoc.lng
    };
    setDeviceData(data);
    setStatus(TrackerStatus.COMPLETED);
  };

  const handleReset = () => {
    setStatus(TrackerStatus.IDLE);
    setPhoneNumber('');
    setProgress(0);
    setDeviceData(null);
  };

  return (
    <div className=" flex flex-col items-center gap-10 sm:p-6 sm:flex-row sm:items-start dark:bg-slate-950 dark:text-slate-50">

      <div className="flex flex-col gap-5 p-5 w-screen order-2 sm:order-2">
      {/* Header Bar */}
      <header className=" border-b border-gray-200 px-6 py-4">
                  <h1 className='flex items-center justify-center font-bold text-4xl mb-10'>Phone Number Location Tracker Online</h1>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">


          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <User size={24} />
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider">Device Identity</p>
              <h2 className="font-semibold">
                {status === TrackerStatus.IDLE ? 'Awaiting Input...' : selectedCountry.dialCode + ' ' + phoneNumber}
              </h2>
            </div>
          </div>
          <div className="flex flex-col md:items-end text-sm">
            <div className="flex items-center gap-2 ">
              <Calendar size={14} />
              <span>Today: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <p className="dark:text-slate-400 font-mono text-[10px] mt-1">ID: {sessionId}</p>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 space-y-6">
        
        {/* Tracking Controls / Status */}
        <section className="animate-in fade-in duration-700">
          {status === TrackerStatus.TRACKING ? (
            <TrackingOverlay progress={progress} currentStep={TRACKING_STEPS[currentStepIndex]} />
          ) : (
            <div className=" p-8 rounded-2xl border border-gray-200 shadow-sm transition-all">
               {status === TrackerStatus.IDLE ? (
                 <div className="max-w-xl mx-auto text-center space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold">Geospatial Locator</h2>
                      <p className="text-slate-400">Enter the target phone number in international format to begin triangulation.</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <select 
                          className="w-full border border-gray-200 rounded-lg py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
                          value={selectedCountry.code}
                          onChange={(e) => {
                            const found = COUNTRIES.find(c => c.code === e.target.value);
                            if (found) setSelectedCountry(found);
                          }}
                        >
                          {COUNTRIES.map(c => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.name} ({c.dialCode})
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ">
                          <Info size={16} />
                        </div>
                      </div>
                      
                      <div className="flex-[2] relative">
                        <input 
                          type="tel"
                          placeholder="9133425499"
                          className="w-full border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-lg font-mono tracking-wider"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        />
                      </div>
                    </div>

                    <button 
                      onClick={startTracking}
                      disabled={!phoneNumber}
                      className={`w-full py-4 rounded-lg border-2 hover:border-indigo-400 font-bold text-lg uppercase tracking-widest transition-all flex items-center justify-center gap-2 
                        ${phoneNumber ? 'shadow-lg shadow-emerald-500/20' : 'cursor-not-allowed'}`}
                    >
                      Launch <ArrowRight size={20} />
                    </button>
                    
                    <p className="text-xs flex items-center justify-center gap-1">
                      <Shield size={12} />
                      Encrypted End-to-End Search Session
                    </p>
                 </div>
               ) : (
                 <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold ">Tracking Complete</h2>
                      <p className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        Device data successfully retrieved
                      </p>
                    </div>
                    <button 
                      onClick={handleReset}
                      className="px-6 py-2 hover:bg-slate-200 rounded-lg text-sm font-semibold transition-colors"
                    >
                      New Search
                    </button>
                 </div>
               )}
            </div>
          )}
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
          {/* Data List */}
          <section className="rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-boldflex items-center gap-2">
                Device Data <Info size={14} className="text-slate-400" />
              </h3>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              {deviceData ? (
                <ul className="space-y-4">
                  {Object.entries(deviceData).map(([key, value]) => (
                    <li key={key} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></div>
                        <span className="text-sm capitalize">{key}</span>
                      </div>
                      <span className="font-mono text-sm font-semibold">
                        {value}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center">
                    <Search size={32} />
                  </div>
                  <p className="font-medium">Awaiting localization results...</p>
                </div>
              )}
            </div>
          </section>

          {/* Map Section */}
          <section className="rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold">Device Geolocation</h3>
            </div>
            <div className="flex-1 relative">
              {deviceData ? (
                <InteractiveMap lat={deviceData.latitude} lng={deviceData.longitude} />
              ) : (
                <div className="w-full h-full flex items-center justify-center overflow-hidden">
                   <div className="relative scale-150 grayscale opacity-20 pointer-events-none">
                     <MapPin size={120} className="" />
                   </div>
                   <p className="absolute font-semibold uppercase tracking-widest text-xs">Waiting for coordinates</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="py-6 px-4 text-center">
        <p className="text-[10px] max-w-2xl mx-auto leading-relaxed uppercase tracking-tight">
          Obtained data will be available in the section "Geolocation" of the Dashboard. 
          All the information about our customers is stored on the resource servers in encrypted form. 
          This tool is for educational simulation purposes only.
        </p>
      </footer>
      </div>
            {/* Here Moblie card */}
      <div className="order-2  sm:order-1">
        <RelatedTools currentTool="Utility" />
      </div>
    </div>
  );
};

export default PhoneNumber;
