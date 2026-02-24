import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_PB_URL);
export default pb;
// optional: disable auto cancellation for React strict mode
pb.autoCancellation(false);