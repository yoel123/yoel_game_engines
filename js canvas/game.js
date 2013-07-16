var y$=function(id){return document.getElementById(id);};

Array.prototype.size = function () {
  var len = this.length ? --this.length : -1;
    for (var k in this)
      len++;
  return len;
}

var ytrace= function(bla){return console.log(bla);}

//prevent defult move

document.body.ontouchstart = function(e) {
    if (e && e.preventDefault) { e.preventDefault(); }
    if (e && e.stopPropagation) { e.stopPropagation(); }
    return false;
}

document.body.ontouchmove = function(e) {
    if (e && e.preventDefault) { e.preventDefault(); }
    if (e && e.stopPropagation) { e.stopPropagation(); }
    return false;
}

//end prevent defult move

////////////////////entity class//////////////////////////////////////////

var entity= function (x,y,speed,img,game_canvas)
{
	this.type="entity";
	
	this.x=x;
	this.y=y;
	this.z=0;
	
	/*this.collision_box_width=40;
	this.collision_box_height=40;*/
	this.collision_show=true;
	this.collision_rad=20;
	this.world =yoel_engine.prototype.get_world.call(this);
	var this_world = yoel_engine.prototype.get_world.call(this);
	this.speed=speed;
	this.img=img;
	
	this.game_canvas = this_world.y_game_canvas;
	
	
	if(this_world.y_game_canvas!=null)
	{
		this.game_canvas = this_world.y_game_canvas	;
		//alert(this.game_canvas);
	}

	this.ctx= this.game_canvas.getContext("2d");

	
	
};
entity_p =entity.prototype;
entity.prototype.init=function()
{
	//console.log("created");
	entity.prototype.render.call(this);
}
entity.prototype.update=function()
{
	
	//y_text(10,10,"text") 
	//draw img
	if(this.img !=null)
	{
		entity.prototype.y_draw_img.call(this);
	}
	
	//if debug mode is true
	if(yoel_engine.prototype.get_world.call(this).debug_mode)
	{ 
		
		entity.prototype.draw_collide_rad.call(this);	
	}
	//entity.prototype.render.call(this);
	
	//mouse cordenates
	//var m_cor = y_input.prototype.get_mouse_cor.call(this,this.game_canvas);
	//is mouse up
	//y_input.prototype.chack_mouse_down.call(this,this.game_canvas);
	//console.log(y_input.prototype.mousedown);
	this.ctx.restore();
}
entity.prototype.draw_collide_rad = function()
{
	var _cam_x=yoel_engine.prototype.camera.x;
	var _cam_y=yoel_engine.prototype.camera.y;
	var _cam_z=yoel_engine.prototype.camera.z;
	////end camera cordenates///
	this.ctx.beginPath();
	this.ctx.arc(this.x+_cam_x+10, this.y+_cam_y+10, this.collision_rad, 0, Math.PI*2, true); 
	this.ctx.strokeStyle = '#f00';
	this.ctx.stroke();
}//end draw collide rad
entity.prototype.y_draw_img=function(x,y,z,img)
{
	var camera_cord = yoel_engine.prototype.get_camera.call(this); 
			
	var camera_x = camera_cord[0];
			
	var camera_y = camera_cord[1];
	var camera_z = camera_cord[2];
	if(img==null){img=this.img;}
	if(x==null){x=this.x;}
	if(y==null){y=this.y;}
	
	this.ctx.drawImage(img,x+camera_x,y+camera_y,img.width,img.height);
}//end y_draw_img

entity.prototype.move_by=function(x,y,z,solid)
{
	this.x += x;
	this.y += y;
	this.z += z;
	
}

entity.prototype.rotate=function(angle)
{
	
		
	var rot =angle * Math.PI / 180;
	
	this.ctx.rotate(rot);
	 	
}

entity.prototype.colide=function(type)
{
	//chack if thers a current world
	if (!yoel_engine.prototype.get_world.call(this)) {return null};
	
	//yoel_engine get world
	var world = yoel_engine.prototype.get_world.call(this);
	
	//entity array from current world
	var entity_list = world.y_world_mc;
	
	//length of the array
	var entity_list_len = entity_list.length-1;
	
	//chach all entetis in array 
	for(var i = 0; entity_list_len>=i ; i++)
	{
		var entity_type = entity_list[i].type;
		//console.log(type+" = "+entity_type+i);
		if(type == entity_type)
		{
			var target = entity_list[i];
			
			//console.log(type+" = "+entity_type+i);
			
			// this entity cordenates
			var col_x = this.x;
			var col_y = this.y;
			
			//target collision cordenates
			var t_col_x = target.x;
			var t_col_y = target.y;
				//alert(col_x+" "+col_y+" "+t_col_x+" "+t_col_y)	
			var dx = col_x - t_col_x;
			var dy = col_y - t_col_y;
			var rad_dist = this.collision_rad+target.collision_rad;
			var rad_dist2 = rad_dist*rad_dist
			
			//draw collision circle 
			if(this.collision_show)
			{
				
				////camera cordenates///
				var _cam_x=yoel_engine.prototype.camera.x;
				var _cam_y=yoel_engine.prototype.camera.y;
				var _cam_z=yoel_engine.prototype.camera.z;
				////end camera cordenates///
				this.ctx.beginPath();
				this.ctx.arc(col_x+_cam_x+10, col_y+_cam_y+10, this.collision_rad, 0, Math.PI*2, true); 
				this.ctx.strokeStyle = '#f00';
				this.ctx.stroke();
				
			}//draw collision circle
			
			//collision chack
			var dop= dx*dx+dy*dy ;
			
			
			if(dop <= rad_dist2)
			{
				if(dx==0&&dy==0){
					return false;
				}
				//alert("hit"+i);
				/*//hit text
				this.ctx.fillStyle = '#f00';
				this.ctx.font = 'italic bold 15px sans-serif';
				this.ctx.textBaseline = 'bottom';
				this.ctx.fillText("hit"+col_y+" "+t_col_y, col_x, col_y);
				//this.speed=5;
				//target.speed=0;
				*/
				//ytrace(target);
				return target;
			}//end collision chack
			
			
		}//end if(type == entity_type
		
	}//end chach all entetis in array 
	return false;
}//end colide

