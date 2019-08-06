$(function () {

    $("#form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
       fields:{
           username:{
               validators:{
                   notEmpty:{
                       message:"NOT EMPTY"
                   },
                   stringLength:{
                       min:2,
                       max:6,
                       message:"2-6"
,                   },
                   callback:{
                       message:"NOT EXSIT"
                   }

               }

           },
           password:{
               validators: {
                   notEmpty: {
                       message:"NOT EMPTY"
                   },
                   stringLength: {
                       min: 6,
                       max: 12,
                       message:"6-12"
                   },
                   callback:{
                       message:"NOT EXSIT"
                   }
               }

           }
       }
    });


    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        console.log("阻止默认的表单提交");
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:$('#form').serialize(),
            dataType:"json",
            success:function (info) {
                console.log(info);
                if (info.success){
                   location.href="index.html"
                }
                if (info.error===1000){
                    // alert("NOT ESTIT");
                    $('#form').data("bootstrapValidator").updateStatus("username","INVALID","callback");
                }

                if (info.error===1001){
                    // alert("Flase");
                    $('#form').data("bootstrapValidator").updateStatus("password","INVALID","callback")
                }


            }
        }

        )


    });



    $('[type="reset"]').click(function () {
        $('#form').data("bootstrapValidator").resetForm()
    })
});