import config from './config.js';
import { Client, ID, Databases, Storage, Query} from "appwrite";

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

    async createPost({ title,collectionid,description }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                collectionid,
                ID.unique(),
                {
                    title,
                    description
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async deletePost({ id, collectionid }) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                collectionid,
                id
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }
    async updatePost(id,{title,collectionid}) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                collectionid,
               id,
                {
                    title
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async getPosts({ collectionid }) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                collectionid,
                [
                    Query.limit(100)
                ]
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

}

const service = new Service()
export default service