// Define the updateTask function outside of the addTask function
function updateTask(noteINPUT, category, calendar, arrayOfTASK) {
    const categoryValue = category.getAttribute('data-typed') ? category.value : '';
    const calendarValue = calendar.getAttribute('data-typed') ? calendar.value : '';
    const task = {
        text: noteINPUT,
        calendar: calendarValue,
        category: categoryValue,
    };
    arrayOfTASK.push(task);
    localStorage.setItem('List', JSON.stringify(arrayOfTASK));
    console.log('Successfully added list to array:', arrayOfTASK);
}
function displayTask(task){
    const ul = document.getElementById('taskList');
    const li = document.createElement('li');
    const text = document.createElement('h1');
    text.textContent = task.text;
    li.appendChild(text);

    const category = document.createElement('input');
    category.type = 'text';
    category.value = task.category; // Set the value of category input
    category.id = 'category';
    category.placeholder = 'Category';
    li.appendChild(category);

    const calendar = document.createElement('input');
    calendar.type = 'date';
    calendar.value = task.calendar; // Set the value of calendar input
    calendar.id = 'calendar';
    li.appendChild(calendar);

    const remove = document.createElement('button');
    remove.innerHTML = `<i class='bx bxs-trash-alt'></i>`;
    remove.id = 'trashBtn';
    remove.onclick = function() {
        removeTask(li, arrayOfTASK);
    };
    li.appendChild(remove);

    ul.appendChild(li);
}

function addTask() {
   
    const noteINPUT = document.getElementById('noteInput').value;
    const ul = document.getElementById('taskList');
    let arrayOfTASK = JSON.parse(localStorage.getItem('List')) || [];
    
    
    if (noteINPUT.trim() === ''){
        alert('You did not input anything yet!');
        return;
    } else {
       
        const li = document.createElement('li');
        const text = document.createElement('h1');
        text.textContent = noteINPUT;
        li.appendChild(text);

        const category = document.createElement('input');
        category.type = 'text';
        category.id = 'category';
        category.placeholder = 'Category';
        category.addEventListener('input', function(){
            this.setAttribute('data-typed', true);
            updateTask(noteINPUT, category, calendar, arrayOfTASK); // Pass necessary parameters to updateTask function
        });
        li.appendChild(category);

        const calendar = document.createElement('input');
        calendar.type = 'date';
        calendar.id = 'calendar';
        calendar.addEventListener('input', function(){
            this.setAttribute('data-typed', true);
            updateTask(noteINPUT, category, calendar, arrayOfTASK); // Pass necessary parameters to updateTask function
        });
        li.appendChild(calendar);


        const remove = document.createElement('button');
        remove.innerHTML = `<i class='bx bxs-trash-alt'></i>`;
        remove.id = 'trashBtn';
        remove.onclick = function() {
            removeTask(li, arrayOfTASK);
        };
        li.appendChild(remove);

        // Append the task elements to the <ul> outside of the remove.onclick function
        ul.appendChild(li);

        

    }
}

function removeTask(li, arrayOfTASK) {
    li.remove();
    const taskText = li.querySelector('h1').textContent;
    const index = arrayOfTASK.findIndex(task => task.text === taskText);
    if (index !== -1){
        arrayOfTASK.splice(index, 1);
        localStorage.setItem('List',JSON.stringify(arrayOfTASK));
        console.log('Successfully removed from array:', arrayOfTASK);
    }
}

function removeALL(){
    const ul = document.getElementById('taskList');
    const arrayOfTASK = [];

    while (ul.firstChild){
        ul.removeChild(ul.firstChild);
    }

    localStorage.setItem('List', JSON.stringify(arrayOfTASK));
    console.log('Successfully removed all tasks from array:', arrayOfTASK);
}

document.addEventListener('DOMContentLoaded', function(){
const arrayOfTASK = JSON.parse(localStorage.getItem('List')) || [];
arrayOfTASK.forEach(task => {
    displayTask(task);
})
});
