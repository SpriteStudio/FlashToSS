

function checkAllLibItem(_fl, _data, _parentIndexArray, _w2, _h2, imgToIndexMap){
	
	var checkLibNameArray = ["root"];
	for(var i=0, items = _fl.library.items; i< items.length; i++){
		var name = items[i].name;
		var type = items[i].itemType;
		if(type == "movie clip" || type == "graphic"){
			checkLibNameArray.push(name);
		}
	}
	
	for(var i=0; i< checkLibNameArray.length; i++){
		var symbolName = checkLibNameArray[i];
		checkData(symbolName, _fl, _data, _w2, _h2);
	}
	
	//レイヤー構造を作る。
	_parentIndex = 0;
	createIndexArray(_parentIndexArray, _parentIndex, "root");
	
	function createIndexArray(_parentIndexArray, _parentIndex, symbolName){
		_fl.library.editItem(symbolName);
		var tl = _fl.getTimeline();
		tl.currentFrame = 0;
		tl.currentLayer = 0;
		var layers = tl.layers;
		var count=layers.length-1;

		for(var i = layers.length-1; i>=0; i--){

			//ガイドレイヤーなどは回避
			if(layers[i].layerType != "normal"){
				continue;
			}

			var o = {parentIndex:_parentIndex, symbolName:symbolName, layerIndex:(i)};
			_parentIndexArray.push(o);
			if(!layers[i].frames[0].elements.length){
				continue;
			}
			var element = layers[i].frames[0].elements[0];
//fl.trace("L40:element="+ element.elementType);

			if(element && element.elementType == "instance" && 
			   element.instanceType == "symbol" &&
			   (element.libraryItem.itemType == "movie clip" || element.libraryItem.itemType == "graphic")
			   ){
					var childSymbolName = element.libraryItem.name;
					o.childSymbolName = childSymbolName;
					o.isNull = true;
					_parentIndex++;
					createIndexArray(_parentIndexArray, _parentIndex, childSymbolName);
					_parentIndex--;
		   }
		   if(element && element.libraryItem && element.libraryItem.itemType == "bitmap"){
			   
				var imgName = element.libraryItem.name;
				fl.trace("imgName="+imgName);
				o.imgIndex = imgToIndexMap[imgName];
			   
		   }
		}
		
	}
}

function checkData(symbolName, _fl, _data, _w2, _h2){
	
	_fl.library.editItem(symbolName);
	
	var tl = _fl.getTimeline();
	tl.currentFrame = 0;
	tl.currentLayer = 0;
	var layers = tl.layers;
	_fl.selectNone();
	
	_data[symbolName] = [];
	
	var isRoot = symbolName == "root";
	
	for(var i=0; i<layers.length; i++){

		//ガイドレイヤーなどは回避
		if(layers[i].layerType != "normal"){
			continue;
		}

		var frames = layers[i].frames;
		
		_data[symbolName][i] = [];
		
		var rotateGoal = 0;
		
		for(var i2=0; i2<frames.length; i2++){
			
			var frame = frames[i2];
			var isKeyFrame = frame.startFrame == i2;
			
			if(!isKeyFrame){
				continue;
			}
			
			var isTween = frame.tweenType != "none";
			var ipType = isTween ? "linear" : "none";
			var easingAmount = frame.tweenEasing;
			if(frame.tweenEasing < 0){
				ipType = "acceleration";
			}else if(frame.tweenEasing > 0){
				ipType = "deceleration";
			}

			var elements = frames[i2].elements;
			for(var i3=0; i3<elements.length; i3++){
				var element = elements[i3];
				var type = element.elementType;
				var name = element.name;
				var x = element.x;
				var y = element.y;
				var top = element.top;
				var left = element.left;
				var w = element.width;
				var h = element.height;
				var w2 = w/2;
				var h2 = h/2;
				var w4 = w2/2;
				var h4 = h2/2;
				var sx = element.scaleX;
				var sy = element.scaleY;
				var skewX = element.skewX;
				var skewY = element.skewY;
				var px = left;
				var py = top;
				var r  = isNaN(element.rotation) ? 0 : element.rotation;
				var a  = element.colorAlphaPercent;
				var isBottom = false;
				if(isNaN(a)){
					a = 100;
					isBottom = true;
				}

				var child;
				if(type == "instance" && element.instanceType == "symbol"){
					child = element.libraryItem.name;
				}
				
				var o = {};
				
				//反転チェック
				//左右反転･･･(skewX==0 && skewY==180)
				//上下反転･･･(skewX==180 && skewY==0)
				//左右反転かつ上下反転･･･(r==180 && skewX==180 && skewY==180)
				var isRevLR = skewX==0 && skewY==180;
				var isRevUpDown = skewX==180 && skewY==0;
				var isRevLRUpDown = r == 180 && skewX==180 && skewY==180;
				o.FLPH = 0;
				o.FLPV = 0;
				if(isRevLRUpDown){
					o.FLPH = 1;
					o.FLPV = 1;
				}else if(isRevUpDown){
					o.FLPH = 1;
				}else if(isRevLR){
					o.FLPV = 1;
				}
				
				// pivotが左上時：x=0 y=0 left=0 top=0
				// pivotが真ん中時：x=-32 y=-32 left=-32 top=-32
				
				//o.x = (isRoot ? (-_w2) : 0) - (left + x);//(x);//+(isRoot ? 0 : (-w2+x)));//+ left - (left-x) +(isRoot ? 0 : w2);// + Math.ceil(w/2);
				//o.y = (isRoot ? _h2    : 0) + (top  + y);//(y);// +(isRoot ? 0 : (h2+y)));//   - top  + (top-y)  -(isRoot ? 0 : h2);//    - Math.ceil(h/2);
				
				o.x = x;//- left;//x  ;//- left;// left;//(isRoot ? (-_w2) : 0) + left;//(left  + x + w2);//(x);//+(isRoot ? 0 : (-w2+x)));//+ left - (left-x) +(isRoot ? 0 : w2);// + Math.ceil(w/2);
				o.y = -y;//top;//-y ;//+ top;//- top;//(isRoot ? _h2    : 0) - top;//(-top  + y - h2);//(y);// +(isRoot ? 0 : (h2+y)));//   - top  + (top-y)  -(isRoot ? 0 : h2);//    - Math.ceil(h/2);
				//fl.trace("○"+name+" x="+x+" y="+y+" left="+left+" top="+top+" o.x="+o.x+ " o.y="+o.y);
				//alert("isRoot = "+isRoot+" / o.x="+o.x);
				o.left = left;
				o.top  = -top;
				o.w = w;
				o.h = h;
				o.sx = sx;
				o.sy = sy;
				o.px = 0;//isRoot ? 0 : (-0.5 - left/w); //-w2 / w;//(left) / w;
				o.py = 0;//isRoot ? 0 : ( 0.5 + top/h); //h2 / h;//-(top) / h;
				o.r  = -r;
				o.a  = a/100;
				o.frame = i2;
				o.child = child;
				o.isBottom = isBottom;
				o.ipType = ipType;
				
				if(rotateGoal){
					o.r = rotateGoal;
					rotateGoal = 0;
				}
				
				_data[symbolName][i].push(o);
			}
			
			//Flash特有の回転数指定に対応
			if(frame.motionTweenRotateTimes){
				var isClockwise = frame.motionTweenRotate == "clockwise";
				var rotateCount = frame.motionTweenRotateTimes;
				rotateGoal = rotateCount * 360;
				if(isClockwise){
					rotateGoal = -rotateGoal;
				}
			}

		}
	}
	return _data;
}






