$("#divfrmAltaLugar").dialog({
    autoOpen: true,  // Es el valor por defecto
    modal: true,
    close: function () {
        $("#frmAltaLugar")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height: "auto",
    width: "auto",
    resizable: false,
    buttons: [{
        text: "Aceptar",
        click: procesoAltaLugar
    }]
});

/* VARIABLES PARA AJAX */
var oAjaxvalidacionLugar = null;

function procesoAltaLugar() {
    //validacion
    if (validarAltaLugar()) {
        var sDescripcion = frmAltaLugar.txtDescripcion.value.trim();
        var sDireccion = frmAltaLugar.txtDireccion.value.trim();
        var sCapacidad = frmAltaLugar.txtCapacidad.value.trim();

        var oLugar = {
            descripcion: sDescripcion,
            direccion: sDireccion,
            capacidad: sCapacidad
        };

        // Formateo de parametro POST
        var sParametroPOST = "datos="+JSON.stringify(oLugar);

        // Llamada POST con Jquery
        $.post("php/altaLugar.php",sParametroPOST,respuestaAltaLugar,'json');

    }
}

function respuestaAltaLugar(oArrayRespuesta,sEstado,oXHR){
    $("#divMensajes").dialog("open");
    if (oArrayRespuesta[0] == true){
        $("#divMensajes").dialog("option","title","Error");
        $("#pMensaje").text(oArrayRespuesta[1]);
    } else {
        $('#divfrmAltaLugar').dialog("close");
        $("#divMensajes").dialog("option","title","OK");
        $("#pMensaje").text(oArrayRespuesta[1]);
    }
}


function validarAltaLugar() {
    var bValido=true;
    var sError="";
    $('input,select').removeClass("error");

    var oExpReg = /^[a-zA-Z][a-zA-Z]*/;
    if(oExpReg.test($('[name=txtDescripcion]').val().trim()) == false){

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
    }

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