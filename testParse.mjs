import fs from 'fs';
const run = async () => {
  const url = "https://www.instagram.com/p/DV8JuoiEzH5/";
  const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
  const json = await res.json();
  const desc = json.data.description;

  let cleanDesc = desc || '';
  
  // Remove "Likes/Comments - Username on Date:" prefix
  if (cleanDesc.match(/^[0-9,KMBkm]+\s+(likes|views|Play).*?-.*?:\s*/is)) {
    const parts = cleanDesc.split(':');
    parts.shift(); // remove the prefix
    cleanDesc = parts.join(':').trim();
  } else if (cleanDesc.includes(' on ') && cleanDesc.indexOf(':') > 0 && cleanDesc.indexOf(':') < 100) {
    // Remove "username on Date:" prefix
    cleanDesc = cleanDesc.substring(cleanDesc.indexOf(':') + 1).trim();
  }

  // Remove leading quotes
  cleanDesc = cleanDesc.replace(/^["'\u201C\u2018\u201D\u2019]+/, '').trim();
  
  // Remove hashtags (including anything trailing after them since they're usually at the end)
  cleanDesc = cleanDesc.replace(/#[\w\u0590-\u05ff]+/gi, '').replace(/\s+/g, ' ').trim();
  
  // Remove trailing dots, spaces, or quotes
  cleanDesc = cleanDesc.replace(/[\.\s"'\u201C\u2018\u201D\u2019]+$/, '').trim();
  
  fs.writeFileSync('log.txt', "RAW:\n" + desc + "\n\nCLEAN:\n" + cleanDesc);
};
run();
