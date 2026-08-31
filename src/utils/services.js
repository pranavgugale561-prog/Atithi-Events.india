import { logActivity } from './activityLog';
import { getDB } from '../firebase';
import { activityZoneData, artistSectionData } from '../data/activitiesAndArtists';

// Since we are migrating to Firestore, we don't need these anymore
// const STORAGE_KEY = 'atithi_services';
// const VERSION_KEY = 'atithi_services_version';

const DEFAULT_SERVICES = [
  // ── Digital Services ──
  { id: 'd1', title: 'Couple Logo Design', description: 'Custom-crafted monogram and logo design for your special day — across all stationery and décor.', icon: 'gem', category: 'Digital', span: 'span-2', images: [] },
  { id: 'd2', title: 'Couple Hashtag', description: 'A unique, catchy wedding hashtag to unify all your social media moments and memories.', icon: 'hash', category: 'Digital', span: '', images: [] },
  { id: 'd3', title: 'Invite PDF Design', description: 'Beautifully crafted digital invitation PDFs — ready to share with your guest list.', icon: 'fileText', category: 'Digital', span: '', images: [] },
  { id: 'd4', title: 'Invite Video', description: 'Cinematic, animated invite videos that set the tone for your celebration.', icon: 'video', category: 'Digital', span: 'span-2', images: [] },
  { id: 'd5', title: '10 Save the Date Creatives', description: 'A collection of 10 stunning save-the-date designs for social media, WhatsApp, and print.', icon: 'image', category: 'Digital', span: '', images: [] },
  { id: 'd6', title: 'WhatsApp Invite to Guests', description: 'Personalized WhatsApp invitations sent directly to your guest list with tracking.', icon: 'messageCircle', category: 'Digital', span: '', images: [] },
  { id: 'd7', title: 'Telecalling to Guests', description: 'Professional telecalling service to confirm RSVPs and share event details with every guest.', icon: 'phone', category: 'Digital', span: 'span-2', images: [] },
  { id: 'd8', title: 'Live Telecast Wedding', description: 'Live-stream your wedding for guests who can\'t attend — professional multi-camera setup.', icon: 'radio', category: 'Digital', span: '', images: [] },
  { id: 'd9', title: 'Couple Social Media Management', description: 'Full social media handling — posts, stories, reels, and engagement for your wedding journey.', icon: 'instagram', category: 'Digital', span: '', images: [] },
  { id: 'd10', title: 'Capturing BTS Moments (Digital)', description: 'Behind-the-scenes capture of candid, emotional, and fun moments throughout your celebration.', icon: 'camera', category: 'Digital', span: 'span-2', images: [] },
  { id: 'd11', title: 'Funny Family Wedding Reels', description: 'Fun, viral-ready reels featuring your family — choreographed and professionally shot.', icon: 'film', category: 'Digital', span: '', images: [] },
  { id: 'd12', title: 'Full Media Backup', description: 'Complete cloud backup of all photos, videos, and media — protected and accessible forever.', icon: 'hardDrive', category: 'Digital', span: '', images: [] },
  { id: 'd13', title: 'Event Outside Board Design & Print', description: 'Eye-catching event signage, welcome boards, and directional boards — designed and printed.', icon: 'palette', category: 'Digital', span: 'span-2', images: [] },
  { id: 'd14', title: 'Wedding / Event Itinerary', description: 'A beautifully designed, detailed itinerary for guests — digital and print-ready formats.', icon: 'calendarClock', category: 'Digital', span: '', images: [] },

  // ── Event Management & Logistics ──
  { id: 'e1', title: 'End-to-End Planning & Vendor Coordination', description: 'Complete event orchestration from concept to execution, with seamless vendor management.', icon: 'briefcase', category: 'Event Management', span: 'span-2', images: [] },
  { id: 'e2', title: 'Budget Management', description: 'Smart budget planning, tracking, and optimization — so you get the most from every rupee.', icon: 'wallet', category: 'Event Management', span: '', images: [] },
  { id: 'e3', title: 'Theme & Décor Design', description: 'Stunning thematic décor — from floral arrangements to lighting and stage design.', icon: 'flower', category: 'Event Management', span: '', images: [] },
  { id: 'e4', title: 'Crisis Handling', description: 'Real-time problem solving and contingency management — we handle the unexpected so you don\'t have to.', icon: 'shield', category: 'Event Management', span: 'span-2', images: [] },
  { id: 'e5', title: 'Technology Integration', description: 'LED walls, projection mapping, live streaming tech, and sound systems — cutting-edge event tech.', icon: 'monitor', category: 'Event Management', span: '', images: [] },
  { id: 'e6', title: 'Active 13 Team Members & One Man Coordination', description: 'A dedicated team of 13 professionals with a single point of coordination for seamless execution.', icon: 'users', category: 'Event Management', span: '', images: [] },
  { id: 'e7', title: 'Medical Assistance', description: 'On-site medical support and first-aid — ensuring safety and peace of mind for all guests.', icon: 'heartPulse', category: 'Event Management', span: 'span-2', images: [] },
  { id: 'e8', title: 'Capturing BTS Moments (Management)', description: 'Behind-the-scenes documentation of venue setup, coordination, and event execution.', icon: 'camera', category: 'Event Management', span: '', images: [] },
  { id: 'e9', title: 'External Buying & Procurement', description: 'Sourcing and procurement of decorations, gifts, supplies, and specialty items at best rates.', icon: 'shoppingBag', category: 'Event Management', span: '', images: [] },
  { id: 'e10', title: 'Labour Servant', description: 'Reliable on-site staff for heavy lifting, setup, and teardown operations.', icon: 'users', category: 'Event Management', span: 'span-2', images: [] },
  { id: 'e11', title: 'Rental Car with Drivers', description: 'Premium fleet of rental cars with professional drivers for guest and VIP transit.', icon: 'car', category: 'Event Management', span: '', images: [] },
  { id: 'e12', title: 'Transport', description: 'Bus and coach logistics for moving large groups between venues, hotels, and stations.', icon: 'truck', category: 'Event Management', span: '', images: [] },
  { id: 'e13', title: 'Three Leg Board Stand', description: 'Easel stands and signboards provided for schedules, welcomes, and directions.', icon: 'easel', category: 'Event Management', span: 'span-2', images: [] },

  // ── Home Event Services ──
  { id: 'h1', title: 'Cooking Maid (Jain Food Specialist)', description: 'Expert home-cooking maids specialized in authentic Jain and traditional delicacies.', icon: 'chefHat', category: 'Home Events', span: 'span-2', images: [] },
  { id: 'h2', title: 'Security Guard (With/Without Gun)', description: 'Professional security personnel for home events, ensuring safety and access control.', icon: 'shieldCheck', category: 'Home Events', span: '', images: [] },
  { id: 'h3', title: 'Grooming and Make-up Artist', description: 'On-location premium makeup, hair styling, and grooming for family and guests.', icon: 'scissors', category: 'Home Events', span: '', images: [] },
  { id: 'h4', title: 'Rangoli Artist', description: 'Traditional and contemporary rangoli designs, including fresh flower (Pushp) rangolis.', icon: 'palette', category: 'Home Events', span: 'span-2', images: [] },

  // ── Décor & Rituals ──
  { id: 'dr1', title: 'Home Interior & Exterior Wedding Décor', description: 'Complete transformation of your home with customized mandaps, lighting, and florals.', icon: 'home', category: 'Décor & Rituals', span: 'span-2', images: [] },
  { id: 'dr2', title: 'Ritual Artifacts (Chak - 75 Items Set)', description: 'Complete traditional ritual sets including chak and all 75 essential pooja items.', icon: 'box', category: 'Décor & Rituals', span: '', images: [] },
  { id: 'dr3', title: 'Flower Jewellery for Bride', description: 'Handcrafted fresh and artificial floral jewellery exclusively tailored for Haldi/Mehandi.', icon: 'flower2', category: 'Décor & Rituals', span: '', images: [] },
  { id: 'dr4', title: 'Haldi Platter', description: 'Beautifully decorated Haldi thalis with premium turmeric, bowls, and applicators.', icon: 'circleSlashed', category: 'Décor & Rituals', span: 'span-2', images: [] },
  { id: 'dr5', title: 'Mehandi Platter', description: 'Aesthetic Mehandi platters featuring premium cones, oils, and traditional décor.', icon: 'circleDashed', category: 'Décor & Rituals', span: '', images: [] },
  { id: 'dr6', title: 'Rajasthani Pagdis', description: 'Authentic Rajasthani safas and turbans with professional tying service for guests.', icon: 'crown', category: 'Décor & Rituals', span: '', images: [] },

  // ── Entertainment & Experiences ──
  { id: 'ex1', title: '360 Camera', description: 'Interactive 360-degree video booths for unforgettable guest entertainment and instant sharing.', icon: 'camera', category: 'Entertainment', span: 'span-2', images: [] },
  { id: 'ex2', title: 'CO2 Gun', description: 'High-energy CO2 guns for spectacular guest entertainment and striking dance floor moments.', icon: 'wind', category: 'Entertainment', span: '', images: [] },
  { id: 'ex3', title: 'Rose Shower', description: 'A magical overhead shower of fresh rose petals during key moments like Jaimala.', icon: 'cloudRain', category: 'Entertainment', span: '', images: [] },
  { id: 'ex4', title: 'Smoke and Bubble Machine', description: 'Dreamy low-lying fog and floating bubbles to enhance first dances and entries.', icon: 'cloud', category: 'Entertainment', span: 'span-2', images: [] },
  { id: 'ex5', title: 'Varma Raising Frame', description: 'Customized hydraulic or mechanical frames to elevate the Varmala sequence.', icon: 'arrowUpCircle', category: 'Entertainment', span: '', images: [] },
  { id: 'ex6', title: 'Winter Car Entry', description: 'Unique thematic entries, including vintage winter cars or customized sleighs.', icon: 'carFront', category: 'Entertainment', span: '', images: [] },
  { id: 'ex7', title: 'Music System with Mic & DJ', description: 'Top-tier auditory setups including booming sound systems, wireless mics, and live DJs.', icon: 'music', category: 'Entertainment', span: 'span-2', images: [] },
  { id: 'ex8', title: 'Punjabi Dhol', description: 'High-energy traditional Punjabi Dhol players for an electrifying Baraat and welcome.', icon: 'drum', category: 'Entertainment', span: '', images: [] },
  { id: 'ex9', title: 'Baraat on Wheels', description: 'Mobile DJ trucks and sound setups that keep the Baraat rolling with unstoppable energy.', icon: 'truck', category: 'Entertainment', span: '', images: [] },
  { id: 'ex10', title: 'Anchor and Host', description: 'Professional emcees to host your Sangeet, manage crowd flow, and keep guests engaged.', icon: 'mic', category: 'Entertainment', span: 'span-2', images: [] },
  { id: 'ex11', title: 'Mascots', description: 'Fun, culturally accurate or quirky character mascots for welcoming and entertaining guests.', icon: 'smile', category: 'Entertainment', span: '', images: [] },
  { id: 'ex12', title: 'Smoke Gun', description: 'Handheld colorful smoke guns for trendy, vibrant daytime entries and photoshoots.', icon: 'flame', category: 'Entertainment', span: '', images: [] },

  // ── Unique Experiences & Merchandise ──
  { id: 'um1', title: 'Family Tree (Thumbprinting)', description: 'A massive canvas where guests leave thumbprints to create a beautiful family tree art piece.', icon: 'treePine', category: 'Merchandise & Extras', span: 'span-2', images: [] },
  { id: 'um2', title: 'Couple Branding Merchandise', description: 'Personalized caps, t-shirts, badges, and sunglasses featuring the couple\'s logo.', icon: 'shirt', category: 'Merchandise & Extras', span: '', images: [] },

  // ── Food Hampers & Live Outlets ──
  { id: 'fo1', title: 'Food & Refreshment Hampers', description: 'Curated welcome baskets and late-night snack boxes for hotel rooms and departures.', icon: 'gift', category: 'Live Outlets', span: 'span-2', images: [] },
  { id: 'fo2', title: 'Channa Garam Outlet', description: 'A nostalgic live street-food cart serving hot, spiced channa to guests.', icon: 'flame', category: 'Live Outlets', span: '', images: [] },
  { id: 'fo3', title: 'Cotton Candy Outlet', description: 'A live spun sugar counter adding a sweet, whimsical touch for kids and adults alike.', icon: 'cloud', category: 'Live Outlets', span: '', images: [] },
  { id: 'fo4', title: 'Balloon & Mehandi Outlets', description: 'Live counters for kids balloons and instant Mehandi application for walk-in guests.', icon: 'penTool', category: 'Live Outlets', span: 'span-2', images: [] },
  { id: 'fo5', title: 'Chips on Wall (Snack Wall)', description: 'An aesthetic, interactive display wall filled with assorted chips and late-night snacks.', icon: 'layoutGrid', category: 'Live Outlets', span: '', images: [] },
  { id: 'fo6', title: 'Balloon Shooting Outlet', description: 'Classic carnival-style balloon shooting games to keep guests entertained.', icon: 'crosshair', category: 'Live Outlets', span: '', images: [] },
  { id: 'fo7', title: 'Glass Ball Outlet', description: 'Interactive glass ball game stalls for a touch of nostalgic mela vibes.', icon: 'circle', category: 'Live Outlets', span: 'span-2', images: [] },
  { id: 'fo8', title: 'Gajra & Bangle Outlet', description: 'Traditional welcome stalls offering fresh Gajras and colorful bangles to ladies.', icon: 'flower2', category: 'Live Outlets', span: '', images: [] },
  { id: 'fo9', title: 'Popcorn & Nostalgia Counter', description: 'Live popcorn popping machines alongside a counter filled with 90s nostalgia candies.', icon: 'star', category: 'Live Outlets', span: '', images: [] },
];

