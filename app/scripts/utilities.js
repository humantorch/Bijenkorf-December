// usage: log('inside coolFunc',this,arguments);
// http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
    log.history = log.history || [];   // store logs to an array for reference
    log.history.push(arguments);
    if(this.console){
        console.log( Array.prototype.slice.call(arguments) );
    }
};


// Shortcut emulation of jQuery's $() synatx

var $ = function(el) {
   return document.querySelector(el);
};

var forEach = Array.prototype.forEach,
    // query selector all runs a CSS selector and returns a list of elements
    // matching the selector
    $$ = document.querySelectorAll.bind(document);