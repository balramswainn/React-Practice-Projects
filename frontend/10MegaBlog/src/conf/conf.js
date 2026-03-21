const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}
// there was a name issue with the import.meta.env.VITE_APPWRITE_URL, it was later fixed in debugging video

export default conf

// if har jagah import.meta.env likhu toh ho sakta hai env load hi na ho isiliye conf object k andhr ye sab data easily access kar paye and string me convert karna jaruri hai

//Kabhi kabhi TypeScript / IDE complain karta hai ki import.meta.env.VITE_APPWRITE_URL may be undefined.
// String(value) lagane se wo guarantee hota hai ki tumhe ek string hi milega (agar value undefined hai toh "undefined"-> string ban jaega).
//Mostly ye TypeScript safety ke liye hota hai, taki tumhe har jagah type-check errors na aaye.