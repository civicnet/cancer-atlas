(this["webpackJsonpcancer-atlas"]=this["webpackJsonpcancer-atlas"]||[]).push([[0],{156:function(e,a){},220:function(e,a,t){e.exports=t(240)},225:function(e,a,t){},228:function(e,a){},240:function(e,a,t){"use strict";t.r(a);var n,r,i,l,c,o=t(0),s=t.n(o),m=t(50),u=t.n(m),d=(t(225),t(193)),p=t(90),f=t(12),g=t(178),b=t(152),h=t.n(b),v=t(122),y=t(52),E=t(286),j=t(189),w=t(195),x=t(291),O=t(287),k=t(290),S=t(72),C=t.n(S),z=function(){return[C()("#5A1846").rgb(),C()("#900C3F").rgb(),C()("#C70039").rgb(),C()("#E3611C").rgb(),C()("#F1920E").rgb(),C()("#FFC300").rgb()]},N=function(e,a){return new w.a({id:"ScatterplotLayer",data:e,pickable:!0,opacity:.6,stroked:!0,filled:!0,radiusScale:10,radiusMinPixels:5,radiusMaxPixels:20,lineWidthMinPixels:1,getPosition:function(e){return[e.lng,e.lat]},getRadius:12,getFillColor:function(e){return C()(W[e.type]).rgb()},getLineColor:[0,0,0],onHover:function(e){return a.onHover(e.object)},onClick:function(e){return a.onClick(e.object)}})},_=function(e,a){return new x.a({id:"HeatmapLayer",data:e,colorRange:z(),opacity:.75,getPosition:function(e){return[e.lng,e.lat]},radiusPixels:80})},F=function(e,a){return new O.a({id:"ScreenGridLayer",data:e,cellSize:500,colorRange:z(),cellSizePixels:40,colorAggregation:"count",sizeAggregation:"count",coverage:.75,opacity:.5,colorScaleType:"quantile",getPosition:function(e){return[e.lng,e.lat]}})},T=function(e,a){var t=function(e){return{address:e.properties.mf_address,email:e.properties.mf_email,medicName:e.properties.mf_medicName,phone:e.properties.mf_phone,supplierName:e.properties.mf_supplierName,type:c.FamilyMedicine}};return new k.a({id:"GeoJsonLayer",data:e,pickable:!0,extruded:!0,stroked:!0,filled:!0,wireframe:!0,lineWidthMinPixels:1,opacity:.7,getPolygon:function(e){return{type:"FeatureCollection",features:[e]}},getElevation:function(e){return 15},getFillColor:function(e){return C()(W[c.FamilyMedicine]).rgb()},getLineColor:[80,80,80],getLineWidth:1,onHover:function(e){return e.object?a.onHover(t(e.object)):a.onHover(null)},onClick:function(e){return e.object?a.onClick(t(e.object)):a.onClick(null)}})},P={width:window.innerWidth,height:window.innerHeight,longitude:26.1,latitude:44.4368449,zoom:11,maxZoom:20,minZoom:1,bearing:0,pitch:0};!function(e){e.FamilyMedicine="mf_bucuresti_with_loc_min_flat",e.Laboratory="laboratoare_bucuresti_with_loc_min_flat",e.HomeCare="ingrijiri_domiciliu_bucuresti_with_loc_min_flat",e.Imaging="imagistica_bucuresti_with_loc_min_flat"}(c||(c={}));var L,H=(n={},Object(y.a)(n,c.FamilyMedicine,"Medici de familie"),Object(y.a)(n,c.HomeCare,"\xcengrijire la domiciliu"),Object(y.a)(n,c.Imaging,"Servicii de imagistic\u0103"),Object(y.a)(n,c.Laboratory,"Laboratoare de analiz\u0103"),n),M=(r={},Object(y.a)(r,c.FamilyMedicine,"mf_buildings_with_attrs_epsg4326"),Object(y.a)(r,c.HomeCare,null),Object(y.a)(r,c.Imaging,null),Object(y.a)(r,c.Laboratory,null),r),I=(i={},Object(y.a)(i,c.FamilyMedicine,"fal fa-user-md"),Object(y.a)(i,c.HomeCare,"fal fa-home-heart"),Object(y.a)(i,c.Imaging,"fal fa-lungs"),Object(y.a)(i,c.Laboratory,"fal fa-flask"),i),W=(l={},Object(y.a)(l,c.FamilyMedicine,"#1abc9c"),Object(y.a)(l,c.HomeCare,"#3498db"),Object(y.a)(l,c.Imaging,"#9b59b6"),Object(y.a)(l,c.Laboratory,"#e67e22"),l),A=function(e){var a=Object(o.useState)(),t=Object(p.a)(a,2),n=t[0],r=t[1],i=Object(o.useState)(),l=Object(p.a)(i,2),m=l[0],u=l[1],d=Object(o.useState)(P),f=Object(p.a)(d,2),g=f[0],b=f[1];if(Object(o.useEffect)((function(){m||e.layerType===L.Extruded&&function(e,a){var t,n,r=arguments;h.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:t=r.length>2&&void 0!==r[2]?r[2]:"geojson",n=e.map((function(e){var a=e.file;return fetch("https://cdn.jsdelivr.net/gh/civicnet/cancer-atlas-scripts@0.1.1/data/".concat(t,"/").concat(a,".").concat(t)).then((function(e){return e.json()})).then((function(e){return e.features.map((function(e){return Object(v.a)({},e,{type:a})}))}))})),Promise.all(n).then((function(e){var t=[].concat.apply([],e);a(t)}));case 3:case"end":return i.stop()}}))}([{file:M[c.FamilyMedicine],type:c.FamilyMedicine}].filter(Boolean),u,"geojson")}),[e.layerType,m]),Object(o.useEffect)((function(){!function(e,a){var t,n,r=arguments;h.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:t=r.length>2&&void 0!==r[2]?r[2]:"json",n=e.map((function(e){return fetch("https://cdn.jsdelivr.net/gh/civicnet/cancer-atlas-scripts@0.1.1/data/".concat(t,"/").concat(e,".").concat(t)).then((function(e){return e.json()})).then((function(a){return a.map((function(a){return Object(v.a)({},a,{type:e})}))}))})),Promise.all(n).then((function(e){var t=[].concat.apply([],e);a(t)}));case 3:case"end":return i.stop()}}))}(e.services,r)}),[e.services]),Object(o.useEffect)((function(){e.layerType===L.Extruded?b((function(e){return Object(v.a)({},e,{zoom:15.5,pitch:45})})):b((function(e){return Object(v.a)({},e,{zoom:11,pitch:0})}))}),[e.layerType]),!n)return null;var y=function(e,a){switch(a.layerType){case L.ScatterPlot:return N(e,a);case L.Heatmap:return _(e,a);case L.Grid:return F(e,a);case L.Extruded:return T(e,a);default:return N(e,a)}}(e.layerType!==L.Extruded?n:m,e);return s.a.createElement(E.a,{viewState:g,onViewStateChange:function(e){var a=e.viewState;e.interactionState,e.oldViewState;b(a)},controller:!0,layers:[y]},s.a.createElement(j.a,{width:"100%",height:"100%",mapStyle:"mapbox://styles/claudiuc/ck4j3z14e09hg1dmkpijn2kma",mapboxApiAccessToken:"pk.eyJ1IjoiY2xhdWRpdWMiLCJhIjoiY2s0aGxpZmlwMGRnNzNsbXc4dmNwajVtdCJ9.6wRAkLu9yKEz8auJGOX5tQ"}))},G=t(275),R=t(279),B=t(282),J=t(280),V=t(283),Z=t(149),D=t(277),$=t(289),q=t(288),X=t(281),Y=t(297),K=t(276),Q=t(278),U=t(284),ee=t(148),ae=t.n(ee),te=t(285),ne=t(296),re=t(28),ie=t(294),le=function(e){var a=e||"#34495e";return Object(re.a)({switchBase:{color:a,"&$checked":{color:a},"&$checked + $track":{backgroundColor:a}},checked:{},track:{}})(ie.a)},ce=t(274),oe=Object(G.a)({card:{width:"100%"},title:{fontSize:14},icon:{width:36,textAlign:"center"}}),se=function(e){var a=oe();if(!e.service)return null;var t=e.service.type===c.FamilyMedicine?s.a.createElement(Y.a,null,s.a.createElement(K.a,null,s.a.createElement(D.a,{className:Object(f.a)(a.icon,"fal fa-clinic-medical")})),s.a.createElement(Q.a,{primary:e.service.supplierName})):s.a.createElement(Y.a,null,s.a.createElement(K.a,null,s.a.createElement(D.a,{className:Object(f.a)(a.icon,"fal fa-bookmark")})),s.a.createElement(Q.a,{primary:e.service.specialty}));return s.a.createElement(R.a,{className:a.card,style:e.style},s.a.createElement(J.a,null,s.a.createElement(Z.a,{className:a.title,color:"textSecondary",gutterBottom:!0},H[e.service.type]),s.a.createElement(X.a,{dense:!0},s.a.createElement(Y.a,null,s.a.createElement(K.a,null,s.a.createElement(D.a,{className:Object(f.a)(a.icon,I[e.service.type])})),s.a.createElement(Q.a,{primary:e.service.type===c.FamilyMedicine?e.service.medicName:e.service.name})),t,s.a.createElement(Y.a,null,s.a.createElement(K.a,null,s.a.createElement(D.a,{className:Object(f.a)(a.icon,"fal fa-map-marker-alt")})),s.a.createElement(Q.a,{primary:e.service.address})),e.service.email&&s.a.createElement(Y.a,null,s.a.createElement(K.a,null,s.a.createElement(D.a,{className:Object(f.a)(a.icon,"fal fa-envelope")})),s.a.createElement(Q.a,{primary:e.service.email})),s.a.createElement(Y.a,null,s.a.createElement(K.a,null,s.a.createElement(D.a,{className:Object(f.a)(a.icon,"fal fa-phone")})),s.a.createElement(Q.a,{primary:e.service.phone})))),s.a.createElement(B.a,null,e.onClose&&s.a.createElement(ce.a,{size:"small",color:"primary",onClick:e.onClose,style:{marginLeft:"auto"}},s.a.createElement(D.a,{className:"fal fa-eye-slash",style:{fontSize:16,width:"unset"}}))))},me=Object(G.a)((function(e){return{aside:{zIndex:10,position:"absolute",top:20,left:20,minWidth:345,maxWidth:345},tooltipContainer:{zIndex:10,position:"absolute",top:20,right:20,minWidth:345,maxWidth:345},filterList:{},gradientText:{background:"linear-gradient(135deg, #009fff 0%, #ec2f4b 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},branding:{fontWeight:900,lineHeight:"32px",textTransform:"uppercase",marginBottom:12},brandingSymbol:{marginRight:12,width:"unset"},card:{width:"100%"},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12},serviceIcon:{width:36,textAlign:"center"},beta:{fontFamily:"Architects Daughter, cursive",fontSize:14,textTransform:"lowercase"},listItemRoot:{paddingLeft:0},popover:{pointerEvents:"none"},paper:{padding:e.spacing(1)}}}));!function(e){e[e.ScatterPlot=0]="ScatterPlot",e[e.Heatmap=1]="Heatmap",e[e.Grid=2]="Grid",e[e.Extruded=3]="Extruded"}(L||(L={}));var ue=function(){var e=me(),a=s.a.useState([c.FamilyMedicine,c.HomeCare,c.Imaging,c.Laboratory]),t=Object(p.a)(a,2),n=t[0],r=t[1],i=s.a.useState(),l=Object(p.a)(i,2),o=l[0],m=l[1],u=s.a.useState(),b=Object(p.a)(u,2),h=b[0],v=b[1],y=s.a.useState(L.ScatterPlot),E=Object(p.a)(y,2),j=E[0],w=E[1];s.a.useEffect((function(){Object(g.loadCSS)("https://pro.fontawesome.com/releases/v5.10.1/css/all.css",document.querySelector("#font-awesome-css"))}),[]);return s.a.createElement("div",null,s.a.createElement("aside",{className:e.aside},s.a.createElement(R.a,{className:e.card},s.a.createElement(J.a,null,s.a.createElement(Z.a,{variant:"h5",component:"h2",className:Object(f.a)(e.branding,e.gradientText)},s.a.createElement(D.a,{className:Object(f.a)(e.brandingSymbol,e.gradientText,"fas fa-lungs")}),"Navigator",s.a.createElement("sup",{className:e.beta},"\u03b1")),s.a.createElement(Z.a,{variant:"body1",component:"p"},"Aplica\u021bia GPS a"," ",s.a.createElement("a",{href:"https://www.csid.ro/health/noutati-sanatate/navigatorul-de-pacienti-specialistul-cu-rol-important-in-relatia-dintre-pacient-si-medic-16034421/",target:"_blank",rel:"noopener noreferrer"},"navigatorilor de pacien\u021bi oncologici")," ","din Rom\xe2nia."),s.a.createElement(Z.a,{variant:"body2",component:"p",style:{marginTop:6}},"Po\u021bi explora harta prin hover \u0219i click pe punctele afi\u0219ate, \u0219i prin selec\u021bia categoriilor de furnizori medicali pe care dore\u0219ti s\u0103 \xeei afi\u0219ezi. Datele sunt preluate pentru Municipiul Bucure\u0219ti"," ",s.a.createElement("a",{href:"http://www.cnas.ro/",target:"_blank",rel:"noopener noreferrer"},"de pe site-ul CNAS"),"."),s.a.createElement(Z.a,{variant:"body2",component:"p",style:{marginTop:6}},"Adi\u021bional, pentru fiecare furnizor afi\u0219at,"," ",s.a.createElement("a",{href:"https://github.com/civicnet/cancer-atlas-scripts",target:"_blank",rel:"noopener noreferrer"},"am generat coordonatele GPS")," ","pentru afi\u0219area pe hart\u0103.")),s.a.createElement(B.a,null,s.a.createElement(V.a,{size:"small",href:"https://github.com/civicnet/cancer-atlas"},"Cod surs\u0103"),s.a.createElement(ae.a,{variant:"popover",popupId:"demo-popup-popover"},(function(e){return s.a.createElement("div",null,s.a.createElement(V.a,Object.assign({size:"small",color:"primary"},Object(ee.bindTrigger)(e)),"Despre proiect",s.a.createElement(D.a,{className:"far fa-question-circle",style:{marginLeft:4,fontSize:13}})),s.a.createElement($.a,Object.assign({},Object(ee.bindPopover)(e),{anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"center"}}),s.a.createElement(q.a,{p:2,style:{maxWidth:320}},s.a.createElement(Z.a,{variant:"body1"},"Un proiect"," ",s.a.createElement("a",{href:"https://civicnet.ro",target:"_blank",rel:"noopener noreferrer"},"CivicNet")," ","\u0219i"," ",s.a.createElement("a",{href:"https://www.facebook.com/SanatatepentruComunitate",target:"_blank",rel:"noopener noreferrer"},"Asocia\u021bia S\u0103n\u0103tate pentru Comunitate"),"."),s.a.createElement(Z.a,{variant:"body2",component:"p",style:{marginTop:6}},"Ne propunem s\u0103 dezvolt\u0103m"," ",s.a.createElement("strong",null,"prima aplica\u021bie dedicat\u0103 pacien\u021bilor de cancer pulmonar din Rom\xe2nia"),", navigatorilor acestora, dar \u0219i personalului medical."),s.a.createElement(Z.a,{variant:"body2",component:"p",style:{marginTop:6}},"Aplica\u021bia va con\u021bine informa\u021bii importante despre traseul pacien\u021bilor, de la diagnosticare p\xe2n\u0103 la \xeengrijire paliativ\u0103, \u0219i informa\u021bii sub form\u0103 de"," ",s.a.createElement("a",{href:"https://sanatateabuzoiana.ro/primul-ghid-al-supravietuitorului-de-cancer-localizat-la-nivelul-capului-si-gatului/#.XgDw6sYzZhE",rel:"noopener noreferrer",target:"_blank"},"ghiduri pentru pacien\u021bi.")),s.a.createElement(Z.a,{variant:"body2",component:"p",style:{marginTop:6}},"\xcen momentul de fa\u021b\u0103, aplica\u021bia se afl\u0103 \xeen stadiul de prototip interactiv. Ne pute\u021bi urm\u0103ri pe Facebook pentru a fi la curent cu ultimele nout\u0103\u021bi."))))})))),s.a.createElement(R.a,{className:e.card,style:{marginTop:20,paddingBottom:0}},s.a.createElement(J.a,null,s.a.createElement(X.a,{className:e.filterList},Object.values(c).map((function(a){var t,i=j===L.ScatterPlot?le(W[a]):le();return s.a.createElement(Y.a,{key:a,classes:{root:e.listItemRoot}},s.a.createElement(K.a,null,s.a.createElement(D.a,{className:Object(f.a)(e.serviceIcon,I[a])})),s.a.createElement(Q.a,{id:"switch-list-label-wifi",primary:H[a]}),s.a.createElement(U.a,null,s.a.createElement(i,{edge:"end",disabled:j===L.Extruded,onChange:(t=a,function(){var e=n.indexOf(t),a=Object(d.a)(n);-1===e?a.push(t):a.splice(e,1),r(a)}),checked:-1!==n.indexOf(a)&&j!==L.Extruded,inputProps:{"aria-labelledby":"switch-list-label-wifi"}})))}))))),s.a.createElement("div",{style:{display:"flex",flex:1,marginTop:20,backgroundColor:"transparent"}},s.a.createElement("div",{style:{flex:1,display:"flex"}},s.a.createElement(ne.a,{value:j,exclusive:!0,onChange:function(e,a){a!==j&&w(a)},size:"small","aria-label":"text alignment"},s.a.createElement(te.a,{value:L.ScatterPlot,"aria-label":"left aligned",title:"Vezi furnizorii de servicii medicale ca puncte pe hart\u0103"},s.a.createElement(D.a,{className:"far fa-braille"})),s.a.createElement(te.a,{value:L.Heatmap,"aria-label":"centered",title:"Vezi distribu\u021bia furnizorilor de servicii medicale sub form\u0103 de heatmap"},s.a.createElement(D.a,{className:"fal fa-flame"})),s.a.createElement(te.a,{value:L.Grid,"aria-label":"right aligned",title:"Vezi distribu\u021bia furnizorilor de servicii medicale sub form\u0103 de grid"},s.a.createElement(D.a,{className:"fal fa-th"})),s.a.createElement(te.a,{value:L.Extruded,"aria-label":"justified",title:"Vezi cl\u0103dirile \xeen care au puncte de lucru medicii de familie"},s.a.createElement(D.a,{className:"fal fa-cube"})))),(j===L.Heatmap||j===L.Grid)&&s.a.createElement("div",{style:{flex:1,display:"flex",border:"2px solid #FFF"}},z().map((function(e,a){return s.a.createElement("div",{style:{flex:1,backgroundColor:C()(e).hex(),display:"flex",textAlign:"center"}},0===a&&s.a.createElement(D.a,{title:"Zone cu num\u0103r mai mic de furnizori de servicii medicale",className:"fal fa-long-arrow-alt-down",style:{color:"#fff",alignSelf:"center"}}),5===a&&s.a.createElement(D.a,{title:"Zone cu num\u0103r mai mare de furnizori de servicii medicale",className:"fal fa-long-arrow-alt-up",style:{color:"#333",alignSelf:"center"}}))}))))),s.a.createElement("div",{className:e.tooltipContainer},s.a.createElement(se,{service:h,onClose:function(){v(null)}}),s.a.createElement(se,{service:o,style:{marginTop:20}})),s.a.createElement("main",null,s.a.createElement(A,{services:n,onHover:function(e){m(e)},onClick:function(e){v(e)},layerType:j})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(s.a.createElement(ue,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[220,1,2]]]);
//# sourceMappingURL=main.1de2c692.chunk.js.map