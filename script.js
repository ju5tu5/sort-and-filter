'use strict'

// Fetch all boards (articles) from the HTML
const boardList = document.querySelectorAll('main article')

// Add an event listener to the fieldsets
// it will be used to detect all clicks on buttons in the fieldset
document.querySelector('fieldset.filter').addEventListener('click', filterHandler)
document.querySelector('fieldset.sort').addEventListener('click', sortHandler)

function filterHandler(event) {
  // Make sure we're dealing with a button
  if (event.target.nodeName === 'BUTTON') {
    // Select all active buttons and remove the active class
    document.querySelector('fieldset.filter .active').classList.remove('active')
    // Call the filter function using the target id
    filterByType(event.target.id)
    // Add the active class to the target button
    event.target.classList.toggle('active')
  }
}

function filterByType(type) {
  // Loop through the boardList from the global scope
  boardList.forEach((board) => {
    // Show this boards (remove hidden class from classList)
    board.classList.remove('hidden')

    // Hide boards that don't have the selected type
    if (board.querySelector('.type').innerHTML.toLowerCase() !== type && type !== 'all') {
      board.classList.add('hidden')
    }
  })
}

function sortHandler(event) {
  // Make sure we're dealing with a button
  if (event.target.nodeName === 'BUTTON') {
    // Select all active buttons and remove the active class
    document.querySelector('fieldset.sort .active').classList.remove('active')
    // Check if the user clicked default
    if (event.target.id !== 'default') {
      // Create an array using the boardList (only arrays have sort functions)
      Array.from(boardList)
        // Call the sort function on the array
        .sort((firstBoard, secondBoard) => {
          // Use event.target.id to select the characteristics we need to compare on two items
          const valueA = firstBoard.querySelector('.' + event.target.id).innerHTML.toLowerCase()
          const valueB = secondBoard.querySelector('.' + event.target.id).innerHTML.toLowerCase()
          // Compare the items in two ways
          if (valueA < valueB) {
            return -1
          }
          if (valueA > valueB) {
            return 1
          }
          // Values are equal if the above is false
          return 0
        })
        // Map through the array
        .map((board, index) => {
          // Use the array index to set the CSS Flex order
          board.style.order = index
        })
      // The user clicked default, remove the order declarations
    } else {
      // Loop through the NodeList using forEach (map is only available on arrays)
      boardList.forEach((board) => {
        // Reset the order declaration on all items we encounter
        board.style.order = null
      })
    }
    // Add the active class to the target button
    event.target.classList.toggle('active')
  }
}
