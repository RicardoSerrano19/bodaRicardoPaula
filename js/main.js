(function(){
    "use strict";

        let regalo = document.querySelector("#regalo");

    document.addEventListener('DOMContentLoaded', function(){

        //Agregando el mapa
        if(document.getElementById('mapa')){
            let map = L.map('mapa').setView([21.852288, -102.270892], 16);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([21.852288, -102.270892]).addTo(map)
                .bindPopup('AGSWebCamp.<br> Aqui es.')
                .openPopup();
        }
        
        // Campos de dato de usuario
        let nombre = document.querySelector("#nombre");
        let apellidos = document.querySelector("#apellidos");
        let email = document.querySelector("#email");

        // Pases elegidos
        let pase_dia = document.querySelector("#pase_dia");
        let pase_completo = document.querySelector("#pase_completo");
        let pase_2dias = document.querySelector("#pase_2dias");

        if(document.getElementById('btnCalcular')){
        // Botones
        let calcular = document.querySelector("#btnCalcular");
        let btnRegistro = document.querySelector("#btnRegistro");
        let btnTotalPedido = document.querySelector("#btnTotalPedido");

        // Divs
        let error = document.querySelector("#error");
        let listaProductos = document.querySelector("#lista-productos");
        let sumaTotal = document.querySelector("#sumaTotal");

        //Extras
        let etiquetas = document.querySelector("#etiqueta");
        let camisas = document.querySelector("#camisa");

        //Funciones que escucha
        calcular.addEventListener('click', calcularMontos);
        calcular.addEventListener('click', validarDatos);
        btnRegistro.addEventListener('click', revalidar); ;

        //Para mostrar la seleccion de talleres
        pase_dia.addEventListener('blur', mostrarDias);
        pase_completo.addEventListener('blur', mostrarDias);
        pase_2dias.addEventListener('blur', mostrarDias);
        pase_dia.addEventListener('click', mostrarDias);
        pase_completo.addEventListener('click', mostrarDias);
        pase_2dias.addEventListener('click', mostrarDias);

        //Para controlar el correo
        email.addEventListener('keypress', validarEmail);


       
        function revalidar(){
            if(calcularMontos(event)){
                document.getElementById('registro').submit();
            }
        }

        function calcularMontos(event){
            regalo.style.border = "";

            event.preventDefault();
            if(regalo.value === ''){

                alert("Debes elegir un regalo");
                regalo.focus();
                regalo.style.border = "0.3rem solid red";
                sumaTotal.innerText = `$0`;
            }else{

                //Resumen
                let carrito = [];
                if(pase_dia.value >= 1){
                    carrito.push(`Pases por dia: ${pase_dia.value}`);
                }
                if(pase_2dias.value >= 1){
                    carrito.push(`Pases por dos dias: ${pase_2dias.value}`);
                }
                if(pase_completo.value >= 1){
                    carrito.push(`Pases completos: ${pase_completo.value}`);
                }
                if(etiquetas.value >= 1){
                    carrito.push(`Etiquetas: ${etiquetas.value}`);
                }
                if(camisas.value >= 1){
                    carrito.push(`Camisas: ${camisas.value}`);
                }
                
                //lIMPIANDO EL TEXTO ANTERIOR
                listaProductos.innerHTML = '';
                //AGREGARNDO EL CARRITO
                carrito.forEach(carro=>{
                    listaProductos.innerHTML +=  carro + '<br/>';
                });


                //Suma Total
                let bolUnDia = parseInt(pase_dia.value, 10) || 0,
                    bolComp = parseInt(pase_completo.value, 10) || 0,
                    bolDosDia = parseInt(pase_2dias.value, 10) || 0;
                let cantEtiquetas = parseInt(etiquetas.value, 10) || 0   ,
                    cantCamisas = parseInt(camisas.value, 10) || 0;


                let totalBoletos = (bolUnDia * 30) + (bolComp * 50) + (bolDosDia * 45);
                let totalExtras = ((cantCamisas*10) * 0.93) + (cantEtiquetas * 2);
                
                sumaTotal.innerHTML = `${(totalBoletos + totalExtras).toFixed(2)}`;
                
                btnTotalPedido.value = `${(totalBoletos + totalExtras).toFixed(2)}`;

                return true;
                
            }
        }//Fin de la funcion calcularMontos


        function mostrarDias(){
            let bolUnDia = parseInt(pase_dia.value, 10) || 0,
                bolComp = parseInt(pase_completo.value, 10) || 0,
                bolDosDia = parseInt(pase_2dias.value, 10) || 0;

            let dias = [];
            if(bolUnDia >= 1){
                dias.push('viernes');
            }
            if(bolDosDia >= 1){
                dias.push('viernes','sabado');
            }
            if(bolComp >= 1){
                dias.push('viernes' ,'sabado', 'domingo');
            }

            //Limpiar los div
            document.getElementById("viernes").style.display = "none";
            document.getElementById("sabado").style.display = "none";
            document.getElementById("domingo").style.display = "none";

            dias.forEach(dia =>{
                document.getElementById(dia).style.display = "block";
            })
        }//Fin de la funcion mostrarDias

        function validarDatos(){
            error.style.display = "none";
            nombre.style.border = "1px solid gray";
            apellidos.style.border = "1px solid gray";
            email.style.border = "1px solid gray";


            if(nombre.value === ""){
                error.innerHTML = "Rellena todos los campos para continuar";
                nombre.style.border = "2px solid red";
                error.style.display = "block";
            }if(apellidos.value === ""){
                error.innerHTML = "Rellena todos los campos para continuar";
                apellidos.style.border = "2px solid red";
                error.style.display = "block";
            }if(email.value === ""){
                error.innerHTML = "Rellena todos los campos para continuar";
                email.style.border = "2px solid red";
                error.style.display = "block";
            }
        }//Fin del a funcion que valida campos vacios

        function validarEmail(){
            if(this.value.indexOf("@") > -1){
                error.style.display = "none";
                email.style.border = "1px solid gray";
            }else{
                error.innerText = "El correo debe contener un @";
                email.style.border = "2px solid red";
                error.style.display = "block";
            }
        }//Fin de la funcion validarEmail
        }//Fin del if

    });//Una vez que este cargado DOM CONTENT LOADED


})();

