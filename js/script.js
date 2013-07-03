var total_amigos=0;
var array_amigos=new Array();
var array_works=new Array();
var array_education=new Array();
var array_gender=new Array();
var array_location=new Array();
var array_hometown=new Array();
var score=1000;
var active=true;
var init=false;

var array_area=new Array();
var array_hobbie=new Array();
var array_gender_w=new Array();
var controls_w_assigned=false;

/*********************************************************************/
/*********************************************************************/
/*********************************************************************/
/*********************************************************************/
/*********************************************************************/
/*********************************************************************/
$(function() {
	load_w();

$("#login").bind('click', function(e) {
	e.preventDefault();
	login();
});// fin de live 




$("body").on('click',".card", function(e) 
{
	e.preventDefault();
	if(!$(this).hasClass("active"))
	{
		return false;
	}

	var elid=$(this).attr("id");
	console.log(elid);
	console.log($("#main_container").attr("elid"));
	if($("#main_container").attr("elid")==elid)
	{
		$("#main_front").removeClass("inactive").addClass("active");
		$("#main_back").removeClass("active").addClass("inactive");
		alert("ganaste score"+score);
	}
	else
	{
		score-=100;
		$("#score").html(score);
		$(this).removeClass("active");
	}
	
});// fin de live


});
function load_w()
{
	var cadena_area="";
	var cadena_gender="";
	var cadena_hobbie="";
	$("#main_front").removeClass("active").addClass("inactive");
	$("#main_back").removeClass("inactive").addClass("active");
	score=1000;
	$("#score").html("1000");
	console.log("load_w");
	$("#controls_grupow").html("");
	$.getJSON('json/w.txt', function(data) 
	{
		ws=data.ppl;
		//console.log(data);
		if(data.length<36)
		{
			total_amigos=ws.length;
		}
		else
		{
			total_amigos=30;
		}
		//console.log("total_amigos"+total_amigos);
		var cadena="";
		for(var i=0;i<total_amigos;i++)
		{
			var random=Math.floor(Math.random()*ws.length);
			array_amigos[i]=ws.splice(random,1)[0];
			//console.log(array_amigos[i]);
			cadena+='<a id="'+i+'" class="a_'+array_amigos[i].area+' g_'+array_amigos[i].gender+' h_'+array_amigos[i].hobbie+' inactive card" href="#">'+
						'<div class="card_img" style="background: url(\'images/'+array_amigos[i].image+'\');background-size: cover;">'+
						'</div>'+
						'<div class="card_name">'+array_amigos[i].nombre+'</div>'+
					'</a>';
			var found=false;
			var cont=0;
			var area="a_"+array_amigos[i].area;
			while(!found && cont<array_area.length)
			{
				if(array_area[cont]==area)
				{
					found=true;
				}
				else
				{
					cont++;
				}
			}
			if(!found)
			{	             			
				array_area.push(area);	             			
			}
			cadena_area+=" "+area;

			var found=false;
			var cont=0;
			var gender="g_"+array_amigos[i].gender;
			while(!found && cont<array_area.length)
			{
				if(array_gender[cont]==gender)
				{
					found=true;
				}
				else
				{
					cont++;
				}
			}
			if(!found)
			{	             			
				array_gender.push(gender);	             			
			}
			cadena_gender+=" "+gender; 

			var found=false;
			var cont=0;
			var hobbie="h_"+array_amigos[i].hobbie;
			while(!found && cont<array_hobbie.length)
			{
				if(array_hobbie[cont]==hobbie)
				{
					found=true;
				}
				else
				{
					cont++;
				}
			}
			if(!found)
			{	             			
				array_hobbie.push(hobbie);	             			
			}
			cadena_hobbie+=" "+hobbie;   
	    }
	    var theone=Math.floor(Math.random()*array_amigos.length); 
	    $("#main_front .card_img").css("background-image","url('images/"+array_amigos[theone].image+"')");  
	    $("#main_front .card_img").css("background-size","cover");
	    $("#main_container").attr("elid",theone);
	    $("#main_front .card_name").html(array_amigos[theone].nombre);
	    if(array_amigos[theone].area!=null)
	    {
	    	var area="a_"+array_amigos[theone].area
	    	$("#main_container").addClass(area);
	    }
	    if(array_amigos[theone].gender!=null)
	    {
	    	var gender="g_"+array_amigos[theone].gender
	    	$("#main_container").addClass(gender);
	    }
	    if(array_amigos[theone].hobbie!=null)
	    {
	    	var hobbie="h_"+array_amigos[theone].hobbie
	    	$("#main_container").addClass(hobbie);
	    }
	    //asignar filtros 
	    var controls_area="";
	    array_area.forEach(function(area) {	    	
	      controls_area+='<a href="#" id="'+area+'" class="control control_area">'+area.substring(2)+'</a>';
	    });
	    $("#controls_grupow").append(controls_area);
	    var controls_gender="";
	    array_gender.forEach(function(gender) {	    	
	      controls_gender+='<a href="#" id="'+gender+'" class="control control_gender">'+gender.substring(2)+'</a>';
	    });
	    $("#controls_grupow").append(controls_gender);
	    
	    var controls_hobbie="";
	    array_hobbie.forEach(function(hobbie) {	    	
	      controls_hobbie+='<a href="#" id="'+hobbie+'" class="control control_hobbie">'+hobbie.substring(2)+'</a>';
	    });
	    $("#controls_grupow").append(controls_hobbie);
		$("#tablero").fadeIn(300);
		$("#tablero").html(cadena);	
			

		controls_w();
		$("#restar_w").show();
		setTimeout(anima_entrada,800);
	});
	
}
function controls_w()
{
	if(controls_w_assigned)
	{
		return false;
	}
	controls_w_assigned=true;
	$("#restart_w").bind("click",function(event)
	{
		
		event.preventDefault();
		
		$(".card").animate({"opacity":"0"},{duration:500,complete:function(){}});
		setTimeout(load_w,500);
	});
	$("body").on('click',".control_area", function(e) 
	{
		e.preventDefault();
		var clase=$(this).attr("id");

		if($("#main_container").hasClass(clase))
		{
			score+=100;
			$("#score").html(score);
			for(var i=0;i<array_area.length;i++)
			{
				if(array_area[i]!=clase)
				{
					$("#tablero ."+array_area[i]).each(function()
					{					
						if(!$(this).hasClass(clase))
						{
							$(this).removeClass("active");
							$("#"+array_area[i]).hide(300);
						}
					});
				}
			}		
		}
		else
			{
				
				score-=75;
				$("#"+clase).hide(300);
				$("#score").html(score);
				$("#tablero ."+clase).removeClass("active");			
			}	
	});// fin de live
	$("body").on('click',".control_gender", function(e) 
	{
		e.preventDefault();
		var clase=$(this).attr("id");

		if($("#main_container").hasClass(clase))
		{
			score+=100;
			$("#score").html(score);
			for(var i=0;i<array_gender.length;i++)
			{
				if(array_gender[i]!=clase)
				{
					$("#tablero ."+array_gender[i]).each(function()
					{					
						if(!$(this).hasClass(clase))
						{
							$(this).removeClass("active");
							$("#"+array_gender[i]).hide(300);
						}
					});
				}
			}		
		}
		else
			{
				
				score-=75;
				$("#"+clase).hide(300);
				$("#score").html(score);
				$("#tablero ."+clase).removeClass("active");			
			}	
	});// fin de live
	$("body").on('click',".control_hobbie", function(e) 
	{
		e.preventDefault();
		var clase=$(this).attr("id");

		if($("#main_container").hasClass(clase))
		{
			score+=100;
			$("#score").html(score);
			for(var i=0;i<array_hobbie.length;i++)
			{
				if(array_hobbie[i]!=clase)
				{
					$("#tablero ."+array_hobbie[i]).each(function()
					{					
						if(!$(this).hasClass(clase))
						{
							$(this).removeClass("active");
							$("#"+array_hobbie[i]).hide(300);
						}
					});
				}
			}		
		}
		else
			{
				
				score-=75;
				$("#"+clase).hide(300);
				$("#score").html(score);
				$("#tablero ."+clase).removeClass("active");			
			}	
	});// fin de live
}
function login()
{
      	if(init)
      	{
      		return false;
      	}
      	init=true;
        FB.login(function(response) {
         if (response.authResponse) {
          accessToken = response.authResponse.accessToken;
           load_fbfriends();
         } else {
           //console.log('User cancelled login or did not fully authorize.');
         }
       },{scope: 'friends_about_me,friends_interests,friends_relationship_details,friends_status,friends_work_history,friends_education_history,friends_hometown,friends_interests,friends_location,friends_status'});
      }
