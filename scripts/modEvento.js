$("#divfrmModEventoElegir").dialog({
    autoOpen: true,  // Es el valor por defecto
    open:cargarSelectListadoEventos,
    modal:true,
    close: function () {
        $("#frmEventosElegir")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    resizable:false,
    buttons: [{
        text: "Aceptar",
        click: cargarModificaEvento
    }]
});


function cargarSelectListadoEventos(){
    $.get('php/getEventos.php',null,cargarEventos,'json');
}
function cargarEventos(oArrayEventos, sStatus, oXHR){
    $("#sltModificarEvento").empty();

    $(oArrayEventos).each(function(){
        $('<option>').val(this.ID_EVENTO).text(this.DESCRIPCION).appendTo("#sltModificarEvento");
    });
}

function cargarModificaEvento(){
    if( $('#frmEventosModificar').size() == 0 ){
        $('<div title="Modificar Evento" id="divfrmModEvento"></div>').appendTo('#formularios').load("formularios/modEvento.html");

    } else {
        // Lo abro si está cerrado
        $('#divfrmModEvento').dialog("open");
    }
}
function procesoModEvento(){
    if(validarModEvento()){
        var iId=$('[name=txtId]').val().trim();
        var sDescripcion=$('[name=txtDescripcion]').val().trim();
        var dFecha = new Date($("#txtFecha").val());
        var sLugar=$('[name=lstModLugares]').val().trim();
        var sContratante=$('[name=lstModContratantes]').val().trim();
        var iPrecio=$('[name=txtPrecio]').val().trim();

        var oEvento={
            id_evento:iId,
            descripcion: sDescripcion,
            fecha: dFecha,
            lugar: sLugar,
            contratante: sContratante,
            precio: iPrecio
        };

        var jEvento=JSON.stringify(oEvento);

        $.ajax({ url : "php/modEvento.php",
            data:{datos:jEvento},
            async: false,
            dataType :'json',
            method: "POST",
            cache: false,
            success: tratarRespuestaEvento,
            error :tratarErrorModEvento
        });
    }
}

function tratarRespuestaEvento(oArrayRespuesta,sStatus,oXHR){
    $("#divMensajes").dialog("open");
    if (oArrayRespuesta[0] == true){
        $("#divMensajes").dialog("option","title","Error");
        $("#pMensaje").text(oArrayRespuesta[1]);
    } else {
        $('#divfrmModEvento').dialog("close");
        $("#divMensajes").dialog("option","title","OK");
        $("#pMensaje").text(oArrayRespuesta[1]);
    }
}

function tratarErrorModEvento(oXHR,sStatus,sError){
    $("#divMensajes").dialog("open");
    $("#divMensajes").dialog("option","title",sStatus);
    $("#pMensaje").text(sError);
}

function cargarDatosDialogoEvento(){
    var sEvento=$('#sltModificarEvento').val();
    $("#divfrmModEventoElegir").dialog("close");
    $.get('php/getEvento.php?id_evento='+sEvento,null,cargarDatosEvento,'json');
}

function cargarDatosEvento(oArray, sStatus, oXHR){
    var str= oArray[0].FECHA;
    var anno = str.substr(0,4);
    var mes = str.substr(5,2);
    var dia = str.substr(8,2);

    var fecha =(mes+"/"+dia+"/"+anno);

    $('[name=txtId]').val(oArray[0].ID_EVENTO);
    $('[name=txtFecha]').val(fecha);
    $('[name=txtDescripcion]').val(oArray[0].DESCRIPCION);
    $("#lstModLugares").val(oArray[0].ID_LUGAR);
    $("#lstModContratantes").val(oArray[0].DNI_CONTRATANTE);
    $('[name=txtPrecio]').val(oArray[0].PRECIO);
}


function validarModEvento(){
    var bValido=true;
    var sError="";
    $('input,select').removeClass("error");
    var sFecha = frmEventosModificar.txtFecha.value.trim();


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


function cargaDatosLugares(){
    $.get('php/getLugares.php',null,cargarLugar,'json');

}




