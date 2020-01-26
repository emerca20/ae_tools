//C:\Program Files\Adobe\Adobe After Effects CC 2018\Support Files
//https://adobeindd.com/view/publications/a0207571-ff5b-4bbf-a540-07079bd21d75/y2c4/publication-web-resources/pdf/scriptui-2-13-f-2017.pdf
//http://download.macromedia.com/pub/developer/aftereffects/scripting/JavaScript-Tools-Guide-CC.pdf
//https://blogs.adobe.com/creativecloud/files/2012/06/After-Effects-CS6-Scripting-Guide.pdf
//http://aesnippets.blogspot.com/2016/07/how-to-make-something-useful-in_72.html

(function (thisObj){
	buildUI(thisObj);	
	function buildUI(thisObj){
		var win = (thisObj instanceof Panel) ? thisObj : new Window('palette {text: "ae_spreadsheet", orientation: "column", alignChildren: ["fill", "fill"], resizeable: true}');
//-----START CODE-----//
		win.main = win.add('group {preferredSize: [600, 500], alignChildren: ["fill", "fill"]}');
			win.main.alignment = "left";
		var treePanel = win.main.add("treeview", undefined);
			treePanel.preferredSize.width = 250;
			treePanel.preferredSize.height = 400;

		var propPanel = win.main.add('group {alignment: ["fill", "top"], orientation: "stack"}');
				
		var stubs = [];
		var parentDirectory, compItem, preCompItem, layerItem, propGroupItem, curItem;
        
		for (var c = 1; c <= app.project.items.length; c++){
            n = 0;
            parentDirectory = treePanel;
            if(app.project.items[c].usedIn == 0 && app.project.items[c].typeName == "Composition"){
                stubs[n] = LoopThroughProjectBin(app.project.items[c]);
                n = n + 1;
                for(var l = 1; l <= app.project.items[c].layers.length; l++){
					stubs[n] = LoopThroughLayers(app.project.items[c].layers[l]);
                    n = n + 1;
                }//loopthrough all layers within the current 'composition.'
            }//check that the current composition is not a 'precomposition.'
        }//loop through all items within the 'Project Panel.'
            
		propPanel.add ("statictext", undefined, stubs[5]);
//propPanel.fillBrush = propPanel.graphics.newBrush(propPanel.graphics.BrushType.SOLID_COLOR, [0,1,0]);
//propPanel.onDraw = customDraw;
//------END CODE------//
function LoopThroughProjectBin(currentProjectBinItem){
    if(currentProjectBinItem.usedIn == 0){
        compItem = parentDirectory.add('node', currentProjectBinItem);
        compItem.image = File ("./PNG/SP_AeCompositions_Sm_N_D.png");
        compItem.text = currentProjectBinItem.name;
		parentDirectory = compItem;
    }else{
        preCompItem = compItem.add('node', currentProjectBinItem);
        preCompItem.text = currentProjectBinItem.name;
        preCompItem.image = File ("./PNG/SP_AeCompositions_Sm_N_D.png");
        for(var l = 1; l <= currentProjectBinItem.layers.length; l++){
			parentDirectory = preCompItem;
			stubs[n] = LoopThroughLayers(currentProjectBinItem.layers[l]);
            n = n + 1;
        }
    }
return compItem;
}
//----START LoopThroughLayers()----
function LoopThroughLayers(currentLayer){
    if(currentLayer.source instanceof CompItem){
        stubs[n] = layerItem = LoopThroughProjectBin(currentLayer.source);
    }else if(currentLayer.source instanceof FootageItem){
        layerItem = parentDirectory.add('node', currentLayer);
        layerItem.text = currentLayer.name;
        layerItem.image = File ("./PNG/SP_Solid_Sm_N_D.png");
    }else if(currentLayer.property("Text") != null){
        layerItem = parentDirectory.add('node', currentLayer);
        layerItem.text = currentLayer.name;
        layerItem.image = File ("./PNG/SP_Text_Sm_N_D.png");
    }else if(currentLayer.property("Contents") != null){
		layerItem = parentDirectory.add('node', currentLayer);
		layerItem.text = currentLayer.name;
		layerItem.image = File ("./PNG/SP_Shape_Sm_N_D.png");
		parentDirectory = layerItem;
		for(var s = 1; s <= currentLayer.property("Contents").numProperties; s++){
			//if(currentLayer.property("Contents").property(s).property(1).name == "Path"){
				propGroupItem = LoopThroughShapeLayerContents(currentLayer.property("ADBE Root Vectors Group").property(s));
			//}
		}
    }else{
        layerItem = parentDirectory.add('node', currentLayer);
        layerItem.text = currentLayer.name;
    }
return layerItem;
}//-----END LoopThroughLayers()-----
//----START LoopThroughShapeLayerContents()----
function LoopThroughShapeLayerContents(currentLayer){
	if(currentLayer.property(2).property("ADBE Vector Shape - Rect") != null ){
		propGroupItem = parentDirectory.add('node', currentLayer);
		propGroupItem.text = currentLayer.name;
	}else if(currentLayer.property(2).property("ADBE Vector Shape - Ellipse") != null ){
		propGroupItem = parentDirectory.add('node', currentLayer);
		propGroupItem.text = currentLayer.name;
	}else if(currentLayer.property(2).property("ADBE Vector Shape - Star") != null ){
		propGroupItem = parentDirectory.add('node', currentLayer);
		propGroupItem.text = currentLayer.name;
	}else if(currentLayer.property(2).property("ADBE Vector Shape - Group") != null ){
		propGroupItem = parentDirectory.add('node', currentLayer);
		propGroupItem.text = currentLayer.name;
	}
}//-----END LoopThroughShapeLayerContents()-----
//----START customDraw()----
function customDraw(){   
    with( this ) {  
        graphics.drawOSControl();  
        graphics.rectPath(0,0,10,10);  
        graphics.fillPath(fillBrush);  
    }
} //-----END customDraw()-----

        win.onResizing = win.onResize = function() {  
            this.layout.resize();  
        };  
        if(win instanceof Window){  
            win.center();  
            win.show();  
        }else{  
            win.layout.layout(true);  
            win.layout.resize();  
        }  
	}
})(this);
/*

var myPanel = new Window('palette {text: "ae_spreadsheet", orientation: "column", alignChildren: ["fill", "fill"]}');
myPanel.main = myPanel.add('group {preferredSize: [600, 500], alignChildren: ["left", "fill"]}');

var tree = myPanel.main.add('treeview', undefined);
tree.preferredSize.width = 250; 
			
var temp_compItem, temp_layerItem, temp_maskItem, temp_effectItem, temp_propertyItem;
        
//-----------------------------------------------------
//https://forums.adobe.com/thread/572785
function customDraw(){   
    with( this ) {  
graphics.drawOSControl();  
graphics.rectPath(0,0,10,10);  
graphics.fillPath(fillBrush);  
}} 
myPanel.tabGroup = myPanel.main.add('group {alignment: ["fill", "fill"], orientation: "stack"}');
myPanel.tabGroup.fillBrush = myPanel.tabGroup.graphics.newBrush(myPanel.tabGroup.graphics.BrushType.SOLID_COLOR, [0,1,0]);
myPanel.tabGroup.onDraw = customDraw;
//----------------------------------------------------


	

		
        for (var c = 1; c <= app.project.items.length; c++){
            if(app.project.items[c].typeName == "Composition" && app.project.items[c].usedIn.length == 0){
               temp_compItem = tree.add('node', app.project.items[c]);
               temp_compItem.image = File ("./PNG/SP_AeCompositions_Sm_N_D.png");
               temp_compItem.text = app.project.items[c].name;               
               for(var l = 1; l <= app.project.items[c].layers.length; l++){
                    if(app.project.items[c].layers[l].property("Text") != null){
                        temp_layerItem = temp_compItem.add('node', app.project.items[c].layers[l]);
						temp_layerItem.text = app.project.items[c].layers[l].name;
                        temp_layerItem.image = File ("./PNG/SP_Text_Sm_N_D.png");//check if layer is a Text Layer
                    }else if(app.project.items[c].layers[l].property("Contents") != null){
                        temp_layerItem = temp_compItem.add('node', app.project.items[c].layers[l]);
						temp_layerItem.text = app.project.items[c].layers[l].name;
                        temp_layerItem.image = File ("./PNG/SP_AeCompositions_Sm_N_D.png");//check if layer is a Shape Layer
                    }else{
                        temp_layerItem = temp_compItem.add('node', app.project.items[c].layers[l]);
						temp_layerItem.text = app.project.items[c].layers[l].name;
                        }
                    for(var g = 1; g <= app.project.items[c].layers[l].numProperties; g++){
                        for(var p = 1; p <= app.project.items[c].layers[l].property(g).numProperties; p++){
                            if(app.project.items[c].layers[l].property(g).name == "Masks"){
                                temp_propertyItem = temp_layerItem.add('node', app.project.items[c].layers[l].property(g).property(p));
								temp_propertyItem.text = app.project.items[c].layers[l].property(g).property(p).name;
                                temp_propertyItem.image = File ("./PNG/SP_TrackMatte_Sm_N_D.png");
                                }//check if property is a mask
                            if(app.project.items[c].layers[l].property(g).name == "Effects"){
                                temp_propertyItem = temp_layerItem.add('node', app.project.items[c].layers[l].property(g).property(p));
								temp_propertyItem.text = app.project.items[c].layers[l].property(g).property(p).name;
                                temp_propertyItem.image = File ("./PNG/SP_Effects_Xs_N_D.png");
                                }//check if property is an effect
                            }//loop through properties
                        }//loop through property groups
                    }//loop through layers
                }//check if item is a composition && check if item is not a precomposition
            }//loop through project bin

	myPanel.show();
*/