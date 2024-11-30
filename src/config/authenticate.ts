
import { AuthenticateError, AuthenticateHandler } from 'aedes';
import clientsApi from './clientsApi';
import axios from 'axios';


const authenticate: AuthenticateHandler =  async (client, username, password, callback) => {
    try {
        if (client && password && username) {
            const response = await clientsApi.authenticate(username as string, password?.toString());
            console.log(response.data.response);
            callback(null, true);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.status);
            if (error.response?.status == 401) {
                const authError: AuthenticateError = { name: 'error', message: 'password incorrect', returnCode: 4 };
                console.log(error.message);
                console.log(authError.message);
                callback(authError,false);
            }
            if (error.response?.status== 404) {
                const authError: AuthenticateError = { name: 'error', message: 'User doesn\'t exist', returnCode: 4 };
                console.log(error.message);
                console.log(authError.message);
                callback(authError, false);
            }
            if (error.response?.status == 500) {
                const serverError: AuthenticateError = { name: 'error', message: error.message, returnCode: 4 };
                console.log(error.message);
                callback(serverError, false);
            }
        } else{
            console.log();
        }
    }
};

export default authenticate;

