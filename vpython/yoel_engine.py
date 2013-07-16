from visual import *
from threading import *
import array
from random import *

###############set_interval##########################################

def set_intervalt(func, sec):
    def func_wrapper():
        func()
        set_interval(func, sec)
        
    t = Timer(sec, func_wrapper)
    t.start()
    return t

def set_interval( fps):
    while yoel_engine.game_loop:
      rate(fps)  
      yoel_engine.world.update()
    
###############end set_interval##########################################

###############y_engune##########################################


class yoel_engine:
    # attributes (properties)
    world = 0
  
    camera = {'x': 0 , 'y': 0 , 'z': 1 , 'f':1}
    framerate = 0
    
 
    # methods
    @staticmethod
    def get_world():
        return yoel_engine.world;
         #end get_world
    
    @staticmethod
    def set_world(world):
        yoel_engine.world = world
        #end set_world
        
    @staticmethod     
    def set_camera(self,x,y,z,f):
        self.camera['x'] = x
        self.camera['y'] = x
        self.camera['z'] = x
        self.camera['f'] = x
        #end set_camera
        
    @staticmethod
    def init(framerate):
            yoel_engine.scene.center =(yoel_engine.camera['x'],yoel_engine.camera['y'],yoel_engine.camera['z'] )
            if hasattr(yoel_engine.world, 'update'):
                yoel_engine.game_loop =True
                yoel_engine.game_loop = set_interval(framerate)
                
                #global game_loop
                game_loop = False
                #print yoel_engine.world 
           # self.set_camera = set_camera

        #end init
        
    @staticmethod
    def change_framerate(framerate):
            #end set_camera(50,50...)
            if hasattr(yoel_engine.world, 'update'):
                yoel_engine.game_loop = set_interval(yoel_engine.world.update,framerate)
            #self.set_camera = set_camera

        #end change_framerate
            
    @staticmethod         
    def get_camera(self,framerate):
            #end set_camera(50,50...)
            #end game loop = setintrval
            self.set_camera = set_camera

        #end get_camera
        
yoel_engine.game_loop =0
yoel_engine.world = 0
yoel_engine.camera = {'x': 0 , 'y': 0 , 'z': 1 , 'f':1}
yoel_engine.rot = {'x': 0 , 'y': 0 , 'z': -1 , 'f':1}
yoel_engine.framerate = 0

yoel_engine.scene = display(title='yoel engine',
     x=0, y=0, width=600, height=400,
     center=(0,0,0),up =(0,0,1),forward=(0,1,0) , background=(0,1,1))

yoel_engine.scene.autoscale =  False
yoel_engine.game_loop =True       
###############end y_engune##########################################

############### world ##########################################

class y_world:
    # attributes (properties)
    y_world_mc = []
    debug_mode = true
    current_scene = 1
    # methods
    
    #def __init__():
    #end __init__

    def update(self):
       
        for i in self.y_world_mc:
            if hasattr(i, 'update'):
                if i.scene == self.current_scene:
                    i.update()
                else:
                    i.grafic.visible  = False
                    #print 1
                    

        #update camera pos
        yoel_engine.scene.center =(yoel_engine.camera['x'],yoel_engine.camera['y'],yoel_engine.camera['z'] )
        #so it will work
        if yoel_engine.rot['x'] == 0:
            yoel_engine.rot['x'] =0.1
            
        #print yoel_engine.scene.forward
        #print yoel_engine.scene.center      
        yoel_engine.scene.forward =(yoel_engine.rot['x'],yoel_engine.rot['y'],yoel_engine.rot['z'] )
            #print #i
    #end update

    def add(self,entity):
       #place = int(self.y_world_mc.__len__())
       self.y_world_mc.append(entity)
       #print self.y_world_mc
    #end add

    def remove(self,entity):
       entity.removed()
       self.y_world_mc.remove(entity)
       
      
       #entity.colide_circle.visible  = False
       #del entity
       #print self.y_world_mc
    #end remove


   


        
###############end  world ##########################################

############### entity ##########################################

