const { fetchMyIp, fetchCoordsByIp } = require("./iss");

fetchMyIp((err, data)=> {
  if (err) {
    console.log('your code is terrible!');
    return;
  }
  let ipAddress  = data;
  console.log(ipAddress);

  fetchCoordsByIp(ipAddress, (err, obj) =>{
    console.log(err)
    console.log(obj);
  });
});

