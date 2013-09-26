
function exportProjectFile(_projfilePath, _id, _fps, _frameCount, _canvasSize, _projectBgColor, 
					_sceneFileNameArray, _animeFileNameArray, _lastAnimeFileName){

	var s = '<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n'+
'<SpriteStudioProject version="1.00.00">\n'+
'	<name>' + _id + '</name>'+<><![CDATA[
	<exportPath></exportPath>
	<settings>
		<animeBaseDirectory></animeBaseDirectory>
		<cellMapBaseDirectory></cellMapBaseDirectory>
		<imageBaseDirectory></imageBaseDirectory>
		<exportBaseDirectory>Export</exportBaseDirectory>
		<queryExportBaseDirectory>1</queryExportBaseDirectory>
		<ssaxImport>
			<convertImageOffsetToCellAnime>0</convertImageOffsetToCellAnime>
			<ignorePivotAsCellRegister>1</ignorePivotAsCellRegister>
		</ssaxImport>
		<copyWhenImportImageIsOutside>1</copyWhenImportImageIsOutside>
		<exportAnimeFileFormat>SSAX</exportAnimeFileFormat>
		<exportCellMapFileFormat></exportCellMapFileFormat>
		<exportCellMap>0</exportCellMap>
		<copyImageWhenExportCellmap>1</copyImageWhenExportCellmap>
		<ssaxExport>
			<addAnimeNameEvenIfSingle>1</addAnimeNameEvenIfSingle>
			<listAllCellMaps>1</listAllCellMaps>
			<connectAnimations>0</connectAnimations>
			<zRotCurveParamAsRadian>1</zRotCurveParamAsRadian>
		</ssaxExport>
		<player>any</player>
		<strictVer4>1</strictVer4>
		<availableAttributes>
			<item>CELL</item>
			<item>POSX</item>
			<item>POSY</item>
			<item>ROTZ</item>
			<item>SCLX</item>
			<item>SCLY</item>
			<item>ALPH</item>
			<item>PRIO</item>
			<item>FLPH</item>
			<item>FLPV</item>
			<item>HIDE</item>
			<item>VCOL</item>
			<item>VERT</item>
			<item>PVTX</item>
			<item>PVTY</item>
			<item>SIZX</item>
			<item>SIZY</item>
			<item>IFLH</item>
			<item>IFLV</item>
			<item>USER</item>
		</availableAttributes>
		<defaultSetAttributes>
			<item>POSX</item>
			<item>POSY</item>
			<item>ROTZ</item>
			<item>FLPH</item>
			<item>FLPV</item>
			<item>PVTX</item>
			<item>PVTY</item>
			<item>HIDE</item>
		</defaultSetAttributes>
		<wrapMode>clamp</wrapMode>
		<filterMode>linear</filterMode>
	</settings>
	<animeSettings>
]]></>+
'		<fps>' + _fps + '</fps>\n'+
'		<frameCount>' + _frameCount + '</frameCount>\n'+
'		<sortMode>prio</sortMode>\n'+
'		<canvasSize>' + _canvasSize + '</canvasSize>\n'+
'		<pivot>0 0</pivot>\n'+
'		<bgColor>FF' + _projectBgColor + '</bgColor>\n'+ //FF323232
'		<gridSize>32</gridSize>\n'+
'		<gridColor>FF808080</gridColor>\n'+
'	</animeSettings>\n'+
'	<texPackSettings>\n'+
'		<maxSize>4096 4096</maxSize>\n'+
'		<forcePo2>1</forcePo2>\n'+
'		<forceSquare>0</forceSquare>\n'+
'		<margin>0</margin>\n'+
'		<padding>1</padding>\n'+
'	</texPackSettings>\n';

	if(_sceneFileNameArray && _sceneFileNameArray.length){
		s = s + '	<cellmapNames>\n';
		
		for(var i=0; i<_sceneFileNameArray.length; i++){
			s = s + '		<value>' + _sceneFileNameArray[i] +  '</value>\n';
		}
		
		s = s + '	</cellmapNames>\n';
	}

	if(_animeFileNameArray && _animeFileNameArray.length){
		s = s + '	<animepackNames>\n';
		
		for(var i=0; i<_animeFileNameArray.length; i++){
			s = s + '		<value>' + _animeFileNameArray[i] + '</value>\n';
		}
		
		s = s + 
		'	</animepackNames>\n'+
		'	<lastAnimeFile>' + _lastAnimeFileName + '</lastAnimeFile>\n'+
		'	<lastAnimeName>root</lastAnimeName>\n'+
		'	<lastPart>root</lastPart>\n';
	}

	s = s + '</SpriteStudioProject>';
	
	FLfile.write(_projfilePath, s);
}


