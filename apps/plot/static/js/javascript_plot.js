$( document ).ready(function() {
    click_buttons()
    transform_users_time()
    $('#users_interaction').click()
    $('.loader').hide()
});

function active_nav_li(){
    var pathname = window.location.pathname;
    $('.nav > li > a[href="'+pathname+'"]').parent().addClass('active');
}
 

function transform_users_time(){
    max = Math.max(data.usersTime[0]['y'], data.usersTime[1]['y'], data.usersTime[2]['y'], data.usersTime[3]['y'])
    sum = parseFloat(data.usersTime[0]['y']) + parseFloat(data.usersTime[1]['y']) + parseFloat(data.usersTime[2]['y']) + parseFloat(data.usersTime[3]['y'])
    console.log(sum)
    console.log(data.usersTime[0]['y'])
    users_time = [data.usersTime[0]['y']/max, data.usersTime[1]['y']/max, data.usersTime[2]['y']/max, data.usersTime[3]['y']/max]
    users_time_percent = [Math.round((parseFloat(data.usersTime[0]['y'])/sum)*100),Math.round((parseFloat(data.usersTime[1]['y'])/sum)*100),Math.round((parseFloat(data.usersTime[2]['y'])/sum)*100),Math.round((parseFloat(data.usersTime[3]['y'])/sum)*100)]
    console.log(users_time_percent)
}   
function click_buttons(){

    $('#users_speak').on('click', function(){
        swal.showLoading();
        html = '<div class="table-responsive">'
        html += '<div class="col-md-8 col-md-offset-2">'
        html += interv_table
        html += '</div>' 
        html += '</div>'
        footer = "<a type='link' id='download_csv' href='/media/plot/"+user+"intervenciones.csv' class='btn btn-primary'>Descargar datos</a>"
        footer += '<button class="btn btn-default" id="btnSave">Descargar imagen</button>'
        $.ajax({
            type: "GET",
            url: '/plot/interv',
            success: function(data) {
                data += html
            	$('.panel-body').html(data)
            	$('.panel-heading').html('Intervenciones en el tiempo')
            	$('.panel-footer').html(footer)
                dowloadPanelBody('usersSpeak')
                swal.close();
                console.log('success')
                //$('.panel').show()
                /*$('.loader').hide()*/
            },
            error: function(data) {
                console.log('error')
            },
        });
    });

    $('#users_total_time').on('click', function(){
        // $('.panel').hide()
        /*$('.loader').show()*/ 
        swal.showLoading();
        html = '<div id="graph" class="graph"></div>'
        html += '<div id="donut" class="graph"></div>'
        footer = '<button class="btn btn-default" id="btnSave">Descargar imagen</button>'
        $('.panel-body').html(html)
        $('.panel-heading').html('Tiempo total de habla por participante')
        $('.panel-footer').html(footer)
        /*var json = JSON.parse(data.data)*/
        /*console.log(json)*/
        console.log(data)
        colors = function (row, series, type) {
            if(row.label == "Usuario 1") return "#c9302c";
            else if(row.label == "Usuario 2") return "#337ab7";
            else if(row.label == "Usuario 3") return "#5cb85c";
            else if(row.label == "Usuario 4") return "#f0ad4e";
        }
        barGraph(data.usersTime, colors, ['Segundos'])
        donutGraph(data.usersSpeakTimePercent)
        dowloadPanelBody('usersTotalTime')
        swal.close();

        /*morrisDonut.options.data.forEach(function(label, i){
            var legendItem = $('<span></span>').text(label['label']).prepend('<i>&nbsp;</i>');
            legendItem.find('i').css('backgroundColor', morrisDonut.options.colors[i]);
            $('#legend').append(legendItem)
          })*/
        console.log('success') 
    });

    $('#users_interv_time').on('click', function(){
        //$('.panel').hide()
        /*$('.loader').show()*/ 
        swal.showLoading();
        footer ='<div class="btn-group">'	
        footer += '<button type="button" id="user1" class="btn btn-danger">Usuario 1</button>'
    	footer += '<button type="button" id="user2" class="btn btn-primary">Usuario 2</button>'
    	footer += '<button type="button" id="user3" class="btn btn-success">Usuario 3</button>'
    	footer += '<button type="button" id="user4" class="btn btn-warning">Usuario 4</button>'
        footer += '</div>'
        footer += '<div class="mt-10">'
        footer +='<div class="btn-group">'
        footer += '<button type="button" id="general" class="btn btn-default">General</button>'
        footer += '<button type="button" id="total" class="btn btn-default">Total</button>'
        footer += '<button class="btn btn-default" id="btnSave">Descargar imagen</button>'
        footer += '</div>'
        footer += '</div>'
        html = '<div id="graph" class="graph"></div>' 
        $('.panel-body').html(html)
        $('.panel-heading').html('Duración intervenciones')
        $('.panel-footer').html(footer)
        click_buttons_interv_time()
        barGraph(data.usersIntDur[0], '#c9302c', ['Segundos'])
        $("#general").click()
        dowloadPanelBody('usersIntervInTime')
        swal.close();
        console.log('success')
    	/*$.ajax({
            type: "GET",
            url: '/plot/barGraph',
            success: function(data) {
            	//$('.panel-body').load(data)
            	$('.panel-body').html(data.html)
            	$('.panel-heading').html('Duración intervenciones')
            	$('.panel-footer').html(footer)
            	var json = JSON.parse(data.data)
            	click_buttons_interv_time()
    			console.log(json)
    			barGraph(json.usersIntDur[0], '#c9302c', ['Segundos'])
                console.log('success')
            },
            error: function(data) {
                console.log('error')
            },
        });*/
    });

    $('#users_int_in_time').on('click', function(){
        /*$('.loader').show()*/ 
        swal.showLoading();
        html = '<div id="line" class="graph"></div>'
        html += '<div id="legend" class="legend col-md-offset-3"></div>'
        footer = '<button class="btn btn-default" id="btnSave">Descargar imagen</button>'
        $('.panel-body').html(html)
        $('.panel-heading').html('Intervenciones a traves del tiempo')
        $('.panel-footer').html(footer)
        labels = ['Usuario 1', 'Usuario 2', 'Usuario 3', 'Usuario 4']
        colors =  ['#c9302c', '#337ab7','#5cb85c','#f0ad4e']
        lineGraph(data.userIntInTime, colors, labels)
        console.log('success')
        morrisLine.options.labels.forEach(function(label, i){
        var legendItem = $('<span></span>').text(label).prepend('<i>&nbsp;</i>');
        legendItem.find('i').css('backgroundColor', morrisLine.options.lineColors[i])
        $('#legend').append(legendItem)
        });
        dowloadPanelBody('usersIntervAccum')
        swal.close();
        /*$.ajax({
            type: "GET",
            url: '/plot/lineGraph',
            success: function(data) {
            	$('.panel-body').html(data.html)
            	$('.panel-heading').html('Intervenciones a traves del tiempo')
            	$('.panel-footer').html('')
                var json = JSON.parse(data.data)
    			console.log(json)
    			lineGraph(json.userIntInTime)
                console.log('success')
            },
            error: function(data) {
                console.log('error')
            },
        });*/
    });

    $('#users_vol').on('click', function(){
        //$('.panel').hide()
        /*$('.loader').show()*/
        swal.showLoading();
        footer ='<div class="btn-group">'
        footer += '<button type="button" id="user1" class="btn btn-danger">Usuario 1</button>'
        footer += '<button type="button" id="user2" class="btn btn-primary">Usuario 2</button>'
        footer += '<button type="button" id="user3" class="btn btn-success">Usuario 3</button>'
        footer += '<button type="button" id="user4" class="btn btn-warning">Usuario 4</button>'
        footer += '</div>' 
        footer += '<div class="mt-10">'
        footer +='<div class="btn-group">'
        footer += '<button type="button" id="vol_in_time" class="btn btn-default">General</button>'
        footer += '<button type="button" id="total" class="btn btn-default">Total</button>'
        footer += '<button class="btn btn-default" id="btnSave">Descargar imagen</button>'
        footer += '</div>' 
        footer += '</div>' 
        html = '<div id="graph" class="graph"></div>'
        $('.panel-body').html(html)
        $('.panel-heading').html('Volumen promedio de cada intervención')
        $('.panel-footer').html(footer)
        /*var json = JSON.parse(data.data)
        console.log(json)*/
        click_buttons_users_vol()
        barGraph(data.usersVol[0], ['#c9302c'], ['Decibelios'])
        $("#vol_in_time").click()
        dowloadPanelBody('usersIntensity')
        swal.close();
        console.log('success')
        /*$.ajax({
            type: "GET",
            url: '/plot/barGraph',
            success: function(data) {
                $('.panel-body').html(data.html)
                $('.panel-heading').html('Volumen de la voz de los participante')
                $('.panel-footer').html(footer)
                var json = JSON.parse(data.data)
                console.log(json)
                click_buttons_users_vol()
                barGraph(json.usersVol[0], '#c9302c', ['Volumen'])
                console.log('success')
            },
            error: function(data) {
                console.log('error')
            },
        });*/
    });

    $('#users_interv_buble').on('click', function(data){     
        /*$('.panel').hide()*/
        /*$('.loader').show()*/
        swal.showLoading();
        $.ajax({
            type: "GET",
            url: '/plot/'+user+'/flare.json',
            success: function(data) {
                html = '<div id="legend" class="legend col-md-offset-3"></div>'
                html += '<svg width="960" height="960"></svg>'
                footer = '<button class="btn btn-default" id="btnSave">Descargar imagen</button>'
                $('.panel-body').html(html)
                $('.panel-heading').html('Agrupación de intervenciones por usuario')
                $('.panel-footer').html(footer)
                legendItem =  '<span><i class="back-red"> </i>Usuario 1</span>'
                legendItem += '<span><i class="back-blue"> </i>Usuario 2</span>'
                legendItem += '<span><i class="back-green"> </i>Usuario 3</span>'
                legendItem += '<span><i class="back-yellow"> </i>Usuario 4</span>'   
                $('#legend').append(legendItem)
                buble()
                downloadImg('usersIntervBuble')
                swal.close();
                console.log('success')
            },
            error: function(data) {
                console.log('error')
            },
        });
        
    });

    $('#sec_interv').on('click', function(data){    
        /*$('.panel').hide()*/ 
        /*$('.loader').show()*/
        swal.showLoading();
        footer = '<button class="btn btn-default" id="btnSave">Descargar imagen</button>'

        $.ajax({
            type: "GET",
            url: '/plot/'+user+'/relations',
            success: function(data) {
                html = '<svg></svg>'
                $('.panel-body').html(html)
                $('.panel-heading').html('Relación entre intervenciones')
                $('.panel-footer').html(footer)
                /*var json = JSON.parse(data)*/
                relations()
                downloadImg('usersIntervSeq')
                swal.close();
                /*console.log(json)*/
                console.log('success')
            },
            error: function(data) {
                console.log('error')
            },
        });
        
    });
    $('#users_interaction').on('click', function(dat){      
        /*$('.loader').show()*/
        //$('.panel').hide()
        swal.showLoading();
        $.ajax({
            type: "GET",
            url: '/plot/'+user+'/force.csv',
            success: function() {
                html = '<div class="row plot">'
                html += '<div class="col-md-6">'
                html += '<svg></svg>'
                html += '</div>'
                html += '<div class="col-md-6">'
                html += '<div class="table-responsive">'
                html += interaction_table
                html += '</div>'
                html += '<div class="alert alert-info">'
                html += '<strong>Información!</strong> El tamaño del nodo es proporcional a la duración de habla del participante durante el evento.</div>'
                html += '</div>'
                html += '</div>'
                html += '<div id="img-out"></div>'
                html += '</div>'
                footer = "<a type='link' id='download_csv' href='/media/plot/"+user+"relaciones.csv' class='btn btn-primary'>Descargar datos</a>"
                footer += '<button class="btn btn-default" id="btnSave">Descargar imagen</button>'
                $('.panel-body').html(html)
                $('.panel-heading').html('Interacción entre usuarios')
                $('.panel-footer').html(footer)
                downloadImg('users_interaction')
                nodes()
                swal.close()
                console.log('success')
            },
            error: function(data) {
                console.log('error')
            },
        });
        
    });

    $('#users_vol_frame').on('click', function(){
       /*$('.loader').show()*/
        swal.showLoading();
        footer =  '<div class="btn-group">'
        footer += '<button type="button" id="vol_frame_silence" class="btn btn-default">Con silencio</button>'
        footer += '<button type="button" id="vol_frame" class="btn btn-default">Sin silencio</button>'
        footer += '</div>'
        footer +='<div class="btn-group margin-left-20">'
        footer += "<a type='link' id='download_csv' href='/media/plot/"+user+"Intensidad.csv' class='btn btn-primary'>Descargar datos</a>"
        footer += '<button class="btn btn-default" id="btnSave">Descargar imagen</button>'
        footer += '</div>'
        html = '<div id="graph" class="graph"></div>'
        html += '<div id="legend" class="legend col-md-offset-3"></div>'
        $('.panel-body').html(html)
        $('.panel-heading').html('Intensidad de voz')
        $('.panel-footer').html(footer)
        contador = [0,0,0,0]
        func_times = function (row, series, type) {
                    /*console.log("--> "+row.label, series, type);*/
                    if((contador[0]<data.usersVolFrame[0].length)&&row.label == String(data.usersVolFrame[0][contador[0]]['x'])){
                        contador[0] += 1
                        return "#c9302c";
                    } 
                    else if((contador[1]<data.usersVolFrame[1].length)&&row.label == String(data.usersVolFrame[1][contador[1]]['x'])){
                        contador[1] += 1
                        return "#337ab7";
                    } 
                    else if((contador[2]<data.usersVolFrame[2].length)&&row.label == String(data.usersVolFrame[2][contador[2]]['x'])){
                        contador[2] += 1
                        return "#5cb85c";
                    } 
                    else if((contador[3]<data.usersVolFrame[3].length)&&row.label == String(data.usersVolFrame[3][contador[3]]['x'])){
                        contador[3] += 1
                        return "#f0ad4e";
                    } 
                }
        var array_concat = data.usersVolFrame[0].concat(data.usersVolFrame[1], data.usersVolFrame[2], data.usersVolFrame[3])
        array_concat.sort(function(a, b){return a['x'] - b['x']});  
        barGraph(array_concat, func_times, ['Decibelios'])
        user_vol_frame_buttons()
        legendItem =  '<span><i class="back-red"> </i>Usuario 1</span>'
        legendItem += '<span><i class="back-blue"> </i>Usuario 2</span>'
        legendItem += '<span><i class="back-green"> </i>Usuario 3</span>'
        legendItem += '<span><i class="back-yellow"> </i>Usuario 4</span>'   
        $('#legend').append(legendItem)
        downloadImg('users_interaction')
        swal.close()
        
        /*$('.loader').hide()*/
    });

    $('#summary').on('click', function(){
        swal.showLoading();
        html = '<div class="col-md-8 col-md-offset-2">'
        html += '<div class="page-header">'
        html += '<h2>Resultados por participante</h2>'
        html += '</div>'
        html += '<div class="table-responsive">'
        html += summary_table
        html += '</div>'
        html += '<div class="page-header">'
        html += '<h2>Resultados evento</h2>'
        html += '</div>'
        html += '</div>'
        html += '<div class="col-md-4 col-md-offset-2">'
        html += '<div class="table-responsive">'
        html += summary_total_table
        html += '</div>'
        html += '</div>'

        
        $('.panel-body').html(html)
        $('.panel-heading').html('Resumen actividad')
        $('.panel-footer').html('')
        swal.close();
    });

    function user_vol_frame_buttons() {
        $('#vol_frame_silence').on('click', function(){
            console.log("en vol sil")
            contador = [0,0,0,0]
            func_times = function (row, series, type) {
                    /*console.log("--> "+row.label, series, type);*/
                    if((contador[0]<data.usersVolFrame[0].length)&&row.label == String(data.usersVolFrame[0][contador[0]]['x'])){
                        contador[0] += 1
                        return "#c9302c";
                    } 
                    else if((contador[1]<data.usersVolFrame[1].length)&&row.label == String(data.usersVolFrame[1][contador[1]]['x'])){
                        contador[1] += 1
                        return "#337ab7";
                    } 
                    else if((contador[2]<data.usersVolFrame[2].length)&&row.label == String(data.usersVolFrame[2][contador[2]]['x'])){
                        contador[2] += 1
                        return "#5cb85c";
                    } 
                    else if((contador[3]<data.usersVolFrame[3].length)&&row.label == String(data.usersVolFrame[3][contador[3]]['x'])){
                        contador[3] += 1
                        return "#f0ad4e";
                    } 
                }

            morris.options.barColors = func_times
            var array_concat = data.usersVolFrame[0].concat(data.usersVolFrame[1], data.usersVolFrame[2], data.usersVolFrame[3])
            array_concat.sort(function(a, b){return a['x'] - b['x']});
            morris.setData(array_concat)
            
        });

        $('#vol_frame').on('click', function(){
            contador = [0,0,0,0]

            func_times = function (row, series, type) {
                    /*console.log("--> "+row.label, series, type);*/
                    if((contador[0]<data.userVolFrameWhitoutSilence[0].length)&&row.label == String(data.userVolFrameWhitoutSilence[0][contador[0]]['x'])){
                        contador[0] += 1
                        return "#c9302c";
                    } 
                    else if((contador[1]<data.userVolFrameWhitoutSilence[1].length)&&row.label == String(data.userVolFrameWhitoutSilence[1][contador[1]]['x'])){
                        contador[1] += 1
                        return "#337ab7";
                    } 
                    else if((contador[2]<data.userVolFrameWhitoutSilence[2].length)&&row.label == String(data.userVolFrameWhitoutSilence[2][contador[2]]['x'])){
                        contador[2] += 1
                        return "#5cb85c";
                    } 
                    else if((contador[3]<data.userVolFrameWhitoutSilence[3].length)&&row.label == String(data.userVolFrameWhitoutSilence[3][contador[3]]['x'])){
                        contador[3] += 1
                        return "#f0ad4e";
                    } 
                }
                
            morris.options.barColors = func_times
            var array_concat = data.userVolFrameWhitoutSilence[0].concat(data.userVolFrameWhitoutSilence[1], data.userVolFrameWhitoutSilence[2], data.userVolFrameWhitoutSilence[3])
            array_concat.sort(function(a, b){return a['x'] - b['x']});
            morris.setData(array_concat)
        });      

    }

    function click_buttons_interv_time(){
        func_users = function (row, series, type) {
                    /*console.log("--> "+row.label, series, type);*/
                    if(row.label == "Usuario 1") return "#c9302c";
                    else if(row.label == "Usuario 2") return "#337ab7";
                    else if(row.label == "Usuario 3") return "#5cb85c";
                    else if(row.label == "Usuario 4") return "#f0ad4e";
                }
        
        func_times = function (row, series, type) {
                    /*console.log("--> "+row.label, series, type);*/
                    if((contador[0]<data.usersIntDur[0].length)&&row.label == String(data.usersIntDur[0][contador[0]]['x'])){
                        contador[0] += 1
                        return "#c9302c";
                    } 
                    else if((contador[1]<data.usersIntDur[1].length)&&row.label == String(data.usersIntDur[1][contador[1]]['x'])){
                        contador[1] += 1
                        return "#337ab7";
                    } 
                    else if((contador[2]<data.usersIntDur[2].length)&&row.label == String(data.usersIntDur[2][contador[2]]['x'])){
                        contador[2] += 1
                        return "#5cb85c";
                    } 
                    else if((contador[3]<data.usersIntDur[3].length)&&row.label == String(data.usersIntDur[3][contador[3]]['x'])){
                        contador[3] += 1
                        return "#f0ad4e";
                    } 
                }

    	$('#user1').on('click', function(){
           morris.options.barColors = ["#c9302c"]
    	   morris.setData(data.usersIntDur[0])
           $('.panel').show()
	    });
	    $('#user2').on('click', function(){
            morris.options.barColors = ["#337ab7"]
	    	morris.setData(data.usersIntDur[1])
            
	    });
	    $('#user3').on('click', function(){
            morris.options.barColors = ["#5cb85c"]
	    	morris.setData(data.usersIntDur[2])
	    });
	    $('#user4').on('click', function(){
            morris.options.barColors = ["#f0ad4e"]
            morris.setData(data.usersIntDur[3])
	    });
        $('#total').on('click', function(){
            morris.options.barColors = func_users
            dat ={
                "datos": [
                    {"x":"Usuario 1","y":get_sum(data.usersIntDur[0])},
                    {"x":"Usuario 2","y":get_sum(data.usersIntDur[1])},
                    {"x":"Usuario 3","y":get_sum(data.usersIntDur[2])},
                    {"x":"Usuario 4","y":get_sum(data.usersIntDur[3])}
                ]
            } 
            morris.setData(dat.datos)
        });
        $('#general').on('click', function(){
           morris.options.barColors = func_times
           var array_concat = data.usersIntDur[0].concat(data.usersIntDur[1], data.usersIntDur[2], data.usersIntDur[3])
           array_concat.sort(function(a, b){return a['x'] - b['x']});
           contador = [0,0,0,0]
           morris.setData(array_concat)
        });
    }

    function click_buttons_users_vol(){
        func_users = function (row, series, type) {
                    /*console.log("--> "+row.label, series, type);*/
                    if(row.label == "Usuario 1") return "#c9302c";
                    else if(row.label == "Usuario 2") return "#337ab7";
                    else if(row.label == "Usuario 3") return "#5cb85c";
                    else if(row.label == "Usuario 4") return "#f0ad4e";
                }
        var contador = [0,0,0,0]
        func_times = function (row, series, type) {
                    /*console.log("--> "+row.label, series, type);*/
                    if((contador[0]<data.usersVol[0].length)&&row.label == String(data.usersVol[0][contador[0]]['x'])){
                        contador[0] += 1
                        return "#c9302c";
                    } 
                    else if((contador[1]<data.usersVol[1].length)&&row.label == String(data.usersVol[1][contador[1]]['x'])){
                        contador[1] += 1
                        return "#337ab7";
                    } 
                    else if((contador[2]<data.usersVol[2].length)&&row.label == String(data.usersVol[2][contador[2]]['x'])){
                        contador[2] += 1
                        return "#5cb85c";
                    } 
                    else if((contador[3]<data.usersVol[3].length)&&row.label == String(data.usersVol[3][contador[3]]['x'])){
                        contador[3] += 1
                        return "#f0ad4e";
                    } 
                }
        $('#vol_in_time').on('click', function(){
           morris.options.barColors = func_times
           var array_concat = data.usersVol[0].concat(data.usersVol[1], data.usersVol[2], data.usersVol[3])
           array_concat.sort(function(a, b){return a['x'] - b['x']});
           contador = [0,0,0,0]
           morris.setData(array_concat)
        });
        $('#user1').on('click', function(){
           morris.options.barColors = ["#c9302c"]
           morris.setData(data.usersVol[0])
        });
        $('#user2').on('click', function(){
            morris.options.barColors = ["#337ab7"]
            morris.setData(data.usersVol[1])
        });
        $('#user3').on('click', function(){
            morris.options.barColors = ["#5cb85c"]
            morris.setData(data.usersVol[2])
        });
        $('#user4').on('click', function(){
            morris.options.barColors = ["#f0ad4e"]
            morris.setData(data.usersVol[3])
        });
        $('#total').on('click', function(){
            morris.options.barColors = func_users
            morris.setData(data.usersVolAVG)
        });
    }   
}

function get_sum(array) {
    sum = 0
    for(var i=0;i<array.length;i++){
        sum = parseFloat(array[i].y)+sum
    }
    return sum.toFixed(2)
} 

function getSum(total, num) {
    return total + num;
}

function downloadImg(name){
    $("#btnSave").click(function() {  
        saveSvgAsPng($("svg")[0], name+".png", {backgroundColor: 'white'});      
    });
}

function dowloadPanelBody(name){
    $("#btnSave").click(function() { 
        html2canvas($(".panel-body")[0]).then(function(canvas) {
            var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
            var a = document.createElement('a');
            a.href = image;
            a.download = name+'.png';
            a.click();
        });
    });
}






    