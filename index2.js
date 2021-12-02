const { fetchMyIp, fetchCoordsByIp, fetchIssFlyoverTimes } = require("./iss_promised");


fetchMyIp()
  .then(fetchCoordsByIp)
  .then(fetchIssFlyoverTimes)
  .then((data) => console.log(JSON.parse(data).response));