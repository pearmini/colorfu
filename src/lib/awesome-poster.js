this["awesome"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: poster */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"poster\", function() { return poster; });\nfunction poster() {\n  let width = 3000,\n    height = 150,\n    fontFamily = \"Arial\",\n    fontSize = 100,\n    canvas = null,\n    title = \"Awesome Poster\",\n    content =\n      \"It is a Javascript library that you can create poster with awesome pictures and words\",\n    imageURL = \"\",\n    preImageURL = null,\n    preFontURL = null,\n    font = null,\n    fontURL = null,\n    img = new Image(),\n    textColor = \"white\",\n    listeners = {},\n    brush = {},\n    preWidth = 0,\n    preHeight = 0,\n    ctx = null,\n    layout = \"middle\";\n\n  brush.height = function(_) {\n    return arguments.length ? ((height = _), brush) : height;\n  };\n\n  brush.width = function(_) {\n    return arguments.length ? ((width = _), brush) : width;\n  };\n\n  brush.fontFamily = function(_) {\n    return arguments.length ? ((fontFamily = _), brush) : fontFamily;\n  };\n\n  brush.fontSize = function(_) {\n    return arguments.length ? ((fontSize = _), brush) : fontSize;\n  };\n\n  brush.fontURL = function(_) {\n    return arguments.length ? ((fontURL = _), brush) : fontURL;\n  };\n\n  brush.canvas = function(_) {\n    return arguments.length > 0 ? ((canvas = _), brush) : canvas;\n  };\n\n  brush.textColor = function(_) {\n    return arguments.length > 0 ? ((textColor = _), brush) : textColor;\n  };\n\n  brush.title = function(_) {\n    return arguments.length ? ((title = _), brush) : title;\n  };\n\n  brush.imageURL = function(_) {\n    return arguments.length ? ((imageURL = _), brush) : imageURL;\n  };\n\n  brush.content = function(_) {\n    return arguments.length ? ((content = _), brush) : content;\n  };\n\n  brush.layout = function(_) {\n    return arguments.length ? ((layout = _), brush) : layout;\n  };\n\n  brush.on = function(event, callback) {\n    listeners[event] = callback;\n    return brush;\n  };\n\n  brush.saveToPng = function(filename) {\n    canvas.toBlob(function(blob) {\n      const url = URL.createObjectURL(blob);\n      const a = document.createElement(\"a\");\n      a.href = url;\n      a.download = filename;\n      a.click();\n    });\n\n  };\n\n  brush.draw = async function() {\n    if (preWidth != width || preHeight != height) {\n      [preWidth, preHeight] = [width, height];\n      setupCanvas();\n    }\n    if (fontURL && preFontURL != fontURL) {\n      preFontURL = fontURL;\n      await loadFont();\n    }\n\n    if (preImageURL != imageURL) {\n      console.log(\"loading\");\n      preImageURL = imageURL;\n      await loadImage();\n    }\n\n    draw();\n  };\n\n  function dispatch(event, ...rest) {\n    if (listeners[event]) {\n      listeners[event](...rest);\n    }\n  }\n\n  function setupCanvas() {\n    // 设置 canvas\n    canvas.width = width * 2;\n    canvas.height = height * 2;\n\n    // 这里必须要加 px\n    canvas.style.width = width + \"px\";\n    canvas.style.height = height + \"px\";\n\n    // 获得上下文对象\n    ctx = canvas.getContext(\"2d\");\n    ctx.scale(2, 2);\n  }\n\n  function loadFont() {\n    const name = \"myFont\";\n    font = new FontFace(name, `url(${fontURL})`);\n\n    return font.load().then(font => {\n      document.fonts.add(font);\n      fontFamily = name;\n    });\n  }\n\n  function loadImage() {\n    return new Promise((resolve, reject) => {\n      img.src = imageURL;\n      img.onload = () => {\n        resolve();\n      };\n    });\n  }\n\n  function draw() {\n    // 绘制图片\n    ctx.drawImage(img, 0, 0, width, height);\n\n    // 设置字体样式\n    ctx.fillStyle = textColor;\n\n    ctx.textBaseline = \"middle\";\n    ctx.shadowColor = \"black\";\n    ctx.shadowOffsetX = 1;\n    ctx.shadowOffsetY = 1;\n    ctx.shadowBlur = 3;\n\n    let x,\n      y = height / 2,\n      textAlign;\n\n    switch (layout) {\n      case \"middle\": {\n        x = width / 2;\n        textAlign = \"center\";\n        break;\n      }\n      case \"right\": {\n        x = width - width / 12;\n        textAlign = \"end\";\n        break;\n      }\n      case \"left\": {\n        x = width / 12;\n        textAlign = \"start\";\n        break;\n      }\n      default: {\n        x = width / 2;\n        textAlign = \"center\";\n      }\n    }\n\n    ctx.textAlign = textAlign;\n\n    // 绘制标题\n    ctx.font = `bold ${fontSize}px ${fontFamily}`;\n    ctx.fillText(title, x, y);\n\n    // 绘制内容\n    ctx.font = `bold ${fontSize / 7}px ${fontFamily}`;\n    ctx.fillText(content, x, y + 140);\n    dispatch(\"end\", \"绘制完成\");\n  }\n  return brush;\n}\n\n\n//# sourceURL=webpack://awesome/./src/index.js?");

/***/ })

/******/ });