const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.jsx', 'utf8');

// 1. Import
code = code.replace(
  /getHeroImages, addHeroImage, deleteHeroImage,/,
  `getHeroImages, addHeroImage, deleteHeroImage,\n  getJourneyImages, addJourneyImage, updateJourneyImage, deleteJourneyImage,`
);

// 2. Add Tab Link
code = code.replace(
  /\{ id: 'hero',     label: 'Hero Images', icon: ImagePlus \},/,
  `{ id: 'hero',     label: 'Hero Backgrounds', icon: ImagePlus },\n    { id: 'carousel', label: 'Hero Banner Images', icon: ImagePlus },`
);

// 3. State
code = code.replace(
  /const \[heroImages, setHeroImages\] = useState\(\[\]\);/,
  `const [heroImages, setHeroImages] = useState([]);\n  const [journeyImages, setJourneyImages] = useState([]);`
);

// 4. Fetch
code = code.replace(
  /const fetchHeroImages = async \(\) => \{ try \{ return await getHeroImages\(\); \} catch\(e\) \{ console\.error\('HeroImages fail', e\); return \[\]; \} \};/,
  `const fetchHeroImages = async () => { try { return await getHeroImages(); } catch(e) { console.error('HeroImages fail', e); return []; } };\n      const fetchJourneyImages = async () => { try { return await getJourneyImages(); } catch(e) { console.error('JourneyImages fail', e); return []; } };`
);

// 5. Promise.all
code = code.replace(
  /fetchHeroImages\(\),/,
  `fetchHeroImages(),\n          fetchJourneyImages(),`
);

// 6. Set state
code = code.replace(
  /setHeroImages\(hi\);/,
  `setHeroImages(hi);\n      if (arguments.length > 7) { setJourneyImages(arguments[0][7] || []); } else { setJourneyImages(await fetchJourneyImages()); }` // Wait, Promise.all returns an array. Let's just destructure properly.
);
// Actually, `Promise.all` result is destructured as:
// const [s, act, art, hi, rls, tl, a] = await Promise.all(...)
// Let's replace the whole Promise.all block.
