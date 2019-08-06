"use strict";

/**
 * @description app main entry point
 */
const main=(e)=>{  
   console.debug("app loaded hooray");
}



/**
* @desc utility function to query the dom
* @param {String} selector - a css selector to query
* @param {boolean } all - a flag to wether query one node or all nodes
* @returns {HTMLElement } return - a dom element
*/
const $=(selector,all)=> {
    return all?document.querySelectorAll(selector):document.querySelector(selector)
}


/**
 * @desc listens for dom loading complete
 */

window.onpopstate =(event)=>{
    event.preventDefault();
    setTimeout(() =>{
        console.debug("location: " + document.location + ", state: " + JSON.stringify(event.state));

var link=document.location.toString().split("#")[1];
console.debug(link);
    page(link,event.state);
    },0)
};

/**
 * @desc attach app entry on document loaded
 */
document.addEventListener("DOMContentLoaded", main)
