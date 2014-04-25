/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./FilterType','./ListBinding'],function(q,F,L){"use strict";var C=L.extend("sap.ui.model.ClientListBinding",{constructor:function(m,p,c,s,f,P){L.apply(this,arguments);this.update()},metadata:{publicMethods:["getLength"]}});C.prototype._getContexts=function(s,l){if(!s){s=0}if(!l){l=Math.min(this.iLength,this.oModel.iSizeLimit)}var e=Math.min(s+l,this.aIndices.length),c,a=[],p=this.oModel.resolve(this.sPath,this.oContext);if(p&&!q.sap.endsWith(p,"/")){p+="/"}for(var i=s;i<e;i++){c=this.oModel.getContext(p+this.aIndices[i]);a.push(c)}return a};C.prototype.setContext=function(c){if(this.oContext!=c){this.oContext=c;if(this.isRelative()){this.update();this._fireChange({reason:sap.ui.model.ChangeReason.Context})}}};C.prototype.getLength=function(){return this.iLength};C.prototype._getLength=function(){return this.aIndices.length};C.prototype.updateIndices=function(){this.aIndices=[];for(var i=0;i<this.oList.length;i++){this.aIndices.push(i)}};C.prototype.sort=function(s){if(!s){this.aSorters=null;this.updateIndices();this.applyFilter()}else{if(s instanceof sap.ui.model.Sorter){s=[s]}this.aSorters=s;this.applySort()}this._fireChange({reason:sap.ui.model.ChangeReason.Sort});this._fireSort({sorter:s});return this};C.prototype.applySort=function(){var t=this,s=[],c=[],v,S;if(!this.aSorters||this.aSorters.length==0){return}for(var j=0;j<this.aSorters.length;j++){S=this.aSorters[j];c[j]=S.fnCompare;if(!c[j]){c[j]=function(a,b){if(b==null){return-1}if(a==null){return 1}if(typeof a=="string"&&typeof b=="string"){return a.localeCompare(b)}if(a<b){return-1}if(a>b){return 1}return 0}}q.each(this.aIndices,function(i,I){v=t.oModel.getProperty(S.sPath,t.oList[I]);if(typeof v=="string"){v=v.toLocaleUpperCase()}if(!s[j]){s[j]=[]}s[j][I]=v})}this.aIndices.sort(function(a,b){var d=s[0][a],e=s[0][b];return t._applySortCompare(a,b,d,e,s,c,0)})};C.prototype._applySortCompare=function(a,b,v,c,s,d,D){var S=this.aSorters[D],f=d[D],r;r=f(v,c);if(S.bDescending){r=-r}if(r==0&&this.aSorters[D+1]){v=s[D+1][a],c=s[D+1][b];r=this._applySortCompare(a,b,v,c,s,d,D+1)}return r};C.prototype.filter=function(f,s){this.updateIndices();if(f instanceof sap.ui.model.Filter){f=[f]}if(s==F.Application){this.aApplicationFilters=f||[]}else if(s==F.Control){this.aFilters=f||[]}else{this.aFilters=f||[];this.aApplicationFilters=[]}f=this.aFilters.concat(this.aApplicationFilters);if(f.length==0){this.aFilters=[];this.aApplicationFilters=[];this.iLength=this._getLength()}else{this.applyFilter()}this.applySort();this._fireChange({reason:sap.ui.model.ChangeReason.Filter});if(s==F.Application){this._fireFilter({filters:this.aApplicationFilters})}else{this._fireFilter({filters:this.aFilters})}return this};C.prototype.normalizeFilterValue=function(v){if(typeof v=="string"){return v.toUpperCase()}if(v instanceof Date){return v.getTime()}return v};C.prototype.applyFilter=function(){if(!this.aFilters){return}var t=this,f={},a,b=[],g=false,c=true,d=this.aFilters.concat(this.aApplicationFilters);q.each(d,function(j,o){if(o.sPath!==undefined){a=f[o.sPath];if(!a){a=f[o.sPath]=[]}}else{a=f["__multiFilter"];if(!a){a=f["__multiFilter"]=[]}}a.push(o)});q.each(this.aIndices,function(i,I){c=true;q.each(f,function(p,a){if(p!=="__multiFilter"){var v=t.oModel.getProperty(p,t.oList[I]);v=t.normalizeFilterValue(v);g=false;q.each(a,function(j,o){var T=t.getFilterFunction(o);if(v!=undefined&&T(v)){g=true;return false}})}else{g=false;q.each(a,function(j,o){g=t._resolveMultiFilter(o,I);if(g){return false}})}if(!g){c=false;return false}});if(c){b.push(I)}});this.aIndices=b;this.iLength=b.length};C.prototype._resolveMultiFilter=function(m,I){var t=this,M=false,f=m.aFilters;if(f){q.each(f,function(i,o){var l=false;if(o._bMultiFilter){l=t._resolveMultiFilter(o,I)}else if(o.sPath!==undefined){var v=t.oModel.getProperty(o.sPath,t.oList[I]);v=t.normalizeFilterValue(v);var T=t.getFilterFunction(o);if(v!=undefined&&T(v)){l=true}}if(l&&m.bAnd){M=true}else if(!l&&m.bAnd){M=false;return false}else if(l){M=true;return false}})}return M};C.prototype.getFilterFunction=function(f){if(f.fnTest){return f.fnTest}var v=this.normalizeFilterValue(f.oValue1),V=this.normalizeFilterValue(f.oValue2);switch(f.sOperator){case"EQ":f.fnTest=function(a){return a==v};break;case"NE":f.fnTest=function(a){return a!=v};break;case"LT":f.fnTest=function(a){return a<v};break;case"LE":f.fnTest=function(a){return a<=v};break;case"GT":f.fnTest=function(a){return a>v};break;case"GE":f.fnTest=function(a){return a>=v};break;case"BT":f.fnTest=function(a){return(a>=v)&&(a<=V)};break;case"Contains":f.fnTest=function(a){if(typeof a!="string"){throw new Error("Only \"String\" values are supported for the FilterOperator: \"Contains\".")}return a.indexOf(v)!=-1};break;case"StartsWith":f.fnTest=function(a){if(typeof a!="string"){throw new Error("Only \"String\" values are supported for the FilterOperator: \"StartsWith\".")}return a.indexOf(v)==0};break;case"EndsWith":f.fnTest=function(a){if(typeof a!="string"){throw new Error("Only \"String\" values are supported for the FilterOperator: \"EndsWith\".")}var p=a.indexOf(v);if(p==-1){return false}return p==a.length-new String(f.oValue1).length};break;default:f.fnTest=function(a){return true}}return f.fnTest};C.prototype.getDistinctValues=function(p){var r=[],m={},v,t=this;q.each(this.oList,function(i,c){v=t.oModel.getProperty(p,c);if(!m[v]){m[v]=true;r.push(v)}});return r};return C},true);
