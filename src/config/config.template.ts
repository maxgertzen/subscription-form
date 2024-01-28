export interface Config {
  baseURL: string;
  apiRoute: string;
  ajaxRoute: string;
}

const radicalAppConfig: Config = {
  baseURL: 'https://example.com/api',
  apiRoute: 'api',
  ajaxRoute: 'ajax',
};

export default radicalAppConfig;
