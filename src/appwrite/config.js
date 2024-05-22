import { Client, Account, ID, Databases, Storage, Query } from 'appwrite';
import conf from '../config/conf';

export class Service {
	Client = new Client();
	account;
	databases;
	bucket;
	constructor() {
		this.Client.setEndpoint(conf.appwriteUrl).setProject(
			conf.appwriteProjectId
		);
		this.databases = new Databases(this.Client);
		this.bucket = new Storage(this.Client);
	}

	async CreatePost({ title, slug, content, featuredImage, status, userId }) {
		try {
			return await this.databases.createDocument(
				conf.appWriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
					userId,
				}
			);
		} catch (error) {
			throw new Error(error);
		}
	}

	async UpdatePost(slug, { title, content, featuredImage, status, userId }) {
		try {
			return await this.databases.updateDocument(
				conf.appWriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
					userId,
				}
			);
		} catch (error) {
			console.log(error);
		}
	}

	async DeletePost(slug) {
		try {
			return await this.databases.deleteDocument(
				conf.appWriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
		} catch (error) {
			console.log(error);
		}
	}

	async getPost(slug) {
		try {
			return await this.databases(
				conf.appWriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
		} catch (error) {
			console.log(`Appwrite Error while Getting Data : ${error}`);
		}
	}

	async getPost(queries = [Query.equal('status', 'active')]) {
		try {
			return await this.databases(
				conf.appWriteDatabaseId,
				conf.appwriteCollectionId,
				queries
			);
		} catch (error) {
			console.log(`Appwrite Error while fetching Data: ${error}`);
		}
	}

	// file upload service
	async uploadFile(file) {
		try {
			return await this.bucket.createFile(
				conf.appwriteBuckId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log(`Appwrite Service Upload File : ${error}`);
		}
	}

	async deleteFile(fileId) {
		try {
			return await this.bucket.deleteFile(conf.appwriteBuckId, fileId);
		} catch (error) {
			console.log(error);
		}
	}

	getFilePreview(fileId) {
		return this.bucket(conf.appwriteBuckId, fileId);
	}
}

const service = new Service();

export default service;
