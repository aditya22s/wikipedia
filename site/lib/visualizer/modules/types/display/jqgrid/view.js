define(["require","modules/default/defaultview","src/util/util","src/util/api","src/util/domdeferred","src/util/datatraversing","src/util/typerenderer","jqgrid"],function(require,Default,Util,API,DomDeferred,Traversing,Renderer,JQGrid){function View(){}return View.prototype=$.extend(!0,{},Default,{init:function(){var self=this,lastTr,actionsOut=this.module.actions_out();if(actionsOut)for(var i=0;i<actionsOut.length;i++)("onToggleOn"===actionsOut[i].event||"onToggleOff"===actionsOut[i].event)&&(this.hasToggleAction=!0);this.uniqId=Util.getNextUniqueId()+"_",this.dom=$('<div class="ci-displaylist-list"></div>'),this.domTable=$("<table />").attr("id",this.uniqId).css({width:"100%"}),this.dataSize=0,this.currentPage=1,this.dom.on("mouseover","tr.jqgrow",function(){this!==lastTr&&self.module.controller.lineHover(self.elements,$(this).attr("id").replace(self.uniqId,"")),lastTr=this}).on("mouseout","tr.jqgrow",function(){this===lastTr&&(self.module.controller.lineOut(self.elements,$(this).attr("id").replace(self.uniqId,"")),lastTr=null)});var filter=this.module.getConfiguration("filterRow");eval("self.filter = function(jqGrid, source, rowId) { try { \n "+filter+"\n } catch(_) { console.log(_); } }"),this.module.getDomContent().html(this.dom)},exportToTabDelimited:function(){if(this.jpaths){for(var a=[],b=0,c=this.elements.length,d=[],e=0;e<this.jpaths.length;e++)d.push(this.jpaths[e].name);for(a.push(d.join("	"));c>b;b++){for(var f=[],e=0;e<this.jpaths.length;e++)Traversing.getValueFromJPath(this.elements[b],this.jpaths[e].jpath).done(function(a){f.push(a)});a.push(f.join("	"))}return a.join("\r\n")}},unload:function(){this.jqGrid("GridDestroy"),this.jqGrid=!1,this.module.getDomContent().empty()},inDom:function(){var a,b,c=this,d=[],e=[],f=0,g=this.module.getConfiguration("colsjPaths");if("object"==typeof g)for(b=g.length;b>f;f++)a="none"!==g[f].editable&&"false"!==g[f].editable&&""!==g[f].editable,d.push(g[f].name),e.push({name:g[f].name,index:g[f].name,title:!1,width:g[f].width||150,editable:a,editoptions:"select"==g[f].editable?{value:g[f].options}:{},edittype:a?g[f].editable:!1,_jpath:g[f].jpath,sortable:!0,sorttype:g[f].number[0]?"float":"text"});var h=this.module.getConfiguration("nbLines")||20;this.domTable=$("<table />").attr("id",this.uniqId).appendTo(this.dom),this.domPaging=$("<div />",{id:"pager"+this.uniqId}).appendTo(this.dom),$(this.domTable).jqGrid({colNames:d,colModel:e,editable:!0,sortable:!0,loadonce:!1,datatype:"local",gridview:!0,scrollerbar:!0,height:"100%",forceFit:!0,shrinkToFit:!0,cellsubmit:"clientArray",cellEdit:!0,rowNum:h,rowList:[2,10,20,30,100],pager:"#pager"+this.uniqId,resizeStop:function(){c.domTable.children().children().eq(0).children().each(function(a){g[a].width=$(this).width()})},rowattr:function(){return arguments[1]._backgroundColor?{style:"background-color: "+arguments[1]._backgroundColor}:void 0},afterSaveCell:function(a,b,d,f,g){c.jpaths[g].number.indexOf("number")>-1&&(d=parseFloat(d)),c.module.model.dataSetChild(c.elements[a.replace(c.uniqId,"")],e[g]._jpath,d),c.applyFilterToRow(a.replace(c.uniqId,""),a)},loadComplete:function(){if(c.jqGrid)for(var a,b=c.jqGrid("getDataIDs"),d=0,e=b.length;e>d;d++)a=b[d].replace(c.uniqId,""),c.applyFilterToRow(a,b[d]),c.tableElements[a]._inDom.notify()},viewrecords:!0,onSelectRow:function(a,b){c.hasToggleAction&&(b?($("#"+a).addClass("bg-orange").removeClass("ui-widget-content ui-state-highlight"),c.module.controller.onToggleOn(c.elements,a.replace(c.uniqId,""))):($("#"+a).removeClass("bg-orange"),c.module.controller.onToggleOff(c.elements,a.replace(c.uniqId,"")))),c.module.controller.lineClick(c.elements,a.replace(c.uniqId,""))},onSortCol:function(){for(var a=c.jqGrid("getDataIDs"),b=0,d=a.length;d>b;b++)c.tableElements[b]._inDom.notify()}}),this.jqGrid=$.proxy($(this.domTable).jqGrid,$(this.domTable)),this.resolveReady()},applyFilterToRow:function(a,b){this.filter&&this.filter(this.jqGrid,this.elements[a],b)},onResize:function(){this.jqGrid&&(this.jqGrid("setGridWidth",this.width),this.jqGrid("setGridHeight",this.height-26-27))},blank:{list:function(){this.currentPage=this.jqGrid("getGridParam","page"),API.killHighlight(this.module.getId()),this.jqGrid("clearGridData"),$(this.domTable).trigger("reloadGrid")}},update:{list:function(a){if(a){var b=a.get(),c=this.module.getConfiguration("colsjPaths"),d=[];if(this.jpaths=c,this.elements=b,this.module.data=a,c){this.buildElements(b,d,c),this.gridElements=d,this.tableElements=d;for(var e=[],f=0,g=d.length;g>f;f++)e.push(d[f]);this.dataSize!=g&&(this.currentPage=1,this.dataSize=g),this.jqGrid("setGridParam",{datatype:"local",data:e,page:this.currentPage}),$(this.domTable).trigger("reloadGrid"),this.module.model.getjPath("list",[0])}}}},inDomEl:function(a){a.build&&a.build()},buildElements:function(a,b,c){var d=this,e=0,f=a.length;for(d.done=0;f>e;e++)b.push(this.buildElement(a.get(e),d.uniqId+e,c))},buildElement:function(a,b,c,d){var e=this,f={},g=0,h=c.length;for(d||this.listenFor(a,c,b),f.id=String(b),f.__source=a,API.listenHighlight(a,function(a){$("#"+b)[a?"addClass":"removeClass"]("ci-highlight")},!1,this.module.getId()),f._inDom=$.Deferred();h>g;g++){var i=c[g].jpath;f[c[g].name]="",e.done++,f[";"+c[g].name]=this.renderElement(f,a,i,c[g].name)}return a.getChild(this.module.getConfiguration("colorjPath")).then(function(a){f._backgroundColor=a.toString()}),f},listenFor:function(a,b,c){var d=this,e=$("body");this.module.model.dataListenChange(a,function(){d.jqGrid("setRowData",c,d.buildElement(this,c,b,!0));var a=e.scrollTop(),f=$("tr#"+c,d.domTable).get(0);f&&(f.scrollIntoView(),e.scrollTop(a))},"list")},renderElement:function(a,b,c,d){var e=this,f=e.module,g=Renderer.toScreen(b,f,{},c);g.always(function(b){a._inDom.progress(function(){a[d]=b,e.done--,e.jqGrid("setCell",a.id,d,b),g.build&&g.build(),0==e.done&&e.onResize(e.width,e.height)}),a[d]=b,e.done--},function(b){a[d]=b,e.done--})},onActionReceive:{addRow:function(a){this.elements=this.elements||[],this.elements.push(a),this.module.data=this.elements;var b=this.module.getConfiguration("colsjPaths"),c=this.elements.length-1,d=this.buildElement(a,this.uniqId+c,b);this.gridElements.push(d),this.jqGrid("addRowData",d.id,d)},removeRow:function(a){this.elements=this.elements||[];for(var b,c,d=0,e=this.gridElements.length;e>d;d++)if(this.gridElements[d].__source==a){b=this.gridElements[d].id,c=d;break}this.jqGrid("delRowData",b),this.elements.splice(c,0,1),this.gridElements.splice(c,0,1)},addColumn:function(a){var b=this.module,c=a.split(".");c=c.pop(),b.getConfiguration("colsjPaths").push({name:c,editable:!1,jpath:a,number:!1}),this.reloadModule()},removeColumn:function(a){for(var b=this.module,c=b.getConfiguration("colsjPaths"),d=0,e=c.length;e>d;d++)if(c[d].jpath==a){c.splice(d,1);break}this.reloadModule()}},reloadModule:function(){var a=this.module;a.view.unload&&a.view.unload(),a.view.init(),a.view.inDom(),a.view.onResize(),a.model.resetListeners(),a.updateAllView()}}),View});