function load_fbfriends()      
{
	array_gender=new Array();
	cadena_gender="";
	controls_gender="";
	$("#main_front").removeClass("active").addClass("inactive");
	$("#main_back").removeClass("inactive").addClass("active");
	score=1000;
	$("#score").html("1000");
	$("#restart_w").hide();
	           FB.api('/me/friends', {fields: 'id,name,about,age_range,gender,education,hometown,relationship_status,work,interested_in,location'}, function(result) {
	             $("#main_front").removeClass("active").addClass("inactive");
	             $("#main_back").removeClass("inactive").addClass("active");
	             $("#controls_grupow").hide(300);
	             $("#controls_fb").show(300);
	             
	             var markup = '';
	             
	             if(result.data.length<36)
	             {
	             	total_amigos=result.data.length;
	             }
	             else
	             {
	             	total_amigos=36;
	             }
	             //console.log("total_amigos"+total_amigos);
	             var cadena="";
	             for(var i=0;i<total_amigos;i++)
	             {
	             	
	             	var random=Math.floor(Math.random()*result.data.length);
	             	
	             	array_amigos[i]=result.data.splice(random,1)[0];
	             	// GENERO
	             	var found=false;
	             	var cont=0;
	             	if(array_amigos[i].gender!=null)
					{
		             	var gender_name=array_amigos[i].gender.replace(/ /g,"_").replace(/,/g,"-").replace(/&/g,"-").replace(/\./g,"_").replace(/\)/g,"_").replace(/\(/g,"_").replace(/'/g,"_");
		             	while(!found && cont<array_gender.length)
		             	{
		             		if(array_gender[cont]==gender_name)
		             		{
		             			found=true;
		             		}
		             		else
		             		{
		             			cont++;
		             		}
		             	}
		             	if(!found)
		             	{	             			
		             		array_gender.push(gender_name);
		             		
		             	}
	             	}	
	             	var gender=array_amigos[i].gender;
	             	//TRABAJO
	             	var work="";
	             	if(array_amigos[i].work!=null)
	             	{
		             	for(var j=0;j<array_amigos[i].work.length;j++)
		             	{
		             		var found=false;
		             		var cont=0;
		             		var work_name="w_"+array_amigos[i].work[j].employer.name.replace(/ /g,"_").replace(/,/g,"-").replace(/&/g,"-").replace(/\./g,"_").replace(/\)/g,"_").replace(/\(/g,"_").replace(/'/g,"_");
		             		while(!found && cont<array_works.length)
		             		{
		             			if(array_works[cont]==work_name)
		             			{
		             				found=true;
		             			}
		             			else
		             			{
		             				cont++;
		             			}
		             		}
		             		if(!found)
		             		{	             			
		             			array_works.push(work_name);
		             			
		             		}
		             		work+=" "+work_name;	             		
		             		
		             	}
	             	}
	             	//ESTUDIO
	             	var education="";
	             	if(array_amigos[i].education!=null)
	             	{
		             	for(var j=0;j<array_amigos[i].education.length;j++)
		             	{
		             		var found=false;
		             		var cont=0;
		             		var education_name="e_"+array_amigos[i].education[j].school.name.replace(/ /g,"_").replace(/,/g,"-").replace(/&/g,"-").replace(/\./g,"_").replace(/\)/g,"_").replace(/\(/g,"_").replace(/'/g,"_");
		             		while(!found && cont<array_education.length)
		             		{
		             			if(array_education[cont]==education_name)
		             			{
		             				found=true;
		             			}
		             			else
		             			{
		             				cont++;
		             			}
		             		}
		             		if(!found)
		             		{	             			
		             			array_education.push(education_name);	             			
		             		}
		             		education+=" "+education_name;	             			             		
		             	}
	             	}
	             	//LOCATION
	             	var location="";
	             	if(array_amigos[i].location!=null)
	             	{
		             	
		             	//for(var j=0;j<array_amigos[i].location.length;j++)
		             	//{
		             		
		             		var found=false;
		             		var cont=0;
		             		var location_name="l_"+array_amigos[i].location.name.replace(/ /g,"_").replace(/,/g,"-").replace(/&/g,"-").replace(/\./g,"_").replace(/\)/g,"_").replace(/\(/g,"_").replace(/'/g,"_");
		             		while(!found && cont<array_location.length)
		             		{
		             			if(array_location[cont]==location_name)
		             			{
		             				found=true;
		             			}
		             			else
		             			{
		             				cont++;
		             			}
		             		}
		             		if(!found)
		             		{	             			
		             			array_location.push(location_name);	             			
		             		}
		             		location+=" "+location_name;	             			             		
		             	//}
	             	}
	             	//HOMETOWN
	             	var hometown="";
	             	if(array_amigos[i].hometown!=null)
	             	{
		             	//for(var j=0;j<array_amigos[i].hometown.length;j++)
		             	//{
		             		var found=false;
		             		var cont=0;
		             		var hometown_name="h_"+array_amigos[i].hometown.name.replace(/ /g,"_").replace(/,/g,"-").replace(/&/g,"-").replace(/\./g,"_").replace(/\)/g,"_").replace(/\(/g,"_").replace(/'/g,"_");
		             		while(!found && cont<array_hometown.length)
		             		{
		             			if(array_hometown[cont]==hometown_name)
		             			{
		             				found=true;
		             			}
		             			else
		             			{
		             				cont++;
		             			}
		             		}
		             		if(!found)
		             		{	             			
		             			array_hometown.push(hometown_name);	             			
		             		}
		             		hometown+=" "+hometown_name;	             			             		
		             	//}
	             	}
	             	
	             	cadena+='<a id="'+array_amigos[i].id+'" class="'+gender+' '+work+' '+education+' '+location+' '+hometown+' inactive card" href="#">'+
						'<div class="card_img" style="background: url(\'http://graph.facebook.com/'+array_amigos[i].id+'/picture?type=large\');background-size: cover;">'+
						'</div>'+
						'<div class="card_name">'+array_amigos[i].name+'</div>'+
					'</a>';
	             }
	             /////////////////////

	             var theone=Math.floor(Math.random()*array_amigos.length);
	             var img=new Image();
	             img.onload=function(){
	             	console.log("cargando");
	             $("#main_front .card_img").hide(500,function(){
	             	$("#main_front .card_img").css("background-image","url('http://graph.facebook.com/"+array_amigos[theone].id+"/picture?type=large')");
	             	$("#main_front .card_img").show();		
	             });
	             }
	             img.src='http://graph.facebook.com/'+array_amigos[theone].id+'/picture?type=large';
	             
	             
	             $("#main_front .card_name").html(array_amigos[theone].name);
	             if(array_amigos[theone].education!=null)
	             {
	             	for(var j=0;j<array_amigos[theone].education.length;j++)
	             	{
	             		var education_name="e_"+array_amigos[theone].education[j].school.name.replace(/ /g,"_").replace(/,/g,"-").replace(/&/g,"-").replace(/\./g,"_").replace(/\)/g,"_").replace(/\(/g,"_").replace(/'/g,"_")
	             		$("#main_container").addClass(education_name);
	             	}
	             }
	             if(array_amigos[theone].work!=null)
	             {
	             	for(var j=0;j<array_amigos[theone].work.length;j++)
	             	{
	             		var work_name="w_"+array_amigos[theone].work[j].employer.name.replace(/ /g,"_").replace(/,/g,"-").replace(/&/g,"-").replace(/\./g,"_").replace(/\)/g,"_").replace(/\(/g,"_").replace(/'/g,"_");
	             		$("#main_container").addClass(work_name);
	             	}
	             }
	             if(array_amigos[theone].location!=null)
	             {
	             	
	             		var location_name="l_"+array_amigos[theone].location.name.replace(/ /g,"_").replace(/,/g,"-").replace(/&/g,"-").replace(/\./g,"_").replace(/\)/g,"_").replace(/\(/g,"_").replace(/'/g,"_")
	             		$("#main_container").addClass(location_name);
	             	
	             }
	             if(array_amigos[theone].hometown!=null)
	             {
	             	
	             		var hometown_name="h_"+array_amigos[theone].hometown.name.replace(/ /g,"_").replace(/,/g,"-").replace(/&/g,"-").replace(/\./g,"_").replace(/\)/g,"_").replace(/\(/g,"_").replace(/'/g,"_")
	             		$("#main_container").addClass(hometown_name);
	             	
	             }
	             if(array_amigos[theone].gender!=null)
	             {
	             	
	             		var gender_name=array_amigos[theone].gender.replace(/ /g,"_").replace(/,/g,"-").replace(/&/g,"-").replace(/\./g,"_").replace(/\)/g,"_").replace(/\(/g,"_").replace(/'/g,"_")
	             		$("#main_container").addClass(gender_name);
	             	
	             }
	             
	             $("#main_container").attr("elid",array_amigos[theone].id);
	             //////////////////////////////////////
	             //console.log(array_location);
	             var controls_location="";
	             array_location.forEach(function(location) {
	             	//console.log(location);
	               controls_location+='<a href="#" id="'+location+'" class="control control_location">'+location.substring(2)+'</a>';
	             });
	             $("#controls_location").html(controls_location);

	             var controls_gender="";
	             array_gender.forEach(function(gender) {
	             	//console.log(gender);
	               controls_gender+='<a href="#" id="'+gender+'" class="control control_gender">'+gender+'</a>';
	             });
	             $("#controls_gender").html(controls_gender);

	             //console.log(array_works);
	             var controls_work="";
	             array_works.forEach(function(work) {
	             	//console.log(work);
	               controls_work+='<a href="#" id="'+work+'" class="control control_work">'+work.substring(2)+'</a>';
	             });
	             $("#controls_work").html(controls_work);
	             
	             var controls_hometown="";
	             array_hometown.forEach(function(hometown) {
	             	//console.log(hometown);
	               controls_hometown+='<a href="#" id="'+hometown+'" class="control control_hometown">'+hometown.substring(2)+'</a>';
	             });
	             $("#controls_hometown").html(controls_hometown);

	             var controls_education="";
	             array_education.forEach(function(education) {
	             	//console.log(education);
	               controls_education+='<a href="#" id="'+education+'" class="control control_education">'+education.substring(2)+'</a>';
	             });
	             $("#controls_education").html(controls_education);
	             $("#tablero").fadeIn(300);
	             $("#tablero").html(cadena);
	             controls_fb();
	             //console.log(array_amigos);
	             $("#login").hide(300);
	             $("#restart").show();
	             
	             	
	             	
	             	             
	             setTimeout(anima_entrada,800);
	           });

}
function controls_fb()
{
	$("body").on('click','.control_work', function(e) 
	{
		e.preventDefault();
		var clase=$(this).attr("id");

		if($("#main_container").hasClass(clase))
		{
			score+=100;		
			$("#score").html(score);
			for(var i=0;i<array_works.length;i++)
			{
				if(array_works[i]!=clase)
				{				
					$("#tablero ."+array_works[i]).each(function()
					{					
						if(!$(this).hasClass(clase))
						{
							$(this).removeClass("active");
							$("#"+array_works[i]).hide(300);
						}
					});
				}
			}		
		}
		else
			{					
				score-=75;
				$("#"+clase).hide(300);			
				$("#score").html(score);
				$("#tablero ."+clase).removeClass("active");		
			}	
	});// fin de live 

	$("body").on('click',".control_education", function(e) 
	{
		e.preventDefault();
		var clase=$(this).attr("id");

		if($("#main_container").hasClass(clase))
		{
			score+=100;
			$("#score").html(score);
			for(var i=0;i<array_education.length;i++)
			{
				if(array_education[i]!=clase)
				{				
					$("#tablero ."+array_education[i]).each(function()
					{					
						if(!$(this).hasClass(clase))
						{
							$(this).removeClass("active");
							console.log("hide"+array_education[i]);
							$("#"+$.trim(array_education[i])).hide(300);
						}
					})
				}
			}		
		}
		else
			{			
				score-=75;
				$("#"+clase).hide(300);
				$("#score").html(score);
				$("#tablero ."+clase).removeClass("active");		
			}	
	});// fin de live

	$("body").on('click',".control_location", function(e) 
	{
		e.preventDefault();
		var clase=$(this).attr("id");
		console.log("buscando "+clase);
		if($("#main_container").hasClass(clase))
		{
			score+=100;
			$("#score").html(score);
			for(var i=0;i<array_location.length;i++)
			{
				if(array_location[i]!=clase)
				{
					$("#tablero ."+array_location[i]).each(function()
					{					
						if(!$(this).hasClass(clase))
						{
							$(this).removeClass("active");
							$("#"+array_location[i]).hide(300);
						}
					})
				}
			}		
		}
		else
		{
			console.log("quitando los de "+clase);
			score-=75;
			$("#"+clase).hide(300);
			$("#score").html(score);
			$("#tablero ."+clase).removeClass("active");
			
		}	
	});// fin de live
	$("body").on('click',".control_hometown", function(e) 
	{
		e.preventDefault();
		var clase=$(this).attr("id");

		if($("#main_container").hasClass(clase))
		{
			score+=100;
			$("#score").html(score);
			for(var i=0;i<array_hometown.length;i++)
			{
				if(array_hometown[i]!=clase)
				{
					$("#tablero ."+array_hometown[i]).each(function()
					{					
						if(!$(this).hasClass(clase))
						{
							$(this).removeClass("active");
							$("#"+array_hometown[i]).hide(300);
						}
					});
				}
			}		
		}
		else
			{
				
				score-=75;
				$("#"+clase).hide(300);
				$("#score").html(score);
				$("#tablero ."+clase).removeClass("active");			
			}	
	});// fin de live
	$("body").on('click',".control_gender", function(e) 
	{
		e.preventDefault();
		var clase=$(this).attr("id");

		if($("#main_container").hasClass(clase))
		{
			score+=100;
			$("#score").html(score);
			for(var i=0;i<array_gender.length;i++)
			{
				if(array_gender[i]!=clase)
				{
					$("#tablero ."+array_gender[i]).each(function()
					{					
						if(!$(this).hasClass(clase))
						{
							$(this).removeClass("active");
							$("#"+array_gender[i]).hide(300);
						}
					});
				}
			}		
		}
		else
			{		
				score-=75;
				$("#"+clase).hide(300);
				$("#score").html(score);
				$("#tablero ."+clase).removeClass("active");			
			}	
	});// fin de live
	$("#restart").bind("click",function(event){
		event.preventDefault();
		$("#main_container").removeClass();
		
		$(".card").animate({"opacity":"0"},{duration:500});
		setTimeout(load_fbfriends,500);
	});
	$(".controls_fb_header").bind("click",function(event){
		event.preventDefault();
		$(".controls_fb_header.active").removeClass("active");
		$(this).addClass("active");
		var item=$(this).attr("id").replace("controls_fb_header_","");
		$("#controls_fb_body .active").removeClass("active");
		console.log("#controls_"+item);
		$("#controls_"+item).addClass("active");
		
	});	
}
function anima_entrada2()
{
	var tiempo=0;	
	$(".card").each(function()
		{				
			var that=$(this);
		setTimeout(function(){
			that.addClass("active");
		},tiempo);
		tiempo+=150;	
		});
}
function anima_entrada()
{
		
	$(".card").addClass("active");
		
}