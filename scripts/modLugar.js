$("#divfrmModLugarElegir").dialog({
    autoOpen: true,  // Es el valor por defecto
    open:function() {
        cargarSelectListadoLugares();
    },
    modal: true,
    close: function () {
        $("#frmLugaresElegir")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height: "auto",
    width: "auto",
    resizable: false,
    buttons: [{
        text: "Aceptar",
        click: cargarModificaLugar
    }]
});

function cargarSelectListadoLugares(){
    $.get('php/getLugares.php',null,cargarLugaresEvento,'json');
}
function cargarLugaresEvento(oArrayLugares, sStatus, oXHR){
    $("#sltModificarLugar").empty();

    $(oArrayLugares).each(function(){
        $('<option>').val(this.ID_LUGAR).text(this.DESCRIPCION).appendTo("#sltModificarLugar");
    });
}

function cargarModificaLugar(){
    if( $('#frmLugaresModificar').size() == 0 ){
        $('<div title="Modificar Lugar" id="divfrmModLugar"></div>').appendTo('#formularios').load("formularios/modLugar.html");

    } else {
        // Lo abro si está cerrado
        $('#divfrmModLugar').dialog("open");
    }
}

function procesoModLugar(){
    if(validarModLugar()){
        iId=$('[name=txtId]').val().trim();
        sDescripcion=$('[name=txtDescripcion]').val().trim();
        sDireccion=$('[name=txtDireccion]').val().trim();
        iCapacidad=$('[name=txtCapacidad]').val().trim();

        var oLugar={
            id:iId,
            descripcion:sDescripcion,
            direccion:sDireccion,
            capacidad:iCapacidad
        };

        var jLugar=JSON.stringify(oLugar);

        $.ajax({ url : "php/modLugar.php",
            data:{datos:jLugar},
            async: false,
            dataType :'json',
            method: "POST",
            cache: false,
            success: tratarRespuestaLugar,
            error :tratarErrorModLugar
        });
    }
}

function tratarRespuestaLugar(oArrayRespuesta,sStatus,oXHR){
    $("#divMensajes").dialog("open");
    if (oArrayRespuesta[0] == true){
        $("#divMensajes").dialog("option","title","Error");
        $("#pMensaje").text(oArrayRespuesta[1]);
    } else {
        $('#divfrmModLugar').dialog("close");
        $("#divMensajes").dialog("option","title","OK");
        $("#pMensaje").text(oArrayRespuesta[1]);
    }
}

function tratarErrorModLugar(oXHR,sStatus,sError){
    $("#divMensajes").dialog("open");
    $("#divMensajes").dialog("option","title",sStatus);
    $("#pMensaje").text(sError);
}

function cargarDatosDialogoLugar(){
    var sLugar=$('#sltModificarLugar').val();
    $("#divfrmModLugarElegir").dialog("close");

    $.get('php/getLugar.php?id_lugar='+sLugar,null,cargarDatosLugar,'json');
}
function cargarDatosLugar(oArray, sStatus, oXHR){
    $('[name=txtId]').val(oArray[0].ID_LUGAR);
    $('[name=txtDescripcion]').val(oArray[0].DESCRIPCION);
    $('[name=txtDireccion]').val(oArray[0].DIRECCION);
    $('[name=txtCapacidad]').val(oArray[0].CAPACIDAD);
}


function validarModLugar(){
    var bValido=true;
    var sError="";
    $('input,select').removeClass("error");
/*
    var oExpReg = /^[a-zA-Z][a-zA-Z]*/;
  /*  if(oExpReg.test($('[name=txtDescripcion]').val().trim()) == false){

        bValido = false;
        sError += "La descripcion no es valida<br>";
        $('[name=txtDescripcion]').addClass("error");
    }
    else {
        buscaLugar($('[name=txtDescripcion]').val().trim());
        if(bLugarEncontrado) {
            bValido = false;
            sError += "La descripcion del lugar ya existe<br>";
            $('[name=txtDescripcion]').addClass("error");
        }
    }*/

    oExpReg = /^[a-z/A-Z][a-zA-Z][0-9]*/;
    if(oExpReg.test($('[name=txtDireccion]').val().trim()) == false){

        bValido = false;
        sError += "La direccion no es valida<br>";
        $('[name=txtDireccion]').addClass("error");

    }
    oExpReg = /^\d[0-9]/;
    if(oExpReg.test($('[name=txtCapacidad]').val().trim()) == false){
        bValido = false;
        sError += "La capacidad no es valida<br>";
        $('[name=txtCapacidad]').addClass("error");

    }


    if(!bValido){
        $("#divMensajes").dialog("open");
        $("#divMensajes").dialog("option","title","Error validacion");
        $("#pMensaje").html(sError);
    }
    return bValido;
}
/*
var bLugarEncontrado=false;
var oAjaxvalidacionLugar = null;

function buscaLugar(sDescripcion){
    var sParametroGET = encodeURI("descripcion="+sDescripcion);
    var sURL = encodeURI("php/buscaLugar.php?");
    llamadaAjaxValidacionLugar(sURL,sParametroGET);
}

function llamadaAjaxValidacionLugar(sURL,sParametroGET){
    oAjaxvalidacionLugar = objetoXHR();
    oAjaxvalidacionLugar.open("GET",sURL+sParametroGET,false);
    oAjaxvalidacionLugar.onreadystatechange = respuestaValidacionLugar;
    oAjaxvalidacionLugar.send(null);
}

function respuestaValidacionLugar(){
    if(oAjaxvalidacionLugar.readyState == 4 && oAjaxvalidacionLugar.status ==200)	{
        var oArrayRespuesta = JSON.parse(oAjaxvalidacionLugar.responseText);
        bLugarEncontrado = oArrayRespuesta[0];
    }
}
*/






