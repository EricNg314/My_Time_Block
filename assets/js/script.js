var taskContainer = $("#timeBlockContainer");

var defaultTimeSlots = [
  { time: "9:00 AM", task: "" },
  { time: "10:00 AM", task: "" },
  { time: "11:00 AM", task: "" },
  { time: "12:00 PM", task: "" },
  { time: "1:00 PM", task: "" },
  { time: "2:00 PM", task: "" },
  { time: "3:00 PM", task: "" },
  { time: "4:00 PM", task: "" },
  { time: "5:00 PM", task: "" },
];
var needDefaultStorage = true;
var timeTaskStorage = getStorage();

displayTaskList();

$(document).ready(function () {
  taskContainer.on("click", "button.saveBtn", function (event) {
    event.preventDefault();
    var thisSaveEle = $(this).closest('li');
    var time = thisSaveEle.attr("data-time");
    var task = $(`li[data-time='${time}']`).find('textarea').val()
    clickSaveTask(time, task);
  });
});

function clickSaveTask(time, task) {
  saveTask(time, task);
  saveToStorage();
}

function saveTask(time, task) {
  console.log("timeTaskStorage: ", timeTaskStorage)
  if(timeTaskStorage.length === 0) {
    timeTaskStorage = defaultTimeSlots
  }
  for(var i=0; i < timeTaskStorage.length; i++){
    if(timeTaskStorage[i].time === time){
      timeTaskStorage[i].task = task
    }
  }
  console.log("timeTaskStorage: ", timeTaskStorage)
}

function displayTaskList() {
  // var currentStorage = getStorage();

    // Add some date.
    if(needDefaultStorage === true){
      for(var i = 0; i < defaultTimeSlots.length; i++){
        renderRow(defaultTimeSlots[i].time,defaultTimeSlots[i].task)
      }
      needDefaultStorage = false
    } else {
      for(var i = 0; i < timeTaskStorage.length; i++){
        renderRow(timeTaskStorage[i].time,timeTaskStorage[i].task)
      }
    }
 
}

function renderRow(time, task){
  var timeRowSearch = $(`li[data-time='${time}']`)
  var timeRowEle = ""
  var labelEle = ""
  var textareaEle = ""
  var buttonEle = ""
  var rowExists = false;

  // console.log("timeRowSearch", timeRowSearch)
  
    // if the row element does not exist, then create new one, else assign
    // Helps render content once.
  if(timeRowSearch.length === 0){
    rowExists = false;
    timeRowEle = $(`<li class="row color-bg-secondary form-floating time-block " data-time="${time}">`);
    labelEle = $(`<label class="col-2 col-lg-1 p-3 hour " >${time}</label>`);
    textareaEle = $(`<textarea class="col-8 col-lg-10 form-control" placeholder="" >${task}</textarea>`);
    buttonEle = $('<button class="col-2 col-lg-1 saveBtn"><i class="bi-calendar-plus fa-lg"></i></button>');
  } else {
    rowExists = true;
    textareaEle = timeRowSearch.find('textarea')
    textareaEle.val(task)
  }

  // console.log("timeRowEle", timeRowEle)

  if(rowExists === false){
    labelEle.appendTo(timeRowEle);
    textareaEle.appendTo(timeRowEle);
    buttonEle.appendTo(timeRowEle);
    timeRowEle.appendTo(taskContainer);
  }
}

function getStorage() {
  var storageData = JSON.parse(localStorage.getItem("taskList"));
  if (storageData === null) {
    storageData = [];
  } else {
    needDefaultStorage = false
  }

  return storageData;
}

function saveToStorage() {
  var currentStorage = timeTaskStorage;

  if (currentStorage.length > 1) {
    // currentStorage.sort(compareDescending);
  }
  localStorage.setItem("taskList", JSON.stringify(currentStorage));
  // displayTaskList();
}

function compareDescending(a, b) {
  // sort current object and next object by time key
  if (a.time > b.time) {
    return -1;
  }
  if (a.time < b.time) {
    return 1;
  }
  return 0;
}
