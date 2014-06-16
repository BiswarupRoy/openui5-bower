/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.ux3.ShellPersonalization");jQuery.sap.require("sap.ui.base.EventProvider");jQuery.sap.require("sap.ui.commons.Dialog");jQuery.sap.require("sap.ui.commons.Button");sap.ui.base.EventProvider.extend("sap.ui.ux3.ShellPersonalization",{constructor:function(s){sap.ui.base.EventProvider.apply(this);this.shell=s;this.oSettings={}}});
sap.ui.ux3.ShellPersonalization.prototype.initializeSettings=function(s){this.oSettings=jQuery.extend({},s);if(this.shell.getDomRef()){this.applySettings(s)}};
sap.ui.ux3.ShellPersonalization.M_EVENTS={personalizationChange:"personalizationChange"};
sap.ui.ux3.ShellPersonalization.prototype.attachPersonalizationChange=function(f,l){this.attachEvent(sap.ui.ux3.ShellPersonalization.M_EVENTS.personalizationChange,f,l)};
sap.ui.ux3.ShellPersonalization.prototype.detachPersonalizationChange=function(f,l){this.detachEvent(sap.ui.ux3.ShellPersonalization.M_EVENTS.personalizationChange,f,l)};
sap.ui.ux3.ShellPersonalization.prototype.firePersonalizationChange=function(p){this.fireEvent(sap.ui.ux3.ShellPersonalization.M_EVENTS.personalizationChange,p)};
sap.ui.ux3.ShellPersonalization.ORIGINAL_SETTINGS={bByDStyle:false,sBgColor:"rgb(17,17,17)",sBgCssImg:null,sBgImgSrc:null,sBgImgPos:"tile",fBgImgOpacity:1,fSidebarOpacity:1,sLineColor:"rgb(239,170,0)",sLogoImageSrc:null,sLogoAlign:"left",bUseLogoSize:false};sap.ui.ux3.ShellPersonalization.TRANSPARENT_1x1=sap.ui.resource('sap.ui.core','themes/base/img/1x1.gif');sap.ui.ux3.ShellPersonalization.IMAGE_FOLDER_PATH=jQuery.sap.getModulePath("sap.ui.ux3",'/')+"themes/"+sap.ui.getCore().getConfiguration().getTheme()+"/img/shell/";
sap.ui.ux3.ShellPersonalization.getOriginalSettings=function(){if(!sap.ui.ux3.ShellPersonalization._bOriginalSettingsInitialized){sap.ui.ux3.ShellPersonalization._bOriginalSettingsInitialized=true;jQuery.sap.require("sap.ui.core.theming.Parameters");var a=sap.ui.core.theming.Parameters.get();var g=a["sap.ui.ux3.Shell:sapUiUx3ShellGradientTop"];var b=a["sap.ui.ux3.Shell:sapUiUx3ShellGradientBottom"];if(!!sap.ui.Device.browser.firefox){sap.ui.ux3.ShellPersonalization.ORIGINAL_SETTINGS.sBgCssImg="-moz-linear-gradient(top, "+g+" 0, "+b+" 108px, "+b+")"}else if(!!sap.ui.Device.browser.internet_explorer){if(sap.ui.Device.browser.version==7||sap.ui.Device.browser.version==8||sap.ui.Device.browser.version==9){sap.ui.ux3.ShellPersonalization.ORIGINAL_SETTINGS.sBgCssImg="url("+sap.ui.ux3.ShellPersonalization.IMAGE_FOLDER_PATH+"Workset_bg.png)"}else{sap.ui.ux3.ShellPersonalization.ORIGINAL_SETTINGS.sBgCssImg="-ms-linear-gradient(top, "+g+" 0, "+b+" 108px, "+b+")"}}else if(!!sap.ui.Device.browser.webkit){sap.ui.ux3.ShellPersonalization.ORIGINAL_SETTINGS.sBgCssImg="-webkit-linear-gradient(top, "+g+" 0, "+b+" 108px, "+b+")"}}return sap.ui.ux3.ShellPersonalization.ORIGINAL_SETTINGS};
sap.ui.ux3.ShellPersonalization.prototype.hasChanges=function(){var s=0;for(var k in this.oSettings){s++}return(s>0)};
sap.ui.ux3.ShellPersonalization.prototype.applySettings=function(s){var a=jQuery.extend({},sap.ui.ux3.ShellPersonalization.getOriginalSettings());a=jQuery.extend(a,s);this.applyByDStyle(a.bByDStyle);this.applyBgColor(a.sBgColor);this.applyBgImage(a.sBgCssImg,a.sBgImgSrc);this.applyBgImageOpacity(a.fBgImgOpacity);if(a.sHeaderImageSrc){this.applyHeaderImage(a.sHeaderImageSrc)}else{this.shell.getDomRef("hdr").style.backgroundImage=""}this.applySidebarOpacity(a.fSidebarOpacity);this.applyBgColor(a.sBgColor);this.applyLineColor(a.sLineColor);this.applyLogoImage(a.sLogoImageSrc);this.applyLogoAlign(a.sLogoAlign);this.applyUseLogoSize(a.bUseLogoSize)};
sap.ui.ux3.ShellPersonalization.prototype.openDialog=function(){if(this.oDialog&&this._getDialog().isOpen()){return}this.oTransientSettings=jQuery.extend({},this.oSettings);this._getDialog().open();this._bindDragAndDrop("bg");this._bindDragAndDrop("hdr");this._bindDragAndDrop("logo")};
sap.ui.ux3.ShellPersonalization.prototype.getTransientSettingsWithDefaults=function(){return jQuery.extend(jQuery.extend({},sap.ui.ux3.ShellPersonalization.getOriginalSettings()),this.oTransientSettings)};
sap.ui.ux3.ShellPersonalization.prototype._bindDragAndDrop=function(p){if(window.FileReader){var i=this.shell.getId()+"-p13n_";jQuery.sap.byId(i+p+"ImageImg").bind('dragover',jQuery.proxy(this._handleDragover,this)).bind('dragend',jQuery.proxy(this._handleDragend,this)).bind('drop',jQuery.proxy(this._handleDrop,this));jQuery.sap.byId(i+p+"ImageHolder").bind('dragover',jQuery.proxy(this._handleDragover,this)).bind('dragend',jQuery.proxy(this._handleDragend,this)).bind('drop',jQuery.proxy(this._handleDrop,this))}};
sap.ui.ux3.ShellPersonalization.prototype._unbindDragAndDrop=function(p){if(window.FileReader){var i=this.shell.getId()+"-p13n_";jQuery.sap.byId(i+"hdrImageImg").unbind('dragover',this._handleDragover).unbind('dragend',this._handleDragend).unbind('drop',this._handleDrop);jQuery.sap.byId(i+"hdrImageHolder").unbind('dragover',this._handleDragover).unbind('dragend',this._handleDragend).unbind('drop',this._handleDrop)}};
sap.ui.ux3.ShellPersonalization.prototype._getDialog=function(){if(!this.oDialog){jQuery.sap.require("sap.ui.ux3.ShellColorPicker");var i=this.shell.getId()+"-p13n_";var s=jQuery.extend(jQuery.extend({},sap.ui.ux3.ShellPersonalization.getOriginalSettings()),this.oSettings);var c=sap.ui.commons;var t=this;var d=new c.Dialog({title:"Shell Personalization",width:"544px",height:"560px",showCloseButton:false,resizable:false,closed:[function(){this._unbindDragAndDrop("bg");this._unbindDragAndDrop("hdr");this._unbindDragAndDrop("logo");this.oTransientSettings=null},this]}).addStyleClass("sapUiUx3ShellP13n");var a=new c.TabStrip({width:"100%",height:"100%",select:jQuery.proxy(function(p){var C=sap.ui.getCore().byId(p.getParameter("id"));if(C){var e=p.getParameter("index");C.setSelectedIndex(e);var t=this;if(e==0){window.setTimeout(function(){t.shell.$("bgColor").css("background-color",t.getTransientSettingsWithDefaults().sBgColor)},1);window.setTimeout(jQuery.proxy(function(){this._bindDragAndDrop("bg")},this),0)}else if(e==1){window.setTimeout(function(){t.shell.$("lineColor").css("background-color",t.getTransientSettingsWithDefaults().sLineColor)},1);window.setTimeout(jQuery.proxy(function(){this._bindDragAndDrop("hdr")},this),0)}else if(e==2){window.setTimeout(jQuery.proxy(function(){this._bindDragAndDrop("logo")},this),0)}}},this)});this.oBgImgHtml=new sap.ui.core.HTML(i+"bgImageHolder",{preferDOM:true,content:"<div id='"+i+"bgImageHolder' class='sapUiUx3ShellP13nImgHolder'><img id='"+i+"bgImageImg' src='"+(this.oTransientSettings.sBackgroundImageSrc?this.oTransientSettings.sBackgroundImageSrc:sap.ui.resource('sap.ui.core','themes/base/img/1x1.gif'))+"'/></div>"});this.oBgImgOpacitySlider=new c.Slider({value:(this.oTransientSettings.fBgImgOpacity!==undefined?100-this.oTransientSettings.fBgImgOpacity*100:100-sap.ui.ux3.ShellPersonalization.getOriginalSettings().fBgImgOpacity*100),liveChange:jQuery.proxy(this._handleBgImageOpacitySliderChange,this)});this.oSidebarOpacitySlider=new c.Slider({value:(this.oTransientSettings.fSidebarOpacity!==undefined?100-this.oTransientSettings.fSidebarOpacity*100:100-sap.ui.ux3.ShellPersonalization.getOriginalSettings().fSidebarOpacity*100),liveChange:jQuery.proxy(this._handleSidebarOpacitySliderChange,this)});this.oBgColorPicker=new sap.ui.ux3.ShellColorPicker(i+"bgColorPicker");this.oBgColorPicker.attachLiveChange(function(e){t._handleBgColorChange(e)});var b=new c.Button({text:"Change..."});var t=this;b.attachPress(function(){if(!t.oBgColorPicker.isOpen()){t.oBgColorPicker.open(sap.ui.ux3.ShellColorPicker.parseCssRgbString(t.getTransientSettingsWithDefaults().sBgColor),sap.ui.core.Popup.Dock.BeginTop,sap.ui.core.Popup.Dock.BeginBottom,t.shell.getDomRef("bgColor"))}});this.oBgPreviewHtml=new sap.ui.core.HTML({preferDom:true,content:"<div id='"+this.shell.getId()+"-bgColor' style='background-color:"+s.sBgColor+"' class='sapUiUx3ShellColorPickerPreview'></div>"});var B=new sap.ui.commons.Tab().setText("Background").addContent(new c.layout.MatrixLayout({layoutFixed:false}).createRow(new c.Label({text:"Background Image:"}),this.oBgImgHtml).createRow(new c.Label({text:"Image Transparency:"}),this.oBgImgOpacitySlider).createRow(new c.Label({text:"Background Color:"}),new c.layout.MatrixLayoutCell().addContent(this.oBgPreviewHtml).addContent(b)).createRow(null).createRow(new c.Label({text:"Sidebar Transparency:"}),this.oSidebarOpacitySlider));a.addTab(B);this.oByDStyleCb=new c.CheckBox({text:"ByDesign-style Header Bar",checked:this.oTransientSettings.bByDStyle,change:jQuery.proxy(this._handleByDStyleChange,this)});this.oHdrImgHtml=new sap.ui.core.HTML(i+"hdrImageHolder",{preferDOM:true,content:"<div id='"+i+"hdrImageHolder' class='sapUiUx3ShellP13nImgHolder'><img id='"+i+"hdrImageImg' src='"+(this.oTransientSettings.sHeaderImageSrc?this.oTransientSettings.sHeaderImageSrc:sap.ui.resource('sap.ui.core','themes/base/img/1x1.gif'))+"'/></div>"});this.oLineColorPicker=new sap.ui.ux3.ShellColorPicker(i+"lineColorPicker");this.oLineColorPicker.attachLiveChange(function(e){t._handleLineColorChange(e)});var l=new c.Button({text:"Change..."});var t=this;l.attachPress(function(){if(!t.oLineColorPicker.isOpen()){t.oLineColorPicker.open(sap.ui.ux3.ShellColorPicker.parseCssRgbString(t.getTransientSettingsWithDefaults().sLineColor),sap.ui.core.Popup.Dock.BeginTop,sap.ui.core.Popup.Dock.BeginBottom,t.shell.getDomRef("lineColor"))}});this.oLinePreviewHtml=new sap.ui.core.HTML({preferDom:true,content:"<div id='"+this.shell.getId()+"-lineColor' style='background-color:"+s.sLineColor+"' class='sapUiUx3ShellColorPickerPreview'></div>"});var h=new sap.ui.commons.Tab().setText("Header Bar").addContent(new c.layout.MatrixLayout({layoutFixed:false}).createRow(new c.Label({text:"Line Color (ByD-style only):"}),new c.layout.MatrixLayoutCell().addContent(this.oLinePreviewHtml).addContent(l)).createRow(null).createRow(new c.Label({text:"Header Image:"}),this.oHdrImgHtml));a.addTab(h);this.oLogoImgHtml=new sap.ui.core.HTML(i+"logoImageHolder",{preferDOM:true,content:"<div id='"+i+"logoImageHolder' class='sapUiUx3ShellP13nImgHolder'><img id='"+i+"logoImageImg' src='"+(this.oTransientSettings.sLogoImageSrc?this.oTransientSettings.sLogoImageSrc:sap.ui.resource('sap.ui.core','themes/base/img/1x1.gif'))+"'/></div>"});this.oLogoRbg=new c.RadioButtonGroup().addItem(new sap.ui.core.Item({text:"Left",key:"left"})).addItem(new sap.ui.core.Item({text:"Center",key:"center"})).attachSelect(this._handleLogoAlignChange,this);this.oUseLogoSizeCb=new c.CheckBox({text:"Use original image size",checked:this.oTransientSettings.bUseLogoSize,change:jQuery.proxy(this._handleUseLogoSizeChange,this)});var L=new sap.ui.commons.Tab().setText("Logo").addContent(new c.layout.MatrixLayout({layoutFixed:false}).createRow(new c.Label({text:"Logo Image:"}),this.oLogoImgHtml).createRow(new c.Label({text:"Position:"}),this.oLogoRbg).createRow(this.oUseLogoSizeCb));a.addTab(L);d.addContent(a);var t=this;d.addButton(new c.Button({text:"Reset All",press:function(){t.applySettings(jQuery.extend({},sap.ui.ux3.ShellPersonalization.getOriginalSettings()));t.oSettings={};t.oTransientSettings={};t.updateDialog();t._bindDragAndDrop("bg");t._bindDragAndDrop("hdr");t._bindDragAndDrop("logo");t.firePersonalizationChange({settings:{}})}}));d.addButton(new c.Button({text:"OK",press:function(){t.oSettings=jQuery.extend({},t.oTransientSettings);t.firePersonalizationChange({settings:t.oSettings});d.close()}}));d.addButton(new c.Button({text:"Cancel",press:function(){d.close()}}));this.oDialog=d}return this.oDialog};
sap.ui.ux3.ShellPersonalization.prototype.updateDialog=function(){var a=jQuery.extend({},sap.ui.ux3.ShellPersonalization.getOriginalSettings());a=jQuery.extend(a,this.oSettings);var i=this.shell.getId()+"-p13n_";this.oBgImgHtml.setContent("<div id='"+i+"bgImageHolder' class='sapUiUx3ShellP13nImgHolder'><img id='"+i+"bgImageImg' src='"+(a.sBackgroundImageSrc?a.sBackgroundImageSrc:sap.ui.resource('sap.ui.core','themes/base/img/1x1.gif'))+"'/></div>");this.oBgImgOpacitySlider.setValue(100-a.fBgImgOpacity*100);this.oSidebarOpacitySlider.setValue(100-a.fSidebarOpacity*100);this.oByDStyleCb.setChecked(a.bByDStyle);this.oHdrImgHtml.setContent("<div id='"+i+"hdrImageHolder' class='sapUiUx3ShellP13nImgHolder'><img id='"+i+"hdrImageImg' src='"+(a.sHeaderImageSrc?a.sHeaderImageSrc:sap.ui.resource('sap.ui.core','themes/base/img/1x1.gif'))+"'/></div>");this.oLogoRbg.setSelectedIndex((a.sLogoAlign=="center")?1:0);this.oUseLogoSizeCb.setChecked(a.bUseLogoSize);this.oLogoImgHtml.setContent("<div id='"+i+"logoImageHolder' class='sapUiUx3ShellP13nImgHolder'><img id='"+i+"logoImageImg' src='"+(a.sLogoImageSrc?a.sLogoImageSrc:sap.ui.resource('sap.ui.core','themes/base/img/1x1.gif'))+"'/></div>")};
sap.ui.ux3.ShellPersonalization.prototype._handleByDStyleChange=function(e){var c=e.getParameter("checked");this.oTransientSettings.bByDStyle=c;this.applyByDStyle(c)};
sap.ui.ux3.ShellPersonalization.prototype.applyByDStyle=function(b){this.shell.$().toggleClass("sapUiUx3ShellByD",b)};
sap.ui.ux3.ShellPersonalization.prototype._handleBgColorChange=function(e){var c=e.getParameter("cssColor");this.oTransientSettings.sBgColor=c;this.applyBgColor(c)};
sap.ui.ux3.ShellPersonalization.prototype.applyBgColor=function(c){this.shell.$("bg").css("background-color",c);this.shell.$("bgColor").css("background-color",c)};
sap.ui.ux3.ShellPersonalization.prototype._handleBackgroundImageChange=function(u,p){var t=true;if(p){if(t){this.oSettings.sBgCssImg="url("+u+")";this.oSettings.sBgImgSrc=null}else{this.oSettings.sBgCssImg=null;this.oSettings.sBgImgSrc=u}this.applyBgImage(this.oSettings.sBgCssImg,this.oSettings.sBgImgSrc);this.firePersonalizationChange({settings:this.oSettings})}else{if(t){this.oTransientSettings.sBgCssImg="url("+u+")";this.oTransientSettings.sBgImgSrc=null}else{this.oTransientSettings.sBgCssImg=null;this.oTransientSettings.sBgImgSrc=u}this.applyBgImage(this.oTransientSettings.sBgCssImg,this.oTransientSettings.sBgImgSrc)}};
sap.ui.ux3.ShellPersonalization.prototype.applyBgImage=function(b,B){var f=B?B:b.substring(4,b.length-1);b=b?b:"";B=B?B:sap.ui.ux3.ShellPersonalization.TRANSPARENT_1x1;var o=this.shell.getDomRef("bgImg");var a=this.shell.getDomRef("p13n_bgImageImg");o.style.backgroundImage=b;o.src=B;if(a){}};
sap.ui.ux3.ShellPersonalization.prototype._handleHeaderImageChange=function(d,p){if(p){this.oSettings.sHeaderImageSrc=d;this.firePersonalizationChange({settings:this.oSettings})}else{this.oTransientSettings.sHeaderImageSrc=d}this.applyHeaderImage(d)};
sap.ui.ux3.ShellPersonalization.prototype.applyHeaderImage=function(d){this.shell.$("hdr").css("background-image","url("+d+")");if(this.oDialog&&this.oDialog.isOpen()){this.shell.$("p13n_hdrImageImg").attr("src",d)}};
sap.ui.ux3.ShellPersonalization.prototype._handleLineColorChange=function(e){var c=e.getParameter("cssColor");this.oTransientSettings.sLineColor=c;this.applyLineColor(c)};
sap.ui.ux3.ShellPersonalization.prototype.applyLineColor=function(c){this.shell.$("hdr").find("hr").css("background-color",c);this.shell.$("lineColor").css("background-color",c)};
sap.ui.ux3.ShellPersonalization.prototype._handleBgImageOpacitySliderChange=function(e){var v=(100-e.getParameter("value"))/100;this.oTransientSettings.fBgImgOpacity=v;this.applyBgImageOpacity(v)};
sap.ui.ux3.ShellPersonalization.prototype.applyBgImageOpacity=function(v){this.shell.$("bgImg").css("opacity",v)};
sap.ui.ux3.ShellPersonalization.prototype._handleSidebarOpacitySliderChange=function(e){var v=(100-e.getParameter("value"))/100;this.oTransientSettings.fSidebarOpacity=v;this.applySidebarOpacity(v)};
sap.ui.ux3.ShellPersonalization.prototype.applySidebarOpacity=function(v){this.shell.$("tp").css("opacity",v);this.shell.$("paneBar").children(":nth-child(2)").css("opacity",v)};
sap.ui.ux3.ShellPersonalization.prototype._handleLogoImageChange=function(u,p){if(p){this.oSettings.sLogoImageSrc=u;this.firePersonalizationChange({settings:this.oSettings})}else{this.oTransientSettings.sLogoImageSrc=u}this.applyLogoImage(u)};
sap.ui.ux3.ShellPersonalization.prototype.applyLogoImage=function(u){if(!u){u=this.shell.getAppIcon();if(!u){u=sap.ui.ux3.ShellPersonalization.TRANSPARENT_1x1}}this.shell.$("logoImg").attr("src",u);this.shell.$("p13n_logoImageImg").attr("src",u)};
sap.ui.ux3.ShellPersonalization.prototype._handleLogoAlignChange=function(e){var i=e.getParameter("selectedIndex");var a=["left","center"][i];this.oTransientSettings.sLogoAlign=a;this.applyLogoAlign(a)};
sap.ui.ux3.ShellPersonalization.prototype.applyLogoAlign=function(l){var r=l;if(sap.ui.getCore().getConfiguration().getRTL()&&(r=="right")){r="left"}this.shell.$("hdr").css("text-align",r)};
sap.ui.ux3.ShellPersonalization.prototype._handleUseLogoSizeChange=function(e){var u=e.getParameter("checked");this.oTransientSettings.bUseLogoSize=u;this.applyUseLogoSize(u)};
sap.ui.ux3.ShellPersonalization.prototype.applyUseLogoSize=function(u){this.shell.$("hdr").toggleClass("sapUiUx3ShellHeaderFlex",u);this.shell.$("hdrImg").toggleClass("sapUiUx3ShellHeaderImgFlex",u)};
sap.ui.ux3.ShellPersonalization.prototype._handleDragover=function(e){var i=e.target.id;if(!this._dragOverBlinking){var $=jQuery.sap.byId(i);$.css("opacity","0.5");this._dragOverBlinking=true;var t=this;window.setTimeout(function(){$.css("opacity","1");window.setTimeout(function(){t._dragOverBlinking=null},250)},250)}return false};
sap.ui.ux3.ShellPersonalization.prototype._handleDragend=function(e){return false};
sap.ui.ux3.ShellPersonalization.prototype._handleDrop=function(a){var i=a.target.id;a.preventDefault();var e=a.originalEvent;var f=e.dataTransfer.files[0];if(f){var r=new window.FileReader();r.onload=jQuery.proxy(function(b){var d=b.target.result;if((i==this.shell.getId()+"-p13n_bgImageImg")||(i==this.shell.getId()+"-p13n_bgImageHolder")){this._handleBackgroundImageChange(d)}else if((i==this.shell.getId()+"-p13n_hdrImageImg")||(i==this.shell.getId()+"-p13n_hdrImageHolder")){this._handleHeaderImageChange(d)}else if((i==this.shell.getId()+"-p13n_logoImageImg")||(i==this.shell.getId()+"-p13n_logoImageHolder")){this._handleLogoImageChange(d)}r=null},this);r.readAsDataURL(f)}};
