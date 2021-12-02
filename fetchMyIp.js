const request = require("request");

const fetchMyIp = function(callback) {

  request.get('https://api.ipify.org?format=json', (error, status, body) => {

    if (error !== null) {
      callback(error, null);
    };
    if (status.statusCode !== 200) {

      let message = `Status Code ${status.statusCode} when fetching IP. Response: ${body}`;

      callback(Error(message), null);

    } else {

      let ipAddress = JSON.parse(body).ip;

      callback(null, ipAddress);

    }
    
  });
};

module.exports = fetchMyIp;