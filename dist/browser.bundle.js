/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/public/js/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/public/js/entryHandlers.js":
/*!****************************************!*\
  !*** ./src/public/js/entryHandlers.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 Entry Handler
 Bypass the issue with Wes' code for autocomplete and others
*/


exports.autocomplete = (input, latInput, lngInput) => {

    // log the input parms as a checker only
    console.log("Called Autocomplete", input, lngInput, latInput);
  
    if(!input) return; // skip this fn from running if there is not input on the page
  
   // `https://maps.googleapis.com/maps/api/place/autocomplete/xml?input=${address}&lat=${lat}&lng=${lng}&key=${process.env.MAP_KEY}`
   const dropdown = new google.maps.places.Autocomplete(input);
   
   dropdown.addListener('place_changed', () => {
     const place = dropdown.getPlace();
      if (place.length == 0) {
        return;
      }
     
     latInput.value = place.geometry.location.lat();
     lngInput.value = place.geometry.location.lng();
     console.log(place);
   });
  
    // if someone hits enter on the address field, don't submit the form
    input.on('keydown', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        console.log("Prevented enter key from advancing")
      }
    });
  
}

// const entryHandler = require('./entryHandlers');
// entryHandler.autocomplete( res.address, res.location.lat, res.location.lng );



/***/ }),

/***/ "./src/public/js/index.ts":
/*!********************************!*\
  !*** ./src/public/js/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _entryHandlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entryHandlers */ "./src/public/js/entryHandlers.js");
/* harmony import */ var _entryHandlers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_entryHandlers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _entryHandlers__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _entryHandlers__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));



/***/ })

/******/ });
//# sourceMappingURL=browser.bundle.js.map