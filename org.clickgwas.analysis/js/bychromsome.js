/*
 *染色题分析，山形图绘制
 *数据：1.染色体数据组
 *     2.高亮基因数据组
 */
var chromsome = new Object({
    URL: {
        BASE_URL: function() {
            return "http://47.88.77.83:8080/data/data/";
        },
        CHECK_URL: function(geneName) {
            return chromsome.URL.BASE_URL() + geneName + "/" + $("#dataType").val() + "/gene/check"; //高亮基因名称检测
        },
        MOUTAIN: function(highLightedGeneName, cancerType, chromsomes, showType) {
            //http://47.88.77.83:8080/data/data/gbm/1/c/l/mean/bychromosomes
            var value;
            if ($("#islog").is(':checked')) {
                value = "l";
            } else {
                value = "y";
            }
            var url = chromsome.URL.BASE_URL() + cancerType + "/" + chromsomes + "/" + $("#dataType").val() + "/" + value + "/" + showType + "/bychromosomes";
            console.log("url", url);
            return url;
        }
    },
    Operate: {
        getMoutainData: function(highLightedGeneName, cancerType, chromsomes, showType) {
            $("#echarts").html('<div class="spinner">' +
                '<div class="rect1"></div>' +
                '<div class="rect2"></div>' +
                '<div class="rect3"></div>' +
                '<div class="rect4"></div>' +
                '<div class="rect5"></div>' +
                '</div><p class="col-md-12" style="text-align:center;color:rgb(61,132,193);">Loading~~~</p>');
            var url = chromsome.URL.MOUTAIN(highLightedGeneName, cancerType, chromsomes, showType);
            $.get(url, {}, function(result, status) {
                if (status) {
                    if (result == null) {
                        alert("error null");
                    } else {
                        chromsome.View.draw(result, highLightedGeneName);
                    }
                } else {
                    alert("there is something wrong when request " + url + ",data:" + data);
                }
            });
        }
    },
    View: {
        init: function() {
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
        draw: function(data, highLightedGeneName) {
            console.log("data", data);
            var data = data.data;
            var points = data.point;
            var npoints = points[0];
            var tpoints = points[1];
            var cyto = data.cyto;
            var arm = data.arm;

            var XMAX = 0;
            var YMAX = -100000;
            var YMIN = 1000000;

            //npoints格式化
            var n_points = [];
            for (var element in npoints) { //--->基因
                var gene = [];
                for (var a in npoints[element]) { //--->样本正常否
                    gene.push(npoints[element][a]);
                }

                var tmp = gene[0];
                gene[0] = gene[1];
                if (gene[0] > XMAX) {
                    XMAX = gene[0];
                }
                gene[1] = gene[2];
                if (gene[1] > YMAX) {
                    YMAX = gene[1];
                }
                if (gene[1] < YMIN) {
                    YMIN = gene[1];
                }
                gene[2] = tmp;
                n_points.push(gene);
            }
            //tpoints格式化
            var t_points = [];
            for (var element in tpoints) {
                var gene = [];
                for (var a in tpoints[element]) {
                    gene.push(tpoints[element][a]);
                }

                var tmp = gene[0];
                gene[0] = gene[1];
                if (gene[0] > XMAX) {
                    XMAX = gene[0];
                }
                gene[1] = gene[2];
                if (gene[1] > YMAX) {
                    YMAX = gene[1];
                }
                if (gene[1] < YMIN) {
                    YMIN = gene[1];
                }
                gene[2] = tmp;
                t_points.push(gene);
            }



            //查询高亮基因
            var highLightedGeneName = highLightedGeneName.split(",");
            var _highLightedGeneName = [];
            for (var i = 0; i < highLightedGeneName.length; i++) {
                for (var j = 0; j < n_points.length; j++) {
                    if (highLightedGeneName[i] == n_points[j][2]) {
                        _highLightedGeneName.push([n_points[j][0], n_points[j][1], n_points[j][2]]);
                    }
                }
                for (var k = 0; k < t_points.length; k++) {
                    if (highLightedGeneName[i] == t_points[k][2]) {
                        _highLightedGeneName.push([t_points[k][0], t_points[k][1], t_points[k][2]]);
                    }
                }
            }
            console.log(
                'highLightedGeneName', _highLightedGeneName
            );





            //cyto 格式化
            var _cyto = [];
            if ($("#cyto").is(':checked')) {
                for (var element in cyto) {
                    var cc = [];
                    for (var a in cyto[element]) {
                        cc.push(cyto[element][a]);
                    }
                    _cyto.push(cc);
                }
            }
            //console.log("cyto", _cyto);

            //arm格式化

            var _arm = [];
            for (element in arm) {
                _arm.push(arm[element]);
            }
            //console.log("arm", _arm);
            //排序
            var x_list = [];
            for (var i = 0; i < n_points.length; i++) {
                x_list.push(n_points[0]);
            }
            x_list.sort();
            for (var i = 0; i < x_list.length; i++) {
                if (x_list[i] == _arm[0]) {
                    _arm[0] = x_list[i - 1] + (x_list[i] - x_list[i - 1]) / 2;
                }
            }




            var cyto_data = [];
            var CYTO_Y = YMIN - 0.1;
            var CYTO_HEIGHT = 20;
            var CYTO_COLOR = "";
            for (var i = 0; i < _cyto.length; i++) {
                if (i % 2 == 0) {
                    CYTO_COLOR = '#565656';
                } else {
                    CYTO_COLOR = "#000";
                }
                if (i < _cyto.length - 1) {
                    cyto_data.push([{
                        coord: [_cyto[i][0], CYTO_Y],
                        symbol: 'none',
                        symbolRotate: 90,
                        lineStyle: {
                            normal: {
                                color: CYTO_COLOR,
                                width: CYTO_HEIGHT,
                                type: 'solid'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                formatter: _cyto[i][1]
                            }
                        }
                    }, {
                        coord: [_cyto[i + 1][0], CYTO_Y],
                        symbol: 'none',
                        symbolRotate: 90,
                        lineStyle: {
                            normal: {
                                color: CYTO_COLOR,
                                width: CYTO_HEIGHT,
                                type: 'solid'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                formatter: _cyto[i][1]
                            }
                        }
                    }]);
                } else if (i = _cyto.length - 1) {
                    cyto_data.push([{
                        coord: [_cyto[i][0], CYTO_Y],
                        symbol: 'none',
                        lineStyle: {
                            normal: {
                                color: CYTO_COLOR,
                                width: CYTO_HEIGHT,
                                type: 'solid'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                formatter: _cyto[i][1]
                            }
                        }
                    }, {
                        coord: [XMAX, CYTO_Y],
                        symbol: 'none',
                        lineStyle: {
                            normal: {
                                color: CYTO_COLOR,
                                width: CYTO_HEIGHT,
                                type: 'solid'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                formatter: _cyto[i][1]
                            }
                        }
                    }]);
                }
            }


            var cyto_line = {
                animation: true,
                data: cyto_data
            };




            //基准线
            var STD_COLOR = "#00ff00";
            var STD_HEIGHT = 3;
            var std_data = [];
            if ($("#islog").is(':checked')) {
                std_data.push([{
                    coord: [0, 0],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: STD_COLOR,
                            width: STD_HEIGHT,
                            type: 'solid'
                        }
                    }
                }, {
                    coord: [XMAX, 0],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: CYTO_COLOR,
                            width: CYTO_HEIGHT,
                            type: 'solid'
                        }
                    }
                }]);
            } else {
                std_data.push([{
                    coord: [0, 2],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: STD_COLOR,
                            width: STD_HEIGHT,
                            type: 'solid'
                        }
                    }
                }, {
                    coord: [XMAX, 2],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: CYTO_COLOR,
                            width: CYTO_HEIGHT,
                            type: 'solid'
                        }
                    }
                }]);
            }

            //自定义分割线
            var _cutoffLine = [];

            if ($("#line1").val() != "") {
                std_data.push([{
                    coord: [0, $("#line1").val()],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: STD_COLOR,
                            width: STD_HEIGHT,
                            type: 'solid'
                        }
                    }
                }, {
                    coord: [XMAX, $("#line1").val()],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: CYTO_COLOR,
                            width: CYTO_HEIGHT,
                            type: 'solid'
                        }
                    }
                }]);
            }
            if ($("#line2").val() != "") {
                std_data.push([{
                    coord: [0, $("#line2").val()],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: STD_COLOR,
                            width: STD_HEIGHT,
                            type: 'solid'
                        }
                    }
                }, {
                    coord: [XMAX, $("#line2").val()],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: CYTO_COLOR,
                            width: CYTO_HEIGHT,
                            type: 'solid'
                        }
                    }
                }]);
            }



            //加入arm线
            console.log("arm", _arm);
            var ARM_COLOR = "#000";
            var ARM_HEIGHT = 5;
            if ($("#islog").is(':checked')) {
                std_data.push([{
                    coord: [_arm[0], 0 + (YMAX - 0) / 4],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: ARM_COLOR,
                            width: ARM_HEIGHT,
                            type: 'dotted'
                        }
                    }
                }, {
                    coord: [_arm[0], 0 - (0 - YMIN) / 4],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: ARM_COLOR,
                            width: ARM_HEIGHT,
                            type: 'dotted'
                        }
                    }
                }]);
            } else {
                std_data.push([{
                    coord: [_arm[0], 2 + (YMAX - 2) / 4],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: ARM_COLOR,
                            width: ARM_HEIGHT,
                            type: 'dotted'
                        }
                    }
                }, {
                    coord: [_arm[0], 2 - (2 - YMIN) / 4],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: ARM_COLOR,
                            width: ARM_HEIGHT,
                            type: 'dotted'
                        }
                    }
                }]);
            }
            var std_line = {
                animation: true,
                data: std_data
            };



            /**初始化图片下载配置*/
            /**/
            var saveName = $("#saveName_input").val();
            /**/
            var saveType = $("#saveType_select").val();
            /**/
            var pixelRatio = $("#pixelRatio_select").val();
            /**初始化图片下载配置结束*/
            option = {
                title: {
                    text: 'chromosome: ' + $("#chromosome").val(),
                    x: 'left',
                    y: 0
                },
                grid: [
                    { x: '5%', y: '5%', width: '90%', height: '90%' }
                ],
                tooltip: {
                    formatter: 'Group {a}: ({c})'
                },
                xAxis: [
                    { gridIndex: 0, min: 0, max: XMAX }
                ],
                yAxis: [
                    { gridIndex: 0, min: YMIN - 0.1, max: YMAX + 0.1 }
                ],
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
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end: 100
                }, {
                    start: 0,
                    end: 100,
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 1,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 0,
                        shadowOffsetY: 0
                    }
                }],
                series: [{
                    name: 'n',
                    type: 'scatter',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    data: n_points,
                    symbolSize: 3,
                    itemStyle: {
                        normal: {
                            color: "#0000ff",

                        }
                    },
                    markLine: cyto_line
                }, {
                    name: 't',
                    type: 'scatter',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    data: t_points,
                    symbolSize: 3,
                    itemStyle: {
                        normal: {
                            color: "#ff0000"
                        }
                    },
                    markLine: std_line
                }, {
                    name: 'h',
                    type: 'scatter',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    data: _highLightedGeneName,
                    symbolSize: 4,
                    itemStyle: {
                        normal: {
                            color: "#00ff00"
                        }
                    }
                }]
            };

            var myChart = echarts.init(document.getElementById('echarts'));

            myChart.setOption(option);
        }
    }
});