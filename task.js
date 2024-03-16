function addTask(){
    const noteINPUT = document.getElementById('noteInput').value;
    const ul = document.getElementById('taskList');
    let arrayOfTASK = JSON.parse(localStorage.getItem('List')) || [];
    console.log(noteINPUT);

    const li = document.createElement('li');

const text = document.createElement('h1');
text.textContent = noteINPUT;
li.appendChild(text);
arrayOfTASK.push(ul.children.length + 1);
const calendar = document.createElement('input');
calendar.type = 'date';
li.appendChild(calendar);
calendar.id = 'calendar';
console.log('Succesfully added list to array:', arrayOfTASK);
const remove = document.createElement('button');
remove.innerHTML = `<i class='bx bxs-trash-alt'></i>`;
remove.id = 'trashBtn';
remove.onclick = function(){
    removeTask(li, arrayOfTASK);
}
li.appendChild(remove);
    ul.appendChild(li);
}

function removeTask(li, arrayOfTASK){
    li.remove();
    const index = arrayOfTASK.indexOf(li);
    if (index !== -1){
        arrayOfTASK.splice(index, 1);
        console.log('Succesfully removed from array:', arrayOfTASK);
    }
}
