const { nextISSTimesForMyLocation } = require("./iss_promised");

const printPassTimes = function(passTimes) {

  passTimes.forEach(item => {

    const datetime = new Date(0);
    datetime.setUTCSeconds(item.risetime);
    const duration = item.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);

  });

};

nextISSTimesForMyLocation((data) => {
  printPassTimes(data);
});