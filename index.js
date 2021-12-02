const fetchMyIp = require("./fetchMyIp");

fetchMyIp((err, data)=> {

  if (err) {
    console.log('your code is terrible!');
    return;
  }

  let ipAddress  = data;

  console.log(ipAddress);

  
});
