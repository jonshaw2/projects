$(document).ready(function(){
  var lastButtonPressed = '.mid_content';
  var slideIndex = 1;
  var lastButton = 'test';
  var backgroundAnimation = "image/snow.png";
  var backgroundOpacity = 0.2;
  changeButton('#home');



  $("#home").click(function(){
    remove_animation();
    run_animation('.mid_content','#home');
  });

  $("#skill").click(function(){
    remove_animation();
    run_animation('.skill','#skill');
  });

  $("#portfolio").click(function(){
    remove_animation();
    run_animation('.portfolio','#portfolio');
  });

  $("#about").click(function() {

    remove_animation();
    run_animation('.about','#about');
  });

  $("#contact").click(function() {
    remove_animation();
    run_animation('.contact','#contact');
  });

  $("#resume").click(function() {
    var pdf = ('Jonathan_Shaw_resume.pdf');
    window.open(pdf);
  });

  $(".w3-display-left").click(function(){
    plusDivs(-1);
  });

  $(".w3-display-right").click(function(){
    plusDivs(1);
  });

  $(".taco_toggle").click(function(){
    if (backgroundAnimation === ("image/snow.png")){
      backgroundAnimation = "image/taco.png";
      $(".taco_toggle img").attr('src','image/snow.png');
      backgroundOpacity = 1;
    }
    else{
      backgroundAnimation ="image/snow.png";
      $(".taco_toggle img").attr('src','image/taco.png');
      backgroundOpacity = 0.2;
    }

    for (var i=0; i<10; i++){
      $(".snow"+i).attr('src',backgroundAnimation);
      $(".snow"+i).css("opacity",backgroundOpacity);
    }
  });

  function changeButton(button_class){
    $(lastButton).css('background','none');
    lastButton = button_class;
    $(button_class).css('background','#333333');
  }

  function plusDivs(n) {
    showDivs(slideIndex += n);
  }

  function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {slideIndex = 1;}
    if (n < 1) {slideIndex = x.length;}
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
    }
    x[slideIndex-1].style.display = "block";
  }


  function run_animation(showContent, contentId){
    if (lastButtonPressed != showContent){
      $(lastButtonPressed).css('visibility','visibile');
      $(showContent).css('visibility','visible');


      $(lastButtonPressed).css('opacity','1');
      setTimeout(function(){
        changeButton(contentId);
        $(lastButtonPressed).addClass('run-animation-fade');
      }, 1);

      setTimeout(function(){
        remove_animation();
        $(showContent).css('opacity','0');
        $(showContent).addClass('run-animation-appear');
        $(lastButtonPressed).css('opacity','0');
        changeButton(contentId);
        $(lastButtonPressed).css('visibility','hidden');
        lastButtonPressed = showContent;
      }, 251);
    }
    else{
    $(lastButtonPressed).css('opacity','1');
    }
  }


  function remove_animation(){
    var classes = [".mid_content",".about",".portfolio",".contact", ".skill"];

    for (var i = 0; i<classes.length; i++){
      $(classes[i]).removeClass('run-animation-fade');
      $(classes[i]).removeClass('run-animation-appear');
    }
  }

  function snow_background(){


      this.sheight = [0,0,0,0,0,0,0,0,0,0];
      this.swidth = [0,0,0,0,0,0,0,0,0,0];
      this.snowCount = [0,0,0,0,0,0,0,0,0,0];
      this.speed = [0,0,0,0,0,0,0,0,0,0];
      for(var i=0; i<this.sheight.length;i++){
        this.swidth[i]=Math.floor(Math.random()*window.innerWidth-200)+100;
        this.speed[i]=Math.floor(Math.random()*2)+1;
        $(".background").append('<img class="snow snow'+i+'" src="image/snow.png">');

        $(".snow"+i).css('position','absolute');
        $(".snow"+i).css('opacity','.2');
        $(".snow"+i).css('width','25px');
        $(".snow"+i).css('margin',this.sheight[i] +' 0 0 -9000px');

        this.snowCount[i] = i;


      }

      var counter = 0;
      callingSnow();

      function callingSnow(){
        setTimeout(function(){

          this.snowCount[counter] = counter;

          snowing(this.sheight[counter], this.swidth[counter], this.snowCount[counter], this.speed[counter]);

          if (counter <= 10){
            callingSnow();
            counter += 1;
          }
          else{
          }
        }, 1000*counter+1);

      }
    function snowing(sheight, swidth, snowCount, speed){
      var heightlimit = $(".background").innerHeight()-100;


      if (sheight <= heightlimit){

        sheight += speed;


        $(".snow"+snowCount).css('margin',sheight + 'px 0 0 '+swidth+'px');
        setTimeout(function(){
          snowing(sheight, swidth, snowCount, speed);
        }, 10);
      }
      else{
        sheight = 0;
        swidth = Math.floor(Math.random()*window.innerWidth-200)+100;
        speed = Math.floor(Math.random()*2)+1;
        snowing(sheight, swidth, snowCount, speed);


      }

    }
  }
  showDivs(slideIndex);
  snow_background();

});
