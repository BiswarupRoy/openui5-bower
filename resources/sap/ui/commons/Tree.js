/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.Tree");jQuery.sap.require("sap.ui.commons.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.commons.Tree",{metadata:{publicMethods:["expandAll","collapseAll"],library:"sap.ui.commons",properties:{"title":{type:"string",group:"Misc",defaultValue:null},"width":{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:'auto'},"height":{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:'auto'},"showHeader":{type:"boolean",group:"Misc",defaultValue:true},"showHeaderIcons":{type:"boolean",group:"Misc",defaultValue:true},"showHorizontalScrollbar":{type:"boolean",group:"Misc",defaultValue:false},"minWidth":{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null}},defaultAggregation:"nodes",aggregations:{"nodes":{type:"sap.ui.commons.TreeNode",multiple:true,singularName:"node",bindable:"bindable"}},events:{"select":{allowPreventDefault:true}}}});sap.ui.commons.Tree.M_EVENTS={'select':'select'};sap.ui.commons.Tree.prototype.resizeListenerId;
sap.ui.commons.Tree.prototype.init=function(){this.bAllCollapsed=false;this.allowTextSelection(false);this.oSelectedNode=null;this.oSelectedContext=null;this.iOldScrollTop=null;var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");this.oCollapseAllButton=new sap.ui.commons.Button(this.getId()+"-CollapseAll",{icon:this.getIconPrefix()+"CollapseAll.png",tooltip:r.getText("TREE_COLLAPSE_ALL"),lite:true});this.oExpandAllButton=new sap.ui.commons.Button(this.getId()+"-ExpandAll",{icon:this.getIconPrefix()+"ExpandAll.png",tooltip:r.getText("TREE_EXPAND_ALL"),lite:true});this.oCollapseAllButton.attachPress(this.onCollapseAll,this);this.oExpandAllButton.attachPress(this.onExpandAll,this);this.oCollapseAllButton.addStyleClass("sapUiTreeCol");this.oExpandAllButton.addStyleClass("sapUiTreeExp")};
sap.ui.commons.Tree.prototype.exit=function(){if(this.oCollapseAllButton){this.oCollapseAllButton.destroy();this.oCollapseAllButton=null}if(this.oExpandAllButton){this.oExpandAllButton.destroy();this.oExpandAllButton=null}};
sap.ui.commons.Tree.prototype.onThemeChanged=function(){this.oCollapseAllButton.setIcon(this.getIconPrefix()+"CollapseAll.png");this.oExpandAllButton.setIcon(this.getIconPrefix()+"ExpandAll.png")};
sap.ui.commons.Tree.prototype.onExpandAll=function(){this.expandAll()};
sap.ui.commons.Tree.prototype.onCollapseAll=function(){this.collapseAll()};
sap.ui.commons.Tree.prototype.expandAll=function(){var n=this.getNodes();for(var i=0;i<n.length;i++){n[i].expand(true)}};
sap.ui.commons.Tree.prototype.collapseAll=function(){var n=this.getNodes();for(var i=0;i<n.length;i++){n[i].collapse(true)}};
sap.ui.commons.Tree.prototype.onsapdown=function(e){this.moveFocus(false);e.preventDefault()};
sap.ui.commons.Tree.prototype.onsapup=function(e){this.moveFocus(true);e.preventDefault()};
sap.ui.commons.Tree.prototype.onsaphome=function(e){this.placeFocus(this.getFirstSibling(e.target));e.preventDefault()};
sap.ui.commons.Tree.prototype.onsaphomemodifiers=function(e){this.placeFocus(this.getFirst());e.preventDefault()};
sap.ui.commons.Tree.prototype.onsapend=function(e){this.placeFocus(this.getLastSibling(e.target));e.preventDefault()};
sap.ui.commons.Tree.prototype.onsapendmodifiers=function(e){this.placeFocus(this.getLast());e.preventDefault()};
sap.ui.commons.Tree.prototype.onsapcollapseall=function(e){if(this.bAllCollapsed){this.expandAll()}else{this.collapseAll()}this.bAllCollapsed=!this.bAllCollapsed};
sap.ui.commons.Tree.prototype.getIconPrefix=function(){var i="themes/"+sap.ui.getCore().getConfiguration().getTheme()+"/";if(!sap.ui.getCore().getConfiguration().getRTL()){i+="img/tree/"}else{i+="img-RTL/tree/"}return sap.ui.resource("sap.ui.commons",i)};
sap.ui.commons.Tree.prototype.getFirstSibling=function(d){var D=jQuery(d).siblings(".sapUiTreeNode:visible").first();if(D.length){return D[0]}return null};
sap.ui.commons.Tree.prototype.getLastSibling=function(d){var D=jQuery(d).siblings(".sapUiTreeNode:visible").last();if(D.length){return D[0]}return null};
sap.ui.commons.Tree.prototype.getFirst=function(){var d=this.$().find(".sapUiTreeNode:visible").first();if(d.length){return d[0]}return null};
sap.ui.commons.Tree.prototype.getLast=function(){var d=this.$().find(".sapUiTreeNode:visible").last();if(d.length){return d[0]}return null};
sap.ui.commons.Tree.prototype.moveFocus=function(m){var a=jQuery(".sapUiTreeNode:focus");if(a.length){var c=sap.ui.getCore().getControl(a[0].id);var d=this.$().find(".sapUiTreeNode:visible");var b=d.index(a[0]);var n=b;if(m){n--}else{n++}if(n>=0&&n<d.length){var D=d.eq(n);var N=sap.ui.getCore().getControl(D[0].id);c.blur();N.focus()}}};
sap.ui.commons.Tree.prototype.adjustFocus=function(){var f=this.$().find('.sapUiTreeNode[tabIndex="0"]');if(!f.is(':visible')){var d=this.$().find(".sapUiTreeNode");var a=d.index(f[0]);var D=d.filter(":lt("+a+")");var b=D.filter(":visible");var n=b[b.length-1];n.setAttribute("tabindex","0");if(jQuery(".sapUiTreeNode:focus").is(":not(:visible)")){n.focus()}}};
sap.ui.commons.Tree.prototype.placeFocus=function(d){if(!d){return}var D=this.$().find(".sapUiTreeNode[tabIndex='0']");if(D.length){D[0].setAttribute("tabindex","-1")}d.setAttribute("tabindex","0");var t=sap.ui.getCore().getControl(d.id);t.focus()};
sap.ui.commons.Tree.prototype.adjustSelectionOnExpanding=function(e){var t=this.$(),E=jQuery(e),d,D;if(E.hasClass("sapUiTreeNodeSelectedParent")){E.removeClass("sapUiTreeNodeSelectedParent")}var $=t.find(".sapUiTreeNodeSelected:visible");if($.length){t.find(".sapUiTreeNodeSelectedParent").removeClass("sapUiTreeNodeSelectedParent")}else{d=t.find(".sapUiTreeNodeSelected");D=d.parent(".sapUiTreeChildrenNodes").prev(".sapUiTreeNode");while(D.length&&!D.is(":visible")){D=D.parent(".sapUiTreeChildrenNodes").prev(".sapUiTreeNode")}D.addClass("sapUiTreeNodeSelectedParent")}};
sap.ui.commons.Tree.prototype.adjustSelectionOnCollapsing=function(d){var D=jQuery(d),c="#"+D.attr("id")+"-children",$=D.siblings(c).find(".sapUiTreeNodeSelected"),a=D.siblings(c).find(".sapUiTreeNodeSelectedParent");if($.length||a.length){D.addClass("sapUiTreeNodeSelectedParent");if(a.length){a.removeClass("sapUiTreeNodeSelectedParent")}}};
sap.ui.commons.Tree.prototype.isTreeBinding=function(n){return(n=="nodes")};
sap.ui.commons.Tree.prototype.updateNodes=function(){var c=this.oSelectedContext,n;this.oSelectedNode=null;this.oSelectedContext=null;this.updateAggregation("nodes");if(c){n=this.getNodeByContext(c);this.setSelection(n,true)}};
sap.ui.commons.Tree.prototype.getNodeByContext=function(c){return this.findNode(this,function(n){return n.getBindingContext()==c})};
sap.ui.commons.Tree.prototype.findNode=function(n,m){var f,t=this;if(m(n)){return n}jQuery.each(n.getNodes(),function(i,n){f=t.findNode(n,m);if(f)return false});return f};
sap.ui.commons.Tree.prototype.getSelection=function(){return this.oSelectedNode};
sap.ui.commons.Tree.prototype.setSelection=function(n,s){var d=true;if(!s){d=this.fireSelect({node:n,nodeContext:n&&n.getBindingContext()})}if(d){if(this.oSelectedNode){this.oSelectedNode.deselect()}if(n){n.select(s)}this.oSelectedNode=n;this.oSelectedContext=n&&n.getBindingContext()}};
sap.ui.commons.Tree.prototype.onAfterRendering=function(){if(this.iOldScrollTop){this.$("TreeCont").scrollTop(this.iOldScrollTop)}};
sap.ui.commons.Tree.prototype.onBeforeRendering=function(){this.iOldScrollTop=this.$("TreeCont").scrollTop()};
