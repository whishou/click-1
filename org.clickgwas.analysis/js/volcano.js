/**
 * Created by 谭为绶 on 2017/3/22.
 */
/**
 *
 *Volcano plot
 *
 *
 */


var volcano = new Object({
    URL: {
        BASE_URL: function () {
            return "http://47.88.77.83:8080/data/data/";
            //return "http://localhost:8090/click/data/";
        },
        VOLCANO: function (cancerType,dataType) {
            var url = volcano.URL.BASE_URL() + cancerType + "/" + dataType ;
            return url;
        }
    },
    Operate: {
        getVolcanoData: function (cancerType,dataType,cutoff) {
            $("#echarts").html('<div class="spinner">' +
                '<div class="rect1"></div>' +
                '<div class="rect2"></div>' +
                '<div class="rect3"></div>' +
                '<div class="rect4"></div>' +
                '<div class="rect5"></div>' +
                '</div><p class="col-md-12" style="text-align:center;color:rgb(61,132,193);">Loading~~~</p>');
            $("#saveName_input").val("Volcano-"+cancerType);
            var url = volcano.URL.VOLCANO(cancerType,dataType);
            var volcanoStyle=new Array();
            var is_reRender=false;
            var is_downloadConfigured = false;


            //获取点数据
            var point = new Array();
                function handleData(){    //防止ajax页面卡死
                var defer = $.Deferred();
                $.ajax({
                    type: "get",
                    // async: false,
                    url: url+"/volcano",
                    data: {},
                    dataType: "json",
                    success: function(result){
                        defer.resolve(result)
                    },
                    error: function (errorMsg) {
                    $("#echarts").html('<div class="spinner">' +
                    '<div class="rect1"></div>' +
                    '<div class="rect2"></div>' +
                    '<div class="rect3"></div>' +
                    '<div class="rect4"></div>' +
                    '<div class="rect5"></div>' +
                    '</div><p class="col-md-12" style="text-align:center;color:rgb(61,132,193);">There is no data available for display.</p>');
                }
                });
                return defer.promise();
            }
            $.when(handleData()).done(function(result){
                    if (result) {
                        for (var i = 0; i < result.length; i++) {
                            if(result[i].y!="NaN"){        //去掉y值不存在的点
                            point.push([result[i].x,result[i].y,result[i].geneName,result[i].pvalue]);  
                            }
                        }
                    }
                volcano.View.draw(point, cutoff,volcanoStyle, is_reRender, is_downloadConfigured);
            })
        }
    },
    View: {
        init: function () {
            /**初始化配置项ui*/
            /**/
            $("#pixelRatio_select").html("");
            /**/
            for (var i = 1; i < 50; i++) {
                /**/
                $("#pixelRatio_select").append("<option class='col-md-12' value='" + i + "'>" + i + "</option>");
                /**/
            }
            /**/
            $("#saveType_select").html("");
            /**/
            $("#saveType_select").append("<option class='col-md-12' value='png'>png</option>");
            /**/
            $("#saveType_select").append("<option class='col-md-12' value='jpeg'>jpeg</option>");
            /**/
            /**/
            $("#pointStyle_select").html("");
            /**/
            $("#pointStyle_select").append("<option class='col-md-12' value='circle'>circle</option>");
            /**/
            $("#pointStyle_select").append("<option class='col-md-12' value='rect'>rect</option>");
            /**/
            $("#pointStyle_select").append("<option class='col-md-12' value='roundRect'>roundRect</option>");
            /**/
            $("#pointStyle_select").append("<option class='col-md-12' value='triangle'>triangle</option>");
            /**/
            $("#pointStyle_select").append("<option class='col-md-12' value='diamond'>diamond</option>");
            /**/
            $("#pointStyle_select").append("<option class='col-md-12' value='pin'>pin</option>");
            /**/
            $("#pointStyle_select").append("<option class='col-md-12' value='arrow'>arrow</option>");
            /**/
            /**/
            $("#pointSize_select").html("");
            /**/
            $("#pointSize_select").append("<option class='col-md-12' value='3'>3</option>");
            /**/
            for (var i = 1; i < 20; i++) {
                /**/
                $("#pointSize_select").append("<option class='col-md-12' value='" + i + "'>" + i + "</option>");
                /**/
            }
            /**/
            $("#pointColor_select").html("");
            /**/
            $("#boxColor_select").html("");
            /**/
            $("#boxStyle_select").html("");
            /**/
            $("#lineColor_select").html("");
            /**/
            $("#lineStyle_select").html("");
            /**/
            var color_arr = ["Black", "AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine",
                /**/
                "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet",
                /**/
                "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson",
                /**/
                "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGreen",
                /**/
                "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed",
                /**/
                "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkTurquoise",
                /**/
                "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DodgerBlue", "Feldspar",
                /**/
                "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite",
                /**/
                "Gold", "GoldenRod", "Gray", "Green", "GreenYellow", "HoneyDew", "HotPink",
                /**/
                "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen",
                /**/
                "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGrey",
                /**/
                "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen",
                /**/
                "LightSkyBlue", "LightSlateBlue", "LightSlateGray", "LightSteelBlue",
                /**/
                "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon",
                /**/
                "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple",
                /**/
                "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise",
                /**/
                "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite",
                /**/
                "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid",
                /**/
                "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip",
                /**/
                "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red",
                /**/
                "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown",
                /**/
                "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue",
                /**/
                "SlateGray", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal",
                /**/
                "Thistle", "Tomato", "Turquoise", "Violet", "VioletRed",
                /**/
                "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"
            ];
            /**/
            for (var i = 0; i < color_arr.length; i++) {
                /**/
                $("#pointColor_select").append("<option class='col-md-12' value='" + color_arr[i] + "'>" + color_arr[i] + "</option>");
                /**/
                /**/
                $("#boxColor_select").append("<option class='col-md-12' value='" + color_arr[i] + "'>" + color_arr[i] + "</option>");
                /**/
                /**/
                $("#lineColor_select").append("<option class='col-md-12' value='" + color_arr[i] + "'>" + color_arr[i] + "</option>");
                /**/
                /**/
            }
            /**/
            $("#boxStyle_select").append("<option class='col-md-12' value='solid'>solid</option>");
            /**/
            $("#boxStyle_select").append("<option class='col-md-12' value='dashed'>dashed</option>");
            /**/
            $("#boxStyle_select").append("<option class='col-md-12' value='dotted'>dotted</option>");
            /**/
            $("#lineStyle_select").append("<option class='col-md-12' value='solid'>solid</option>");
            /**/
            $("#lineStyle_select").append("<option class='col-md-12' value='dashed'>dashed</option>");
            /**/
            $("#lineStyle_select").append("<option class='col-md-12' value='dotted'>dotted</option>");
            /**/
            var cancer_arr = [
                /**/
                "❌Acute Myeloid Leukemia [LAML]",
                /**/
                "❌Adrenocortical carcinoma [ACC]",
                /**/
                "Bladder Urothelial Carcinoma [BLCA]",
                /**/
                "❌Brain Lower Grade Glioma [LGG]",
                /**/
                "Breast invasive carcinoma [BRCA]",
                /**/
                "Cervical squamous cell carcinoma and endocervical adenocarcinoma [CESC]",
                /**/
                "Cholangiocarcinoma [CHOL]",
                /**/
                "Colon adenocarcinoma [COAD]",
                /**/
                "Esophageal carcinoma [ESCA]",
                /**/
                "❌FFPE Pilot Phase II [FPPP]",
                /**/
                "Glioblastoma multiforme [GBM]",
                /**/
                "Head and Neck squamous cell carcinoma [HNSC]",
                /**/
                "Kidney Chromophobe [KICH]",
                /**/
                "Kidney renal clear cell carcinoma [KIRC]",
                /**/
                "Kidney renal papillary cell carcinoma [KIRP]",
                /**/
                "Liver hepatocellular carcinoma [LIHC]",
                /**/
                "Lung adenocarcinoma [LUAD]",
                /**/
                "Lung squamous cell carcinoma [LUSC]",
                /**/
                "❌Lymphoid Neoplasm Diffuse Large B-cell Lymphoma [DLBC]",
                /**/
                "❌Mesothelioma [MESO]",
                /**/
                "❌Ovarian serous cystadenocarcinoma [OV]",
                /**/
                "Pancreatic adenocarcinoma [PAAD]",
                /**/
                "Pheochromocytoma and Paraganglioma [PCPG]",
                /**/
                "❌Prostate adenocarcinoma [PRAD]",
                /**/
                "Rectum adenocarcinoma [READ]",
                /**/
                "Sarcoma [SARC]",
                /**/
                "⚠️Skin Cutaneous Melanoma [SKCM]",
                /**/
                "Stomach adenocarcinoma [STAD]",
                /**/
                "❌Testicular Germ Cell Tumors [TGCT]",
                /**/
                "Thymoma [THYM]",
                /**/
                "Thyroid carcinoma [THCA]",
                /**/
                "❌Uterine Carcinosarcoma [UCS]",
                /**/
                "Uterine Corpus Endometrial Carcinoma [UCEC]",
                /**/
                "❌Uveal Melanoma [UVM]"
                /**/
            ];
            /**/ //dlbc acc laml meso ov tgct ucs uvm无正常样本
            /**/
            $("#cancername").html("");
            /**/
            for (var i = 0; i < cancer_arr.length; i++) {
                /**/
                var r = /\[(.+?)\]/; //正则获取方括号内容并转为小写
                /**/
                $("#cancername").append("<option class='col-md-12' value='" + cancer_arr[i].match(r)[1].toLowerCase() + "'>" + cancer_arr[i] + "</option>");
                /**/
            }
            /**结束*/

        },



        draw: function (point, cutoff, volcanoStyle, is_reRender, is_downloadConfigured) {
            var n=point.length;
            //将数据分成6块，便于染色
            var point0=[];
            var point1=[];
            var point2=[];
            var point3=[];
            var point4=[];
            var point5=[];
            var line=Math.log10(n/cutoff);
            console.log(n);
            var points=[];
            for(var i=0;i<n;i++){
                if(point[i][0]<-1 && point[i][1]<line){
                    point0.push(point[i])
                }
                if(point[i][0]<-1 && point[i][1]>=line){
                    point1.push(point[i])
                }
                if(point[i][0]>=-1 && point[i][0]<1 && point[i][1]<line){
                    point2.push(point[i])
                }
                if(point[i][0]>=-1 && point[i][0]<1 && point[i][1]>=line){
                    point3.push(point[i])
                }
                if(point[i][0]>=1 && point[i][1]<line){
                    point4.push(point[i])
                }
                if(point[i][0]>=1 && point[i][1]>=line){
                    point5.push(point[i])
                }
            }
            points.push(point0,point1,point2,point3,point4,point5)

        
            

            //构造样式配置数组
            //样式数组初始化
            var pointColors=[];
            var pointSize,pointStyle;
            var lineColor,lineStyle;
            var xmin,xmax,ymin,ymax;
            theStyle();
            function theStyle(){
                //颜色
                for(var i=0;i<6;i++){
                    pointColors[i]=$("#pointColor_select"+i).val();
                }
                //点的大小
                pointSize = $("#pointSize_select").val();
                //点的样式
                pointStyle = $("#pointStyle_select").val();
                //线的颜色
                lineColor = $("#lineColor_select").val();
                //线的样式
                lineStyle = $("#lineStyle_select").val();
                //横坐标min
                if(!$("#x_value_min").val()){
                    xmin= point[0][0];
                    for(var i=1; i<n; i++){
                        if(point[i][0]<xmin){
                            xmin=point[i][0];
                        }
                    }
                }
                else xmin= $("#x_value_min").val()
                //横坐标max
                if(!$("#x_value_max").val()){
                    xmax= point[0][0];
                    for(var i=0;i<n;i++){
                        if(point[i][0]>xmax){
                            xmax=point[i][0]
                        }
                    }
                }
                else xmax= $("#x_value_max").val()
                //纵坐标min
                if(!$("#y_value_min").val()){
                    ymin=point[0][1];
                    for (var i=1; i<n; i++){
                        if(point[i][1]<ymin){
                            ymin=point[i][1];
                        }
                    }
                }
                else ymin= $("#y_value_min").val()
                //纵坐标max
                if(!$("#y_value_max").val()){
                    ymax= point[0][1];
                    for (var i=0;i<n;i++){
                        if(point[i][1]>ymax){
                            ymax=point[i][1]
                        }
                    }
                }
                else ymax= $("#y_value_max").val()
                //初始配置加入样式数组
                volcanoStyle=[pointColors,pointSize,pointStyle,lineColor,lineStyle,Math.floor(xmin),Math.ceil(xmax),Math.floor(ymin),Math.ceil(ymax)];
            }




           save();
           var saveName,saveType,pixelRatio;
            function save(){
            /**初始化图片下载配置*/
            /**/
            saveName = $("#saveName_input").val();
            /**/
            saveType = $("#saveType_select").val();
            /**/
            pixelRatio = $("#pixelRatio_select").val();
            /**初始化图片下载配置结束*/
            };

            
            if(!is_downloadConfigured&&!is_reRender){
                $("#downloadConfigureSave_btn").click(function() {    
                    console.log("ImgSaveConfigure:" + $("#saveName_input").val() + "." + $("#saveType_select").val() + ":" + $("#pixelRatio_select").val());
                    is_downloadConfigured = true;
                    volcano.View.draw(point, cutoff,volcanoStyle, is_reRender, is_downloadConfigured);
                });
            }
            
        




            //监听重新渲染按钮，重新渲染
            if(!is_reRender&&!is_downloadConfigured){
            $("#btn_Rerender").click(function(){
                is_reRender = true;
                volcano.View.draw(point, cutoff,volcanoStyle, is_reRender, is_downloadConfigured);
            });
            }
            var series=[];
            var color=[volcanoStyle[0][0], volcanoStyle[0][1], volcanoStyle[0][2], volcanoStyle[0][3], volcanoStyle[0][4], volcanoStyle[0][5]];
            for(var i=0;i<points.length;i++){
                series.push({
                name: 'Volcano plot',
                type: 'scatter',
                data: points[i],
                symbol:volcanoStyle[2],   //点形状
                symbolSize:volcanoStyle[1],   //点大小
                itemStyle:{
                    normal:{
                        color:color[i]   //点颜色
                    }
                },
            /*    markLine:{
                    silent: true,
                    animation:false,
                    symbolSize:0,


                    lineStyle:{
                        normal:{
                            color:volcanoStyle[3],    //线颜色
                            width:1.5,
                            type:volcanoStyle[4]    //线类型
                        }
                    },

                    data:[{
                        yAxis:Math.log10(n/0.05),
                        label:{normal:{
                        show:true,
                        position:'end',
                        textStyle:{
                            color:volcanoStyle[3],
                            fontSize:12
                        }
                    }},
                    },
                    {
                        xAxis:-1,
                        label:{normal:{
                        show:true,
                        position:'start',
                        textStyle:{
                            color:volcanoStyle[3],
                            fontSize:12
                        }
                    }},
                    },{
                        xAxis:1,
                        label:{normal:{
                        show:true,
                        position:'start',
                        textStyle:{
                            color:volcanoStyle[3],
                            fontSize:12
                        }
                    }},
                    }]
                }
                */
                })
            }
            series.push({
                name: 'Volcano plot',
                type: 'scatter',
                markLine:{
                    silent: true,
                    animation:false,
                    symbolSize:0,


                    lineStyle:{
                        normal:{
                            color:volcanoStyle[3],    //线颜色
                            width:1.5,
                            type:volcanoStyle[4]    //线类型
                        }
                    },

                    data:[{
                        yAxis: Math.log10(n/cutoff),
                        label:{normal:{
                        show:true,
                        position:'end',
                        textStyle:{
                            color:volcanoStyle[3],
                            fontSize:12
                        }
                    }},
                    },
                    {
                        xAxis:-1,
                        label:{normal:{
                        show:true,
                        position:'start',
                        textStyle:{
                            color:volcanoStyle[3],
                            fontSize:12
                        }
                    }},
                    },{
                        xAxis:1,
                        label:{normal:{
                        show:true,
                        position:'start',
                        textStyle:{
                            color:volcanoStyle[3],
                            fontSize:12
                        }
                    }},
                    }]
                }
            })
            



            var option = {
                title: {
                    text: 'Volcano plot',
                    x:'left',
                    y:0
                },
                grid: [{
                    show:true,
                    left:'5%',
                    top:'13%',
                    width: '92%',
                    height: '80%'
                }],
                brush: {
                    toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
                    xAxisIndex: 0
                },
                tooltip: {
                    textStyle:{
                        fontSize:20
                    },
                    formatter: function(param){
                        return param.value[2] + '<br>' + 'pvalue = '+param.value[3]
                    }
                },
                legend: {
                    data: ['Volcano plot'],
                    top:0,
                    padding: 50,
                    itemGap: 10,
                    textStyle: {
                        color: '#000',
                        fontSize: 16
                    }
                },
                toolbox: {
                    orient: "horizontal",
                    feature: {
                        mark: {
                            show: true,
                            title: "english"
                        },
                        dataZoom: {
                            show: true,
                            title: {
                                zoom: "Data zoom",
                                back: "Zoom back"
                            }
                        },
                        restore: {
                            show: true,
                            title: "Restore"
                        },
                        saveAsImage: {
                            show: true,
                            title: "Save as Image",
                            name: saveName,
                            type: saveType,
                            pixelRatio: pixelRatio
                        },
                        brush: {
                            show: true,
                            title: {
                                rect: 'Rect select',
                                polygon: 'Polygon select',
                                lineX: 'LineX select',
                                lineY: 'LineY select',
                                keep: 'Keep select',
                                clear: 'Clear select'
                            }
                        }
                    }
                },
                xAxis: {
                    name:'log2(ratio)',
                    nameLocation:'middle',
                    nameTextStyle:{
                        frontSize:30
                    },
                    nameGap:30,
                    min:volcanoStyle[5],  //x轴最小值
                    max:volcanoStyle[6],  //x轴最大值
                    splitLine:{
                        show:false
                    },
                    type: 'value',
                    scale: true
                },
                yAxis: {
                    name:'-log10(p-values)',
                    nameLocation:'middle',
                    nameTextStyle:{
                        frontSize:30
                    },
                    nameGap:30,
                    min:volcanoStyle[7],  //y轴最小值
                    max:volcanoStyle[8],  //y轴最大值
                    axisLine:{
                        onZero:false
                    },
                    splitLine:{
                        show:false
                    },
                    type: 'value',
                    scale: true
                },
                series: series
            };

            var myChart = echarts.init(document.getElementById('echarts'));

            myChart.setOption(option);


        }
    }
});