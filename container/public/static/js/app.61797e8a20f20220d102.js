webpackJsonp([1],{"8DvP":function(e,t){},AFY8:function(e,t){},JsT5:function(e,t){},LcOQ:function(e,t){},MkfZ:function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("7+uW"),n={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var i=a("VU/8")({name:"App"},n,!1,function(e){a("8DvP")},null,null).exports,s=a("/ocq"),c={name:"my-header",data:function(){return{show:!1,keywords:""}},methods:{onSubmit:function(){console.log("submit"),this.$emit("search",{value:this.keywords})}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-row",{staticClass:"header"},[a("el-col",{attrs:{span:3}},[a("span",{staticClass:"logo"},[e._v("OASIS")])]),e._v(" "),a("el-col",{staticClass:"search",attrs:{span:7}},[a("i",{staticClass:"el-icon-search",on:{click:function(t){e.show=!e.show}}}),e._v(" "),a("transition",{attrs:{name:"slide-fade"}},[e.show?a("input",{directives:[{name:"model",rawName:"v-model",value:e.keywords,expression:"keywords"}],staticClass:"input",attrs:{type:"text"},domProps:{value:e.keywords},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.onSubmit(t)},input:function(t){t.target.composing||(e.keywords=t.target.value)}}}):e._e()])],1)],1)},staticRenderFns:[]};var l=a("VU/8")(c,o,!1,function(e){a("iOY1")},"data-v-55fe2034",null).exports,h={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"search-bar"},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submit(t)}},model:{value:e.searchCon,callback:function(t){e.searchCon=t},expression:"searchCon"}},[a("el-select",{staticClass:"search-pre",attrs:{slot:"prepend",placeholder:"请选择"},slot:"prepend",model:{value:e.searchType,callback:function(t){e.searchType=t},expression:"searchType"}},[a("el-option",{attrs:{label:"All",value:"all"}}),e._v(" "),a("el-option",{attrs:{label:"Title",value:"title"}}),e._v(" "),a("el-option",{attrs:{label:"Author",value:"authors"}}),e._v(" "),a("el-option",{attrs:{label:"Conference",value:"conferences"}}),e._v(" "),a("el-option",{attrs:{label:"Terms",value:"terms"}}),e._v(" "),a("el-option",{attrs:{label:"Affiliation",value:"affiliations"}})],1),e._v(" "),a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.submit},slot:"append"})],1)],1)},staticRenderFns:[]};var u=a("VU/8")({name:"search-bar",data:function(){return{searchType:"All",searchCon:""}},methods:{submit:function(){this.$emit("paperSearch",{type:this.searchType,con:this.searchCon})}}},h,!1,function(e){a("MkfZ")},null,null).exports,d={name:"HelloWorld",components:{MyHeader:l,searchBar:u},data:function(){return{num:1}},methods:{search:function(e){console.log(e)}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"hello"},[a("MyHeader",{on:{search:e.search}}),e._v(" "),a("el-row",{staticClass:"link"},[a("el-link",{attrs:{href:"http://localhost:8080/#/mainpage",type:"primary"}},[e._v("主页")]),e._v(" "),a("el-link",{attrs:{href:"http://localhost:8080/#/ranking",type:"primary"}},[e._v("数据报表")]),e._v(" "),a("el-link",{attrs:{href:"http://localhost:8080/#/result",type:"primary"}},[e._v("搜索结果")])],1),e._v(" "),a("searchBar",{staticClass:"bar"})],1)},staticRenderFns:[]};a("VU/8")(d,p,!1,function(e){a("AFY8")},"data-v-e52c1e9a",null).exports;var m=new r.default,f={name:"MainPage",components:{SearchBar:u},data:function(){return{nav_list:["Ranking","TODO1","TODO2"],current:0,pic_one:!0,pic_two:!1,pic_three:!1,search_val:""}},beforeDestroy:function(){var e=this.search_val;m.$emit("fuzzySearch",e)},methods:{enter:function(e){this.current=e,0==e?(this.pic_one=!0,this.pic_two=!1,this.pic_three=!1):1==e?(this.pic_two=!0,this.pic_three=!1,this.pic_one=!1):(this.pic_three=!0,this.pic_one=!1,this.pic_two=!1)},detail:function(e){0==e?(console.log("jump to rank"),this.$router.push({path:"/ranking"})):console.log("to do")},search:function(e){this.search_val=e,this.$router.push("result")}}},v={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"main"},[a("div",{attrs:{id:"search"}},[a("div",{staticClass:"overlay"},[a("div",{staticClass:"o-content"},[a("h1",{staticClass:"title"},[e._v("\n            OASIS\n          ")]),e._v(" "),a("div",{attrs:{id:"tips"}},[e._v("\n            —— ——CONNECTING THE KNOWLEDGE—— ——\n          ")]),e._v(" "),a("div",{staticClass:"bar"},[a("SearchBar",{on:{paperSearch:e.search}})],1)])])]),e._v(" "),a("el-row",{staticClass:"show"},[a("el-col",{attrs:{span:6,offset:2}},[a("div",{staticClass:"link-tab"},[a("ul",{staticClass:"tab-list"},e._l(e.nav_list,function(t,r){return a("li",{key:r,staticClass:"tab-list-item",class:{active:r==e.current},on:{mouseenter:function(t){return e.enter(r)},click:function(t){return e.detail(r)}}},[a("el-link",{attrs:{underline:!1}},[e._v(e._s(t))])],1)}),0)])]),e._v(" "),a("el-col",{attrs:{span:14,offset:2}},[a("div",{staticClass:"link-content"},[a("div",{class:{imgActive:e.pic_one},attrs:{id:"content-item-one"}},[a("el-image",{staticClass:"img-item",attrs:{src:"/static/mainpage/charts.jpg",alt:"ooops",lazy:""},on:{click:function(t){return e.detail(0)},mouseenter:function(t){return e.enter(0)}}})],1),e._v(" "),a("div",{class:{imgActive:e.pic_two},attrs:{id:"content-item-two"}},[a("el-image",{staticClass:"img-item",attrs:{src:"/static/mainpage/TODO1.png",alt:"ooops",lazy:""},on:{click:function(t){return e.detail(1)},mouseenter:function(t){return e.enter(1)}}})],1),e._v(" "),a("div",{class:{imgActive:e.pic_three},attrs:{id:"content-item-three"}},[a("el-image",{staticClass:"img-item",attrs:{src:"/static/mainpage/TODO2.png",alt:"ooops",lazy:""},on:{click:function(t){return e.detail(2)},mouseenter:function(t){return e.enter(2)}}})],1)])])],1)],1)},staticRenderFns:[]};var _=a("VU/8")(f,v,!1,function(e){a("i3Ye")},"data-v-705ad3f0",null).exports,y={name:"essay-search-result-card",props:{title:String,authors:String,conference:String,year:String,times:String,essayLink:String}},g={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"result"},[a("div",{staticClass:"title"},[a("a",{attrs:{href:e.essayLink}},[e._v(e._s(e.title))])]),e._v(" "),a("div",{staticClass:"content"},[a("div",{attrs:{id:"author"}},[e._v(e._s(e.authors))]),e._v(" "),a("div",[e._v(e._s(e.conference))]),e._v(" "),a("div",[e._v("Year: "+e._s(e.year)+" | Conference Paper")]),e._v(" "),a("div",[e._v("Cited by: Papers ("+e._s(e.times)+")")])])])},staticRenderFns:[]};var C=a("VU/8")(y,g,!1,function(e){a("JsT5")},"data-v-107e58d8",null).exports,k={name:"side-bar",components:{search:u},props:{authorSummary:Array,affiliationSummary:Array,termSummary:Array,conferenceSummary:Array},data:function(){return{searchWithinChecked:!1,yearChecked:!1,authorChecked:!1,affiliationChecked:!1,conferenceChecked:!1,termChecked:!1,authorSummaryCheck:Array(this.authorSummary.length).fill(!1),affiliationSummaryCheck:Array(this.affiliationSummary.length).fill(!1),termSummaryCheck:Array(this.termSummary.length).fill(!1),conferenceSummaryCheck:Array(this.conferenceSummary.length).fill(!1),startYear:"",endYear:"",activeNames:[],searchWithinQuery:{conference:"",term:"",author:"",year:"",affiliation:""}}},created:function(){var e=new Date;this.startYear=e.getFullYear().toString(),this.endYear=e.getFullYear().toString()},methods:{checkYear:function(e){this.yearChecked=!0},handleChange:function(e){},searchVal:function(e){this.$emit("advancedSearch",e)},getYearFromDatePick:function(e){return e.toString().indexOf(" ")<0?e.toString():e.toString().split(" ")[3]},showOK:function(e,t){var a=!1;return e.forEach(function(e){a=a||e}),"author"==t.toString()?this.authorChecked=a:"conference"==t.toString()?this.conferenceChecked=a:"affiliation"==t.toString()?this.affiliationChecked=a:"term"==t.toString()&&(this.termChecked=a),a},collectSearchWithin:function(){var e=this;if(this.yearChecked&&(this.searchWithinQuery.year=this.getYearFromDatePick(this.startYear)+"_"+this.getYearFromDatePick(this.endYear)),this.authorChecked){var t="";this.authorSummaryCheck.forEach(function(a,r){a&&(t+=e.authorSummary[r].first+";")}),this.searchWithinQuery.author=t}if(this.conferenceChecked){var a="";this.conferenceSummaryCheck.forEach(function(t,r){t&&(a+=e.conferenceSummary[r].first+";")}),this.searchWithinQuery.conference=a}if(this.affiliationChecked){var r="";this.affiliationSummaryCheck.forEach(function(t,a){t&&(r+=e.affiliationSummary[a].first+";")}),this.searchWithinQuery.affiliation=r}if(this.termChecked){var n="";this.termSummaryCheck.forEach(function(t,a){t&&(n+=e.termSummary[a].first+";")}),this.searchWithinQuery.term=n}this.$emit("searchWithin",this.searchWithinQuery)}}},S={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"side-bar"},[a("div",{staticClass:"search-within"},[a("div",{staticClass:"indicator"},[e._v("Search within")]),e._v(" "),a("search",{on:{paperSearch:e.searchVal}})],1),e._v(" "),a("div",{staticClass:"date-pick"},[a("div",{staticClass:"indicator"},[e._v("Year pick")]),e._v(" "),a("div",{staticClass:"year-pick start-year"},[a("el-date-picker",{attrs:{type:"year",placeholder:"Start"},on:{change:function(t){return e.checkYear(t)}},model:{value:e.startYear,callback:function(t){e.startYear=t},expression:"startYear"}})],1),e._v(" "),a("div",{staticClass:"year-pick end-year"},[a("el-date-picker",{attrs:{type:"year",placeholder:"End"},on:{change:function(t){return e.checkYear(t)}},model:{value:e.endYear,callback:function(t){e.endYear=t},expression:"endYear"}})],1),e._v(" "),""!=e.startYear||""!=e.endYear?a("div",{staticClass:"apply-button"},[a("el-button",{attrs:{round:""},on:{click:e.collectSearchWithin}},[e._v("\n        OK\n      ")])],1):e._e()]),e._v(" "),a("div",{staticClass:"category-select"},[a("el-collapse",{on:{change:e.handleChange},model:{value:e.activeNames,callback:function(t){e.activeNames=t},expression:"activeNames"}},[a("el-collapse-item",{attrs:{title:"Author",name:"1"}},[e._l(e.authorSummary,function(t,r){return a("div",{key:r},[a("el-checkbox",{staticClass:"check-box",model:{value:e.authorSummaryCheck[r],callback:function(t){e.$set(e.authorSummaryCheck,r,t)},expression:"authorSummaryCheck[index]"}},[e._v("\n            "+e._s(t.first)+"("+e._s(t.second)+")\n          ")])],1)}),e._v(" "),a("div",{staticClass:"apply-button"},[e.showOK(e.authorSummaryCheck,"author")?a("el-button",{attrs:{round:""},on:{click:e.collectSearchWithin}},[e._v("\n            OK\n          ")]):e._e()],1)],2),e._v(" "),a("el-collapse-item",{attrs:{title:"Conference",name:"2"}},[e._l(e.conferenceSummary,function(t,r){return a("div",{key:r},[a("el-checkbox",{staticClass:"check-box",model:{value:e.conferenceSummaryCheck[r],callback:function(t){e.$set(e.conferenceSummaryCheck,r,t)},expression:"conferenceSummaryCheck[index]"}},[e._v("\n            "+e._s(t.first)+"("+e._s(t.second)+")\n          ")])],1)}),e._v(" "),a("div",{staticClass:"apply-button"},[e.showOK(e.conferenceSummaryCheck,"conference")?a("el-button",{attrs:{round:""},on:{click:e.collectSearchWithin}},[e._v("\n            OK\n          ")]):e._e()],1)],2),e._v(" "),a("el-collapse-item",{attrs:{title:"Affiliation",name:"3"}},[e._l(e.affiliationSummary,function(t,r){return a("div",{key:r},[a("el-checkbox",{staticClass:"check-box",model:{value:e.affiliationSummaryCheck[r],callback:function(t){e.$set(e.affiliationSummaryCheck,r,t)},expression:"affiliationSummaryCheck[index]"}},[e._v("\n            "+e._s(t.first)+"("+e._s(t.second)+")\n          ")])],1)}),e._v(" "),a("div",{staticClass:"apply-button"},[e.showOK(e.affiliationSummaryCheck,"affiliation")?a("el-button",{attrs:{round:""},on:{click:e.collectSearchWithin}},[e._v("\n            OK\n          ")]):e._e()],1)],2),e._v(" "),a("el-collapse-item",{attrs:{title:"Term",name:"4"}},[e._l(e.termSummary,function(t,r){return a("div",{key:r},[a("el-checkbox",{staticClass:"check-box",model:{value:e.termSummaryCheck[r],callback:function(t){e.$set(e.termSummaryCheck,r,t)},expression:"termSummaryCheck[index]"}},[e._v("\n            "+e._s(t.first)+"("+e._s(t.second)+")\n          ")])],1)}),e._v(" "),a("div",{staticClass:"apply-button"},[e.showOK(e.termSummaryCheck,"term")?a("el-button",{attrs:{round:""},on:{click:e.collectSearchWithin}},[e._v("\n            OK\n          ")]):e._e()],1)],2)],1)],1)])},staticRenderFns:[]};var b=a("VU/8")(k,S,!1,function(e){a("QEzE")},null,null).exports,w=(a("mvHQ"),a("mtWM")),x=a.n(w),P=a("zL8q"),E=a.n(P),O=function(e,t){return x()({method:"get",data:t,transformRequest:[function(e){var t="";for(var a in e)t+=encodeURIComponent(a)+"="+encodeURIComponent(e[a])+"&";return t}],headers:{"Content-Type":"text/plain"},url:""+e})},q={name:"SearchRes",components:{"essay-search-result-card":C,"side-bar":b,search:u},created:function(){var e=this;m.$on("fuzzySearch",function(t){e.search_type=t.type,e.search_query=t.con,e.search_query=e.handleBlankSpace(e.search_query),console.log("search query",e.search_query)})},mounted:function(){this.getFuzzySearchResult()},beforeDestroy:function(){m.$off("fuzzySearch")},data:function(){return{search_query:"",search_type:"",search_within_query:"",search_within_type:"",search_within_arguments:"",is_search_within:!1,search_result:null,search_page_number:100,summary_term:[],summary_author:[],summary_conference:[],summary_affiliation:[],current_page:0,page_size:10,advanced_query:null}},methods:{handleCurrentChange:function(e){this.current_page=e,this.getNextPage()},commonSearch:function(e){this.search_type=e.type,this.search_query=e.con,this.search_query=this.handleBlankSpace(this.search_query),this.getFuzzySearchResult()},handleAdvancedSearch:function(e){this.search_within_type=e.type,this.search_within_query=e.con,console.log(this.search_within_type,this.search_within_query)},processAdvancedSearch:function(e){this.advanced_query=e,this.is_search_within=!0,this.search_within_arguments="";var t="";this.advanced_query.conference.length>0&&this.advanced_query.conference.split(";").forEach(function(e){e.length>0&&(t+="refinements=conference:"+e+";")}),this.advanced_query.term.length>0&&this.advanced_query.term.split(";").forEach(function(e){e.length>0&&(t+="refinements=term:"+e+";")}),this.advanced_query.author.length>0&&this.advanced_query.author.split(";").forEach(function(e){e.length>0&&(t+="refinements=author:"+e+";")}),this.advanced_query.year.length>0&&this.advanced_query.year.split(";").forEach(function(e){e.length>0&&(t+="refinements=year:"+e+";")}),this.advanced_query.affiliation.length>0&&this.advanced_query.affiliation.split(";").forEach(function(e){e.length>0&&(t+="refinements=affiliation:"+e+";")}),this.search_within_arguments=t.trim().split(";").join("&").substring(0,t.length-1),this.getAdvancedSearchResult()},getFuzzySearchResult:function(){var e=this;this.is_search_within=!1,this.search_result=null,O("/api/query/paper/list?query="+this.search_query+"&returnFacets="+this.search_type).then(function(t){e.search_result=t.data,e.getSummary()})},getSummary:function(){var e=this;O("/api/query/paper/summary").then(function(t){e.summary_term=t.data.term,e.summary_author=t.data.author,e.summary_conference=t.data.conference,e.summary_affiliation=t.data.affiliation})},getAdvancedSearchResult:function(){var e=this;this.is_search_within=!0,console.log("/api/query/paper/refine?"+this.search_within_arguments),this.search_result=null,O("/api/query/paper/refine?"+this.search_within_arguments).then(function(t){console.log("search within: ",t),e.search_result=t.data})},getNextPage:function(){var e=this;this.search_result=null,this.is_search_within?O("/api/query/paper/refine?"+this.search_within_arguments+"&pageNum="+this.current_page).then(function(t){console.log("search within: ",t),e.search_result=t.data}):O("/api/query/paper/list?query="+this.search_query+"&returnFacets="+this.search_type+"&pageNum="+this.current_page).then(function(t){e.search_result=t.data})},handleBlankSpace:function(e){return e.split(" ").join("%20")}}},A={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",{staticClass:"main"},[a("el-header",{staticStyle:{height:"35vh","min-height":"270px",padding:"0"},attrs:{id:"header"}},[a("div",{attrs:{id:"overlay"}},[a("div",{attrs:{id:"o-content"}},[a("h1",{staticClass:"title"},[e._v("\n          OASIS\n        ")]),e._v(" "),a("search",{on:{paperSearch:e.commonSearch}})],1)])]),e._v(" "),a("el-row",{staticStyle:{margin:"3% 2%"},attrs:{gutter:20,id:"content"}},[a("el-col",{attrs:{span:6,id:"options"}},[a("div",{staticStyle:{height:"100px"}},[a("side-bar",{attrs:{authorSummary:e.summary_author,affiliationSummary:e.summary_affiliation,conferenceSummary:e.summary_conference,termSummary:e.summary_term},on:{advancedSearch:e.handleAdvancedSearch,searchWithin:e.processAdvancedSearch}})],1)]),e._v(" "),a("el-col",{attrs:{span:18,id:"res"}},[a("div",{staticClass:"result-card"},e._l(e.search_result,function(e,t){return a("essay-search-result-card",{key:t,attrs:{title:e.title,authors:e.authors,conference:e.conference,year:e.year.toString(),times:e.citationCount.toString(),essayLink:e.pdfLink}})}),1),e._v(" "),a("div",{staticClass:"page-pagination"},[a("el-pagination",{attrs:{layout:"prev,pager,next",total:e.search_page_number,"current-page":e.current_page,"page-size":e.page_size},on:{"current-change":e.handleCurrentChange}})],1)])],1)],1)},staticRenderFns:[]};var Y=a("VU/8")(q,A,!1,function(e){a("LcOQ")},null,null).exports,D=a("//Fk"),F=a.n(D),T=(a("Qbfk"),{name:"Ranking",components:{MyHeader:l},data:function(){var e=this,t=["#516b91","#59c4e6","#edafda","#93b7e3","#a5e7f0","#cbb0e3"];return this.auSettings={stack:{Papers:["Paper1","Paper2","Paper3","Paper4","Paper5"]}},this.auExtend={textStyle:{color:"white"},color:t,series:{emphasis:{itemStyle:{barBorderWidth:1,shadowBlur:10,shadowOffsetX:0,shadowOffsetY:0,shadowColor:"rgba(0,0,0,0.5)"}}},tooltip:{trigger:"item",enterable:"ture",confine:"ture",padding:10,backgroundColor:"#222",borderColor:"#777",borderWidth:1,extraCssText:"width:25em; white-space:pre-wrap",formatter:function(t){var a=t.dataIndex,r=t.componentIndex;return'<div style="border-bottom: 1px solid rgba(255,255,255,.3);font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'+e.authors[a].papers[r].title+'</div><div class="tool-content" font-size: 14px; text-align:left;"><strong>Author: </strong>'+e.authors[a].papers[r].authors+"<br /><strong>Year: </strong>"+e.authors[a].papers[r].year+"<br /><strong>Citation: </strong>"+e.authors[a].papers[r].citication+"</div>"}}},this.auEvents={click:function(t){e.auClick(t)},dblclick:function(t){e.name=t.type,console.log("db")}},this.yearSettings={area:!0,color:t},this.yearExtand={textStyle:{color:"white"},series:{label:{normal:{show:!0}}}},this.paperSettings={radius:["88%","75%"],label:{normal:{show:!1,position:"center"},emphasis:{show:!0,textStyle:{fontSize:"30",fontWeight:"bold"}}}},this.termSettings={color:["#e01f54","#001852","#f5e8c8","#b8d2c7","#c6b38e","#a4d8c2","#f3d999","#d3758f","#dcc392","#2e4783","#82b6e9","#ff6347","#a092f1","#0a915d","#eaf889","#6699FF","#ff6666","#3cb371","#d5b158","#38b6b6"],shape:"circle"},this.paperExtand={color:["#516b91","#59c4e6","#edafda","#93b7e3","#a5e7f0","#cbb0e3"],textStyle:{color:"white"}},{yearData:{columns:["year","count"],rows:[]},auData:{columns:["Author","Paper1","Paper2","Paper3","Paper4","Paper5"],rows:[]},paperData:{columns:["title","citationCount"],rows:[]},termData:{columns:["term","count"],rows:[]},load1:!0,load2:!0,load3:!0,load4:!0}},mounted:function(){document.body.scrollTop=0,document.documentElement.scrollTop=0,console.log("outer"),this.initChart()},methods:{initChart:function(){this.getFir(),this.getSec()},getFir:function(){var e=this,t=O("/api/report/paper/trend/year"),a=O("/api/report/author/rank/paper_cnt");F.a.all([t,a]).then(function(t){console.log(t[0].data,t[1].data),e.yearData.rows=t[0].data,e.load1=!1;for(var a=[],r=0;r<10;r++)a.push({Author:t[1].data[r].author,Paper1:t[1].data[r].papers[0].citationCount,Paper2:t[1].data[r].papers[1].citationCount,Paper3:t[1].data[r].papers[2].citationCount,Paper4:t[1].data[r].papers[3].citationCount,Paper5:t[1].data[r].papers[4].citationCount});e.auData.rows=a,e.authors=t[1].data,e.load2=!1,console.log("fin 1")})},getSec:function(){var e=this;console.log("beg 2");var t=O("/api/report/paper/rank/citation"),a=O("/api/report/wdcld/year?year=2019");F.a.all([t,a]).then(function(t){console.log(t[0].data,t[1].data),e.load3=!1,e.termData.rows=t[1].data,e.load4=!1,console.log("fin 2")})},search:function(e){console.log(e)},auClick:function(e){this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(255, 255, 255, 0.7)"});window.location.href=this.authors[e.dataIndex].papers[e.componentIndex].pdfLink}}}),z={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"main"},[a("el-container",[a("el-header",{staticStyle:{padding:"0 0"}},[a("MyHeader",{on:{search:e.search}})],1),e._v(" "),a("el-main",{staticStyle:{padding:"0 5%"}},[a("el-row",{staticClass:"line-ranking ranking"},[a("h1",[e._v("Papers in Last 5 Years")]),e._v(" "),a("div",{staticClass:"chart"},[a("ve-line",{attrs:{data:e.yearData,settings:e.yearSettings,extend:e.yearExtand,loading:e.load1,height:"100%"}})],1)]),e._v(" "),a("el-row",{staticClass:"bar-ranking ranking",attrs:{type:"flex",align:"middle"}},[a("el-col",{attrs:{span:6}},[a("div",{staticClass:"name"},[a("h1",[a("em",[e._v("Top 10")]),a("br"),e._v(" authors with papers cite")])])]),e._v(" "),a("el-col",{attrs:{span:16,offset:1}},[a("div",{staticClass:"chart"},[a("ve-histogram",{attrs:{data:e.auData,settings:e.auSettings,events:e.auEvents,height:"100%",loading:e.load2,extend:e.auExtend}})],1)])],1),e._v(" "),a("el-row",{staticClass:"paper-term-ranking ranking",attrs:{type:"flex",align:"middle"}},[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"name"},[a("h2",[a("em",[e._v("Top 10")]),a("br"),e._v(" authors with papers cite")]),e._v(" "),a("div",{staticClass:"chart"},[a("ve-ring",{staticClass:"load-c",attrs:{data:e.paperData,settings:e.paperSettings,events:e.paperExtand,loading:e.load3,"legend-visible":!1,height:"100%"}})],1)])]),e._v(" "),a("el-col",{attrs:{span:14,offset:2,display:"flex"}},[a("h2",[a("em",[e._v("HOOOOOOOT ")]),e._v(" terms!")])])],1),e._v(" "),a("div",{staticClass:"chart word-cloud"},[a("ve-wordcloud",{staticClass:"load-c",attrs:{data:e.termData,settings:e.termSettings,loading:e.load4}})],1)],1)],1)],1)},staticRenderFns:[]};var R=a("VU/8")(T,z,!1,function(e){a("maQL")},"data-v-625fcf81",null).exports,$={name:"Copy",components:{MyHeader:l},data:function(){this.authorSettings={stack:{Papers:["Paper1","Paper2","Paper3","Paper4","Paper5"]}},this.authorExtend={textStyle:{color:"white"},color:["#516b91","#59c4e6","#edafda","#93b7e3","#a5e7f0","#cbb0e3"]},this.paperSettings={stack:{Papers:["Paper1","Paper2","Paper3","Paper4","Paper5"]}},this.paperExtend={textStyle:{color:"white"},color:["#c12e34","#e6b600","#0098d9","#2b821d","#005eaa","#339ca8","#cda819","#32a487"]},this.xxxExtend={textStyle:{color:"white"},color:["#e01f54","#001852","#f5e8c8","#b8d2c7","#c6b38e","#a4d8c2","#f3d999","#d3758f","#dcc392","#2e4783","#82b6e9","#ff6347"]};var e=this;return this.chartEvents={click:function(t){e.getClick(t)},dblclick:function(t){e.name=t.type,console.log("db")}},{chartData:{columns:["Author","Paper1","Paper2","Paper3","Paper4","Paper5"],rows:[]}}},mounted:function(){this.initChart()},methods:{initChart:function(){console.log(this.chartData);for(var e=0;e<10;e++)this.chartData.rows.push({Author:"Smith.J",Paper1:Math.ceil(1e3*Math.random()),Paper2:Math.ceil(1e3*Math.random()),Paper3:Math.ceil(1e3*Math.random()),Paper4:Math.ceil(1e3*Math.random()),Paper5:Math.ceil(1e3*Math.random())})},search:function(e){console.log(e)},getClick:function(e){console.log("in get",e)}}},W={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"main"},[a("el-container",[a("el-header",{staticStyle:{padding:"0 0"}},[a("MyHeader",{on:{search:e.search}})],1),e._v(" "),a("el-main",[a("el-row",{staticClass:"bar-ranking"},[a("el-col",{attrs:{span:6}},[a("div",{staticClass:"name"},[a("h1",[e._v("Top 10 authors with papers cite in 2019")])])]),e._v(" "),a("el-col",{attrs:{span:16,offset:2}},[a("div",{staticClass:"chart"},[a("ve-histogram",{staticClass:"bar-chart",attrs:{data:e.chartData,settings:e.authorSettings,events:e.chartEvents,height:"100%",extend:e.authorExtend}})],1)])],1),e._v(" "),a("el-row",{staticClass:"bar-ranking"},[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"name"},[a("h1",[e._v("Top 10 organizations with papers cite")])])]),e._v(" "),a("el-col",{attrs:{span:14,offset:2}},[a("div",{staticClass:"chart"},[a("ve-histogram",{staticClass:"bar-chart",attrs:{data:e.chartData,settings:e.paperSettings,events:e.chartEvents,height:"100%",extend:e.paperExtend}})],1)])],1),e._v(" "),a("el-row",{staticClass:"bar-ranking"},[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"name"},[a("h1",[e._v("Top 10 xxx with papers cite")])])]),e._v(" "),a("el-col",{attrs:{span:14,offset:2}},[a("div",{staticClass:"chart"},[a("ve-histogram",{staticClass:"bar-chart",attrs:{data:e.chartData,settings:e.paperSettings,events:e.chartEvents,height:"100%",extend:e.xxxExtend}})],1)])],1)],1)],1)],1)},staticRenderFns:[]};a("VU/8")($,W,!1,function(e){a("S1KL")},"data-v-f3cb1b8e",null).exports;r.default.use(s.a);var M=new s.a({scrollBehavior:function(e,t,a){return a||{x:0,y:0}},routes:[{path:"/",redirect:"/mainpage"},{path:"/mainpage",name:"MainPage",component:_},{path:"/result",name:"SearchRes",component:Y},{path:"/ranking",name:"Ranking",component:R}]}),Q=(a("tvR6"),a("vO7p")),L=a.n(Q);r.default.use(L.a),r.default.use(E.a),r.default.config.productionTip=!1,new r.default({el:"#app",router:M,components:{App:i},template:"<App/>"})},QEzE:function(e,t){},Qbfk:function(e,t){},S1KL:function(e,t){},i3Ye:function(e,t){},iOY1:function(e,t){},maQL:function(e,t){},tvR6:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.61797e8a20f20220d102.js.map