entity.prototype.colide_point=function(targ_x,targ_y)
{
	//chack if thers a current world
	if (!yoel_engine.prototype.get_world.call(this)) {return null};
	
	//yoel_engine get world
	var world = yoel_engine.prototype.get_world.call(this);
	
	
			// this entity cordenates
			var col_x = this.x;
			var col_y = this.y;
			var rad = this.collision_rad;
			var targ_rad = 10;
			//alert(targ_y);
			targ_x-=50;
			targ_y-=50;
				//alert(col_x+" "+col_y+" "+t_col_x+" "+t_col_y)	
			var dx = col_x - targ_x ;
			var dy = col_y - targ_y;
			var rad_dist = this.collision_rad+targ_rad;
			var rad_dist2 = rad_dist*rad_dist
			
			//draw collision circle 
			
			/*	
				////camera cordenates///
				var _cam_x=yoel_engine.prototype.camera.x;
				var _cam_y=yoel_engine.prototype.camera.y;
				var _cam_z=yoel_engine.prototype.camera.z;
				////end camera cordenates///
				this.ctx.beginPath();
				this.ctx.arc(targ_x+_cam_x+10, targ_x+_cam_y+10,targ_rad, 0, Math.PI*2, true); 
				this.ctx.strokeStyle = '#f00';
				this.ctx.stroke();
			*/
			
			//collision chack
			var dop= dx*dx+dy*dy ;
			
			
			if(dop <= rad_dist2)
			{
				if(dx==0&&dy==0){
					return false;
				}
				//alert(dop +"<="+ rad_dist2);
				return true;
			}//end collision chack
			
			return false;
	


}//end colide point

entity.prototype.aded=function( target)
{
}//end aded
entity.prototype.removed=function( target)
{
}//end removed
entity.prototype.render=function( )
{
	//add camera vals
	var camera_cord = yoel_engine.prototype.get_camera.call(this); 
			
	var camera_x = camera_cord[0];
			
	var camera_y = camera_cord[1];
	var camera_z = camera_cord[2];
			
	this.x+=camera_x;
	this.y+=camera_y;
	this.z+=camera_z;
}//end render

entity.prototype.get_by_type = function(type)
{
	var world = yoel_engine.prototype.get_world.call(this);
	var length = world.y_world_mc.length;
	var entity_array = world.y_world_mc;
	
	var type_array=[];
	
	//places in array from 0 to...(fo returnd array)
	var array_pos=0;
	
	for(var i = 0; length> i ; i++)
	{
	
		var curent_entity = entity_array[i];
		//alert(curent_entity.type +" == "+ type)
		//console.log(curent_entity);
		//console.log(i);
		if(curent_entity.type == type)
		{
			
			type_array[array_pos] = entity_array[i];
			array_pos++;
		}
	}
	//alert(type_array)
	return type_array;
}//end get_by_type

entity.prototype.is_clicked = function()
{
		////////mouce click///////////
				if(y_input2.prototype.mouse_down){
					var mx = y_input2.prototype.mouse_cor.x ;
					var my = y_input2.prototype.mouse_cor.y  ;
					//ytrace(this.y+" "+this.x+" "+mx+" "+my);
					//ytrace(mx);
					//y_text(mx,my,"."+mx+" "+my)
					var hit_mouce = entity.prototype.colide_point.call(this,mx,my);
					//y_text(mx,my,hit_mouce);
					if(hit_mouce){return true;}
					return false;
				}
				////////end mouce click///////////
}//is_clicked
entity.prototype.is_clicked_box = function(width,height)
{
	//colide box
	y_rect(this.x,this.y,width,height,true);
	
	var camera_cord = yoel_engine.prototype.get_camera.call(this); 		
		var camera_x = camera_cord[0];		
		var camera_y = camera_cord[1];
		////////mouce click///////////
				if(y_input2.prototype.mouse_down)
				{
					var mx = y_input2.prototype.mouse_cor.x ;
					var my = y_input2.prototype.mouse_cor.y  ;
					//ytrace(this.y+" "+this.x+" "+mx+" "+my);
					//ytrace(mx);
					//y_text(mx,my,"."+mx+" "+my)
					var hit_mouce = entity.prototype.colide_point.call(this,mx,my);
					//y_text(mx,my,hit_mouce);
					
					if( mx < width+this.x+camera_x &&  mx > this.x+camera_x && my < height+this.y+camera_y && my > this.y+camera_y){/*ytrace(camera_y);*/ return true;}
					return false;
				 }
				////////end mouce click///////////
				return false;
}//is_clicked

