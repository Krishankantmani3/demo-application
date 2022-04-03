export const config = {
  ENV: "DEVELOPMENT",
  PORT: 9000,
  MONGO_URI: "mongodb://172.17.0.3:27017/KKDB",
  REDIS_URI: {
    host: "172.17.0.5"
  },
  ACCESS_TIME: "365d",
  JWT_ACCESS_SECRET: "DGNDGJ4589ghhfd615ionEFBJRFFB45bgfheyyuj",
  COOKIE_SECRET: "DGNDGJ4589ghhfd615ionEFBJRFFB45bgfheyyuj",
  ALLOWED_ORIGIN: "http://172.17.0.2:4200 http://localost:4200 https://task.com",
  COOKIE_TIMEOUT_SEC: 3600,
  SESSION_MAX_LIMIT: 1,
  NODEMAILER_INFO: {
    user: "try.and.test@outlook.com",
    pass: 'dcba#4321',
    service: "hotmail"
  }
}