$(document).ready(function() {
  $('#msg').hide();
    var scroll_start = 0;
    var startchange = $('#nav-bar');
    var offset = startchange.offset();
    if (startchange.length) {
        $(document).scroll(function() {
            scroll_start = $(this).scrollTop();
            if (scroll_start > offset.top) {
                $("#nav-bar").css('background-color', 'transparent');

            } else {
                $("#nav-bar").css('background-color', ' rgba(38, 28, 9,0.5)');
            }
        });
    }



  $('.likes').on('click',function(event)
{

  $('#msg').hide();

  event.preventDefault();
  var value=$('#tvormovie').val();
      console.log(value);
  var img_src=$(this).prev().prev('span').attr('id');
  var overview=$(this).prev().prev('span').html();
  var title=$(this).prev().prev('span').attr('class');
  var eve=$(this).attr('class');
  var url;
url='http://localhost:8000/search/response';
  var info={
    tv_or_movie:value,
    eve:eve,
    img_src:img_src,
    title:title,
    overview:overview,
    title:title
  };
  $.ajax({
      url:url,
      type: 'POST',
      data: info,

      dataType: 'JSON',
      success: function(msg) {
                if(msg.success){
                console.log('sent  data');
                $("#response").html(msg.msg);
                $('#msg').fadeIn().delay(3000).fadeOut();

              }





      },


      error: function(error) {

      }
  });





















});
$('.add_to_watchlist').on('click',function(event)
{

  event.preventDefault();
    var value=$('#tvormovie').val();
        console.log(value);
  var img_src=$(this).prev('span').attr('id');
  var overview=$(this).prev('span').html();
  var title=$(this).prev('span').attr('class');
  var eve=$(this).attr('class');
var url='http://localhost:8000/search/response';
  var info={
    tv_or_movie:value,
    eve:eve,
    img_src:img_src,
    title:title,
    overview:overview
  };
  $.ajax({
      url:url,
      type: 'POST',
      data: info,

      dataType: 'JSON',
      success: function(msg) {
                if(msg.success){
                console.log('sent  data');
                  $("#response").html(msg.msg);
                  $('#msg').fadeIn().delay(3000).fadeOut();
              }





      },


      error: function(error) {

      }
  });


});
$('.add_to_wishlist').on('click',function(event)
{
  event.preventDefault();
    var value=$('#tvormovie').val();
    console.log(value);
  var img_src=$(this).prev().prev().prev('span').attr('id');
  var overview=$(this).prev().prev().prev('span').html();
  var title=$(this).prev().prev().prev('span').attr('class');
  var eve=$(this).attr('class');
  url='http://localhost:8000/search/response';

  var info={
    tv_or_movie:value,
    eve:eve,
    img_src:img_src,
    title:title,
    overview:overview
  };
  $.ajax({
      url:url,
      type: 'POST',
      data: info,

      dataType: 'JSON',
      success: function(msg) {
                if(msg.success){
                console.log('sent data');
                  $("#response").html(msg.msg);
                  $('#msg').fadeIn().delay(3000).fadeOut();
              }





      },


      error: function(error) {

      }
  });


});
























    $('#join').click(function() {



        $('#my-modal').fadeIn(1000).modal('show');
        $(body).click(function()
      {
        $('#my-modal').fadeOut();
      });

    });/*----Search movies and tv shows */
     $('#search').on('click',search_content);
    function search_content(event)
    {
        event.preventDefault();
        var query=$('#queryy').val();
        var value=$('#tvormovie').val();
        if(value==="Movies")
        var url="http://localhost:8000/search/movies/"+query+"/";
        else
        var url="http://localhost:8000/search/tv/"+query+"/";
        window.location.href=url;
    }
























    $('#sign_in').click(function() {
        $('#my-modal2').fadeIn(1000).modal('show');
    });
    /*----Log out -------*/
    $('#log_out').on('click', logout);

    function logout(event) {
        event.preventDefault();
        window.location.href = 'http://localhost:8000/users/logout'
    }
    /*-----------------------Login*/
    $('#sign-in').on('click', authenticateUser);

    function authenticateUser(event) {
        event.preventDefault();
        var user = $('#input_user').val();
        var pass = $('#input_pass').val();
        var action = $('#form-sign-in').attr('action');
        console.log(action);
        if (authenticate(user, pass) == true) {
            var user_exist = {
                username: user,
                password: pass
            };

            $.ajax({
                url: action,
                type: 'POST',
                data: user_exist,

                dataType: 'JSON',
                success: function(msg) {
                    if (msg.success == true) {
                        console.log('sent');
                        $('#err').html(msg.message);

                        if (msg.session_user !== '' || msg.session_user !== undefined) {
                            $('#err').html(msg.message);
                            var url="http://localhost:8000/users/profile/";
                            window.location.href = url;
                            $('#input_user').val('');
                            $('#input_pass').val('');
                        }



                    } else if (msg.success === false) {
                        $('#err').html(msg.message);
                        $('#input_user').val('');
                        $('#input_pass').val('');
                    }

                },


                error: function(error) {
                    throw error;
                    $('#err').html('Server error!');
                }
            });
        }


    }

    function authenticate(user, pass) {
        if (user === '') {
            $('#err').html('Please enter username');
            $('#input_user').focus();
            return false;
        }
        if (pass === '') {
            $('#err').html('Please enter password');
            $('#input_pass').focus();
            return false;
        }
        return true;
    }

    /*-------------------------------*/


    /*Form data-sending to server using ajax



    REGISTRAION

    */
    $('#sign-up').on('click', adduser);

    function adduser(event) {
        event.preventDefault();
        var err = 0;
        /* $('#form-sign-up input').each(function(index,val)
   {
     if($(this).val()==='')
     {
       err++;

     }
   });*/

        var email = $('#input_email').val();
        var username = $('#input_username').val();
        var password = $('#input_password').val();
        var password_again = $('#confirm_password').val();
        var action = $('#form-sign-up').attr('action');
        if (form_validate(email, username, password, password_again) == true) {
            var new_user = {
                email: email,
                username: username,
                password: password
            };
            //  console.log(new_user.email);
            //console.log(new_user.username);
            //  console.log(new_user.password);
            $.ajax({
                url: action,
                type: 'POST',
                data: new_user,

                dataType: 'JSON',
                success: function(msg) {
                    if (msg.retStatus == true) {
                        $('#error').html(msg.message);
                        if (msg.session_user !== '' || msg.session_user !== undefined)
                            window.location.href = "http://localhost:8000/users/profile";
                        $('#input_email').val('');
                        $('#input_username').val('');
                        $('#input_password').val('');
                        $('#confirm_password').val('');

                    } else if (msg.retStatus === false) {
                        console.log('falseee');
                        $('#error').html(msg.message);
                        $('#input_email').val('');
                        $('#input_username').val('');
                        $('#input_password').val('');
                        $('#confirm_password').val('');

                    }

                    /*else
                    $('#error').html('Error occured');*/
                },
                error: function(error) {
                    $('#error').html('Internal server error!!!Patience');
                }
            });
        }
        /*Form validation using jquery */
        function form_validate(email, username, password, password_again) {
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

            if (email === '') {
                $('#error').html('Please enter email');
                $('#input_email').focus();
                return false;
            }
            if (!emailReg.test(email)) {
                $('#error').html('Please enter valid email address');
                $('#email').val('');
                $('#email').focus();
                return false;
            }
            if (username === '') {
                $('#error').html('Please enter name');
                $('#input_name').focus();
                return false;
            }
            if (username.length < 5) {
                $('#error').html('Use a longer length username');
                return false;
            }
            if (password === '') {
                $('#error').html('Please enter the password');
                $('#input_password').focus();
                return false;
            }
            if (password.length < 6) {
                $('#error').html('Password length should be greater than 6');
                return false;
            }
            if (password_again === '') {
                $('#error').html('Please re-enter password');
                $('#confirm_password').focus();
                return false;
            } else if (password !== '' || password_again !== '') {

                if (password != password_again) {
                    $('#error').html('Please enter the same password as above');
                    return false;
                } else {
                    $('#error').html('');
                    return true;
                }
            }
            return true;
        }




        /*else {
          var email=$('#input_email').val();
          var username=$('#input_username').val();
          var password=$('#input_password').val();
           if(email==='')
           $('#error').html('Enter your email dude !');

           else if(username==='')
           $('#email').html('Enter your name buddy !');
           if(password==='')
           $('#password').html('Enter your password');
        }*/

    };
  $(document).ready(function()
  {
       $('.info').on('click',function()
  {
    let title=$(this).prev().prev().prev().prev('span').attr('class');
    var img_src=$(this).prev().prev().prev().prev('span').attr('second_image');

    let url_="http://image.tmdb.org/t/p/w300"+img_src+"";
      $('.img_overview').attr('src',url_);
      $('.img_overview').css('width','230px');
      $('.img_overview').css('height','140px');

    console.log(url_);
   let overview=$(this).prev().prev().prev().prev('span').html();
    $('.img_overview').attr('src',url_);
    $('.img_overview').css('box-shadow','5px 5px 5px #000');

    $("#result").html(overview);
    $('#res_header').css('width','530px');
    $('#res_header').css('background-color','yellow');

    $('.img_overview').css('display','block');
    $('#res_header').css('color','#333');
    $('#res_title').html(title);
    $('#res_header').css('display','block');
    $('#res_body').css('background-color','#333');
    $('#res_body').css('float','left');
    $('#res_body').css('width','530px');
   $('#info_movie').fadeIn('slow').modal('show');

   $('.desc_close').fadeOut('slow');

  });
  });



});
