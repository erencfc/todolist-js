const listDOM = document.querySelector("#list");
const liDOM = document.querySelectorAll("#list > li");
const spanDOM = document.getElementsByClassName('closeBtn')

for (let i = 0; i < spanDOM.length; i++) {
    const element = spanDOM[i];
    element.addEventListener('click', deleteTask)
}

if (localStorage.getItem('tasks')) {
    listDOM.innerHTML = "";
    let liItems = JSON.parse(localStorage.getItem('tasks'));
    liItems.forEach(item => {
        createLi(item['task'], item['isChecked'])
    })
}

listDOM.addEventListener('click', completeTask)

const input = document.querySelector('#task');

function newTask() {
    let task = input.value;
    let tasks = [];

    const liDOM = document.querySelectorAll('#list > li');
    liDOM.forEach(li => {
        tasks.push(li.innerText)
    })

    
    if (task.replaceAll(/\s/g, '') == '') {
        input.value = ""
        return $('#emptyToast').toast('show');
    }
    
    else if (tasks.includes(task)) {
        input.value = ""
        return $('#alreadyToast').toast('show');
    }

    createLi(task, false)

    let items = [];
    const li = document.querySelectorAll("#list > li");
    li.forEach((li, index) => {
        let obj = {
            task: li.innerText,
            isChecked: li.classList[0] == "checked"
        }
        items[index] = obj;
    })
    localStorage.setItem('tasks', JSON.stringify(items))
    input.value = ""
    $('#addedToast').toast('show');
}


function deleteTask(element) {
    let clickedID = Array.from(spanDOM).indexOf(element.srcElement);
    let elem = listDOM.children[clickedID]
    console.log(elem)
    listDOM.removeChild(elem)
    let items = [];
    const li = document.querySelectorAll("#list > li");
    li.forEach((li, index) => {
        let obj = {
            task: li.innerText,
            isChecked: li.classList[0] == "checked"
        }
        items[index] = obj;
    })
    localStorage.setItem('tasks', JSON.stringify(items))
}

function completeTask(element) {
    if (element.target.tagName !== 'LI') return;

    if (element.target.classList[0] == 'checked') element.target.classList.remove('checked') // +
    else element.target.classList.add('checked') // -

    let items = [];
    const li = document.querySelectorAll("#list > li");
    li.forEach((li, index) => {
        let obj = {
            task: li.innerText,
            isChecked: li.classList[0] == "checked"
        }
        items[index] = obj;
    })

    localStorage.setItem('tasks', JSON.stringify(items))
}

function createLi(innerHTML, isChecked = false) {
    let newLiDOM = document.createElement('li');
    let newSpanDOM = document.createElement('span');
    newSpanDOM.classList.add('closeBtn');
    newLiDOM.innerHTML = innerHTML
    if (isChecked == true) newLiDOM.classList.add('checked')
    newLiDOM.appendChild(newSpanDOM);
    listDOM.appendChild(newLiDOM)
    newSpanDOM.addEventListener('click', deleteTask)
}