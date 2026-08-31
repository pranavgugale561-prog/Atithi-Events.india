const fs = require("fs");
let code = fs.readFileSync("src/components/JourneyCarousel.jsx", "utf8");
code = code.replace(
  "const isVideo = src.match(/\\.(mp4|webm|mov)$/i) || src.includes('video%2F');",
  "const isVideo = typeof src === 'string' && (src.match(/\\.(mp4|webm|mov)$/i) || src.includes('video%2F'));"
);
fs.writeFileSync("src/components/JourneyCarousel.jsx", code);
