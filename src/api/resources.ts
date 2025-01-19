import { HTTPTransport } from '../utils/HTTPTransport/HTTPTransport';
const resourcesApi = new HTTPTransport('/resources');

export const getAvatarUrl = (path: string): string => {
  
  return `${resourcesApi.getApiUrl()}/${path}`;
};

