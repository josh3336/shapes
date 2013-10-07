var Shape = function(){
	this.draw = function(parent){
		skipItems = {'name':true, 'draw': true, 'center': true}
		var key, value, keyArray, indexCap;
		var element = document.createElement(this.name);
		for (key in this){
			if (key === 'text'){
				element.innerText = this[key]();
			}
			else if (!skipItems[key]){
				value = this[key]()
				if (value){
					//should refactor and extract out this logic, add attrs list to
					//each shape that defines what attrs are needed for draw
					//quickfix as i didn't see circle needed radius
					if(this.name === 'circle' && key === 'width'){
						value = value/2;
						key = 'r';
					}
					//fix for rect
					else if(this.name === 'rect'){
						if(key === 'cx'){
							value = this[key]() - this['width']()/2;
							key = 'x'
						}
						else if(key === 'cy'){
							value = this[key]() - this['height']()/2;
							key = 'y';
						}
					}
					else if(key.search(/[A-Z]/) != -1){
						indexCap = key.search(/[A-Z]/);
						keyArray = key.split('');
						key = keyArray.slice(0,indexCap).concat('-',keyArray.slice(indexCap)).join('');
					}
					element.setAttribute(key,value)
				}
			}
			parent.appendChild(element);
		}

		return this;
	}
};

var Line = function(){
	var x1, y1, x2, y2, stroke, strokeWidth;
	
	this.name = 'line';

	this.x1 = function(x){
		if(x === undefined){
			return x1;
		}
		x1 = x;
		return this;
	};

	this.y1 = function(y){
		if(y === undefined){
			return y1;
		}
		y1 = y;
		return this;
	};
	
	this.x2 = function(x){
		if(x === undefined){
			return x2;
		}
		x2 = x;
		return this;
	};
	
	this.y2 = function(y){
		if(y === undefined){
			return y2;
		}
		y2 = y;
		return this;
	};
	
	this.stroke = function(s){
		if(s === undefined){
			return stroke;
		}
		stroke = s;
		return this;
	};	
	
	this.strokeWidth = function(sw){
		if(sw === undefined){
			return strokeWidth;
		}
		strokeWidth = sw;
		return this;
	};
	
};
Line.prototype = new Shape();

var Circle = function(){
	var cx, cy, center, width, stroke, stroke, strokeWidth, fillColor;

	this.name = 'circle';

	this.cx = function(x){
		if(x === undefined){
			return cx;
		}
		cx = x;
		return this;
	};

	this.cy = function(y){
		if(y === undefined){
			return cy;
		}
		cy = y;
		return this;
	};

	this.center = function(x,y){
		cx = x;
		cy = y;
		return this;
	};

	this.width = function(w){
		if(w === undefined){
			return width;
		}
		width = w;
		return this;
	};

	this.stroke = function(s){
		if(s === undefined){
			return stroke;
		}
		stroke = s;
		return this;
	};

	this.strokeWidth = function(width){
		if(width === undefined){
			return strokeWidth;
		}
		strokeWidth = width;
		return this;
	};

	this.fill = function(fc){
		if(fc === undefined){
			return fillColor;
		}
		fillColor = fc;
		return this;
	};
}
Circle.prototype = new Shape();

var Rectangle = function(){
	var height;
	this.name = 'rect';
	this.height = function(h){
		if(h === undefined){
			return height;
		}
		height = h;
		return this;
	};
}
Rectangle.prototype = new Circle();

var Square = function(){
	var height, width;
	this.name = 'rect'
	this.height = function(h){
		if(h === undefined){
			return height;
		}
		height = h;
		width = height;
		return this;
	};
	this.width = function(w){
		if(w === undefined){
			return width
		}
		width = w;
		height = width;
		return this;
	}
};
Square.prototype = new Circle();

var Text = function(){
	var xval, yval, text;

	this.name = 'text';

	this.x = function(x){
		if(x === undefined){
			return xval
		}
		xval = x;
		return this;
	}
	this.y = function(y){
		if(y === undefined){
			return yval
		}
		yval = y;
		return this;
	}
	this.text = function(t){
		if(t === undefined){
			return text;
		}
		text = t;
		return this;
	}
};

Text.prototype = new Shape();


