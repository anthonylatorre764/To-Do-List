console.log('Testing Settings Page Connection...')


// Store multiple objects in localStorage
// (one object for storing 'task items' and another for storing 'settings')


const theLocalStorage = {
    'tasks': {
        0: 'Do laundry',
        1: 'Wash dishes',
        2: 'Fix tv'
    },
    'settings': {
        'auto-cap': true,
        'color-theme': 'default',
        'bullet-style': 'square',
        'font-style': 'arial'
    }
};


// How to get values
console.log(theLocalStorage.tasks[0])

console.log(theLocalStorage.settings["auto-cap"])

console.log(Object.keys(theLocalStorage.tasks).length)