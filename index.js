const { fetchMyIp, fetchCoordsByIp, fetchIssFlyoverTimes } = require("./iss");

fetchMyIp((err, data)=> {
  if (err) {
    console.log('your code is terrible!');
    return;
  }
  let ipAddress  = data;

  fetchCoordsByIp(ipAddress, (err, obj) =>{

    if (err) {

      console.log(err);
      return;
    }
    let geoCoordinates = obj;
    
    fetchIssFlyoverTimes(geoCoordinates, (err, data) => {

      if (err) {
        console.log(err);
        return;
      }
      console.log(data);
      
    });
  });
});

