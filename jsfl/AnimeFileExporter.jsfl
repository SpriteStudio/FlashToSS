
function exportAnimeFile(_animefilePath, _data, _fps, _frameCount, _canvasSize, _bgColor, _sceneFileNameArray, 
						 _parentIndexArray, _w2, _h2){
	
	var s = '<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n'+
'<SpriteStudioAnimePack version="1.00.00">\n'+ 

getStageSetting(_fps, _frameCount, _canvasSize, _bgColor) + 

 <><![CDATA[	<name>NewAnimation</name>
	<exportPath></exportPath>
	<Model>
		<partList>
			<value>
				<name>root</name>
				<arrayIndex>0</arrayIndex>
				<parentIndex>-1</parentIndex>
				<type>null</type>
				<boundsType>none</boundsType>
				<inheritType>parent</inheritType>
				<alphaBlendType>mix</alphaBlendType>
				<show>1</show>
				<locked>0</locked>
			</value>
]]></>;
			
			var parentIndex = 0;
			var prebArrayIndex = 0;
			var prebIndexArray = [0];
			var prebParentIndex = 0;
			for(var i=0; i<_parentIndexArray.length; i++){
				var isNull = _parentIndexArray[i].isNull;
				var arrayIndex = (i+1);
				var childDepth = _parentIndexArray[i].parentIndex;
				var isUpDepth   = prebParentIndex < _parentIndexArray[i].parentIndex;
				var isDownDepth = prebParentIndex > _parentIndexArray[i].parentIndex;
fl.trace("L37:_parentIndexArray.length="+_parentIndexArray.length);				
				if(isUpDepth){
					prebIndexArray[childDepth] = prebArrayIndex;
				}else if(isDownDepth){
					//prebIndexArray[childDepth] = prebArrayIndex;
				}
				
s = s + "			<value>\n"+
"				<name>NewCell"+(i==0?"":i+1)+"</name>\n"+
"				<arrayIndex>" + arrayIndex + "</arrayIndex>\n"+
"				<parentIndex>"+prebIndexArray[childDepth]+"</parentIndex>\n"+
"				<type>"+(isNull ? "null" : "normal")+"</type>\n"+
"				<boundsType>none</boundsType>\n"+
"				<inheritType>parent</inheritType>\n"+
"				<alphaBlendType>mix</alphaBlendType>\n"+
"				<show>1</show>\n"+
"				<locked>0</locked>\n"+
"			</value>\n";
				prebArrayIndex  = arrayIndex;
				prebParentIndex = _parentIndexArray[i].parentIndex;
			}
			
 s = s + <><![CDATA[		</partList>
	</Model>
	<cellmapNames>
]]></>;
		
		for(var i=0; i< _sceneFileNameArray.length; i++){
			s = s + "		<value>"+_sceneFileNameArray[i]+"</value>\n";
		}
	s = s + <><![CDATA[	</cellmapNames>
	<animeList>
		<anime>
			<name>anime 1</name>
			<overrideSettings>1</overrideSettings>
]]></>+
			getStageSetting(_fps, _frameCount, _canvasSize, _bgColor) + 
			
"			<labels/>\n"+
"			<partAnimes>\n";

s = s + 
'				<partAnime>\n'+
'					<partName>root</partName>\n'+
'					<attributes>\n'+
'						<attribute tag="POSX">\n'+
'							<key time="0" ipType="linear">\n'+
'								<value>-'+_w2+'</value>\n'+
'							</key>\n'+
'						</attribute>\n'+
'						<attribute tag="POSY">\n'+
'							<key time="0" ipType="linear">\n'+
'								<value>'+_h2+'</value>\n'+
'							</key>\n'+
'						</attribute>\n'+
'					</attributes>\n'+
'				</partAnime>\n';

	for(var i=0; i<_parentIndexArray.length; i++){
		s = s+ '				<partAnime>\n'+
		'					<partName>NewCell' + (i==0?"":i+1) + '</partName>\n'+
		'					<attributes>\n';
		
		var symbolName = _parentIndexArray[i].symbolName;
		var childSymbolName = _parentIndexArray[i].childSymbolName;
		var layerData = _data[ symbolName ][_parentIndexArray[i].layerIndex];


		if(!childSymbolName){// && _data[ childSymbolName ][0][0].isBottom){
			var imgIndex = _parentIndexArray[i].imgIndex;
			fl.trace("imgIndex="+imgIndex+"/i="+i+"/len="+_parentIndexArray.length);
			s = s+ 
			'						<attribute tag="CELL">\n'+
			'							<key time="0">\n'+
			'								<value>\n'+
			'									<mapId>' + (imgIndex==undefined ? 1 : imgIndex) + '</mapId>\n'+
			'									<name>NewCell</name>\n'+
			'								</value>\n'+
			'							</key>\n'+
			'						</attribute>\n';
		}
		
		s = s + 
		getElement(layerData, "POSX")+
		getElement(layerData, "POSY")+
		getElement(layerData, "ROTZ")+
		getElement(layerData, "SCLX")+
		getElement(layerData, "SCLY")+
		getElement(layerData, "FLPH")+
		getElement(layerData, "FLPV")+
		getElement(layerData, "PVTX")+
		getElement(layerData, "PVTY")+
		getElement(layerData, "ALPH")+
		'						<attribute tag="HIDE">\n'+
		'							<key time="0">\n'+
		'								<value>0</value>\n'+
		'							</key>\n'+
		'						</attribute>\n'+
		"					</attributes>\n"+
		"				</partAnime>\n";
	}

s = s + <><![CDATA[			</partAnimes>
		</anime>
	</animeList>
</SpriteStudioAnimePack>
]]></>;
	
	FLfile.write(_animefilePath, s);
}

