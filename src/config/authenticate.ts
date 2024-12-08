import { AuthenticateError, AuthenticateHandler } from 'aedes';
import clientsApi from './clientsApi';
import axios from 'axios';
import { logger } from './logger';

const authenticate: AuthenticateHandler =  async (client, username, password, callback) => {
    try {
        if (client && username) {
            await clientsApi.authenticate(username as string, password?.toString());        
            callback(null, true);
        }
    } catch (error) {
        let authError: AuthenticateError;
        if (axios.isAxiosError(error)) {
            if (error.code == 'ECONNREFUSED') {
                authError = { name: 'ECONNREFUSED', message: error.message, returnCode: 3 };
                callback(authError,false);
                logger.error(authError.message);
            }
            if (error.response?.status == 400) {
                authError = { name: 'error', message: 'Bad Request', returnCode: 4 };
                logger.error(authError.message);
                callback(authError,false);
            }
            if (error.response?.status == 401) {
                authError = { name: 'error', message: 'Password incorrect', returnCode: 4 };
                logger.error(authError.message);
                callback(authError,false);
            }
            if (error.response?.status== 404) {
                authError = { name: 'error', message: 'User doesn\'t exist', returnCode: 4 };
                logger.error(authError.message);
                callback(authError, false);
            }
            if (error.response?.status == 500) {
                authError = { name: 'error', message: error.message, returnCode: 3 };
                logger.error(authError.message);
                callback(authError, false);
            }
        } else{
            callback(null, false);
            logger.error(error);
        }
    }
};

export default authenticate;

