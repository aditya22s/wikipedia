define(["jquery","jquery-ui","src/header/components/default","src/util/versioning","forms/button","src/util/util"],function(a,b,c,d,e,f){function g(){}return f.inherits(g,c,{_onClick:function(){var b,c,f,g=a("<textarea></textarea>").css({width:"100%",height:"200px"}),h=new e("Paste",function(){try{b=JSON.parse(g.val()),c=Object.keys(b);for(var a=0,e=c.length;e>a;a++)"_"===c[a].charAt(0)&&delete b[c[a]];d.setViewJSON(b)}catch(h){}f.dialog("close")});f=a("<div />").html(g).append(h.render()).dialog({modal:!0,width:"80%"})}}),g});