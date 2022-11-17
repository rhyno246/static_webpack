import "slick-carousel/slick/slick.css";
import "slick-carousel";
import '../css/index.scss';
import '../vendor/radio.css';

// const image = require('../img/slide-01.jpg')

// let img = new Image();
// img.src  = image;


// $('body').append(img);


$(".carousel").slick({
  prevArrow:
    '<button class="arrow-slick prev-slick"><i class="fa  fa-angle-left" aria-hidden="true"></i></button>',
  nextArrow:
    '<button class="arrow-slick next-slick"><i class="fa  fa-angle-right" aria-hidden="true"></i></button>',
});
