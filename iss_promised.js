const request = require('request-promise-native');

const nextISSTimesForMyLocation = function() {

  return fetchMyIp()
    .then(fetchCoordsByIp)
    .then(fetchIssFlyoverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });

};

const fetchMyIp = function() {
  

  return request('https://api.ipify.org?format=json');

};

const fetchCoordsByIp = function(data) {

  let ipAddress = JSON.parse(data).ip;
  
  return request(`https://api.freegeoip.app/json/${ipAddress}?apikey=109d8e50-53a5-11ec-8fbc-55cfc51e5d56`);

};
const fetchIssFlyoverTimes = function(locationData) {

  let { longitude, latitude } = JSON.parse(locationData);
  
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);

};


module.exports = {
  nextISSTimesForMyLocation
};