$("#divFrmAltaEntrada").dialog({
    autoOpen: true,  // Es el valor por defecto
    open:function() {
        cargarSelectEventos();
    },

    close: function () {
        $("#frmEntradasAlta")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    resizable:false,
    buttons: [{
        text: "Aceptar",
        click: procesoAltaEntrada
    }]
});

function cargarSelectEventos(){
    $.get('php/getEventos.php',null,cargarEventosEntrada,'json');
}

function cargarEventosEntrada(oArrayEventos, sStatus, oXHR){
    $("#sltAltaEntrEven").empty();

    $(oArrayEventos).each(function(){
        $('<option>').val(this.ID_EVENTO).text(this.DESCRIPCION).appendTo("#sltAltaEntrEven");
    });
}


function procesoAltaEntrada() {
    if(validarAltaEntrada()){
        var sDNI=$("#txtDNIEntrada").val().trim();
        var sNombre=$("#txtNombreEntrada").val().trim();
        var sApellidos=$("#txtApellidosEntrada").val().trim();
        var sNumEntradas=$("#numEntradas").val().trim();
        var sEvento = $("#sltAltaEntrEven").val();

        var oEntrada={
            idEntrada:sEvento,
            dni:sDNI,
            nombre:sNombre,
            apellidos:sApellidos,
            numEntradas:sNumEntradas
        };

        var jEntrada=JSON.stringify(oEntrada);

        $.ajax({ url : "php/altaEntrada.php",
            data:{datos:jEntrada},
            async: true,
            dataType :'json',
            method: "POST",
            cache: false,
            success: tratarRespuestaAltaEntrada,
            error :tratarErrorAltaEntrada
        });
    }
}

function tratarRespuestaAltaEntrada(oArrayRespuesta,sStatus,oXHR){
    $("#divMensajes").dialog("open");

    if (oArrayRespuesta[0] == true){
        $("#divMensajes").dialog("option","title","Error");
        $("#pMensaje").text(oArrayRespuesta[1]);
    } else {
        $('#divFrmAltaEntrada').dialog("close");
        $("#divMensajes").dialog("option","title","OK");
        $("#pMensaje").text(oArrayRespuesta[1]);
    }
}

function tratarErrorAltaEntrada(oXHR,sStatus,sError){
    $("#divMensajes").dialog("open");
    $("#divMensajes").dialog("option","title",sStatus);
    $("#pMensaje").text(sError);
}

function validarAltaEntrada(){
    var bValido=true;
    var sError="";
    //limpia errores
    $('input,select').removeClass("error");

    var sDNI=$("#txtDNIEntrada").val().trim();
    var sNombre=$("#txtNombreEntrada").val().trim();
    var sApellidos=$("#txtApellidosEntrada").val().trim();
    var sNumEntradas=$("#numEntradas").val().trim();

    var oExpReg = /^\d{8}[a-zA-Z]$/;

    if(oExpReg.test(sDNI) == false){
        bValido = false;
        sError += "El DNI no es valido<br>";
        $('#txtDNIEntrada').addClass("error");
    }

    var oExpReg = /^[a-zA-Z]{3,40}/;

    if(oExpReg.test(sNombre) == false){
        bValido = false;
        sError += "El nombre no es valido<br>";
        $('#txtNombreEntrada').addClass("error");
    }

    var oExpReg = /^[a-zA-Z]{3,40}/;

    if(oExpReg.test(sApellidos) == false){
        bValido = false;
        sError += "Los apellidos no son validos<br>";
        $('#txtApellidosEntrada').addClass("error");
    }

    if(sNumEntradas == ""){
        bValido = false;
        sError += "El campo de numero de entradas no puede estar vacio<br>";
        $('#numEntradas').addClass("error");
    }

    if(!bValido){
        $("#divMensajes").dialog("open");
        $("#divMensajes").dialog("option","title","Error validacion");
        $("#pMensaje").html(sError);
    }

    return bValido;
}

//Cargar Datos Cliente
document.getElementById("btnDNIEntrada").addEventListener("click",obtenerDatosAsistente);

function obtenerDatosAsistente() {
    var sDNI=$('#txtDNIEntrada').val();
    if(sDNI == "" || buscaPersona(sDNI)==false){
        $("#divMensajes").dialog("open");
        $("#divMensajes").dialog("option","title","Error");
        $("#pMensaje").text("El campo no puede estar vacío y el DNI debe existir");
    }
    else{
        $.get('php/getPersona.php?dni='+sDNI,null,cargarDatosAsistente,'json');
    }
}

function cargarDatosAsistente(oArray, sStatus, oXHR) {
    $('[name=txtNombreEntrada]').val(oArray[0].NOMBRE);
    $('[name=txtApellidosEntrada]').val(oArray[0].APELLIDOS);
}

function buscaPersona(dniBuscar){
    $.get('php/getPersona.php?dni='+dniBuscar,null,'json');
}