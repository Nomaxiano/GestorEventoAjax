$("#divfrmAltaPersona").dialog({
    autoOpen: true,  // Es el valor por defecto
    close: function () {
        $("#frmAltaPersona")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    resizable:false,
    buttons: [{
        text: "Aceptar",
        click: procesoAltaPersona
    }]
});

function procesoAltaPersona() {
    if(validarAltaPersona()){
        sDNI = $('[name=txtDNI]').val().trim();
        sTipo = $('[name=radios]:checked').val();
        sNombre = $('[name=txtNombre]').val().trim();
        sApellidos = $('[name=txtApellidos]').val().trim();
        sTelefono = $('[name=txtTelefono]').val().trim();
        sCorreo = $('[name=txtCorreo]').val().trim();

        var persona = {
            dni:sDNI,
            tipo:sTipo,
            nombre:sNombre,
            apellidos:sApellidos,
            telefono:sTelefono,
            correo:sCorreo
        };

        var oPersona=JSON.stringify(persona);
        $.ajax({url:"php/altaPersona.php",
                data:{datos:oPersona},
                async:true,
                dataType:'json',
                method:"POST",
                cache:false,
                success: tratarRespuestaPersona,
                error: tratarErrorPersona      
        });
    }
}

function validarAltaPersona() {
    var bValido = true;
    var sError = "";
    $('input').removeClass("error");

    var oExpReg = /^[a-zA-Z]{3,40}/;

    if(oExpReg.test($('[name=txtNombre]').val().trim()) == false){
        bValido = false;
        sError += "El nombre no es valido<br>";
        $('[name=txtNombre]').addClass("error");
    }

    var oExpReg = /^[a-zA-Z]{3,40}/;

    if(oExpReg.test($('[name=txtApellidos]').val().trim()) == false){
        bValido = false;
        sError += "Los apellidos no son validos<br>";
        $('[name=txtApellidos]').addClass("error");
    }

    var oExpReg = /^[679]\d{8}/;

    if(oExpReg.test($('[name=txtTelefono]').val().trim()) == false){
        bValido = false;
        sError += "El telefono no es valido<br>";
        $('[name=txtTelefono]').addClass("error");
    }

    var oExpReg = /^[-\w.%+]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,125}[a-zA-Z]{2,63}$/;

    if(oExpReg.test($('[name=txtCorreo]').val().trim()) == false){
        bValido = false;
        sError += "El correo no es valido<br>";
        $('[name=txtCorreo]').addClass("error");
    }

    var oExpReg = /^\d{8}[a-zA-Z]$/;

    if(oExpReg.test($('[name=txtDNI]').val().trim()) == false){
        bValido = false;
        sError += "El DNI no es valido<br>";
        $('[name=txtDNI]').addClass("error");
    }
    else {//comprobamos si existe el cliente antes de insertarlo
        buscaPersona($('[name=txtDNI]').val().trim());
        if(bPersonaEncontrado) {
            bValido = false;
            sError += "El DNI ya existe<br>";
            $('[name=txtDNI]').addClass("error");
        }
    }

    if(!bValido){
        $("#divMensajes").dialog("open");
        $("#divMensajes").dialog("option","title","Error validacion");
        $("#pMensaje").html(sError);
    }
    return bValido;
}

function tratarRespuestaPersona(oArrayRespuesta,sStatus,oXHR)
{
    $("#divMensajes").dialog("open");

    if (oArrayRespuesta[0] == true){
        $("#divMensajes").dialog("option","title","Error");
        $("#pMensaje").text(oArrayRespuesta[1]);
    } else {
        $('#divFrmAltaCliente').dialog("close");
        $("#divMensajes").dialog("option","title","Alta OK");
        $("#pMensaje").text(oArrayRespuesta[1]);
        $("#divfrmAltaPersona").dialog("close");
    }
}

function tratarErrorPersona(oXHR,sStatus,sError){
    $("#divMensajes").dialog("open");
    $("#divMensajes").dialog("option","title",sStatus);
    $("#pMensaje").text(sError);
}

var bPersonaEncontrado=false;
var oAjaxvalidacionPersona = null;

function buscaPersona(sDni){

    var sParametroGET = encodeURI("dni="+sDni);

    var sURL = encodeURI("php/buscaPersona.php?");

    llamadaAjaxValidacionPersona(sURL,sParametroGET);

}

function llamadaAjaxValidacionPersona(sURL,sParametroGET){

    oAjaxvalidacionPersona = objetoXHR();

    oAjaxvalidacionPersona.open("GET",sURL+sParametroGET,false);

    oAjaxvalidacionPersona.onreadystatechange = respuestaValidacionPersona;

    oAjaxvalidacionPersona.send(null);
}

function respuestaValidacionPersona(){

    if(oAjaxvalidacionPersona.readyState == 4 && oAjaxvalidacionPersona.status == 200)	{
        var oArrayRespuesta = JSON.parse(oAjaxvalidacionPersona.responseText);

        bPersonaEncontrado = oArrayRespuesta[0];
    }

}


























