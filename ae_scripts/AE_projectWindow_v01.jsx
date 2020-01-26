//creates a variable 'projWindow' and stores the window object that is returned from running the 'create_projWindow()' function
var projWindow = create_projWindow();
//uses 'show()' to bring the 'projWindow' window object to screen.
projWindow.show();

function create_projWindow(){
	//initialzes a new window object of the type 'palette.'  'w' is a commonly used variable name for this purpose.
	var w = new Window('palette');
	
	var cwd_group = w.add("group");
	cwd_group.orientation = 'row';
	var cwd_staticText = cwd_group.add("statictext", undefined, "Current Working Directory:")
	var cwd_editText = cwd_group.add("edittext",  undefined);
	cwd_editText.text = 'Pathname goes here.'
	
	var bins = w.add("group");
	bins.orientation = 'column';
	bins.alignment = 'right';
	//adds a field to specifiy a bin for 'Composition Objects'
	var bins_comp = bins.add("group")
	bins_comp.orientation = 'row';
	bins_comp.alignment = 'right';
	var bins_comp_staticText = bins_comp.add("statictext", undefined, "Compositions:")
	var bins_comp_editText = bins_comp.add("edittext",  undefined);
	bins_comp_editText.text = "Comps bin here."
	//adds a field to specifiy a bin for 'Solid Objects'
	var bins_solid = bins.add("group")
	bins_solid.orientation = 'row';
	bins_solid.alignment = 'right';
	var bins_solid_staticText = bins_solid.add("statictext", undefined, "Solids:")
	var bins_solid_editText = bins_solid.add("edittext",  undefined);
	bins_solid_editText.text = "Solids bin here."
	//adds a field to specifiy a bin for Audio file formats
	var bins_audio = bins.add("group")
	bins_audio.orientation = 'row';
	bins_audio.alignment = 'right';
	var bins_audio_staticText = bins_audio.add("statictext", undefined, "Audio:")
	var bins_audio_editText = bins_audio.add("edittext",  undefined);
	bins_audio_editText.text = "Audio bin here."
	
	//returns the window object as a result of running the function, 'create_projWindow()'
	return w;
}