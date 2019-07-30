(function(t){function e(e){for(var s,n,o=e[0],l=e[1],c=e[2],d=0,u=[];d<o.length;d++)n=o[d],r[n]&&u.push(r[n][0]),r[n]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(t[s]=l[s]);h&&h(e);while(u.length)u.shift()();return i.push.apply(i,c||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],s=!0,o=1;o<a.length;o++){var l=a[o];0!==r[l]&&(s=!1)}s&&(i.splice(e--,1),t=n(n.s=a[0]))}return t}var s={},r={app:0},i=[];function n(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=s,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(a,s,function(e){return t[e]}.bind(null,s));return a},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var h=l;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);var s=a("2b0e"),r=a("ce5b"),i=a.n(r),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("SheetComponent")],1)},o=[],l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-content",[a("v-container",{attrs:{fluid:""}},[a("v-card",{staticClass:"mx-auto mt-0",attrs:{flat:""}},[a("v-card",{staticClass:"mx-auto mt-0"},[a("v-toolbar",{attrs:{flat:"",color:"white"}},[a("v-flex",{attrs:{xs4:""}},[a("v-toolbar-title",[t._v("Files")])],1),a("v-flex",{attrs:{xs4:""}},[a("v-text-field",{attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":""},model:{value:t.fileSearch,callback:function(e){t.fileSearch=e},expression:"fileSearch"}})],1),a("v-flex",{attrs:{xs4:""}},[a("v-layout",{attrs:{"justify-end":""}},[a("v-btn",{staticClass:"mb-2",attrs:{color:"blue",dark:""},on:{click:function(e){t.refreshSheets(),t.refreshSheetData()}}},[t._v("Refresh")])],1)],1)],1)],1),a("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.sheetHeaders,items:t.sheets,search:t.fileSearch,loading:t.isSheetsLoading,"no-data-text":"No files found"},scopedSlots:t._u([{key:"items",fn:function(e){return[a("tr",{on:{click:function(a){return t.getSheetData(e.item.fullName)}}},[a("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.name))]),a("td",{staticClass:"justify-center layout px-4"},[a("v-layout",{attrs:{"justify-end":""}},[a("v-btn",{staticClass:"mx-0",attrs:{icon:""},on:{click:function(a){a.stopPropagation(),t.confirmDelete=!0,t.toDelete=e.item.fullName}}},[a("v-icon",{attrs:{small:""}},[t._v("delete")])],1)],1)],1)])]}}])}),a("v-dialog",{attrs:{"max-width":"500"},model:{value:t.confirmDelete,callback:function(e){t.confirmDelete=e},expression:"confirmDelete"}},[a("v-card",[a("v-card-title",{staticClass:"headline grey",attrs:{"primary-title":""}},[a("strong",[t._v("Delete")]),t._v("\n                         "+t._s(t.toDelete)+"?\n                    ")]),a("v-card-text",[t._v("This file will no longer be accesible through the web app unless imported.")]),a("v-divider"),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"error",text:""},on:{click:function(e){return t.deleteSheet(t.toDelete)}}},[t._v("Delete")]),a("v-btn",{attrs:{color:"grey",text:""},on:{click:function(e){t.confirmDelete=!1}}},[t._v("Cancel")])],1)],1)],1)],1),a("v-card",{directives:[{name:"show",rawName:"v-show",value:t.showData,expression:"showData"}],staticClass:"mx-auto mt-5",attrs:{flat:""}},[a("v-card",{staticClass:"mx-auto mt-0"},[a("v-toolbar",{attrs:{flat:"",color:"white"}},[a("v-flex",{attrs:{xs4:""}},[a("v-toolbar-title",[t._v(t._s(t.selectedSheet))])],1),a("v-flex",{attrs:{xs4:""}},[a("v-text-field",{attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":""},model:{value:t.dataSearch,callback:function(e){t.dataSearch=e},expression:"dataSearch"}})],1),a("v-flex",{attrs:{xs4:""}},[a("v-layout",{attrs:{"justify-end":""}},[a("v-btn",{staticClass:"mb-2",attrs:{color:"green",dark:!t.isDataLoading&&0!==t.sheetData.length,disabled:t.isDataLoading||0===t.sheetData.length},on:{click:t.exportData}},[t._v("Export")]),a("v-btn",{staticClass:"mb-2",attrs:{color:"red",dark:""},on:{click:function(e){t.showData=!1}}},[t._v("Close")])],1)],1)],1)],1),a("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.dataHeaders,items:t.sheetData,search:t.dataSearch,loading:t.isDataLoading,"no-data-text":"No invalid scans found","rows-per-page-items":[10,15,30,{text:"$vuetify.dataIterator.rowsPerPageAll",value:-1}]},scopedSlots:t._u([{key:"items",fn:function(e){return[a("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item["device name"]))]),a("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.barcode))]),a("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.quantity))]),a("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.location))]),a("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.time)+" on "+t._s(e.item.date))]),a("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.rownum))])]}}])})],1)],1)],1)},c=[],h=a("bc3a"),d=a.n(h);const u="http://guestwifisignin:3000/api/sheets/";class f{static getSheets(){return new Promise(async(t,e)=>{try{const s=await d.a.get(u);t(s.data)}catch(a){e(a)}})}static getSheetData(t){return new Promise(async(e,a)=>{try{const r=await d.a.get(`${u}${t}/data`,{timeout:6e4});e(r.data)}catch(s){a(s)}})}static deleteSheet(t){return d.a.delete(`${u}${t}`)}}var v=f,m={name:"SheetComponent",data(){return{confirmDelete:!1,toDelete:"",fileSearch:"",dataSearch:"",sheetHeaders:[{text:"Name",align:"left",sortable:!1,value:"name"},{text:"Actions",align:"right",sortable:!1,value:"action"}],dataHeaders:[{text:"Device Name",align:"left",sortable:!1,value:"device name"},{text:"Barcode",align:"left",sortable:!1,value:"barcode"},{text:"Quantity",align:"left",sortable:!1,value:"quantity"},{text:"Location",align:"left",sortable:!1,value:"location"},{text:"Time / Date",align:"left",sortable:!1,value:"date"},{text:"Row",align:"left",sortable:!1,value:"rowNum"}],sheets:[],error:"",sheetData:[],showData:!1,selectedSheet:"",isSheetsLoading:!0,isDataLoading:!0}},async created(){this.refreshSheets()},methods:{async deleteSheet(t){this.error="",this.confirmDelete=!1,this.selectedSheet===t&&(this.selectedSheet="",this.showData=!1,this.sheetData=[]),await v.deleteSheet(t),this.sheets=await v.getSheets(),this.toDelete=""},async getSheetData(t){this.isDataLoading=!0,this.error="",this.selectedSheet=t,this.showData=!0,this.sheetData=[];try{this.sheetData=await v.getSheetData(t),this.isDataLoading=!1}catch(e){this.error=e.message}},async refreshSheets(){this.isSheetsLoading=!0,this.error="",this.sheets=[];try{this.sheets=await v.getSheets(),this.isSheetsLoading=!1}catch(t){this.error=t.message}},async refreshSheetData(){if(this.selectedSheet){this.isDataLoading=!0,this.error="",this.sheetData=[];try{this.sheetData=await v.getSheetData(this.selectedSheet),this.isDataLoading=!1}catch(t){this.error=t.message}}},async exportData(){if(0===this.sheetData.length)return;const t=document.createElement("a"),e=Object.keys(this.sheetData[0]);let a=this.sheetData.map(t=>e.map(e=>JSON.stringify(t[e],(t,e)=>e)).join(","));a.unshift(e.map(t=>t.split(" ").map(t=>t.charAt(0).toUpperCase()+t.substring(1)).join(" ")).join(",")),a=a.join("\r\n"),t.style.display="none",t.setAttribute("href",`data:text/csv;charset=utf-8,${a}`),t.setAttribute("download",`${this.selectedSheet} - Invalid Scans.csv`),document.body.appendChild(t),t.click()}}},p=m,g=a("2877"),x=Object(g["a"])(p,l,c,!1,null,"ac4785ca",null),b=x.exports,S={name:"app",components:{SheetComponent:b}},y=S,D=Object(g["a"])(y,n,o,!1,null,null,null),w=D.exports,_=a("2f62");s["default"].use(_["a"]);var C=new _["a"].Store({state:{},mutations:{},actions:{}});a("bf40");s["default"].config.productionTip=!1,s["default"].use(i.a),new s["default"]({store:C,mode:"history",render(t){return t(w)}}).$mount("#app")}});
//# sourceMappingURL=app.3dc723ae.js.map