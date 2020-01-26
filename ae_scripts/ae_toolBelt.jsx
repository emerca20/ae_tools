//C:\Program Files\Adobe\Adobe After Effects CC 2018\Support Files
//https://adobeindd.com/view/publications/a0207571-ff5b-4bbf-a540-07079bd21d75/y2c4/publication-web-resources/pdf/scriptui-2-13-f-2017.pdf
//http://download.macromedia.com/pub/developer/aftereffects/scripting/JavaScript-Tools-Guide-CC.pdf
//https://blogs.adobe.com/creativecloud/files/2012/06/After-Effects-CS6-Scripting-Guide.pdf
//http://aesnippets.blogspot.com/2016/07/how-to-make-something-useful-in_72.html
    var myPanel = new Window('palette {text: "ae_toolbelt", orientation: "column", alignChildren: ["fill", "fill"]}');
    myPanel.main = myPanel.add('group {preferredSize: [600, 500], alignChildren: ["left", "fill"]}');
    myPanel.stubs = myPanel.main.add('listbox', undefined, ['Inertial Bounce', 'Bounce Back', 'Wiggle', 'Loop Out', 'Squash and Stretch', 'Vibration']);
        myPanel.stubs.preferredSize.width = 150;
    myPanel.tabGroup = myPanel.main.add('group {alignment: ["fill", "fill"], orientation: "stack"}')
    
    myPanel.tabs = [];
        myPanel.tabs[0] = myPanel.tabGroup.add('group');
            //variables
            var var_inertialBounce = myPanel.tabs[0].add ('panel {text: "Variables", preferredSize: [-1, 80], alignChildren: "left"}');
            var IB_amp = var_inertialBounce.add('group');
                IB_amp.add('statictext {text: "Amplitude:"}'); 
                IB_amp.add('edittext {text: "0.1"}');
            var IB_freq = var_inertialBounce.add('group');
                IB_freq.add('statictext {text: "Frequency:"}');
                IB_freq.add('edittext {text: "2.0"}');
            var IB_decay = var_inertialBounce.add('group');
                IB_decay.add('statictext {text: "Decay:"}');
                IB_decay.add('edittext {text: "2.0"}');
            //code block
            var IB_code = myPanel.tabs[0].add('panel {preferredSize: [-1, 80], alignChildren: "left"}');
                    //format code here: https://www.freeformatter.com/javascript-escape.html#ad-output
                    IB_code.add("edittext", undefined, "amp = " + IB_amp.text + ";\r\nfreq = " +  IB_freq+ ";\r\ndecay = " +  IB_freq + ";\r\nn = 0;\r\ntime_max = 4;\r\n\r\nif (numKeys > 0){\r\n    n = nearestKey(time).index;\r\n    if (key(n).time > time){\r\n        n--;\r\n    }\r\n}\r\nif (n == 0){ \r\n    t = 0;\r\n}else{\r\n    t = time - key(n).time;\r\n}\r\nif (n > 0 && t < time_max){\r\n    v = velocityAtTime(key(n).time - thisComp.frameDuration\/10);\r\n    value + v*amp*Math.sin(freq*t*2*Math.PI)\/Math.exp(decay*t);\r\n}else{\r\nvalue;\r\n}", {multiline:true, readonly:true});
                    IB_code.visible = false;
                    IB_code.show();
            with (myPanel.tabs[0]) {
                with (add ('group {alignment: "center"}')) {
                    add ('button {text: "Apply Expression to Selection"}');
                }
            }
            //paste code into selected property
/*
            props = app.project.activeItem.selectedProperties;
            for (var i = 0; i < props.length; i++){
                if (props[i].canSetExpression){
                    props[i].expression =IB_code;
                    }
                }
*/
            




        myPanel.tabs[1] = myPanel.tabGroup.add ('group');
            var var_bounceBack = myPanel.tabs[1].add ('panel {text: "Variables", preferredSize: [-1, 80]}');
            var_bounceBack.add('edittext {text: "e:"}');
            var_bounceBack.add('edittext {text: "g:"}');
            var_bounceBack.add('edittext {text: "nMax:"}');
            
        myPanel.tabs[2] = myPanel.tabGroup.add ('group');
            var var_wiggle = myPanel.tabs[2].add ('panel {text: "Variables", preferredSize: [-1, 80]}');
            var_wiggle.add('statictext {text: "Frequency:"}');
            var_wiggle.add('statictext {text: "Amplitude:"}');
            
        myPanel.tabs[3] = myPanel.tabGroup.add ('group');
            myPanel.tabs[3].add ('panel {text: "Variables", preferredSize: [-1, 80]}');
            myPanel.tabs[3].add('statictext {text: "Loops out a single set of keyframes indefinately."}');
            
        myPanel.tabs[4] = myPanel.tabGroup.add ('group');
            var var_squashNstretch = myPanel.tabs[4].add ('panel {text: "Variables", preferredSize: [-1, 80]}');
            var_squashNstretch.add('statictext {text: "maxDev:"}');
            var_squashNstretch.add('statictext {text: "spd:"}');
            var_squashNstretch.add('statictext {text: "Decay:"}');
            
        myPanel.tabs[5] = myPanel.tabGroup.add ('group');
            var var_vibration = myPanel.tabs[5].add ('panel {text: "Variables", preferredSize: [-1, 80]}');
            var_vibration.add('statictext {text: "Frequency:"}');
            var_vibration.add('statictext {text: "Amplitude:"}');
          
            
    for (var i=0; i<myPanel.tabs.length; i++){
        myPanel.tabs[i].orientation = 'column';
        myPanel.tabs[i].alignChildren = 'fill';
        myPanel.tabs[i].alignment = ['fill', 'fill'];
        myPanel.tabs[i].visible = false;
        }
    
    myPanel.stubs.onChange = showTab;
    myPanel.onShow = function(){
        myPanel.stubs.selection = 0;
        showTab;
        }
    myPanel.show();
    
    function showTab() {
    if (myPanel.stubs.selection !== null) {
        for (var i = myPanel.tabs.length-1; i >= 0; i--) {
            myPanel.tabs[i].visible = false;
            }
        myPanel.tabs[myPanel.stubs.selection.index].visible = true;
        }
    }
    
    
