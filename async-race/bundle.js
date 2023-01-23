(()=>{"use strict";class t{constructor(t,e,n,i,a){this.element=document.createElement(t),e&&e.append(this.element),n&&this.element.classList.add(...n.split(" ")),i&&(this.element.textContent=i),a&&Object.entries(a).forEach((([t,e])=>{this.element.setAttribute(t,e)}))}}class e extends t{constructor(t,e){super("header",t,"header"),this.root=t,this.callback=e,this.garageBtn=null,this.winnersBtn=null,this.navBtnCallback=()=>{this.callback()},this.render(),this.disableGarageBtn()}render(){const e=new t("div",this.element,"header__container"),n=new t("a",e.element,"header__logo logo"),i=new t("img",void 0,"logo__img","",{src:"./assets/logo.png"}),a=new t("nav",e.element,"header__nav nav");this.garageBtn=new t("button",a.element,"nav__garage-btn","garage"),this.garageBtn.element.addEventListener("click",this.navBtnCallback),this.winnersBtn=new t("button",a.element,"nav__winners-btn","winners"),this.winnersBtn.element.addEventListener("click",this.navBtnCallback),n.element.append(i.element)}disableGarageBtn(){var t;null===(t=this.garageBtn)||void 0===t||t.element.setAttribute("disabled","")}disableWinnersBtn(){var t;null===(t=this.winnersBtn)||void 0===t||t.element.setAttribute("disabled","")}activateGarageBtn(){var t;null===(t=this.garageBtn)||void 0===t||t.element.removeAttribute("disabled")}activateWinnersBtn(){var t;null===(t=this.winnersBtn)||void 0===t||t.element.removeAttribute("disabled")}}var n;!function(t){t.Error400="Bad Request",t.Error404="Not Found",t.Error429="Too Many Requests",t.Error500="Internal Server Error"}(n||(n={}));const i=new class{constructor(){this.events={},this.on=(t,e)=>{this.events[t]||(this.events[t]=[]),this.events[t].push(e)},this.unsubscribe=(t,e)=>{this.events[t]&&(this.events[t]=this.events[t].filter((t=>t.toString()!==e.toString())))},this.emit=(t,e)=>{const n=this.events[t];n&&n.forEach((t=>{t.call(null,e)}))}}};var a=function(t,e,n,i){return new(n||(n=Promise))((function(a,s){function r(t){try{h(i.next(t))}catch(t){s(t)}}function l(t){try{h(i.throw(t))}catch(t){s(t)}}function h(t){var e;t.done?a(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,l)}h((i=i.apply(t,e||[])).next())}))};class s{static errorHandler(t){if(!t.ok)throw new Error(t.statusText);return t}static load(t,e,n){return a(this,void 0,void 0,(function*(){return fetch(t,{method:e,headers:{"Content-Type":"application/json"},body:n?JSON.stringify(n):void 0}).then((t=>this.errorHandler(t)))}))}static getAndPatchData(t,e,n){return a(this,void 0,void 0,(function*(){const i=s.createURL(e);if(n){const t=s.makeURLParams(n);i.search=new URLSearchParams(t).toString()}return this.load(i,t).then((t=>t.json()))}))}static getPageData(t,e,n){return a(this,void 0,void 0,(function*(){const i=s.createURL(e);if(n){const t=s.makeURLParams(n,!0);i.search=new URLSearchParams(t).toString()}return this.load(i,t).then((t=>t.json().then((e=>this.elaborateResponse(t,e)))))}))}static postAndPutData(t,e,n){return a(this,void 0,void 0,(function*(){const i=s.createURL(e);return this.load(i,t,n).then((t=>t.json()))}))}static deleteData(t){return a(this,void 0,void 0,(function*(){const e=s.createURL(t);return this.load(e,"DELETE").then((t=>t.json()))}))}static makeURLParams(t,e){return Object.keys(t).reduce(((n,i)=>Object.assign(Object.assign({},n),{[e?`_${i}`:i]:t[i].toString()})),{})}}s.server="http://127.0.0.1:3000/",s.elaborateResponse=(t,e)=>a(void 0,void 0,void 0,(function*(){const n=t.headers.get("X-Total-Count");return{data:e,total:n?Number(n):0}})),s.createURL=t=>new URL(t,s.server);const r=t=>s.getPageData("GET","garage",t),l=t=>s.postAndPutData("POST","garage",t),h=t=>s.getAndPatchData("PATCH","engine",t);var o=function(t,e,n,i){return new(n||(n=Promise))((function(a,s){function r(t){try{h(i.next(t))}catch(t){s(t)}}function l(t){try{h(i.throw(t))}catch(t){s(t)}}function h(t){var e;t.done?a(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,l)}h((i=i.apply(t,e||[])).next())}))};class c{constructor(t){this.EngineState={id:void 0,status:"stopped"},this.duration=0,this.startDriving=()=>{this.setStatusToStarted(),h(this.EngineState).then((t=>this.startCarAnimation(t))).then((()=>this.switchToDrivingMode()))},this.switchToDrivingMode=()=>o(this,void 0,void 0,(function*(){try{this.EngineState.status="drive",yield(t=this.EngineState,s.getAndPatchData("PATCH","engine",t))}catch(t){t instanceof Error&&t.message===n.Error500&&(this.carAnimation.pause(),i.emit("broken",{}))}var t})),this.stopDriving=()=>o(this,void 0,void 0,(function*(){this.setStatusToStopped(),i.emit("stopDriving",this.EngineState),yield h(this.EngineState),this.stopCarAnimation(),this.setStatusToStarted()})),this.carAnimationCallback=()=>{i.emit("animationFinished",this.EngineState)},this.car=t.car,this.EngineState.id=t.id,this.parent=t.parent}startCarAnimation(t){this.duration=t.distance/t.velocity,this.carAnimation=this.car.svg.animate([{transform:"translateX(0)"},{transform:`translateX(${this.parent.clientWidth-this.car.svg.clientWidth}px)`}],{duration:this.duration,fill:"forwards"})}stopCarAnimation(){this.removeEventListener(),this.carAnimation.cancel()}removeEventListener(){this.carAnimation.removeEventListener("finish",this.carAnimationCallback)}addEventListener(){this.carAnimation.addEventListener("finish",this.carAnimationCallback)}setStatusToStarted(){"started"!==this.EngineState.status&&(this.EngineState.status="started")}setStatusToStopped(){"stopped"!==this.EngineState.status&&(this.EngineState.status="stopped")}}class d{constructor(){this.svg=document.createElementNS("http://www.w3.org/2000/svg","svg")}appendSVG(t){this.renderSVG(),t.append(this.svg)}updateColor(t){this.svg.setAttribute("fill",`${t}`)}replaceSVG(t,e){this.renderSVG(),t.replaceChild(this.svg,e)}renderSVG(){const t=document.createElementNS("http://www.w3.org/2000/svg","use");t.setAttribute("href","assets/sprite.svg#snowmobile"),this.svg.classList.add("race__car"),this.svg.append(t)}}var u=function(t,e,n,i){return new(n||(n=Promise))((function(a,s){function r(t){try{h(i.next(t))}catch(t){s(t)}}function l(t){try{h(i.throw(t))}catch(t){s(t)}}function h(t){var e;t.done?a(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,l)}h((i=i.apply(t,e||[])).next())}))};class g extends t{constructor(e){super("div",void 0,"race__track"),this.trackLine=new t("div",void 0,"race__track-line"),this.selectBtn=null,this.deleteBtn=null,this.carNameElement=null,this.startBtn=null,this.stopBtn=null,this.modal=null,this.finishSVG=document.createElementNS("http://www.w3.org/2000/svg","svg"),this.carData={name:"",color:""},this.winner={id:0,wins:0,time:0},this.startBtnCallback=()=>{i.emit("waitingToStart",{}),this.disableBtnsWhileDriving(),this.enableStopBtn(),this.engine.startDriving()},this.stopBtnCallback=()=>{this.enableBtnsAfterDriving(),this.disableStopBtn(),this.engine.stopDriving()},this.deleteBtnCallback=()=>u(this,void 0,void 0,(function*(){var t;this.id&&(yield(t=this.id,s.deleteData(`winners/${t}`)).catch((()=>null)),(t=>s.deleteData(`garage/${t}`))(this.id).then((()=>i.emit("deleteCar",{id:this.id}))))})),this.selectBtnCallback=()=>{this.carData.id=this.id,i.emit("selectCar",this.carData)},this.registerWinner=(t,e)=>u(this,void 0,void 0,(function*(){try{this.winner=yield(t=>s.getAndPatchData("GET",`winners/${t}`))(e);const n=Math.min(Number(t),this.winner.time);yield((t,e)=>s.postAndPutData("PUT",`winners/${e}`,t))({wins:this.winner.wins+1,time:n},e)}catch(i){this.winner.id=e,this.winner.time=Number(t),this.winner.wins=1,yield(n=this.winner,s.postAndPutData("POST","winners",n))}var n;i.emit("isWinner",{})})),this.car=new d,this.carData.name=e.name,this.carData.color=e.color,this.id=Number(e.id),this.EngineData={car:this.car,parent:this.trackLine.element,id:e.id?e.id:void 0},this.engine=new c(this.EngineData),this.render(),this.car.updateColor(this.carData.color),this.subscribeToEvents()}render(){const e=new t("div",this.element,"race__track-left"),n=new t("div",this.element,"race__track-right"),i=new t("div",n.element,"race__track-top"),a=new t("div",n.element,"race__track-bottom"),s=new t("div",e.element,"race__track-bottom__btns"),r=document.createElementNS("http://www.w3.org/2000/svg","use");this.selectBtn=g.createBtn({parent:s,name:"select",type:"submit"}),this.deleteBtn=g.createBtn({parent:s,name:"delete",type:"submit"}),this.carNameElement=new t("span",i.element,"race__car-name",`${this.carData.name}`),this.startBtn=g.createBtn({parent:s,name:"start",type:"submit"}),this.stopBtn=g.createBtn({parent:s,name:"stop",type:"submit"}),r.setAttribute("href","assets/sprite.svg#snowman"),this.finishSVG.classList.add("race__end"),this.stopBtn.element.setAttribute("disabled",""),a.element.append(this.trackLine.element),this.car.appendSVG(this.trackLine.element),this.finishSVG.append(r),this.trackLine.element.append(this.finishSVG),this.startBtn.element.addEventListener("click",this.startBtnCallback),this.stopBtn.element.addEventListener("click",this.stopBtnCallback),this.deleteBtn.element.addEventListener("click",this.deleteBtnCallback),this.selectBtn.element.addEventListener("click",this.selectBtnCallback)}showWinner(e,n){this.registerWinner(e,n),this.modal=new t("div",this.element,"winner-modal"),this.modal.element.textContent=`${this.carData.name} wins in ${e}s!`}hideModal(){var t;(null===(t=this.modal)||void 0===t?void 0:t.element.parentElement)===this.element&&this.element.removeChild(this.modal.element)}subscribeToEvents(){i.on("updateCar",(t=>{t.id===this.id&&(this.car.updateColor(String(t.color)),this.updateName(String(t.name)))})),i.on("startRace",(()=>{this.disableBtnsWhileDriving(),this.disableStopBtn()})),i.on("resetAfterRace",(()=>{this.enableBtnsAfterDriving(),this.disableStopBtn()}))}disableBtnsWhileDriving(){var t,e,n;null===(t=this.startBtn)||void 0===t||t.element.setAttribute("disabled",""),null===(e=this.selectBtn)||void 0===e||e.element.setAttribute("disabled",""),null===(n=this.deleteBtn)||void 0===n||n.element.setAttribute("disabled","")}enableBtnsAfterDriving(){var t,e,n;null===(t=this.startBtn)||void 0===t||t.element.removeAttribute("disabled"),null===(e=this.selectBtn)||void 0===e||e.element.removeAttribute("disabled"),null===(n=this.deleteBtn)||void 0===n||n.element.removeAttribute("disabled")}updateName(t){this.carNameElement&&(this.carNameElement.element.textContent=`${t}`)}enableStopBtn(){var t;null===(t=this.stopBtn)||void 0===t||t.element.removeAttribute("disabled")}disableStopBtn(){var t;null===(t=this.stopBtn)||void 0===t||t.element.setAttribute("disabled","")}static createBtn(e){return new t("button",e.parent.element,`race__${e.name}_btn`,`${e.name}`,{type:`${e.type}`})}}const m=["Abarth","Acura","Alfa Romeo","Aston Martin","Audi","Bentley","BMW","Bugatti","Buick","Cadillac","Chevrolet","Chrysler","Citroën","Dacia","Daewoo","Daihatsu","Dodge","Donkervoort","DS","Ferrari","Fiat","Fisker","Ford","Honda","Hummer","Hyundai","Infiniti","Iveco","Jaguar","Jeep","Kia","KTM","Lada","Lamborghini","Lancia","Land Rover","Landwind","Lexus","Linkoln","Lotus","Maserati","Maybach","Mazda","McLaren","Mercedes-Benz","MG","Mini","Mitsubishi","Morgan","Nissan","Opel","Peugeot","Porsche","Renault","Rolls-Royce","Rover","Saab","Seat","Skoda","Smart","SsangYong","Subaru","Suzuki","Tesla","Toyota","Volkswagen","Volvo"],p=["A3","A4","A5","A6","A7","Acadia","Accent","Accord","Air","Altima","Ariya","Armada","Arteon","Ascent","Atlas","Avalon","Aviator","Blazer","Bronco","BRZ","C40","Camaro","Camry","Carnival","Cayenne","Celestiq","Challenger","Charger","Cherokee","Civic","CLA","CLS","Clubman","Compass","Corolla","Corolla","Corvette","CR-V","Crosstrek","Crown","CT4","CT5","Cullinan","CX-3","CX-5","CX-9","Cybertruck","Dawn","DB11","DBS","DBX","Defender","Discovery","Durango","E-Class","EcoSport","Edge","Edge","Enclave","Encore","Envision","Equinox","ES","Escalade","Escape","EV6","EV9","EX90","Explorer","F150","F8","Forester","Forte","G-Class","G70","G80","G90","Ghibli","Ghost","Giulia","GLA","GLB","GLC","GLE","GR86","Grecale","GV60","GV70","GV80","GX","Highlander","Hornet","Huracan","i3","i4","i7","ILX","ILX","Impreza","Insight","Integra","Ioniq","IS","iX","Jetta","K5","Kicks","Kona","LC","LS","LX","M2","M3","M4","M5","M8","Macan","Macan","Maverick","Maxima","MC20","Mirage","Mirai","Murano","Mustang","Nautilus","Navigator","Niro","NSX","NX","Odyssey","Outback","Outlander","Pacifica","Palisade","Panamera","Passat","Pilot","Prius","Q3","Q5","Q50","Q60","Q7","Q8","QX50","QX55","QX60","QX80","R1S","R1T","RC","RDX","Recon","Rio","Rogue","Roma","RX","RZ","S3","S4","S5","S6","S60","S7","S8","S90","Santa Fe","Sedona","Seltos","Sentra","Sequoia","Sienna","Sierra","Solterra","Sonata","Sorento","Soul","Spark","Sportage","SQ5","SQ7","SQ8","Stelvio","Stinger","Tahoe","Taos","Taycan","Terrain","Tiguan","Tonale","Traverse","Trax","Tucson","TX","Urus","V60","V90","Wraith","Wrangler","X1","X2","X3","X4","X5","XF","XM","Yukon","Z4","ZDX"],v=()=>{const t=Math.floor(Math.random()*m.length),e=Math.floor(Math.random()*p.length);return`${m[t]} ${p[e]}`},b=()=>{const t=Math.floor(256*Math.random()).toString(16);return 2!==t.length?`0${t}`:t},w=()=>{let t="#";for(let e=0;e<3;e+=1)t+=b();return t};class P extends t{constructor(t,e,n,i){super("div",t.element,`${e}__pagination pagination`),this.leftArrowBtn=null,this.rightArrowBtn=null,this.currentPageElement=null,this.currentPage=0,this.totalPages=0,this.itemsPerPage=0,this.currentPage=n.page,this.totalPages=i,this.itemsPerPage=n.limit,this.selector=e,this.render(),this.disableArrowsFirstLastPage(this.currentPage)}render(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg"),n=document.createElementNS("http://www.w3.org/2000/svg","svg"),i=document.createElementNS("http://www.w3.org/2000/svg","use"),a=document.createElementNS("http://www.w3.org/2000/svg","use");this.leftArrowBtn=new t("button",this.element,`${this.selector}__btn-left`),this.currentPageElement=new t("span",this.element,`${this.selector}__current-page`,`${this.currentPage} / ${this.totalPages}`),this.rightArrowBtn=new t("button",this.element,`${this.selector}__btn-right`),this.leftArrowBtn.element.append(e),this.rightArrowBtn.element.append(n),e.append(i),n.append(a),i.setAttribute("href","assets/sprite.svg#left-arrow"),a.setAttribute("href","assets/sprite.svg#right-arrow"),n.classList.add(`${this.selector}__btn-right_svg`),e.classList.add(`${this.selector}__btn-left_svg`)}updateCurrentPage(t){this.currentPage=t,this.updatePages()}updateTotalPages(t){this.totalPages=t,this.totalPages!==this.currentPage&&this.enableRightArrowBtn(),0===this.totalPages&&(this.totalPages=1),this.updatePages()}updatePages(){this.currentPageElement&&(this.currentPageElement.element.textContent=`${this.currentPage} / ${this.totalPages}`,this.adjustWidth())}calculateTotalPages(t){return Math.ceil(t/this.itemsPerPage)}adjustWidth(){this.currentPage>=100&&this.totalPages>=100&&this.currentPageElement&&(this.currentPageElement.element.style.width="7.5em")}disableBothButtonsDuringRace(){this.disableLeftArrowBtn(),this.disableRightArrowBtn()}enableBothButtonsAfterRace(){this.enableRightArrowBtn(),this.enableLeftArrowBtn(),this.disableArrowsFirstLastPage(this.currentPage)}disableArrowsFirstLastPage(t){1===t&&this.disableLeftArrowBtn(),t===this.totalPages&&this.disableRightArrowBtn()}enableRightArrowBtn(){var t;(null===(t=this.rightArrowBtn)||void 0===t?void 0:t.element.hasAttribute("disabled"))&&this.rightArrowBtn.element.removeAttribute("disabled")}enableLeftArrowBtn(){var t;(null===(t=this.leftArrowBtn)||void 0===t?void 0:t.element.hasAttribute("disabled"))&&this.leftArrowBtn.element.removeAttribute("disabled")}disableRightArrowBtn(){var t,e;(null===(t=this.rightArrowBtn)||void 0===t?void 0:t.element.hasAttribute("disabled"))||null===(e=this.rightArrowBtn)||void 0===e||e.element.setAttribute("disabled","")}disableLeftArrowBtn(){var t,e;(null===(t=this.leftArrowBtn)||void 0===t?void 0:t.element.hasAttribute("disabled"))||null===(e=this.leftArrowBtn)||void 0===e||e.element.setAttribute("disabled","")}}var C=function(t,e,n,i){return new(n||(n=Promise))((function(a,s){function r(t){try{h(i.next(t))}catch(t){s(t)}}function l(t){try{h(i.throw(t))}catch(t){s(t)}}function h(t){var e;t.done?a(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,l)}h((i=i.apply(t,e||[])).next())}))};class S extends t{constructor(){super("section",void 0,"section garage"),this.createInputText=null,this.createInputColor=null,this.createBtn=null,this.raceBtn=null,this.resetBtn=null,this.generateBtn=null,this.totalCarsElement=null,this.raceFieldWrapper=null,this.raceField=null,this.carData={name:"",color:""},this.currentPageStatus={page:1,limit:7},this.totalPages=1,this.totalCars=0,this.tracksOnPage=[],this.finishCounter=0,this.winnerCounter=0,this.createTextInputCallback=()=>{this.createInputText&&(this.carData.name=this.createInputText.element.value)},this.createColorInputCallback=()=>{this.createInputColor&&(this.carData.color=this.createInputColor.element.value)},this.createBtnCallback=()=>C(this,void 0,void 0,(function*(){if(this.createInputText&&this.createInputText.element.value){this.createColorInputCallback();const t=yield l(this.carData);this.createRaceTrack(t),this.totalCars+=1,this.totalPages=this.pagination.calculateTotalPages(this.totalCars),this.updateGarageNumber(this.totalCars),this.pagination.updateTotalPages(this.totalPages),this.createInputText.element.value="",this.createInputColor&&(this.createInputColor.element.value="#6395BD")}else this.createInputText&&(this.createInputText.element.placeholder="Please insert name"),setTimeout((()=>{this.createInputText&&(this.createInputText.element.placeholder="Enter name here")}),1500)})),this.updateTextInputCallback=()=>{this.updateInputText.element.value||this.disableUpdateElements(),this.carData.name=this.updateInputText.element.value},this.updateColorInputCallback=()=>{this.carData.color=this.updateInputColor.element.value},this.updateBtnCallback=()=>C(this,void 0,void 0,(function*(){this.updateColorInputCallback();const t=yield(e=this.carData,n=this.id,s.postAndPutData("PUT",`garage/${n}`,e));var e,n;i.emit("updateCar",t),this.disableUpdateElements(),this.setUpdateElementsToDefault(),this.updateInputText.element.value="",this.updateInputColor&&(this.updateInputColor.element.value="#6395BD")})),this.rightArrowBtnCallback=()=>{var t;(null===(t=this.raceBtn)||void 0===t?void 0:t.element.hasAttribute("disabled"))&&(this.enableBtnsAfterDriving(),this.enableCreateElements(),this.disableResetBtn(),this.removeWinnerAnnouncement()),this.pagination.enableLeftArrowBtn(),this.currentPageStatus.page+=1,this.pagination.updateCurrentPage(this.currentPageStatus.page),this.deleteAllRaceTracks(),this.createTracksOnNextPrevPage(),this.pagination.disableArrowsFirstLastPage(this.currentPageStatus.page)},this.leftArrowBtnCallback=()=>{var t;(null===(t=this.raceBtn)||void 0===t?void 0:t.element.hasAttribute("disabled"))&&(this.enableBtnsAfterDriving(),this.enableCreateElements(),this.disableResetBtn(),this.removeWinnerAnnouncement()),this.currentPageStatus.page===this.totalPages&&this.pagination.enableRightArrowBtn(),this.currentPageStatus.page-=1,this.pagination.updateCurrentPage(this.currentPageStatus.page),this.deleteAllRaceTracks(),this.createTracksOnNextPrevPage(),this.pagination.disableArrowsFirstLastPage(this.currentPageStatus.page)},this.raceBtnCallback=()=>C(this,void 0,void 0,(function*(){this.tracksOnPage.forEach((t=>t.engine.setStatusToStarted()));const t=this.tracksOnPage.map((t=>C(this,void 0,void 0,(function*(){return h(t.engine.EngineState)})))),e=yield Promise.all(t);for(let t=0;t<e.length;t+=1)this.tracksOnPage[t].engine.startCarAnimation(e[t]),this.tracksOnPage[t].engine.switchToDrivingMode(),this.tracksOnPage[t].engine.addEventListener();i.emit("startRace",{}),this.disableCreateElements(),this.disableBtnsWhileDriving(),this.pagination.disableBothButtonsDuringRace()})),this.resetBtnCallback=()=>C(this,void 0,void 0,(function*(){yield this.resetGame(),i.emit("resetAfterRace",{}),this.enableBtnsAfterDriving(),this.disableResetBtn(),this.isRaceEnd()})),this.resetGame=()=>C(this,void 0,void 0,(function*(){this.finishCounter=0,this.tracksOnPage.forEach((t=>t.engine.setStatusToStopped()));const t=this.tracksOnPage.map((t=>C(this,void 0,void 0,(function*(){return h(t.engine.EngineState)})))),e=yield Promise.all(t);for(let t=0;t<e.length;t+=1)this.tracksOnPage[t].engine.stopCarAnimation();this.removeWinnerAnnouncement()})),this.generateBtnCallback=()=>C(this,void 0,void 0,(function*(){const t=[];for(let e=0;e<100;e+=1){const e={name:"",color:""};e.name=v(),e.color=w(),t.push(e)}const e=t.map((t=>C(this,void 0,void 0,(function*(){return l(t)}))));(yield Promise.all(e)).forEach((t=>this.createRaceTrack(t))),this.totalCars+=100,this.totalPages=this.pagination.calculateTotalPages(this.totalCars),this.updateGarageNumber(this.totalCars),this.pagination.updateTotalPages(this.totalPages),this.pagination.enableRightArrowBtn()})),this.selectCarEventCallback=t=>{this.enableUpdateElements(),this.insertCarNameForChange(t),this.insertCarColorForChange(t),this.carData.name=String(t.name),this.id=Number(t.id)},this.insertCarNameForChange=t=>{this.updateInputText.element.value=`${t.name}`},this.insertCarColorForChange=t=>{this.updateInputColor.element.value=`${t.color}`},this.createTracksOnNextPrevPage=()=>{r(this.currentPageStatus).then((t=>{t.data.forEach((t=>{this.createRaceTrack(t)}))}))},this.recreateRaceTrackAfterDeletion=()=>{r(this.currentPageStatus).then((t=>{const e=this.currentPageStatus.limit-1;this.createRaceTrack(t.data[e])}))},r(this.currentPageStatus).then((e=>{this.totalCars=e.total,this.render(),this.raceFieldWrapper=new t("div",this.element,"garage__race-wrapper"),this.renderRaceBlock(e.data)})),this.subscribeToEvents()}render(){const e=new t("div",this.element,"garage__settings settings"),n=new t("div",e.element,"settings__left"),i=new t("div",e.element,"settings__center"),a=new t("div",e.element,"settings__right");this.renderLeftSettingsPart(n),this.renderCenterSettingsPart(i),this.renderRightSettingsPart(a),this.addListenersFirstLoad(),this.disableElementsFirstLoad()}renderLeftSettingsPart(e){const n=new t("div",e.element,"settings__left_top"),i=new t("div",e.element,"settings__left_bottom");this.totalCarsElement=new t("span",n.element,"settings__cars-total"),this.generateBtn=S.createSettingsBtn({parent:i,name:"generate",type:"submit"}),this.pagination=new P(i,"settings",this.currentPageStatus,this.totalPages),this.generateBtn.element.textContent="ADD 100",this.totalPages=this.pagination.calculateTotalPages(this.totalCars),this.pagination.updateTotalPages(this.totalPages)}renderCenterSettingsPart(e){const n=new t("div",e.element,"settings__create-wrapper"),i=new t("div",e.element,"settings__update-wrapper");this.createInputText=S.createSettingsInput({parent:n,name:"create",type:"text"}),this.createInputColor=S.createSettingsInput({parent:n,name:"create",type:"color"}),this.createBtn=S.createSettingsBtn({parent:n,name:"create",type:"submit"}),this.updateInputText=S.createSettingsInput({parent:i,name:"create",type:"text"}),this.updateInputColor=S.createSettingsInput({parent:i,name:"update",type:"color"}),this.updateBtn=S.createSettingsBtn({parent:i,name:"update",type:"submit"}),this.createInputColor.element.value="#6395BD",this.createInputText.element.placeholder="Enter name here",this.createInputText.element.setAttribute("required",""),this.updateInputColor.element.value="#6395BD"}renderRightSettingsPart(t){this.raceBtn=S.createSettingsBtn({parent:t,name:"race",type:"submit"}),this.resetBtn=S.createSettingsBtn({parent:t,name:"reset",type:"reset"})}addListenersFirstLoad(){var t,e,n,i,a,s,r,l;null===(t=this.createInputText)||void 0===t||t.element.addEventListener("input",this.createTextInputCallback),null===(e=this.createInputColor)||void 0===e||e.element.addEventListener("input",this.createColorInputCallback),null===(n=this.createBtn)||void 0===n||n.element.addEventListener("click",this.createBtnCallback),null===(i=this.raceBtn)||void 0===i||i.element.addEventListener("click",this.raceBtnCallback),null===(a=this.resetBtn)||void 0===a||a.element.addEventListener("click",this.resetBtnCallback),null===(s=this.generateBtn)||void 0===s||s.element.addEventListener("click",this.generateBtnCallback),null===(r=this.pagination.rightArrowBtn)||void 0===r||r.element.addEventListener("click",this.rightArrowBtnCallback),null===(l=this.pagination.leftArrowBtn)||void 0===l||l.element.addEventListener("click",this.leftArrowBtnCallback)}disableElementsFirstLoad(){this.disableResetBtn(),this.disableUpdateElements()}updateGarageNumber(t){var e;(null===(e=this.totalCarsElement)||void 0===e?void 0:e.element)&&(this.totalCarsElement.element.textContent=`Garage: ${t}`)}static calculateTime(t){return String(Math.ceil(t/1e3*100)/100)}announceWinner(t){let e=0,n="";for(let i=0;i<this.tracksOnPage.length;i+=1)Number(this.tracksOnPage[i].element.id)===t.id&&(n=S.calculateTime(this.tracksOnPage[i].engine.duration),e=Number(this.tracksOnPage[i].element.id),this.tracksOnPage[i].showWinner(n,e));this.enableResetBtn()}subscribeToEvents(){i.on("selectCar",(t=>{this.selectCarEventCallback(t)})),i.on("deleteCar",(t=>{this.totalCars-=1,this.updateGarageNumber(this.totalCars),this.deleteOneRaceTrack(t)})),i.on("waitingToStart",(()=>{this.disableBtnsWhileDriving(),this.disableCreateElements()})),i.on("stopDriving",(()=>{this.enableBtnsAfterDriving(),this.enableCreateElements()})),i.on("broken",(()=>{this.finishCounter+=1,this.finishCounter===this.tracksOnPage.length&&this.isRaceEnd()})),i.on("animationFinished",(t=>{this.winnerCounter+=1,this.finishCounter+=1,1===this.winnerCounter&&this.announceWinner(t),this.finishCounter===this.tracksOnPage.length&&this.isRaceEnd()}))}isRaceEnd(){var t;this.tracksOnPage.forEach((t=>{t.engine.removeEventListener()})),this.finishCounter=0,this.winnerCounter=0,this.enableCreateElements(),null===(t=this.generateBtn)||void 0===t||t.element.removeAttribute("disabled"),this.enableResetBtn(),this.pagination.enableBothButtonsAfterRace()}setUpdateElementsToDefault(){this.updateInputText.element.value="",this.updateInputColor.element.value="#000000"}enableCreateElements(){var t,e,n;null===(t=this.createInputText)||void 0===t||t.element.removeAttribute("disabled"),null===(e=this.createInputColor)||void 0===e||e.element.removeAttribute("disabled"),null===(n=this.createBtn)||void 0===n||n.element.removeAttribute("disabled")}disableCreateElements(){var t,e,n;null===(t=this.createInputText)||void 0===t||t.element.setAttribute("disabled",""),null===(e=this.createInputColor)||void 0===e||e.element.setAttribute("disabled",""),null===(n=this.createBtn)||void 0===n||n.element.setAttribute("disabled","")}enableUpdateElements(){this.updateInputText.element.removeAttribute("disabled"),this.updateInputColor.element.removeAttribute("disabled"),this.updateBtn.element.removeAttribute("disabled"),this.updateInputText.element.addEventListener("input",this.updateTextInputCallback),this.updateInputColor.element.addEventListener("input",this.updateColorInputCallback),this.updateBtn.element.addEventListener("click",this.updateBtnCallback)}disableUpdateElements(){this.updateInputText.element.setAttribute("disabled",""),this.updateInputColor.element.setAttribute("disabled",""),this.updateBtn.element.setAttribute("disabled","")}disableBtnsWhileDriving(){var t,e;null===(t=this.raceBtn)||void 0===t||t.element.setAttribute("disabled",""),null===(e=this.generateBtn)||void 0===e||e.element.setAttribute("disabled","")}enableBtnsAfterDriving(){var t,e;null===(t=this.raceBtn)||void 0===t||t.element.removeAttribute("disabled"),null===(e=this.generateBtn)||void 0===e||e.element.removeAttribute("disabled")}disableResetBtn(){var t;null===(t=this.resetBtn)||void 0===t||t.element.setAttribute("disabled","")}enableResetBtn(){var t;null===(t=this.resetBtn)||void 0===t||t.element.removeAttribute("disabled")}static createSettingsInput(e){return new t("input",e.parent.element,`settings__${e.name}_input-${e.type}`,"",{type:`${e.type}`})}static createSettingsBtn(e){return new t("button",e.parent.element,`settings__${e.name}_btn`,`${e.name}`,{type:`${e.type}`})}renderRaceBlock(e){var n;this.raceField=new t("div",null===(n=this.raceFieldWrapper)||void 0===n?void 0:n.element,"garage__race-field race"),e.forEach((t=>{this.createRaceTrack(t)}))}createRaceTrack(t){var e;const n=new g(t);this.tracksOnPage.length<this.currentPageStatus.limit&&(null===(e=this.raceField)||void 0===e||e.element.append(n.element),this.tracksOnPage.push(n)),n.element.setAttribute("id",`${t.id}`),this.updateGarageNumber(this.totalCars)}deleteOneRaceTrack(t){if(this.raceField){for(let e=0;e<this.raceField.element.children.length;e+=1)Number(this.raceField.element.children[e].id)===t.id&&this.raceField.element.removeChild(this.raceField.element.children[e]);this.updateCurrentTrackArray(String(t.id)),this.currentPageStatus.page!==this.totalPages&&this.recreateRaceTrackAfterDeletion(),this.totalPages=this.pagination.calculateTotalPages(this.totalCars),this.pagination.updateTotalPages(this.totalPages),this.checkIfZero()}}checkIfZero(){0===this.tracksOnPage.length&&(this.currentPageStatus.page-=1,this.pagination.updateCurrentPage(this.currentPageStatus.page),this.createTracksOnNextPrevPage(),this.pagination.disableArrowsFirstLastPage(this.currentPageStatus.page))}updateCurrentTrackArray(t){this.tracksOnPage=this.tracksOnPage.filter((e=>e.element.id!==t))}deleteAllRaceTracks(){if(this.tracksOnPage=[],this.raceField){let t=this.raceField.element.children.length-1;for(;this.raceField.element.children.length>0&&t>=0;)this.raceField.element.removeChild(this.raceField.element.children[t]),t-=1}}removeWinnerAnnouncement(){for(let t=0;t<this.tracksOnPage.length;t+=1)this.tracksOnPage[t].hideModal()}}var B=function(t,e,n,i){return new(n||(n=Promise))((function(a,s){function r(t){try{h(i.next(t))}catch(t){s(t)}}function l(t){try{h(i.throw(t))}catch(t){s(t)}}function h(t){var e;t.done?a(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,l)}h((i=i.apply(t,e||[])).next())}))};class f extends t{constructor(){super("section",void 0,"section winners"),this.totalWinners=0,this.totalWinnersElement=null,this.currentPageStatus={page:1,limit:10,sort:"wins",order:"ASC"},this.totalPages=0,this.winnersResults=null,this.winsTH=null,this.timeTH=null,this.winners=[],this.winnersCars=[],this.color="",this.winnersInfo={number:0,car:void 0,name:"",wins:0,time:0},this.orderNum=1,this.winnersOnPage=[],this.renderWinnersTable=()=>B(this,void 0,void 0,(function*(){var e,n;const i=new t("div",this.element,"winners__pagination-wrapper");this.winnersResults=document.createElement("table");const a=this.winnersResults.createTHead().insertRow();this.totalWinnersElement=new t("span",i.element,"winners__pagination_total-winners",`Winners: ${this.totalWinners}`),this.pagination=new P(i,"winners",this.currentPageStatus,this.totalPages),this.winnersResults.classList.add("winners__results"),this.element.append(this.winnersResults),this.insertHeading(["n°","car","name","wins","time"],a),null===(e=this.pagination.rightArrowBtn)||void 0===e||e.element.addEventListener("click",this.rightArrowBtnCallback),null===(n=this.pagination.leftArrowBtn)||void 0===n||n.element.addEventListener("click",this.leftArrowBtnCallback)})),this.fillWinnersPage=()=>B(this,void 0,void 0,(function*(){yield this.retrieveData(),this.createRows(),this.updateTotalPagesData(),this.updateTotalWinnersNum()})),this.retrieveData=()=>B(this,void 0,void 0,(function*(){var t;yield(t=this.currentPageStatus,s.getPageData("GET","winners",t)).then((t=>{this.totalWinners=t.total,this.winners=t.data.slice()})),this.winnersCars=(yield Promise.all(this.winners.map((t=>{return e=t.id,s.getAndPatchData("GET",`garage/${e}`);var e})))).slice();for(let t=0;t<this.winners.length;t+=1)this.winnersOnPage.push(Object.assign(Object.assign(Object.assign({},this.winners[t]),this.winnersCars[t]),{car:new d,number:this.orderNum})),this.orderNum+=1;0===this.winnersOnPage.length&&this.currentPageStatus.page>1&&(this.currentPageStatus.page-=1,this.changeItemsOrder(),this.fillWinnersPage(),this.pagination.updateCurrentPage(this.currentPageStatus.page))})),this.rightArrowBtnCallback=()=>{this.pagination.enableLeftArrowBtn(),this.currentPageStatus.page+=1,this.pagination.updateCurrentPage(this.currentPageStatus.page),this.deleteRows(),this.pagination.disableArrowsFirstLastPage(this.currentPageStatus.page)},this.leftArrowBtnCallback=()=>{this.pagination.enableRightArrowBtn(),this.currentPageStatus.page-=1,this.orderNum-=this.currentPageStatus.limit+this.winnersOnPage.length,this.pagination.updateCurrentPage(this.currentPageStatus.page),this.deleteRows(),this.pagination.disableArrowsFirstLastPage(this.currentPageStatus.page)},this.winsSortCallback=()=>{this.currentPageStatus.sort="wins",this.changeSortingOrder(),this.changeWinsSortingArrow(),this.hideTimeSortingArrow(),this.changeItemsOrder(),this.deleteRows()},this.timeSortCallback=()=>{this.currentPageStatus.sort="time",this.changeSortingOrder(),this.changeTimeSortingArrow(),this.hideWinsSortingArrow(),this.changeItemsOrder(),this.deleteRows()},this.renderWinnersTable(),this.fillWinnersPage(),["updateCar","deleteCar","isWinner"].forEach((t=>{i.on(`${t}`,(()=>{this.updatePageViewState()}))}))}createRows(){this.winnersOnPage.forEach((t=>{this.winnersInfo.wins=t.wins,this.winnersInfo.time=t.time,this.winnersInfo.name=t.name,this.winnersInfo.car=t.car,this.winnersInfo.number=t.number,this.color=t.color,this.insertWinnersInfo(this.winnersInfo)}))}insertHeading(e,n){for(let i=0;i<e.length;i+=1){const a=e[i];let s;switch(a){case"wins":this.winsTH=new t("th",n,`results__table_th-${a} table__th`),this.winsTH.element.classList.add("sortable"),this.winsTH.element.textContent=`${a} ↑`,this.winsTH.element.addEventListener("click",this.winsSortCallback);break;case"time":this.timeTH=new t("th",n,`results__table_th-${a} table__th`),this.timeTH.element.classList.add("sortable"),this.timeTH.element.textContent=`${a} (s)`,this.timeTH.element.addEventListener("click",this.timeSortCallback);break;default:s=new t("th",n,`results__table_th-${a} table__th`),s.element.textContent=a}}}insertWinnersInfo(t){if(this.winnersResults){const e=this.winnersResults.insertRow();Object.values(t).forEach((t=>{const n=e.insertCell();n.classList.add("table__cell"),t instanceof d?(t.appendSVG(n),t.updateColor(this.color)):t!==this.color&&(n.innerText=String(t))}))}}updateTotalPagesData(){this.pagination.itemsPerPage=this.currentPageStatus.limit,this.totalPages=this.pagination.calculateTotalPages(this.totalWinners),this.pagination.updateTotalPages(this.totalPages),this.pagination.disableArrowsFirstLastPage(this.currentPageStatus.page)}updateTotalWinnersNum(){this.totalWinnersElement&&(this.totalWinnersElement.element.textContent=`Winners: ${this.totalWinners}`)}changeSortingOrder(){"ASC"===this.currentPageStatus.order?this.currentPageStatus.order="DESC":"DESC"===this.currentPageStatus.order&&(this.currentPageStatus.order="ASC")}changeItemsOrder(){1===this.currentPageStatus.page?this.orderNum=this.currentPageStatus.page:this.orderNum=this.currentPageStatus.limit*(this.currentPageStatus.page-1)+1}changeWinsSortingArrow(){this.winsTH&&("ASC"===this.currentPageStatus.order?this.winsTH.element.textContent="wins ↑":"DESC"===this.currentPageStatus.order&&(this.winsTH.element.textContent="wins ↓"))}changeTimeSortingArrow(){this.timeTH&&("ASC"===this.currentPageStatus.order?this.timeTH.element.textContent="time (s) ↑":"DESC"===this.currentPageStatus.order&&(this.timeTH.element.textContent="time (s) ↓"))}hideTimeSortingArrow(){"wins"===this.currentPageStatus.sort&&this.timeTH&&(this.timeTH.element.textContent="time (s)")}hideWinsSortingArrow(){"time"===this.currentPageStatus.sort&&this.winsTH&&(this.winsTH.element.textContent="wins")}deleteRows(){if(this.winnersResults){let t=this.winnersResults.rows.length-1;for(;this.winnersResults.rows.length>1&&t>0;)this.winnersResults.deleteRow(t),t-=1}this.winnersOnPage=[],this.fillWinnersPage()}updatePageViewState(){this.changeItemsOrder(),this.deleteRows()}}class A extends t{constructor(){super("footer",void 0,"footer")}}const k=new class{constructor(n){this.root=n,this.garagePage=new S,this.winnersPage=new f,this.footer=new A,this.replaceMain=()=>{this.main&&(this.garagePage&&this.garagePage.element.parentElement===this.main.element?(this.main.element.replaceChild(this.winnersPage.element,this.garagePage.element),this.header.activateGarageBtn(),this.header.disableWinnersBtn()):this.winnersPage&&this.winnersPage.element.parentElement===this.main.element&&(this.main.element.replaceChild(this.garagePage.element,this.winnersPage.element),this.header.disableGarageBtn(),this.header.activateWinnersBtn()))},this.root.classList.add("root"),this.header=new e(this.root,this.replaceMain),this.main=new t("main",this.root,"main")}init(){this.main.element.append(this.garagePage.element),this.root.append(this.footer.element)}}(document.body);window.onload=()=>{k.init()}})();