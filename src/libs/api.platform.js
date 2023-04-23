import PlatformApis from '@/libs/platform';
import config from '@/config';
// const baseUrl = config.apiUrl;
const baseUrl = process.env.VUE_APP_PLATFORM_API;
const axios = new PlatformApis(baseUrl);
export default axios;
