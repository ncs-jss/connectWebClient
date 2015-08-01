$(document).ready(function(){

    $(".open-panel").click(function(){
        $("html").addClass("openNav");
    });

    $(".close-panel, #content").click(function(){
        $("html").removeClass("openNav");
    });

    $('.js-submit').click(function(event){
        event.preventDefault();
        $('.js-error').addClass("hidden");
        $('.js-error').text('');

        $.ajax({
          type: "POST",
          url: "/auth",
          data: $('form').serialize(),
          success: function(data){
                $.localStorage.set('auth_token',data.token);
                $.localStorage.set('type',data.type);
                window.location = '/dashboard';
          },
          error: function(jqXHR, textStatus, errorThrown) {
                $('.js-error').removeClass("hidden");
                if(jqXHR.status === 400){
                    $('.js-error').text('Invalid username or password');
                }else
                    $('.js-error').text('Unable to connect to server');
          },
          dataType:'json'
        });

    })

})



