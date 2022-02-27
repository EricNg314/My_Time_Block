console.log("test")

$(document).ready(function(){
 console.log("test2");
})

function clickSaveScore() {
  saveStorage();
}

function updateTaskList(){


}

function getStorage(){


}

function saveStorage(){
 var currentStorage = JSON.parse(localStorage.getItem('taskList'));
 if(currentStorage === null){
   currentStorage = []
 }

 currentStorage.push({'time': time, 'task': task})
 localStorage.setItem('taskList', JSON.stringify(currentStorage));
 updateTaskList();
}