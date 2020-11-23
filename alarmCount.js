'use strict'

const fs =  require('fs')

const cvs = fs.readFileSync('./eventos_fleet_10_11_2020.csv' , {encoding : 'utf8' , flag: 'r'});
const result = cvs.split('\n')
.map(line => line.split(','))
.map(([
    date,intNumber,plate,driveName,driverDocument,deviceId,isAlarm,
    eventType, eventDescription, location, speed, bearing, route, itinerary, servicedATA, serviceLink
]) => ({
    date,intNumber,plate,driveName,driverDocument,deviceId,isAlarm,
    eventType, eventDescription, location, speed, bearing, route, itinerary, servicedATA, serviceLink
}))
.reduce((acc , val , index, array) => {

    acc[val.plate] = (acc[val.plate] || 0 ) + 1;
    return index !==(array.length - 1)
    ? acc
    : Object.entries(acc)
    .map(([plate,totalALarm]) => ({plate , totalALarm}))

},{})

.sort((obj1 , obj2) => obj2.totalALarm - obj1.totalALarm)



console.log(result)