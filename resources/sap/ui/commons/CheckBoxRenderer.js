/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.CheckBoxRenderer");jQuery.sap.require("sap.ui.core.ValueStateSupport");sap.ui.commons.CheckBoxRenderer={};
sap.ui.commons.CheckBoxRenderer.render=function(r,c){if(!c.getVisible()){return}r.addClass("sapUiCb");r.write("<span");r.writeControlData(c);r.writeAccessibilityState(c,{"role":sap.ui.core.AccessibleRole.Checkbox.toLowerCase()});var e=c.getEnabled()!=null&&c.getEnabled();var a=c.getEditable()!=null&&c.getEditable();var i=false;var b=false;if(c.getValueState()!=null){i=sap.ui.core.ValueState.Error==c.getValueState();b=sap.ui.core.ValueState.Warning==c.getValueState()}if(c.getChecked()){r.addClass("sapUiCbChk")}var m=0;var R=false;if(!a){R=true;r.addClass("sapUiCbRo");m=0}if(!e){R=true;r.addClass("sapUiCbDis");m=-1}if(i){r.addClass("sapUiCbErr");r.writeAttribute("aria-invalid","true")}else if(b){r.addClass("sapUiCbWarn")}if(e&&a&&!i&&!b){r.addClass("sapUiCbStd")}if(e&&a){r.addClass("sapUiCbInteractive")}r.writeClasses();if(c.getWidth()&&c.getWidth()!=''){r.writeAttribute("style","width:"+c.getWidth()+";")}r.writeAttribute("tabIndex",m);r.write(">");r.write("<input type='CheckBox' tabindex='-1' id='");r.write(c.getId());r.write("-CB'");if(c.getName()){r.writeAttributeEscaped('name',c.getName())}if(c.getChecked()){r.write(" checked='checked'")}if(!e){r.write(" disabled='disabled'")}var t=sap.ui.core.ValueStateSupport.enrichTooltip(c,c.getTooltip_AsString());if(t){r.writeAttributeEscaped("title",t)}if(R){r.write(" readOnly='readOnly'")}r.write(" />");r.write("<label");if(t){r.writeAttributeEscaped("title",t)}r.writeAttribute("for",c.getId()+"-CB");if(!c.getText()){r.write(" class='sapUiCbNoText'")}r.write(">");if(c.getText()){this.renderText(r,c.getText(),c.getTextDirection())}r.write("</label>");r.write("</span>")};
sap.ui.commons.CheckBoxRenderer.renderText=function(r,t,e){var a=r;if(!e||e==sap.ui.core.TextDirection.Inherit){a.writeEscaped(t)}else{a.write("<span style=\"direction:"+e.toLowerCase()+";\">");a.writeEscaped(t);a.write("</span>")}};
