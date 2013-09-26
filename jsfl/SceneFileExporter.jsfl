

function exportSceneFile(_scenefilePath, imgData, i){
	
	var name = imgData[i].name;
	var w = imgData[i].w;
	var h = imgData[i].h;
	var w_h = w + " " + h;
	
	var s = '<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n'+
'<SpriteStudioCellMap version="1.00.01">\n'+
'	<name>' + name + '</name>\n'+
'	<exportPath></exportPath>\n'+
'	<generator>FlashToSS5</generator>\n'+
'	<packed>1</packed>\n'+
'	<imagePath>' + name + '</imagePath>\n'+
'	<pixelSize>' + w_h + '</pixelSize>'+<><![CDATA[
	<overrideTexSettings>0</overrideTexSettings>
	<wrapMode>clamp</wrapMode>
	<filterMode>linear</filterMode>
	<imagePathAtImport></imagePathAtImport>
	<packInfoFilePath></packInfoFilePath>
	<texPackSettings>
		<maxSize>4096 4096</maxSize>
		<forcePo2>1</forcePo2>
		<forceSquare>0</forceSquare>
		<margin>0</margin>
		<padding>1</padding>
	</texPackSettings>
		<cells>
		<cell>
			<name>NewCell</name>
			<pos>0 0</pos>
			<size>]]></> + w_h + <><![CDATA[</size>
			<pivot>-0.5 0.5</pivot>
			<rotated>0</rotated>
			<orgImageName></orgImageName>
			<posStable>0</posStable>
		</cell>
	</cells>

</SpriteStudioCellMap>
]]></>;

	FLfile.write(_scenefilePath, s);
}
