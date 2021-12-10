
window.addEventListener('load', (e) => {


  const imageCopies = 3
  replicateSiblings('.carousel-slide .img-cont', imageCopies - 1); // The origina image-set already exists in HTML

  const carouselSlide = document.querySelector('.carousel-slide')
  const carouselImages = document.querySelectorAll('.carousel-slide img')

  // Buttons
  const prevBtn = document.querySelector(`#prevBtn`)
  const nextBtn = document.querySelector(`#nextBtn`)

  let lastSwitch = ""
  const uniqueImagesLength = carouselImages.length  / imageCopies

  let counter = uniqueImagesLength // Lets start from the first of the second copy
  const shiftForwardAt = uniqueImagesLength;
  const shiftBackAt = carouselImages.length - uniqueImagesLength;
  const size = document.querySelector(".img-cont").clientWidth

  console.log(counter)
  carouselSlide.style.transform = `translateX(${-size * counter}px)`

  nextBtn.addEventListener('click', (e) => {
    if( counter > carouselImages.length - 2 ) return;
    lastSwitch = "forward"
    carouselSlide.style.transition = "transform .4s ease-in-out"
    counter++;
    console.log(`Counter = ${counter} shiftBackAt=${shiftBackAt}`)
    carouselSlide.style.transform = `translateX(${-size * counter}px)`
  })
  
  prevBtn.addEventListener('click', (e) => {
    if(counter <= 0) return;
    lastSwitch = "backward"
    carouselSlide.style.transition = "transform .4s ease-in-out"
    counter--;
    console.log(`Counter = ${counter} shiftForwardAt=${shiftForwardAt}`)
    carouselSlide.style.transform = `translateX(${-size * counter}px)`
  })
  
  carouselSlide.addEventListener('transitionend', (e) => {
    if(lastSwitch === "forward"){
      if(counter  >= shiftBackAt) {
        carouselSlide.style.transition = "none"
        counter = counter - uniqueImagesLength
        carouselSlide.style.transform = `translateX(${-size * counter}px)`
      }
    }
  
    if(lastSwitch === "backward"){
      if(counter  <= shiftForwardAt) {
        carouselSlide.style.transition = "none"
        counter = counter + uniqueImagesLength ;
        carouselSlide.style.transform = `translateX(${-size * counter}px)`
      }
    }
  })



  // setInterval(() => {
  //   if( counter > carouselImages.length - 2 ) return;
  //   lastSwitch = "left"
  //   carouselSlide.style.transition = "transform .7s ease-in-out"
  //   counter++;
  //   console.log(`Counter = ${counter}, all = ${carouselImages.length}, shiftBackAt=${shiftBackAt}`)
  //   // const size = 200// carouselImages[counter].clientWidth
  //   carouselSlide.style.transform = `translateX(${-size * counter}px)`
  // }, 2000);
})

function replicateSiblings(querySelector = '.carousel-slide .img-cont', times = 2){
  const selectedSiblings = document.querySelectorAll(querySelector);
  const parent = selectedSiblings[0].parentElement;

  
  for (let i = 0; i < times; i++) {
    // Append comment - optional
    const comment = document.createComment(` -------- ${i+2} -------- `);
    parent.appendChild(comment)

    // Append siblings
    selectedSiblings.forEach((el,idx)=>{
      const clone = el.cloneNode(true);
      parent.appendChild(clone);
    })

  }

}