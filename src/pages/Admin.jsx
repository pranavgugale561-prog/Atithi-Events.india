import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Briefcase, BarChart3, FileText, Users, LogOut,
  Plus, Pencil, Trash2, Save, X, Eye, Clock, TrendingUp, Activity,
  Hotel, Truck, Instagram, Palette, ChefHat, Camera, Music, MapPin,
  Star, Gem, Flower2, PartyPopper, Gift, ImagePlus, Phone, Mail,
  Calendar, Wifi, Globe, Shield, CheckCircle, AlertCircle, Zap, MessageSquare
} from 'lucide-react';
import { getServices, addService, updateService, deleteService, getLeads, deleteLead, imageToCompressedBase64 } from '../utils/services';
import { getActivityLog, clearActivityLog } from '../utils/activityLog';
import { getTrafficData } from '../hooks/useTraffic';
import { trackEvent } from '../firebase';

const ICON_OPTIONS = [
  'hotel', 'truck', 'instagram', 'palette', 'chefHat', 'camera',
  'music', 'mapPin', 'briefcase', 'star', 'gem', 'flower', 'party', 'gift'
];

const ICON_MAP = {
  hotel: Hotel, truck: Truck, instagram: Instagram, palette: Palette,
  chefHat: ChefHat, camera: Camera, music: Music, mapPin: MapPin,
  briefcase: Briefcase, star: Star, gem: Gem, flower: Flower2,
  party: PartyPopper, gift: Gift
};

const SPAN_OPTIONS = ['', 'span-2', 'span-3', 'span-2 row-2'];

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'leads',    label: 'Leads',      icon: Users },
  { id: 'traffic',  label: 'Traffic',    icon: BarChart3 },
  { id: 'security', label: 'Security',   icon: Shield },
  { id: 'activity', label: 'Activity',   icon: Activity },
  { id: 'services', label: 'Services',   icon: Briefcase },
];

// ─── Stat Card ────────────────────────────────────
function StatCard({ icon: Icon, value, label, color, sub }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        border: `1px solid ${color}33`,
        borderRadius: 16,
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: -20, right: -20,
        width: 80, height: 80, borderRadius: '50%',
        background: `${color}15`,
      }} />
      <div style={{
        width: 40, height: 40, borderRadius: 12,
        background: `${color}20`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={20} color={color} />
      </div>
      <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{label}</div>
      {sub && <div style={{ fontSize: '0.72rem', color }}>{sub}</div>}
    </motion.div>
  );
}