$(function(){

    //Agregar clase activo para resaltar menu
    $('body.conferencia .navegacion-principal a:contains("Conferencia")').addClass('activo');
    $('body.calendario .navegacion-principal a:contains("Calendario")').addClass('activo');
    $('body.invitados .navegacion-principal a:contains("Invitados")').addClass('activo');
    $('body.registro .navegacion-principal a:contains("Reservaciones")').addClass('activo2');



    $('div.menu-movil').on('click',function(){
       $(this).hide();
       $('div.cerrar-menu-movil').show(); 
       $('.barra div').addClass('flex2');
       $('.barra div .navegacion-principal').addClass('flex2');

    });

    $('div.cerrar-menu-movil').on('click',function(){
        $(this).hide();
        $('div.menu-movil').show(); 
        $('.barra div').removeClass('flex2');
        $('.barra div .navegacion-principal').removeClass('flex2');

     });

     

    $(window).resize(function() {
        const windowWidth = $(window).width();
        if(windowWidth > 680 && windowWidth<750){
            $('div.cerrar-menu-movil').hide();
            $('div.menu-movil').show(); 
            $('.barra div').removeClass('flex2');
            $('.barra div .navegacion-principal').removeClass('flex2');
        }
      });
  
  

    //Leetering
    $('.nombre-sitio').lettering();

    //Animar menu programa
    $('nav.menu-programa a:last').addClass('activo');

    $('nav.menu-programa a').on('click',function(){
       const seleccion = $(this).attr('href');

       $('nav.menu-programa a').removeClass('activo');
       $(this).addClass('activo');

       $('.talleres').hide();
       $(seleccion).fadeIn(800);


       return false;
    });


    //Animacion numeros de Resumen Evento
    function numerosResumen(){
            $('.resumen-evento li:nth-child(1) p').animateNumber(
                { number: 6 
                },2200
            );
            $('.resumen-evento li:nth-child(2) p').animateNumber(
                { number: 15
                },1800
            );
            $('.resumen-evento li:nth-child(3) p').animateNumber(
                { number: 4
                },2400
            );
            $('.resumen-evento li:nth-child(4) p').animateNumber(
                { number: 9 
                },3100
            );
    }//Fin de la function numerosResumen

    let animado = 0;
    $(window).scroll(function(e){
        let positionY = $(window).scrollTop();

        //Funcion para los numeros de conferencias
            if(positionY > 2400 && positionY < 3000){
                if(animado === 0){
                    numerosResumen();
                    animado = 1;
                }
            }else{
                animado = 0;
            } 


        //Funcion para la barra de navegacion
            if(positionY > 654){
                $('.barra').addClass('fixed');
                $('body').css({
                    'margin-top':$('.barra').innerHeight()+'px'
                });
            }else{
                $('.barra').removeClass('fixed');
                $('body').css({
                    'margin-top':'0px'
                });
            }
    });

    //Cuenta regresiva
    $('.cuenta-regresiva').countdown('2024/02/24 18:00:00', function(event) {
        $('#dias').text(event.strftime('%D'));
        $('#horas').text(event.strftime('%H'));
        $('#minutos').text(event.strftime('%M'));
        $('#segundos').text(event.strftime('%S'));

      });


      const windowHeigth = $(window).height();
      
      $('.invitado-info').colorbox({inline:true, width:"50%",transition:"fade",opacity:0.95,fadeOut:500});
      $('.invitado-info').on('click',function(){
          $(this).colorbox.close();
      })
   
});