entity.prototype.dragble = function(type)
{
	
	if(entity.prototype.is_clicked.call(this))
	{
		//alert(5);
		//
		this.x = y_input2.prototype.mouse_cor.x-50;
		this.y = y_input2.prototype.mouse_cor.y-50;
		//alert(this.x,this.y);
		//y_text(30,30,this.x+"/ "+this.y+entity.prototype.is_clicked.call(this))
		 
	}
}//end dragble
////////////////////end entity class//////////////////////////////////////////

//////////////////// world class//////////////////////////////////////////
var world= function (game_canvas)
{
	//get canvas element
	this.y_game_canvas= y$(game_canvas);
	
	
	//get canvas context
	this.ctx=this.y_game_canvas.getContext("2d");
	
	//array that holds all the worlds entitys
	this.y_world_mc = new Array();
	this.y_world_animation = new Array();
	this.y_world_animation[0] = "";  
	
	
	//this.y_world_mc[0]= new smily(19,0,10,enemyImage,"game_canvas");
	//this.y_world_mc[1]= new smily(1,0,5,enemyImage,"game_canvas");
	
	
	
}//end constractor
world.prototype.init=function()
{
}//end init
world.prototype.debug_mode=false;

world.prototype.update=function()
{
	
	
	this.erase_canvas();
	this.ctx.save();
	/////update entitys to world//
	this.y_world_mc=y_bubble_sort_depth(this.y_world_mc);
	//console.log(len);
	for(var i = 0, len =this.y_world_mc.length;len > i; i++ )
	{
		if(this.y_world_mc[i] != null )
		{
			
			this.y_world_mc[i].update();
			//console.log(typeof this.y_world_mc[i]);
			this.ctx.globalAlpha = 1;
			
		}	
		
	}
	

	
	
	
	
	/////update animation to world//
		var len_anim =this.y_world_animation.length;
	
	for(var i = 1; len_anim > i; i++ )
	{
		if(this.y_world_animation[i] != null)
		{
			
				
			
				this.y_world_animation[i].do_animation();
			
				this.ctx.globalAlpha = 1;
				
		
		}	
	}

}//end update
world.prototype.erase_canvas=function()
{
 	this.y_game_canvas.width = 400; //this erases the contents of the canvas
}//end erase canvas

world.prototype.add = function(entity)
{
	this.y_world_mc[this.y_world_mc.length] = entity;
	//this.y_world_mc.length++;
	//alert(this.y_world_mc.length);
}//end add
world.prototype.remove = function(entity)
{
  var to_remove = this.y_world_mc.indexOf(entity);
  //this.y_world_mc.splice(to_remove, 1);
 // this.y_world_mc[to_remove] = null;
 //if(typeof  this.y_world_mc[to_remove].removed() != "undefined") {
 //this.y_world_mc[to_remove].removed();
 //}
  delete this.y_world_mc[to_remove];
 
}
////////////////////end world class//////////////////////////////////////////

////////////////////yoel engine class//////////////////////////////////////////
var yoel_engine= function ()
{
	var _world;
	var _game_loop=null;

	
}//end yoel engine

var yoel_engine_p = yoel_engine.prototype;

yoel_engine_p.game_loop =0;

yoel_engine.prototype.get_world = function () 
{
      return _world;
}//end get_world
yoel_engine.prototype.set_world = function (world) 
{
		if(yoel_engine_p.game_loop!=0){clearInterval(yoel_engine_p.game_loop);}
       _world=world;
	  // ytrace(_world);
}//end set_world

yoel_engine.prototype.camera = {x:0,y:0,z:1,f:1};

yoel_engine.prototype.framerate=0;

yoel_engine.prototype.set_camera = function (x,y,z,f) 
{
      yoel_engine.prototype.camera.x = x;
	  yoel_engine.prototype.camera.y = y;
	  yoel_engine.prototype.camera.z = z;
	   yoel_engine.prototype.camera.f = f;
	   
}//end set_camera

yoel_engine.prototype.init = function (framerate) 
{
	yoel_engine.prototype.set_camera.call(this,50,50,1,2);
	//alert(_world)
	//console.log(this.y_world_mc.length);
	
	yoel_engine_p.game_loop = setInterval(_world.update.bind(_world),1000/framerate);
	yoel_engine.prototype.framerate=framerate;
}//end init

yoel_engine.prototype.change_framerate = function (framerate) 
{
	clearInterval(yoel_engine_p.game_loop);
	_game_loop = setInterval(_world.update.bind(_world),1000/framerate);
	yoel_engine.prototype.framerate=framerate;
}

yoel_engine.prototype.get_camera = function () 
{
	  var _camera_x=yoel_engine.prototype.camera.x;
	  var _camera_y=yoel_engine.prototype.camera.y;
	  var _camera_z=yoel_engine.prototype.camera.z;
	  var _camera_f=yoel_engine.prototype.camera.f;
      return [_camera_x,_camera_y,_camera_z,_camera_f];
}//end get_camera
	
////////////////////end yoel engine class//////////////////////////////////////////

////////////////////yoel point class//////////////////////////////////////////

function y_Point(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}   //end constructor
////////////////////end yoel point class//////////////////////////////////////////
//////////////////// y_input2 class//////////////////////////////////////////
var y_input2= function ()
{
	this.mouse_x_cor=0;
	this.mouse_y_cor=0;
}

//y_input2.prototype.this_world = yoel_engine.prototype.get_world.call(this);
//y_input2.prototype.canvas = y_input2.prototype.this_world.y_game_canvas;
y_input2.prototype.mouse_down = false;
y_input2.prototype.mouse_up = true;
y_input2.prototype.mouse_cor = {x:0,y:0};
y_input2.prototype.key_down =  [];

