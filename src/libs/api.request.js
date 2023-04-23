import HttpRequest from '@/libs/axios';
import config from '@/config';
// const apiUrl = config.apiUrl;
// const apiUrl = config.oauth.icloud.urltoken;
const oauthTokenUrl = process.env.VUE_APP_ICLOUD_OAUTH_TOKEN_URL;
const axios = new HttpRequest(oauthTokenUrl);
export default axios;
