/**
 * 小🐝，嗡嗡嗡
 *
 * 癌症分析 蜂形图模块
 *
 * author : neroyang
 * email :nerosoft@outlook.com
 */

var beesworm = new Object({
    URL: {
        BASE_URL: function() {
            return "http://47.88.77.83:8080/data/data/";
        },
        CHECK_URL: function(geneName) {
            return beesworm.URL.BASE_URL() + geneName + "/" + $("#dataType").val() + "/gene/check";
        },
        BEESWORM: function(genename, cancertype) {
            var value;
            if ($("#islog").is(':checked')) {
                value = "l";
            } else {
                value = "y";
            }
            if ($("#simple_nonmalignant").is(':checked') && $("#simple_tumor").is(':checked')) {
                return beesworm.URL.BASE_URL() + genename + "/" + cancertype + "/" + $("#dataType").val() + "/" + value + "/bygene";
            } else if ($("#simple_tumor").is(':checked')) {
                return beesworm.URL.BASE_URL() + genename + "/" + cancertype + "/" + $("#dataType").val() + "/" + value + "/bygene/tumor";
            } else if ($("#simple_nonmalignant").is(':checked')) {
                return beesworm.URL.BASE_URL() + genename + "/" + cancertype + "/" + $("#dataType").val() + "/" + value + "/bygene/nonmalignant";
            } else {
                return beesworm.URL.BASE_URL() + genename + "/" + cancertype + "/" + $("#dataType").val() + "/" + value + "/bygene";
            }

        }
    },
    Operate: {
        BEESWORM: function(genename, cancertype, cutoff) {
            $("#bt_draw").attr("disabled", "true");
            $("#echarts").html('<div class="spinner">' +
                '<div class="rect1"></div>' +
                '<div class="rect2"></div>' +
                '<div class="rect3"></div>' +
                '<div class="rect4"></div>' +
                '<div class="rect5"></div>' +
                '</div><p class="col-md-12" style="text-align:center;color:rgb(61,132,193);">Checking~~~</p>');
            $("#saveName_input").val(cancertype);
            $.get(beesworm.URL.CHECK_URL(genename), {}, function(data, status) {
                if (data.data) {
                    //此处判断本地stronge缓存
                    //if(cache.init){
                    //    var cacheFile =  cache.get(genename);
                    //    if(cacheFile){
                    //        beesworm.View.draw(genename,cancertype,dataAll);
                    //    }else{
                    $("#echarts").html('<div class="spinner">' +
                        '<div class="rect1"></div>' +
                        '<div class="rect2"></div>' +
                        '<div class="rect3"></div>' +
                        '<div class="rect4"></div>' +
                        '<div class="rect5"></div>' +
                        '</div><p class="col-md-12" style="text-align:center;color:rgb(61,132,193);">Loading~~~</p>');
                    $.get(beesworm.URL.BEESWORM(genename, cancertype), {}, function(data, status) {
                        if (status) {
                            if (data.state) {
                                //console.log(data);
                                var dataAll = new Array();

                                var fuckdata = [];
                                for (var element in data.data) { //--->基因
                                    var gene = [];
                                    for (var a in data.data[element]) { //--->样本正常否
                                        var prop = [];
                                        for (var b in data.data[element][a]) { //---->样本
                                            //console.log(data.data[element][a][b]);
                                            var item = [];
                                            for (var c in data.data[element][a][b]) {
                                                item.push(data.data[element][a][b][c]);
                                            }
                                            prop.push(item);
                                        }
                                        gene.push(prop);
                                    }
                                    fuckdata.push(gene);
                                }
                                dataAll.push(fuckdata);
                                //console.log(dataAll);
                                var datatag = new Array();
                                var beesStyle = new Array();
                                var is_reRender = false;
                                var is_downloadConfigured = false;
                                beesworm.View.draw(genename, cancertype, dataAll, datatag, cutoff, beesStyle, is_reRender, is_downloadConfigured);
                            } else {
                                $.get(data.msg, {}, function(data, status) {
                                    var dataAll = [data];
                                    var datatag = [];
                                    beesworm.View.draw(genename, cancertype, dataAll, datatag, cutoff);
                                });
                            }
                        } else {
                            $("#echarts").html('<p class="col-md-12" style="text-align:center;color:rgb(61,132,193);">There is something wrong with server~~~</p>');

                        }

                        //    cache.save(genename,data);
                    });
                    //    }
                    //}else{
                    //    console.log("当前浏览器不支持缓存！");
                    //    $.get(beesworm.URL.BEESWORM(genename,cancertype),{},function(data,status){
                    //            var dataAll = [];
                    //            beesworm.View.draw(genename,cancertype,dataAll);
                    //    });
                    //}
                } else {
                    $("#bt_draw").removeAttr("disabled");
                    $("#echarts").html('<div class="spinner">' +

                        '</div><p class="col-md-12" style="text-align:center;color:rgb(61,132,193);">❌Please check genename <span style="font-weight:bold;color:#ff0000;">' + data.msg + '</span></p>');
                }
            });

        }
    },
    Utils: {
        box: function(up, q3, avg, std, mid, q1, down, xmin, xmax, cutoffall, Xmax, boxColor, boxStyle, lineColor, lineStyle) {

              //此处绘制mean +- std


            var ups = "";
            var q3s = "";
            var avgs = "";
            var mids = "";
            var q1s = "";
            var downs = "";
            var xmins = "";
            var xmaxs = "";
            var std_1_zhen = "";
            var std_1_fu = "";
            var std_2_zhen = "";
            var std_2_fu = "";
            var std_3_zhen = "";
            var std_3_fu = "";
            if (up != "") {
                ups = "up:" + (up + "").substring(0, 5);
            }
            if (q3 != "") {
                q3s = "q3:" + (q3 + "").substring(0, 5);
            }
            if (avg != "") {
                avgs = "mean:" + (avg + "").substring(0, 5);
            }
            if (mid != "") {
                mids = "mid:" + (mid + "").substring(0, 5);
            }
            if (q1 != "") {
                q1s = "q1:" + (q1 + "").substring(0, 5);
            }
            if (down != "") {
                downs = "down:" + (down + "").substring(0, 5);
            }
            if (std != "") {
                std_1_zhen = "mean+1std:" + (avg + std + "").substring(0, 5);
                std_1_fu = "mean-1std:" + (avg - std + "").substring(0, 5);
                std_2_zhen = "mean+2std:" + (avg + 2 * std + "").substring(0, 5);
                std_2_fu = "mean-2std:" + (avg - 2 * std + "").substring(0, 5);
                std_3_zhen = "mean+3std:" + (avg + 3 * std + "").substring(0, 5);
                std_3_fu = "mean-3std:" + (avg - 3 * std + "").substring(0, 5);
            }

            var data = [
                [{ //up
                    coord: [xmin, up],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: boxColor,
                            width: 1,
                            type: boxStyle //'solid','dashed','dotted'
                        }
                    },
                    label: {
                        normal: {
                            formatter: ups,
                            textStyle: {
                                align: 'left'
                            }
                        }
                    },
                    tooltip: {
                        formatter: 'up:' + up
                    }
                }, {
                    coord: [xmax, up],
                    symbol: 'none'
                }],
                [{ //v up
                    coord: [(xmin + xmax) / 2, up],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: boxColor,
                            width: 1,
                            type: boxStyle //'solid','dashed','dotted'
                        }
                    }

                }, {
                    coord: [(xmin + xmax) / 2, q3],
                    symbol: 'none'
                }],
                [{ //q3
                    coord: [xmin, q3],
                    symbol: 'none'
                }, {
                    coord: [xmax, q3],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: boxColor,
                            width: 1,
                            type: boxStyle //'solid','dashed','dotted'
                        }
                    },
                    label: {
                        normal: {
                            formatter: q3s,
                            textStyle: {
                                align: 'left'
                            }
                        }
                    },
                    tooltip: {
                        formatter: 'q3:' + q3
                    }
                }],
                [{ //left
                    coord: [xmin, q3],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: boxColor,
                            width: 1,
                            type: boxStyle //'solid','dashed','dotted'
                        }
                    }
                }, {
                    coord: [xmin, q1],
                    symbol: 'none'
                }],
                [{ //right
                    coord: [xmax, q3],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: boxColor,
                            width: 1,
                            type: boxStyle //'solid','dashed','dotted'
                        }
                    }
                }, {
                    coord: [xmax, q1],
                    symbol: 'none'
                }],

                [{ //mid
                    coord: [xmin, mid],
                    symbol: 'none'
                }, {
                    lineStyle: {
                        normal: {
                            color: boxColor,
                            width: 1,
                            type: boxStyle //'solid','dashed','dotted'
                        }
                    },
                    coord: [xmax, mid],
                    symbol: 'none',
                    label: {
                        normal: {
                            formatter: mids,
                            textStyle: {
                                align: 'left'
                            }
                        }
                    },
                    tooltip: {
                        formatter: 'mid:' + mid
                    }
                }],
                [{ //q1
                    coord: [xmin, q1],
                    symbol: 'none'
                }, {

                    coord: [xmax, q1],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: boxColor,
                            width: 1,
                            type: boxStyle //'solid','dashed','dotted'
                        }
                    },
                    label: {
                        normal: {
                            formatter: q1s,
                            textStyle: {
                                align: 'left'
                            }
                        }
                    },
                    tooltip: {
                        formatter: 'q1:' + q1
                    }
                }],
                [{ //v up
                    coord: [(xmin + xmax) / 2, q1],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: boxColor,
                            width: 1,
                            type: boxStyle //'solid','dashed','dotted'
                        }
                    }
                }, {
                    coord: [(xmin + xmax) / 2, down],
                    symbol: 'none'
                }],
                [{ //down
                    coord: [xmin, down],
                    symbol: 'none'
                }, {
                    coord: [xmax, down],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: boxColor,
                            width: 1,
                            type: boxStyle //'solid','dashed','dotted'
                        }
                    },
                    label: {
                        normal: {
                            formatter: downs,
                            textStyle: {
                                align: 'left'
                            }
                        }
                    },
                    tooltip: {
                        formatter: 'down:' + down
                    }
                }]
            ];
            //添加mean+-std线条
            //alert(std);
            if ($("#mean").is(':checked')) { //mean
                data.push(
                    [{ //avg
                        coord: [xmin, avg],
                        symbol: 'none'
                    }, {
                        coord: [xmax, avg],
                        symbol: 'none',
                        lineStyle: {
                            normal: {
                                color: lineColor,
                                width: 1,
                                type: lineStyle //'solid','dashed','dotted'
                            }
                        },
                        label: {
                            normal: {
                                formatter: avgs,
                                textStyle: {
                                    align: 'left'
                                }
                            }
                        },
                        tooltip: {
                            formatter: 'mean:' + avg
                        }
                    }]
                );
            } else if ($("#mean1").is(':checked')) { //mean+-1std
                data.push(
                    [{ //avg
                        coord: [xmin, avg + std],
                        symbol: 'none'
                    }, {
                        coord: [xmax, avg + std],
                        symbol: 'none',
                        lineStyle: {
                            normal: {
                                color: lineColor,
                                width: 1,
                                type: lineStyle //'solid','dashed','dotted'
                            }
                        },
                        label: {
                            normal: {
                                formatter: std_1_zhen,
                                textStyle: {
                                    align: 'left'
                                }
                            }
                        },
                        tooltip: {
                            formatter: std_1_zhen
                        }
                    }]
                );
                data.push([{ //avg
                    coord: [xmin, avg - std],
                    symbol: 'none'
                }, {
                    coord: [xmax, avg - std],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: lineColor,
                            width: 1,
                            type: lineStyle //'solid','dashed','dotted'
                        }
                    },
                    label: {
                        normal: {
                            formatter: std_1_fu,
                            textStyle: {
                                align: 'left'
                            }
                        }
                    },
                    tooltip: {
                        formatter: std_1_fu
                    }
                }]);
            } else if ($("#mean2").is(':checked')) { //mean +- 2std
                data.push(
                    [{ //avg
                        coord: [xmin, avg + 2 * std],
                        symbol: 'none'
                    }, {
                        coord: [xmax, avg + 2 * std],
                        symbol: 'none',
                        lineStyle: {
                            normal: {
                                color: lineColor,
                                width: 1,
                                type: lineStyle //'solid','dashed','dotted'
                            }
                        },
                        label: {
                            normal: {
                                formatter: std_2_zhen,
                                textStyle: {
                                    align: 'left'
                                }
                            }
                        },
                        tooltip: {
                            formatter: std_2_zhen
                        }
                    }]
                );
                data.push([{ //avg
                    coord: [xmin, avg - 2 * std],
                    symbol: 'none'
                }, {
                    coord: [xmax, avg - 2 * std],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: lineColor,
                            width: 1,
                            type: lineStyle //'solid','dashed','dotted'
                        }
                    },
                    label: {
                        normal: {
                            formatter: std_2_fu,
                            textStyle: {
                                align: 'left'
                            }
                        }
                    },
                    tooltip: {
                        formatter: std_2_fu
                    }
                }]);
            } else if ($("#mean3").is(':checked')) { //mean +- 3std
                data.push(
                    [{ //avg
                        coord: [xmin, avg + 3 * std],
                        symbol: 'none'
                    }, {
                        coord: [xmax, avg + 3 * std],
                        symbol: 'none',
                        lineStyle: {
                            normal: {
                                color: lineColor,
                                width: 1,
                                type: lineStyle //'solid','dashed','dotted'
                            }
                        },
                        label: {
                            normal: {
                                formatter: std_3_zhen,
                                textStyle: {
                                    align: 'left'
                                }
                            }
                        },
                        tooltip: {
                            formatter: std_3_zhen
                        }
                    }]
                );
                data.push([{ //avg
                    coord: [xmin, avg - 3 * std],
                    symbol: 'none'
                }, {
                    coord: [xmax, avg - 3 * std],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: lineColor,
                            width: 1,
                            type: lineStyle //'solid','dashed','dotted'
                        }
                    },
                    label: {
                        normal: {
                            formatter: std_3_fu,
                            textStyle: {
                                align: 'left'
                            }
                        }
                    },
                    tooltip: {
                        formatter: std_3_fu
                    }
                }]);
            }


            cutoffall.forEach(function(c) {
                //console.log(c);
                c.forEach(function(d) {

                });
                var line = [{ //up
                    coord: [0, c[0]],
                    symbol: 'arrow'
                }, {
                    coord: [Xmax, c[0]],
                    symbol: 'arrow'
                }]
                data.push(line);
            });

            return data;
        },
        ttest: function(data, gene1, gene2, alpha, times) {
            var ttestdata = [];
            data.forEach(function(a) {
                a.forEach(function(b) {
                    b.forEach(function(c) {
                        ttestdata.push(c);
                    });
                });
            });

            var s1 = 0;
            var s2 = 0;
            var x1 = 0;
            var x2 = 0;

            ttestdata[gene1].forEach(function(x) {
                x1 = (x1 + x[1]) / 2;
                s1 += x[1];
            });
            ttestdata[gene2].forEach(function(x) {
                s2 += x[1];
                x2 = (x2 + x[1]) / 2;
            });

            return (x1 - x2 - alpha) / Math.sqrt(s1 ^ 2 / ttestdata[gene1].length, s2 ^ 2 / ttestdata[gene2].length);

        },
        search: function(src, target) {
            /**在🐝群名称中查找target*/
            /**/
            for (var i = 0; i < src.length; i++) {
                /**/
                if (src[i] == target) {
                    /**/
                    return i;
                    /**/
                }
                /**/
            }
            /***查找完毕*/
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
                "⚠️Acute Myeloid Leukemia [LAML]",
                /**/
                "⚠️Adrenocortical carcinoma [ACC]",
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
                "❌Kidney renal papillary cell carcinoma [KIRP]",
                /**/
                "Liver hepatocellular carcinoma [LIHC]",
                /**/
                "Lung adenocarcinoma [LUAD]",
                /**/
                "Lung squamous cell carcinoma [LUSC]",
                /**/
                "⚠️Lymphoid Neoplasm Diffuse Large B-cell Lymphoma [DLBC]",
                /**/
                "⚠️Mesothelioma [MESO]",
                /**/
                "⚠️Ovarian serous cystadenocarcinoma [OV]",
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
                "⚠️Testicular Germ Cell Tumors [TGCT]",
                /**/
                "Thymoma [THYM]",
                /**/
                "Thyroid carcinoma [THCA]",
                /**/
                "⚠️Uterine Carcinosarcoma [UCS]",
                /**/
                "Uterine Corpus Endometrial Carcinoma [UCEC]",
                /**/
                "⚠️Uveal Melanoma [UVM]"
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
        draw: function(genename, cancertype, data, datatag, cutoff, beesStyle, is_reRender, is_downloadConfigured) {
            $("#echarts").html('<div class="spinner">' +
                '<div class="rect1"></div>' +
                '<div class="rect2"></div>' +
                '<div class="rect3"></div>' +
                '<div class="rect4"></div>' +
                '<div class="rect5"></div>' +
                '</div><p class="col-md-12" style="text-align:center;color:rgb(61,132,193);">Rendering~~~</p>');

            var schema = [{
                name: 'value',
                index: 1,
                text: '$'
            }, {
                name: 'sampleId',
                index: 2,
                text: '%'
            }, ];
            //此处调用echarts绘制数据图形

            //标注点数据
            //var dataTag = [[13.9565,2.0258,'TCGA-DB-A64X-01'],[12.9226,1.976,'TCGA-TM-A84F-10']];

            //console.log(data);
            var ttest_gene1 = $("#gene1").val();
            var ttest_gene2 = $("#gene2").val();
            var ttest_alpha = $("#alpha").val();
            var t_value = "";
            if (ttest_gene1 != "" & ttest_gene2 != "") {
                if (ttest_alpha == "") {
                    ttest_alpha = 0.05; //默认置信度
                }
                var t_value = beesworm.Utils.ttest(data, ttest_gene1, ttest_gene2, ttest_alpha, 1);
            }

            //console.log(t_value);

            //计算xsize
            var glist = cancertype.split(',');
            var Xmax = glist.length * 3;
            if ($("#simple_nonmalignant").is(':checked') && $("#simple_tumor").is(':checked')) {
                Xmax = glist.length * 3;
            } else if ($("#simple_tumor").is(':checked')) {
                Xmax = glist.length + 1;
            } else if ($("#simple_nonmalignant").is(':checked')) {
                Xmax = glist.length + 1;
            } else {
                Xmax = glist.length * 3;
            }

            var Ymax = 0;
            var Ymin = 20;

            /*Y 轴名称获取 */
            var yAxisName = "";
            switch ($("#dataType").val()) {
                case "e":
                    {
                        if ($("#islog").is(':checked')) {
                            yAxisName = "mRNA Expression Values (log2)";
                        } else {
                            yAxisName = "mRNA Expression Values";
                        }
                    }
                    break;
                case "c":
                    {
                        if ($("#islog").is(':checked')) {
                            yAxisName = "Copy Number Variations (log2)";
                        } else {
                            yAxisName = "Copy Number Variations";
                        }
                    }
                    break;
                default:
                    {
                        yAxisName: "yAxis";
                    }
                    break;

            }

            /**初始化🐝群名称数组**/
            /**/ //glist扩展
            /**/
            var glist_ex = new Array();
            /**/
            /**/
            if ($("#simple_nonmalignant").is(':checked') && $("#simple_tumor").is(':checked')) {
                /**/
                glist.forEach(function(element) {
                    /**/
                    glist_ex.push(element.toUpperCase() + "_N");
                    /**/
                    glist_ex.push(element.toUpperCase() + "_T");
                    /**/
                }, this);
                /**/
            } else if ($("#simple_tumor").is(':checked')) {
                /**/
                glist.forEach(function(element) {
                    /**/
                    glist_ex.push(element.toUpperCase() + "_T");
                    /**/
                }, this);
                /**/
            } else if ($("#simple_nonmalignant").is(':checked')) {
                /**/
                glist.forEach(function(element) {
                    /**/
                    glist_ex.push(element.toUpperCase() + "_N");
                    /**/
                }, this);
                /**/
            } else {
                /**/
                glist.forEach(function(element) {
                    /**/
                    glist_ex.push(element.toUpperCase() + "_N");
                    /**/
                    glist_ex.push(element.toUpperCase() + "_T");
                    /**/
                }, this);
                /**/
            }
            /**/ //console.log("🐝群名称数组:"+glist_ex);
            /**🐝群名称数组初始化完毕**/

            /** 初始化蜂群选择器 填充选择框*/
            /**/
            if (!is_reRender) {
                /**/
                $("#bees_which_select").html("");
                /**/
                for (var i = 0; i < glist_ex.length; i++) {
                    /**/
                    $("#bees_which_select").append("<option class='col-md-12' value='" + glist_ex[i] + "'>" + glist_ex[i] + "</option>")
                        /**/
                }
                /**/
            }
            /**结束*/

            //计算Ysize
            var series = [];
            /**初始化图片下载配置*/
            /**/
            var saveName = $("#saveName_input").val();
            /**/
            var saveType = $("#saveType_select").val();
            /**/
            var pixelRatio = $("#pixelRatio_select").val();
            /**初始化图片下载配置结束*/

            if (!is_downloadConfigured) {
                $("#downloadConfigureSave_btn").click(function() {
                    console.log("ImgSaveConfigure:" + $("#saveName_input").val() + "." + $("#saveType_select").val() + ":" + $("#pixelRatio_select").val());
                    is_downloadConfigured = true;
                    beesworm.View.draw(genename, cancertype, data, datatag, cutoff, beesStyle, is_reRender, is_downloadConfigured);
                });
            }

            //构造🐝群样式配置数组
            /**🐝样式数组初始化*/
            /**/
            if (beesStyle.length == 0) {
                /**/
                for (var i = 0; i < glist_ex.length; i++) {
                    /**/ //判断颜色
                    /**/
                    var color; //0
                    /**/
                    if (i % 2 == 0) {
                        /**/
                        color = $("#pointColor_select").val();
                        /**/
                    } else {
                        /**/
                        color = $("#pointColor_select").val();
                        /**/
                    }
                    /**/ //初始像素点大小
                    /**/
                    var pointSize = $("#pointSize_select").val(); //1
                    /**/ //初始像素样式
                    /**/
                    var pointStyle = $("#pointStyle_select").val(); //2
                    /**/ //箱线图颜色
                    /**/
                    var boxColor = $("#boxColor_select").val(); //3
                    /**/ //箱线图样式
                    /**/
                    var boxStyle = $("#boxStyle_select").val(); //4
                    /**/ //cutoff线条颜色
                    /**/
                    var lineColor = $("#lineColor_select").val(); //5
                    /**/ //cutoff线条样式
                    /**/
                    var lineStyle = $("#lineStyle_select").val(); //6
                    /**/
                    beesStyle.push([color, pointSize, pointStyle, boxColor, boxStyle, lineColor, lineStyle]); //将初始配置加入配置数组
                    /**/
                }
                /**/
            } else {
                /**/
                beesStyle[beesworm.Utils.search(glist_ex, $("#bees_which_select").val())][0] = $("#pointColor_select").val();
                /**/
                beesStyle[beesworm.Utils.search(glist_ex, $("#bees_which_select").val())][1] = $("#pointSize_select").val();
                /**/
                beesStyle[beesworm.Utils.search(glist_ex, $("#bees_which_select").val())][2] = $("#pointStyle_select").val();
                /**/
                beesStyle[beesworm.Utils.search(glist_ex, $("#bees_which_select").val())][3] = $("#boxColor_select").val();
                /**/
                beesStyle[beesworm.Utils.search(glist_ex, $("#bees_which_select").val())][4] = $("#boxStyle_select").val();
                /**/
                beesStyle[beesworm.Utils.search(glist_ex, $("#bees_which_select").val())][5] = $("#lineColor_select").val();
                /**/
                beesStyle[beesworm.Utils.search(glist_ex, $("#bees_which_select").val())][6] = $("#lineStyle_select").val();
                /**/
            }
            /**/ //console.log("🐝样式数组:"+beesStyle);
            /**样式数组初始化完毕*/

            /**监听重新渲染按钮 重新渲染*/
            /**/
            $("#btn_Rerender").click(function() {
                /**/
                is_reRender = true;
                /**/
                beesworm.View.draw(genename, cancertype, data, datatag, cutoff, beesStyle, is_reRender, is_downloadConfigured);
                /**/
            });
            /**结束*/

            data.forEach(function(a) {
                var i = 0;
                a.forEach(function(b) {
                    b.forEach(function(c) {

                        /**🐝数据极值初始化*/
                        /**/ //计算x最小值
                        /**/
                        var xmin = 10000;
                        /**/
                        var xmax = -10000;
                        /**/
                        var down = 10000;
                        /**/
                        var up = -10000;
                        /**/
                        var avg = -10000;
                        /**/
                        var ymin = 20000;
                        /**/
                        var ymax = -20000;
                        /**🐝数据极值初始化完毕*/

                        var input_cutoff1 = $("#line1").val();
                        var input_cutoff2 = $("#line2").val();
                        var cutoff = [];
                        if (input_cutoff1 != "") {
                            cutoff.push(input_cutoff1);
                        }
                        if (input_cutoff2 != "") {
                            cutoff.push(input_cutoff2);
                        }
                        cutoff.sort();

                        var cutoffall = [];
                        cutoff.forEach(function(cc) {
                            cutoffall.push([cc, 0]);
                        });
                        //cutoff计算
                        var cut1 = 0;
                        var cut2 = 0;

                        var value_list = [];
                        var all_count = 0;
                        var sum = 0;
                        c.forEach(function(item_one) {
                            //cutoff个数统计
                            all_count++;
                            if (cutoffall.length == 1) {
                                if (item_one[1] >= cutoff[0]) {
                                    cutoffall[0][1]++;
                                }
                            } else if (cutoffall.length == 2) {
                                if (item_one[1] < cutoff[0]) {
                                    cutoffall[0][1]++;
                                } else if (item_one[1] >= cutoff[0] && item_one[1] < cutoff[1]) {
                                    cutoffall[1][1]++;
                                }
                            }

                            if (xmin > item_one[0]) { //计算x最小
                                xmin = item_one[0];
                            }
                            if (xmax < item_one[0]) { //计算x最大
                                xmax = item_one[0]
                            }

                            if (ymin > item_one[1]) { //计算y最小
                                ymin = item_one[1];
                            }
                            if (ymax < item_one[1]) { //计算y最大
                                ymax = item_one[1]
                            }

                            sum += item_one[1]; //计算和
                            value_list.push(item_one[1]);
                        }, this);

                        avg = sum / value_list.length; //平均值

                        //cutoff统计百分比
                        cutoffall.forEach(function(cuu) {
                            cuu[1] /= all_count;
                        });
                        //console.log(cutoffall);

                        value_list.sort(); //排序
                        //标准差
                        var value_sum = 0; //方差和
                        value_list.forEach(function(value) {
                            value_sum += ((value - avg) ^ 2);
                        });
                        var std = value_sum / value_list.length;
                        std = Math.sqrt(std); //标准差

                        //alert(std);

                        var q1 = value_list[Math.floor((value_list.length + 1) / 4)];
                        var mid = value_list[Math.floor((value_list.length + 1) / 2)];
                        var q3 = value_list[Math.floor(3 * ((value_list.length + 1) / 4))];

                        up = q3 + 1.5 * Math.abs(q3 - q1);

                        down = q1 - 1.5 * Math.abs(q3 - q1);
                        if (up > Ymax) {
                            Ymax = up;
                        }
                        if (down < Ymin) {
                            Ymin = down;
                        }

                        var linedata = [];
                        if ($("#boxplot").is(':checked')) {
                            linedata = beesworm.Utils.box(up, q3, avg, std, mid, q1, down, xmin, xmax, cutoffall, Xmax, beesStyle[i][3], beesStyle[i][4], beesStyle[i][5], beesStyle[i][6]);
                        } else {
                            linedata = beesworm.Utils.box("", "", "", "", "", "", "", "", "", cutoffall, Xmax, beesStyle[i][3], beesStyle[i][4], beesStyle[i][5], beesStyle[i][6]);
                        }
                        //构造cutoff百分比
                        if (cutoffall.length == 1) {
                            var line1 = [{ //up
                                coord: [(xmin + xmax) / 2, ymax - (ymax - cutoffall[0][0]) / 2],
                                symbol: 'none',
                                label: {
                                    normal: {
                                        formatter: ("" + (cutoffall[0][1]) * 100).substring(0, 4) + "%",
                                        textStyle: {
                                            align: 'center',
                                            color: "#00ff00"

                                        }
                                    }
                                }
                            }, {
                                coord: [(xmin + xmax) / 2, ymax - (ymax - cutoffall[0][0]) / 2],
                                symbol: 'none'
                            }];
                            var line2 = [{ //down
                                coord: [(xmin + xmax) / 2, cutoffall[0][0] - (cutoffall[0][0] - ymin) / 2],
                                symbol: 'none',
                                label: {
                                    normal: {
                                        formatter: ("" + (1 - cutoffall[0][1]) * 100).substring(0, 4) + "%",
                                        textStyle: {
                                            align: 'center',
                                            color: "#00ff00"
                                        }
                                    }
                                }
                            }, {
                                coord: [(xmin + xmax) / 2, cutoffall[0][0] - (cutoffall[0][0] - ymin) / 2],
                                symbol: 'none'
                            }];

                            linedata.push(line1);
                            linedata.push(line2);
                        }
                        if (cutoffall.length == 2) {
                            // console.log(ymax-(ymax-cutoffall[1][0])/2);
                            // console.log(cutoffall[1][0]-(cutoffall[1][0]-cutoffall[0][0])/2);
                            // console.log(cutoffall[0][0]-(cutoffall[0][0]-ymin)/2);
                            var line1 = [{ //up
                                coord: [(xmin + xmax) / 2, ymax - (ymax - cutoffall[1][0]) / 2],
                                symbol: 'none',
                                label: {
                                    normal: {
                                        formatter: ("" + (1 - cutoffall[0][1] - cutoffall[1][1]) * 100).substring(0, 4) + "%",
                                        textStyle: {
                                            align: 'center',
                                            color: "#00ff00"
                                        }
                                    }
                                }
                            }, {
                                coord: [(xmin + xmax) / 2, ymax - (ymax - cutoffall[1][0]) / 2],
                                symbol: 'none'
                            }];
                            var line2 = [{ //center
                                coord: [(xmin + xmax) / 2, cutoffall[1][0] - (cutoffall[1][0] - cutoffall[0][0]) / 2],
                                symbol: 'none',
                                label: {
                                    normal: {
                                        formatter: ("" + cutoffall[1][1] * 100).substring(0, 4) + "%",
                                        textStyle: {
                                            align: 'center',
                                            color: "#00ff00"
                                        }
                                    }
                                }
                            }, {
                                coord: [(xmin + xmax) / 2, cutoffall[1][0] - (cutoffall[1][0] - cutoffall[0][0]) / 2],
                                symbol: 'none'
                            }];
                            var line3 = [{ //down
                                coord: [(xmin + xmax) / 2, cutoffall[0][0] - (cutoffall[0][0] - ymin) / 2],
                                symbol: 'none',
                                label: {
                                    normal: {
                                        formatter: ("" + (cutoffall[0][1]) * 100).substring(0, 4) + "%",
                                        textStyle: {
                                            align: 'center',
                                            color: "#00ff00"
                                        }
                                    }
                                }
                            }, {
                                coord: [(xmin + xmax) / 2, cutoffall[0][0] - (cutoffall[0][0] - ymin) / 2],
                                symbol: 'none'
                            }];

                            linedata.push(line1);
                            linedata.push(line2);
                            linedata.push(line3);
                        }
                        //构造绘制数据组(散点图)

                        var serie = {
                            name: glist_ex[i],
                            type: 'scatter',
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            data: c,
                            itemStyle: {
                                normal: {
                                    color: beesStyle[i][0] //    颜色配置，读取beesStyle配置数组
                                }
                            },
                            symbol: beesStyle[i][2], //   点形状配置，读取beesStyle配置数组
                            symbolSize: beesStyle[i][1], //  点大小配置，读取beesStyle配置数组
                            //up,q3,avg,mid,q1,down,xmin,xmax

                            markLine: {
                                label: {
                                    normal: {
                                        formatter: '',
                                        textStyle: {
                                            align: 'right'
                                        }
                                    }
                                },
                                lineStyle: {
                                    normal: {
                                        color: "#000",
                                        type: 'solid'
                                    }
                                },
                                data: linedata
                            }
                        };
                        i++;
                        //console.log(serie);
                        series.push(serie);

                        c.forEach(function(d) {
                            //console.log(d[1]);
                            if (d[1] > Ymax) {
                                Ymax = d[1];
                            }
                            if (d[1] < Ymin) {
                                Ymin = d[1];
                            }
                        });
                    });
                });
            }, this);

            //标注点数据组（散点）
            var labelpoint = {
                zlevel: 1,
                name: 'label',
                type: 'scatter',
                symbolSize: 5,
                itemStyle: {
                    normal: {
                        color: "#00ff00"
                    }
                },
                data: datatag
            };

            series.push(labelpoint);

            var title = "";
            if (ttest_gene1 != "" & ttest_gene2 != "") {
                title = "          T-Test  of " + glist[ttest_gene1] + " and " + glist_ex[ttest_gene2] + " is " + t_value;
            }

            option = {
                title: {
                    text: genename.toUpperCase() + title,
                    x: 'left',
                    y: 0
                },
                grid: [{
                    x: '10%',
                    y: '15%',
                    width: '88%',
                    height: '80%'
                }],
                brush: {
                    toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
                    xAxisIndex: 0
                },
                legend: {
                    y: 'top',
                    data: glist_ex,
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
                tooltip: {
                    padding: 10,
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    formatter: function(obj) {
                        var value = obj.value;
                        //console.log(value);
                        return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                            obj.seriesName + '  ' + value[2] +
                            '</div>' +
                            'value: ' + value[1] + '<br>';
                    }
                },
                xAxis: [{
                    gridIndex: 0,
                    min: 0,
                    max: Xmax
                }],
                yAxis: [{
                    gridIndex: 0,
                    name: yAxisName,
                    min: Math.floor(Ymin),
                    max: Math.ceil(Ymax)
                }],
                series: series
            };

            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('echarts'));

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

            $("#bt_draw").removeAttr("disabled");

            //监听事件
            myChart.on("dblclick", function(param) {
                var mes = '【' + param.type + '】';
                if (typeof param.seriesIndex != 'undefined') {
                    mes += '  seriesIndex : ' + param.seriesIndex;
                    mes += '  dataIndex : ' + param.dataIndex;
                }
                if (param.type == 'hover') {
                    document.getElementById('hover-console').innerHTML = 'Event Console : ' + mes;
                } else {
                    //console.log(Math.round(param.data[0]));
                    if ((Math.round(param.data[0]) - 1) % 3 == 0) {
                        $("#note").append('<div class="alert alert-info alert-dismissible" role="alert" style="padding:0;margin:0;margin-top:1px;">' +
                            '<button type="button" style="padding:0;margin:0;" class="close" data-dismiss="alert">' +
                            '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                            '<strong style="padding:0;margin:0;">' + param.data[2] + ' </strong> value: ' + param.data[1] +
                            '</div>');
                    } else {
                        $("#note").append('<div class="alert alert-danger alert-dismissible" role="alert" style="padding:0;margin:0;margin-top:1px;">' +
                            '<button type="button" style="padding:0;margin:0;" class="close" data-dismiss="alert">' +
                            '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                            '<strong style="padding:0;margin:0;">' + param.data[2] + ' </strong> value: ' + param.data[1] +
                            '</div>');
                    }

                    //标注点数据加入
                    datatag.push(param.data);

                    //递归绘制
                    beesworm.View.draw(genename, cancertype, data, datatag, cutoff, beesStyle, is_reRender, is_downloadConfigured);

                    console.log(param.data[1] + param.data[2]);
                }
            });
        }
    }
});