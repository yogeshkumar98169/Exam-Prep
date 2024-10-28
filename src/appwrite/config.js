const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionIdIdioms: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_IDIOMS),
    appwriteCollectionIdIdioms2500: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_IDIOMS_2500),
    appwriteCollectionIdOneWord: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_ONEWORD),
    appwriteCollectionIdVocab: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_VOCAB),
    appwriteCollectionIdCurrent: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_CURRENT),
    appwriteCollectionIdImages: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_Images),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}


export default config;