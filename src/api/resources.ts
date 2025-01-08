import { HTTPTransport } from '../utils/HTTPTransport/HTTPTransport';
const resourcesApi = new HTTPTransport('/resources');

export const getAvatarUrl = (path: string): string => {
  // @ts-expect-error: Suppress error about response type
  return `${resourcesApi.apiUrl}/${path}`;
};