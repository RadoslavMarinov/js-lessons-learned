const carouselSlide = document.querySelector('.carousel-slide')
const carouselImages = document.querySelectorAll('.carousel-slide img')


// Buttons
const prevBtn = document.querySelector(`#prevBtn`)
const nextBtn = document.querySelector(`#nextBtn`)


// Counter
const imagesRepeated = 3
let lastSwitch = ""
const uniqueImagesLength = carouselImages.length  / imagesRepeated
let counter = uniqueImagesLength
const rightShiftAt =  uniqueImagesLength;
const leftShiftAt =  carouselImages.length - uniqueImagesLength;
console.log(`leftShiftAt = ${leftShiftAt}`)
// const size = carouselImages[counter].clientWidth
const size = 200

carouselSlide.style.transform = `translateX(${(-size * counter)}px)`

// Button listeners
nextBtn.addEventListener('click', (e) => {
  if( counter > carouselImages.length - 2 ) return;
  lastSwitch = "left"
  carouselSlide.style.transition = "transform .4s ease-in-out"
  counter++;
  console.log(`Counter = ${counter}, all = ${carouselImages.length}, leftShiftAt=${leftShiftAt}`)
  // const size = 200// carouselImages[counter].clientWidth
  carouselSlide.style.transform = `translateX(${-size * counter}px)`
})

prevBtn.addEventListener('click', (e) => {
  if(counter <= 0) return;
  lastSwitch = "right"
  carouselSlide.style.transition = "transform .4s ease-in-out"
  counter--;
  console.log(`Counter = ${counter}`)
  carouselSlide.style.transform = `translateX(${-size * counter}px)`
})

carouselSlide.addEventListener('transitionend', (e) => {
  if(lastSwitch === "left"){
    if(counter  >= leftShiftAt) {
      carouselSlide.style.transition = "none"
      counter = counter - uniqueImagesLength
      carouselSlide.style.transform = `translateX(${-size * counter}px)`
    }
  }

  if(lastSwitch === "right"){
    if(counter  <= rightShiftAt) {
      carouselSlide.style.transition = "none"
      counter = counter + uniqueImagesLength ;
      carouselSlide.style.transform = `translateX(${-size * counter}px)`
    }
  }
})