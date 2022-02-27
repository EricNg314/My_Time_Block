var taskContainer = $("#timeBlockContainer");

var timeSlots = getStorage();
console.log(timeSlots);
for (var i = 0; i < timeSlots.length; i++) {
  console.log("current time slots");

}

$(document).ready(function () {
  console.log("test2");
  taskContainer.on('click', 'button.saveBtn', function(){
    clickSaveTask();
  })
});

function clickSaveTask() {
  var time = "";
  var task = "";
  saveTask();
  saveStorage();
  updateTaskList();
}

function saveTask(){
  // TODO: Update the timeSlots object.  
  // var d = new Date();
  // d.getHours();
}

function updateTaskList() {

  var currentStorage = getStorage();
  taskContainer.innerHTML = "";

  if (currentStorage !== null) {
    // Add some date.

    // Append each row of saved storage
    for (var i = 0; i < currentStorage.length; i++) {
      var timeRowEle = $("<div>");
      var labelEle = $("<label>");
      var textareaEle = $("<textarea>");
      var buttonEle = $("<button>");

      labelEle.textContent = currentStorage[i].time;
      textareaEle.textContent = currentStorage[i].task;
      buttonEle.textContent = "";

      labelEle.appendTo(timeRowEle);
      textareaEle.appendTo(timeRowEle);
      buttonEle.appendTo(timeRowEle);
      timeRowEle.appendTo(taskContainer);
    }
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
  updateTaskList();
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
