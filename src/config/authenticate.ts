import { AuthenticateError, AuthenticateHandler } from 'aedes';
import clientsApi from './clientsApi';
import axios from 'axios';
import { logger } from './logger';

const authenticate: AuthenticateHandler =  async (client, username, password, callback) => {
    try {
        if (client && username) {
            const response = await clientsApi.authenticate(username as string, password?.toString());
            if (response?.status && response.status == 200) {
                return callback(null, true);
            } else if (response == null) {
                return callback(null, true);
            } else {
                logger.error('Connection not established. Verification parameter different from expected.');
                return callback(null, false);
            }
        }
    } catch (error) {
        let authError: AuthenticateError;
        if (axios.isAxiosError(error)) {
            if (error.code == 'ECONNREFUSED') {
                authError = { name: 'ECONNREFUSED', message: error.message, returnCode: 3 };
                logger.error(authError.message);
                return callback(authError,false);
            }
            if (error.response?.status == 400) {
                authError = { name: 'error', message: 'Bad Request', returnCode: 4 };
                logger.error(authError.message);
                return callback(authError,false);
            }
            if (error.response?.status == 401) {
                authError = { name: 'error', message: 'Password incorrect', returnCode: 4 };
                logger.error(authError.message);
                return callback(authError,false);
            }
            if (error.response?.status== 404) {
                authError = { name: 'error', message: 'User doesn\'t exist', returnCode: 4 };
                logger.error(authError.message);
                return callback(authError, false);
            }
            if (error.response?.status == 500) {
                authError = { name: 'error', message: error.message, returnCode: 3 };
                logger.error(authError.message);
                return callback(authError, false);
            }
        } else{
            logger.error(error);
            return callback(null, false);
        }
    }
};

export default authenticate;

