/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.SliderRenderer");sap.m.SliderRenderer={};sap.m.SliderRenderer.CSS_CLASS="sapMSlider";
sap.m.SliderRenderer.render=function(r,s){var v=s.getValue(),n=s.getName(),e=s.getEnabled(),t=s.getTooltip_AsString();if(!s.getVisible()){return}r.write("<div");r.addClass(sap.m.SliderRenderer.CSS_CLASS);if(!e){r.addClass(sap.m.SliderRenderer.CSS_CLASS+"Disabled")}r.addStyle("width",s.getWidth());r.addStyle("visibility","hidden");r.writeClasses();r.writeStyles();r.writeControlData(s);if(t){r.writeAttributeEscaped("title",t)}r.write(">");r.write('<div');r.addClass(sap.m.SliderRenderer.CSS_CLASS+"Inner");if(!e){r.addClass(sap.m.SliderRenderer.CSS_CLASS+"InnerDisabled")}r.writeClasses();r.writeStyles();r.write(">");if(s.getProgress()){r.write('<div class="'+sap.m.SliderRenderer.CSS_CLASS+'Progress" style="width: '+s._sProgressValue+'"></div>')}this._renderHandle(r,s,v,e);r.write("</div>");if(n){this._renderInput(r,s,v,e,n)}r.write("</div>")};
sap.m.SliderRenderer._renderHandle=function(r,s,v,e){r.write("<span");r.addClass(sap.m.SliderRenderer.CSS_CLASS+"Handle");r.addStyle(sap.m.Slider._bRtl?"right":"left",s._sProgressValue);r.writeAccessibilityState(s,{role:"slider",orientation:"horizontal",valuemin:s.getMin(),valuemax:s.getMax(),valuenow:v,valuetext:v,live:"assertive",disabled:!s.getEnabled()});r.writeClasses();r.writeStyles();r.writeAttribute("title",v);if(e){r.writeAttribute("tabindex","0")}r.write("></span>")};
sap.m.SliderRenderer._renderInput=function(r,s,v,e,n){r.write('<input type="text" class="'+sap.m.SliderRenderer.CSS_CLASS+'Input"');if(!e){r.write("disabled")}r.writeAttributeEscaped("name",n);r.writeAttribute("value",v);r.write("/>")};
