/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./TreeBinding'],function(q,T){"use strict";var C=T.extend("sap.ui.model.ClientTreeBinding",{constructor:function(m,p,c,f,P){T.apply(this,arguments);if(!this.oContext){this.oContext=""}this.filterInfo={};this.filterInfo.aFilteredContexts=[];this.filterInfo.oParentContext={};if(this.aFilters){if(this.oModel._getObject(this.sPath,this.oContext)){this.filter(f)}}}});C.prototype.getRootContexts=function(){if(!this.oModel.isList(this.sPath)){var c=this.oModel.getContext(this.sPath);if(this.bDisplayRootNode){return[c]}else{return this.getNodeContexts(c)}}else{var a=[],t=this;q.each(this.oModel._getObject(this.sPath),function(i,o){a.push(t.oModel.getContext(t.sPath+(q.sap.endsWith(t.sPath,"/")?"":"/")+i))});return a}};C.prototype.getNodeContexts=function(c){var s=c.getPath();if(!q.sap.endsWith(s,"/")){s=s+"/"}if(!q.sap.startsWith(s,"/")){s="/"+s}var a=[],t=this,n=this.oModel._getObject(s),o,A=this.mParameters&&this.mParameters.arrayNames,b;if(A&&q.isArray(A)){q.each(A,function(i,d){b=n[d];if(b){q.each(b,function(S,e){t._saveSubContext(e,a,s,d+"/"+S)})}})}else{if(n){q.sap.each(n,function(N,o){if(q.isArray(o)){q.each(o,function(S,d){t._saveSubContext(d,a,s,N+"/"+S)})}else if(typeof o=="object"){t._saveSubContext(o,a,s,N)}})}}return a};C.prototype.hasChildren=function(c){return c?this.getNodeContexts(c).length>0:false};C.prototype._saveSubContext=function(n,c,s,N){if(typeof n=="object"){var o=this.oModel.getContext(s+N);if(this.aFilters&&!this.bIsFiltering){if(q.inArray(o,this.filterInfo.aFilteredContexts)!=-1){c.push(o)}}else{c.push(o)}}};C.prototype.filter=function(f){this.filterInfo.aFilteredContexts=[];this.filterInfo.oParentContext={};if(!f||!q.isArray(f)||f.length==0){this.aFilters=null}else{this.aFilters=f;var c=new sap.ui.model.Context(this.oModel,this.sPath);this.filterRecursive(c)}this._fireChange({reason:"filter"});this._fireFilter({filters:f})};C.prototype.filterRecursive=function(p){this.bIsFiltering=true;var c=this.getNodeContexts(p);this.bIsFiltering=false;if(c.length>0){var t=this;q.each(c,function(i,o){t.filterRecursive(o)});this.applyFilter(p)}};C.prototype.applyFilter=function(p){if(!this.aFilters){return}var t=this,f={},F,a=[],g=false,b=true;this.bIsFiltering=true;var u=this.getNodeContexts(p);this.bIsFiltering=false;q.each(t.aFilters,function(j,o){if(o.sPath){F=f[o.sPath];if(!F){F=f[o.sPath]=[]}}else{F=f["__multiFilter"];if(!F){F=f["__multiFilter"]=[]}}F.push(o)});q.each(u,function(i,U){b=true;q.each(f,function(P,F){if(P!=="__multiFilter"){var v=t.oModel._getObject(P,U);if(typeof v=="string"){v=v.toUpperCase()}g=false;q.each(F,function(j,o){var c=t.getFilterFunction(o);if(v!=undefined&&c(v)){g=true;return false}})}else{g=false;q.each(F,function(j,o){g=t._resolveMultiFilter(o,U);if(g){return false}})}if(!g){b=false;return false}});if(b){a.push(U)}});if(a.length>0){q.merge(this.filterInfo.aFilteredContexts,a);this.filterInfo.aFilteredContexts.push(p);this.filterInfo.oParentContext=p}if(q.inArray(this.filterInfo.oParentContext,u)!=-1){this.filterInfo.aFilteredContexts.push(p);this.filterInfo.oParentContext=p}};C.prototype._resolveMultiFilter=function(m,u){var t=this,M=false,f=m.aFilters;if(f){q.each(f,function(i,F){var l=false;if(F._bMultiFilter){l=t._resolveMultiFilter(F,u)}else if(F.sPath){var v=t.oModel.getProperty(F.sPath,u);if(typeof v=="string"){v=v.toUpperCase()}var a=t.getFilterFunction(F);if(v!=undefined&&a(v)){l=true}}if(l&&m.bAnd){M=true}else if(!l&&m.bAnd){M=false;return false}else if(l){M=true;return false}})}return M};C.prototype.getFilterFunction=function(f){if(f.fnTest){return f.fnTest}var v=f.oValue1,V=f.oValue2;if(typeof v=="string"){v=v.toUpperCase()}if(typeof V=="string"){V=V.toUpperCase()}switch(f.sOperator){case"EQ":f.fnTest=function(a){return a==v};break;case"NE":f.fnTest=function(a){return a!=v};break;case"LT":f.fnTest=function(a){return a<v};break;case"LE":f.fnTest=function(a){return a<=v};break;case"GT":f.fnTest=function(a){return a>v};break;case"GE":f.fnTest=function(a){return a>=v};break;case"BT":f.fnTest=function(a){return(a>v)&&(a<V)};break;case"Contains":f.fnTest=function(a){return a.indexOf(v)!=-1};break;case"StartsWith":f.fnTest=function(a){return a.indexOf(v)==0};break;case"EndsWith":f.fnTest=function(a){return a.indexOf(v)==a.length-new String(f.oValue1).length};break;default:f.fnTest=function(a){return true}}return f.fnTest};C.prototype.checkUpdate=function(f){this._fireChange()};return C},true);