// ─── Dashboard Tab ────────────────────────────────
function DashboardTab({ setActiveTab, leads, loading, activity = [] }) {
  const traffic = getTrafficData();
  const recentLeads = leads.slice(0, 3);
  const recentLog   = activity.slice(0, 5);
  const todayKey    = new Date().toISOString().slice(0, 10);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>
          Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'} 👋
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
          Here's what's happening with your Atithi Events site today.
        </p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <StatCard icon={Eye}        value={traffic.totalViews || 0}     label="Total Views"      color="#d4af37" sub={`↑ ${traffic.dailyViews?.[todayKey] || 0} today`} />
        <StatCard icon={Users}      value={traffic.uniqueVisitors || 0} label="Unique Visitors"  color="#a78bfa" />
        <StatCard icon={Zap}        value={loading ? '...' : leads.length}                label="Total Leads"      color="#34d399" sub={!loading && leads.length > 0 ? `Latest: ${leads[0]?.name}` : 'No leads yet'} />
        <StatCard icon={Clock}      value={`${traffic.avgDuration || 0}s`} label="Avg. Session"  color="#f87171" />
      </div>

      {/* IP Info Banner */}
      {traffic.lastIp && (
        <div style={{
          background: 'rgba(52,211,153,0.08)',
          border: '1px solid rgba(52,211,153,0.25)',
          borderRadius: 12,
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <Wifi size={18} color="#34d399" />
          <div>
            <span style={{ color: '#34d399', fontWeight: 600, fontSize: '0.85rem' }}>Latest Visitor IP: </span>
            <span style={{ color: '#fff', fontSize: '0.85rem', fontFamily: 'monospace' }}>{traffic.lastIp}</span>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Recent Leads */}
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>Recent Leads</h3>
            <button onClick={() => setActiveTab('leads')}
              style={{ fontSize: '0.75rem', color: '#d4af37', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
              View all
            </button>
          </div>
          {recentLeads.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px 0', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
              No leads yet
            </div>
          ) : recentLeads.map(lead => (
            <div key={lead.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem', fontWeight: 700, color: '#000', flexShrink: 0,
              }}>
                {lead.name?.[0]?.toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.85rem', margin: 0 }}>{lead.name}</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.email}</p>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>
                {new Date(lead.capturedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </span>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>Live Activity</h3>
            <button onClick={() => setActiveTab('activity')}
              style={{ fontSize: '0.75rem', color: '#d4af37', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
              View all
            </button>
          </div>
          {recentLog.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px 0', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
              No activity yet
            </div>
          ) : recentLog.map(entry => (
            <div key={entry.id} style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', marginTop: 5, flexShrink: 0,
                background: entry.type === 'lead_capture' ? '#34d399' : entry.type === 'visit' ? '#d4af37' : '#a78bfa' }} />
              <div style={{ flex: 1 }}>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', margin: 0, lineHeight: 1.4 }}>{entry.detail}</p>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', margin: 0 }}>
                  {new Date(entry.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Leads Tab ────────────────────────────────────
function LeadsTab({ leads, refreshData }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const handleDelete = async (id) => {
    await deleteLead(id);
    await refreshData();
    if (selected?.id === id) setSelected(null);
  };

  const filtered = leads.filter(l =>
    l.name?.toLowerCase().includes(search.toLowerCase()) ||
    l.email?.toLowerCase().includes(search.toLowerCase()) ||
    l.phone?.includes(search)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', margin: 0 }}>Leads</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', margin: 0 }}>
            {leads.length} total lead{leads.length !== 1 ? 's' : ''} captured
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '8px 14px' }}>
            <Eye size={14} color="rgba(255,255,255,0.4)" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search leads…"
              style={{ background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: '0.85rem', width: 160 }}
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[
          { label: 'Total Leads', value: leads.length, color: '#d4af37' },
          { label: 'With Event Date', value: leads.filter(l => l.eventDate).length, color: '#a78bfa' },
          { label: 'This Week', value: leads.filter(l => {
            const d = new Date(l.capturedAt);
            const now = new Date();
            return (now - d) < 7 * 24 * 60 * 60 * 1000;
          }).length, color: '#34d399' },
        ].map(s => (
          <div key={s.label} style={{
            background: `${s.color}10`, border: `1px solid ${s.color}30`,
            borderRadius: 12, padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'center',
          }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Leads List */}
      <div style={{ display: 'flex', gap: 16 }}>
        {/* List */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
          {filtered.length === 0 ? (
            <div style={{
              background: 'rgba(255,255,255,0.04)', borderRadius: 16,
              padding: '40px 20px', textAlign: 'center',
              border: '1px dashed rgba(255,255,255,0.1)',
            }}>
              <Users size={32} color="rgba(255,255,255,0.2)" />
              <p style={{ color: 'rgba(255,255,255,0.3)', margin: '12px 0 0', fontSize: '0.9rem' }}>
                {search ? 'No leads match your search.' : 'No leads captured yet.'}
              </p>
            </div>
          ) : filtered.map(lead => (
            <motion.div
              key={lead.id}
              onClick={() => setSelected(lead)}
              whileHover={{ x: 2 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px',
                background: selected?.id === lead.id
                  ? 'rgba(212,175,55,0.12)'
                  : 'rgba(255,255,255,0.04)',
                border: `1px solid ${selected?.id === lead.id ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: '50%',
                background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', fontWeight: 700, color: '#000', flexShrink: 0,
              }}>
                {lead.name?.[0]?.toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: '#fff', fontWeight: 600, margin: 0, fontSize: '0.9rem' }}>{lead.name}</p>
                <p style={{ color: 'rgba(255,255,255,0.45)', margin: 0, fontSize: '0.78rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {lead.email}
                </p>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                {lead.eventDate && (
                  <span style={{
                    fontSize: '0.7rem', color: '#a78bfa',
                    background: 'rgba(167,139,250,0.12)',
                    padding: '3px 8px', borderRadius: 20,
                  }}>
                    📅 {lead.eventDate}
                  </span>
                )}
                <p style={{ color: 'rgba(255,255,255,0.3)', margin: '4px 0 0', fontSize: '0.7rem' }}>
                  {new Date(lead.capturedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, x: 30, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 280 }}
              exit={{ opacity: 0, x: 30, width: 0 }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 16, padding: 20, flexShrink: 0, overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <h3 style={{ color: '#fff', fontWeight: 700, margin: 0, fontSize: '1rem' }}>Lead Details</h3>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)' }}>
                  <X size={18} />
                </button>
              </div>

              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%', margin: '0 auto 12px',
                  background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', fontWeight: 700, color: '#000',
                }}>
                  {selected.name?.[0]?.toUpperCase()}
                </div>
                <h4 style={{ color: '#fff', margin: 0, fontWeight: 600 }}>{selected.name}</h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                {[
                  { icon: Mail, label: 'Email', value: selected.email, href: `mailto:${selected.email}` },
                  { icon: Phone, label: 'Phone', value: selected.phone || '—', href: selected.phone ? `tel:${selected.phone}` : null },
                  { icon: Calendar, label: 'Event Date', value: selected.eventDate || '—' },
                  { icon: Globe, label: 'IP Address', value: selected.ip || 'Unknown' },
                  { icon: MapPin, label: 'Device', value: selected.device || 'Unknown', small: true },
                  { icon: Clock, label: 'Captured', value: new Date(selected.capturedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <item.icon size={15} color="rgba(255,255,255,0.3)" style={{ marginTop: 2, flexShrink: 0 }} />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p style={{ margin: 0, fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</p>
                      {item.href ? (
                        <a href={item.href} style={{ color: '#d4af37', fontSize: '0.83rem', textDecoration: 'none', wordBreak: 'break-all' }}>{item.value}</a>
                      ) : (
                        <p style={{ margin: 0, color: '#fff', fontSize: item.small ? '0.7rem' : '0.83rem', wordBreak: 'break-word', lineHeight: 1.3 }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {selected.phone && (
                  <a
                    href={`https://wa.me/91${selected.phone.replace(/\D/g, '')}?text=Hi ${encodeURIComponent(selected.name)}, Thank you for your interest in Atithi Events! We'd love to help you plan your dream day. 🌟`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      padding: '10px 0', borderRadius: 10,
                      background: 'linear-gradient(135deg, #25D366, #128C7E)',
                      color: '#fff', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none',
                    }}
                  >
                    <MessageSquare size={15} /> WhatsApp
                  </a>
                )}
                <a
                  href={`mailto:${selected.email}?subject=Your Atithi Events Enquiry&body=Hi ${selected.name},%0A%0AThank you for reaching out to Atithi Events! We're excited to help make your event extraordinary.%0A%0ABest regards,%0AAtithi Events Team`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '10px 0', borderRadius: 10,
                    background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.4)',
                    color: '#d4af37', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none',
                  }}
                >
                  <Mail size={15} /> Send Email
                </a>
                <button
                  onClick={() => handleDelete(selected.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '10px 0', borderRadius: 10,
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                    color: '#ef4444', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                  }}
                >
                  <Trash2 size={15} /> Delete Lead
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Traffic Tab ──────────────────────────────────
function TrafficTab() {
  const [data, setData] = useState(getTrafficData());
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = getTrafficData();
      setData(prev => JSON.stringify(prev) === JSON.stringify(newData) ? prev : newData);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const dailyEntries = Object.entries(data.dailyViews || {}).slice(-7).reverse();
  const maxBar = Math.max(...dailyEntries.map(([, v]) => v), 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', margin: 0 }}>Traffic Analytics</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }} />
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', margin: 0 }}>
            Active lifetime tracking started on {data.activeSince ? new Date(data.activeSince).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Lifetime'}
          </p>
        </div>
      </div>

      <div className="glass" style={{ padding: 20, borderRadius: 16, border: '1px solid rgba(212,175,55,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(212,175,55,0.05)' }}>
        <div>
          <h4 style={{ color: '#d4af37', margin: 0, fontSize: '0.95rem' }}>Advanced Analytics</h4>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', margin: '4px 0 0' }}>View real-time user flow and heatmaps in Firebase Console.</p>
        </div>
        <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" style={{
          padding: '8px 16px', borderRadius: 8, background: '#d4af37', color: '#000', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none'
        }}>
          Open Console
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        <StatCard icon={Eye}       value={data.totalViews || 0}      label="Lifetime Views"  color="#d4af37" sub={`${data.dailyViews?.[new Date().toISOString().slice(0,10)] || 0} today`} />
        <StatCard icon={Users}     value={data.uniqueVisitors || 0}  label="Lifetime Visitors" color="#a78bfa" />
        <StatCard icon={Clock}     value={`${data.avgDuration || 0}s`} label="Avg. Session"  color="#f87171" />
        <StatCard icon={TrendingUp} value={dailyEntries[0]?.[1] || 0} label="Views Today"   color="#34d399" />
      </div>

      {/* IP Banner */}
      {data.lastIp && (
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{
            flex: 1, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)',
            borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <Globe size={20} color="#34d399" />
            <div>
              <p style={{ margin: 0, fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Latest Visitor IP</p>
              <p style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#fff', fontFamily: 'monospace' }}>{data.lastIp}</p>
            </div>
          </div>
          <div style={{
            flex: 1, background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.25)',
            borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <Shield size={20} color="#a78bfa" />
            <div>
              <p style={{ margin: 0, fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Last Session</p>
              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>
                {data.lastVisit ? new Date(data.lastVisit).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bar Chart */}
      <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
        <h3 style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', marginBottom: 20 }}>Daily Views — Last 7 Days</h3>
        {dailyEntries.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '20px 0' }}>No data yet.</p>
        ) : (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 140 }}>
            {dailyEntries.map(([date, count]) => {
              const h = (count / maxBar) * 120;
              return (
                <div key={date} style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                  <p style={{ fontSize: '0.75rem', color: '#d4af37', fontWeight: 700, marginBottom: 4 }}>{count}</p>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: h }}
                    transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                    style={{
                      width: '100%', maxWidth: 44,
                      background: 'linear-gradient(to top, #d4af37, #ffd70088)',
                      borderRadius: '6px 6px 0 0',
                    }}
                  />
                  <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', marginTop: 6 }}>{date.slice(5)}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Security Tab ─────────────────────────────────
function SecurityTab({ leads }) {
  const data = getTrafficData();

  const ipHits = data.ipHits || {};
  const ipList = Object.entries(ipHits).map(([ip, hits]) => {
     const associatedLeads = leads.filter(l => l.ip === ip);
     return { ip, hits, leads: associatedLeads };
  }).sort((a,b) => b.hits - a.hits);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', margin: 0 }}>Security & Suspicious IPs</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', margin: 0 }}>Monitor frequent page requests and isolate spam bots.</p>
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
        <h3 style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', marginBottom: 16 }}>Request Frequency by IP</h3>
        {ipList.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '20px 0', fontSize: '0.85rem' }}>No IP tracking data available yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {ipList.map((item, i) => {
              const isSuspicious = item.hits > 50 || item.leads.length > 2;
              return (
                <div key={item.ip} style={{
                  display: 'flex', alignItems: 'center', gap: 16, padding: '12px 16px',
                  background: isSuspicious ? 'rgba(239,68,68,0.05)' : 'transparent',
                  border: isSuspicious ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 12,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', background: isSuspicious ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.05)' }}>
                    {isSuspicious ? <AlertCircle size={16} color="#ef4444" /> : <Globe size={16} color="rgba(255,255,255,0.5)" />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, color: isSuspicious ? '#ef4444' : '#fff', fontWeight: 600, fontSize: '0.9rem', fontFamily: 'monospace' }}>
                      {item.ip} {isSuspicious && <span style={{ fontSize: '0.7rem', background: '#ef4444', color: '#fff', padding: '2px 6px', borderRadius: 4, marginLeft: 8, fontFamily: 'sans-serif' }}>Suspicious</span>}
                    </p>
                    {item.leads.length > 0 && (
                      <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>
                        Associated Leads: {item.leads.map(l => l.name).join(', ')}
                      </p>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: 0, color: '#d4af37', fontSize: '1.2rem', fontWeight: 700 }}>{item.hits}</p>
                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Total Hits</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Activity Tab ──────────────────────────────────
function ActivityTab({ log, refreshData }) {
  const handleClear = async () => {
    await clearActivityLog();
    await refreshData();
  };

  const typeConfig = {
    visit:          { color: '#d4af37', label: 'Visit',      dot: '🌐' },
    lead_capture:   { color: '#34d399', label: 'New Lead',   dot: '🎯' },
    service_add:    { color: '#60a5fa', label: 'Added',      dot: '➕' },
    service_update: { color: '#a78bfa', label: 'Updated',    dot: '✏️' },
    service_delete: { color: '#f87171', label: 'Deleted',    dot: '🗑️' },
    lead_delete:    { color: '#fb923c', label: 'Lead Del.',   dot: '❌' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', margin: 0 }}>Activity Log</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', margin: 0 }}>{log.length} events recorded.</p>
        </div>
        <button
          onClick={handleClear}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 14px', borderRadius: 8,
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
            color: '#f87171', fontSize: '0.8rem', cursor: 'pointer',
          }}
        >
          <Trash2 size={14} /> Clear All
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {log.length === 0 ? (
          <div style={{
            background: 'rgba(255,255,255,0.04)', borderRadius: 16,
            padding: '40px 20px', textAlign: 'center',
            border: '1px dashed rgba(255,255,255,0.1)',
          }}>
            <Activity size={32} color="rgba(255,255,255,0.2)" />
            <p style={{ color: 'rgba(255,255,255,0.3)', margin: '12px 0 0', fontSize: '0.9rem' }}>No activity logged yet.</p>
          </div>
        ) : log.map((entry, i) => {
          const cfg = typeConfig[entry.type] || { color: '#fff', label: entry.type, dot: '●' };
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              style={{
                display: 'flex', gap: 14, padding: '12px 16px',
                background: 'rgba(255,255,255,0.04)', borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>{cfg.dot}</span>
              <div style={{ flex: 1 }}>
                <p style={{ color: '#fff', fontSize: '0.85rem', margin: 0, lineHeight: 1.4 }}>
                  {entry.detail}
                  {entry.customerName && <span style={{ color: 'var(--accent-gold)', marginLeft: 6, fontWeight: 600 }}>({entry.customerName})</span>}
                </p>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 4 }}>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem', margin: 0 }}>
                    {new Date(entry.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                  {entry.ip && (
                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>
                      IP: {entry.ip}
                    </span>
                  )}
                  {entry.device && (
                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 120 }}>
                      {entry.device}
                    </span>
                  )}
                </div>
              </div>
              <span style={{
                fontSize: '0.68rem', padding: '3px 8px', borderRadius: 20, height: 'fit-content',
                background: `${cfg.color}15`, color: cfg.color, border: `1px solid ${cfg.color}30`,
                fontWeight: 600, flexShrink: 0,
              }}>
                {cfg.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Services Tab ─────────────────────────────────
function ServicesTab({ services, refreshData }) {
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', icon: 'star', category: '', span: '', images: [] });
  const [isCompressing, setIsCompressing] = useState(false);

  const handleSave = async () => {
    if (!form.title) return;
    if (editing) { await updateService(editing, form); }
    else { await addService(form); }
    trackEvent('service_saved', { title: form.title, images_count: form.images.length, is_edit: !!editing });
    setForm({ title: '', description: '', icon: 'star', category: '', span: '', images: [] });
    setEditing(null);
    setShowForm(false);
    await refreshData();
    window.dispatchEvent(new Event('services-updated'));
  };

  const handleEdit = (service) => {
    setForm({ title: service.title, description: service.description, icon: service.icon, category: service.category, span: service.span || '', images: service.images || [] });
    setEditing(service.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => { 
    await deleteService(id); 
    await refreshData(); 
    window.dispatchEvent(new Event('services-updated'));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    if (form.images.length + files.length > 4) { alert('Maximum 4 images allowed.'); return; }
    setIsCompressing(true);
    try {
      const newImages = [];
      for (let file of files) { 
        newImages.push(await imageToCompressedBase64(file)); 
        trackEvent('image_uploaded', { name: file.name, size: file.size, type: file.type });
      }
      setForm(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    } catch { alert('Failed to compress image.'); }
    finally { setIsCompressing(false); e.target.value = null; }
  };

  const removeImage = (idx) => setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));

  const cats = [...new Set(services.map(s => s.category).filter(Boolean))];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', margin: 0 }}>Services</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', margin: 0 }}>{services.length} services across {cats.length} categories.</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditing(null); setForm({ title: '', description: '', icon: 'star', category: '', span: '', images: [] }); }}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 18px', borderRadius: 10,
            background: 'linear-gradient(135deg, #d4af37, #ffd700)',
            color: '#000', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', border: 'none',
          }}
        >
          <Plus size={16} /> Add Service
        </button>
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: 16, padding: 24,
            }}
          >
            <h3 style={{ color: '#d4af37', fontWeight: 600, fontSize: '1rem', marginBottom: 16 }}>
              {editing ? '✏️ Edit Service' : '➕ New Service'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>Title *</label>
                <input className="input-luxury" placeholder="Service title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>Category</label>
                <input className="input-luxury" placeholder="e.g. Core, Digital" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>Description</label>
                <textarea className="input-luxury" rows={3} placeholder="Service description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ resize: 'vertical' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>Icon</label>
                <select className="input-luxury" value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })}>
                  {ICON_OPTIONS.map(ico => <option key={ico} value={ico}>{ico}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>Grid Span</label>
                <select className="input-luxury" value={form.span} onChange={e => setForm({ ...form, span: e.target.value })}>
                  {SPAN_OPTIONS.map(s => <option key={s} value={s}>{s || 'Default (1 col)'}</option>)}
                </select>
              </div>
              {/* Image Upload */}
              <div style={{ gridColumn: 'span 2', background: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: 16, border: '1px dashed rgba(255,255,255,0.1)' }}>
                <label style={{ fontSize: '0.8rem', color: '#d4af37', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <ImagePlus size={15} /> Photos ({form.images.length}/4)
                </label>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {form.images.map((src, idx) => (
                    <div key={idx} style={{ position: 'relative', width: 72, height: 72, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button onClick={() => removeImage(idx)} style={{ position: 'absolute', top: 3, right: 3, background: 'rgba(0,0,0,0.7)', border: 'none', color: '#fff', borderRadius: '50%', padding: 3, cursor: 'pointer', display: 'flex' }}>
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                  {form.images.length < 4 && (
                    <div>
                      <input type="file" accept="image/*" multiple onChange={handleImageUpload} disabled={isCompressing} style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }} />
                      {isCompressing && <span style={{ fontSize: '0.75rem', color: '#f87171', marginTop: 4, display: 'block' }}>Compressing…</span>}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <button onClick={handleSave} disabled={isCompressing} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', borderRadius: 10,
                background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                color: '#000', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', border: 'none',
              }}>
                <Save size={15} /> {editing ? 'Update' : 'Save'} Service
              </button>
              <button onClick={() => { setShowForm(false); setEditing(null); }} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', borderRadius: 10,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', cursor: 'pointer',
              }}>
                <X size={15} /> Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Services list grouped by category */}
      {cats.map(cat => (
        <div key={cat}>
          <h3 style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, paddingLeft: 4 }}>{cat}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {services.filter(s => s.category === cat).map(service => {
              const Icon = ICON_MAP[service.icon] || Star;
              return (
                <div key={service.id} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px',
                  background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)',
                }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(212,175,55,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={17} color="#d4af37" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, color: '#fff', fontWeight: 600, fontSize: '0.88rem' }}>{service.title}</p>
                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{service.description}</p>
                  </div>
                  {(service.images?.length > 0) && (
                    <span style={{ fontSize: '0.7rem', color: '#a78bfa', background: 'rgba(167,139,250,0.12)', padding: '3px 8px', borderRadius: 20, flexShrink: 0 }}>
                      {service.images.length} pic{service.images.length > 1 ? 's' : ''}
                    </span>
                  )}
                  <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                    <button onClick={() => handleEdit(service)} style={{ background: 'rgba(212,175,55,0.1)', border: 'none', cursor: 'pointer', color: '#d4af37', borderRadius: 8, padding: 8, display: 'flex', alignItems: 'center' }}>
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => handleDelete(service.id)} style={{ background: 'rgba(239,68,68,0.1)', border: 'none', cursor: 'pointer', color: '#ef4444', borderRadius: 8, padding: 8, display: 'flex', alignItems: 'center' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Admin Shell ──────────────────────────────────
export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState([]);
  const [services, setServices] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const refreshData = async () => {
    try {
      const [l, s, a] = await Promise.all([
        getLeads(),
        getServices(),
        getActivityLog(),
      ]);
      setLeads(l);
      setServices(s);
      setActivity(a);
    } catch (e) {
      console.error('Data fetch failed', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('atithi_admin') !== 'true') {
      navigate('/admin/login');
      return;
    }
    refreshData();
    
    // Periodically refresh data every 10 seconds
    const interval = setInterval(refreshData, 10000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('atithi_admin');
    navigate('/admin/login');
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab setActiveTab={setActiveTab} leads={leads} loading={loading} activity={activity} />;
      case 'leads':     return <LeadsTab leads={leads} refreshData={refreshData} />;
      case 'traffic':   return <TrafficTab />;
      case 'security':  return <SecurityTab leads={leads} />;
      case 'activity':  return <ActivityTab log={activity} refreshData={refreshData} />;
      case 'services':  return <ServicesTab services={services} refreshData={refreshData} />;
      default: return null;
    }
  };

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0812 0%, #06050a 100%)',
      fontFamily: "'Inter', sans-serif", color: '#fff',
    }}>
      {/* Sidebar */}
      <aside style={{
        width: 220, background: 'rgba(255,255,255,0.03)',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', flexDirection: 'column', padding: '28px 0',
        position: 'sticky', top: 0, height: '100vh', flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: '0 20px', marginBottom: 32 }}>
          <img src="/logo.png" alt="Atithi" style={{ height: 48, borderRadius: 10, marginBottom: 10 }} />
          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Admin Panel</p>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, padding: '0 12px' }}>
          {TABS.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '11px 14px', borderRadius: 10, border: 'none',
                  background: active ? 'rgba(212,175,55,0.15)' : 'transparent',
                  color: active ? '#d4af37' : 'rgba(255,255,255,0.45)',
                  cursor: 'pointer', fontSize: '0.88rem', fontWeight: active ? 600 : 400,
                  textAlign: 'left', transition: 'all 0.15s',
                }}
              >
                <Icon size={17} />
                {tab.label}
                {active && <div style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: '#d4af37' }} />}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <button onClick={() => navigate('/')} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', borderRadius: 10, border: 'none',
            background: 'transparent', color: 'rgba(255,255,255,0.35)',
            cursor: 'pointer', fontSize: '0.85rem', textAlign: 'left',
          }}>
            <LayoutDashboard size={16} /> View Site
          </button>
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', borderRadius: 10, border: 'none',
            background: 'rgba(239,68,68,0.08)', color: '#f87171',
            cursor: 'pointer', fontSize: '0.85rem', textAlign: 'left',
          }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '36px 40px', overflowY: 'auto', maxHeight: '100vh', position: 'relative' }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={{ width: '100%' }}
          >
            {renderActiveTab()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
