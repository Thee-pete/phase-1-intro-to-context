// Your code here
function createEmployeeRecord(employee){
    const employeeArray = {firstName: employee[0], familyName: employee[1],
         title:employee[2], payPerHour:employee[3],
          timeInEvents:[], timeOutEvents:[]}
    return employeeArray
}
function createEmployeeRecords(records){
    const employeeRecords = []
    records.forEach(record => {
        const employeeRecord = createEmployeeRecord(record)
        employeeRecords.push(employeeRecord)
    });
    return employeeRecords;


}
function createTimeInEvent(employeeRecord, dateStamp) {
    const dateAndTime = dateStamp.split(' ')
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        date: dateAndTime[0],
        hour: parseInt(dateAndTime[1]),
    })
    return employeeRecord;
}
function createTimeOutEvent(employeeRecord, dateStamp) {
    const dateAndTime = dateStamp.split(' ')
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        date: dateAndTime[0],
        hour: parseInt(dateAndTime[1]),
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateStr) {
    const timeIn = employeeRecord.timeInEvents.find(record => record.date === dateStr)
    const timeOut = employeeRecord.timeOutEvents.find(record => record.date === dateStr)
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employeeRecord, dateStr) {
    const timeIn = employeeRecord.timeInEvents.find(record => record.date === dateStr)
    const timeOut = employeeRecord.timeOutEvents.find(record => record.date === dateStr)
    return (timeOut.hour - timeIn.hour) / 100 * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord){
    const totalDays = employeeRecord.timeInEvents.length
    let sum = 0
    for (let i = 0; i < totalDays; i++ ){
      const totalHours = (employeeRecord.timeOutEvents[i].hour - employeeRecord.timeInEvents[i].hour)/100
      sum = sum + (totalHours) * employeeRecord.payPerHour
    }
  return sum
}

function calculatePayroll(employeeRecordsArray){
    let sum = 0
    for (let i = 0; i < employeeRecordsArray.length; i++){
      sum = sum + allWagesFor(employeeRecordsArray[i])
    }
    return sum 
  }