class y_entity:
    # attributes (properties)
    world = 0;
    grafic = 0;
    x = 0;
    y = 0;
    z = 0;
    speed = 0
    y_type = "entity"
    visble = True
    colide_rad = 1
    colide_circle = 0
    world= yoel_engine.world ;
    active = True
    scene = 1
   
 
    # methods
    
    def __init__(self,x=0,y=0,z=0,grafic=0,speed=0):
       self.x = x
       self.grafic = grafic;

       if hasattr(self.grafic, 'x'):
           self.grafic.x = x
           self.grafic.y = y
           self.grafic.z = z
           self.x = x
           self.y = y
           self.z = z
           self.speed = speed
           self.grafic.visible  = self.visble
       #set_interval(self.update,1)
       
        #end __init__

    def update(self):
        self.world= yoel_engine.world ;
        #self.show_colide_box()
        if not self.active:
            self.visble = False
            self.grafic.visible  = self.visble
            return 
        else:
            self.visble = True
            
        if hasattr(self.grafic, 'x'):
            #update grafic pos
            self.grafic.x = self.x
            self.grafic.y = self.y
            self.grafic.z = self.z
            #self.grafic.z+=10;
            #self.move_by(10)
            self.grafic.visible  = self.visble
            
            #yoel_engine.camera['y'] += 1
            #chase
            #yoel_engine.rot['y'] += self.y
            #yoel_engine.rot['x'] += self.x
            #yoel_engine.rot['z'] += self.z
            
            #rotate(pi/4, axis=axis, origin=pos)
            

            #print "updated"

     #end update

    def move_by(self,x=0,y=0,z=0):
        if not self.active:
             return        
        self.x += x;
        self.y += y;
        self.z += z;

    #end move_by

    def get_by_type(self,y_type):
        world= yoel_engine.world ;
        entity_array = world.y_world_mc ;
        length = entity_array.__len__() ;

        type_array=[];
        
        i = 0
        while length>i:
            curent_entity = entity_array[i-1];

            if curent_entity.y_type == y_type:
                type_array.append(entity_array[i-1]);
               
                
	        

            i+=1
        #print type_array
        return type_array
   
    #end get_by_type

    def collide(self,y_type):
        world= yoel_engine.world ;
        entity_array = world.y_world_mc ;
        length = entity_array.__len__() ;

        i = 0
        while length>i:
            
            entity_type = entity_array[i-1].y_type

            if y_type == entity_type:
                target = entity_array[i-1]

                #this entity cordenates
                col_x = self.x;
                col_y = self.y;
                col_z = self.z;
	        
                #target entity cordenates
                t_col_x = target.x;
                t_col_y = target.y;
                t_col_z = target.z;
              
                #draw hitbox
                if not self.visble:
                    return
                
               
                    
	    

	        #vector - vector substract
                dx = col_x - t_col_x;
                dy = col_y - t_col_y;
                dz = col_z - t_col_z;
	        
	        #destence between the two collide balls
                rad_dist = self.colide_rad + target.colide_rad
                rad_dist2 = rad_dist * rad_dist

                #dop = do operation
                dop= dx*dx+dy*dy+dz*dz ;#magnitude squared

                #if collide
                if dop <= rad_dist2:

                    #print target
                    return target
			


            i += 1


        return False
    #end collide
    def show_colide_box(self):
         if not self.visble:
                    return
         world = self.world
         if self.colide_circle == 0 and world.debug_mode:
                    self.colide_circle = sphere(pos=(1,2,1), radius = self.colide_rad)
                    self.colide_circle.opacity = 0.3
                    self.colide_circle.color = (1,0,0)
                   
                    #print self.colide_circle.pos
         elif world.debug_mode:
                    self.colide_circle.pos.x = self.x
                    self.colide_circle.pos.y = self.y
                    self.colide_circle.pos.z = self.z
                    #print self.colide_circle.pos
    def removed(self):
         self.grafic.visible  = False
         del self.grafic
         if  isinstance(self.colide_circle, sphere ):
             self.colide_circle.opacity = 0
             self.colide_circle.visible  = False
             del self.colide_circle
                
   
###############end entity ##########################################

   
############### input ##########################################

class y_input:
    bla = 0

y_input.mouse_down = False
y_input.mouse_click = False
y_input.key_down = {}
y_input.mouse_pos = 0

def handleMouseDown(e):
    y_input.mouse_down = True
    #print "click"
    #end handleMouseDown

def handleMouseUp(e):
    y_input.mouse_down = False
    y_input.mouse_click = False
    #print "click"
    #end handleMouseDown

def handle_click(e):
    y_input.mouse_click = True
    #print "click"
    #end handle_click

def handle_mousemove(e):
    y_input.mouse_pos =e.pos
    
    #print y_input.mouse_pos
    #end handle_mousemove

def handle_keyup(e):
    
    y_input.key_down[e.key] = False
    #print y_input.key_down

    #if e.key == 'r':
     #   print "r reporting for duty sir!"
    #print "click"
    #end handle_keyup

def handle_keydown(e):
    y_input.key_down[e.key] = True
    #print "click"
    #end handle_keydown

#event Listeners
yoel_engine.scene.bind('mousedown', handleMouseDown)
yoel_engine.scene.bind('mouseup', handleMouseUp)
yoel_engine.scene.bind('click', handle_click)
yoel_engine.scene.bind('keydown', handle_keydown)
yoel_engine.scene.bind('keyup', handle_keyup)
yoel_engine.scene.bind('mousemove', handle_mousemove)
        
###############end input ##########################################

###################################################################################################
#sphere()
#import py_compile

#py_compile.compile("yoel_engine.py")



