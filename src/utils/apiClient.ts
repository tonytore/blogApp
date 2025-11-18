import axios from 'axios';
import https from 'https';
import appConfig from '../config/app_configs.js';
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthenticatedError,
} from './error/custom_error_handler.js';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const httpClient = axios.create({
  baseURL: appConfig.CLIENT_URL,
  httpsAgent,
  headers: {
    'User-Agent': 'internal-microservice-client',
  },
  timeout: 5000,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { statusCode, message, comingFrom, metadata } = error.response.data;

      switch (statusCode) {
        case 400:
          throw new BadRequestError(
            message,
            comingFrom || 'Common Service',
            metadata,
          );
        case 401:
          throw new UnauthenticatedError(
            message,
            comingFrom || 'Common Service',
            metadata,
          );
        case 403:
          throw new ForbiddenError(
            message,
            comingFrom || 'Common Service',
            metadata,
          );
        case 404:
          throw new NotFoundError(
            message,
            comingFrom || 'Common Service',
            metadata,
          );
        default:
          throw new InternalServerError(
            message || 'Error from BMLA Service',
            comingFrom || 'BMLA Service',
            metadata,
          );
      }
    } else if (error.request) {
      throw new InternalServerError(
        'No response received from Common Service',
        'BMLA Service',
      );
    } else {
      throw new InternalServerError(error.message, 'BMLA Service');
    }
  },
);

export default httpClient;
