"use client";

import { useState } from "react";
import { 
  Users, Tags, Plus, Search, Shield, UserCheck, UserX,
  ChevronDown, X, Check, Trash2, Edit2
} from "lucide-react";

type UserRecord = {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Contributor" | "Viewer";
  status: "Active" | "Deactivated";
  lastLogin: string;
};

const MOCK_USERS: UserRecord[] = [
  { id: 1, name: "Dr. Amara Osei", email: "a.osei@mak.ac.ug", role: "Admin", status: "Active", lastLogin: "2 hours ago" },
  { id: 2, name: "Joseph Kimani", email: "j.kimani@uon.ac.ke", role: "Contributor", status: "Active", lastLogin: "1 day ago" },
  { id: 3, name: "Takeshi Nakamura", email: "t.nakamura@jica.go.jp", role: "Contributor", status: "Active", lastLogin: "3 hours ago" },
  { id: 4, name: "Mary Banda", email: "m.banda@makerere.ac.ug", role: "Contributor", status: "Active", lastLogin: "5 hours ago" },
  { id: 5, name: "Peter Odhiambo", email: "p.odhiambo@cgiar.org", role: "Contributor", status: "Active", lastLogin: "1 day ago" },
  { id: 6, name: "Sarah Wambui", email: "s.wambui@ku.ac.ke", role: "Contributor", status: "Active", lastLogin: "4 days ago" },
  { id: 7, name: "Fatima Diallo", email: "f.diallo@africa-union.org", role: "Viewer", status: "Active", lastLogin: "2 weeks ago" },
  { id: 8, name: "Hans Schmidt", email: "h.schmidt@giz.de", role: "Viewer", status: "Deactivated", lastLogin: "3 months ago" },
];

const SDG_CATEGORIES = [
  { id: 1, name: "SDG 3: Good Health", count: 2847 },
  { id: 2, name: "SDG 4: Quality Education", count: 634 },
  { id: 3, name: "SDG 13: Climate Action", count: 610 },
];

const PRIORITY_AREAS = [
  { id: 1, name: "Addressing Barriers for Accessible Healthcare", sdg: "SDG 3", count: 892 },
  { id: 2, name: "Communicable Diseases", sdg: "SDG 3", count: 1245 },
  { id: 3, name: "Global Health Security", sdg: "SDG 3", count: 710 },
  { id: 4, name: "Digital Infrastructure", sdg: "SDG 4", count: 401 },
  { id: 5, name: "Curriculum Reform", sdg: "SDG 4", count: 233 },
  { id: 6, name: "Food Security", sdg: "SDG 13", count: 378 },
  { id: 7, name: "Renewable Energy Transition", sdg: "SDG 13", count: 232 },
];

