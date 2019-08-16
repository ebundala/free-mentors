
/**
* @desc utility function to query the dom
* @param {String} selector - a css selector to query
* @param {boolean } all - a flag to wether query one node or all nodes
* @returns {HTMLElement } return - a dom element
*/
const $ = (selector, all) => (all
  ? document.querySelectorAll(selector) : document.querySelector(selector));

/**
 * @description show or hide sidebar
 */
const toggleSideBar = () => {
  const sidebar = $('.menu');
  if (sidebar) {
    if (!sidebar.classList.contains('menu-hide')) {
      sidebar.classList.add('menu-hide');
      sidebar.classList.remove('menu-show');
    } else {
      sidebar.classList.add('menu-show');
      sidebar.classList.remove('menu-hide');
    }
  }
};

/**
 * @description a function to duplicate dom nodes in order to fill the viewlists
 * @param {String} clone - a seletctor for node to clone
 * @param {String} to - a selector to append cloned nodes
 * @param {Interger} count- a number of clones to be performed
 */
const cloneAndAppendNode = (clone, to, count = 1) => {
  const node = $(clone);
  const parent = $(to);
  if (node) {
    for (let i = 0; i < count; i += 1) {
      const cloneNode = node.cloneNode(true);
      parent.appendChild(cloneNode);
    }
  }
};
/**
 * @description app main entry point
 */
const main = () => {
  // console.debug('app loaded hooray');
  $('.menu-icon').addEventListener('click', toggleSideBar);
  cloneAndAppendNode('.mentor-card', '.main-content', 55);

  cloneAndAppendNode('.session-card', '.main-content', 35);
  cloneAndAppendNode('.mentor-review', '.mentor-reviews-list', 25);
  cloneAndAppendNode('.request-card', '.main-content', 25);
  cloneAndAppendNode('.user-row', '.user-list', 20);
};

/**
 * @desc listens for dom loading complete
 */

window.onpopstate = (event) => {
  event.preventDefault();
  // setTimeout(() => {
  // const link = document.location.toString().split('#')[1];
  // console.debug(link);
  // page(link, event.state);
  // }, 0);
};

/**
 * @desc attach app entry on document loaded
 */
document.addEventListener('DOMContentLoaded', main);
