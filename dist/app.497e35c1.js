parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"A2T1":[function(require,module,exports) {
var e,t=document.querySelector(".header"),r=document.getElementById("grocery-input"),n=document.querySelector(".header__button"),c=document.querySelector(".grocery__list"),a=document.querySelector(".grocery__clear-btn"),o=document.querySelector(".header__alert"),i=document.querySelector(".grocery__list-background"),s=!1,l="";function d(t){t.preventDefault();var n=r.value,c=(new Date).getTime().toString();n&&!s?(p(c,n),a.classList.add("grocery__clear-btn--show"),f(c,n),i.classList.add("grocery__list-background--hide"),v(),u("Item added to the list","success")):n&&s?(e.innerHTML=n,u("Item changed","success"),y(e.parentElement),h(l,n),v()):u("Please enter a value","danger")}function u(e,t){o.textContent=e,o.classList.add("header__alert--".concat(t)),setTimeout(function(){o.textContent="",o.classList.remove("header__alert--".concat(t))},1e3)}function m(){var e=document.querySelectorAll(".grocery__item");e.length&&(e.forEach(function(e){c.removeChild(e)}),a.classList.remove("grocery__clear-btn--show"),u("Removed all items","danger"),i.classList.remove("grocery__list-background--hide"),v(),localStorage.removeItem("list"))}function g(e){var t=e.currentTarget.parentNode.parentNode,r=t.dataset.id;t.remove(),c.children.length<=1&&(a.classList.remove("grocery__clear-btn--show"),i.classList.remove("grocery__list-background--hide")),u("Item removed","danger"),v(),b(r)}function _(t){var c=t.currentTarget.parentNode.parentNode;e=t.currentTarget.parentElement.previousElementSibling,r.value=e.innerHTML,s=!0,l=c.dataset.id,n.textContent="Edit item"}function v(){r.value="",s=!1,l="",n.textContent="Add Item"}function y(e){e.classList.add("grocery__item--added"),setTimeout(function(){e.classList.remove("grocery__item--added")},1e3)}function f(e,t){var r={id:e,value:t},n=L();n.push(r),localStorage.setItem("list",JSON.stringify(n))}function b(e){var t=L();t=t.filter(function(t){if(t.id!==e)return t}),localStorage.setItem("list",JSON.stringify(t))}function h(e,t){var r=L();r=r.map(function(r){return r.id===e&&(r.value=t),r}),localStorage.setItem("list",JSON.stringify(r))}function L(){return localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[]}function S(){var e=L();e.length>0&&(e.forEach(function(e){p(e.id,e.value)}),i.classList.add("grocery__list-background--hide"),a.classList.add("grocery__clear-btn--show"))}function p(e,t){var r=document.createElement("li");r.classList.add("grocery__item");var n=document.createAttribute("data-id");n.value=e,r.setAttributeNode(n),r.innerHTML='<p class="grocery__item-text">'.concat(t,'</p>\n    <div class="grocery__item-btn-container">\n      <button class="grocery__item-btn grocery__item-btn--edit"><i class="fas fa-pen" title="Edit Item"></i>\n      </button>\n      <button class="grocery__item-btn grocery__item-btn--delete">\n        <i class="fas fa-times-circle" title="Delete Item"></i>\n      </button>\n    </div>');var a=r.querySelector(".grocery__item-btn--delete"),o=r.querySelector(".grocery__item-btn--edit");a.addEventListener("click",g),o.addEventListener("click",_),c.appendChild(r),y(r)}t.addEventListener("submit",d),a.addEventListener("click",m),window.addEventListener("DOMContentLoaded",S);
},{}]},{},["A2T1"], null)
//# sourceMappingURL=app.497e35c1.js.map