import { getActivities } from './src/utils/services.js';
getActivities().then(res => console.log('Activities count:', res.length)).catch(console.error);
