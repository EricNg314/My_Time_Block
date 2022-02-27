var taskContainer = $("#timeBlockContainer");

var defaultTimeSlots = [
  { time: "9:00 AM", task: "abd" },
  { time: "10:00 AM", task: "qwe" },
  { time: "11:00 AM", task: "" },
  { time: "12:00 PM", task: "oijafe" },
  { time: "1:00 PM", task: "" },
  { time: "2:00 PM", task: "" },
  { time: "3:00 PM", task: "" },
  { time: "4:00 PM", task: "" },
  { time: "5:00 PM", task: "" },
];
var timeTaskStorage = getStorage();

displayTaskList();

$(document).ready(function () {
  taskContainer.on("click", "button.saveBtn", function () {
    clickSaveTask();
  });
});

function clickSaveTask() {
  var time = "";
  var task = "";
  saveTask();
  saveStorage();
  // displayTaskList();


  // renderRow(time, task)
}

function saveTask() {
  // TODO: Update the timeSlots object.
  // var d = new Date();
  // d.getHours();
  // renderRow()
}

function displayTaskList() {
  // var currentStorage = getStorage();

    // Add some date.
    for(var i = 0; i < defaultTimeSlots.length; i++){
      renderRow(defaultTimeSlots[i].time,defaultTimeSlots[i].task)
    }
 
}

function renderRow(time, task){
  
  console.log("renderRow")
  var timeRowSearch = $(`li[data-time='${time}']`)
  var timeRowEle = ""
  var labelEle = ""
  var textareaEle = ""
  var buttonEle = ""
  var rowExists = false;

  console.log("timeRowSearch", timeRowSearch)
  
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

  console.log("timeRowEle", timeRowEle)

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
  }

  return storageData;
}

function saveStorage() {
  var currentStorage = timeSlots;

  if (currentStorage.length > 1) {
    currentStorage.sort(compareDescending);
  }
  localStorage.setItem("taskList", JSON.stringify(currentStorage));
  displayTaskList();
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
