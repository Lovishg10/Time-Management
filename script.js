let sec = document.querySelector('.main');

let toggle = document.querySelector('.toggle');

let icon = document.querySelector('.icon');

toggle.onclick = function () {
    sec.classList.toggle('dark');
    let arr = icon.classList;


    let found = false;
    let len = arr.length;

    for (let i = 0; i < len; ++i) {
        if ('fa-moon' === arr[i])
            found = true;
    }

    if (found) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else
    {
        icon.classList.replace('fa-sun', 'fa-moon');

        localStorage.removeItem('theme');
    }
}

if (localStorage.getItem('theme')) {
    icon.classList.replace('fa-moon', 'fa-sun');
    sec.classList.toggle('dark');
}

const date = new Date();
const hrs = date.getHours();

const greet = document.querySelector('#greets');
const name = document.querySelector('#name');

let greeting = '';

if (hrs < 12) {
    greeting = 'Good Morning, ';
} else if (hrs >= 12 && hrs < 16) {
    greeting = 'Good Afternoon, '
} else if (hrs >= 16 && hrs <= 18) {
    greeting = 'Good Evening, '
} else
{
    greeting = 'Good Night, ';
}

greets.textContent = greeting;
if (!localStorage.getItem('name')) {
    const Name = prompt('Input your name');
    name.textContent = Name;
    localStorage.setItem('name', Name)

} else
{
    name.textContent = localStorage.getItem('name')
}


const todo = document.querySelector('.todo');
const create = document.querySelector('.create')

class Task
{
    constructor(name) {
        this.name = name;
        this.start = null;
        this.end = null;
    }
}
const iconText = '<i class=\"fas fa-ellipsis-v\" onclick=\'showOptions(this.parentElement)\'></i>';
function createTask() {

    const itemName = prompt('Input task name');
    if (!itemName)
        return;
    const task = new Task(itemName);

    const div = document.createElement('div');
    div.setAttribute('class', 'item');

    div.innerHTML = itemName + iconText;
    todo.insertBefore(div, create);

    if (localStorage.getItem('items')) {
        let arr = localStorage.getItem('items')
        arr = JSON.parse(arr)
        arr.push(task);
        arr = JSON.stringify(arr);
        localStorage.setItem('items', arr);
    } else
    {
        let arr = [];
        arr.push(task);
        arr = JSON.stringify(arr);
        localStorage.setItem('items', arr);
    }
}

let arr = [];
if (localStorage.getItem('items')) {
    let arr = localStorage.getItem('items')
    arr = JSON.parse(arr);


    arr.forEach((el)=> {})
}
const progress = document.querySelector('.progress');



function showOptions(ele) {
    const choice = prompt('Input 1 for Moving Task to In Progress\nInput 0 for deleting the task');
    let str = ele.textContent;
    str = str.trim();

    let arr = localStorage.getItem('items');
    arr = JSON.parse(arr);

    const index = arr.findIndex((el)=> {
        return el.name == str;
    })
    if (choice == 0) {

        if (index != -1) {
            arr.splice(index, 1);
            console.log(arr);
            localStorage.setItem('items', JSON.stringify(arr))
            location.reload()
            return false
        }
    } else if (choice == 1) {

        let newArr = localStorage.getItem('progress');

        if (!newArr) {
            newArr = [];
            arr[index].start = new Date();
            newArr.push(arr[index])


            newArr = JSON.stringify(newArr);
            localStorage.setItem('progress', newArr);

        } else
        {
            newArr = JSON.parse(newArr);
            arr[index].start = new Date();
            newArr.push(arr[index])

            localStorage.setItem('progress', JSON.stringify(newArr))
            arr.splice(index, 1);

            localStorage.setItem('items', JSON.stringify(arr))

        }

        location.reload()
        return false

    }

}

let inProgress = localStorage.getItem('progress');

const progressIcon = '<i class=\"fas fa-ellipsis-v\" onclick=\'showProgressOptions(this.parentElement)\'></i>';
if (inProgress) {

    inProgress = JSON.parse(inProgress);
    inProgress.forEach((el)=> {
        const div = document.createElement('div');
        div.setAttribute('class', 'item');
        div.innerHTML = el.name + progressIcon;
        progress.appendChild(div);
    })
}


const done = document.querySelector('.done');
let doneArr = localStorage.getItem('done');
function showProgressOptions(ele) {
    const choice = prompt('Input 1 for Moving Task to Done\nInput 0 for deleting the task');
    let str = ele.textContent;
    str = str.trim();

    let arr = localStorage.getItem('progress');
    arr = JSON.parse(arr);

    const index = arr.findIndex((el)=> {
        return el.name == str;
    })
    if (choice == 1) {
        if (!doneArr) {
            doneArr = [];
            arr[index].end = new Date();

            doneArr.push(arr[index]);
            localStorage.setItem('done', JSON.stringify(doneArr));

        } else
        {
            arr[index].end = new Date();

            doneArr.push(arr[index]);
            localStorage.setItem('done', JSON.stringify(doneArr));
        }
    }
    if (choice == 0 || choice == 1) {
        arr.splice(index, 1);
        localStorage.setItem('progress', JSON.stringify(arr))
        location.reload()
    }
}

const table = document.querySelector('table');

const clear = document.querySelector('.clear');
if (doneArr) {
    doneArr = JSON.parse(doneArr);
    doneArr.forEach((el)=> {
        const div = document.createElement('div');
        div.setAttribute('class', 'item');
        div.innerHTML = el.name;
        done.insertBefore(div, clear);
        const hello = new Date()
        console.log(typeof hello)
        const tr = document.createElement('tr');

        const td1 = document.createElement('td')

        const td2 = document.createElement('td')

        const td3 = document.createElement('td')

        td1.textContent = el.name;
        let start = new Date(el.start);

        let end = new Date(el.end)

        td2.textContent = start.getHours() + ':' + start.getMinutes() + ':' + start.getSeconds();

        td3.textContent = end.getHours() + ':' + end.getMinutes() + ':' + end.getSeconds();

        tr.appendChild(td1)

        tr.appendChild(td2)
        tr.appendChild(td3)
        table.appendChild(tr)
    })


}

clear.addEventListener('click', ()=> {
    if (window.confirm('are you sure to clear all tasks?')) {
        localStorage.removeItem('done');
        location.reload();
        return false
    }
})