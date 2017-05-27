$(document).ready(function(){
var scroll_start = 0;
  var startchange = $('#nav-bar');
  var offset = startchange.offset();
   if (startchange.length){
  $(document).scroll(function() {
     scroll_start = $(this).scrollTop();
     if(scroll_start > offset.top) {
          $("#nav-bar").css('background-color', 'transparent');

      } else {
         $("#nav-bar").css('background-color', ' rgba(38, 28, 9,0.5)');
      }
  });
   }


   $('#join').click(function()
   {
     $('#first-image').css('background-image','images/flash1.jpg');
     $('#my-modal').modal('show');


   });
});
