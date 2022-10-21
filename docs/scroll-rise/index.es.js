var t={d:(e,i)=>{for(var n in i)t.o(i,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:i[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};t.d(e,{FK:()=>z,xy:()=>u,y_:()=>O,yz:()=>b,Jj:()=>x,Vi:()=>S,sP:()=>o,vJ:()=>r,XC:()=>W,Rp:()=>P,jL:()=>h,nv:()=>d,Zr:()=>n});var i,n=function(){function t(){}return t.displayWidth=function(){return document.documentElement.clientWidth},t.displayHeight=function(){return document.documentElement.clientHeight},t.castToInt=function(t){return Math.trunc(t)},t}(),o=function(){function t(t){this.scene=t,this.initialized=!1,this.ticking=!1,this.saveDisplaySize(),this.init(),this.tick()}return t.prototype.saveDisplaySize=function(){this.displayWidth=n.displayWidth(),this.displayHeight=n.displayHeight()},t.prototype.isNeedResize=function(){return!0},t.prototype.tick=function(){var t=this;this.ticking||(null===window||void 0===window||window.requestAnimationFrame((function(){t.render(t.scene.elementY()),t.ticking=!1})),this.ticking=!0)},t.prototype.pos=function(t){return-(t+this.scene.offset())},t.prototype.scroll=function(){this.tick()},t.prototype.resize=function(){this.isNeedResize()&&(this.scene.resizeHeight(),this.tick())},t.prototype.init=function(){if(this.initialized)throw new Error("Scroll-Rise has already been initialized");this.initialized=!0,this.scrollListener=this.scroll.bind(this),null===window||void 0===window||window.addEventListener("scroll",this.scrollListener),this.resizeListener=this.resize.bind(this),null===window||void 0===window||window.addEventListener("resize",this.resizeListener),this.tick()},t.prototype.stop=function(){if(!this.initialized)throw new Error("Scroll-Rise hasn't yet been initialized");this.initialized=!1,this.scrollListener&&(null===window||void 0===window||window.removeEventListener("scroll",this.scrollListener)),this.resizeListener&&(null===window||void 0===window||window.removeEventListener("resize",this.resizeListener))},t.prototype.render=function(t){for(var e=0,i=this.scene.actors;e<i.length;e++)i[e].render(this.pos(t),this.scene)},t}(),r=function(){function t(t,e){this.container=t,this.options=e}return t.prototype.handleScrollReset=function(){scrollY=this.container.scrollTop},t.prototype.exclude=function(t){var e,i,n=this;if(null===(i=null===(e=this.options)||void 0===e?void 0:e.excludeIds)||void 0===i?void 0:i.length)return document.elementsFromPoint(t.clientX,t.clientY).find((function(t){var e,i;return null===(i=null===(e=n.options)||void 0===e?void 0:e.excludeIds)||void 0===i?void 0:i.includes(t.id)}))},t.prototype.handleMouseWheel=function(t){var e,i;if(!this.exclude(t)){t.preventDefault();var n=t.deltaY;if(n=(null===(e=this.options)||void 0===e?void 0:e.deltaY)?n*this.options.deltaY:n,(null===(i=this.options)||void 0===i?void 0:i.limitY)&&Math.abs(n)>this.options.limitY&&(n=n>0?this.options.limitY:-this.options.limitY),scrollY+=n,scrollY>0){var o=this.container.scrollHeight-this.container.clientHeight;scrollY>o&&(scrollY=o)}else scrollY=0;null===window||void 0===window||window.scrollTo(0,scrollY)}},t.prototype.init=function(){this.mouseupListener=this.handleScrollReset.bind(this),this.mousedownListener=this.handleScrollReset.bind(this),this.mousewheelListener=this.handleMouseWheel.bind(this),this.container.addEventListener("mouseup",this.mouseupListener,!1),this.container.addEventListener("mousedown",this.mousedownListener,!1),this.container.addEventListener("mousewheel",this.mousewheelListener,{passive:!1}),this.container.addEventListener("DOMMouseScroll",this.mousewheelListener,{passive:!1}),this.container.addEventListener("wheel",this.mousewheelListener,{passive:!1})},t.prototype.stop=function(){this.mouseupListener&&this.container.removeEventListener("mouseup",this.mouseupListener),this.mousedownListener&&this.container.removeEventListener("mousedown",this.mousedownListener),this.mousewheelListener&&(this.container.removeEventListener("mousewheel",this.mousewheelListener),this.container.removeEventListener("DOMMouseScroll",this.mousewheelListener),this.container.removeEventListener("wheel",this.mousewheelListener))},t}(),s=function(){return s=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var o in e=arguments[i])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},s.apply(this,arguments)},a=function(){function t(t,e,i){this.el=t,this.height=e,this.options=i,this._actors=[],this.setDefaults(),this.init()}return t.prototype.setDefaults=function(){this.options=s(s({},this.defaults()),this.options)},t.prototype.defaults=function(){return{offset:function(){return 0}}},t.prototype.offset=function(){return this.options.offset(n.displayWidth(),n.displayHeight(),this.height(n.displayWidth(),n.displayHeight()))},t.prototype.elementY=function(){return this.el.getBoundingClientRect().y},t.prototype.add=function(t){this._actors.push(t)},Object.defineProperty(t.prototype,"actors",{get:function(){return this._actors},enumerable:!1,configurable:!0}),t}(),l=(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),p=function(){return p=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var o in e=arguments[i])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},p.apply(this,arguments)},h=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.name="StickyPlatformScene",e}return l(e,t),e.prototype.defaults=function(){return p(p({},t.prototype.defaults.call(this)),{stickyPlatformHeight:function(t,e){return e}})},e.prototype.resizeHeight=function(){this.el.style.height="".concat(this.height(n.displayWidth(),n.displayHeight()),"px"),this.resizePlatform()},e.prototype.resizePlatform=function(){this.platform.style.height="".concat(this.options.stickyPlatformHeight(n.displayWidth(),n.displayHeight()),"px")},e.prototype.init=function(){this.el.style.position="relative",this.el.style.overflow="visible",this.platform=document.createElement("div"),this.platform.style.position="sticky",this.platform.style.top="0",this.platform.style.left="0",this.platform.style.width="100%",this.resizeHeight(),this.el.appendChild(this.platform)},e.prototype.add=function(e){t.prototype.add.call(this,e),this.el===e.element.parentElement&&(this.platform.appendChild(e.element),e.element.style.position="absolute"),e.initElement(this.elementY(),this)},e}(a),c=function(){var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.name="FixedActorsScene",e}return c(e,t),e.prototype.resizeHeight=function(){this.el.style.height="".concat(this.height(n.displayWidth(),n.displayHeight()),"px")},e.prototype.init=function(){this.resizeHeight()},e.prototype.add=function(e){t.prototype.add.call(this,e),e.element.style.position="fixed",e.initElement(this.elementY(),this)},e}(a),d=function(){function t(t,e,i){if(void 0===i&&(i=e),this.motion=t,this.start=e,this.end=i,void 0===i)this.end=e;else if(this.getStartPos()>this.getEndPos())throw new SyntaxError('"Start" later than "End" in the frame')}return t.prototype.getStartPos=function(){return this.start(n.displayWidth(),n.displayHeight())},t.prototype.getEndPos=function(){return this.end(n.displayWidth(),n.displayHeight())},t.prototype.length=function(){return this.getEndPos()-this.getStartPos()},t}(),f=function(t,e,i){if(i||2===arguments.length)for(var n,o=0,r=e.length;o<r;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return t.concat(n||Array.prototype.slice.call(e))},y=function(){function t(){this.frames=[]}return t.prototype.afterBindElement=function(){},t.prototype.groupFramesByMotion=function(t){return t.reduce((function(t,e){var i=e.motion.name;return t[i]=t[i]?f(f([],t[i],!0),[e],!1):[e],t}),{})},t.prototype.render=function(t,e){var i;this.beforeRender&&this.beforeRender();for(var o=this.groupFramesByMotion(this.frames),r=0,s=Object.keys(o);r<s.length;r++)if(o[h=s[r]].length>1){var a=o[h].filter((function(e){return t<e.getStartPos()&&t+n.displayHeight()>=e.getStartPos()||t>=e.getStartPos()&&t+n.displayHeight()<=e.getEndPos()||t>=e.getStartPos()&&t<=e.getEndPos()}));1===a.length?o[h]=a:0===a.length&&o[h].length?(o[h].sort((function(t,e){return t.getStartPos()-e.getStartPos()})),t+n.displayHeight()<o[h][0].getStartPos()?o[h]=[o[h][0]]:(o[h].sort((function(t,e){return t.getEndPos()>e.getEndPos()?-1:t.getEndPos()>e.getEndPos()?0:1})),t>o[h][0].getEndPos()&&(o[h]=[o[h][0]]))):(a.sort((function(t,e){return t.getStartPos()-e.getStartPos()})),o[h]=[a[a.length-1]])}if(this.element)for(var l=0,p=Object.keys(o);l<p.length;l++){var h;(null===(i=o[h=p[l]])||void 0===i?void 0:i.length)&&o[h][0].motion.make(t,o[h][0],this.element,e)}this.afterRender&&this.afterRender()},t.prototype.addFrame=function(t){this.frames.push(t)},t.prototype.addFrames=function(t){this.frames=this.frames.concat(t)},t.prototype.initElement=function(t,e){this.element=this.bindElement(t,e),this.afterBindElement()},t}(),g=function(){var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),v=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return g(e,t),e.prototype.findFirstFrame=function(t){return this.frames.reduce((function(e,i){return i.motion.name===t?e?i.getStartPos()<(null==e?void 0:e.getStartPos())?i:e:i:e||void 0}),void 0)},e.prototype.findFirstMoveMotionFrame=function(){var t=this.findFirstFrame("MoveMotion");if(t)return t;throw new Error('First "MoveMotion" frame wasn\'t found')},e.prototype.calcStartSize=function(){var t=this.findFirstFrame("SizeMotion");if(t){var e=t.motion;return{width:e.startWidth,height:e.startHeight}}throw new Error('First "SizeMotion" frame wasn\'t found')},e.prototype.calcStartOpacity=function(){var t=this.findFirstFrame("OpacityMotion");if(t)return t.motion.start;throw new Error('First "OpacityMotion" frame wasn\'t found')},e.prototype.bindElement=function(t,e){return this.element},e}(y),m=function(){var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),w=function(){return w=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var o in e=arguments[i])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},w.apply(this,arguments)},P=function(t){function e(e,i){var n=t.call(this)||this;return n.element=e,n.options=i,n.options=w({initPosition:!0,initSize:!0,initOpacity:!0},n.options),n}return m(e,t),e.prototype.bindElement=function(t,e){if(this.element){if(this.options.initPosition){var i=this.findFirstMoveMotionFrame();i.motion.make(t,i,this.element,e)}if(this.options.initSize){var o=this.calcStartSize();this.element.style.width="".concat(o.width(n.displayWidth(),n.displayHeight()),"px"),this.element.style.height="".concat(o.height(n.displayWidth(),n.displayHeight()),"px")}if(this.options.initOpacity){var r=this.calcStartOpacity();this.element.style.opacity="".concat(r(n.displayWidth(),n.displayHeight()))}}return this.element},e}(v),_=function(){var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),S=function(t){function e(e){var i=t.call(this)||this;return i.element=e,i}return _(e,t),e.prototype.bindElement=function(){return this.element},e}(v),O=function(){},H=function(){var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),b=function(t){function e(e){var i=t.call(this)||this;return i.name="MoveMotion",i.startX=e.startX,i.endX=e.endX,i.startY=e.startY,i.endY=e.endY,i}return H(e,t),e.prototype.renderX=function(t,e,i){if(i){if(t<e.getStartPos())return void(i.style.left="".concat(this.startX(n.displayWidth(),n.displayHeight()),"px"));if(t>e.getEndPos())return void(i.style.left="".concat(this.endX(n.displayWidth(),n.displayHeight()),"px"));var o=(this.endX(n.displayWidth(),n.displayHeight())-this.startX(n.displayWidth(),n.displayHeight()))/e.length(),r=n.castToInt(this.startX(n.displayWidth(),n.displayHeight())+o*(t-e.getStartPos()));i.style.left="".concat(r,"px")}},e.prototype.renderY=function(t,e,i,o){if(i){if("StickyPlatformScene"===o.name){if(t<e.getStartPos())return void(i.style.top="".concat(this.startY(n.displayWidth(),n.displayHeight()),"px"));if(t>e.getEndPos())return void(i.style.top="".concat(this.endY(n.displayWidth(),n.displayHeight()),"px"))}else if("FixedActorsScene"===o.name){if(t<e.getStartPos())return void(i.style.top="".concat(o.elementY()+this.startY(n.displayWidth(),n.displayHeight()),"px"));if(t>e.getEndPos())return void(i.style.top="".concat(this.endY(n.displayWidth(),n.displayHeight())-(t-e.getEndPos()),"px"))}var r=(this.endY(n.displayWidth(),n.displayHeight())-this.startY(n.displayWidth(),n.displayHeight()))/e.length(),s=n.castToInt(this.startY(n.displayWidth(),n.displayHeight())+r*(e.getStartPos()+t));i.style.top="".concat(s,"px")}},e.prototype.make=function(t,e,i,n){this.renderX(t,e,i),this.renderY(t,e,i,n)},e}(O),E=function(){var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),W=function(t){function e(e){var i=t.call(this)||this;return i.name="SizeMotion",i.startWidth=e.startWidth,i.endWidth=e.endWidth,i.startHeight=e.startHeight,i.endHeight=e.endHeight,i}return E(e,t),e.prototype.renderWidth=function(t,e,i){if(i){if(t<e.getStartPos())return void(i.style.width="".concat(this.startWidth(n.displayWidth(),n.displayHeight()),"px"));if(t>e.getEndPos())return void(i.style.width="".concat(this.endWidth(n.displayWidth(),n.displayHeight()),"px"));var o=(this.endWidth(n.displayWidth(),n.displayHeight())-this.startWidth(n.displayWidth(),n.displayHeight()))/e.length(),r=this.startWidth(n.displayWidth(),n.displayHeight())+o*(t-e.getStartPos());i.style.width="".concat(r,"px")}},e.prototype.renderHeight=function(t,e,i){if(i){if(t<e.getStartPos())return void(i.style.height="".concat(this.startHeight(n.displayWidth(),n.displayHeight()),"px"));if(t>e.getEndPos())return void(i.style.height="".concat(this.endHeight(n.displayWidth(),n.displayHeight()),"px"));var o=(this.endHeight(n.displayWidth(),n.displayHeight())-this.startHeight(n.displayWidth(),n.displayHeight()))/e.length(),r=this.startHeight(n.displayWidth(),n.displayHeight())+o*(t-e.getStartPos());i.style.height="".concat(r,"px")}},e.prototype.make=function(t,e,i){this.renderWidth(t,e,i),this.renderHeight(t,e,i)},e}(O),j=function(){var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),x=function(t){function e(e){var i=t.call(this)||this;return i.name="OpacityMotion",i.start=e.start,i.end=e.end,i}return j(e,t),e.prototype.renderOpacity=function(t,e,i){if(i){if(t<e.getStartPos())return void(i.style.opacity=this.start(n.displayWidth(),n.displayHeight()).toString());if(t>e.getEndPos())return void(i.style.opacity=this.end(n.displayWidth(),n.displayHeight()).toString());var o=(this.end(n.displayWidth(),n.displayHeight())-this.start(n.displayWidth(),n.displayHeight()))/e.length(),r=this.start(n.displayWidth(),n.displayHeight())+o*(t-e.getStartPos());i.style.opacity=r.toString()}},e.prototype.make=function(t,e,i){this.renderOpacity(t,e,i)},e}(O),L=function(){var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),z=function(t){function e(e){var i=t.call(this)||this;return i.name="BoundMotion",i.before=e.before,i.after=e.after,i}return L(e,t),e.prototype.applyProperties=function(t,e){for(var i=0,n=Object.keys(e);i<n.length;i++){var o=n[i];t.style[o]=e[o]}},e.prototype.make=function(t,e,i){i&&(t<e.getStartPos()?this.applyProperties(i,this.before(n.displayWidth(),n.displayHeight())):this.applyProperties(i,this.after(n.displayWidth(),n.displayHeight())))},e}(O),M=e.FK,Y=e.xy,F=e.y_,k=e.yz,A=e.Jj,R=e.Vi,T=e.sP,C=e.vJ,X=e.XC,B=e.Rp,D=e.jL,I=e.nv,J=e.Zr;export{M as BoundMotion,Y as FixedActorsScene,F as Motion,k as MoveMotion,A as OpacityMotion,R as RefActor,T as ScrollRise,C as ScrollRiseSpeed,X as SizeMotion,B as StaticActor,D as StickyPlatformScene,I as TimeFrame,J as Util};
//# sourceMappingURL=index.es.js.map