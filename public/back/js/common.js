
$(document).ajaxStart(function () {
    NProgress.start();
});

$(document).ajaxStop(function () {
    NProgress.done();
});


if (location.href.indexOf("login.html") === -1){
    $.ajax({
        type:"get",
        url: "/employee/checkRootLogin",
        dataType: "json",
        success:function (info) {
            if (info.success){
                console.log("denglu")
            }
            if (info.error===400){
                console.log("weidenglu")
                location.href="login.html"
            }
        }
    })
}






$(function () {
 $('.nav .category').click(function () {
     $('.nav .child').stop().slideToggle(1000);
 });


 $('.icon-menu').click(function () {
     $('.lt_aside').toggleClass("hidemenu");
     $('.lt_topbar').toggleClass("hidemenu");
     $('.lt_main').toggleClass("hidemenu");
 });
    
$('.icon_logout').click(function () {
        $('#logoutModal').modal("show");
    });

$('#logoutBtn').click(function () {
    $.ajax({
        type: "get",
        url: "/employee/employeeLogout",
        dataType: "json",
        success: function( info ) {
            console.log( info );
            if ( info.success ) {
                // 退出成功, 跳转到登录页了
                location.href = "login.html";
            }
        }
    })
})


    
    
    
    
    
    
    
    
    
    
});
