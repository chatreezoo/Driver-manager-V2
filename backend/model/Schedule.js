const mongoose = require('mongoose')
const Schema = mongoose.Schema

// sync ข้อมูลกับ front-end
const ScheduleSchema = new Schema({
    date : {type:String, require:true},
    cars : {type:String, require:true},
    driver : {type:String, require:true},
    endDate : {type:String, require:true},
    name : {type:String, require:true},
    department : {type:String, require:true},
    objective : {type:String, require:true},
    startTime : {type:String, require:true},
    endTime : {type:String, require:true},
    place : {type:String, require:true},
    status: {type:String, require:false},
    approve: {type:String, require:false},
    reason: {type:String, require:false},
    passengers: {type:String, require:false},
    startMileage: {type:String, require:false},
    endMileage: {type:String, require:false}
    
    
    
})

// ปั้น schema ส่งออก
const scheduleModel = mongoose.model('schedule', ScheduleSchema)

module.exports = scheduleModel

