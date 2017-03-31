/**
 * Created by 谭为绶 on 2017/3/22.
 */
/**
 *
 *Linear regression
 *
 *
 */


var linear = new Object({
    URL: {
        BASE_URL: function () {
            return "http://47.88.77.83:8080/data/data/";
            //return "http://localhost:8090/click/data/";
        },
        LINEAR: function (cancerType,geneName,dataType,dataType2,sampleType) {
            var value= $("input[name='isLog']:checked").val();
            var url = linear.URL.BASE_URL() + cancerType + "/" + geneName + "/" + dataType + "/" + dataType2 + "/" + sampleType + "/" + value;
            return url;
        }
    },
    Operate: {
        getLinearData: function (cancerType,geneName,dataType,dataType2,sampleType) {
            $("#echarts").html('<div class="spinner">' +
                '<div class="rect1"></div>' +
                '<div class="rect2"></div>' +
                '<div class="rect3"></div>' +
                '<div class="rect4"></div>' +
                '<div class="rect5"></div>' +
                '</div><p class="col-md-12" style="text-align:center;color:rgb(61,132,193);">Loading~~~</p>');
            $("#saveName_input").val("Linear-"+cancerType+"-"+geneName);
            var url = linear.URL.LINEAR(cancerType,geneName,dataType,dataType2,sampleType);
            var linearStyle=new Array();
            var is_reRender=false;
            var is_downloadConfigured = false;




            //获取点数据
            var point = [];
            $.ajax({
                type: "get",
                async: false,
                url:url+"/linearPoint",
                data: {},
                dataType: "json",
                success: function (result) {
                    if (result) {
                        for (var i = 0; i < result.length; i++) {
                            point.push([result[i].y1,result[i].y2,result[i].sampleid]);
                        }
                    }
                    if(result.length==0){
                        alert("Please check your spelliing or the gene doesn't exit in these two data types.");
                    }
                },
                error: function (errorMsg) {
                    alert("Failed to get the data.");
                }
            });
            linear.View.draw(point,geneName , linearStyle, is_reRender, is_downloadConfigured);
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
            $("#pointSize_select").append("<option class='col-md-12' value='5'>5</option>");
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
                "Acute Myeloid Leukemia [LAML]",
                /**/
                "Adrenocortical carcinoma [ACC]",
                /**/
                "Bladder Urothelial Carcinoma [BLCA]",
                /**/
                "Brain Lower Grade Glioma [LGG]",
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
                "FFPE Pilot Phase II [FPPP]",
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
                "Lymphoid Neoplasm Diffuse Large B-cell Lymphoma [DLBC]",
                /**/
                "Mesothelioma [MESO]",
                /**/
                "Ovarian serous cystadenocarcinoma [OV]",
                /**/
                "Pancreatic adenocarcinoma [PAAD]",
                /**/
                "Pheochromocytoma and Paraganglioma [PCPG]",
                /**/
                "Prostate adenocarcinoma [PRAD]",
                /**/
                "Rectum adenocarcinoma [READ]",
                /**/
                "Sarcoma [SARC]",
                /**/
                "Skin Cutaneous Melanoma [SKCM]",
                /**/
                "Stomach adenocarcinoma [STAD]",
                /**/
                "Testicular Germ Cell Tumors [TGCT]",
                /**/
                "Thymoma [THYM]",
                /**/
                "Thyroid carcinoma [THCA]",
                /**/
                "Uterine Carcinosarcoma [UCS]",
                /**/
                "Uterine Corpus Endometrial Carcinoma [UCEC]",
                /**/
                "Uveal Melanoma [UVM]"
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



        draw: function (point, geneName, linearStyle, is_reRender, is_downloadConfigured) {
            //使用最小二乘法处理数据
            // a=(NΣxy-ΣxΣy)/(NΣx^2-(Σx)^2)
            // b=y(平均)-a*x(平均)
            // y1为x, y2为y
            var n=point.length;
            //计算NΣxy
            var xy=0;
            for (var i=0;i<n; i++){
                xy+=point[i][0]*point[i][1];
            }
            var nxy=n*xy;

            //计算ΣxΣy
            var x=0;
            var y=0;
            for(var i=0;i<n;i++){
                x+=point[i][0];
                y+=point[i][1];
            }
            var xy=x*y;

            //计算NΣx^2
            var x2=0;
            for(var i=0;i<n;i++){
                x2+=point[i][0]*point[i][0]
            }
            var nx2=n*x2;

            //计算NΣy^2
            var y2=0;
            for(var i=0;i<n;i++){
                y2+=point[i][1]*point[i][1]
            }
            var ny2=n*y2;

            //计算(Σx)^2
            var xx=x*x;

            //计算(Σy)^2
            var yy=y*y;

            //计算y,x平均
            var y_=y/n
            var x_=x/n

            //计算a,b
            var a= (nxy-xy)/(nx2-xx);
            var b= y_-a*x_;


            //计算直线端点

            var min=point[0][0];
            for (var i=1; i<n; i++){
                if(point[i][0]<min){
                    min=point[i][0];
                }
            }


            var max=point[0][0];
            for(var i=1; i<n;i++){
                if(point[i][0]>max){
                    max=point[i][0];
                }
            }

            var line=[[min,a*min+b],[max,a*max+b]];

            //计算相关系数r Correlation
            //r=1/(N-1)Σ[(x-ux)/σx*(y-uy)/σy]  u为平均值


            //计算σx,σy
            var p=0;
            for(var i=0;i<n;i++){
                p+=(point[i][0]-x_)*(point[i][0]-x_)
            }
            var σx=Math.sqrt(p/(n-1));
            p=0;
            for(var i=0;i<n;i++){
                p+=(point[i][1]-y_)*(point[i][1]-y_)
            }
            var σy=Math.sqrt(p/(n-1));

            //计算求和
            p=0;
            for(var i=0;i<n;i++){
                p+=((point[i][0]-x_)/σx)*((point[i][1]-y_)/σy)
            }
            //计算r
            var r=p/(n-1);



            //获取x坐标轴名称
            var xname=$("#dataType").val();
            switch(xname){
                case 'e':
                    xname='Expression value of genes';
                    break;
                case 'c':
                    xname='Copy number of genes';
                    break;
            }
            var yname=$("#dataType2").val();
            switch(yname){
                case 'e':
                    yname='Expression value of genes';
                    break;
                case 'c':
                    yname='Copy number of genes';
                    break;
            }




            //构造样式配置数组
            //样式数组初始化
            var pointColor,pointSize,pointStyle;
            var lineColor,lineStyle;
            var xmin,xmax,ymin,ymax;
            theStyle();
            function theStyle(){
                //颜色
                pointColor= $("#pointColor_select").val();
                //点的大小
                pointSize = $("#pointSize_select").val();
                //点的样式
                pointStyle = $("#pointStyle_select").val();
                //线的颜色
                lineColor = $("#lineColor_select").val();
                //线的样式
                lineStyle = $("#lineStyle_select").val();
                //横坐标min
                if(!$("#x_value_min").val())
                    xmin= min;
                else xmin= $("#x_value_min").val()
                //横坐标max
                if(!$("#x_value_max").val())
                    xmax= max;
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
                linearStyle=[pointColor,pointSize,pointStyle,lineColor,lineStyle,xmin,xmax,ymin,ymax];
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
                    linear.View.draw(point, geneName, linearStyle, is_reRender, is_downloadConfigured);
                });
            }
            
        




            //监听重新渲染按钮，重新渲染
            if(!is_reRender&&!is_downloadConfigured){
            $("#btn_Rerender").click(function(){
                console.log("ImgSaveConfigure:" + $("#saveName_input").val() + "." + $("#saveType_select").val() + ":" + $("#pixelRatio_select").val());
                is_reRender = true;
                linear.View.draw(point, geneName, linearStyle, is_reRender, is_downloadConfigured);
            });
            }
            var series;

            series={
                name: 'Linear regression',
                type: 'scatter',
                data: point,
                symbol:linearStyle[2],   //点形状
                symbolSize:linearStyle[1],   //点大小
                itemStyle:{
                    normal:{
                        color:linearStyle[0]   //点颜色
                    }
                },
                markPoint:{
                    symbolSize:1,
                    silent:true,
                    data:[{
                        x:480,
                        y:120,
                        label:{
                            normal:{
                                show:true,
                                formatter:geneName.toUpperCase(),
                                textStyle:{
                                    color:'#000',
                                    fontSize:20
                                }
                            }
                        },
                    },{
                        x:480,
                        y:150,
                        label:{
                            normal:{
                                show:true,
                                formatter:"Correlation="+r.toFixed(4)+"     p-value="+"unknown now",
                                textStyle:{
                                    color:'#000',
                                    fontSize:20
                                }
                            }
                        }
                    }

                    ]
                },
                markLine:{
                    symbolSize:0,
                    animation:false,

                    label:{normal:{
                        show:true,
                        position:'middle',
                        formatter:function(){
                            return "";
                            /* 直线方程
                             //判断a是否为0,b的正负
                             if(Math.abs(a)<0.00001){
                             return "y="+b.toFixed(4);
                             }
                             else {
                             if(b>0){
                             return "y="+a.toFixed(4)+"x"+"+"+b.toFixed(4);
                             }
                             else if(b<0){
                             return "y="+a.toFixed(4)+"x"+b.toFixed(4);
                             }
                             else return "y="+a.toFixed(4)+"x";
                             }

                             //else return "y="+b;
                             */
                        },


                        textStyle:{
                            color:'#000',
                            fontSize:20
                        }
                    }},

                    lineStyle:{
                        normal:{
                            color:linearStyle[3],    //线颜色
                            width:1.5,
                            type:linearStyle[4]    //线类型
                        }
                    },
                    data:[{
                        0:{coord:line[0]},
                        1:{coord:line[1]}
                    }]
                }
            }




            var option = {
                title: {
                    text: 'Linear regression',
                    x:'left',
                    y:0
                },
                grid: [{
                    show:true,
                    left:'5%',
                    top:'13%',
                    width: '88%',
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
                        return "x="+param.value[0] + '<br>' + "y="+param.value[1]+'<br>' + param.value[2]
                    }
                },
                legend: {
                    data: ['Linear regression'],
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
                    name:xname,
                    nameLocation:'middle',
                    nameTextStyle:{
                        frontSize:30
                    },
                    nameGap:30,
                    min:linearStyle[5],  //x轴最小值
                    max:linearStyle[6],  //x轴最大值
                    splitLine:{
                        show:false
                    },
                    type: 'value',
                    scale: true
                },
                yAxis: {
                    name:yname,
                    nameLocation:'middle',
                    nameTextStyle:{
                        frontSize:30
                    },
                    nameGap:30,
                    min:linearStyle[7],  //y轴最小值
                    max:linearStyle[8],  //y轴最大值
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