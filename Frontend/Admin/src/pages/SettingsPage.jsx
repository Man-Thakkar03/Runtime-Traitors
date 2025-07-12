import React, { useState } from "react";

const initialSettings = {
  // Admin Profile
  adminName: "Admin User",
  adminEmail: "admin@xyz.com",
  profilePhoto: null,
  twoFactor: false,
  // Platform Access
  userRegistration: true,
  emailVerification: true,
  rateLimiting: true,
  maintenanceMode: false,
  // Moderation
  manualQuestionApproval: false,
  manualAnswerApproval: false,
  autoHideDownvotes: true,
  downvoteThreshold: 5,
  filterKeywords: "spam, abuse",
  // Editor
  emojiSupport: true,
  imageUploads: true,
  externalLinks: true,
  autoSaveDrafts: true,
  // Reporting & Analytics
  realTimeTracking: true,
  downloadableReports: false,
  timeZone: "UTC",
};

const timeZones = ["UTC", "IST", "EST", "PST", "CET"];

const SettingsPage = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [password, setPassword] = useState("");
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle profile photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setSettings((prev) => ({ ...prev, profilePhoto: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle password change (for demo, just clear input)
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    alert("Password changed!");
    setPassword("");
  };

  // Handle save settings (for demo)
  const handleSave = (e) => {
    e.preventDefault();
    alert("Settings saved!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
      <form onSubmit={handleSave} className="space-y-8">
        {/* Admin Profile Settings */}
        <section className="bg-[#23263A] rounded-xl p-6 shadow space-y-4">
          <h2 className="text-xl font-semibold text-white mb-2">Admin Profile</h2>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div>
              <label className="block text-gray-300 mb-1">Profile Photo</label>
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="text-white" />
              {profilePhotoPreview && (
                <img src={profilePhotoPreview} alt="Profile Preview" className="mt-2 w-20 h-20 rounded-full object-cover border-2 border-purple-500" />
              )}
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div>
                <label className="block text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  name="adminName"
                  value={settings.adminName}
                  onChange={handleChange}
                  className="bg-[#181A20] text-white rounded px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="adminEmail"
                  value={settings.adminEmail}
                  onChange={handleChange}
                  className="bg-[#181A20] text-white rounded px-3 py-2 w-full"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-gray-300 mb-1">Change Password</label>
              <form onSubmit={handlePasswordSubmit} className="flex gap-2">
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="New password"
                  className="bg-[#181A20] text-white rounded px-3 py-2 w-full"
                />
                <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
                  Update
                </button>
              </form>
            </div>
          </div>
          <div>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                name="twoFactor"
                checked={settings.twoFactor}
                onChange={handleChange}
                className="accent-purple-600"
              />
              <span className="text-gray-300">Enable Two-Factor Authentication</span>
            </label>
          </div>
        </section>

        {/* Platform Access Controls */}
        <section className="bg-[#23263A] rounded-xl p-6 shadow space-y-4">
          <h2 className="text-xl font-semibold text-white mb-2">Platform Access Controls</h2>
          <div className="flex flex-wrap gap-6">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="userRegistration" checked={settings.userRegistration} onChange={handleChange} className="accent-purple-600" />
              <span className="text-gray-300">Enable User Registration</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="emailVerification" checked={settings.emailVerification} onChange={handleChange} className="accent-purple-600" />
              <span className="text-gray-300">Require Email Verification on Signup</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="rateLimiting" checked={settings.rateLimiting} onChange={handleChange} className="accent-purple-600" />
              <span className="text-gray-300">Enable Login Rate Limiting (5 tries/10 mins)</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleChange} className="accent-purple-600" />
              <span className="text-gray-300">Enable Maintenance Mode</span>
            </label>
          </div>
        </section>

        {/* Moderation Settings */}
        <section className="bg-[#23263A] rounded-xl p-6 shadow space-y-4">
          <h2 className="text-xl font-semibold text-white mb-2">Moderation Settings</h2>
          <div className="flex flex-wrap gap-6">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="manualQuestionApproval" checked={settings.manualQuestionApproval} onChange={handleChange} className="accent-purple-600" />
              <span className="text-gray-300">Require Manual Approval for New Questions</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="manualAnswerApproval" checked={settings.manualAnswerApproval} onChange={handleChange} className="accent-purple-600" />
              <span className="text-gray-300">Require Manual Approval for New Answers</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="autoHideDownvotes" checked={settings.autoHideDownvotes} onChange={handleChange} className="accent-purple-600" />
              <span className="text-gray-300">Auto-hide Posts with More Than</span>
              <input
                type="number"
                name="downvoteThreshold"
                value={settings.downvoteThreshold}
                onChange={handleChange}
                min={1}
                className="bg-[#181A20] text-white rounded px-2 py-1 w-16"
              />
              <span className="text-gray-300">Downvotes</span>
            </label>
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Keywords for Automatic Content Filtering (comma separated)</label>
            <input
              type="text"
              name="filterKeywords"
              value={settings.filterKeywords}
              onChange={handleChange}
              className="bg-[#181A20] text-white rounded px-3 py-2 w-full"
            />
          </div>
        </section>

        {/* Editor Settings */}
        <section className="bg-[#23263A] rounded-xl p-6 shadow space-y-4">
          <h2 className="text-xl font-semibold text-white mb-2">Editor Settings</h2>
          <div className="flex flex-wrap gap-6">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="emojiSupport" checked={settings.emojiSupport} onChange={handleChange} className="accent-purple-600" />
              <span className="text-gray-300">Enable Emoji Support</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="imageUploads" checked={settings.imageUploads} onChange={handleChange} className="accent-purple-600" />
              <span className="text-gray-300">Allow Image Uploads</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="externalLinks" checked={settings.externalLinks} onChange={handleChange} className="accent-purple-600" />
              <span className="text-gray-300">Allow External Links in Posts</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="autoSaveDrafts" checked={settings.autoSaveDrafts} onChange={handleChange} className="accent-purple-600" />
              <span className="text-gray-300">Enable Auto-Save Drafts</span>
            </label>
          </div>
        </section>

        {/* Reporting & Analytics Config */}
        <section className="bg-[#23263A] rounded-xl p-6 shadow space-y-4">
          <h2 className="text-xl font-semibold text-white mb-2">Reporting & Analytics</h2>
          <div className="flex flex-wrap gap-6">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="realTimeTracking" checked={settings.realTimeTracking} onChange={handleChange} className="accent-purple-600" />
              <span className="text-gray-300">Enable Real-Time User Activity Tracking</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="downloadableReports" checked={settings.downloadableReports} onChange={handleChange} className="accent-purple-600" />
              <span className="text-gray-300">Enable Downloadable Usage Reports (CSV/PDF)</span>
            </label>
            <div>
              <label className="text-gray-300 mr-2">Time Zone:</label>
              <select
                name="timeZone"
                value={settings.timeZone}
                onChange={handleChange}
                className="bg-[#181A20] text-white rounded px-3 py-1"
              >
                {timeZones.map((tz) => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-semibold">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;