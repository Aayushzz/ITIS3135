'use strict';

/**
 * Returns a string of the count and Bet or Hold
 * @param {array} cards - an array of cards
 * @returns {string} - message 
 */
function countCards(cards) {
  let count = 0;

  for (let card of cards) {
    let c = card.toString();

    if (["2", "3", "4", "5", "6"].includes(c)) {
      count += 1;
    } else if (["10", "J", "Q", "K", "A"].includes(c)) {
      count -= 1;
    }
  }

  return count > 0 ? `${count} Bet` : `${count} Hold`;
}

// uncomment following test code after implementing the function
console.log(countCards([2, 3, 7, 'K', 'A']));     // Expected: 0 Hold
console.log(countCards([2, 3, 4, 5, 6]));          // Expected: 5 Bet
console.log(countCards([7, 8, 9]));                 // Expected: 0 Hold
console.log(countCards([10, 'J', 'Q', 'K', 'A']));  // Expected: -5 Hold
console.log(countCards([3, 7, 'Q', 8, 'A']));       // Expected: -1 Hold
console.log(countCards([2, 2, 10]));                 // Expected: 1 Bet
console.log(countCards([2, 9, 'J', 2, 7]));          // Expected: 1 Bet
console.log(countCards([3, 2, 'A', 10, 'K']));       // Expected: -1 Hold
