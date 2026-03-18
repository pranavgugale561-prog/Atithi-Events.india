const fs = require('fs');
const path = 'c:\\Users\\Big Dreco\\Desktop\\Atithi events website\\src\\utils\\services.js';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/SERVICES_VERSION = 'v4';/, "SERVICES_VERSION = 'v5';");
content = content.replace(/(span:\s*['"][^'"]*['"])\s*\}/g, "$1, images: [] }");
fs.writeFileSync(path, content);
console.log("Updated services.js");
