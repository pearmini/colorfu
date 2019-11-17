(this.webpackJsonpupwords=this.webpackJsonpupwords||[]).push([[0],{168:function(module,exports){this.awesome=function(e){var n={};function t(a){if(n[a])return n[a].exports;var i=n[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=e,t.c=n,t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:a})},t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(t.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(a,i,function(n){return e[n]}.bind(null,i));return a},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s="./src/index.js")}({"./src/index.js":function srcIndexJs(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "poster", function() { return poster; });\nfunction poster() {\n  let width = 3000,\n    height = 150,\n    fontFamily = "Arial",\n    fontSize = 100,\n    canvas = null,\n    title = "Awesome Poster",\n    contents = [\n      "It is a Javascript library that you can create poster with awesome pictures and words"\n    ],\n    imageURL = "",\n    preImageURL = null,\n    preFontURL = null,\n    font = null,\n    fontURL = null,\n    img = new Image(),\n    textColor = "white",\n    listeners = {},\n    brush = {},\n    preWidth = 0,\n    preHeight = 0,\n    ctx = null,\n    layout = "middle",\n    contentFontSize = 40,\n    contentFontFamily = "Arial",\n    contentTextColor = "#f0f0f0",\n    offset = 0.2,\n    loading = false;\n\n  const maxWidthRate = 0.6,\n    maxTitleHeightRate = 0.2,\n    maxContentTextWidthRate = 0.8,\n    maxFontSize = 150,\n    maxContentTextSize = 40;\n\n  brush.height = function(_) {\n    return arguments.length ? ((height = _), brush) : height;\n  };\n\n  brush.width = function(_) {\n    return arguments.length ? ((width = _), brush) : width;\n  };\n\n  brush.fontFamily = function(_) {\n    return arguments.length ? ((fontFamily = _), brush) : fontFamily;\n  };\n\n  brush.fontSize = function(_) {\n    return arguments.length ? ((fontSize = _), brush) : fontSize;\n  };\n\n  brush.fontURL = function(_) {\n    return arguments.length ? ((fontURL = _), brush) : fontURL;\n  };\n\n  brush.canvas = function(_) {\n    return arguments.length > 0 ? ((canvas = _), brush) : canvas;\n  };\n\n  brush.textColor = function(_) {\n    return arguments.length > 0 ? ((textColor = _), brush) : textColor;\n  };\n\n  brush.title = function(_) {\n    return arguments.length ? ((title = _), brush) : title;\n  };\n\n  brush.imageURL = function(_) {\n    return arguments.length ? ((imageURL = _), brush) : imageURL;\n  };\n\n  brush.contents = function(_) {\n    return arguments.length ? ((contents = _), brush) : contents;\n  };\n\n  brush.layout = function(_) {\n    return arguments.length ? ((layout = _), brush) : layout;\n  };\n\n  brush.contentFontSize = function(_) {\n    return arguments.length ? ((contentFontSize = _), brush) : contentFontSize;\n  };\n\n  brush.contentFontFamily = function(_) {\n    return arguments.length\n      ? ((contentFontFamily = _), brush)\n      : contentFontFamily;\n  };\n\n  brush.contentTextColor = function(_) {\n    return arguments.length\n      ? ((contentTextColor = _), brush)\n      : contentTextColor;\n  };\n\n  brush.on = function(event, callback) {\n    listeners[event] = callback;\n    return brush;\n  };\n\n  brush.canvasToPng = function(filename) {\n    canvas.toBlob(function(blob) {\n      const url = URL.createObjectURL(blob);\n      const a = document.createElement("a");\n      a.href = url;\n      a.download = filename;\n      a.click();\n    });\n  };\n\n  brush.draw = async function() {\n    if (preWidth != width || preHeight != height) {\n      setupCanvas();\n    }\n    if (fontURL && preFontURL != fontURL) {\n      await loadFont();\n    }\n\n    if (preImageURL != imageURL) {\n      await loadImage();\n    }\n\n    if (!loading) {\n      draw();\n    }\n  };\n\n  function dispatch(event, ...rest) {\n    if (listeners[event]) {\n      listeners[event](...rest);\n    }\n  }\n\n  function setupCanvas() {\n    [preWidth, preHeight] = [width, height];\n    // \u8bbe\u7f6e canvas\n    canvas.width = width * 2;\n    canvas.height = height * 2;\n\n    // \u8fd9\u91cc\u5fc5\u987b\u8981\u52a0 px\n    canvas.style.width = width + "px";\n    canvas.style.height = height + "px";\n\n    // \u83b7\u5f97\u4e0a\u4e0b\u6587\u5bf9\u8c61\n    ctx = canvas.getContext("2d");\n    ctx.scale(2, 2);\n  }\n\n  function loadFont() {\n    dispatch("canvasWillLoadFont", "\u5f00\u59cb\u52a0\u8f7d\u5b57\u4f53");\n    const name = "myFont";\n    font = new FontFace(name, `url(${fontURL})`);\n    return font.load().then(font => {\n      document.fonts.add(font);\n      fontFamily = name;\n      preFontURL = fontURL;\n      dispatch("canvasDidLoadFont", "\u52a0\u8f7d\u5b57\u4f53\u7ed3\u675f");\n    });\n  }\n\n  function loadImage() {\n    dispatch("canvasWillLoadImage", "\u5f00\u59cb\u52a0\u8f7d\u56fe\u7247");\n    loading = true;\n    img.crossOrigin = "Anonymous";\n    return new Promise((resolve, reject) => {\n      img.src = imageURL;\n      img.onload = () => {\n        loading = false;\n        preImageURL = imageURL;\n        dispatch("canvasDidLoadImage", "\u52a0\u8f7d\u56fe\u7247\u7ed3\u675f");\n        resolve();\n      };\n    });\n  }\n\n  function setTitleTextWidth() {\n    let textWidth, textHeight, textBox;\n    fontSize = Math.min(maxFontSize, fontSize);\n    do {\n      ctx.font = `bold ${fontSize}px ${fontFamily}`;\n      textBox = ctx.measureText(title);\n      textWidth = textBox.width;\n      textHeight =\n        textBox.actualBoundingBoxAscent + textBox.actualBoundingBoxDescent;\n      fontSize -= 1;\n    } while (\n      textWidth > maxWidthRate * width ||\n      textHeight > maxTitleHeightRate * height\n    );\n    return textHeight;\n  }\n\n  function setContentTextWidth() {\n    let contentTextWidth, textHeight, textBox;\n    contentFontSize = Math.min(maxContentTextSize, contentFontSize);\n\n    // \u627e\u5230\u6700\u957f\u7684\u53e5\u5b50\n    let content = "",\n      maxLength = -1,\n      len;\n    contents.forEach(item => {\n      if ((len = item.length > maxLength)) {\n        content = item;\n        maxLength = len;\n      }\n    });\n\n    do {\n      ctx.font = `${contentFontSize}px ${contentFontFamily}`;\n      textBox = ctx.measureText(content);\n      contentTextWidth = textBox.width;\n      textHeight =\n        textBox.actualBoundingBoxAscent + textBox.actualBoundingBoxDescent;\n      contentFontSize -= 1;\n    } while (contentTextWidth > maxContentTextWidthRate * width);\n    return textHeight;\n  }\n\n  function getImageSize() {\n    const imgRatio = img.width / img.height;\n    const windowRatio = width / height;\n    let imageWidth, imageHeight;\n    if (imgRatio > windowRatio) {\n      imageHeight = img.height;\n      imageWidth = imageHeight * windowRatio;\n    } else {\n      imageWidth = img.width;\n      imageHeight = imageWidth / windowRatio;\n    }\n\n    const imageX = img.width / 2 - imageWidth / 2,\n      imageY = img.height / 2 - imageHeight / 2;\n    return [imageX, imageY, imageWidth, imageHeight];\n  }\n\n  function getTextPostion() {\n    let x,\n      textAlign,\n      y = height / 2;\n\n    switch (layout) {\n      case "middle": {\n        x = width / 2;\n        textAlign = "center";\n        break;\n      }\n      case "right": {\n        x = width - width / 12;\n        textAlign = "end";\n        break;\n      }\n      case "left": {\n        x = width / 12;\n        textAlign = "start";\n        break;\n      }\n      default: {\n        x = width / 2;\n        textAlign = "center";\n      }\n    }\n    ctx.textAlign = textAlign;\n    return [x, y];\n  }\n\n  function draw() {\n    dispatch("canvasWillDraw", "\u5f00\u59cb\u7ed8\u5236");\n    const [sx, sy, swidth, sheight] = getImageSize();\n    // \u7ed8\u5236\u56fe\u7247\n    ctx.drawImage(img, sx, sy, swidth, sheight, 0, 0, width, height);\n\n    // \u8bbe\u7f6e\u5b57\u4f53\u6837\u5f0f\n    ctx.textBaseline = "middle";\n    ctx.shadowColor = "black";\n    ctx.shadowOffsetX = 1;\n    ctx.shadowOffsetY = 1;\n    ctx.shadowBlur = 3;\n\n    const [x, y] = getTextPostion();\n\n    // \u7ed8\u5236\u6807\u9898\n    const titleHeight = setTitleTextWidth();\n    ctx.fillStyle = textColor;\n    ctx.font = `bold ${fontSize}px ${fontFamily}`;\n    ctx.fillText(title, x, y);\n\n    // \u7ed8\u5236\u5185\u5bb9\n    const contentHeight = setContentTextWidth();\n\n    if (height > width) {\n      offset = 0.1;\n    } else {\n      offset = 0.2;\n    }\n    const contentOffset = height * offset;\n\n    ctx.fillStyle = contentTextColor;\n    ctx.font = `${contentFontSize}px ${contentFontFamily}`;\n    contents.forEach((sentence, index) => {\n      ctx.fillText(\n        sentence,\n        x,\n        y + contentOffset + contentHeight * index * 1.5\n      );\n    });\n    dispatch("canvasDidDraw", "\u7ed8\u5236\u5b8c\u6210");\n  }\n  return brush;\n}\n\n\n//# sourceURL=webpack://awesome/./src/index.js?')}})},172:function(e,n,t){e.exports=t(365)},364:function(e,n,t){},365:function(e,n,t){"use strict";t.r(n);var a=t(0),i=t.n(a),o=t(4),c=t.n(o),r=t(32),l=(t(66),t(366)),h=t(367),u=t(372),s=t(114);var f=function(e){var n=e.value,t=e.dispatch,a=n.map((function(e,n){return i.a.createElement(l.a,{key:n,gutter:8},i.a.createElement(h.a,{span:20},i.a.createElement(u.a,{type:"text",value:e,onChange:function(e){return t({type:"changeContent",value:e.target.value,index:e.target.name})},name:n,allowClear:!0})),i.a.createElement(h.a,{span:4},i.a.createElement(s.a,{onClick:function(e){return t({type:"deleteContent",index:e.target.name})},name:n,icon:"delete"})))}));return i.a.createElement("div",null,i.a.createElement(u.a,{type:"text",placeholder:"\u6dfb\u52a0\u5185\u5bb9",onKeyDown:function(e){"Enter"===e.key&&(t({type:"addContent",value:e.target.value}),e.target.value="")}}),i.a.createElement("div",null,a))},g=t(374),m=t(370),d=t(371),S=t(369),p=t(8),x=t(373);var F=function(e){var n=e.windowSize,t=e.editMode,a=e.canvasState,o=e.dispatch,c=e.loading,r=e.fonts,F=i.a.createElement(g.a,{title:"DIY Your Wordspaper",placement:"left",closable:!0,onClose:function(){return t.setFalse()},visible:t.value,getContainer:!1,style:{position:"absolute"},width:.2*n.width>256?.2*n.width:256},i.a.createElement(m.a,null,i.a.createElement(m.a.Item,{label:"\u6807\u9898"},i.a.createElement(u.a,{type:"text",value:a.title,onChange:function(e){return o({type:"change",key:"title",value:e.target.value})},allowClear:!0})),i.a.createElement(l.a,{gutter:8},i.a.createElement(h.a,{span:16},i.a.createElement(m.a.Item,{label:"\u6807\u9898\u5b57\u4f53"},i.a.createElement(d.a,{value:a.fontFamily,style:{fontFamily:a.fontFamily},onChange:function(e){return o({type:"change",key:"fontFamily",value:e})}},i.a.createElement(d.a.OptGroup,{label:"\u6240\u6709\u8bed\u8a00"},r.all.map((function(e,n){return i.a.createElement(d.a.Option,{key:n,value:e.en,style:{fontFamily:e.en}},e.ch)}))),i.a.createElement(d.a.OptGroup,{label:"\u82f1\u8bed"},r.en.map((function(e,n){return i.a.createElement(d.a.Option,{key:n,value:e.en,style:{fontFamily:e.en}},e.ch)})))))),i.a.createElement(h.a,{span:8},i.a.createElement(m.a.Item,{label:"\u6807\u9898\u989c\u8272"},i.a.createElement(u.a,{type:"color",value:a.textColor,onChange:function(e){return o({type:"change",key:"textColor",value:e.target.value})}})))),i.a.createElement(m.a.Item,{label:"\u5185\u5bb9"},i.a.createElement(f,{value:a.contents,dispatch:o})),i.a.createElement(l.a,{gutter:8},i.a.createElement(h.a,{span:16},i.a.createElement(m.a.Item,{label:"\u5185\u5bb9\u5b57\u4f53"},i.a.createElement(d.a,{value:a.contentFontFamily,style:{fontFamily:a.contentFontFamily},onChange:function(e){return o({type:"change",key:"contentFontFamily",value:e})}},i.a.createElement(d.a.OptGroup,{label:"\u6240\u6709\u8bed\u8a00"},r.all.map((function(e,n){return i.a.createElement(d.a.Option,{key:n,value:e.en,style:{fontFamily:e.en}},e.ch)}))),i.a.createElement(d.a.OptGroup,{label:"\u82f1\u8bed"},r.en.map((function(e,n){return i.a.createElement(d.a.Option,{key:n,value:e.en,style:{fontFamily:e.en}},e.ch)})))))),i.a.createElement(h.a,{span:8},i.a.createElement(m.a.Item,{label:"\u5185\u5bb9\u5b57\u4f53\u989c\u8272"},i.a.createElement(u.a,{type:"color",value:a.contentTextColor,onChange:function(e){return o({type:"change",key:"contentTextColor",value:e.target.value})}})))),i.a.createElement(m.a.Item,{label:"\u58c1\u7eb8"},i.a.createElement(S.a,{accept:"image/*",onChange:function(e){var n=e.file.originFileObj,t=new FileReader;t.readAsDataURL(n),t.onload=function(){var e=t.result;o({type:"changeImage",imageURL:e})}},showUploadList:!1,customRequest:function(){}},i.a.createElement(s.a,null,i.a.createElement(p.a,{type:"upload"})," \u4e0a\u4f20\u56fe\u7247"))),i.a.createElement(m.a.Item,{label:"\u5e03\u5c40"},i.a.createElement(x.a.Group,{defaultValue:a.layout,buttonStyle:"solid",onChange:function(e){return o({type:"change",key:"layout",value:e.target.value})}},i.a.createElement(x.a.Button,{value:"left"},"\u5de6\u8fb9"),i.a.createElement(x.a.Button,{value:"middle"},"\u4e2d\u95f4"),i.a.createElement(x.a.Button,{value:"right"},"\u53f3\u8fb9"))))),y=i.a.createElement("div",{style:{position:"absolute",left:10,top:10}},i.a.createElement(s.a,{shape:"circle",icon:"edit",ghost:!0,onClick:function(){t.setTrue()}}));return i.a.createElement("div",null,!c.value&&i.a.createElement("div",null,t.value?F:y))},y=t(115),v=t(368),w=function(e){var n=e.canvasState,t=e.windowSize,o=e.poster,c=e.loading,r=e.fonts,l={position:"absolute",left:window.innerWidth/2-20,top:window.innerHeight/2-20};return o.on("canvasWillDraw",console.log).on("canvasDidDraw",console.log).on("canvasWillLoadFont",console.log).on("canvasDidLoadFont",console.log).on("canvasWillLoadImage",console.log).on("canvasDidLoadImage",(function(){return c.setFalse()})),o.imageURL(n.imageURL).title(n.title).contents(n.contents),o.fontSize(n.fontSize).contentFontSize(n.contentFontSize).fontFamily(n.fontFamily).contentFontFamily(n.contentFontFamily).textColor(n.textColor).contentTextColor(n.contentTextColor),o.width(t.width).height(t.height).layout(n.layout),Object(a.useEffect)((function(){var e=document.getElementById("app");o.canvas(e),o.draw()})),i.a.createElement("div",null,c.value&&i.a.createElement(v.a,{size:"large",tip:"\u52a0\u8f7d\u56fe\u7247\u4e2d...",style:l}),i.a.createElement("canvas",{id:"app"}),[].concat(Object(y.a)(r.all),Object(y.a)(r.en)).map((function(e,n){return i.a.createElement("p",{style:{fontFamily:e.en},key:n},"hello world")})))},b=function(e){var n=e.handleNext,t=e.handlePre,a=e.poster,o=e.loading;return i.a.createElement("div",null,!o.value&&i.a.createElement("div",null,i.a.createElement(s.a,{shape:"circle",icon:"left",ghost:!0,style:{position:"absolute",right:110,bottom:10},onClick:function(){t()}}),i.a.createElement(s.a,{shape:"circle",icon:"right",ghost:!0,style:{position:"absolute",bottom:10,right:60},onClick:function(){n()}}),i.a.createElement(s.a,{shape:"circle",icon:"download",ghost:!0,style:{position:"absolute",bottom:10,right:10},onClick:function(){!function(e){var n=a.title();a.canvasToPng("".concat(n,".png"))}()}})))};var C=function(){var e=this,n=Object(a.useState)(window.innerWidth),t=Object(r.a)(n,2),i=t[0],o=t[1],c=Object(a.useState)(window.innerHeight),l=Object(r.a)(c,2),h=l[0],u=l[1];return Object(a.useEffect)((function(){return window.addEventListener("resize",(function(){o(window.innerWidth),u(window.innerHeight)})),function(){window.removeEventListener("resize",e)}})),[i,h]},T=function(e){var n=Object(a.useState)(e),t=Object(r.a)(n,2),i=t[0],o=t[1];return{value:i,setTrue:function(){return o(!0)},setFalse:function(){return o(!1)}}},Z=function(e,n){switch(n.type){case"increment":return{count:e.count+1};case"decrement":return{count:e.count-1}}},E=function(e){var n={count:e};return Object(a.useReducer)(Z,n)},H=t(113);function L(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function _(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?L(t,!0).forEach((function(n){Object(H.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):L(t).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var O=function(e,n){switch(n.type){case"update":return n.canvas;case"change":return _({},e,Object(H.a)({},n.key,n.value));case"changeImage":return _({},e,{imageURL:n.imageURL});case"addContent":return function(e,n){var t=e.contents.slice(),a=n.value;return t.push(a),_({},e,{contents:t})}(e,n);case"deleteContent":return function(e,n){var t=e.contents.slice(),a=n.index;return t.splice(a,1),_({},e,{contents:t})}(e,n);case"changeContent":return function(e,n){var t=e.contents.slice(),a=n.index,i=n.value;return t[a]=i,_({},e,{contents:t})}(e,n)}},R=function(e){return Object(a.useReducer)(O,e)},z=t(168),M=[{title:"WordsPaper",contents:["It is a web tool to create awesome pictures like this.","You can use them as wallpaper or event a gift.","You can DIY by click the top-left button or see more examples."],imageURL:"https://i.loli.net/2019/11/11/qLXbkMHA8FmEg4B.jpg",layout:"middle",fontFamily:"Righteous",textColor:"#ffffff",fontSize:150,contentFontSize:40,contentFontFamily:"Poiret One",contentTextColor:"#ffffff"},{title:"\u6211\u4eec\u90fd\u662f\u5c0f\u602a\u517d",contents:["\u4f60\u966a\u4e86\u6211\u591a\u5c11\u5e74\uff0c\u82b1\u5f00\u82b1\u8c22\uff0c\u4e00\u8def\u4e0a\u8dcc\u8dcc\u649e\u649e\u3002","\u6625\u590f\u79cb\u51ac\u6cef\u548c\u706d\uff0c\u5e55\u8fd8\u672a\u8c22\u3002"],imageURL:"https://i.loli.net/2019/11/15/Umh8BTqs6nfCPeY.jpg",layout:"right",fontFamily:"Wawati SC",textColor:"#ffffff",fontSize:150,contentFontSize:40,contentFontFamily:"Hanzipen SC",contentTextColor:"#ffffff"},{title:"\u4f60\u7684\u540d\u5b57",contents:["\u6211\u5f88\u60f3\u660e\u767d","\u5f53\u6211\u7684\u540d\u5b57\u6ed1\u8fc7\u4f60\u7684\u8033\u8fb9","\u4f60\u7684\u8111\u888b\u91cc\u4f1a\u95ea\u73b0\u4e9b\u4ec0\u4e48"],imageURL:"https://i.loli.net/2019/11/11/ve2RnJTb7P9G6NS.jpg",layout:"right",fontFamily:"Wawati SC",textColor:"#ffffff",fontSize:150,contentFontSize:40,contentFontFamily:"Hanzipen SC",contentTextColor:"#ffffff"},{title:"The Lord of Rings",contents:["That there's some good in this world, Mr. Frodo.","And it's worth fighting for."],imageURL:"https://i.loli.net/2019/11/11/tICFG8nLT6pf5b3.jpg",layout:"left",fontFamily:"Wawati SC",textColor:"#ffffff",fontSize:150,contentFontSize:40,contentFontFamily:"Hanzipen SC",contentTextColor:"#ffffff"},{title:"Blackpool",contents:["The vocalizations of starlings have long been considered similar to murmured human speech.","This led to the collective noun describing a group of the birds: ","a murmuration of starlings."],imageURL:"https://i.loli.net/2019/11/15/chlomFCxTp5I1qZ.jpg",layout:"middle",fontFamily:"Wawati SC",textColor:"#ffffff",fontSize:150,contentFontSize:40,contentFontFamily:"Hanzipen SC",contentTextColor:"#ffffff"},{title:"\u5927\u4e0d\u4e86\u641e\u7838",contents:["\u4f1f\u5927\u7684\u5149\u8f89\u4e0d\u5728\u4e8e\u6c38\u4e0d\u5760\u843d","\u800c\u5728\u4e8e\u5760\u843d\u4e4b\u540e\u603b\u4f1a\u5347\u8d77"],imageURL:"https://i.loli.net/2019/11/11/7CcoInTaF2VfEq8.jpg",layout:"right",fontFamily:"Wawati SC",textColor:"#ffffff",fontSize:150,contentFontSize:40,contentFontFamily:"Hanzipen SC",contentTextColor:"#ffffff"}],W=function(e){if("string"!=typeof e)return!1;var n="Arial";if(e.toLowerCase()==n.toLowerCase())return!0;var t=100,a=100,i=document.createElement("canvas"),o=i.getContext("2d");i.width=t,i.height=a,o.textAlign="center",o.fillStyle="black",o.textBaseline="middle";var c=function(e){o.clearRect(0,0,t,a),o.font="100px "+e+", "+n,o.fillText("a",50,50);var i=o.getImageData(0,0,t,a).data;return[].slice.call(i).filter((function(e){return 0!=e}))};return c(n).join("")!==c(e).join("")},B={windows:[{ch:"\u5b8b\u4f53",en:"SimSun"},{ch:"\u9ed1\u4f53",en:"SimHei"},{ch:"\u5fae\u8f6f\u96c5\u9ed1",en:"Microsoft Yahei"},{ch:"\u5fae\u8f6f\u6b63\u9ed1\u4f53",en:"Microsoft JhengHei"},{ch:"\u6977\u4f53",en:"KaiTi"},{ch:"\u65b0\u5b8b\u4f53",en:"NSimSun"},{ch:"\u4eff\u5b8b",en:"FangSong"}],"OS X":[{ch:"\u82f9\u65b9",en:"PingFang SC"},{ch:"\u534e\u6587\u9ed1\u4f53",en:"STHeiti"},{ch:"\u534e\u6587\u6977\u4f53",en:"STKaiti"},{ch:"\u534e\u6587\u5b8b\u4f53",en:"STSong"},{ch:"\u534e\u6587\u4eff\u5b8b",en:"STFangsong"},{ch:"\u534e\u6587\u4e2d\u5b8b",en:"STZhongsong"},{ch:"\u534e\u6587\u7425\u73c0",en:"STHupo"},{ch:"\u534e\u6587\u65b0\u9b4f",en:"STXinwei"},{ch:"\u534e\u6587\u96b6\u4e66",en:"STLiti"},{ch:"\u534e\u6587\u884c\u6977",en:"STXingkai"},{ch:"\u51ac\u9752\u9ed1\u4f53\u7b80",en:"Hiragino Sans GB"},{ch:"\u5170\u4ead\u9ed1-\u7b80",en:"Lantinghei SC"},{ch:"\u7fe9\u7fe9\u4f53-\u7b80",en:"Hanzipen SC"},{ch:"\u624b\u672d\u4f53-\u7b80",en:"Hannotate SC"},{ch:"\u5b8b\u4f53-\u7b80",en:"Songti SC"},{ch:"\u5a03\u5a03\u4f53-\u7b80",en:"Wawati SC"},{ch:"\u9b4f\u7891-\u7b80",en:"Weibei SC"},{ch:"\u884c\u6977-\u7b80",en:"Xingkai SC"},{ch:"\u96c5\u75de-\u7b80",en:"Yapi SC"},{ch:"\u5706\u4f53-\u7b80",en:"Yuanti SC"}],office:[{ch:"\u5e7c\u5706",en:"YouYuan"},{ch:"\u96b6\u4e66",en:"LiSu"},{ch:"\u534e\u6587\u7ec6\u9ed1",en:"STXihei"},{ch:"\u534e\u6587\u6977\u4f53",en:"STKaiti"},{ch:"\u534e\u6587\u5b8b\u4f53",en:"STSong"},{ch:"\u534e\u6587\u4eff\u5b8b",en:"STFangsong"},{ch:"\u534e\u6587\u4e2d\u5b8b",en:"STZhongsong"},{ch:"\u534e\u6587\u5f69\u4e91",en:"STCaiyun"},{ch:"\u534e\u6587\u7425\u73c0",en:"STHupo"},{ch:"\u534e\u6587\u65b0\u9b4f",en:"STXinwei"},{ch:"\u534e\u6587\u96b6\u4e66",en:"STLiti"},{ch:"\u534e\u6587\u884c\u6977",en:"STXingkai"},{ch:"\u65b9\u6b63\u8212\u4f53",en:"FZShuTi"},{ch:"\u65b9\u6b63\u59da\u4f53",en:"FZYaoti"}],open:[{ch:"\u601d\u6e90\u9ed1\u4f53",en:"Source Han Sans CN"},{ch:"\u601d\u6e90\u5b8b\u4f53",en:"Source Han Serif SC"},{ch:"\u6587\u6cc9\u9a7f\u5fae\u7c73\u9ed1",en:"WenQuanYi Micro Hei"}],hanyi:[{ch:"\u6c49\u4eea\u65d7\u9ed1 40S",en:"HYQihei 40S"},{ch:"\u6c49\u4eea\u65d7\u9ed1 50S",en:"HYQihei 50S"},{ch:"\u6c49\u4eea\u65d7\u9ed1 60S",en:"HYQihei 60S"},{ch:"\u6c49\u4eea\u5927\u5b8b\u7b80",en:"HYDaSongJ"},{ch:"\u6c49\u4eea\u6977\u4f53",en:"HYKaiti"},{ch:"\u6c49\u4eea\u5bb6\u4e66\u7b80",en:"HYJiaShuJ"},{ch:"\u6c49\u4eeaPP\u4f53\u7b80",en:"HYPPTiJ"},{ch:"\u6c49\u4eea\u4e50\u55b5\u4f53\u7b80",en:"HYLeMiaoTi"},{ch:"\u6c49\u4eea\u5c0f\u9ea6\u4f53",en:"HYXiaoMaiTiJ"},{ch:"\u6c49\u4eea\u7a0b\u884c\u4f53",en:"HYChengXingJ"},{ch:"\u6c49\u4eea\u9ed1\u8354\u679d",en:"HYHeiLiZhiTiJ"},{ch:"\u6c49\u4eea\u96c5\u9177\u9ed1W",en:"HYYaKuHeiW"},{ch:"\u6c49\u4eea\u5927\u9ed1\u7b80",en:"HYDaHeiJ"},{ch:"\u6c49\u4eea\u5c1a\u9b4f\u624b\u4e66W",en:"HYShangWeiShouShuW"}],fangzheng:[{ch:"\u65b9\u6b63\u7c97\u96c5\u5b8b\u7b80\u4f53",en:"FZYaSongS-B-GB"},{ch:"\u65b9\u6b63\u62a5\u5b8b\u7b80\u4f53",en:"FZBaoSong-Z04S"},{ch:"\u65b9\u6b63\u7c97\u5706\u7b80\u4f53",en:"FZCuYuan-M03S"},{ch:"\u65b9\u6b63\u5927\u6807\u5b8b\u7b80\u4f53",en:"FZDaBiaoSong-B06S"},{ch:"\u65b9\u6b63\u5927\u9ed1\u7b80\u4f53",en:"FZDaHei-B02S"},{ch:"\u65b9\u6b63\u4eff\u5b8b\u7b80\u4f53",en:"FZFangSong-Z02S"},{ch:"\u65b9\u6b63\u9ed1\u4f53\u7b80\u4f53",en:"FZHei-B01S"},{ch:"\u65b9\u6b63\u7425\u73c0\u7b80\u4f53",en:"FZHuPo-M04S"},{ch:"\u65b9\u6b63\u6977\u4f53\u7b80\u4f53",en:"FZKai-Z03S"},{ch:"\u65b9\u6b63\u96b6\u53d8\u7b80\u4f53",en:"FZLiBian-S02S"},{ch:"\u65b9\u6b63\u96b6\u4e66\u7b80\u4f53",en:"FZLiShu-S01S"},{ch:"\u65b9\u6b63\u7f8e\u9ed1\u7b80\u4f53",en:"FZMeiHei-M07S"},{ch:"\u65b9\u6b63\u4e66\u5b8b\u7b80\u4f53",en:"FZShuSong-Z01S"},{ch:"\u65b9\u6b63\u8212\u4f53\u7b80\u4f53",en:"FZShuTi-S05S"},{ch:"\u65b9\u6b63\u6c34\u67f1\u7b80\u4f53",en:"FZShuiZhu-M08S"},{ch:"\u65b9\u6b63\u5b8b\u9ed1\u7b80\u4f53",en:"FZSongHei-B07S"},{ch:"\u65b9\u6b63\u5b8b\u4e09\u7b80\u4f53",en:"FZSong"},{ch:"\u65b9\u6b63\u9b4f\u7891\u7b80\u4f53",en:"FZWeiBei-S03S"},{ch:"\u65b9\u6b63\u7ec6\u7b49\u7ebf\u7b80\u4f53",en:"FZXiDengXian-Z06S"},{ch:"\u65b9\u6b63\u7ec6\u9ed1\u4e00\u7b80\u4f53",en:"FZXiHei I-Z08S"},{ch:"\u65b9\u6b63\u7ec6\u5706\u7b80\u4f53",en:"FZXiYuan-M01S"},{ch:"\u65b9\u6b63\u5c0f\u6807\u5b8b\u7b80\u4f53",en:"FZXiaoBiaoSong-B05S"},{ch:"\u65b9\u6b63\u884c\u6977\u7b80\u4f53",en:"FZXingKai-S04S"},{ch:"\u65b9\u6b63\u59da\u4f53\u7b80\u4f53",en:"FZYaoTi-M06S"},{ch:"\u65b9\u6b63\u4e2d\u7b49\u7ebf\u7b80\u4f53",en:"FZZhongDengXian-Z07S"},{ch:"\u65b9\u6b63\u51c6\u5706\u7b80\u4f53",en:"FZZhunYuan-M02S"},{ch:"\u65b9\u6b63\u7efc\u827a\u7b80\u4f53",en:"FZZongYi-M05S"},{ch:"\u65b9\u6b63\u5f69\u4e91\u7b80\u4f53",en:"FZCaiYun-M09S"},{ch:"\u65b9\u6b63\u96b6\u4e8c\u7b80\u4f53",en:"FZLiShu II-S06S"},{ch:"\u65b9\u6b63\u5eb7\u4f53\u7b80\u4f53",en:"FZKangTi-S07S"},{ch:"\u65b9\u6b63\u8d85\u7c97\u9ed1\u7b80\u4f53",en:"FZChaoCuHei-M10S"},{ch:"\u65b9\u6b63\u65b0\u62a5\u5b8b\u7b80\u4f53",en:"FZNew BaoSong-Z12S"},{ch:"\u65b9\u6b63\u65b0\u8212\u4f53\u7b80\u4f53",en:"FZNew ShuTi-S08S"},{ch:"\u65b9\u6b63\u9ec4\u8349\u7b80\u4f53",en:"FZHuangCao-S09S"},{ch:"\u65b9\u6b63\u5c11\u513f\u7b80\u4f53",en:"FZShaoEr-M11S"},{ch:"\u65b9\u6b63\u7a1a\u827a\u7b80\u4f53",en:"FZZhiYi-M12S"},{ch:"\u65b9\u6b63\u7ec6\u73ca\u745a\u7b80\u4f53",en:"FZXiShanHu-M13S"},{ch:"\u65b9\u6b63\u7c97\u5b8b\u7b80\u4f53",en:"FZCuSong-B09S"},{ch:"\u65b9\u6b63\u5e73\u548c\u7b80\u4f53",en:"FZPingHe-S11S"},{ch:"\u65b9\u6b63\u534e\u96b6\u7b80\u4f53",en:"FZHuaLi-M14S"},{ch:"\u65b9\u6b63\u7626\u91d1\u4e66\u7b80\u4f53",en:"FZShouJinShu-S10S"},{ch:"\u65b9\u6b63\u7ec6\u5029\u7b80\u4f53",en:"FZXiQian-M15S"},{ch:"\u65b9\u6b63\u4e2d\u5029\u7b80\u4f53",en:"FZZhongQian-M16S"},{ch:"\u65b9\u6b63\u7c97\u5029\u7b80\u4f53",en:"FZCuQian-M17S"},{ch:"\u65b9\u6b63\u80d6\u5a03\u7b80\u4f53",en:"FZPangWa-M18S"},{ch:"\u65b9\u6b63\u5b8b\u4e00\u7b80\u4f53",en:"FZSongYi-Z13S"},{ch:"\u65b9\u6b63\u526a\u7eb8\u7b80\u4f53",en:"FZJianZhi-M23S"},{ch:"\u65b9\u6b63\u6d41\u884c\u4f53\u7b80\u4f53",en:"FZLiuXingTi-M26S"},{ch:"\u65b9\u6b63\u7965\u96b6\u7b80\u4f53",en:"FZXiangLi-S17S"},{ch:"\u65b9\u6b63\u7c97\u6d3b\u610f\u7b80\u4f53",en:"FZCuHuoYi-M25S"},{ch:"\u65b9\u6b63\u80d6\u5934\u9c7c\u7b80\u4f53",en:"FZPangTouYu-M24S"},{ch:"\u65b9\u6b63\u5361\u901a\u7b80\u4f53",en:"FZKaTong-M19S"},{ch:"\u65b9\u6b63\u827a\u9ed1\u7b80\u4f53",en:"FZYiHei-M20S"},{ch:"\u65b9\u6b63\u6c34\u9ed1\u7b80\u4f53",en:"FZShuiHei-M21S"},{ch:"\u65b9\u6b63\u53e4\u96b6\u7b80\u4f53",en:"FZGuLi-S12S"},{ch:"\u65b9\u6b63\u5e7c\u7ebf\u7b80\u4f53",en:"FZYouXian-Z09S"},{ch:"\u65b9\u6b63\u542f\u4f53\u7b80\u4f53",en:"FZQiTi-S14S"},{ch:"\u65b9\u6b63\u5c0f\u7bc6\u4f53",en:"FZXiaoZhuanTi-S13T"},{ch:"\u65b9\u6b63\u786c\u7b14\u6977\u4e66\u7b80\u4f53",en:"FZYingBiKaiShu-S15S"},{ch:"\u65b9\u6b63\u6be1\u7b14\u9ed1\u7b80\u4f53",en:"FZZhanBiHei-M22S"},{ch:"\u65b9\u6b63\u786c\u7b14\u884c\u4e66\u7b80\u4f53",en:"FZYingBiXingShu-S16S"}]},j=[];for(var k in B)B[k].forEach((function(e){W(e.en)&&j.push(e)}));var Y=j.map((function(e){return e.en})),P={all:j.filter((function(e,n){return n===Y.indexOf(e.en)})),en:[{ch:"Righteous",en:"Righteous"},{ch:"Fascinate",en:"Fascinate"},{ch:"Eater",en:"Eater"},{ch:"Coiny",en:"Coiny"},{ch:"Trade Winds",en:"Trade Winds"},{ch:"Plaster",en:"Plaster"},{ch:"Shojumaru",en:"Shojumaru"},{ch:"Barrio",en:"Barrio"},{ch:"Rock Salt",en:"Rock Salt"},{ch:"Molle",en:"Molle"},{ch:"Merienda One",en:"Merienda One"},{ch:"Finger Paint",en:"Finger Paint"},{ch:"MedievalSharp",en:"MedievalSharp"},{ch:"Clicker Script",en:"Clicker Script"},{ch:"Indie Flower",en:"Indie Flower"},{ch:"Annie Use Your Telescope",en:"Annie Use Your Telescope"},{ch:"Poiret One",en:"Poiret One"},{ch:"Mountains of Christmas",en:"Mountains of Christmas"},{ch:"Megrim",en:"Megrim"},{ch:"Snowburst One",en:"Snowburst One"}]},U=z.awesome.poster();var I=function(){var e=T(!0),n=T(!1),t=C(),a=Object(r.a)(t,2),o=a[0],c=a[1],l=E(0),h=Object(r.a)(l,2),u=h[0],s=h[1],f=M[u.count],g=R(f),m=Object(r.a)(g,2),d=m[0],S=m[1];return i.a.createElement("div",null,i.a.createElement(F,{editMode:n,windowSize:{width:o,height:c},canvasState:d,dispatch:S,canvasToPng:U.saveToPng,poster:U,loading:e,fonts:P}),i.a.createElement(w,{canvasState:d,windowSize:{width:o,height:c},poster:U,loading:e,fonts:P}),i.a.createElement(b,{handleNext:function(){if(!(u.count+1>=M.length)){e.setTrue();var n=M[u.count+1];s({type:"increment"}),S({type:"update",canvas:n})}},handlePre:function(){if(!(u.count-1<0)){e.setFalse();var n=M[u.count-1];s({type:"decrement"}),S({type:"update",canvas:n})}},poster:U,loading:e}))};t(364);c.a.render(i.a.createElement(I,null),document.getElementById("root"))}},[[172,1,2]]]);
//# sourceMappingURL=main.3451853d.chunk.js.map