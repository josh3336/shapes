var drawGraph = function(data){
	var boundDiff, yinc;
	var svg = document.getElementById('container');
	var w = svg.width.baseVal.value;
	var h = svg.height.baseVal.value;
	var offset = 50;
	if(svg.firstChild){
		return;
	}
	drawBorder(w,h,offset,svg,Object.keys(data[0])[0],Object.keys(data[0])[1],w,h,'CO2');
	boundaries = findBoundaries(data);
	boundDiff = boundaries[1]-boundaries[0]
	yinc = (h - offset*2) / boundDiff;
	xinc = (w - offset*2) / data.length;
	drawTicks(w,h,boundaries,offset,svg,yinc,xinc,data)
	var prevcoords;
	prevcoords=[offset,h-offset];
	for(var i=0; i < data.length; i++){
		var l = new Line()
	    .x1(prevcoords[0]).y1(prevcoords[1]).x2(xinc*i+offset).y2(h-offset-(data[i]['level']-boundaries[0])*yinc)
        .stroke('purple').strokeWidth(1)
        .draw(svg);
        prevcoords = [l.x2(),l.y2()];
	}

};

var findBoundaries = function(data){
	var max,min;
	max = 0;
	min = 10000000;
	for (var i = 0; i < data.length; i++){
		if (data[i]['level'] < min){
			min = data[i]['level'];
		}
		if (data[i]['level'] > max){
			max = data[i]['level'];
		}
	}
	return([parseFloat(min),parseFloat(max)])
}
var drawBorder = function(x,y,offset,svg,xname,yname,w,h,name){
	var xline,yline,xtext,ytext;
	xline = new Line()
	.x1(offset).y1(y-offset)
	.x2(x-offset).y2(y-offset)
	.stroke('black').strokeWidth(1)
	.draw(svg);

	yline = new Line()
	.x1(offset).y1(offset)
	.x2(offset).y2(y-offset)
	.stroke('black').strokeWidth(1)
	.draw(svg);

	xtext = new Text()
	.x(w-offset/2).y(h-offset/2)
	.text(xname).draw(svg);

	ytext = new Text()
	.x(offset/2).y(offset/2)
	.text(yname).draw(svg);

	title = new Text()
	.x(w/2).y(offset/2)
	.text(name).draw(svg);
}

var drawTicks = function(x,y,boundaries,offset,svg,yinc,xinc,data){
	var ytext,xtext;
	//ticks y
	for(var cur = y-offset, ind=0; cur > offset; cur=cur-yinc,ind++){
		if(ind === 0 || ind % 5 === 0){
			ytext = new Text()
			.x(offset/2).y(cur)
			.text(Math.round(boundaries[0]+ind)).draw(svg);
		}
	}
	//ticks x
	for(var cur = offset, ind=0; cur < x-offset; cur=cur+xinc,ind++){
		if(ind === 0 || ind % 30 === 0){
			xtext = new Text()
			.x(cur).y(y-offset/2)
			.text(data[ind]['date'].slice(0,7)).draw(svg);
		}
	}

}


drawGraph(co2);

setTimeout(function(){
	$("body").html($("body").html());
}, 3000);