y_input2.prototype.is_down = function(keyCode)
{
	if(y_input2.prototype.key_down[keyCode]==null ){return false;}
    return y_input2.prototype.key_down[keyCode];
}//end is_down


//mouseup
window.addEventListener("mouseup", function(mouseEvent){y_input2.prototype.mouse_down = false;
y_input2.prototype.mouse_up = true;
	var mouse_x_cor = mouseEvent.offsetX;
   		var mouse_y_cor = mouseEvent.offsetY;
		
		y_input2.prototype.mouse_cor.x = mouse_x_cor;
		y_input2.prototype.mouse_cor.y = mouse_y_cor;
//window.removeEventListener("mouseup", arguments.callee, false);
});

//mousedown
window.addEventListener("mousedown", function(mouseEvent)
{
	  y_input2.prototype.mouse_down = true;
	  y_input2.prototype.mouse_up = false;
	var mouse_x_cor = mouseEvent.offsetX;
   		var mouse_y_cor = mouseEvent.offsetY;
		
		y_input2.prototype.mouse_cor.x = mouse_x_cor;
		y_input2.prototype.mouse_cor.y = mouse_y_cor;
//window.removeEventListener("mousedown", arguments.callee, false);
});

//touchstart
window.addEventListener("touchstart", function(e)
{
	e.preventDefault();
	var touch = e.touches[0]; // Get the information for finger #1
       
 	//get xy cor
	
	var x = touch.pageX ;
    var y = touch.pageY;
	//alert(x+" "+y);
	y_input2.prototype.mouse_cor.x = x;
	y_input2.prototype.mouse_cor.y = y;
	
	y_input2.prototype.mouse_down = true;
	y_input2.prototype.mouse_up = false;
	
	
	
	return false;


});

window.addEventListener("touchmove", function(e)
{
	e.preventDefault();
	var touch = e.touches[0]; // Get the information for finger #1
       
 	//get xy cor
	
	var x = e.changedTouches[0].pageX;  
	var y = e.changedTouches[0].pageY;
	//alert(x+" "+y);
	y_input2.prototype.mouse_cor.x = x;
	y_input2.prototype.mouse_cor.y = y;
	
	y_input2.prototype.mouse_down = true;
	y_input2.prototype.mouse_up = false;
	
	
	return false;
});

////mousedown
window.addEventListener("touchend", function(e)
{
	e.preventDefault();
	var touch = e.touches[0]; // Get the information for finger #1
       
 	//get xy cor
	
	var x = touch.pageX ;
    var y = touch.pageY;
	//alert(x+" "+y);
	y_input2.prototype.mouse_cor.x = x;
	y_input2.prototype.mouse_cor.y = y;
	
	y_input2.prototype.mouse_down = false;
	y_input2.prototype.mouse_up = true;
	
	return false;
});

//keydown
window.addEventListener("keydown", function(event)
{
y_input2.prototype.key_down[event.keyCode] = true;
//window.removeEventListener("mousedown", arguments.callee, false);
});

//keyup
window.addEventListener("keyup", function(event)
{
y_input2.prototype.key_down[event.keyCode] = false;
//window.removeEventListener("mousedown", arguments.callee, false);
});

//mousemove
window.addEventListener("mousemove", function (mouseEvent){
		
		var mouse_x_cor = mouseEvent.offsetX;
   		var mouse_y_cor = mouseEvent.offsetY;
		
		y_input2.prototype.mouse_cor.x = mouse_x_cor;
		y_input2.prototype.mouse_cor.y = mouse_y_cor;
	});
//keydown keyup

