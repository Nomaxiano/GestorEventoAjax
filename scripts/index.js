$(function () {
    $("#menu").menu();

    //dialogo mensaje
    $("#divMensajes").dialog({
        autoOpen: false,
        modal: true,
        buttons: [{
            text: "Aceptar",
            click: function () {
                $(this).dialog("close");
            }
        }]
    });

    //dialogo listados
    $("#listados").dialog({
        autoOpen: false,
        modal: true,
        close: function () {
            $("#listado").remove();
        },
        closeOnEscape: false,
        hide: "fold",
        show: "fold",
        height: "auto",
        width: "auto",
        resizable: true,
        buttons: [{
            text: "Aceptar",
            click: function () {
                $(this).dialog("close");
            }
        }]
    });

    //dialogo alta evento
    $("#mnuAltaEvento").click(function () {
        // Verifico si ya he cargado el formulario antes
        if ($('#frmAltaEvento').size() == 0) {
            $('<div id="divfrmAltaEvento" title="Alta Evento">').appendTo('#formularios').load("formularios/altaEvento.html", function () {
                $.getScript("scripts/altaEvento.js")
            });
        } else {
            // Lo abro si está cerrado
            $('#divfrmAltaEvento').dialog("open");
        }
    });

    //dialogo modificar evento
    $("#mnuModEvento").click(function () {
        if ($('#frmEventosElegir').size() == 0) {
            $('<div id="divfrmModEventoElegir" title="Modificar Evento">').appendTo('#formularios').load("formularios/elegirModEvento.html", function () {
                $.getScript("scripts/modEvento.js")
            });
        } else {
            $('#divfrmModEventoElegir').dialog("open");
        }
    });

    //dialogo listar evento por fecha
    $("#mnuListadoFechaEvento").click(function () {
        // Verifico si ya he cargado el formulario antes
        if ($('#frmEventosFechaElegir').size() == 0) {
            $('<div id="divfrmModEventoFechaElegir" title="Listar Evento">').appendTo('#formularios').load("formularios/elegirListarEvento.html", function () {
                $.getScript("scripts/listarFechaEvento.js")
            });
        } else {
            // Lo abro si está cerrado
            $('#divfrmListarEventoElegir').dialog("open");
        }
    });

    //Menu Listado Eventos
    $("#mnuListadoEvento").click(function () {
        $("#listado").remove();
        $.get('php/getEventosListado.php', null, cargarListadoEventos, 'json');
    });

    function cargarListadoEventos(oArrayEventos, sStatus, oXHR) {
        var jqTabla = $('<table id="listado" border="1">');
        $('<tr><th>ID</th><th>Descripcion</th><th>Lugar</th><th>Fecha</th><th>Contratante</th><th>Precio</th></tr>').appendTo(jqTabla);
        $(oArrayEventos).each(function () {
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

    //dialogo modificar lugar
    $("#mnuModLugar").click(function () {
        if ($('#frmLugaresElegir').size() == 0) {
            $('<div id="divfrmModLugarElegir" title="Modificar Lugar">').appendTo('#formularios').load("formularios/elegirModLugar.html", function () {
                $.getScript("scripts/modLugar.js")
            });
        } else {
            $('#divfrmModLugarElegir').dialog("open");
        }
    });

    //Menu Listado Lugares
    $("#mnuListadoLugar").click(function () {
        $("#listado").remove();
        $.get('php/getLugares.php', null, cargarListadoLugares, 'json');
    });

    function cargarListadoLugares(oArrayLugares, sStatus, oXHR) {
        var jqTabla = $('<table id="listado" border="1">');
        $('<tr><th>ID</th><th>Descripción</th><th>Dirección</th><th>Capacidad</th></tr>').appendTo(jqTabla);

        $(oArrayLugares).each(function () {
            $('<tr>' +
                '<td>' + this.ID_LUGAR + '</td>' +
                '<td>' + this.DESCRIPCION + '</td>' +
                '<td>' + this.DIRECCION + '</td>' +
                '<td>' + this.CAPACIDAD + '</td>' +
                '</tr>').appendTo(jqTabla);
        });
        jqTabla.appendTo("#listados");
        $('#listados').dialog('open');
    }

    //dialogo alta persona
    $("#mnuAltaPersona").click(function () {
        // Verifico si ya he cargado el formulario antes
        if( $('#frmAltaPersona').size() == 0 ){
            $('<div id="divfrmElegirModLugar" title="Alta Persona">').appendTo('#formularios').load("formularios/altaPersona.html", function(){
                $.getScript("scripts/altaPersona.js")});
        }
        else {
            // Lo abro si está cerrado
            $('#divfrmAltaPersona').dialog("open");
        }
    });

    //dialogo modificar lugar
    $("#mnuModPersona").click(function(){
        // Verifico si ya he cargado el formulario antes
        if( $('#frmPersonaElegir').size() == 0 ){
            $('<div id="divfrmModPersonaElegir" title="Modificar Persona">').appendTo('#formularios').load("formularios/elegirModPersona.html", function(){ $.getScript("scripts/modPersona.js")});
        } else {
            // Lo abro si está cerrado
            $('#divfrmModPersonaElegir').dialog("open");
        }
    });

    //Menu Listado Lugares
    $("#mnuListadoPersona").click(function () {
        $("#listado").remove();
        $.get('php/getPersonas.php', null, cargarListadoPersonas, 'json');
    });

    function cargarListadoPersonas(oArrayLugares, sStatus, oXHR) {
        var jqTabla = $('<table id="listado" border="1">');
        $('<tr><th>DNI</th><th>Tipo de Trabajador</th><th>Nombre</th><th>Apellidos</th><th>Telefono</th><th>Correo</th></tr>').appendTo(jqTabla);

        $(oArrayLugares).each(function () {
            $('<tr>' +
                '<td>' + this.DNI + '</td>' +
                '<td>' + this.TIPO + '</td>' +
                '<td>' + this.NOMBRE + '</td>' +
                '<td>' + this.APELLIDOS + '</td>' +
                '<td>' + this.TELEFONO + '</td>' +
                '<td>' + this.EMAIL + '</td>' +
                '</tr>').appendTo(jqTabla);
        });
        jqTabla.appendTo("#listados");
        $('#listados').dialog('open');
    }

    //Menu Alta Entrada
    $("#mnuVentaEntrada").click(function(){
        // Verifico si ya he cargado el formulario antes
        if( $('#frmEntradasAlta').size() == 0 ){

            $('<div title="Alta Entrada" id="divFrmAltaEntrada"></div>').appendTo('#formularios').load("formularios/altaEntrada.html", function(){
                $.getScript("scripts/altaEntrada.js")});

        } else {
            // Lo abro si está cerrado
            $('#divFrmAltaEntrada').dialog("open");
        }
    });

    //Menu Listado Entrada por Cliente
    $("#mnuListadoEntradaCli").click(function () {
        $("#listado").remove();
        $.get('php/getEntradasCli.php',null, cargarListadoEntradasCli,'json');
    });

    function cargarListadoEntradasCli(oArrayLugares, sStatus, oXHR) {
        var jqTabla = $('<table id="listado" border="1">');
        $('<tr><th>DNI</th><th>Nombre</th><th>Apellidos</th><th>Unidades</th></tr>').appendTo(jqTabla);

        $(oArrayLugares).each(function () {
            $('<tr>' +
                '<td>' + this.dni + '</td>' +
                '<td>' + this.nombre + '</td>' +
                '<td>' + this.evento + '</td>' +
                '<td>' + this.unidades + '</td>' +
                '</tr>').appendTo(jqTabla);
        });
        jqTabla.appendTo("#listados");
        $('#listados').dialog('open');
    }

    //Menu Listado Entrada por Evento
    $("#mnuListadoEntradaEven").click(function(){
        $.get("php/getEntradaEven.php", null, function(respuesta) {
            var iNumAsistentes = respuesta.querySelectorAll("asistente").length;
            var oAsistente = respuesta.querySelectorAll("asistentes>asistente");
            var totalAsitentes = 0;
            var sTexto = "";
            var jqTabla = $('<table id="listado" border="1">');
            sTexto += "<tr>";
            sTexto += "<th>Nombre del Evento</th><th>Total Unidades</th>";
            sTexto += "</tr>";
            for (var i = 0; i < iNumAsistentes; i++) {
                totalAsitentes++;
                sTexto += "<tr>";
                sTexto += "<td>" + oAsistente[i].querySelector("nombre").textContent + "</td><td>" + oAsistente[i].querySelector("unidades").textContent+"</td>";
                sTexto += "</tr>";
            }
            sTexto += "</table>";
            $(sTexto).appendTo(jqTabla); //Convierte la cadena en una función.
            jqTabla.appendTo("#listados");
            $('#listados').dialog('open');
        })
    });

});

	

