// Select the Elements
const clear = document.querySelector('.clear')
const dateElement = document.getElementById('date')
const list = document.getElementById('list')
const input = document.getElementById('input')

// Classes Names
const CHECK = 'fa fa-check-circle'
const UNCHECK = 'fa fa-circle-thin co'
const LINE_THROUGH = 'lineThrough'

// Variables
let LIST = [],
  id = 0

// ge item from local storage
let data = localStorage.getItem('TODO')

//check if data is not empty
if (data) {
  LIST = JSON.parse(data)
  id = LIST.length
  loadList(LIST)
} else {
  LIST = []
  id = 0
}

// load list items on the user's interface
function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash)
  })
}

// Show todays date
const options = { weekday: 'long', month: 'short', day: 'numeric' }
const today = new Date()

dateElement.innerHTML = today.toLocaleDateString('pt-BR', options)

//add To do Function

function addToDo(toDo, id, done, trash) {
  if (trash) {
    return
  }

  const DONE = done ? CHECK : UNCHECK
  const LINE = LINE_THROUGH
  ;('')

  const item = `<li class="item">
                <i class="fa ${DONE} co" job="complete" id="0"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id="0"></i>
                </li>`
  const position = 'beforeend'

  list.insertAdjacentHTML(position, item)
}

// Add and Iten for the enter key
document.addEventListener('keyup', function (event) {
  if (key.press == 13) {
    const toDo = input.value
    if (toDo) {
      addToDo(toDo, id, false, false)

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      })
      localStorage.setItem('TODO', JSON.stringify(LIST))

      id++
    }
    input.value = ''
  }
})

//complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK)
  element.classList.toggle(UNCHECK)
  element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH)

  LIST[element.id].done = LIST[element.id].done ? false : true
}

// function remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode)

  LIST[element.id].trash = true
}

// target the items created dynamically
list.addEventListener('click', function (event) {
  const element = event.target
  const elementJob = element.attributes.job.value
  if (elementJob == 'complete') {
    completeToDo(element)
  } else if (elementJob == 'delete') {
    removeToDo(element)
  }
  localStorage.setItem('TODO', JSON.stringify(LIST))
})
