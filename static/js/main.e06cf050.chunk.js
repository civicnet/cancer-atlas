(this["webpackJsonpcancer-atlas"]=this["webpackJsonpcancer-atlas"]||[]).push([[0],{160:function(e,a){},224:function(e,a,t){e.exports=t(246)},229:function(e,a,t){},232:function(e,a){},246:function(e,a,t){"use strict";t.r(a);var n,r,i,c,l,o=t(0),s=t.n(o),m=t(51),u=t.n(m),d=(t(229),t(49)),p=t(198),f=t(86),b=t(12),g=t(182),y=t(156),h=t.n(y),E=t(123),v=t(296),j=t(194),x=t(200),O=t(301),w=t(297),k=t(299),S=t(72),C=t.n(S),N=function(){return[C()("#5A1846").rgb(),C()("#900C3F").rgb(),C()("#C70039").rgb(),C()("#E3611C").rgb(),C()("#F1920E").rgb(),C()("#FFC300").rgb()]},z=function(e,a){return new x.a({id:"ScatterplotLayer",data:e,pickable:!0,opacity:.6,stroked:!0,filled:!0,radiusScale:10,radiusMinPixels:5,radiusMaxPixels:20,lineWidthMinPixels:1,getPosition:function(e){return[e.lng,e.lat]},getRadius:12,getFillColor:function(e){return C()(W[e.type]).rgb()},getLineColor:[0,0,0],onHover:function(e){return a.onHover(e.object)},onClick:function(e){return a.onClick(e.object)}})},F=function(e,a){return new O.a({id:"HeatmapLayer",data:e,colorRange:N(),opacity:.75,getPosition:function(e){return[e.lng,e.lat]},radiusPixels:80,intensity:1})},T=function(e,a){return new w.a({id:"ScreenGridLayer",data:e,colorRange:N(),cellSizePixels:15,aggregation:"SUM",coverage:.9,opacity:.7,colorScaleType:"quantile",getPosition:function(e){return[e.lng,e.lat]}})},P=function(e,a){var t=function(e){return{address:e.properties.mf_address,email:e.properties.mf_email,medicName:e.properties.mf_medicName,phone:e.properties.mf_phone,supplierName:e.properties.mf_supplierName,type:l.FamilyMedicine}};return new k.a({id:"GeoJsonLayer",data:e,pickable:!0,extruded:!0,stroked:!0,filled:!0,wireframe:!0,lineWidthMinPixels:1,opacity:.7,getPolygon:function(e){return{type:"FeatureCollection",features:[e]}},getElevation:function(e){return 15},getFillColor:function(e){return C()(W[l.FamilyMedicine]).rgb()},getLineColor:[80,80,80],getLineWidth:1,onHover:function(e){return e.object?a.onHover(t(e.object)):a.onHover(null)},onClick:function(e){return e.object?a.onClick(t(e.object)):a.onClick(null)}})},L={width:window.innerWidth,height:window.innerHeight,longitude:23.5602928,latitude:46.0291793,zoom:6,maxZoom:20,minZoom:1,bearing:0,pitch:0};!function(e){e.FamilyMedicine="family_medicine",e.Laboratory="laboratories",e.HomeCare="home_care",e.Imaging="imaging"}(l||(l={}));var H,M=(n={},Object(d.a)(n,l.FamilyMedicine,"Medici de familie"),Object(d.a)(n,l.HomeCare,"\xcengrijire la domiciliu"),Object(d.a)(n,l.Imaging,"Servicii de imagistic\u0103"),Object(d.a)(n,l.Laboratory,"Laboratoare de analiz\u0103"),n),_=(r={},Object(d.a)(r,l.FamilyMedicine,"mf_buildings_with_attrs_epsg4326"),Object(d.a)(r,l.HomeCare,null),Object(d.a)(r,l.Imaging,null),Object(d.a)(r,l.Laboratory,null),r),I=(i={},Object(d.a)(i,l.FamilyMedicine,"fal fa-user-md"),Object(d.a)(i,l.HomeCare,"fal fa-home-heart"),Object(d.a)(i,l.Imaging,"fal fa-x-ray"),Object(d.a)(i,l.Laboratory,"fal fa-flask"),i),W=(c={},Object(d.a)(c,l.FamilyMedicine,"#1abc9c"),Object(d.a)(c,l.HomeCare,"#3498db"),Object(d.a)(c,l.Imaging,"#9b59b6"),Object(d.a)(c,l.Laboratory,"#e67e22"),c),A=function(e){var a=Object(o.useState)(),t=Object(f.a)(a,2),n=t[0],r=t[1],i=Object(o.useState)(),c=Object(f.a)(i,2),m=c[0],u=c[1],d=Object(o.useState)(L),p=Object(f.a)(d,2),b=p[0],g=p[1];if(Object(o.useEffect)((function(){m||e.layerType===H.Extruded&&function(e,a){var t,n,r=arguments;h.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:t=r.length>2&&void 0!==r[2]?r[2]:"geojson",n=e.map((function(e){var a=e.file;return fetch("https://cdn.jsdelivr.net/gh/civicnet/cancer-atlas-scripts@".concat("0.2.4","/data/").concat(t,"/").concat(a,".").concat(t)).then((function(e){return e.json()})).then((function(e){return e.features.map((function(e){return Object(E.a)({},e,{type:a})}))}))})),Promise.all(n).then((function(e){var t=[].concat.apply([],e);a(t)}));case 3:case"end":return i.stop()}}))}([{file:_[l.FamilyMedicine],type:l.FamilyMedicine}].filter(Boolean),u,"geojson")}),[e.layerType,m]),Object(o.useEffect)((function(){!function(e,a){var t,n,r=arguments;h.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:t=r.length>2&&void 0!==r[2]?r[2]:"json",n=e.map((function(e){return fetch("https://cdn.jsdelivr.net/gh/civicnet/cancer-atlas-scripts@".concat("0.2.4","/data/").concat(t,"/national/").concat(e,".").concat(t)).then((function(e){return e.json()})).then((function(a){return a.map((function(a){return Object(E.a)({},a,{type:e})}))}))})),Promise.all(n).then((function(e){var t=[].concat.apply([],e);a(t)}));case 3:case"end":return i.stop()}}))}(e.services,r)}),[e.services]),Object(o.useEffect)((function(){e.layerType===H.Extruded?g((function(e){return Object(E.a)({},e,{pitch:45})})):g((function(e){return Object(E.a)({},e,{pitch:0})}))}),[e.layerType]),!n)return null;var y=function(e,a){switch(a.layerType){case H.ScatterPlot:return z(e,a);case H.Heatmap:return F(e,a);case H.Grid:return T(e,a);case H.Extruded:return P(e,a);default:return z(e,a)}}(e.layerType!==H.Extruded?n:m,e);return s.a.createElement(v.a,{viewState:b,onViewStateChange:function(e){var a=e.viewState;e.interactionState,e.oldViewState;g(a)},controller:!0,layers:[y]},s.a.createElement(j.a,{key:"static_map",width:"100%",height:"100%",mapStyle:"mapbox://styles/claudiuc/ck4j3z14e09hg1dmkpijn2kma",mapboxApiAccessToken:"pk.eyJ1IjoiY2xhdWRpdWMiLCJhIjoiY2s0aGxpZmlwMGRnNzNsbXc4dmNwajVtdCJ9.6wRAkLu9yKEz8auJGOX5tQ"}))},G=t(284),B=t(288),R=t(291),J=t(289),V=t(292),Z=t(153),D=t(286),$=t(300),q=t(298),X=t(283),Y=t(293),U=t(290),K=t(307),Q=t(285),ee=t(287),ae=t(294),te=t(152),ne=t.n(te),re=t(295),ie=t(306),ce=t(193),le=t.n(ce),oe=t(27),se=t(304),me=function(e){var a=e||"#34495e";return Object(oe.a)({switchBase:{color:a,"&$checked":{color:a},"&$checked + $track":{backgroundColor:a}},checked:{},track:{}})(se.a)},ue=Object(G.a)({card:{width:"100%"},title:{fontSize:14},icon:{width:36,textAlign:"center"}}),de=function(e){var a=ue();if(!e.service)return null;var t=e.service.type===l.FamilyMedicine?s.a.createElement(K.a,null,s.a.createElement(Q.a,null,s.a.createElement(D.a,{className:Object(b.a)(a.icon,"fal fa-clinic-medical")})),s.a.createElement(ee.a,{primary:e.service.supplierName})):s.a.createElement(K.a,null,s.a.createElement(Q.a,null,s.a.createElement(D.a,{className:Object(b.a)(a.icon,"fal fa-bookmark")})),s.a.createElement(ee.a,{primary:e.service.specialty}));return s.a.createElement(B.a,{className:a.card,style:e.style},s.a.createElement(J.a,null,s.a.createElement(Z.a,{className:a.title,color:"textSecondary",gutterBottom:!0},M[e.service.type]),s.a.createElement(U.a,{dense:!0},s.a.createElement(K.a,null,s.a.createElement(Q.a,null,s.a.createElement(D.a,{className:Object(b.a)(a.icon,I[e.service.type])})),s.a.createElement(ee.a,{primary:e.service.type===l.FamilyMedicine?e.service.medicName:e.service.name})),t,s.a.createElement(K.a,null,s.a.createElement(Q.a,null,s.a.createElement(D.a,{className:Object(b.a)(a.icon,"fal fa-map-marker-alt")})),s.a.createElement(ee.a,{primary:e.service.address})),e.service.email&&s.a.createElement(K.a,null,s.a.createElement(Q.a,null,s.a.createElement(D.a,{className:Object(b.a)(a.icon,"fal fa-envelope")})),s.a.createElement(ee.a,{primary:e.service.email})),s.a.createElement(K.a,null,s.a.createElement(Q.a,null,s.a.createElement(D.a,{className:Object(b.a)(a.icon,"fal fa-phone")})),s.a.createElement(ee.a,{primary:e.service.phone})))),s.a.createElement(R.a,null,e.onClose&&s.a.createElement(X.a,{size:"small",color:"primary",onClick:e.onClose,style:{marginLeft:"auto"}},s.a.createElement(D.a,{className:"fal fa-eye-slash",style:{fontSize:16,width:"unset"}}))))},pe=Object(G.a)((function(e){return{aside:{zIndex:10,position:"absolute",top:20,left:20,minWidth:345,maxWidth:345},tooltipContainer:{zIndex:10,position:"absolute",top:20,right:20,minWidth:345,maxWidth:345},filterList:{},gradientText:{background:"linear-gradient(135deg, #009fff 0%, #ec2f4b 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},branding:{fontWeight:900,lineHeight:"32px",textTransform:"uppercase",marginBottom:12},brandingSymbol:{marginRight:12,width:"unset"},card:{width:"100%"},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12},serviceIcon:{width:36,textAlign:"center"},beta:{fontFamily:"Architects Daughter, cursive",fontSize:14,textTransform:"lowercase"},listItemRoot:{paddingLeft:0},popover:{pointerEvents:"none"},paper:{padding:e.spacing(1)},expand:{transform:"rotate(0deg)",marginLeft:"auto !important",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest})},expandOpen:{transform:"rotate(180deg)"}}}));!function(e){e[e.ScatterPlot=0]="ScatterPlot",e[e.Heatmap=1]="Heatmap",e[e.Grid=2]="Grid",e[e.Extruded=3]="Extruded"}(H||(H={}));var fe=function(){var e=pe(),a=s.a.useState([l.FamilyMedicine,l.HomeCare,l.Imaging,l.Laboratory]),t=Object(f.a)(a,2),n=t[0],r=t[1],i=s.a.useState(),c=Object(f.a)(i,2),o=c[0],m=c[1],u=s.a.useState(),y=Object(f.a)(u,2),h=y[0],E=y[1],v=s.a.useState(H.ScatterPlot),j=Object(f.a)(v,2),x=j[0],O=j[1],w=s.a.useState(!1),k=Object(f.a)(w,2),S=k[0],z=k[1];s.a.useEffect((function(){Object(g.loadCSS)("https://pro.fontawesome.com/releases/v5.10.1/css/all.css",document.querySelector("#font-awesome-css"))}),[]);return s.a.createElement("div",null,s.a.createElement("aside",{className:e.aside},s.a.createElement(B.a,{className:e.card},s.a.createElement(J.a,{style:{paddingBottom:0}},s.a.createElement(Z.a,{variant:"h5",component:"h2",className:Object(b.a)(e.branding,e.gradientText)},s.a.createElement(D.a,{className:Object(b.a)(e.brandingSymbol,e.gradientText,"fas fa-lungs")}),"Navigator",s.a.createElement("sup",{className:e.beta},"\u03b1")),s.a.createElement(Z.a,{variant:"body1",component:"p"},"Aplica\u021bia GPS a"," ",s.a.createElement("a",{href:"https://www.csid.ro/health/noutati-sanatate/navigatorul-de-pacienti-specialistul-cu-rol-important-in-relatia-dintre-pacient-si-medic-16034421/",target:"_blank",rel:"noopener noreferrer"},"navigatorilor de pacien\u021bi oncologici")," ","din Rom\xe2nia.")),s.a.createElement(R.a,null,s.a.createElement(ne.a,{variant:"popover",popupId:"demo-popup-popover"},(function(e){return s.a.createElement("div",null,s.a.createElement(V.a,Object.assign({size:"small",color:"primary"},Object(te.bindTrigger)(e)),"Despre proiect",s.a.createElement(D.a,{className:"far fa-question-circle",style:{marginLeft:4,fontSize:13}})),s.a.createElement($.a,Object.assign({},Object(te.bindPopover)(e),{anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"center"}}),s.a.createElement(q.a,{p:2,style:{maxWidth:320}},s.a.createElement(Z.a,{variant:"body1"},"Un proiect"," ",s.a.createElement("a",{href:"https://civicnet.ro",target:"_blank",rel:"noopener noreferrer"},"CivicNet")," ","\u0219i"," ",s.a.createElement("a",{href:"https://www.facebook.com/SanatatepentruComunitate",target:"_blank",rel:"noopener noreferrer"},"Asocia\u021bia S\u0103n\u0103tate pentru Comunitate"),"."),s.a.createElement(Z.a,{variant:"body2",component:"p",style:{marginTop:6}},"Ne propunem s\u0103 dezvolt\u0103m"," ",s.a.createElement("strong",null,"prima aplica\u021bie dedicat\u0103 pacien\u021bilor de cancer pulmonar din Rom\xe2nia"),", navigatorilor acestora, dar \u0219i personalului medical."),s.a.createElement(Z.a,{variant:"body2",component:"p",style:{marginTop:6}},"Aplica\u021bia va con\u021bine informa\u021bii importante despre traseul pacien\u021bilor, de la diagnosticare p\xe2n\u0103 la \xeengrijire paliativ\u0103, \u0219i informa\u021bii sub form\u0103 de"," ",s.a.createElement("a",{href:"https://sanatateabuzoiana.ro/primul-ghid-al-supravietuitorului-de-cancer-localizat-la-nivelul-capului-si-gatului/#.XgDw6sYzZhE",rel:"noopener noreferrer",target:"_blank"},"ghiduri pentru pacien\u021bi.")),s.a.createElement(Z.a,{variant:"body2",component:"p",style:{marginTop:6}},"\xcen momentul de fa\u021b\u0103, aplica\u021bia se afl\u0103 \xeen stadiul de prototip interactiv. Ne pute\u021bi urm\u0103ri pe Facebook pentru a fi la curent cu ultimele nout\u0103\u021bi."))))})),s.a.createElement(X.a,{className:Object(b.a)(e.expand,Object(d.a)({},e.expandOpen,S)),onClick:function(){z(!S)},"aria-expanded":S,"aria-label":"show more"},s.a.createElement(le.a,null))),s.a.createElement(Y.a,{in:S,timeout:"auto",unmountOnExit:!0},s.a.createElement(J.a,null,s.a.createElement(Z.a,{variant:"body2",component:"p",style:{marginTop:6}},"Po\u021bi explora harta prin hover \u0219i click pe punctele afi\u0219ate, \u0219i prin selec\u021bia categoriilor de furnizori medicali pe care dore\u0219ti s\u0103 \xeei afi\u0219ezi. Datele sunt preluate pentru Municipiul Bucure\u0219ti"," ",s.a.createElement("a",{href:"http://www.cnas.ro/",target:"_blank",rel:"noopener noreferrer"},"de pe site-ul CNAS"),"."),s.a.createElement(Z.a,{variant:"body2",component:"p",style:{marginTop:6}},"Adi\u021bional, pentru fiecare furnizor afi\u0219at,"," ",s.a.createElement("a",{href:"https://github.com/civicnet/cancer-atlas-scripts",target:"_blank",rel:"noopener noreferrer"},"am generat coordonatele GPS")," ","pentru afi\u0219area pe hart\u0103."),s.a.createElement(Z.a,{variant:"body2",component:"p",style:{marginTop:6}},"Codul surs\u0103 complet este disponibil pe"," ",s.a.createElement("a",{href:"https://github.com/civicnet/cancer-atlas",target:"_blank",rel:"noopener noreferrer"},"GitHub"),".")))),s.a.createElement(B.a,{className:e.card,style:{marginTop:20,paddingBottom:0}},s.a.createElement(J.a,null,s.a.createElement(U.a,{className:e.filterList},Object.values(l).map((function(a){var t,i=x===H.ScatterPlot?me(W[a]):me();return s.a.createElement(K.a,{key:a,classes:{root:e.listItemRoot}},s.a.createElement(Q.a,null,s.a.createElement(D.a,{className:Object(b.a)(e.serviceIcon,I[a])})),s.a.createElement(ee.a,{id:"switch-list-label-wifi",primary:M[a]}),s.a.createElement(ae.a,null,s.a.createElement(i,{edge:"end",disabled:x===H.Extruded,onChange:(t=a,function(){var e=n.indexOf(t),a=Object(p.a)(n);-1===e?a.push(t):a.splice(e,1),r(a)}),checked:-1!==n.indexOf(a)&&x!==H.Extruded,inputProps:{"aria-labelledby":"switch-list-label-wifi"}})))}))))),s.a.createElement("div",{style:{display:"flex",flex:1,marginTop:20,backgroundColor:"transparent"}},s.a.createElement("div",{style:{flex:1,display:"flex"}},s.a.createElement(ie.a,{value:x,exclusive:!0,onChange:function(e,a){a!==x&&O(a)},size:"small","aria-label":"text alignment"},s.a.createElement(re.a,{value:H.ScatterPlot,"aria-label":"left aligned",title:"Vezi furnizorii de servicii medicale ca puncte pe hart\u0103"},s.a.createElement(D.a,{className:"fad fa-braille"})),s.a.createElement(re.a,{value:H.Heatmap,"aria-label":"centered",title:"Vezi distribu\u021bia furnizorilor de servicii medicale sub form\u0103 de heatmap"},s.a.createElement(D.a,{className:"fad fa-steak",style:{width:"unset"}})),s.a.createElement(re.a,{value:H.Grid,"aria-label":"right aligned",title:"Vezi distribu\u021bia furnizorilor de servicii medicale sub form\u0103 de grid"},s.a.createElement(D.a,{className:"fad fa-th"})),s.a.createElement(re.a,{value:H.Extruded,"aria-label":"justified",title:"Vezi cl\u0103dirile \xeen care au puncte de lucru medicii de familie"},s.a.createElement(D.a,{className:"fad fa-cube"})))),(x===H.Heatmap||x===H.Grid)&&s.a.createElement("div",{style:{flex:1,display:"flex",border:"2px solid #FFF"}},N().map((function(e,a){return s.a.createElement("div",{key:"legend-".concat(e,"-").concat(a),style:{flex:1,backgroundColor:C()(e).hex(),display:"flex",textAlign:"center"}},0===a&&s.a.createElement(D.a,{title:"Zone cu num\u0103r mai mic de furnizori de servicii medicale",className:"fal fa-long-arrow-alt-down",style:{color:"#fff",alignSelf:"center"}}),5===a&&s.a.createElement(D.a,{title:"Zone cu num\u0103r mai mare de furnizori de servicii medicale",className:"fal fa-long-arrow-alt-up",style:{color:"#333",alignSelf:"center"}}))}))))),s.a.createElement("div",{className:e.tooltipContainer},s.a.createElement(de,{service:h,onClose:function(){E(null)}}),s.a.createElement(de,{service:o,style:{marginTop:20}})),s.a.createElement("main",null,s.a.createElement(A,{services:n,onHover:function(e){m(e)},onClick:function(e){E(e)},layerType:x})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(s.a.createElement(fe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[224,1,2]]]);
//# sourceMappingURL=main.e06cf050.chunk.js.map