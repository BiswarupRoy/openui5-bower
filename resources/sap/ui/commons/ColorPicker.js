/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.ColorPicker");jQuery.sap.require("sap.ui.commons.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.commons.ColorPicker",{metadata:{publicMethods:["getRGB"],library:"sap.ui.commons",properties:{"colorString":{type:"string",group:"Misc",defaultValue:null}},events:{"change":{},"liveChange":{}}}});sap.ui.commons.ColorPicker.M_EVENTS={'change':'change','liveChange':'liveChange'};
sap.ui.commons.ColorPicker.prototype.init=function(){this.Color={r:255,g:255,b:255,h:0,s:0,v:100,a:1,a_old:1,hex:"#FFFFFF",old:"#FFFFFF"};this.HexString="FFFFFF";this.rgbString="";this.$cpBox=null;this.$cpCur=null;this.RGB={r:0,g:0,b:0};this.bRtl=sap.ui.getCore().getConfiguration().getRTL();this.oMatrix=new sap.ui.commons.layout.MatrixLayout({layoutFixed:true,columns:3,width:"270px",widths:["117px","84px","69px"]});this.oMatrix.setParent(this);this.oMatrix.addStyleClass("sapUiColorPicker-ColorPickerMatrix");var c=this.getId()+'-cpBox';var a=this.getId()+'-cpCur';this.oHtmlBox=new sap.ui.core.HTML({content:"<DIV id="+c+" class=sapUiColorPicker-ColorPickerBox><DIV id="+a+" class=sapUiColorPicker-ColorPickerCircle></DIV></DIV>"});var o=this.getId()+'-ocBox';this.oHtmlOldCol=new sap.ui.core.HTML({content:"<DIV id="+o+" class=sapUiColorPicker-ColorPickerOldColor></DIV>"});var n=this.getId()+'-ncBox';this.oHtmlNewCol=new sap.ui.core.HTML({content:"<DIV id="+n+" class=sapUiColorPicker-ColorPickerNewColor></DIV>"});var i=this.getId()+'-hxF';var h=this.Color.hex.substr(1);this.oHexField=new sap.ui.commons.TextField({id:i,value:h});this.oHexField.addStyleClass("sapUiColorPicker-ColorPickerHexField");this.oHexLabel=new sap.ui.commons.Label();this.oHexLabel.addStyleClass("sapUiColorPicker-ColorPickerLabels");this.oHexLabel.setText("#:");this.oHexLabel.setLabelFor(this.oHexField);i=this.getId()+'-rF';this.oRedField=new sap.ui.commons.TextField({id:i,value:this.Color.r,width:"3em"});this.oRedField.addStyleClass("sapUiColorPicker-ColorPickerInputFieldsLeft");this.oRedLabel=new sap.ui.commons.Label();this.oRedLabel.addStyleClass("sapUiColorPicker-ColorPickerLabels");this.oRedLabel.setText("R:");this.oRedLabel.setLabelFor(this.oRedField);i=this.getId()+'-gF';this.oGreenField=new sap.ui.commons.TextField({id:i,value:this.Color.g,width:"3em"});this.oGreenField.addStyleClass("sapUiColorPicker-ColorPickerInputFieldsLeft");this.oGreenLabel=new sap.ui.commons.Label();this.oGreenLabel.addStyleClass("sapUiColorPicker-ColorPickerLabels");this.oGreenLabel.setText("G:");this.oGreenLabel.setLabelFor(this.oGreenField);i=this.getId()+'-bF';this.oBlueField=new sap.ui.commons.TextField({id:i,value:this.Color.b,width:"3em"});this.oBlueField.addStyleClass("sapUiColorPicker-ColorPickerInputFieldsLeft");this.oBlueLabel=new sap.ui.commons.Label();this.oBlueLabel.addStyleClass("sapUiColorPicker-ColorPickerLabels");this.oBlueLabel.setText("B:");this.oBlueLabel.setLabelFor(this.oBlueField);i=this.getId()+'-hF';this.oHueField=new sap.ui.commons.TextField({id:i,value:this.Color.h,width:"3em"});this.oHueField.addStyleClass("sapUiColorPicker-ColorPickerInputFieldsRight");this.oHueLabel=new sap.ui.commons.Label();this.oHueLabel.addStyleClass("sapUiColorPicker-ColorPickerLabels");this.oHueLabel.setText("H:");this.oHueLabel.setLabelFor(this.oHueField);i=this.getId()+'-sF';this.oSatField=new sap.ui.commons.TextField({id:i,value:this.Color.s,width:"3em"});this.oSatField.addStyleClass("sapUiColorPicker-ColorPickerInputFieldsRight");this.oSatLabel=new sap.ui.commons.Label();this.oSatLabel.addStyleClass("sapUiColorPicker-ColorPickerLabels");this.oSatLabel.setText("S:");this.oSatLabel.setLabelFor(this.oSatField);i=this.getId()+'-vF';this.oValField=new sap.ui.commons.TextField({id:i,value:this.Color.v,width:"3em"});this.oValField.addStyleClass("sapUiColorPicker-ColorPickerInputFieldsRight");this.oValLabel=new sap.ui.commons.Label();this.oValLabel.addStyleClass("sapUiColorPicker-ColorPickerLabels");this.oValLabel.setText("V:");this.oValLabel.setLabelFor(this.oValField);i=this.getId()+'-hSLD';this.oSlider=new sap.ui.commons.Slider({id:i});this.oSlider.setMax(360);this.oSlider.setValue(parseInt(this.oHueField.getValue()),10);this.oSlider.addStyleClass("sapUiColorPicker-ColorPickerSlider");i=this.getId()+'-aSLD';this.oAlphaSlider=new sap.ui.commons.Slider({id:i});this.oAlphaSlider.setMax(1);this.oAlphaSlider.setValue(1);this.oAlphaSlider.setSmallStepWidth(.01);this.oAlphaSlider.addStyleClass("sapUiColorPicker-ColorPickerAlphaSlider");this.oHLayout1=new sap.ui.layout.HorizontalLayout({content:[this.oRedLabel,this.oRedField]});this.oHLayout2=new sap.ui.layout.HorizontalLayout({content:[this.oGreenLabel,this.oGreenField]});this.oHLayout3=new sap.ui.layout.HorizontalLayout({content:[this.oBlueLabel,this.oBlueField]});this.oHLayout4=new sap.ui.layout.HorizontalLayout({content:[this.oHexLabel,this.oHexField]});this.oHLayout5=new sap.ui.layout.HorizontalLayout({content:[this.oHueLabel,this.oHueField]});this.oHLayout6=new sap.ui.layout.HorizontalLayout({content:[this.oSatLabel,this.oSatField]});this.oHLayout7=new sap.ui.layout.HorizontalLayout({content:[this.oValLabel,this.oValField]});this.oHLayout8=new sap.ui.layout.HorizontalLayout({content:[this.oHtmlOldCol,this.oHtmlNewCol]});this.oVLayout1=new sap.ui.layout.VerticalLayout({content:[this.oHLayout1,this.oHLayout2,this.oHLayout3,this.oHLayout4]});this.oVLayout2=new sap.ui.layout.VerticalLayout({content:[this.oHLayout5,this.oHLayout6,this.oHLayout7,this.oHLayout8]});this.oVLayout2.addStyleClass("sapUiColorPicker-ColorPickerLastColumn");this.oMatrix.createRow(this.oHtmlBox,this.oVLayout1,this.oVLayout2);this.oRow2=new sap.ui.commons.layout.MatrixLayoutRow();this.oCell=new sap.ui.commons.layout.MatrixLayoutCell({colSpan:3});this.oCell.addContent(this.oSlider);this.oRow2.addCell(this.oCell);this.oMatrix.addRow(this.oRow2);this.oRow3=new sap.ui.commons.layout.MatrixLayoutRow();this.oCell=new sap.ui.commons.layout.MatrixLayoutCell({colSpan:3});this.oCell.addContent(this.oAlphaSlider);this.oRow3.addCell(this.oCell);this.oMatrix.addRow(this.oRow3);this.oHexField.attachChange(jQuery.proxy(this._handleHexValueChange,this));this.oRedField.attachChange(jQuery.proxy(this._handleRedValueChange,this));this.oGreenField.attachChange(jQuery.proxy(this._handleGreenValueChange,this));this.oBlueField.attachChange(jQuery.proxy(this._handleBlueValueChange,this));this.oHueField.attachChange(jQuery.proxy(this._handleHueValueChange,this));this.oSatField.attachChange(jQuery.proxy(this._handleSatValueChange,this));this.oValField.attachChange(jQuery.proxy(this._handleValValueChange,this));this.oSlider.attachLiveChange(jQuery.proxy(this._handleSliderLiveChange,this));this.oSlider.attachChange(jQuery.proxy(this._handleSliderChange,this));this.oAlphaSlider.attachLiveChange(jQuery.proxy(this._handleAlphaSliderLiveChange,this));this.oAlphaSlider.attachChange(jQuery.proxy(this._handleAlphaSliderChange,this))};
sap.ui.commons.ColorPicker.prototype.exit=function(){if(this.$cpBox){this.$cpBox.unbind("mousedown",this.handleMouseDown)}jQuery(document).unbind("mousemove",this.handleMousePos).unbind("mouseup",this.handleMouseUp);this.oMatrix.destroy()};
sap.ui.commons.ColorPicker.prototype.setColorString=function(c){this._parseColorString(c);this.oHexField.setValue(this.Color.hex.substr(1));this.oRedField.setValue(this.Color.r);this.oGreenField.setValue(this.Color.g);this.oBlueField.setValue(this.Color.b);this.oHueField.setValue(this.Color.h);this.oSatField.setValue(this.Color.s);this.oValField.setValue(this.Color.v);this.oSlider.setValue(this.Color.h);this.oAlphaSlider.setValue(this.Color.a);this.fireLiveChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.fireChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.setProperty('colorString',this._getRGBString(),true)};
sap.ui.commons.ColorPicker.prototype.handleMouseDown=function(e){if(this.oHexField.getValueState()==sap.ui.core.ValueState.Error)return;this.handleMousePos(e);jQuery(document).bind("mousemove",jQuery.proxy(this.handleMousePos,this)).bind("mouseup",jQuery.proxy(this.handleMouseUp,this))};
sap.ui.commons.ColorPicker.prototype.handleMouseUp=function(e){if(this.oHexField.getValueState()==sap.ui.core.ValueState.Error)return;this.handleMousePos(e);jQuery(document).unbind("mousemove",this.handleMousePos).unbind("mouseup",this.handleMouseUp);this.fireChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.setProperty('colorString',this._getRGBString(),true)};
sap.ui.commons.ColorPicker.prototype.handleMousePos=function(e){var c=this.$cpBox.offset();var a=this.$cpBox.width();var b=this.$cpBox.height();var x=e.pageX-c.left;var y=e.pageY-c.top;x=Math.min(Math.max(x,0),a);if(this.bRtl){var r=a-x;x=r};y=Math.min(Math.max(y,0),b);var v=parseInt(x/a*100,10);var s=parseInt((1-y/b)*100,10);this.oSatField.setValue(s);this.oValField.setValue(v);this._processHSVchanges();this.fireLiveChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.setProperty('colorString',this._getRGBString(),true)};
sap.ui.commons.ColorPicker.prototype._handleSliderLiveChange=function(){var s=parseInt(this.oSlider.getValue(),10);this.oHueField.setValue(s);this._processHSVchanges();this.fireLiveChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.setProperty('colorString',this._getRGBString(),true)};
sap.ui.commons.ColorPicker.prototype._handleSliderChange=function(){var s=parseInt(this.oSlider.getValue(),10);this.oHueField.setValue(s);this._processHSVchanges();this.fireChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.setProperty('colorString',this._getRGBString(),true)};
sap.ui.commons.ColorPicker.prototype._handleAlphaSliderLiveChange=function(){this.Color.a=this.oAlphaSlider.getValue();this._processHSVchanges();this.fireLiveChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.setProperty('colorString',this._getRGBString(),true)};
sap.ui.commons.ColorPicker.prototype._handleAlphaSliderChange=function(){this.Color.a=this.oAlphaSlider.getValue();this._processHSVchanges();this.fireChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.setProperty('colorString',this._getRGBString(),true)};
sap.ui.commons.ColorPicker.prototype._handleHueValueChange=function(){var h=parseInt(this.oHueField.getValue(),10);if(h<0||isNaN(h))h=0;if(h>360)h=359.9;this.oHueField.setValue(h);this.oSlider.setValue(h);this._processHSVchanges();this.fireLiveChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.fireChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.setProperty('colorString',this._getRGBString(),true)};
sap.ui.commons.ColorPicker.prototype._handleSatValueChange=function(){var s=parseInt(this.oSatField.getValue(),10);if(s<0||isNaN(s))s=0;if(s>100)s=100;this.oSatField.setValue(s);this._processHSVchanges();this.fireLiveChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.fireChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.setProperty('colorString',this._getRGBString(),true)};
sap.ui.commons.ColorPicker.prototype._handleValValueChange=function(){var v=parseInt(this.oValField.getValue(),10);if(v<0||isNaN(v))v=0;if(v>100)v=100;this.oValField.setValue(v);this._processHSVchanges();this.fireLiveChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.fireChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.setProperty('colorString',this._getRGBString(),true)};
sap.ui.commons.ColorPicker.prototype._handleRedValueChange=function(){var r=parseInt(this.oRedField.getValue(),10);if(r<0||isNaN(r))r=0;if(r>255)r=255;this.oRedField.setValue(r);this._processRGBchanges();this.fireLiveChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.fireChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.setProperty('colorString',this._getRGBString(),true)};
sap.ui.commons.ColorPicker.prototype._handleGreenValueChange=function(){var g=parseInt(this.oGreenField.getValue(),10);if(g<0||isNaN(g))g=0;if(g>255)g=255;this.oGreenField.setValue(g);this._processRGBchanges();this.fireLiveChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.fireChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.setProperty('colorString',this._getRGBString(),true)};
sap.ui.commons.ColorPicker.prototype._handleBlueValueChange=function(){var b=parseInt(this.oBlueField.getValue(),10);if(b<0||isNaN(b))b=0;if(b>255)b=255;this.oBlueField.setValue(b);this._processRGBchanges();this.fireLiveChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.fireChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.setProperty('colorString',this._getRGBString(),true)};
sap.ui.commons.ColorPicker.prototype._processHSVchanges=function(){var h=parseInt(this.oHueField.getValue(),10);var s=parseInt(this.oSatField.getValue(),10);var v=parseInt(this.oValField.getValue(),10);this._calculateRGB(h,s,v);this.Color.r=this.RGB.r;this.Color.g=this.RGB.g;this.Color.b=this.RGB.b;this.oRedField.setValue(this.Color.r);this.oGreenField.setValue(this.Color.g);this.oBlueField.setValue(this.Color.b);this._calculateHEX(this.Color.r,this.Color.g,this.Color.b);this.oHexField.setValue(this.HexString);this.Color.hex="#"+this.oHexField.getValue();this.Color.h=h;this.Color.s=s;this.Color.v=v;this.oHueField.setValue(this.Color.h);this.oSatField.setValue(this.Color.s);this.oValField.setValue(this.Color.v);this._updateGradientBoxBackground(this.Color.h);this._updateCursorPosition();this._updateSelColorBackground()};
sap.ui.commons.ColorPicker.prototype._processRGBchanges=function(){var r=Math.round(parseInt(this.oRedField.getValue(),10));var g=Math.round(parseInt(this.oGreenField.getValue(),10));var b=Math.round(parseInt(this.oBlueField.getValue(),10));this._calculateHEX(r,g,b);this.oHexField.setValue(this.HexString);this._calculateHSV(r,g,b);this.oHueField.setValue(this.Color.h);this.oSatField.setValue(this.Color.s);this.oValField.setValue(this.Color.v);this.oSlider.setValue(parseInt(this.oHueField.getValue(),10));this.Color.r=r;this.Color.g=g;this.Color.b=b;this.Color.hex="#"+this.oHexField.getValue();this._updateGradientBoxBackground(this.Color.h);this._updateCursorPosition();this._updateSelColorBackground()};
sap.ui.commons.ColorPicker.prototype._handleHexValueChange=function(){var h=this.oHexField.getValue().toUpperCase();if(h.substr(0,1)=='#')h=h.substr(1);var r=/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;if(r.test(h)==false){this.oHexField.setValueState(sap.ui.core.ValueState.Error);this.oSlider.setEnabled(false);this.oAlphaSlider.setEnabled(false);this.oHueField.setEnabled(false);this.oRedField.setEnabled(false);this.oGreenField.setEnabled(false);this.oBlueField.setEnabled(false);this.oSatField.setEnabled(false);this.oValField.setEnabled(false);return false}else if(this.oHexField.getValueState()==sap.ui.core.ValueState.Error){this.oHexField.setValueState(sap.ui.core.ValueState.None);this.oSlider.setEnabled(true);this.oAlphaSlider.setEnabled(true);this.oHueField.setEnabled(true);this.oRedField.setEnabled(true);this.oGreenField.setEnabled(true);this.oBlueField.setEnabled(true);this.oSatField.setEnabled(true);this.oValField.setEnabled(true)};if(h.length==3){var t=h.charAt(0)+h.charAt(0)+h.charAt(1)+h.charAt(1)+h.charAt(2)+h.charAt(2);h=t};this._processHexChanges(h);this.oHexField.setValue(h);this.oRedField.setValue(this.Color.r);this.oGreenField.setValue(this.Color.g);this.oBlueField.setValue(this.Color.b);this.oHueField.setValue(this.Color.h);this.oSatField.setValue(this.Color.s);this.oValField.setValue(this.Color.v);this.oSlider.setValue(parseInt(this.oHueField.getValue(),10));this.oAlphaSlider.setValue(1);this._updateGradientBoxBackground(this.Color.h);this._updateCursorPosition();this._updateSelColorBackground();this.fireLiveChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.fireChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,alpha:this.Color.a,hex:this.Color.hex});this.setProperty('colorString',this._getRGBString(),true)};
sap.ui.commons.ColorPicker.prototype._processHexChanges=function(i){this._convertRGB(i);this._calculateHSV(this.Color.r,this.Color.g,this.Color.b);this.Color.hex="#"+i.toUpperCase()};
sap.ui.commons.ColorPicker.prototype._updateCursorPosition=function(){var c=this.$cpCur.width();var a=this.$cpCur.height();var b=this.$cpBox.width();var d=this.$cpBox.height();var s=this.oSatField.getValue();var v=this.oValField.getValue();var x=parseInt(v*b/100,10);if(this.bRtl){var r=b-x;x=r};var y=parseInt((1-s/100)*d,10);x=Math.min(Math.max(x,0),b-c/2)-c/2;y=Math.min(Math.max(y,0),d-a/2)-a/2;this.$cpCur.css("left",x).css("top",y)};
sap.ui.commons.ColorPicker.prototype._calculateRGB=function(h,s,v){if(v==0){this.RGB.r=Math.round(s*2.55);this.RGB.g=Math.round(s*2.55);this.RGB.b=Math.round(s*2.55)}else{h=h/60;s=s/100;v=v/100;var r,g,b;var i=Math.floor(h);var f=h-i;var p=v*(1-s);var q=v*(1-s*f);var t=v*(1-s*(1-f));switch(i){case 0:r=v;g=t;b=p;break;case 1:r=q;g=v;b=p;break;case 2:r=p;g=v;b=t;break;case 3:r=p;g=q;b=v;break;case 4:r=t;g=p;b=v;break;default:r=v;g=p;b=q;break}this.RGB.r=Math.round(r*255);this.RGB.g=Math.round(g*255);this.RGB.b=Math.round(b*255)}};
sap.ui.commons.ColorPicker.prototype._getRGBString=function(){if(this.Color.a<1){return"rgba("+this.Color.r+","+this.Color.g+","+this.Color.b+", "+this.Color.a+")"}else{return"rgb("+this.Color.r+","+this.Color.g+","+this.Color.b+")"}};
sap.ui.commons.ColorPicker.prototype._calculateHEX=function(r,g,b){var a=r.toString(16);var c=g.toString(16);var d=b.toString(16);if(a.length==1)a='0'+a;if(c.length==1)c='0'+c;if(d.length==1)d='0'+d;this.HexString=(a+c+d).toUpperCase()};
sap.ui.commons.ColorPicker.prototype._calculateHSV=function(r,g,b){var m=Math.max(Math.max(r,g),b);var a=Math.min(Math.min(r,g),b);var d=(m-a);var v=Math.round(m*100/255);var s=(m==0.0)?0:(100*d/m);var h=0;if(s==0)h=0;else if(r==m)h=60.0*(g-b)/d;else if(g==m)h=120.0+60.0*(b-r)/d;else if(b==m)h=240.0+60.0*(r-g)/d;if(h<0.0)h+=359.9;h=Math.round(h);s=Math.round(s);this.Color.h=h;this.Color.s=s;this.Color.v=v};
sap.ui.commons.ColorPicker.prototype._convertRGB=function(h){var r=parseInt(h.substr(0,2),16);var g=parseInt(h.substr(2,2),16);var b=parseInt(h.substr(4,2),16);this.Color.r=r;this.Color.g=g;this.Color.b=b};
sap.ui.commons.ColorPicker.prototype._updateGradientBoxBackground=function(h){this._calculateRGB(h,100,100);this._calculateHEX(this.RGB.r,this.RGB.g,this.RGB.b);var a="#"+this.HexString;this.$cpBox.css('background-color','rgb('+this.RGB.r+', '+this.RGB.g+', '+this.RGB.b+')')};
sap.ui.commons.ColorPicker.prototype._updateSelColorBackground=function(){this.$("ncBox").css('background-color',this._getRGBString())};
sap.ui.commons.ColorPicker.prototype._parseColorString=function(c){if(c.substr(0,1)=='#')c=c.substr(1);c=c.replace(/ /g,'');c=c.toLowerCase();var s="";var h="";var a={aliceblue:'f0f8ff',antiquewhite:'faebd7',aqua:'00ffff',aquamarine:'7fffd4',azure:'f0ffff',beige:'f5f5dc',bisque:'ffe4c4',black:'000000',blanchedalmond:'ffebcd',blue:'0000ff',blueviolet:'8a2be2',brown:'a52a2a',burlywood:'deb887',cadetblue:'5f9ea0',chartreuse:'7fff00',chocolate:'d2691e',coral:'ff7f50',cornflowerblue:'6495ed',cornsilk:'fff8dc',crimson:'dc143c',cyan:'00ffff',darkblue:'00008b',darkcyan:'008b8b',darkgoldenrod:'b8860b',darkgray:'a9a9a9',darkgreen:'006400',darkkhaki:'bdb76b',darkmagenta:'8b008b',darkolivegreen:'556b2f',darkorange:'ff8c00',darkorchid:'9932cc',darkred:'8b0000',darksalmon:'e9967a',darkseagreen:'8fbc8f',darkslateblue:'483d8b',darkslategray:'2f4f4f',darkturquoise:'00ced1',darkviolet:'9400d3',deeppink:'ff1493',deepskyblue:'00bfff',dimgray:'696969',dodgerblue:'1e90ff',feldspar:'d19275',firebrick:'b22222',floralwhite:'fffaf0',forestgreen:'228b22',fuchsia:'ff00ff',gainsboro:'dcdcdc',ghostwhite:'f8f8ff',gold:'ffd700',goldenrod:'daa520',gray:'808080',green:'008000',greenyellow:'adff2f',honeydew:'f0fff0',hotpink:'ff69b4',indianred:'cd5c5c',indigo:'4b0082',ivory:'fffff0',khaki:'f0e68c',lavender:'e6e6fa',lavenderblush:'fff0f5',lawngreen:'7cfc00',lemonchiffon:'fffacd',lightblue:'add8e6',lightcoral:'f08080',lightcyan:'e0ffff',lightgoldenrodyellow:'fafad2',lightgrey:'d3d3d3',lightgreen:'90ee90',lightpink:'ffb6c1',lightsalmon:'ffa07a',lightseagreen:'20b2aa',lightskyblue:'87cefa',lightslateblue:'8470ff',lightslategray:'778899',lightsteelblue:'b0c4de',lightyellow:'ffffe0',lime:'00ff00',limegreen:'32cd32',linen:'faf0e6',magenta:'ff00ff',maroon:'800000',mediumaquamarine:'66cdaa',mediumblue:'0000cd',mediumorchid:'ba55d3',mediumpurple:'9370d8',mediumseagreen:'3cb371',mediumslateblue:'7b68ee',mediumspringgreen:'00fa9a',mediumturquoise:'48d1cc',mediumvioletred:'c71585',midnightblue:'191970',mintcream:'f5fffa',mistyrose:'ffe4e1',moccasin:'ffe4b5',navajowhite:'ffdead',navy:'000080',oldlace:'fdf5e6',olive:'808000',olivedrab:'6b8e23',orange:'ffa500',orangered:'ff4500',orchid:'da70d6',palegoldenrod:'eee8aa',palegreen:'98fb98',paleturquoise:'afeeee',palevioletred:'d87093',papayawhip:'ffefd5',peachpuff:'ffdab9',peru:'cd853f',pink:'ffc0cb',plum:'dda0dd',powderblue:'b0e0e6',purple:'800080',red:'ff0000',rosybrown:'bc8f8f',royalblue:'4169e1',saddlebrown:'8b4513',salmon:'fa8072',sandybrown:'f4a460',seagreen:'2e8b57',seashell:'fff5ee',sienna:'a0522d',silver:'c0c0c0',skyblue:'87ceeb',slateblue:'6a5acd',slategray:'708090',snow:'fffafa',springgreen:'00ff7f',steelblue:'4682b4',tan:'d2b48c',teal:'008080',thistle:'d8bfd8',tomato:'ff6347',turquoise:'40e0d0',violet:'ee82ee',violetred:'d02090',wheat:'f5deb3',white:'ffffff',whitesmoke:'f5f5f5',yellow:'ffff00',yellowgreen:'9acd32'};for(s in a){if(c==s){h=a[s].toUpperCase()}};if(h!=""){this._processHexChanges(h);this.Color.old=this.Color.hex};var r=/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;if(r.test(c)==true){if(c.length==3){var h=c.charAt(0)+c.charAt(0)+c.charAt(1)+c.charAt(1)+c.charAt(2)+c.charAt(2)}else{h=c};this._processHexChanges(h);this.Color.old=this.Color.hex};if(c.substr(0,4)=='rgba'){c=c.substr(4);c=c.replace("(",'');c=c.replace(")",'');c=c.split(' ').join('');var r=/^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5])),){2}(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5])),){1}(([0]\.[0-9]*)|(\.[0-9]{2})|[1]){1}$/;if(r.test(c)==true){var R=c.split(",");var A=c.substr(c.lastIndexOf(",")+1,(c.length-c.lastIndexOf(",")));this._calculateHEX(parseInt(R[0],10),parseInt(R[1],10),parseInt(R[2],10));this._processHexChanges(this.HexString);this.Color.old=this.Color.hex;this.Color.a=this.Color.a_old=parseFloat(A)}};if(c.substr(0,3)=='rgb'){c=c.substr(3);c=c.replace("(",'');c=c.replace(")",'');c=c.split(' ').join('');var r=/^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5])),){2}(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))){1}$/;if(r.test(c)==true){var R=c.split(",");this._calculateHEX(parseInt(R[0],10),parseInt(R[1],10),parseInt(R[2],10));this._processHexChanges(this.HexString);this.Color.old=this.Color.hex}};if(c.substr(0,3)=='hsv'){c=c.substr(3);c=c.replace("(",'');c=c.replace(")",'');c=c.split(' ').join('');var r=/^(((\d{1,2})|([1,2]\d{2})|(3[0-5]\d)|(360)),){1}(((\d{1,2})|(100)),){1}((\d{1,2})|(100)){1}$/;if(r.test(c)==true){var H=c.split(",");this._calculateRGB(parseInt(H[0],10),parseInt(H[1],10),parseInt(H[2],10));this._calculateHEX(this.RGB.r,this.RGB.g,this.RGB.b);this.Color.r=this.RGB.r;this.Color.g=this.RGB.g;this.Color.b=this.RGB.b;this.Color.h=parseInt(H[0],10);this.Color.s=parseInt(H[1],10);this.Color.v=parseInt(H[2],10);this.Color.hex="#"+this.HexString;this.Color.old=this.Color.hex}}else return false};
sap.ui.commons.ColorPicker.prototype.onAfterRendering=function(){this.$cpBox=this.$("cpBox");this.$cpCur=this.$("cpCur");this.$cpBox.bind("mousedown",jQuery.proxy(this.handleMouseDown,this));this.$("ncBox").css('background-color',this._getRGBString());this.$("ocBox").css('background-color',this._getRGBString());this._updateGradientBoxBackground(this.Color.h);this._updateCursorPosition()};
sap.ui.commons.ColorPicker.prototype.onBeforeRendering=function(){this.$("cpBox").unbind("mousedown",this.handleMouseDown)};
sap.ui.commons.ColorPicker.prototype.getRGB=function(){return{r:this.Color.r,g:this.Color.g,b:this.Color.b}}
