define(["modules/default/defaultcontroller"],function(a){function b(){}return b.prototype=$.extend(!0,{},a),b.prototype.moduleInformation={moduleName:"1D NMR",description:"Displays NMR jcamp files in the style of standard NMRs",author:"Norman Pellet",date:"24.12.2013",license:"MIT",cssClass:"1dnmr"},b.prototype.references={jcamp:{label:"The jcamp file",type:"jcamp"},plot:{label:"The Plot object",type:"object"}},b.prototype.variablesIn=["jcamp"],b.prototype.configurationStructure=function(){var a=[],b=this.module.definition.vars_in;if(b)for(var c=0,d=b.length;d>c;c++)a.push({title:b[c].name,key:b[c].name});return{groups:{lines:{options:{type:"table",multiple:!0},fields:{varname:{type:"combo",title:"Variable",options:a,"default":""},color:{type:"spectrum",title:"Color","default":[0,0,0,1]},width:{type:"float",title:"Width (px)","default":1}}}}}},b.prototype.configAliases={lines:["groups","lines",0]},b});