const DOC_TYPES = [
  { id: 1, name: "Primary Study", count: 2614 },
  { id: 2, name: "Systematic Review", count: 847 },
  { id: 3, name: "Policy Brief", count: 413 },
  { id: 4, name: "Rapid Response", count: 217 },
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"users" | "categories">("users");
  const [userSearch, setUserSearch] = useState("");
  const [users, setUsers] = useState(MOCK_USERS);
  const [editingRole, setEditingRole] = useState<number | null>(null);
  const [newCategoryInput, setNewCategoryInput] = useState<string | null>(null);
  const [newCategoryValue, setNewCategoryValue] = useState("");

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const toggleUserStatus = (id: number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Deactivated" as const : "Active" as const } : u));
  };

  const changeRole = (id: number, role: "Admin" | "Contributor" | "Viewer") => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u));
    setEditingRole(null);
  };

  return (
    <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-10 py-8 lg:py-10">
      
      {/* Header */}
      <div className="mb-6">
        <span className="font-mono text-[10px] tracking-[2px] text-muted-foreground uppercase block mb-1">Platform Console</span>
        <h1 className="font-serif text-[28px] lg:text-[32px] font-bold text-foreground leading-tight">System Settings</h1>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-1 bg-muted/30 rounded-lg p-1 border border-border mb-8 w-fit">
        <button
          onClick={() => setActiveTab("users")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium transition-all cursor-pointer ${
            activeTab === "users" ? "bg-card text-foreground shadow-sm border border-border" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="w-4 h-4" />
          User Management
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium transition-all cursor-pointer ${
            activeTab === "categories" ? "bg-card text-foreground shadow-sm border border-border" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Tags className="w-4 h-4" />
          Categories
        </button>
      </div>

      {/* ══════════ TAB 1: USER MANAGEMENT ══════════ */}
      {activeTab === "users" && (
        <div className="bg-card border-[1.5px] border-border rounded-xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="font-serif text-[18px] font-bold text-foreground">Users</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
                <input 
                  type="text" 
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                  placeholder="Search users..."
                  className="bg-background border-[1.5px] border-border rounded-lg pl-9 pr-4 py-2 text-[13px] w-[200px] outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground/40"
                />
              </div>
              <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-[12px] font-semibold hover:bg-[#e8a855] transition-all cursor-pointer">
                <Plus className="w-3.5 h-3.5" />
                Invite User
              </button>
            </div>
          </div>

          {/* Users Table */}
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="text-left px-6 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase">User</th>
                <th className="text-left px-4 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase hidden md:table-cell">Email</th>
                <th className="text-left px-4 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase">Role</th>
                <th className="text-left px-4 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase hidden lg:table-cell">Status</th>
                <th className="text-left px-4 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase hidden lg:table-cell">Last Login</th>
                <th className="text-right px-6 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-border/60 hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <span className="font-serif font-bold text-[11px] text-primary">{user.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <span className="text-[13px] font-medium text-foreground">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="font-mono text-[11px] text-muted-foreground">{user.email}</span>
                  </td>
                  <td className="px-4 py-4 relative">
                    <button 
                      onClick={() => setEditingRole(editingRole === user.id ? null : user.id)}
                      className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[1px] uppercase px-2.5 py-1 rounded-full font-medium border cursor-pointer transition-all ${
                        user.role === "Admin" ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20" 
                        : user.role === "Contributor" ? "bg-forest/10 text-forest border-forest/20 hover:bg-forest/20"
                        : "bg-muted/30 text-muted-foreground border-border hover:bg-muted/50"
                      }`}
                    >
                      {user.role === "Admin" ? <Shield className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                      {user.role}
                      <ChevronDown className="w-2.5 h-2.5 opacity-50" />
                    </button>
                    {/* Role Dropdown */}
                    {editingRole === user.id && (
                      <div className="absolute top-full left-4 mt-1 z-20 bg-card border-[1.5px] border-border rounded-xl shadow-lg py-1 w-[160px]">
                        {(["Admin", "Contributor", "Viewer"] as const).map(role => (
                          <button
                            key={role}
                            onClick={() => changeRole(user.id, role)}
                            className={`w-full text-left px-4 py-2 text-[12px] font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                              user.role === role ? "text-primary bg-primary/5" : "text-foreground hover:bg-muted/30"
                            }`}
                          >
                            {user.role === role && <Check className="w-3 h-3 text-primary" />}
                            {role}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${user.status === "Active" ? "text-forest" : "text-muted-foreground"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-forest" : "bg-muted-foreground/30"}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="font-mono text-[11px] text-muted-foreground/60">{user.lastLogin}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => toggleUserStatus(user.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium border cursor-pointer transition-all ${
                        user.status === "Active" 
                          ? "text-rose border-rose/20 hover:bg-rose hover:text-white hover:border-rose"
                          : "text-forest border-forest/20 hover:bg-forest hover:text-white hover:border-forest"
                      }`}
                    >
                      {user.status === "Active" ? <UserX className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                      {user.status === "Active" ? "Deactivate" : "Reactivate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ══════════ TAB 2: CATEGORY MANAGEMENT ══════════ */}
      {activeTab === "categories" && (
        <div className="space-y-8">
          
          {/* SDGs */}
          <div className="bg-card border-[1.5px] border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="font-serif text-[18px] font-bold text-foreground">Sustainable Development Goals</h2>
              <button 
                onClick={() => setNewCategoryInput(newCategoryInput === "sdg" ? null : "sdg")}
                className="flex items-center gap-1.5 text-[12px] font-medium text-primary hover:text-[#e8a855] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add SDG
              </button>
            </div>
            <div className="divide-y divide-border/60">
              {newCategoryInput === "sdg" && (
                <div className="px-6 py-3 flex items-center gap-3 bg-primary/5">
                  <input 
                    type="text" value={newCategoryValue} onChange={e => setNewCategoryValue(e.target.value)}
                    className="flex-1 bg-background border-[1.5px] border-primary/30 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-primary text-foreground placeholder:text-muted-foreground/40"
                    placeholder="e.g., SDG 6: Clean Water"
                    autoFocus
                  />
                  <button className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-[#e8a855] transition-all cursor-pointer"><Check className="w-4 h-4" /></button>
                  <button onClick={() => { setNewCategoryInput(null); setNewCategoryValue(""); }} className="p-2 rounded-lg hover:bg-muted/40 text-muted-foreground cursor-pointer"><X className="w-4 h-4" /></button>
                </div>
              )}
              {SDG_CATEGORIES.map(cat => (
                <div key={cat.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-muted/5 transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${
                      cat.name.includes("3") ? "bg-forest" : cat.name.includes("4") ? "bg-primary" : "bg-sky"
                    }`} />
                    <span className="text-[13px] font-medium text-foreground">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-muted-foreground/50">{cat.count.toLocaleString()} records</span>
                    <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-muted/40 text-muted-foreground transition-all cursor-pointer"><Edit2 className="w-3 h-3" /></button>
                    <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-rose/10 text-rose/50 hover:text-rose transition-all cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Areas */}
          <div className="bg-card border-[1.5px] border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="font-serif text-[18px] font-bold text-foreground">Priority Areas</h2>
              <button 
                onClick={() => setNewCategoryInput(newCategoryInput === "pa" ? null : "pa")}
                className="flex items-center gap-1.5 text-[12px] font-medium text-primary hover:text-[#e8a855] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Area
              </button>
            </div>
            <div className="divide-y divide-border/60">
              {newCategoryInput === "pa" && (
                <div className="px-6 py-3 flex items-center gap-3 bg-primary/5">
                  <input type="text" value={newCategoryValue} onChange={e => setNewCategoryValue(e.target.value)}
                    className="flex-1 bg-background border-[1.5px] border-primary/30 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-primary text-foreground placeholder:text-muted-foreground/40"
                    placeholder="e.g., Climate Finance" autoFocus
                  />
                  <button className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-[#e8a855] transition-all cursor-pointer"><Check className="w-4 h-4" /></button>
                  <button onClick={() => { setNewCategoryInput(null); setNewCategoryValue(""); }} className="p-2 rounded-lg hover:bg-muted/40 text-muted-foreground cursor-pointer"><X className="w-4 h-4" /></button>
                </div>
              )}
              {PRIORITY_AREAS.map(pa => (
                <div key={pa.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-muted/5 transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-medium text-foreground">{pa.name}</span>
                    <span className={`font-mono text-[9px] tracking-[1px] uppercase px-2 py-0.5 rounded-[4px] border font-medium ${
                      pa.sdg.includes("3") ? "bg-forest/10 text-forest border-forest/20"
                      : pa.sdg.includes("4") ? "bg-primary/10 text-primary border-primary/20"
                      : "bg-sky/10 text-sky border-sky/20"
                    }`}>{pa.sdg}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-muted-foreground/50">{pa.count.toLocaleString()}</span>
                    <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-muted/40 text-muted-foreground transition-all cursor-pointer"><Edit2 className="w-3 h-3" /></button>
                    <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-rose/10 text-rose/50 hover:text-rose transition-all cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Document Types */}
          <div className="bg-card border-[1.5px] border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="font-serif text-[18px] font-bold text-foreground">Document Types</h2>
              <button 
                onClick={() => setNewCategoryInput(newCategoryInput === "dt" ? null : "dt")}
                className="flex items-center gap-1.5 text-[12px] font-medium text-primary hover:text-[#e8a855] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Type
              </button>
            </div>
            <div className="divide-y divide-border/60">
              {newCategoryInput === "dt" && (
                <div className="px-6 py-3 flex items-center gap-3 bg-primary/5">
                  <input type="text" value={newCategoryValue} onChange={e => setNewCategoryValue(e.target.value)}
                    className="flex-1 bg-background border-[1.5px] border-primary/30 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-primary text-foreground placeholder:text-muted-foreground/40"
                    placeholder="e.g., Meta-Analysis" autoFocus
                  />
                  <button className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-[#e8a855] transition-all cursor-pointer"><Check className="w-4 h-4" /></button>
                  <button onClick={() => { setNewCategoryInput(null); setNewCategoryValue(""); }} className="p-2 rounded-lg hover:bg-muted/40 text-muted-foreground cursor-pointer"><X className="w-4 h-4" /></button>
                </div>
              )}
              {DOC_TYPES.map(dt => (
                <div key={dt.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-muted/5 transition-colors group">
                  <span className="text-[13px] font-medium text-foreground">{dt.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-muted-foreground/50">{dt.count.toLocaleString()} records</span>
                    <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-muted/40 text-muted-foreground transition-all cursor-pointer"><Edit2 className="w-3 h-3" /></button>
                    <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-rose/10 text-rose/50 hover:text-rose transition-all cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