/**
 * ─── Database Helpers ────────────────────────────────────────────────────────
 */

async function getDocRef(collectionName, id) {
  const db = await getDB();
  if (!db) return null;
  const { doc } = await import('firebase/firestore');
  return doc(db, collectionName, id);
}

async function getCollectionRef(collectionName) {
  const db = await getDB();
  if (!db) return null;
  const { collection } = await import('firebase/firestore');
  return collection(db, collectionName);
}

/**
 * ─── Services ──────────────────────────────────────────────────────────────
 */

export async function getServices() {
  try {
    const { getDocs } = await import('firebase/firestore');
    const coll = await getCollectionRef('services');
    if (!coll) return DEFAULT_SERVICES;

    const snapshot = await getDocs(coll);
    if (snapshot.empty) {
      // Initial load: Populating Firestore with defaults
      console.log('[Firestore] Populating default services...');
      const { doc, writeBatch } = await import('firebase/firestore');
      const db = await getDB();
      const batch = writeBatch(db);
      
      DEFAULT_SERVICES.forEach(s => {
        const ref = doc(coll, s.id);
        batch.set(ref, s);
      });
      try {
        await batch.commit();
      } catch (err) {
        console.warn("Failed to write default services to Firestore", err);
      }
      return DEFAULT_SERVICES;
    }

    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (err) {
    console.warn("Failed to fetch services from Firestore", err);
    return DEFAULT_SERVICES;
  }
}

export async function addService(service) {
  const newService = { ...service, id: 'srv_' + Date.now(), createdAt: new Date().toISOString() };
  try {
    const { addDoc } = await import('firebase/firestore');
    const coll = await getCollectionRef('services');
    if (coll) {
      const docRef = await addDoc(coll, newService);
      newService.id = docRef.id;
    }
  } catch(e) { console.warn('addService fb fail'); }
  DEFAULT_SERVICES.push(newService);
  await logActivity('service_add', `Added service: ${service.title}`);
  return newService;
}

export async function updateService(id, updates) {
  try {
    const { updateDoc } = await import('firebase/firestore');
    const ref = await getDocRef('services', id);
    if (ref) await updateDoc(ref, updates);
  } catch(e) { console.warn('updateService fb fail'); }
  const idx = DEFAULT_SERVICES.findIndex(s => s.id === id);
  if (idx !== -1) DEFAULT_SERVICES[idx] = { ...DEFAULT_SERVICES[idx], ...updates };
  await logActivity('service_update', `Updated service: ${id}`);
  return { id, ...updates };
}

export async function deleteService(id) {
  try {
    const { deleteDoc } = await import('firebase/firestore');
    const ref = await getDocRef('services', id);
    if (ref) await deleteDoc(ref);
  } catch(e) { console.warn('deleteService fb fail'); }
  const idx = DEFAULT_SERVICES.findIndex(s => s.id === id);
  if (idx !== -1) DEFAULT_SERVICES.splice(idx, 1);
  await logActivity('service_delete', `Deleted service: ${id}`);
}

/**
 * ─── Leads ─────────────────────────────────────────────────────────────────
 */

export async function getLeads() {
  const { getDocs, query, orderBy, limit } = await import('firebase/firestore');
  const coll = await getCollectionRef('leads');
  if (!coll) return [];

  const q = query(coll, orderBy('capturedAt', 'desc'), limit(100));
  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (e) {
    console.warn('[Services] Leads sorted fetch failed, falling back to unsorted:', e.message);
    const fallbackQ = query(coll, limit(100));
    const snapshot = await getDocs(fallbackQ);
    const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return data.sort((a, b) => (b.capturedAt || '').localeCompare(a.capturedAt || ''));
  }
}

export async function addLead(lead) {
  const { addDoc } = await import('firebase/firestore');
  const coll = await getCollectionRef('leads');
  if (!coll) return;

  const ua = navigator.userAgent;
  const newLead = { 
    ...lead, 
    capturedAt: new Date().toISOString(),
    device: ua
  };

  await addDoc(coll, newLead);
  await logActivity('lead_capture', `New lead captured: ${lead.name}`, { 
    customerName: lead.name, 
    customerEmail: lead.email 
  });
}

export async function deleteLead(id) {
  const { deleteDoc } = await import('firebase/firestore');
  const ref = await getDocRef('leads', id);
  if (!ref) return;

  await deleteDoc(ref);
  await logActivity('lead_delete', 'Deleted a lead');
}

/**
 * ─── RSVPs ─────────────────────────────────────────────────────────────────
 */

export async function getRSVPs() {
  const { getDocs, query, orderBy, limit } = await import('firebase/firestore');
  const coll = await getCollectionRef('rsvps');
  if (!coll) return [];

  const q = query(coll, orderBy('submittedAt', 'desc'), limit(100));
  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (e) {
    console.warn('[Services] RSVPs sorted fetch failed, falling back to unsorted:', e.message);
    const fallbackQ = query(coll, limit(100));
    const snapshot = await getDocs(fallbackQ);
    const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return data.sort((a, b) => (b.submittedAt || '').localeCompare(a.submittedAt || ''));
  }
}

export async function addRSVP(rsvp) {
  const { addDoc } = await import('firebase/firestore');
  const coll = await getCollectionRef('rsvps');
  if (!coll) return;

  await addDoc(coll, { 
    ...rsvp, 
    submittedAt: new Date().toISOString() 
  });
  await logActivity('rsvp', `RSVP: ${rsvp.name} — ${rsvp.attending ? 'Attending' : 'Not attending'}`, {
    customerName: rsvp.name,
    customerEmail: rsvp.email
  });
}

/**
 * ─── Utilities ─────────────────────────────────────────────────────────────
 */

export function imageToCompressedBase64(file, maxWidth = 600, quality = 0.6) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
}

