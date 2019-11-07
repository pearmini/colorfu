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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"poster\", function() { return poster; });\nfunction poster() {\n  let width = 3000,\n    height = 150,\n    fontFamily = \"Arial\",\n    fontSize = 100,\n    canvas = null,\n    title = \"Awesome Poster\",\n    contents = [\n      \"It is a Javascript library that you can create poster with awesome pictures and words\"\n    ],\n    imageURL = \"\",\n    preImageURL = null,\n    preFontURL = null,\n    font = null,\n    fontURL = null,\n    img = new Image(),\n    textColor = \"white\",\n    listeners = {},\n    brush = {},\n    preWidth = 0,\n    preHeight = 0,\n    ctx = null,\n    layout = \"middle\",\n    contentFontSize = 40,\n    contentFontFamily = \"Arial\",\n    contentTextColor = \"#f0f0f0\";\n\n  const maxWidthRate = 0.8,\n    maxTitleHeightRate = 0.2,\n    maxContentTextWidthRate = 0.8,\n    maxFontSize = 150,\n    maxContentTextSize = 40;\n\n  brush.height = function(_) {\n    return arguments.length ? ((height = _), brush) : height;\n  };\n\n  brush.width = function(_) {\n    return arguments.length ? ((width = _), brush) : width;\n  };\n\n  brush.fontFamily = function(_) {\n    return arguments.length ? ((fontFamily = _), brush) : fontFamily;\n  };\n\n  brush.fontSize = function(_) {\n    return arguments.length ? ((fontSize = _), brush) : fontSize;\n  };\n\n  brush.fontURL = function(_) {\n    return arguments.length ? ((fontURL = _), brush) : fontURL;\n  };\n\n  brush.canvas = function(_) {\n    return arguments.length > 0 ? ((canvas = _), brush) : canvas;\n  };\n\n  brush.textColor = function(_) {\n    return arguments.length > 0 ? ((textColor = _), brush) : textColor;\n  };\n\n  brush.title = function(_) {\n    return arguments.length ? ((title = _), brush) : title;\n  };\n\n  brush.imageURL = function(_) {\n    return arguments.length ? ((imageURL = _), brush) : imageURL;\n  };\n\n  brush.contents = function(_) {\n    return arguments.length ? ((contents = _), brush) : contents;\n  };\n\n  brush.layout = function(_) {\n    return arguments.length ? ((layout = _), brush) : layout;\n  };\n\n  brush.contentFontSize = function(_) {\n    return arguments.length ? ((contentFontSize = _), brush) : contentFontSize;\n  };\n\n  brush.contentFontFamily = function(_){\n    return arguments.length ? ((contentFontFamily =_), brush) : contentFontFamily;\n  }\n\n  brush.contentTextColor = function(_){\n    return arguments.length ? ((contentTextColor = _), brush):  contentTextColor;\n  }\n\n  brush.on = function(event, callback) {\n    listeners[event] = callback;\n    return brush;\n  };\n\n  brush.canvasToPng = function(filename) {\n    canvas.toBlob(function(blob) {\n      const url = URL.createObjectURL(blob);\n      const a = document.createElement(\"a\");\n      a.href = url;\n      a.download = filename;\n      a.click();\n    });\n  };\n\n  brush.draw = async function() {\n    dispatch(\"canvasWillDraw\", \"开始绘制\");\n    if (preWidth != width || preHeight != height) {\n      [preWidth, preHeight] = [width, height];\n      setupCanvas();\n    }\n    if (fontURL && preFontURL != fontURL) {\n      dispatch(\"canvasWillLoadFont\", \"开始加载字体\");\n      preFontURL = fontURL;\n      await loadFont();\n      dispatch(\"canvasDidLoadFont\", \"加载字体结束\");\n    }\n\n    if (preImageURL != imageURL) {\n      dispatch(\"canvasWillLoadImage\", \"开始加载图片\");\n      preImageURL = imageURL;\n      await loadImage();\n      dispatch(\"canvasDidLoadImage\", \"加载图片结束\");\n    }\n\n    draw();\n    dispatch(\"canvasDidDraw\", \"绘制完成\");\n  };\n\n  function dispatch(event, ...rest) {\n    if (listeners[event]) {\n      listeners[event](...rest);\n    }\n  }\n\n  function setupCanvas() {\n    // 设置 canvas\n    canvas.width = width * 2;\n    canvas.height = height * 2;\n\n    // 这里必须要加 px\n    canvas.style.width = width + \"px\";\n    canvas.style.height = height + \"px\";\n\n    // 获得上下文对象\n    ctx = canvas.getContext(\"2d\");\n    ctx.scale(2, 2);\n  }\n\n  function loadFont() {\n    const name = \"myFont\";\n    font = new FontFace(name, `url(${fontURL})`);\n    return font.load().then(font => {\n      document.fonts.add(font);\n      fontFamily = name;\n    });\n  }\n\n  function loadImage() {\n    img.crossOrigin = \"Anonymous\";\n    return new Promise((resolve, reject) => {\n      img.src = imageURL;\n      img.onload = () => {\n        resolve();\n      };\n    });\n  }\n\n  function setTitleTextWidth() {\n    let textWidth, textHeight, textBox;\n    fontSize = Math.min(maxFontSize, fontSize);\n    do {\n      ctx.font = `bold ${fontSize}px ${fontFamily}`;\n      textBox = ctx.measureText(title);\n      textWidth = textBox.width;\n      textHeight =\n        textBox.actualBoundingBoxAscent + textBox.actualBoundingBoxDescent;\n      fontSize -= 1;\n    } while (\n      textWidth > maxWidthRate * width ||\n      textHeight > maxTitleHeightRate * height\n    );\n    return textHeight;\n  }\n\n  function setContentTextWidth() {\n    let contentTextWidth, textHeight, textBox;\n    contentFontSize = Math.min(maxContentTextSize, contentFontSize);\n\n    // 找到最长的句子\n    let content = \"\",\n      maxLength = -1,\n      len;\n    contents.forEach(item => {\n      if ((len = item.length > maxLength)) {\n        content = item;\n        maxLength = len;\n      }\n    });\n\n    do {\n      ctx.font = `${contentFontSize}px ${contentFontFamily}`;\n      textBox = ctx.measureText(content);\n      contentTextWidth = textBox.width;\n      textHeight =\n        textBox.actualBoundingBoxAscent + textBox.actualBoundingBoxDescent;\n      contentFontSize -= 1;\n    } while (contentTextWidth > maxContentTextWidthRate * width);\n    return textHeight;\n  }\n\n  function getImageSize() {\n    const imgRatio = img.width / img.height;\n    const windowRatio = width / height;\n    let imageWidth, imageHeight;\n    if (imgRatio > windowRatio) {\n      imageHeight = img.height;\n      imageWidth = imageHeight * windowRatio;\n    } else {\n      imageWidth = img.width;\n      imageHeight = imageWidth / windowRatio;\n    }\n\n    const imageX = img.width / 2 - imageWidth / 2,\n      imageY = img.height / 2 - imageHeight / 2;\n    return [imageX, imageY, imageWidth, imageHeight];\n  }\n\n  function getTextPostion() {\n    let x,\n      textAlign,\n      y = height / 2;\n\n    switch (layout) {\n      case \"middle\": {\n        x = width / 2;\n        textAlign = \"center\";\n        break;\n      }\n      case \"right\": {\n        x = width - width / 12;\n        textAlign = \"end\";\n        break;\n      }\n      case \"left\": {\n        x = width / 12;\n        textAlign = \"start\";\n        break;\n      }\n      default: {\n        x = width / 2;\n        textAlign = \"center\";\n      }\n    }\n    ctx.textAlign = textAlign;\n    return [x, y];\n  }\n\n  function draw() {\n    const [sx, sy, swidth, sheight] = getImageSize();\n    // 绘制图片\n    ctx.drawImage(img, sx, sy, swidth, sheight, 0, 0, width, height);\n\n    // 设置字体样式\n    \n\n    ctx.textBaseline = \"middle\";\n    ctx.shadowColor = \"black\";\n    ctx.shadowOffsetX = 1;\n    ctx.shadowOffsetY = 1;\n    ctx.shadowBlur = 3;\n\n    const [x, y] = getTextPostion();\n\n    // 绘制标题\n    const titleHeight = setTitleTextWidth();\n    ctx.fillStyle = textColor;\n    ctx.font = `bold ${fontSize}px ${fontFamily}`;\n    ctx.fillText(title, x, y);\n\n    // 绘制内容\n    const contentHeight = setContentTextWidth();\n    const offset = titleHeight * 1.5;\n\n    ctx.fillStyle = contentTextColor;\n    ctx.font = `${contentFontSize}px ${contentFontFamily}`;\n    contents.forEach((sentence, index) => {\n      ctx.fillText(sentence, x, y + offset + contentHeight * index * 1.5);\n    });\n  }\n  return brush;\n}\n\n\n//# sourceURL=webpack://awesome/./src/index.js?");

/***/ })

/******/ });