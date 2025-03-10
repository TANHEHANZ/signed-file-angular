export enum API_ROUTES {
  BASE = '/api/',
  STATUS_JACUBITUS = BASE + 'status',
  LIST_TOKEN = BASE + 'token/connected',
  DATA_TOKEN = BASE + 'token/data',
  UPLOAD_FILE_PDF = BASE + 'token/firmar_pdf',
}

export enum API {
  BASE = '/v1/api/',
  ROL = BASE + 'rol',
  LOGIN = BASE + 'login',
  TOKEN = BASE + 'token',
  SERVICE_EXTERNAL = BASE + 'user/info',
  REGISTER = BASE + 'user',
  REFRESH__TOKEN = LOGIN + '/refresh',
  SIGNED = BASE + 'signed',
  SIGNED_HISTORY = SIGNED + '/history/',
  SIGNED_FILE_BY_ID = SIGNED + '/file/',
  ASIGNAR = BASE + 'asignar',
  LIST_TOKEN = BASE + 'jacubitus',
  UNSUB = ASIGNAR,
}
