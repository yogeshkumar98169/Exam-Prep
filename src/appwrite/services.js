import config from './config.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, collectionid, description }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                collectionid,
                ID.unique(),
                {
                    title,
                    description
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }
    async createImagePost({ title, collectionid, description, imageId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                collectionid,
                ID.unique(),
                {
                    title,
                    description,
                    imageId,  // Updated here
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async deletePost({ id, collectionid }) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                collectionid,
                id
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async updatePost(id, { title, collectionid, description }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                collectionid,
                id,
                {
                    title,
                    description
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async getPosts({ collectionid }) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                collectionid,
                [
                    Query.limit(700)
                ]
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
               file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        );
    }
}

const service = new Service();
export default service;
