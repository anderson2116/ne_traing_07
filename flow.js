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

    .reduce((acc, val, index, array) => {
        acc[val.eventType] = (acc[val.eventType] || 0 ) + 1 ;
        return index !==(array.length - 1)
        ? acc
        : Object.entries(acc)
        .map(([eventType ,eventCount]) => ({eventType ,eventCount}))

    }, [])



console.log(result)