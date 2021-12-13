
const datasourceCarousel = {
  initialized: false,
  imageCopies: 3,
  slideDelayMs: 2500,
  transitionDelay: 600,
  init: function (params) {
    if(this.initialized) return;
    this.initialized = true;

    this.replicateSiblings('.carousel-slide .img-cont', this.imageCopies - 1); // The origina image-set already exists in HTML

    this.carouselSlide = document.querySelector('.carousel-slide')
    this.carouselImages = document.querySelectorAll('.carousel-slide img')
  
    // Buttons
    this.prevBtn = document.querySelector(`#prevBtn`)
    this.nextBtn = document.querySelector(`#nextBtn`)

      
    this.lastSwitch = "";
    this.uniqueImagesLength = this.carouselImages.length  / this.imageCopies

    this.counter = this.uniqueImagesLength // Lets start from the first of the second copy
    this.shiftForwardAt = this.uniqueImagesLength;
    this.shiftBackAt = this.carouselImages.length - this.uniqueImagesLength;
    this.size = document.querySelector(".img-cont").clientWidth

    console.log(`counter = `, this.counter)
    this.carouselSlide.style.transform = this.getTranslateVal()

    this.nextBtn.addEventListener('click', this.shiftNext.bind(this))
    this.prevBtn.addEventListener('click', this.shiftPrev.bind(this))
    this.carouselSlide.addEventListener('transitionend', this.onTransitionCompleted.bind(this))
  },

  replicateSiblings: function(querySelector = '.carousel-slide .img-cont', times = 2){
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
  },


  shiftNext: function () {
    if( this.counter > this.carouselImages.length - 2 ) return;
    this.lastSwitch = "forward"
    this.carouselSlide.style.transition = `transform ${this.transitionDelay}ms ease-in-out`
    this.counter++;
    console.log(`Counter = ${this.counter} shiftBackAt=${this.shiftBackAt}`)
    this.carouselSlide.style.transform = this.getTranslateVal()
  },

  shiftPrev: function() {
    if(this.counter <= 0) return;
    this.lastSwitch = "backward"
    this.carouselSlide.style.transition = `transform ${this.transitionDelay}ms ease-in-out`
    this.counter--;
    console.log(`Counter = ${this.counter} shiftForwardAt=${this.shiftForwardAt}`)
    this.carouselSlide.style.transform = this.getTranslateVal()
  },
  onTransitionCompleted: function () {
    if(this.lastSwitch === "forward"){
      if(this.counter  >= this.shiftBackAt) {
        this.carouselSlide.style.transition = "none"
        this.counter = this.counter - this.uniqueImagesLength
        this.carouselSlide.style.transform = this.getTranslateVal()
      }
    }
  
    if(this.lastSwitch === "backward"){
      if(this.counter  <= this.shiftForwardAt) {
        this.carouselSlide.style.transition = "none"
        this.counter = this.counter + this.uniqueImagesLength ;
        this.carouselSlide.style.transform = this.getTranslateVal()
      }
    }
  },

  getTranslateVal: function (offset=0) {
    // possition center on the screen 
    let offSet = (innerWidth / 2) - (this.size / 2 )
    //==
    return `translateX(${(-this.size * this.counter) + offSet }px)`
  }
}

var carousleSpinInterval;

window.addEventListener('load', (e) => {
  startDatasourceCarousel()
})

function startDatasourceCarousel() {
  datasourceCarousel.init()
  if(!carousleSpinInterval){
    carousleSpinInterval = setInterval(() => {
      datasourceCarousel.shiftNext()
    }, datasourceCarousel.slideDelayMs);
  }
}

function stopDatasourceCarousel() {
  if(carousleSpinInterval){
    clearInterval(carousleSpinInterval)
  }
  carousleSpinInterval = null;
}