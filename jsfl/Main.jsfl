
// plz change target fla name.
var _fla = "";//"Interpolation_decel.fla";//"Interpolation_base.fla";//"Parent_basic.fla";//"Anchor.fla";//"PivotTest.fla";//"PivotTest.fla";//"Parent_basic.fla";//"parentTest.fla";//"Overlap_base.fla";//

var _w;
var _h;
var _w2;
var _h2;

var _id;//  = _fla.substr(0, _fla.length - 4);
var _fps;// = 60;
var _frameCount;// = 10;
var _canvasSize;// = "400 300";
var _projectBgColor;// = "33FF33";

var _parentPath = fl.scriptURI.substr(0, fl.scriptURI.lastIndexOf("/") + 1);

var _projfilePath;//  = _parentPath + _id + ".sspj";
var _animefileName;// = _id + ".ssax";
var _animefilePath;// = _parentPath + _animefileName;
var _imgfilePath;//   = _parentPath + _id + ".png";

var _sceneFileNameArray = [];
var _animeFileNameArray;// = [ _animefileName ];

var _lastAnimeFileName;// = (_animeFileNameArray && _animeFileNameArray.length) ? _animeFileNameArray[0] : "";

var _fl;// = fl.getDocumentDOM();
var _lib;// = _fl.library;
var _timeline;// = _fl.getTimeline();

var _data = {};
var _parentIndexArray = [];

init();

function init(){
	showFlaDialog();
}

function showFlaDialog(){
	var isOn = _fla = prompt("スクリプトと同一階層の、コンバート対象flaファイル名を入力してください。", _fla);
	if(isOn){
		_id  = _fla.substr(0, _fla.length - 4);
		_projfilePath  = _parentPath + _id + ".sspj";
		_animefileName = _id + ".ssae";
		_animefilePath = _parentPath + _animefileName;
		_imgfilePath   = _parentPath + _id + ".png";
		_animeFileNameArray = [ _animefileName ];
		_lastAnimeFileName = (_animeFileNameArray && _animeFileNameArray.length) ? _animeFileNameArray[0] : "";

		loadFla();
		saveSSFiles();
		_fl.close(false);
		alert("コンバート完了しました。\n\n"+_projfilePath);		
	}
}

function loadFla(){
	fl.openDocument(_parentPath + _fla);
	initCommonData();
}

function initCommonData(){
	_fl = fl.getDocumentDOM();
	_lib = _fl.library;
	_lib.editItem("root");
	_timeline = _fl.getTimeline();
	_timeline.currentFrame = 0;
	_timeline.currentLayer = 0;
	_w = _fl.width;
	_h = _fl.height;
	_w2 = Math.ceil(_w/2);
	_h2 = Math.ceil(_h/2);
	_canvasSize = _w + " " + _h;
	_projectBgColor = _fl.backgroundColor.substr(1).toUpperCase();
	_frameCount = _timeline.frameCount;
	_fps = _fl.frameRate
}

function saveSSFiles(){

	var imgData = [];
	var imgToIndexMap = {};

	fl.runScript(_parentPath + "LibImgExporter.jsfl", "saveLibImg", imgData, imgToIndexMap);

	_sceneFileNameArray = [];
	for(var i=0; i<imgData.length; i++){
		_sceneFileNameArray.push(imgData[i].name+".ssce");
	}

	fl.runScript(_parentPath + "CheckFlaData.jsfl", "checkAllLibItem", _fl, _data, _parentIndexArray, _w2, _h2, imgToIndexMap);

	fl.runScript(_parentPath + "ProjectFileExporter.jsfl", "exportProjectFile", 
				 _projfilePath, _id, _fps, _frameCount, _canvasSize, _projectBgColor, 
				 _sceneFileNameArray, _animeFileNameArray, _lastAnimeFileName);
	
	for(var i=0; i<imgData.length; i++){
		var _scenefilePath = _parentPath + _sceneFileNameArray[i];
		fl.runScript(_parentPath + "SceneFileExporter.jsfl"  , "exportSceneFile", _scenefilePath, imgData, i);
	}
	
	fl.runScript(_parentPath + "AnimeFileExporter.jsfl"  , "exportAnimeFile", 
				 _animefilePath, _data, _fps, _frameCount, _canvasSize, _projectBgColor, 
				 _sceneFileNameArray, _parentIndexArray, _w2, _h2);
	
}






