import fs from 'fs';
import { activityZoneData } from './src/data/activitiesAndArtists.js';

let defaultActivities = [];
let idCounter = 1;
activityZoneData.forEach(cat => {
  cat.items.forEach(item => {
    defaultActivities.push({
      id: "act_$idCounter++",
      title: item,
      category: cat.category
    });
  });
});
console.log('Generated:', defaultActivities.length);
