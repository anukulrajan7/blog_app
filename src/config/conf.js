const conf = {
	appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
	appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
	appWriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
	appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
	appwriteBuckId: String(import.meta.env.VITE_APPWRITE_BUCK_ID),
};

export default conf;
