"use client";

import { useState } from "react";
import { ChevronRight, Camera, Bell, Shield, Mail, Save, Trash2 } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Dr. Amara Osei",
    email: "a.osei@mak.ac.ug",
    institution: "Makerere University",
    department: "School of Public Health",
    bio: "Researcher in maternal and child health with a focus on health systems strengthening across East Africa. Contributing to evidence synthesis for policy reform.",
  });

  const [notifications, setNotifications] = useState({
    approvals: true,
    rejections: true,
    weeklyDigest: false,
    aiSummaries: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-10 py-8 lg:py-10">

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Link href="/dashboard" className="font-mono text-[10px] tracking-[2px] text-muted-foreground uppercase hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
          <span className="font-mono text-[10px] tracking-[2px] text-primary uppercase">Settings</span>
        </div>
        <h1 className="font-serif text-[28px] font-bold text-foreground leading-tight">
          Account Settings
        </h1>
      </div>

      {/* Profile Section */}
      <div className="bg-card border-[1.5px] border-border rounded-xl overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-border flex items-center gap-2">
          <Shield className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-serif text-[18px] font-bold text-foreground">Profile</h2>
        </div>
        <div className="p-6 lg:p-8">
          {/* Avatar */}
          <div className="flex items-center gap-5 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-primary/15 border-2 border-primary/20 flex items-center justify-center relative group cursor-pointer">
              <span className="font-serif font-bold text-[24px] text-primary">AO</span>
              <div className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <p className="font-medium text-[15px] text-foreground">{profile.name}</p>
              <p className="font-mono text-[11px] text-muted-foreground mt-0.5">{profile.email}</p>
              <button className="text-[12px] text-primary font-medium mt-1.5 hover:text-[#e8a855] transition-colors cursor-pointer">
                Change avatar
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block font-mono text-[10px] tracking-[2px] text-muted-foreground uppercase mb-2">Full Name</label>
              <input 
                type="text" 
                value={profile.name} 
                onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                className="w-full bg-background border-[1.5px] border-border rounded-lg px-4 py-3 text-[14px] text-foreground outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Email + Institution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[10px] tracking-[2px] text-muted-foreground uppercase mb-2">Email</label>
                <input 
                  type="email" 
                  value={profile.email} 
                  onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                  className="w-full bg-background border-[1.5px] border-border rounded-lg px-4 py-3 text-[14px] text-foreground outline-none focus:border-primary transition-colors font-mono text-[13px]"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] tracking-[2px] text-muted-foreground uppercase mb-2">Institution</label>
                <input 
                  type="text" 
                  value={profile.institution} 
                  onChange={e => setProfile(p => ({ ...p, institution: e.target.value }))}
                  className="w-full bg-background border-[1.5px] border-border rounded-lg px-4 py-3 text-[14px] text-foreground outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block font-mono text-[10px] tracking-[2px] text-muted-foreground uppercase mb-2">Department</label>
              <input 
                type="text" 
                value={profile.department} 
                onChange={e => setProfile(p => ({ ...p, department: e.target.value }))}
                className="w-full bg-background border-[1.5px] border-border rounded-lg px-4 py-3 text-[14px] text-foreground outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block font-mono text-[10px] tracking-[2px] text-muted-foreground uppercase mb-2">Bio</label>
              <textarea 
                value={profile.bio} 
                onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                rows={3}
                className="w-full bg-background border-[1.5px] border-border rounded-lg px-4 py-3 text-[14px] text-foreground outline-none focus:border-primary transition-colors resize-y leading-relaxed"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-card border-[1.5px] border-border rounded-xl overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-border flex items-center gap-2">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-serif text-[18px] font-bold text-foreground">Notifications</h2>
        </div>
        <div className="divide-y divide-border/60">
          {[
            { key: "approvals", icon: Mail, label: "Submission Approved", desc: "Get notified when your evidence is approved and published." },
            { key: "rejections", icon: Mail, label: "Submission Rejected", desc: "Get notified with reviewer feedback when a submission is rejected." },
            { key: "weeklyDigest", icon: Bell, label: "Weekly Digest", desc: "Receive a weekly summary of your submission stats and library activity." },
            { key: "aiSummaries", icon: Bell, label: "AI Summary Activity", desc: "Get notified when users generate AI summaries of your published evidence." },
          ].map(item => (
            <div key={item.key} className="px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="p-2 rounded-lg bg-muted/30 border border-border mt-0.5 shrink-0">
                  <item.icon className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-foreground">{item.label}</p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
              <button 
                onClick={() => setNotifications(n => ({ ...n, [item.key]: !n[item.key as keyof typeof n] }))}
                className={`relative w-11 h-6 rounded-full transition-all duration-300 shrink-0 cursor-pointer ${
                  notifications[item.key as keyof typeof notifications] 
                    ? "bg-forest" 
                    : "bg-muted/60 border border-border"
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-300 ${
                  notifications[item.key as keyof typeof notifications] ? "left-[22px]" : "left-0.5"
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card border-[1.5px] border-rose/20 rounded-xl overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-rose/10 bg-rose/5">
          <h2 className="font-serif text-[18px] font-bold text-rose">Danger Zone</h2>
        </div>
        <div className="px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[13px] font-medium text-foreground">Delete Account</p>
            <p className="text-[12px] text-muted-foreground mt-0.5">Permanently delete your account and all associated data. This action cannot be undone.</p>
          </div>
          <button className="flex items-center gap-2 bg-transparent text-rose border-[1.5px] border-rose/30 px-4 py-2.5 rounded-lg text-[12px] font-medium hover:bg-rose hover:text-white hover:border-rose transition-all cursor-pointer shrink-0">
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="font-mono text-[11px] text-forest flex items-center gap-1.5 animate-in fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-forest" />
            Changes saved
          </span>
        )}
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-[13px] font-semibold hover:bg-[#e8a855] transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
