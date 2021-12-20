'use strict'

// Fetch all boards (articles) from the HTML
const boardList = document.querySelectorAll('main article')

// Add an event listener to the fieldsets
// it will be used to detect all clicks on buttons in the fieldset
document.querySelector('fieldset.filter').addEventListener('click', filterHandler)
document.querySelector('fieldset.sort').addEventListener('click', sortHandler)

/**
 * Deals with clicking on a filter button. Do not call this function directly,
 * use it as a callback function from addEventListener. This function has side-
 * effects: it calls the DOM directly..
 * @param {Event} event is passed automagically when using from addEventListener
 */
function filterHandler(event) {
  // Make sure we're dealing with a button
  if (isButton(event.target)) {
    // Select all active buttons and remove the active class
    document.querySelector('fieldset.filter .active').classList.remove('active')

    // Call the filter function using the target id
    filterByType(event.target.id)

    // Add the active class to the target button
    event.target.classList.toggle('active')
  }
}

/**
 * Loops through the list of articles and adds a 'hidden' CSS class to the ones
 * that are filtered out using the passed type parameter. This function has side-
 * effects: it calls the DOM directly..
 * @param {String} type of the article that needs to be filtered out
 */
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

/**
 * Deals with clicking on a sort button by reordering the articles on the page.
 * Do not call this function directly, use it as a callback function from
 * addEventListener. This function has side-effects: it calls the DOM directly..
 * @param {Event} event is passed automagically when using from addEventListener
 */
function sortHandler(event) {
  // Make sure we're dealing with a button
  if (isButton(event.target)) {
    // Select all active buttons and remove the active class
    document.querySelector('fieldset.sort .active').classList.remove('active')

    // Check if the user clicked default
    if (event.target.id !== 'default') {
      // Create an array using the boardList (only arrays have sort functions)
      Array.from(boardList)
        // Call the sort function on the array
        .sort((firstBoard, secondBoard) => {
          // Use event.target.id to select the characteristics we need to compare on two items
          const firstBoardType = firstBoard
            .querySelector('.' + event.target.id)
            .innerHTML.toLowerCase()
          const secondBoardType = secondBoard
            .querySelector('.' + event.target.id)
            .innerHTML.toLowerCase()

          // Compare the items in two ways
          if (firstBoardType < secondBoardType) {
            return -1
          }
          if (firstBoardType > secondBoardType) {
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

/**
 * Checks if the passed element is a button
 * @param {Node} element is an HTML element
 * @returns
 */
function isButton(element) {
  return element.nodeName === 'BUTTON'
}
