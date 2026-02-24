import PocketBase from "pocketbase";

export const pb = new PocketBase("http://127.0.0.1:8090");

// optional: disable auto cancellation for React strict mode
pb.autoCancellation(false);