////////////////////end y_input2 class//////////////////////////////////////////
//////////////////// y_input class//////////////////////////////////////////
/*var y_input= function ()
{
	this.mouse_x_cor=0;
	this.mouse_y_cor=0;
}

y_input.prototype.get_mouse_cor = function () 
{
	this.mouse_x_cor =0;
	var mouse_y_cor=0;
	
	var this_world = yoel_engine.prototype.get_world.call(this);
	if(this_world.y_game_canvas!=null)
	{
		var canvas = this_world.y_game_canvas;
		//alert(this.game_canvas);
	}
	//alert(canvas);
	canvas.addEventListener("mousemove", function (mouseEvent){
		var mouse_x_cor = mouseEvent.offsetX;
   		var mouse_y_cor = mouseEvent.offsetY;
		//y_input.prototype.set_mouse_cor.mouse_x_cor,mouse_y_cor);
		y_input.prototype.mouse_cor.x=mouse_x_cor;
		y_input.prototype.mouse_cor.y=mouse_y_cor;
		
		//MAKE STUFF FASTER PREVENT MEMORY LEAK THING
		canvas.removeEventListener("mousemove", arguments.callee, false);
		
	});
	
	
	var x_cor=y_input.prototype.mouse_cor.x;
	var y_cor=y_input.prototype.mouse_cor.y;
	
	return {"x": x_cor , "y": y_cor};
}//end mouse_cor

y_input.prototype.chack_mouse_down = function () 
{

	var this_world = yoel_engine.prototype.get_world.call(this);
	if(this_world.y_game_canvas!=null)
	{
		var canvas = this_world.y_game_canvas;
		//alert(this.game_canvas);
	}

	canvas.addEventListener("mouseup", function(mouseEvent){
		y_input.prototype.mousedown = true;
		canvas.removeEventListener("mouseup", arguments.callee, false);
	});
	
	canvas.addEventListener('touchstart', function(e) {
		e.preventDefault();
		y_input.prototype.mousedown = true;
		var touch = e.touches[0]; // Get the information for finger #1
        //get xy cor
		var x = touch.pageX - canvas.offsetLeft;
        var y = touch.pageY - canvas.offsetTop;
		
		//insert xy vals to ststic var
		y_input.prototype.mouse_cor.y=y;
		y_input.prototype.mouse_cor.x=y;
		
		//y_text(x,y,"diydy");
		//alert(touch+" "+x+" "+y);
		canvas.removeEventListener("touchstart", arguments.callee, false);
	});
	
	
	canvas.addEventListener('touchend', function(e) {
		e.preventDefault();
		y_input.prototype.mousedown = true;
		var touch = e.touches[0]; // Get the information for finger #1
        var x = touch.pageX - canvas.offsetLeft;
        var y = touch.pageY - canvas.offsetTop;
		y_input.prototype.mouse_cor.y=y;
		y_input.prototype.mouse_cor.x=y;
		alert("end");
		canvas.removeEventListener("touchend", arguments.callee, false);
	});
	canvas.addEventListener("mousedown", function(mouseEvent){
		y_input.prototype.mousedown = false;
		canvas.removeEventListener("mousedown", arguments.callee, false);
	});
	

	
//test_anim(canvas,spriteImage);



	//var bla=y_input.prototype.chack (y_key.up);

}//end is_mouse_down


y_input.prototype.chack = function (key,canvas) 
{
	
	//38 up |40 down| 39 left | right 37 | space 32 | 
	
	//insert key code to array dinamicly

	//if its unudetfid so the key wasent pressed yet so its false
	if(y_input.prototype.key_down_cack[key] == undefined)
	{
		y_input.prototype.key_down_cack[key] = false;	
	}
	
	//if the key is down change its place in array to true

	window.addEventListener("keydown",function(event)
	{
	//alert("click");
		
		if(event.keyCode == key){y_input.prototype.key_down_cack[key] = true;}
		window.removeEventListener("keydown", arguments.callee, false);
		
	});
	

	
	//if the key is up change its place in array to false
	window.addEventListener("keyup" ,function(event)
	{
		if(event.keyCode == key){y_input.prototype.key_down_cack[key] = false;}
		 window.removeEventListener("keyup", arguments.callee, false);
	});
	
	//return the key state from array
	
	return y_input.prototype.key_down_cack[key] ;
}//end chack

//static vars
y_input.prototype.mouse_cor =  {x:0,y:0};

y_input.prototype.mousedown =  false;
y_input.prototype.key_down_cack =  [];
*/


y_key =  
{

 up: 38,
 down:40,
 left:37,
 right:39,
 
 ENTER:13,
 CONTROL:17,
 SPACE:32,
 SHIFT:16,

 CAPS_LOCK:20,
 DELETE:46,
 END:35,
 ESCAPE:27,
 HOME:36,
 INSERT:45,
 TAB:9,
 PAGE_DOWN:34,
 PAGE_UP:33,
 LEFT_SQUARE_BRACKET:219,
 RIGHT_SQUARE_BRACKET:221,
 
 A:65,
 B:66,
 C:67,
 D:68,
 E:69,
 F:70,
 G:71,
 H:72,
 I:73,
 J:74,
 K:75,
 L:76,
 M:77,
 N:78,
 O:79,
 P:80,
 Q:81,
 R:82,
 S:83,
 T:84,
 U:85,
 V:86,
 W:87,
 X:88,
 Y:89,
 Z:90,
		
 DIGIT_0:48,
 DIGIT_1:49,
 DIGIT_2:50,
 DIGIT_3:51,
 DIGIT_4:52,
 DIGIT_5:53,
 DIGIT_6:54,
 DIGIT_7:55,
 DIGIT_8:56,
 DIGIT_9:57,

}//end key


////////////////////end y_input class//////////////////////////////////////////

////////////////////y_animation class//////////////////////////////////////////
var y_animation= function (name,img,width_hight,pos,frames,replay,framesize,add_world)
{

	var this_world = yoel_engine.prototype.get_world.call(this);
	var canvas = this_world.y_game_canvas;
	this.x=pos.x;
	this.y=pos.y;
	this.z=pos.z;
	
	this.framesize = framesize;
	this.name = name;
	this.img = img;
	//this.canvas = canvas;
	this.width_hight= width_hight;
	this.frames = frames;//array
	this.num_frames = frames.length;
	//this.framerate = framerate;
	this.replay = replay;
	this.curent_frame = 0;
	
	this.anim_intval;
	this.ctx = canvas.getContext("2d");
	
	this.playing = false;
	//add to world
	this.world = yoel_engine.prototype.get_world.call(this);
	this.world_animation_list = this.world.y_world_animation;
	//the length is ok as it is becuz the true length of 3 is two so no need to add1
	if(add_world)
	{	
		this.world_animation_list_len = this.world_animation_list.length;
		this.world_animation_list[this.world_animation_list_len]=this;
	}
	
}

y_animation.prototype.play = function()
{
	//this.anim_intval = setInterval(this.do_animation.bind(this),1000/this.framerate);
	this.playing = true;
}//end play

y_animation.prototype.stop = function()
{
	this.playing = false;
}//end stop

