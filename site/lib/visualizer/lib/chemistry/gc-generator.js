define(function(){function a(){if(!(c.length>0))for(var a=Math.sqrt(2*Math.log(2)/Math.log(Math.E)),b=0;e*d>=b;b++)c[b]=1/Math.sqrt(2*Math.PI)*Math.exp(-0.5*Math.pow(2*(b-d*e/2)/e*a,2))}function b(b){a(),b=b||{},this.maxTime=b.maxTime||3600,this.nbPointsPerSecond=b.nbPointsPerSecond||5,this.getWidth=b.getWidth||f,this.annotations=[],this.spectrum=[];for(var g=this.maxTime*this.nbPointsPerSecond*2;g>=0;g-=2)this.spectrum[g]=g/this.nbPointsPerSecond/2,this.spectrum[g+1]=0;this.appendPeaks=function(a,b){for(var c=0;c<a.length;c++)this.appendPeak(a[c],b)},this.appendAnnotation=function(a,b,c,d){var e={};e.type="rect",e._highlight=[c],e.pos={x:a,y:"30px"},e.pos2={x:b,y:"60px"},e.fillColor="#EEEEEE",e.strokeColor="#CC0000",e.strokeWidth="0px",e.info=d,this.annotations.push(e)},this.random=function(a,b){for(var b=b||1,c=0;a>c;c++)for(var d=Math.random()*b+1,e=0;d>e;e++){var f=Math.floor(Math.random()*this.maxTime),g=Math.random();this.appendPeak([f,g],c)}return peaksDescription},this.appendPeak=function(a,b){for(var f=a[0],g=a[1],h=this.getWidth(f),i=f-h/2*d,j=f+h/2*d,k=f-h,l=f+h,m=Math.max(Math.ceil(i*this.nbPointsPerSecond),0),n=Math.min(Math.floor(j*this.nbPointsPerSecond),this.spectrum.length/2-1),o=(m+n)/2,p=m;n>=p;p++){var q=Math.floor(e/h*(p-o)/this.nbPointsPerSecond+d*e/2);q>=0&&q<c.length&&(this.spectrum[2*p+1]+=c[q]*g)}b&&this.appendAnnotation(k,l,b)},this.getSpectrum=function(){return this.spectrum},this.getAnnotations=function(){return this.annotations}}var c=[],d=5,e=1e3,f=function(a){return 1+3*a/1e3};return b});