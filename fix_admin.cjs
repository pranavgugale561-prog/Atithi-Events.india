const fs = require("fs");
let code = fs.readFileSync("src/pages/Admin.jsx", "utf8");

// Remove the broken JourneyTab and everything up to the switch cases
// Wait, the broken JourneyTab is currently in the file.
// Let's find exactly where it starts: "// Journey Carousel Tab"
const startIndex = code.indexOf("// Journey Carousel Tab");
const endIndex = code.indexOf("case 'activity':");

if (startIndex !== -1 && endIndex !== -1) {
  code = code.substring(0, startIndex) + `
// Journey Carousel Tab
function JourneyTab({ images, refreshData }) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      let uploadedUrl = "";
      if (file.type.startsWith('video/')) {
        const { uploadMediaToStorage } = await import('../utils/services');
        uploadedUrl = await uploadMediaToStorage(file);
      } else {
        const { imageToCompressedBase64 } = await import('../utils/services');
        uploadedUrl = await imageToCompressedBase64(file, 800, 0.8);
      }
      
      const { addJourneyImage } = await import('../utils/services');
      await addJourneyImage({ url: uploadedUrl, order: images?.length || 0 });
      await refreshData();
    } catch (err) {
      console.error(err);
      alert('Failed to upload media. Ensure Firebase is configured correctly.');
    }
    setLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this image?')) {
      const { deleteJourneyImage } = await import('../utils/services');
      await deleteJourneyImage(id);
      await refreshData();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', margin: 0 }}>Hero Banner Images</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', margin: 0 }}>Manage moving carousel images below hero section.</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{ background: 'var(--accent-gold)', color: '#000', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Add Image / Video'}
        </button>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleUpload} accept="image/*,video/*" style={{ display: 'none' }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: 10 }}>
        {(images || []).map((img) => {
          const isVideo = typeof img.url === 'string' && (img.url.match(/\\.(mp4|webm|mov)$/i) || img.url.includes('video%2F'));
          return (
            <div key={img.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
              <div style={{ aspectRatio: '3/2', background: '#000' }}>
                {isVideo ? (
                  <video src={img.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} autoPlay loop muted playsInline />
                ) : (
                  <img src={img.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Carousel" />
                )}
              </div>
              <button 
                onClick={() => handleDelete(img.id)}
                style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.6)', border: 'none', color: '#ff4444', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                Delete
              </button>
            </div>
          );
        })}
        {(!images || images.length === 0) && (
          <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.3)', gridColumn: '1 / -1', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 12 }}>
            No images in carousel. Click "Add Image / Video" to add one.
          </div>
        )}
      </div>
    </div>
  );
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState([]);
  const [services, setServices] = useState([]);
  const [activities, setActivities] = useState([]);
  const [artists, setArtists] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const [journeyImages, setJourneyImages] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [reels, setReels] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [activity, setActivity] = useState([]);
  const [globalTraffic, setGlobalTraffic] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const refreshData = async () => {
    try {
      // Use individual try-catch to prevent one failure from blocking all data
      const fetchLeads = async () => { try { return await getLeads(); } catch(e) { console.error('Leads fail', e); return []; } };
      const fetchServices = async () => { try { return await getServices(); } catch(e) { console.error('Services fail', e); return []; } };
      const fetchActivities = async () => { try { return await getActivities(); } catch(e) { console.error('Activities fail', e); return []; } };
      const fetchArtists = async () => { try { return await getArtists(); } catch(e) { console.error('Artists fail', e); return []; } };
      const fetchHeroImages = async () => { try { return await getHeroImages(); } catch(e) { console.error('HeroImages fail', e); return []; } };
      const fetchJourneyImages = async () => { try { return await getJourneyImages(); } catch(e) { console.error('JourneyImages fail', e); return []; } };
      const fetchReels = async () => { try { return await getReels(); } catch(e) { console.error('Reels fail', e); return []; } };
      const fetchTimeline = async () => { try { return await getTimelineEvents(); } catch(e) { console.error('Timeline fail', e); return []; } };
      const fetchActivity = async () => { try { return await getActivityLog(); } catch(e) { console.error('Activity fail', e); return []; } };
      const fetchCustomers = async () => { try { return await getCustomers(); } catch(e) { console.error('Customers fail', e); return []; } };
      
      const [l, s, act, art, hi, ji, rls, tl, a, c] = await Promise.all([
        fetchLeads(),
        fetchServices(),
        fetchActivities(),
        fetchArtists(),
        fetchHeroImages(),
        fetchJourneyImages(),
        fetchReels(),
        fetchTimeline(),
        fetchActivity(),
        fetchCustomers()
      ]);
      setLeads(l);
      setCustomers(c);
      setServices(s);
      setActivities(act);
      setArtists(art);
      setHeroImages(hi);
      setJourneyImages(ji);
      setReels(rls);
      setTimeline(tl);
      setActivity(a);
      setGlobalTraffic({ today: 0, thisWeek: 0, total: 0 }); // Fallback
    } catch (error) {
      console.error('Failed to fetch admin data', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData().then(() => setLoading(false));
  }, []);

  const renderTab = () => {
    switch(activeTab) {
      case 'dashboard': return <DashboardTab leads={leads} customers={customers} globalTraffic={globalTraffic} />;
      case 'leads':     return <LeadsTab leads={leads} refreshData={refreshData} />;
      case 'customers': return <CustomersTab customers={customers} refreshData={refreshData} />;
      ` + code.substring(endIndex);
}

fs.writeFileSync("src/pages/Admin.jsx", code);
