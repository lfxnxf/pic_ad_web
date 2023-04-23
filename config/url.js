// 当前环境
import ENV from './env'

// 当前 host
const HOST = window.location.host

// 生产
const PROD = 'production'

// const PRO_HOST = 'nta.ichangbaishan.com'  // pro
const UAT_HOST = '124.127.40.91:8089' // uat

const DOMAIN_URL = [window.location.protocol, window.location.host].join('//')

const PRO_URL = DOMAIN_URL

// const UAT_URL = [window.location.protocol, window.location.host].join('//') + '/cbs_travel'

const DEV_URL = DOMAIN_URL + '/api'

const BASE_URL = ENV === PROD ? (HOST === UAT_HOST ? DEV_URL : PRO_URL) : DEV_URL

const API_PREFIX = BASE_URL === PRO_URL ? '/api' : ''
const MEDIA_BASE_URL = BASE_URL + '/v1/media'

const RECAPTCHA_IMG_URL = BASE_URL + '/v1/others/img_code'

const UPLOAD_IMG_API = BASE_URL + API_PREFIX + '/v1/media/image/upload'

const UPLOAD_DOC_API = BASE_URL + API_PREFIX + '/v1/media/doc/upload'

const UPLOAD_EXCEL_API = BASE_URL + API_PREFIX + '/v1/handle_file_data'

const DOWNLOAD_EXCEL_API = BASE_URL + API_PREFIX + '/v1/get_cus_excel'

const DOWNLOAD_COM_EXCEL_API = BASE_URL + API_PREFIX + '/v1/get_all_tickets_cus_excel'

const DOWNLOAD_TICKET_PDF_API = BASE_URL + API_PREFIX + '/v1/get_ticket_pdf'

const DOWNLOAD_TRAVEL_PLAN_API = BASE_URL + API_PREFIX + '/v1/get_travel_plan_pdf'

const ONLINE_PRINT_TICKET_API = BASE_URL + API_PREFIX + '/v1/get_tickets_page'

const ONLINE_TICKET_LINK_API = BASE_URL + API_PREFIX + '/v1/get_tickets_link'

const STATISTICS_TRAVEL_EXCEL_API = BASE_URL + API_PREFIX + '/v1/statistics_travel_excel'

const DOWNLOAD_FILES_API_URLS = ['/api/v1/get_ticket_pdf', '/api/v1/get_travel_plan_pdf', '/api/v1/others/img_code', '/v1/get_ticket_pdf', '/v1/get_travel_plan_pdf', '/v1/others/img_code']

const PLACE_MAP_URL = ENV === PROD ? PRO_URL + '/venusui/placemap/' : 'http://localhost:3000/venusui/placemap'

export default {
  HOST,
  BASE_URL,
  DOMAIN_URL,
  API_PREFIX,
  PLACE_MAP_URL,
  UPLOAD_IMG_API,
  UPLOAD_DOC_API,
  UPLOAD_EXCEL_API,
  DOWNLOAD_EXCEL_API,
  DOWNLOAD_TICKET_PDF_API,
  DOWNLOAD_TRAVEL_PLAN_API,
  ONLINE_PRINT_TICKET_API,
  ONLINE_TICKET_LINK_API,
  STATISTICS_TRAVEL_EXCEL_API,
  MEDIA_BASE_URL,
  RECAPTCHA_IMG_URL,
  DOWNLOAD_FILES_API_URLS,
  DOWNLOAD_COM_EXCEL_API
}
