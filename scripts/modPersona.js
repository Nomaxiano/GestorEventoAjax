$("#divfrmModPersonaElegir").dialog({
    autoOpen: true,  // Es el valor por defecto
    open:function() {
        cargarSelectListadoPersonas();
    },
    modal: true,
    close: function () {
        $("#frmPersonaElegir")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height: "auto",
    width: "auto",
    resizable: false,
    buttons: [{
        text: "Aceptar",
        click: cargarModificaPersona
    }]
});

function cargarSelectListadoPersonas(){
    $.get('php/getPersonas.php',null,cargarPersonasEvento,'json');
}

function cargarPersonasEvento(oArrayLugares, sStatus, oXHR){
    $("#sltModificarPer").empty();

    $(oArrayLugares).each(function(){
        $('<option>').val(this.DNI).text(this.APELLIDOS+", "+this.NOMBRE).appendTo("#sltModificarPer");
    });
}

function cargarModificaPersona(){
    if( $('#frmPersonaModificar').size() == 0 ){
        $('<div title="Modificar Persona" id="divfrmModPersona"></div>').appendTo('#formularios').load("formularios/modPersona.html");

    } else {
        // Lo abro si está cerrado
        $('#divfrmModPersona').dialog("open");
    }
}

function procesoModPersona(){
    if(validarModPersona()){
        sDNI = $('[name=txtDNI]').val().trim();
        sTipo = $('[name=radios]:checked').val();
        sNombre = $('[name=txtNombre]').val().trim();
        sApellidos = $('[name=txtApellidos]').val().trim();
        sTelefono = $('[name=txtTelefono]').val().trim();
        sCorreo = $('[name=txtCorreo]').val().trim();

        var oPersona = {
            dni:sDNI,
            tipo:sTipo,
            nombre:sNombre,
            apellidos:sApellidos,
            telefono:sTelefono,
            correo:sCorreo
        };

        var jPersona=JSON.stringify(oPersona);

        $.ajax({ url : "php/modPersona.php",
            data:{datos:jPersona},
            async: false,
            dataType :'json',
            method: "POST",
            cache: false,
            success: tratarRespuestaPersona,
            error :tratarErrorModPersona
        });
    }
}

function tratarRespuestaPersona(oArrayRespuesta,sStatus,oXHR){
    $("#divMensajes").dialog("open");
    if (oArrayRespuesta[0] == true){
        $("#divMensajes").dialog("option","title","Error");
        $("#pMensaje").text(oArrayRespuesta[1]);
    } else {
        $('#divfrmModPersona').dialog("close");
        $("#divMensajes").dialog("option","title","OK");
        $("#pMensaje").text(oArrayRespuesta[1]);
    }
}

function tratarErrorModPersona(oXHR,sStatus,sError){
    $("#divMensajes").dialog("open");
    $("#divMensajes").dialog("option","title",sStatus);
    $("#pMensaje").text(sError);
}

function cargarDatosDialogo(){
    var sPersona=$('#sltModificarPer').val();
    $("#divfrmModPersonaElegir").dialog("close");

    $.get('php/getPersona.php?dni='+sPersona,null,cargarDatos,'json');
}

function cargarDatos(oArray, sStatus, oXHR){
    $('[name=txtDNI]').val(oArray[0].DNI);
    $('[name=txtTipo]').val(oArray[0].TIPO);
    $('[name=txtNombre]').val(oArray[0].NOMBRE);
    $('[name=txtApellidos]').val(oArray[0].APELLIDOS);
    $('[name=txtTelefono]').val(oArray[0].TELEFONO);
    $('[name=txtCorreo]').val(oArray[0].EMAIL);
}


function validarModPersona(){
    var bValido=true;
    return bValido;
}