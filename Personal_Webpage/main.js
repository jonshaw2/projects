$(document).ready(function(){
  var lastButtonPressed = '.mid_content';
  var slideIndex = 1;




  $("#home").click(function(){
    $('.title').text("Jonathan Shaw");
    remove_animation();
    run_animation('.mid_content');

  });

  $("#portfolio").click(function(){
    $('.title').text("Portfolio");
    remove_animation();
    run_animation('.portfolio');

  });



  $("#about").click(function() {
    $('.title').text("Jonathan Shaw");
    remove_animation();
    run_animation('.about');

  });

  $("#contact").click(function() {
    $('.title').text("Contact");
    remove_animation();
    run_animation('.contact');

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
    console.log('test');
  });



  function plusDivs(n) {
    console.log('test');
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


  function run_animation(showContent){
    if (lastButtonPressed != showContent){

      $(lastButtonPressed).css('opacity','1');
      setTimeout(function(){
        $(lastButtonPressed).addClass('run-animation-fade');
      }, 1);

      setTimeout(function(){
        $(showContent).css('opacity','0');
        $(showContent).addClass('run-animation-appear');
        $(lastButtonPressed).css('opacity','0');
        lastButtonPressed = showContent;
      }, 501);
    }
    else{
    $(lastButtonPressed).css('opacity','1');
    }
  }


  function remove_animation(){
    var classes = [".mid_content",".about",".portfolio",".contact"];

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



      if (sheight <= window.innerHeight-100){

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
