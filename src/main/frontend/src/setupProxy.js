const ROOT_URL = "http://localhost:8080";
//const ROOT_URL = "http://54.197.200.143:5000";
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  console.log("prod"+process.env.PROD)
  app.use(
    createProxyMiddleware('/api/', {
      target: ROOT_URL,
    })
  );
};