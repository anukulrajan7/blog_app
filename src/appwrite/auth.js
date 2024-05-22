import { Client, Account, ID } from 'appwrite';
import conf from '../config/conf';

export class AuthService {
	Client = new Client();
	account;

	constructor() {
		this.Client.setEndpoint(conf.appwriteUrl).setProject(
			conf.appwriteProjectId
		);
		this.account = new Account(Client);
	}

	async createAccount({ email, password, name }) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			);
			if (userAccount) {
				return this.login({ email, password });
				// call another method
			} else {
				return userAccount;
			}
		} catch (error) {
			throw error;
		}
	}

	async login({ email, password }) {
		try {
			return await this.account.createEmailSession(email, password);
		} catch (error) {
			throw error;
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			throw error;
		}

		return null;
	}

	async logOut() {
		try {
			return await this.account.deleteSessions();
		} catch (error) {
			throw error;
		}
	}
}

const authService = new AuthService();

export default authService;