export async function uploadMediaToStorage(file) {
  try {
    const { getStorage, ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
    const { getApp } = await import('firebase/app');
    const storage = getStorage(getApp());
    const uniqueName = `uploads/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const storageRef = ref(storage, uniqueName);
    
    // Upload the file
    await uploadBytes(storageRef, file);
    
    // Return the download URL
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Firebase Storage Upload Error:", error);
    throw new Error("Failed to upload media to Storage. Make sure Firebase Storage is enabled and rules allow writes.");
  }
}

/**
 * ─── Activities ────────────────────────────────────────────────────────────
 */

let _cachedActivities = null;
export async function getActivities() {
  if (!_cachedActivities) {
    _cachedActivities = [];
    let idCounter = 1;
    activityZoneData.forEach(cat => {
      cat.items.forEach(item => {
        _cachedActivities.push({
          id: `act_${idCounter++}`, title: item, category: cat.category, description: '', images: [], icon: 'star'
        });
      });
    });
  }
  const generateDefaults = () => _cachedActivities;
  try {
    const { getDocs } = await import('firebase/firestore');
    const coll = await getCollectionRef('activities');
    if (!coll) return generateDefaults();

    const snapshot = await getDocs(coll);
    if (snapshot.empty) {
      console.log('[Firestore] Populating default activities...');
      const { doc, writeBatch } = await import('firebase/firestore');
      const db = await getDB();
      const defaultActivities = generateDefaults();
      
      try {
        for (let i = 0; i < defaultActivities.length; i += 500) {
          const chunk = defaultActivities.slice(i, i + 500);
          const chunkBatch = writeBatch(db);
          chunk.forEach(act => {
            const ref = doc(coll, act.id);
            chunkBatch.set(ref, act);
          });
          await chunkBatch.commit();
        }
      } catch (err) {
        console.warn("Failed to write default activities to Firestore", err);
      }
      
      return defaultActivities;
    }

    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (err) {
    console.warn("Failed to fetch activities from Firestore", err);
    return generateDefaults();
  }
}

export async function addActivity(activity) {
  const newObj = { ...activity, id: 'act_' + Date.now(), createdAt: new Date().toISOString() };
  try {
    const { addDoc } = await import('firebase/firestore');
    const coll = await getCollectionRef('activities');
    if (coll) {
      const docRef = await addDoc(coll, newObj);
      newObj.id = docRef.id;
    }
  } catch(e) {}
  if (_cachedActivities) _cachedActivities.push(newObj);
  await logActivity('service_add', `Added activity: ${activity.title}`);
  return newObj;
}

export async function updateActivity(id, updates) {
  try {
    const { updateDoc } = await import('firebase/firestore');
    const ref = await getDocRef('activities', id);
    if (ref) await updateDoc(ref, updates);
  } catch(e) {}
  if (_cachedActivities) {
    const idx = _cachedActivities.findIndex(s => s.id === id);
    if (idx !== -1) _cachedActivities[idx] = { ..._cachedActivities[idx], ...updates };
  }
  await logActivity('service_update', `Updated activity: ${id}`);
  return { id, ...updates };
}

export async function deleteActivity(id) {
  try {
    const { deleteDoc } = await import('firebase/firestore');
    const ref = await getDocRef('activities', id);
    if (ref) await deleteDoc(ref);
  } catch(e) {}
  if (_cachedActivities) {
    const idx = _cachedActivities.findIndex(s => s.id === id);
    if (idx !== -1) _cachedActivities.splice(idx, 1);
  }
  await logActivity('service_delete', `Deleted activity: ${id}`);
}

/**
 * ─── Artists ─────────────────────────────────────────────────────────────
 */

let _cachedArtists = null;
export async function getArtists() {
  if (!_cachedArtists) {
    _cachedArtists = [];
    let idCounter = 1;
    artistSectionData.forEach(cat => {
      cat.items.forEach(item => {
        _cachedArtists.push({
          id: `art_${idCounter++}`, title: item, category: cat.category, description: '', images: [], icon: 'star'
        });
      });
    });
  }
  const generateDefaults = () => _cachedArtists;
  try {
    const { getDocs } = await import('firebase/firestore');
    const coll = await getCollectionRef('artists');
    if (!coll) return generateDefaults();

    const snapshot = await getDocs(coll);
    if (snapshot.empty) {
      console.log('[Firestore] Populating default artists...');
      const { doc, writeBatch } = await import('firebase/firestore');
      const db = await getDB();
      const defaultArtists = generateDefaults();
      
      try {
        for (let i = 0; i < defaultArtists.length; i += 500) {
          const chunk = defaultArtists.slice(i, i + 500);
          const chunkBatch = writeBatch(db);
          chunk.forEach(art => {
            const ref = doc(coll, art.id);
            chunkBatch.set(ref, art);
          });
          await chunkBatch.commit();
        }
      } catch (err) {
        console.warn("Failed to write default artists to Firestore", err);
      }
      
      return defaultArtists;
    }

    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (err) {
    console.warn("Failed to fetch artists from Firestore", err);
    return generateDefaults();
  }
}

export async function addArtist(artist) {
  const newObj = { ...artist, id: 'art_' + Date.now(), createdAt: new Date().toISOString() };
  try {
    const { addDoc } = await import('firebase/firestore');
    const coll = await getCollectionRef('artists');
    if (coll) {
      const docRef = await addDoc(coll, newObj);
      newObj.id = docRef.id;
    }
  } catch(e) {}
  if (_cachedArtists) _cachedArtists.push(newObj);
  await logActivity('service_add', `Added artist: ${artist.title}`);
  return newObj;
}

export async function updateArtist(id, updates) {
  try {
    const { updateDoc } = await import('firebase/firestore');
    const ref = await getDocRef('artists', id);
    if (ref) await updateDoc(ref, updates);
  } catch(e) {}
  if (_cachedArtists) {
    const idx = _cachedArtists.findIndex(s => s.id === id);
    if (idx !== -1) _cachedArtists[idx] = { ..._cachedArtists[idx], ...updates };
  }
  await logActivity('service_update', `Updated artist: ${id}`);
  return { id, ...updates };
}

export async function deleteArtist(id) {
  try {
    const { deleteDoc } = await import('firebase/firestore');
    const ref = await getDocRef('artists', id);
    if (ref) await deleteDoc(ref);
  } catch(e) {}
  if (_cachedArtists) {
    const idx = _cachedArtists.findIndex(s => s.id === id);
    if (idx !== -1) _cachedArtists.splice(idx, 1);
  }
  await logActivity('service_delete', `Deleted artist: ${id}`);
}

/**
 * ─── Hero Images ────────────────────────────────────────────────────────
 */

export async function getHeroImages() {
  const generateDefaults = () => [
    { id: 'default', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1920&auto=format&fit=crop', isDefault: true }
  ];

  try {
    const { getDocs } = await import('firebase/firestore');
    const coll = await getCollectionRef('heroImages');
    if (!coll) return generateDefaults();

    const snapshot = await getDocs(coll);
    if (snapshot.empty) {
      return generateDefaults();
    }
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })).sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (err) {
    console.warn("Failed to fetch hero images from Firestore", err);
    return generateDefaults();
  }
}

export async function addHeroImage(image) {
  const { addDoc } = await import('firebase/firestore');
  const coll = await getCollectionRef('heroImages');
  if (!coll) return null;
  const docRef = await addDoc(coll, { ...image, createdAt: new Date().toISOString() });
  await logActivity('service_add', `Added new hero image`);
  return { ...image, id: docRef.id };
}

export async function updateHeroImage(id, updates) {
  const { updateDoc } = await import('firebase/firestore');
  const ref = await getDocRef('heroImages', id);
  if (!ref) return null;
  await updateDoc(ref, updates);
  await logActivity('service_update', `Updated hero image`);
  return { id, ...updates };
}

export async function deleteHeroImage(id) {
  const { deleteDoc } = await import('firebase/firestore');
  const ref = await getDocRef('heroImages', id);
  if (!ref) return;
  await deleteDoc(ref);
  await logActivity('service_delete', `Deleted hero image`);
}
/**
 * Reels 
 */

export async function getReels() {
  const { getDocs } = await import('firebase/firestore');
  const coll = await getCollectionRef('reels');
  if (!coll) return [];
  const snapshot = await getDocs(coll);
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })).sort((a, b) => b.createdAt - a.createdAt);
}

export async function addReel(reelData) {
  const { addDoc } = await import('firebase/firestore');
  const coll = await getCollectionRef('reels');
  if (!coll) return null;
  
  const payload = {
    ...reelData,
    createdAt: Date.now()
  };
  const docRef = await addDoc(coll, payload);
  await logActivity('service_add', `Added Reel: ${reelData.title || 'Untitled'}`);
  return { id: docRef.id, ...payload };
}

export async function deleteReel(id) {
  const { deleteDoc } = await import('firebase/firestore');
  const ref = await getDocRef('reels', id);
  if (!ref) return;
  await deleteDoc(ref);
  await logActivity('service_delete', `Deleted Reel: ${id}`);
}
// Customers (Chatbot Leads)
export async function getCustomers() {
  const { getDocs } = await import('firebase/firestore');
  const coll = await getCollectionRef('customers');
  if (!coll) return [];
  const snapshot = await getDocs(coll);
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })).sort((a, b) => b.createdAt - a.createdAt);
}

export async function getCustomerByPhone(phone) {
  const { getDocs, query, where } = await import('firebase/firestore');
  const coll = await getCollectionRef('customers');
  if (!coll) return null;
  const q = query(coll, where('phone', '==', phone));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

export async function addCustomer(customerData) {
  const { addDoc } = await import('firebase/firestore');
  const coll = await getCollectionRef('customers');
  if (!coll) return null;
  
  const payload = {
    ...customerData,
    createdAt: Date.now()
  };
  const docRef = await addDoc(coll, payload);
  await logActivity('lead_add', `New Chat Customer: ${customerData.name}`);
  return { id: docRef.id, ...payload };
}

export async function updateCustomer(id, data) {
  const { updateDoc } = await import('firebase/firestore');
  const ref = await getDocRef('customers', id);
  if (!ref) return;
  await updateDoc(ref, data);
}

export async function deleteCustomer(id) {
  const { deleteDoc } = await import('firebase/firestore');
  const ref = await getDocRef('customers', id);
  if (!ref) return;
  await deleteDoc(ref);
  await logActivity('lead_delete', 'Deleted chat customer record');
}



/**
 * Journey Carousel Images
 */
let _cachedJourneyImages = null;
export async function getJourneyImages() {
  if (!_cachedJourneyImages) {
    _cachedJourneyImages = [
      { id: 'j1', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop', order: 0 },
      { id: 'j2', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop', order: 1 },
      { id: 'j3', url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop', order: 2 },
      { id: 'j4', url: 'https://images.unsplash.com/photo-1543329729-eb741005ca65?q=80&w=600&auto=format&fit=crop', order: 3 },
      { id: 'j5', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop', order: 4 },
      { id: 'j6', url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=600&auto=format&fit=crop', order: 5 }
    ];
  }
  const generateDefaults = () => _cachedJourneyImages;

  try {
    const { getDocs } = await import('firebase/firestore');
    const coll = await getCollectionRef('journeyImages');
    if (!coll) return generateDefaults();

    const snapshot = await getDocs(coll);
    if (snapshot.empty) return generateDefaults();

    const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    _cachedJourneyImages = items;
    return items;
  } catch (err) {
    console.warn("Failed to fetch journey images from Firestore");
    return generateDefaults();
  }
}

export async function addJourneyImage(image) {
  const newObj = { ...image, id: 'j_' + Date.now(), createdAt: new Date().toISOString() };
  try {
    const { addDoc } = await import('firebase/firestore');
    const coll = await getCollectionRef('journeyImages');
    if (coll) {
      const docRef = await addDoc(coll, newObj);
      newObj.id = docRef.id;
    }
  } catch (err) {}
  if (_cachedJourneyImages) _cachedJourneyImages.push(newObj);
  await logActivity('service_add', `Added new journey image`);
  return newObj;
}

export async function updateJourneyImage(id, updates) {
  try {
    const { updateDoc } = await import('firebase/firestore');
    const ref = await getDocRef('journeyImages', id);
    if (ref) await updateDoc(ref, updates);
  } catch (err) {}
  if (_cachedJourneyImages) {
    const idx = _cachedJourneyImages.findIndex(i => i.id === id);
    if (idx !== -1) _cachedJourneyImages[idx] = { ..._cachedJourneyImages[idx], ...updates };
  }
  await logActivity('service_update', `Updated journey image`);
  return { id, ...updates };
}

export async function deleteJourneyImage(id) {
  try {
    const { deleteDoc } = await import('firebase/firestore');
    const ref = await getDocRef('journeyImages', id);
    if (ref) await deleteDoc(ref);
  } catch (err) {}
  if (_cachedJourneyImages) {
    const idx = _cachedJourneyImages.findIndex(i => i.id === id);
    if (idx !== -1) _cachedJourneyImages.splice(idx, 1);
  }
  await logActivity('service_delete', `Deleted journey image`);
}
