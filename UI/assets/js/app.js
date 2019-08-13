
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
 * @description app main entry point
 */
const main = () => {
  // console.debug('app loaded hooray');
  $('.menu-icon').addEventListener('click', toggleSideBar);
};

/**
 * @desc listens for dom loading complete
 */

window.onpopstate = (event) => {
  event.preventDefault();
  setTimeout(() => {
    // const link = document.location.toString().split('#')[1];
    // console.debug(link);
    // page(link, event.state);
  }, 0);
};

/**
 * @desc attach app entry on document loaded
 */
document.addEventListener('DOMContentLoaded', main);