function checkSameValueTimeline(a, type){
	var preb;
	for(var i=0; i<a.length; i++){
		var time = a[i].frame;
		var v = getElementValue(a, i, type);
		
		if(i > 0 && preb != v){
			return false;
		}else if(i == a.length -1){
			return true;
		}
		preb = v;
	}
	
	return false;
}

function getElementValue(a, i, type){
	var v;
	if     (type=="POSX") v = a[i].x;
	else if(type=="POSY") v = a[i].y;
	else if(type=="SCLX") v = a[i].sx;
	else if(type=="SCLY") v = a[i].sy;
	else if(type=="ALPH") v = a[i].a;
	else if(type=="ROTZ") v = a[i].r;
	else if(type=="PVTX") v = a[i].px;
	else if(type=="PVTY") v = a[i].py;
	else if(type=="FLPH") v = a[i].FLPH;
	else if(type=="FLPV") v = a[i].FLPV;
	
	return v;
}

function getElement(a, type){
	var isSame = checkSameValueTimeline(a, type);
	
	var s = '						<attribute tag="'+type+'">\n';
	if(isSame){
		s = s + '								<key time="0" ipType="linear">\n'+
				'									<value>'+getElementValue(a, 0, type)+'</value>\n'+
				'								</key>\n';
	}else if(a.length){
		for(var i=0; i<a.length; i++){
			var time = a[i].frame;
			var v = getElementValue(a, i, type);
			var ipType = a[i].ipType;
			
			s = s + '							<key time="' + time + '" ipType="'+ipType+'">\n'+
					'								<value>'+ v +'</value>\n'+
					'							</key>\n';
		}
	}else{
			s = s + '								<key time="0" ipType="linear">\n'+
					'									<value>0</value>\n'+
					'								</key>\n';
	}
	s = s + '						</attribute>\n';
	return s;
}

function getStageSetting(_fps, _frameCount, _canvasSize, _bgColor){
	var s = ""+

"	<settings>\n"+
"		<fps>" + _fps + "</fps>\n"+
"		<frameCount>" + _frameCount + "</frameCount>\n"+
"		<sortMode>prio</sortMode>\n"+
"		<canvasSize>" + _canvasSize + "</canvasSize>\n"+
"		<pivot>0 0</pivot>\n"+
"		<bgColor>FF" + _bgColor + "</bgColor>\n"+
"		<gridSize>32</gridSize>\n"+
"		<gridColor>FF808080</gridColor>\n"+
"	</settings>\n";
	
	return s;
}










