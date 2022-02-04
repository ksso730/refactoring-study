import NumberRange from "./numberRange";

const station = {
    name: "ZB1",
    readings : [
        {temp: 47, time: "2022-02-02 09:10"},
        {temp: 53, time: "2022-02-02 09:20"},
        {temp: 58, time: "2022-02-02 09:30"},
        {temp: 53, time: "2022-02-02 09:40"},
        {temp: 51, time: "2022-02-02 09:50"},
    ]
};


const range = new NumberRange(operatingPlan.temperatureFloor,
    operatingPlan.temperatureCeiling);
    
function readingsOutsideRange(station, range){
    return station.readings.filter(r => !range.contains(r.temp));
}

alerts = readingsOutsideRange(station, range);