y_animation.prototype.do_animation = function()
{
	var camera_cord = yoel_engine.prototype.get_camera.call(this); 
			
	var camera_x = camera_cord[0];
			
	var camera_y = camera_cord[1];
	var camera_z = camera_cord[2];
	  //this.ctx.clearRect(0, 0, this.width_hight.x, this.width_hight.y);
//	this.ctx.drawImage(this.img, 0, this.width_hight.x * this.frames[this.curent_frame], this.width_hight.x,this.width_hight.y, this.x+camera_x, this.y+camera_y, this.width_hight.x, this.width_hight.y);

	this.ctx.drawImage(this.img,this.framesize*this.frames[this.curent_frame],0,this.width_hight.x,this.width_hight.y,this.x,this.y,this.width_hight.x,this.width_hight.y);

	//ytrace(this.frames[this.curent_frame] );
      
	  //stop
	  if(!this.playing){return;}
	  
	  if (this.curent_frame > this.num_frames-2) 
	  {
	  		if(!this.replay){
				//this.stop();
				this.curent_frame = this.num_frames-1;
			}else{
				this.curent_frame = 0;
			}
            
			
      } 
	  else 
	  {
       		this.curent_frame++;
      }   
	  this.ctx.restore();   
	 
}//end stop
y_animation.prototype.go_to_frame = function(frame)
{
	if(frame== this.frames.length)
	{
		frame--;	
	}
	this.curent_frame=frame;
	this.do_animation();
	this.stop();
}
/*
var farame=0;
function test_anim(canvas,img)
{
	
	var ctx=canvas.getContext("2d");
	 ctx.drawImage(img, 0, 100*farame,100,100,0,0,100,100 );
	 farame++;
	 if(farame>3){
	 	farame=0;
	 }
}*/
////////////////////end y_animation class//////////////////////////////////////////

////////////////////end y_sound class//////////////////////////////////////////

y_sound = function(sound,volume,loop)
{
	this.sound = sound;
	this.valume = volume;
	this.sound.loop = loop;
}

y_sound.prototype.init = function()
{
	this.sound.load();
	this.sound.volume = this.valume;	 
}//end init 

y_sound.prototype.play = function()
{
	this.sound.play();
}//end play

y_sound.prototype.pause = function()
{
	this.sound.pause();
}//end pause

/*
function test_sound()
{
		laser = new Audio("sound/laser.wav");
        laser.volume = .12;
        laser.load();
		laser.play();
		laser.loop=true;
		laser.pause();
		
}*/
////////////////////end y_sound class//////////////////////////////////////////

////////////////////text class//////////////////////////////////////////
function y_text(x,y,text,folow_cam,scale) 
{



	var this_world = yoel_engine.prototype.get_world.call(this);
	this.ctx = this_world.ctx;
	this.x=x;
	this.y=y;
	
	this.ctx.fillStyle = '#f00';
	this.ctx.textBaseline = 'bottom';
	
	if(scale == undefined)
	{
		this.ctx.font = 'italic bold 15px sans-serif';
	}else
	{
		this.ctx.font = 'italic bold '+scale+'px sans-serif';
	}
	
	if(folow_cam)
	{
		var camera_cord = yoel_engine.prototype.get_camera.call(this); 		
		var camera_x = camera_cord[0];		
		var camera_y = camera_cord[1];
		this.ctx.fillText(text, this.x+camera_x, this.y+camera_y);
	}
	else{
		this.ctx.fillText(text, this.x, this.y);
	}
	
}
/*
function y_text(context,x,y,text) {
context.fillStyle = '#f00';
context.font = 'italic bold 15px sans-serif';
context.textBaseline = 'bottom';
context.fillText(text, x, y);
}*/
////////////////////end text class//////////////////////////////////////////

////////////////////shapes class//////////////////////////////////////////

function y_rect(x,y,width,hight,folow_cam) 
{
	
	var this_world = yoel_engine.prototype.get_world.call(this);
	this.ctx = this_world.ctx;
	this.x=x;
	this.y=y;
	
	var ycts = this.ctx;
	ycts.beginPath();
	ycts.fillStyle = '#f00';
	ycts.strokeStyle = 'red';
	ycts.fill();
    ycts.lineWidth = 2;
	
	
	if(folow_cam)
	{
		var camera_cord = yoel_engine.prototype.get_camera.call(this); 		
		var camera_x = camera_cord[0];		
		var camera_y = camera_cord[1];
		ycts.rect(this.x+camera_x, this.y+camera_y, width, hight);
	}
	else{
		ycts.rect(this.x, this.y, width, hight);
	}
	ycts.stroke();
}//end rect

function y_tringle(x,y,width,hight,folow_cam) 
{	
	var this_world = yoel_engine.prototype.get_world.call(this);
	this.ctx = this_world.ctx;
	this.x=x;
	this.y=y;
	
	var ycts = this.ctx;
	ycts.beginPath();
	ycts.fillStyle = '#f00';
	ycts.strokeStyle = 'red';
    ycts.lineWidth = 2;
	if(folow_cam)
	{
		var camera_cord = yoel_engine.prototype.get_camera.call(this); 		
		var camera_x = camera_cord[0];		
		var camera_y = camera_cord[1];
		
		ycts.moveTo(this.x+camera_x, this.y+camera_y);
		ycts.lineTo(width+this.x+camera_x, hight+this.x+camera_x);
		ycts.lineTo(hight+this.x+camera_y, width+this.x+camera_x);
		ycts.lineTo(this.x+camera_x, this.y+camera_y); 	
	}
	else{
		///ycts.rect(this.x, this.y, width, hight);
		ycts.moveTo(this.x, this.y);
		ycts.lineTo(width, this.y);
		ycts.lineTo(this.x, hight);
		ycts.lineTo(this.x, this.y); 
	}
	
	//filll and draw sroke
	ycts.fill();
	ycts.stroke();
	ycts.closePath();
}//end y_tringle
////////////////////end shapes class//////////////////////////////////////////

