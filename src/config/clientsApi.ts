import axios, { AxiosInstance, AxiosResponse } from 'axios';
import 'dotenv/config';

class ClientApi {
    private clientApi: AxiosInstance;
    constructor() {
        this.clientApi = axios.create({ baseURL: process.env.CLIENT_API });
    }
    async authenticate(username: string, password: string): Promise<AxiosResponse> {
        const response = await this.clientApi.post('/login', { username, password });
        return response;
    }
}

export default new ClientApi();
