
var _parentPath = fl.scriptURI.substr(0, fl.scriptURI.lastIndexOf("/") + 1);

//saveLibImg();

function saveLibImg(imgData, imgToIndexMap){
	var imgIndex = 0;
	for(var i=0, items = fl.getDocumentDOM().library.items, il = items.length; i < il; i++){
		var item = items[i];
		if(item.itemType == "bitmap"){
			imgData.push({ name:item.name, w:item.hPixels, h:item.vPixels });
			imgToIndexMap[item.name] = imgIndex++;
			item.exportToFile(_parentPath + item.name);
		}
	}
}