/*
    var myList = myPanel.add("listbox");
    myList.bounds = [10, 10, 200, 200 ];
    
    myList.add("item", 'Inertial Bounce');
    myList.add("item", 'Bounce Back');
    myList.add("item", 'Wiggle');
    myList.add("item", 'Wiggle (1 Dimension)');
    myList.add("item", 'Loop Out');
    myList.add("item", 'Squash and Stretch');
    myList.add("item", 'Vibration');
    
    var staticText_amp = myPanel.add ('statictext', [ 0, 0, 100, 120], 'Amplitude: ', {multiline: true});
    var staticText_freq = myPanel.add ('statictext', [0, 20, 100, 140], 'Frequency: ', {multiline: true});
    var staticText_decay = myPanel.add ('statictext', [0, 40, 100, 160], 'Decay: ', {multiline: true});
    
    
    myList.onDoubleClick = function(){
        if (myList.selection.text == "Wiggle"){
            selectedParameter = app.project.activeItem.selectedProperties;
            for (var i = 0; i < selectedParameter.length; i++){
                if (selectedParameter[i].canSetExpression){
                    selectedParameter[i].expression = "wiggle(2,2)";
                    }
                }
            }
        }
  */  

//C:\Program Files\Adobe\Adobe After Effects CC 2018\Support Files\Scripts\ScriptUI Panels
//After Effects > Windows > ae_toolBelt.jsx

/*
INERTIAL BOUNCE
amp = .1;
freq = 2.0;
decay = 2.0;
n = 0;
time_max = 4;

if (numKeys > 0){
    n = nearestKey(time).index;
    if (key(n).time > time){
        n--;
    }
}
if (n == 0){ 
    t = 0;
}else{
    t = time - key(n).time;
}
if (n > 0 && t < time_max){
    v = velocityAtTime(key(n).time - thisComp.frameDuration/10);
    value + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);
}else{
value;
}
*/

/*
BOUNCE BACK
e = .7;
g = 5000;
nMax = 9;

n = 0;
if (numKeys > 0){
  n = nearestKey(time).index;
  if (key(n).time > time) n--;
}
if (n > 0){
  t = time - key(n).time;
  v = -velocityAtTime(key(n).time - .001)*e;
  vl = length(v);
  if (value instanceof Array){
    vu = (vl > 0) ? normalize(v) : [0,0,0];
  }else{
    vu = (v < 0) ? -1 : 1;
  }
  tCur = 0;
  segDur = 2*vl/g;
  tNext = segDur;
  nb = 1; // number of bounces
  while (tNext < t && nb <= nMax){
    vl *= e;
    segDur *= e;
    tCur = tNext;
    tNext += segDur;
    nb++
  }
  if(nb <= nMax){
    delta = t - tCur;
    value +  vu*delta*(vl - g*delta/2);
  }else{
    value
  }
}else
  value
*/

/*
WIGGLE
wiggle( frequency , amount );
*/

/*
WIGGLE one dimension
w = wiggle(frequency , amount);
[w[0],value[1]]
*/

/*
LOOP OUT (loops a single set of keyframes infinitely)
loopOut("cycle", 0);
*/

/*
SQUASH AND STRETCH
maxDev = 13; // max deviation in pixels
spd = 30; //speed of oscillation
decay = 1.0; //how fast it slows down

t = time - inPoint;
x = scale[0] + maxDev*Math.sin(spd*t)/Math.exp(decay*t);
y = scale[0]*scale[1]/x;
[x,y]
*/

/*
VIBRATION
Amplitude = 50;
Frequency = 15;
x = Amplitude*Math.sin(time*2*Math.PI*Frequency);
value + [x,0]
*/