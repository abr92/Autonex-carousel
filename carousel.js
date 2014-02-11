/*
Name : Automatic-width-carousel
Autor : Abraham Díaz
version : 2.0
*/
function carousel_ini(base,contenedor,slider,items,nex,prev,timer){

		var index = 0; //Definimos un conteo dependiendo de cuantos items se veran y cuantos hay :::: Numero de items entre items a ver.
		$(base).addClass('base');
		$(contenedor).addClass('contenedor');
		$(slider).addClass('slider');
		$(items).addClass('items');
		$(nex).addClass('buttons');
		$(prev).addClass('buttons');
		$('*').css({
			"transition" : "all .5s ease",
			"-webkit-transition" : "all .5s ease",
			"-moz-transition" : "all .5s ease"
		});
		
		recalculate();

		function recalculate(type){

			/*$(base).animate({
				height : 0+'px'
			});*/

				$num_items = $(items).length;
				$padding = $(items).innerWidth() - $(items).width();
				$ancho = $(items).width()+$padding;
				var $height = $(items).height();
				calculo = $(base).width() / $ancho;
				items_views = calculo.toFixed();
				$an_section = $ancho*items_views;
				
				//Si los item vistos son mayores que el contenedor y mayores a 1 numero de items por cada resta un item de la vista
				if($ancho*items_views > $(base).width() && items_views > 1){
					items_views --;
					$an_section = $ancho*items_views;
				}

				$(contenedor).css({
					width : $an_section+"px"
				},500,function(){
					/*$(base).animate({
						height: $height+'px'
					});*/
				});

				$(slider).css({
					width: $ancho*$num_items+'px'
				});

				index = -1;

				_nex(type);
		}
		//Hacemos cambios cuando la ventana cambia de tamaño
		$(window).on('resize',function(){
			setTimeout(recalculate(true),500)
		});

		//pasamos un id numerico a cada item
		for(var $i = 0; $i <= $num_items; $i++ ){
			$(items+':nth-child('+$i+')').attr('id',''+slider+'-'+$i);
		}

		var auto_nex = setInterval(_nex, timer);

		$(nex).mouseover(function(){
			clearInterval(auto_nex);
		});
		$(nex).mouseout(function(){
			auto_nex = setInterval(_nex, timer);
		});

		$(prev).mouseover(function(){
			clearInterval(auto_nex);
		});
		$(prev).mouseout(function(){
			auto_nex = setInterval(_nex, timer);
		});

/* :::::::::::::::::::::::::::::::::::::::::::::::: Controles del slider :::::::::::::::::::::::::::::::::::::::::::::::::::: */

		function _nex(type){
			//Incrementamos el conteo
			index ++;
			//calculo para el par por conteo
			var cal_px = $an_section*index;

			if(index*items_views > $num_items-1){
				index = 0;
				cal_px = $an_section*index;

			}
			if($num_items % items_views && index*items_views > $num_items-2){
				//calculo para el impar por conteo
				cal_px = $ancho*$num_items-$ancho*items_views;
				index = -1;
			}
			if(index*items_views > $num_items-items_views){
				//reseteamos el par	
				cal_px = $ancho*$num_items-$ancho*items_views;//El ancho del item * el numero de items - el ancho del item * calculo de cuantos se veran
				index = $num_items / items_views; //Numero de items entre cuantos se veran 
				index = index.toFixed(); // Convertimos el resultado a entero
			}

			//$(slider).css({ "-webkit-filter": "blur(1px)" });
			if(type == true){
				$(slider).css({
					right : 0+'px'
				});
				//$(slider).css({ "-webkit-filter": "blur(0px)" });
			}
			else{
				$(slider).animate({
					right : +cal_px+'px'
				},1000 ,function(){
					//$(slider).css({ "-webkit-filter": "blur(0px)" });
				});
			}
		}

		function _prev(){
			//Incrementamos el conteo
			index --;
			//calculo para el impar por conteo
			var cal_px = $an_section*index;

			if($num_items % items_views && index < 0){
				cal_px = $ancho*$num_items-$ancho*items_views;
				index = $num_items / items_views-1;
				index = index.toFixed();
			}
			if(index < 0){
				//calculo para el par por conteo
				cal_px = $ancho*$num_items-$ancho*items_views;
				index = $num_items / items_views-1;
				index = index.toFixed();
			}
			//$(slider).css({ "-webkit-filter": "blur(1px)" });

			$(slider).animate({
				right : +cal_px+'px'
			},1000 ,function(){
				//$(slider).css({ "-webkit-filter": "blur(0px)" });
			});
		}

		$(nex).click(_nex);
		$(prev).click(_prev);

/* :::::::::::::::::::::::::::::::::::::::::::::::: Controles del slider :::::::::::::::::::::::::::::::::::::::::::::::::::: */

}


$(document).ready(function(){
	//iniciamos el slider y pasamos como parametro el contenedor y los items
	carousel_ini(
		'#base',
		'#contenedor',
		'#slider',
		'#slider > article',
		'#nex',
		'#prev',
		3000
	);
});