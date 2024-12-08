import axios, { AxiosInstance, AxiosResponse } from 'axios';
import 'dotenv/config';

class ClientApi {
    private clientApi: AxiosInstance | undefined;
    constructor() {
        const baseUrl = process.env.CLIENT_API;
        if (baseUrl) {
            this.clientApi = axios.create({ baseURL: baseUrl });
        }
    }

    async authenticate(username: string, password?: string): Promise<AxiosResponse | null> {
        if (this.clientApi) {
            const response = await this.clientApi.post('/login', { username, password });
            return response;
        }
        return null;
    }
}

export default new ClientApi();
