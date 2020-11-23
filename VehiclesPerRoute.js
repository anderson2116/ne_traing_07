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

    acc[val.route + '-'  + val.itinerary + '-' + val.plate] = (acc[val.route + '-'  + val.itinerary + '-' + val.plate] || 0 ) + 1 ;
    return index !==(array.length - 1)
    ? acc
    : Object.entries(acc)
    .map(([Data , vehicleCount]) => ({route: Data.split("-")[0], itinerary: Data.split("-")[1] , plate: Data.split("-")[2] , vehicleCount}))

    

},[])
.sort((obj1 , obj2) => obj2.vehicleCount - obj1.vehicleCount)

console.log(result)