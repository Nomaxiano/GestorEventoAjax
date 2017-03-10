$("#divfrmListarEventoElegir").dialog({
    autoOpen: true,  // Es el valor por defecto
    modal: true,
    hide: "fold",
    show: "fold",
    height: "auto",
    width: "auto",
    resizable: false,
    buttons: [{
        text: "Aceptar",
        click: procesoListarEvento
    }]
});


$(function () {
    $('#txtFechaInicio').datepicker({
        monthNamesShort: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        dayNames: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
        dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        changeYear: true,
        changeMonth: true
    });
});

$(function () {
    $('#txtFechaFin').datepicker({
        monthNamesShort: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        dayNames: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
        dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        changeYear: true,
        changeMonth: true
    });
});


function procesoListarEvento() {
    if (validarFechaEvento()) {
        $("#listado").remove();
        $.get('php/getEventosListado.php', null, cargarListadoEventos, 'json');

        function cargarListadoEventos(oArrayEventos, sStatus, oXHR) {
            var jqTabla = $('<table id="listado" border="1">');
            $('<tr><th>ID</th><th>Descripcion</th><th>Lugar</th><th>Fecha</th><th>Contratante</th><th>Precio</th></tr>').appendTo(jqTabla);
            $(oArrayEventos).each(function () {
                var str = this.fecha;
                var anno = str.substr(0, 4);
                var mes = str.substr(5, 2);
                var dia = str.substr(8, 2);
                var fecha = (mes + "/" + dia + "/" + anno);

                var dFechaI = new Date($("#txtFechaInicio").val());
                var dFechaF = new Date($("#txtFechaFin").val());
                var dFechaT = new Date(fecha);

                if (dFechaI <= dFechaT && dFechaT <= dFechaF)
                    $('<tr>' +
                        '<td>' + this.id + '</td>' +
                        '<td>' + this.descripcion + '</td>' +
                        '<td>' + this.lugar + '</td>' +
                        '<td>' + this.fecha + '</td>' +
                        '<td>' + this.nombre + " " + this.apellidos + '</td>' +
                        '<td>' + this.precio + '</td>' +
                        '</tr>').appendTo(jqTabla);
            });


            jqTabla.appendTo("#listados");
            $('#listados').dialog('open');
        }

    }
}


function validarFechaEvento() {
    var bValido = true;
    var sError = "";
    $('input,select').removeClass("error");

    var dtFechaIn = $('[name=txtFechaInicio]').val().trim();
    var dtFechaFin = $('[name=txtFechaFin]').val().trim();

    if (dtFechaIn == "") {
        bValido = false;
        sError += "Campo fecha inicio vacio<br>";
    }

    if (dtFechaFin == "") {
        bValido = false;
        sError += "Campo fecha fin vacio<br>";
    }

    if (dtFechaIn > dtFechaFin) {
        bValido = false;
        sError += "La fecha fin no puedes ser anterior a la de inicio<br>";
    }

    if (!bValido) {
        $("#divMensajes").dialog("open");
        $("#divMensajes").dialog("option", "title", "Error validacion");
        $("#pMensaje").html(sError);
    }
    return bValido;
}





