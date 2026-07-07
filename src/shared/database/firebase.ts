import * as admin from "firebase-admin";

const bucket = process.env.STORAGE_BUCKET;

// Note: Respecting original connection method as requested
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(require("../../../firebase-service.json")),
            projectId: process.env.PROJECT_ID,
            storageBucket: bucket
        });
        console.log("✅ Firebase initialized");
    } catch (error) {
        console.warn("⚠️ Firebase initialization bypassed or failed:", error);
    }
}

function auth() {
    return admin.auth();
}

function storage() {
    return admin.storage().bucket(bucket);
}

function firestore() {
    return admin.firestore();
}

function messaging() {
    return admin.messaging();
}

export { auth, storage, firestore, messaging, admin };
