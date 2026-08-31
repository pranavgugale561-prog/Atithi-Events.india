const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.jsx', 'utf8');

const journeyTabComponent = `
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
      await addJourneyImage({ url: uploadedUrl, order: images.length });
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
          {loading ? <Loader size={16} className="spin" /> : <Upload size={16} />}
          {loading ? 'Uploading...' : 'Add Image / Video'}
        </button>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleUpload} accept="image/*,video/*" style={{ display: 'none' }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: 10 }}>
        {images.map((img) => {
          const isVideo = img.url?.match(/\\.(mp4|webm|mov)$/i) || img.url?.includes('video%2F');
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
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
        {images.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.3)', gridColumn: '1 / -1', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 12 }}>
            No images in carousel. Click "Add Image / Video" to add one.
          </div>
        )}
      </div>
    </div>
  );
}

`;

code = code.replace(
  /export default function Admin\(\) \{/,
  journeyTabComponent + '\nexport default function Admin() {'
);

fs.writeFileSync('src/pages/Admin.jsx', code);
console.log('Done inserting JourneyTab!');
