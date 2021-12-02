const request = require("request");

const nextISSTimesForMyLocation = function(callback) {

  fetchMyIp((err, data)=> {
    if (err) {
      callback(err, null);
      return;
    }
    let ipAddress  = data;
  
    fetchCoordsByIp(ipAddress, (err, obj) =>{
  
      if (err) {
        callback(err, null);
        return;
      }
      let geoCoordinates = obj;
      
      fetchIssFlyoverTimes(geoCoordinates, (err, data) => {
  
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, data);
        
      });
    });
  });
};


const fetchMyIp = function(callback) {

  request.get('https://api.ipify.org?format=json', (error, status, body) => {
    
    if (error) {
      callback(error, null);
    } else if (status.statusCode !== 200) {
      let message = `Status Code ${status.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(message), null);
    } else {
      let ipAddress = JSON.parse(body).ip;
      callback(null, ipAddress);
    }
  });
};

const fetchCoordsByIp = function(ipAddress, callback) {

  request.get(`https://api.freegeoip.app/json/${ipAddress}?apikey=109d8e50-53a5-11ec-8fbc-55cfc51e5d56`, (err, status, body) => {
    if (err) {
      callback(err, null);
    } else if (status.statusCode !== 200)  {
      let message = `Status Code: ${status.statusCode}, ${body}`;
      callback(Error(message), null);
    } else {
      let data = JSON.parse(body);
      let longitude = data.longitude;
      let latitude = data.latitude;
      callback(null, {latitude: latitude, longitude: longitude});
    }

  });
  
};

const fetchIssFlyoverTimes = function(geoCoordinates, callback) {
  let { latitude, longitude } = geoCoordinates;
  request.get(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (error, status, body) => {

    if (error) {
      callback(error, null);
    } else if (status.statusCode !== 200) {
      let message = `Status Code: ${status.statusCode}, ${body}`;
      callback(Error(message), null);
    } else {
      let flyoverTimes = JSON.parse(body).response;
      callback(null, flyoverTimes);
    }
  });
};

module.exports = {
  fetchMyIp,
  fetchCoordsByIp,
  fetchIssFlyoverTimes,
  nextISSTimesForMyLocation
};