'use strict'

const fs =  require('fs')

const cvs = fs.readFileSync('./eventos_fleet_10_11_2020.csv' , {encoding : 'utf8' , flag: 'r'});
const result = cvs.split('\n')
.map(line => line.split(','))
.map(([
    date,intNumber,plate,driveName,driverDocument,deviceId,isAlarm,
    eventType, eventDescription, location, speed, bearing, route, itinerary, serviceData, serviceLink
]) => ({
    date,intNumber,plate,driveName,driverDocument,deviceId,isAlarm,
    eventType, eventDescription, location, speed, bearing, route, itinerary, serviceData, serviceLink
}))
.reduce((acc , val , index, array) => {

    acc[val.driverDocument+'-'+val.driveName] = (acc[val.driverDocument+'-'+val.driveName  ] || 0 ) + 1;
    return index !==(array.length - 1)
    ? acc
    : Object.entries(acc)
    .map(([driverData , serviceCount]) => ({driverDocument: driverData.split("-")[0], driverName: driverData.split("-")[1] , serviceCount}))

},[])

.sort((obj1 , obj2) => obj2.serviceCount - obj1.serviceCount)



console.log(result)