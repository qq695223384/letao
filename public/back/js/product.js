$(function () {
    var currentPage=1;
    var pageSize=5;
    var picArr=[];
    render();
    
    
    function render() {
        $.ajax({
            type:"get",
            url:"/product/queryProductDetailList",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info) {
                var htmlStr=template("productTpl",info);
                $('.lt_content tbody').html(htmlStr);


                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total/info.size),
                    size:"large",

                    itemTexts:function(type,page,current){
                       switch (type) {
                           case "page":
                               return"第"+page+"页";
                           case"first":

                               return "首页";
                           case"last":

                               return "尾页";
                           case"prev":

                               return "上一页";
                           case"next":

                               return "下一页";
                       }


                    },
                    tooltipTitles:function(type,page,current){
                        switch (type) {
                            case "page":
                                return"第"+page+"页";
                            case"first":

                                return "首页";
                            case"last":

                                return "尾页";
                            case"prev":

                                return "上一页";
                            case"next":

                                return "下一页";
                        }

                    },
                    useBootstrapTooltip:true,

                    onPageClicked:function (a,b,c,page) {
                        currentPage=page;
                        render();
                    }

                })




            }
        })
    }
    
    $('#addBtn').click(function () {
        $('#addModal').modal("show");

        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            dataType:"json",
            success:function (info) {
                var htmlStr=template("dropdownTpl",info);
                $('.dropdown-menu').html(htmlStr);
            }
            
        })
    })

    $('.dropdown-menu').on("click","a",function () {
        var txt=$(this).text();
        $('#dropdownText').text(txt);
        var id=$(this).data("id");
        $('[name="brandId"]').val(id);
    })

    $('#fileupload').fileupload({
        dataType: "json",
        done:function (e,data) {
            picArr.unshift(data.result);

            $('#imgBox').prepend('<img src="'+ data.result.picAddr +'" width="100">');

            if (picArr.length>3){
                picArr.pop();

                $('#imgBox img').eq(-1).remove()
            }
            if (picArr.length===3){
                $('#form').data("bootstrapValidator").updateStatus("picStatus","VALID");
            }

        }
    })

    $('#form').bootstrapPaginator({
        excluded: [],

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            // 品牌名称
            brandId: {
                //校验规则
                validators: {
                    notEmpty: {
                        message: "请输入二级分类名称"
                    }
                }
            },
            // 一级分类的id
            proName: {
                validators: {
                    notEmpty: {
                        message: "请输入商品名称"
                    }
                }
            },
            // 图片的地址
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "描述"
                    }
                }
            },
            picStatus: {
                validators: {
                    notEmpty: {
                        message: "描述"
                    }
                }
            }
        }

    })
    $('#form').on("success.form.bv",function (e) {
        e.preventDefault();

        $.ajax({
            type:"post",
            url:"/product/addProduct",
            data:paramStr,
            dataType:"json",
            success:function (info) {
                if (info.success()){
                    $('#addModal').modal("hide");
                    currentPage=1;
                    render();
                    $('#form').data("bootstrapValidator").resetForm(true);
                    $('#dropdownText').text("选择二级分类");
                  $('#imgBox img').remove();
                }
            }

        })
    })
});
