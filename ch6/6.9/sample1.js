
import { Reading } from "./reading";

const reading = {customer: "ivan", quantity: 10, month: 5, year:2017};

function acquireReading(){
    return reading;
}

// 클라이언트 1
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const baseCharge = aReading.baseCharge;

// 클라이언트 2
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const texableCharge = aReading.taxableCharge;

// 클라이언트 3
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const basicChargeAmount = aReading.baseCharge;