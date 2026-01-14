import { Strings, Type } from '@ephox/katamari';

export const setSantrixBaseUrl = (santrix: any, baseUrl: string): void => {
  const prefix = document.location.protocol + '//' + document.location.host;
  santrix.baseURL = baseUrl.indexOf('://') === -1 ? prefix + baseUrl : baseUrl;
  santrix.baseURI = new santrix.util.URI(santrix.baseURL);
};

export const detectSantrixBaseUrl = (settings: Record<string, any>): string =>
  Type.isString(settings.base_url) ? settings.base_url : '/project/node_modules/santrix';

export const setupSantrixBaseUrl = (santrix: any, settings: Record<string, any>): void => {
  if (Type.isString(settings.base_url)) {
    setSantrixBaseUrl(santrix, settings.base_url);
  } else if (!Type.isString(santrix.baseURL) || !Strings.contains(santrix.baseURL, '/project/')) {
    setSantrixBaseUrl(santrix, '/project/node_modules/santrix');
  }
};