////////////////////sort array of entitys  by depth////////////////////////////////

function y_bubble_sort(arr)
{
	var temp,last_depth;
	for(var i = 0, len =arr.length;len > i; i++ )
	{
		for(var j = 0, len =arr.length;len > j; j++ )
		{
			if(arr[j] > arr[j+1])
			 {
				 var temp= arr[j];
				 arr[j]=arr[j+1];
				 arr[j+1] = temp ;		
			}
		}	
	}
	
	return arr
}//end y_sort_arr


function y_bubble_sort_depth(arr)
{
	var temp,last_depth;
	for(var i = 0, len =arr.length;len > i; i++ )
	{
		for(var j = 0, len =arr.length-1;len > j; j++ )
		{
			//alert(arr[j].z+" "+arr[j].type);
			if(!arr[j] ==null)
			{
				if(arr[j].z > arr[j+1].z)
				 {
					 var temp= arr[j];
					 arr[j]=arr[j+1];
					 arr[j+1] = temp ;		
				}
			}
			
		}	
	}
	
	return arr
}//end y_sort_arr
/*
var testt= [9,2,3,1];
testt=y_bubble_sort(testt);
alert(testt);*/
/*
var testt= [function(){this.z=1;},function(){this.z=2;},function(){this.z=3;}];
alert(testt[1])
testt=y_bubble_sort_depth(testt);
alert(testt);*/
////////////////////end array of entitys  by depth////////////////////////////////

////////////3d to 2d func/////////////
function threedto2d(point,scale_add)
{
		var camera_cord = yoel_engine.prototype.get_camera.call(this); 
		
		//ytrace(point);
		point.x -= camera_cord[0];
		point.y -= camera_cord[1];
		point.z -= camera_cord[2];
		//3=f=focal
		if(point.z<0){point.z=2}//just in  case
		if(scale_add == undefined){scale=100}//just in  case
		var scale = camera_cord[3] / point.z;
		//alert(camera_cord[3] +"/" +point.z)
		var px = point.x * scale;
		var py = point.y * scale;
		//alert([px, py, scale]);
		return {x:px, y:py, s:scale*scale_add};

/* //OLD 3D
	 return {
			    x: point.x * Math.pow(2, point.z),
				y: point.y * Math.pow(2, point.z)
			};*/
}
////////////end 3d to 2d func/////////////

////////////tween class/////////////

y_tween = function()
{
	this.from = 0;
	this.to = 0;
	this.tweenTypes = 
	 {
	    'default': [1,2,3,4,5,6,7,8,9,10,9,8,7,6,5,4,3,2,1],
	    'blast': [12,12,11,10,10,9,8,7,6,5,4,3,2,1],
	    'linear': [10,10,10,10,10,10,10,10,10,10],
		'slow': [0.001,0.001,0.001,0.001,0.001,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1]
     }
	 this.selected_type = 0;
	 this.anim_delta = 0;
	 this.obj=0;
	 this.att="";
	 this.counter = 0;

	
}

y_tween.prototype.init = function(obj,att,from,to,type)
{
	this.from = from;
	this.to = to;
	if(type == null)
	{
		type = 'default';	
	}
	this.selected_type = this.tweenTypes[type];
	this.frames = [];
	this.new_frame = this.from;
	this.anim_delta = this.to - this.from;
	this.tween_amount = this.selected_type.length;
	this.obj = obj;
	this.att = att;
	//ytrace (this.obj[this.att]); 
}//end init

/*
tween.prototype.do_tween = function()
{
	for (var i=0, len=	this.tween_amount; i<len; i++)
	{
	
	  this.new_frame += (this.anim_delta*this.selected_type[i]/100);
	  
	  this.frames[i] = this.new_frame;
	  
	  alert(this.frames[i]);
	}
}*///end do_tween


y_tween.prototype.do_tween = function()
{
	if( this.counter >= this.tween_amount || this.obj[this.att] >= this.to ){return;}
	
	
		//delta = this.to - this.from;
	  this.new_frame += (this.anim_delta*this.selected_type[this.counter]/100);
	  
	  this.frames[this.counter] = this.new_frame;
	  this.obj[this.att] += this.new_frame
	  ytrace(  this.obj[this.att]);
	  ytrace(this.frames[this.counter]);
	  this.counter++;
	
	
}//end do_tween



////////////end tween class/////////////

////////////timer class/////////////

var y_timer = function(duration)
{
	this.duration = duration * yoel_engine.prototype.framerate;
	this.counter = 0;
	this.finished = false;
};

y_timer.prototype.update = function()
{
	this.counter++;
	if(this.counter >= this.duration){this.finished = true;}
};

////////////end timer class/////////////

//////////// ui btn class/////////////

var y_button =  function(x,y,text,img)
{
	entity.call(this,x,y,0,img);
	//this.func = func;
	
	this.text = text;
	this.text_x = 100;
	this.text_y = 20;
	
	this.released =false;
	this.clicked = false;
	this.click_catch = false;
	this.width =200;
	this.height =20;
	
	this.released_count = 0; 
	
	
	this.visble = true;
}
y_button_p = y_button.prototype;

