'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Settings, Bell } from 'lucide-react';



export default function SettingsMain() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weeklyDigest: true,
    productUpdates: true,
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-purple-500/10">
          <Settings className="h-5 w-5 text-purple-400" />
        </div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
      </div>

      <div className="w-full space-y-8">



        <div className="space-y-6">
          <Card className="bg-[#1A1A1F] border-[#2D2D35] p-8 rounded-2xl shadow-lg">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-2">Notification Preferences</h2>
              <p className="text-gray-400">Manage how you receive notifications from our platform</p>
            </div>
            
            <div className="space-y-6 divide-y divide-[#2D2D35]">
              <div className="space-y-6 pb-6">
                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-[#23232A] transition-colors">
                  <div className="space-y-1">
                    <h3 className="font-medium text-white">Email Notifications</h3>
                    <p className="text-sm text-gray-400">Receive email notifications</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium ${notifications.email ? 'text-purple-400' : 'text-gray-500'}`}>
                      {notifications.email ? 'Enabled' : 'Disabled'}
                    </span>
                    <Switch 
                      checked={notifications.email}
                      onCheckedChange={() => handleNotificationChange('email')}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-700 data-[state=checked]:to-purple-500 data-[state=unchecked]:bg-gray-700"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-[#23232A] transition-colors">
                  <div className="space-y-1">
                    <h3 className="font-medium text-white">Push Notifications</h3>
                    <p className="text-sm text-gray-400">Receive push notifications on this device</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium ${notifications.push ? 'text-purple-400' : 'text-gray-500'}`}>
                      {notifications.push ? 'Enabled' : 'Disabled'}
                    </span>
                    <Switch 
                      checked={notifications.push}
                      onCheckedChange={() => handleNotificationChange('push')}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-700 data-[state=checked]:to-purple-500 data-[state=unchecked]:bg-gray-700"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-6 pt-6">
                <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Email Preferences</h3>
                
                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-[#23232A] transition-colors">
                  <div className="space-y-1">
                    <h3 className="font-medium text-white">Weekly Digest</h3>
                    <p className="text-sm text-gray-400">Get a weekly summary of your activity</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium ${notifications.weeklyDigest ? 'text-purple-400' : 'text-gray-500'}`}>
                      {notifications.weeklyDigest ? 'Enabled' : 'Disabled'}
                    </span>
                    <Switch 
                      checked={notifications.weeklyDigest}
                      onCheckedChange={() => handleNotificationChange('weeklyDigest')}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-700 data-[state=checked]:to-purple-500 data-[state=unchecked]:bg-gray-700"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-[#23232A] transition-colors">
                  <div className="space-y-1">
                    <h3 className="font-medium text-white">Product Updates</h3>
                    <p className="text-sm text-gray-400">Get updates about new features and improvements</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium ${notifications.productUpdates ? 'text-purple-400' : 'text-gray-500'}`}>
                      {notifications.productUpdates ? 'Enabled' : 'Disabled'}
                    </span>
                    <Switch 
                      checked={notifications.productUpdates}
                      onCheckedChange={() => handleNotificationChange('productUpdates')}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-700 data-[state=checked]:to-purple-500 data-[state=unchecked]:bg-gray-700"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-2.5 text-sm font-medium rounded-lg transition-all transform hover:scale-[1.02]"
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}