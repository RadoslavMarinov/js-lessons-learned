const carouselSlide = document.querySelector('.carousel-slide')
const carouselImages = document.querySelectorAll('.carousel-slide img')


// Buttons
const prevBtn = document.querySelector(`#prevBtn`)
const nextBtn = document.querySelector(`#nextBtn`)


// Counter
let counter = 1

// const size = carouselImages[counter].clientWidth
const size = 200

carouselSlide.style.transform = `translateX(${(-size * counter)}px)`

// Button listeners
nextBtn.addEventListener('click', (e) => {
  if( counter > carouselImages.length - 2 ) return;
  carouselSlide.style.transition = "transform .4s ease-in-out"
  counter++;
  console.log(`Counter = ${counter}`)
  // const size = 200// carouselImages[counter].clientWidth
  carouselSlide.style.transform = `translateX(${-size * counter}px)`
})

prevBtn.addEventListener('click', (e) => {
  if(counter <= 0) return;
  carouselSlide.style.transition = "transform .4s ease-in-out"
  counter--;
  console.log(`Counter = ${counter}`)
  carouselSlide.style.transform = `translateX(${-size * counter}px)`
})

carouselSlide.addEventListener('transitionend', (e) => {
  if(carouselImages[counter].id === "lastClone"){
    carouselSlide.style.transition = "none"
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`
  }

  if(carouselImages[counter].id === "firstClone"){
    carouselSlide.style.transition = "none"
    counter = carouselImages.length - counter;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`
  }
})