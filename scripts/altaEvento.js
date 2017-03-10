$("#divfrmAltaEvento").dialog({
    autoOpen: true,  // Es el valor por defecto
    open: function () {
        cargarSelectListadoLugares();
        cargarSelectListadoContratantes();
    },
    modal: true,
    close: function () {
        $("#frmAltaEvento")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height: "auto",
    width: "auto",
    resizable: false,
    buttons: [{
        text: "Aceptar",
        click: procesoAltaEvento
    }]
});


$(function () {
    $('#txtFecha').datepicker({
        monthNamesShort: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        dayNames:["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
        dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        changeYear: true,
        changeMonth: true
    });
});

function cargarSelectListadoLugares() {
    $.get('php/getLugares.php', null, cargarLugaresEvento, 'json');
}
function cargarLugaresEvento(oArrayLugares, sStatus, oXHR) {
    $("#lstLugares").empty();
    $(oArrayLugares).each(function () {
        $('<option>').val(this.ID_LUGAR).text(this.DESCRIPCION).appendTo("#lstLugares");
    });
}


function cargarSelectListadoContratantes() {
    $.get('php/getContratantes.php', null, cargarContratantesEvento, 'json');
}
function cargarContratantesEvento(oArrayContratantes, sStatus, oXHR) {
    $("#lstContratantes").empty();

    $(oArrayContratantes).each(function () {
        $('<option>').val(this.DNI).text(this.NOMBRE + " " + this.APELLIDOS).appendTo("#lstContratantes");
    });
}

/* VARIABLES PARA AJAX */
var oAjaxvalidacionEvento = null;

function procesoAltaEvento() {
    //validacion
    if (validarAltaEvento()) {
        var sDescripcion = frmAltaEvento.txtDescripcion.value.trim();
        var dFecha = new Date($("#txtFecha").val());
        var sLugar = frmAltaEvento.lstLugares.value.trim();
        var sContratante = frmAltaEvento.lstContratantes.value.trim();
        var iPrecio = frmAltaEvento.txtPrecio.value.trim();

        var oEvento = {
            descripcion: sDescripcion,
            fecha: dFecha,
            lugar: sLugar,
            contratante: sContratante,
            precio: iPrecio
        };

        var jEvento = JSON.stringify(oEvento);

        $.ajax({
            url: "php/altaEvento.php",
            data: {datos: jEvento},
            async: true,
            dataType: 'json',
            method: "POST",
            cache: false,
            success: tratarRespuestaAltaEvento,
            error: tratarErrorAltaEvento
        });
    }
}


function tratarRespuestaAltaEvento(oArrayRespuesta, sStatus, oXHR) {
    $("#divMensajes").dialog("open");
    if (oArrayRespuesta[0] == true) {
        $("#divMensajes").dialog("option", "title", "Error");
        $("#pMensaje").text(oArrayRespuesta[1]);
    } else {
        $('#divfrmAltaEvento').dialog("close");
        $("#divMensajes").dialog("option", "title", "OK");
        $("#pMensaje").text(oArrayRespuesta[1]);
    }

}

function tratarErrorAltaEvento(oXHR, sStatus, sError) {
    $("#divMensajes").dialog("open");
    $("#divMensajes").dialog("option", "title", sStatus);
    $("#pMensaje").text(sError);

}

function validarAltaEvento() {
    var bValido=true;
    var sError="";
    $('input,select').removeClass("error");
    var sFecha = frmAltaEvento.txtFecha.value.trim();

    var oExpReg = /^[a-zA-Z][a-zA-Z]*/;
    if(oExpReg.test($('[name=txtDescripcion]').val().trim()) == false){
        bValido = false;
        sError += "La descripcion no es valida<br>";
        $('[name=txtDescripcion]').addClass("error");
    }
    else {
        buscaEvento($('[name=txtDescripcion]').val().trim());
        if(bEventoEncontrado) {
            bValido = false;
            sError += "La descripcion del evento ya existe<br>";
            $('[name=txtDescripcion]').addClass("error");
        }
    }

    if (sFecha == "") {
        bValido = false;
        sError += "Campo fecha vacio<br>";
    }

    oExpReg = /^\d[0-9]/;
    if(oExpReg.test($('[name=txtPrecio]').val().trim()) == false){
        bValido = false;
        sError += "El precio no es valida<br>";
        $('[name=txtPrecio]').addClass("error");

    }


    if(!bValido){
        $("#divMensajes").dialog("open");
        $("#divMensajes").dialog("option","title","Error validacion");
        $("#pMensaje").html(sError);
    }
    return bValido;
}


var bEventoEncontrado=false;
var oAjaxvalidacionEvento = null;

function buscaEvento(sDescripcion){
    var sParametroGET = encodeURI("descripcion="+sDescripcion);
    var sURL = encodeURI("php/buscaEvento.php?");
    llamadaAjaxValidacionEvento(sURL,sParametroGET);
}

function llamadaAjaxValidacionEvento(sURL,sParametroGET){
    oAjaxvalidacionEvento = objetoXHR();
    oAjaxvalidacionEvento.open("GET",sURL+sParametroGET,false);
    oAjaxvalidacionEvento.onreadystatechange = respuestaValidacionEvento;
    oAjaxvalidacionEvento.send(null);
}

function respuestaValidacionEvento(){
    if(oAjaxvalidacionEvento.readyState == 4 && oAjaxvalidacionEvento.status ==200)	{
        var oArrayRespuesta = JSON.parse(oAjaxvalidacionEvento.responseText);
        bEventoEncontrado = oArrayRespuesta[0];
    }
}