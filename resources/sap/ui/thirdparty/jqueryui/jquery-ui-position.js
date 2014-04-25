/*!
 * jQuery UI Position 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
(function($,u){$.ui=$.ui||{};var c,m=Math.max,a=Math.abs,r=Math.round,b=/left|center|right/,d=/top|center|bottom/,e=/[\+\-]\d+(\.[\d]+)?%?/,f=/^\w+/,g=/%$/,_=$.fn.position;function h(o,w,i){return[parseFloat(o[0])*(g.test(o[0])?w/100:1),parseFloat(o[1])*(g.test(o[1])?i/100:1)]}function p(i,k){return parseInt($.css(i,k),10)||0}function j(i){var k=i[0];if(k.nodeType===9){return{width:i.width(),height:i.height(),offset:{top:0,left:0}}}if($.isWindow(k)){return{width:i.width(),height:i.height(),offset:{top:i.scrollTop(),left:i.scrollLeft()}}}if(k.preventDefault){return{width:0,height:0,offset:{top:k.pageY,left:k.pageX}}}return{width:i.outerWidth(),height:i.outerHeight(),offset:i.offset()}}$.position={scrollbarWidth:function(){if(c!==u){return c}var w,i,k=$("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),l=k.children()[0];$("body").append(k);w=l.offsetWidth;k.css("overflow","scroll");i=l.offsetWidth;if(w===i){i=k[0].clientWidth}k.remove();return(c=w-i)},getScrollInfo:function(w){var o=w.isWindow||w.isDocument?"":w.element.css("overflow-x"),i=w.isWindow||w.isDocument?"":w.element.css("overflow-y"),k=o==="scroll"||(o==="auto"&&w.width<w.element[0].scrollWidth),l=i==="scroll"||(i==="auto"&&w.height<w.element[0].scrollHeight);return{width:l?$.position.scrollbarWidth():0,height:k?$.position.scrollbarWidth():0}},getWithinInfo:function(i){var w=$(i||window),k=$.isWindow(w[0]),l=!!w[0]&&w[0].nodeType===9;return{element:w,isWindow:k,isDocument:l,offset:w.offset()||{left:0,top:0},scrollLeft:w.scrollLeft(),scrollTop:w.scrollTop(),width:k?w.width():w.outerWidth(),height:k?w.height():w.outerHeight()}}};$.fn.position=function(o){if(!o||!o.of){return _.apply(this,arguments)}o=$.extend({},o);var k,t,l,n,q,s,v=$(o.of),w=$.position.getWithinInfo(o.within),x=$.position.getScrollInfo(w),y=(o.collision||"flip").split(" "),z={};s=j(v);if(v[0].preventDefault){o.at="left top"}t=s.width;l=s.height;n=s.offset;q=$.extend({},n);$.each(["my","at"],function(){var i=(o[this]||"").split(" "),A,B;if(i.length===1){i=b.test(i[0])?i.concat(["center"]):d.test(i[0])?["center"].concat(i):["center","center"]}i[0]=b.test(i[0])?i[0]:"center";i[1]=d.test(i[1])?i[1]:"center";A=e.exec(i[0]);B=e.exec(i[1]);z[this]=[A?A[0]:0,B?B[0]:0];o[this]=[f.exec(i[0])[0],f.exec(i[1])[0]]});if(y.length===1){y[1]=y[0]}if(o.at[0]==="right"){q.left+=t}else if(o.at[0]==="center"){q.left+=t/2}if(o.at[1]==="bottom"){q.top+=l}else if(o.at[1]==="center"){q.top+=l/2}k=h(z.at,t,l);q.left+=k[0];q.top+=k[1];return this.each(function(){var A,B,C=$(this),D=C.outerWidth(),E=C.outerHeight(),F=p(this,"marginLeft"),G=p(this,"marginTop"),H=D+F+p(this,"marginRight")+x.width,I=E+G+p(this,"marginBottom")+x.height,J=$.extend({},q),K=h(z.my,C.outerWidth(),C.outerHeight());if(o.my[0]==="right"){J.left-=D}else if(o.my[0]==="center"){J.left-=D/2}if(o.my[1]==="bottom"){J.top-=E}else if(o.my[1]==="center"){J.top-=E/2}J.left+=K[0];J.top+=K[1];if(!$.support.offsetFractions){J.left=r(J.left);J.top=r(J.top)}A={marginLeft:F,marginTop:G};$.each(["left","top"],function(i,L){if($.ui.position[y[i]]){$.ui.position[y[i]][L](J,{targetWidth:t,targetHeight:l,elemWidth:D,elemHeight:E,collisionPosition:A,collisionWidth:H,collisionHeight:I,offset:[k[0]+K[0],k[1]+K[1]],my:o.my,at:o.at,within:w,elem:C})}});if(o.using){B=function(i){var L=n.left-J.left,M=L+t-D,N=n.top-J.top,O=N+l-E,P={target:{element:v,left:n.left,top:n.top,width:t,height:l},element:{element:C,left:J.left,top:J.top,width:D,height:E},horizontal:M<0?"left":L>0?"right":"center",vertical:O<0?"top":N>0?"bottom":"middle"};if(t<D&&a(L+M)<t){P.horizontal="center"}if(l<E&&a(N+O)<l){P.vertical="middle"}if(m(a(L),a(M))>m(a(N),a(O))){P.important="horizontal"}else{P.important="vertical"}o.using.call(this,i,P)}}C.offset($.extend(J,{using:B}))})};$.ui.position={fit:{left:function(i,k){var w=k.within,l=w.isWindow?w.scrollLeft:w.offset.left,o=w.width,n=i.left-k.collisionPosition.marginLeft,q=l-n,s=n+k.collisionWidth-o-l,t;if(k.collisionWidth>o){if(q>0&&s<=0){t=i.left+q+k.collisionWidth-o-l;i.left+=q-t}else if(s>0&&q<=0){i.left=l}else{if(q>s){i.left=l+o-k.collisionWidth}else{i.left=l}}}else if(q>0){i.left+=q}else if(s>0){i.left-=s}else{i.left=m(i.left-n,i.left)}},top:function(i,k){var w=k.within,l=w.isWindow?w.scrollTop:w.offset.top,o=k.within.height,n=i.top-k.collisionPosition.marginTop,q=l-n,s=n+k.collisionHeight-o-l,t;if(k.collisionHeight>o){if(q>0&&s<=0){t=i.top+q+k.collisionHeight-o-l;i.top+=q-t}else if(s>0&&q<=0){i.top=l}else{if(q>s){i.top=l+o-k.collisionHeight}else{i.top=l}}}else if(q>0){i.top+=q}else if(s>0){i.top-=s}else{i.top=m(i.top-n,i.top)}}},flip:{left:function(i,k){var w=k.within,l=w.offset.left+w.scrollLeft,o=w.width,n=w.isWindow?w.scrollLeft:w.offset.left,q=i.left-k.collisionPosition.marginLeft,s=q-n,t=q+k.collisionWidth-o-n,v=k.my[0]==="left"?-k.elemWidth:k.my[0]==="right"?k.elemWidth:0,x=k.at[0]==="left"?k.targetWidth:k.at[0]==="right"?-k.targetWidth:0,y=-2*k.offset[0],z,A;if(s<0){z=i.left+v+x+y+k.collisionWidth-o-l;if(z<0||z<a(s)){i.left+=v+x+y}}else if(t>0){A=i.left-k.collisionPosition.marginLeft+v+x+y-n;if(A>0||a(A)<t){i.left+=v+x+y}}},top:function(i,k){var w=k.within,l=w.offset.top+w.scrollTop,o=w.height,n=w.isWindow?w.scrollTop:w.offset.top,q=i.top-k.collisionPosition.marginTop,s=q-n,t=q+k.collisionHeight-o-n,v=k.my[1]==="top",x=v?-k.elemHeight:k.my[1]==="bottom"?k.elemHeight:0,y=k.at[1]==="top"?k.targetHeight:k.at[1]==="bottom"?-k.targetHeight:0,z=-2*k.offset[1],A,B;if(s<0){B=i.top+x+y+z+k.collisionHeight-o-l;if((i.top+x+y+z)>s&&(B<0||B<a(s))){i.top+=x+y+z}}else if(t>0){A=i.top-k.collisionPosition.marginTop+x+y+z-n;if((i.top+x+y+z)>t&&(A>0||a(A)<t)){i.top+=x+y+z}}}},flipfit:{left:function(){$.ui.position.flip.left.apply(this,arguments);$.ui.position.fit.left.apply(this,arguments)},top:function(){$.ui.position.flip.top.apply(this,arguments);$.ui.position.fit.top.apply(this,arguments)}}};(function(){var t,k,l,o,i,n=document.getElementsByTagName("body")[0],q=document.createElement("div");t=document.createElement(n?"div":"body");l={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"};if(n){$.extend(l,{position:"absolute",left:"-1000px",top:"-1000px"})}for(i in l){t.style[i]=l[i]}t.appendChild(q);k=n||document.documentElement;k.insertBefore(t,k.firstChild);q.style.cssText="position: absolute; left: 10.7432222px;";o=$(q).offset().left;$.support.offsetFractions=o>10&&o<11;t.innerHTML="";k.removeChild(t)})()}(jQuery));