y_button_p.update = function()
{
	
	
	this.click_do();
	
	//ytrace(y_input2.prototype.mouse_up && this.click_catch+ "|rel" );
	
	//ytrace(this.clicked);
	
	entity.prototype.update.call(this);
}//end update

y_button_p.click_do= function()
{
	
	
		//if(!this.clicked){this.click_catch = false;}
	if(this.clicked){this.click_catch = true;}
	//ytrace(this.released  );

	if(y_input2.prototype.mouse_up && this.click_catch  )
	{
	
		this.released = true;
		this.click_catch = false;
		this.released_count++;
		//ytrace(this.released_count)
	}else{this.released = false;}
	//if(this.released_count==1){this.released = true;}
	//if(this.released_count>1 || this.released_count==2){this.released_count=0;this.released = false;}
	if (this.visble == false){return};//if btn not active do nothing
	this.clicked =	entity.prototype.is_clicked_box.call(this,this.width,this.height);	
	y_text(this.x+this.text_x,this.y+this.text_y,this.text,true);
}

////////////end ui btn class/////////////

////////////////y_lexer/////////////////////////	

var y_lexer = function(text)
{
	this.words = text.split(/\s+/);
    this.next = 0;
    
};

lexer_p = y_lexer.prototype;

lexer_p.nextWord = function () 
{
	if (this.next >= this.words.length) return null;
	return this.words[this.next++];
}

lexer_p.currentWord = function () 
{
	if (this.next >= this.words.length) return null;
	return this.words[this.next];
}

lexer_p.y_is_white_space = function(test_char) 
{
    var white = new RegExp(/^\s$/);
    return white.test(test_char.charAt(0));
}

lexer_p.get_char_until= function(target,text) 
{
	//get all chars but not ^ target +greedy (whatshisname)
	var regex_prttern ="[^"+target+"]+"
	//ytrace(regex_prttern );
	var ymatch =text.match(new RegExp(regex_prttern)); 
	//ger first result
	return ymatch[0] ;
	
}
//ytrace( lexer_p.get_char_until("}","bla}"));

////////////////end y_lexer/////////////////////////
	
////////////////y_interpter/////////////////////////	

var y_interpter = function(text)
{
	this.dictionary = {};

	this.data_stack = [];
    this.compile_buffer = [];
	
    this.stack = this.data_stack; // Was: this.stack = [];
    this.immediate = false;//so i can run words that need to read forther like string or var
	
}

y_interpter_p = y_interpter.prototype;

//compile: takes a word and if its in dictionary pass its immediate bool to global immediate and return the scripts word function method from dictionary object
y_interpter_p.compile = function (word) 
{
        var word = word.toUpperCase();//ALL SCRIPT WORDS ARE IN UPER CASE
        var num_val = parseFloat(word);//if its a number
        if (this.dictionary[word]) {//if word is script in Dictionary
            this.immediate = this.dictionary[word].immediate;
            return this.dictionary[word];
        } else if (!isNaN(num_val)) {//if word is number
            return num_val;
        } else {
            throw "Unknown word"+ word;
        }
}

y_interpter_p.startCompiling = function () 
{
        this.stack = this.compile_buffer;
}

y_interpter_p.stopCompiling = function () 
{
        this.stack = this.data_stack;
}
        
y_interpter_p.isCompiling = function () 
{
        return this.stack == this.compile_buffer;
}


y_interpter_p.addWords = function (new_dict) {
        for (var word in new_dict)
            this.dictionary[word.toUpperCase()] = new_dict[word];
}

//run script
y_interpter_p.run = function(text)
{
	this.lexer = new y_lexer(text);
	var word;
    var num_val;
	
   while (word = this.lexer.nextWord()) 
   {
   	   word = this.compile(word);//handales words that need to do somthing
	   if (this.immediate) //if word needs to run now
	   {
           this.interpret(word); //chack if word is function
           this.immediate = false;//reset global immediate
       } else if (this.isCompiling()) //if compiling
	   {
            this.stack.push(word);
       } else  //none immdiate script words
	   {
            this.interpret(word);
       }
   }
		 
		 
	//delete lexer;
}//END RUN

//interpret : if word is a function execute it else push to stack (it might be a float or int)
y_interpter_p.interpret = function (word) {
        if (typeof (word) == 'function') {
            word(this);
        } else {
            this.stack.push(word);//in case its varible name etc
        }
}

y_interpter_p.define = function (word, code) 
{
        this.dictionary[word.toUpperCase()] = code;
}
 
y_interpter_p.makeVariable=function (terp) 
{
    var me = {value: 0};
	terp.stack.push(me);
    return function () { terp.stack.push(me); };
}


y_interpter_p.lookup = function (word) { return this.dictionary[word]; };

//creates a new function from a list of functions and returns it
y_interpter_p.makeWord= function (code) {
    return function (terp) 
	{
        var code_pointer = 0;
        while (code_pointer < code.length) {
            terp.interpret(code[code_pointer]);
            code_pointer ++;
        }
    };
}//end makeWord
////////////////end y_interpter/////////////////////////	

//////////////// ystore/////////////////////////	

var y_store = function(){};

y_store_p = y_store.prototype;

y_store_p.set = function(key,val)
{
	localStorage.setItem(key, JSON.stringify(val));
}//end set

y_store_p.get = function(key,val)
{
	result = localStorage.getItem(key);
	
	return JSON.parse(result);
}//end get
////////////////end ystore/////////////////////////	

			