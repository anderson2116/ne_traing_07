'use strict'
 
const fs = require('fs')
 
const cvs = fs.readFileSync('./eventos_fleet_10_11_2020.csv', { encoding: 'utf8', flag: 'r' });
const result = cvs.split('\n')
   .map(line => line.split(','))
   .map(([
       date, intNumber, plate, driveName, driverDocument, deviceId, isAlarm,
       eventType, eventDescription, location, speed, bearing, route, itinerary, servicedATA, serviceLink
   ]) => ({
       date, intNumber, plate, driveName, driverDocument, deviceId, isAlarm,
       eventType, eventDescription, location, speed, bearing, route, itinerary, servicedATA, serviceLink
   }))
 
   .filter(event => event.eventType === 'Ingresos Torniquete' ||
       event.eventType === 'Salida Torniquete' ||
       event.eventType === 'Ing. Cont. Pasaj Trasero' ||
       event.eventType === 'Sal. Cont. Pasaj Trasero')
 
   .reduce((acc, val,) => {
       const currentVehicle = acc.find(a => a.plate === val.plate)
       if (currentVehicle) {
           switch (val.eventType) {
               case "Ingresos Torniquete":
                   currentVehicle.inputTurnstile = (currentVehicle.inputTurnstile || 0) + 1
                   break;
               case "Salida Torniquete":
                   currentVehicle.outputTurnstile =( currentVehicle.outputTurnstile || 0) + 1
                   break;
               case "Ing. Cont. Pasaj Trasero":
                   currentVehicle.passengerCounterInput = (currentVehicle.passengerCounterInput || 0) + 1
                   break;
               case "Sal. Cont. Pasaj Trasero":
                   currentVehicle.passengerCounterOutput = (currentVehicle.passengerCounterOutput || 0) + 1
                   break;
           }
       }
       else {
           const newObj = {plate: val.plate}
           switch (val.eventType) {
               case "Ingresos Torniquete":
                   newObj.inputTurnstile = 1
                   break;
               case "Salida Torniquete":
                   newObj.outputTurnstile = 1
                   break;
               case "Ing. Cont. Pasaj Trasero":
                   newObj.passengerCounterInput = 1
                   break;
               case "Sal. Cont. Pasaj Trasero":
                   newObj.passengerCounterOutput = 1
                   break;
           }
           acc.push(newObj)
       }
       return acc;
       
    }, [])
 
 
 
    console.log(result)
    
       
       
    
