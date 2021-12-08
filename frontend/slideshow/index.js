window.addEventListener('load', (e) => {
  console.log(`Document Loaded!`);
  document.querySelector(`#slider-container`).addEventListener('transitionend', (e) => {
    console.log(`Transitioned`);
  });


  const items = document.querySelectorAll(".slider-item")
  const numOfItems = items.length
  
  document.querySelector('#move-button').addEventListener('click', () => {
    console.log(`button hit`)
    changeOrder();
  });

  // populate with orders
  items.forEach((item, idx )=> {
    item.style.order = idx+1;
  });


  async function changeOrder () {
    const slides = document.querySelectorAll('.slider-item');
    const slider = document.querySelector(`#slider-container`);
    
    slider.classList.remove('slider-container-transition');
    slides.forEach((el,idx) => {
      let order = Number(el.style.order);
      order++;
      const newOrder = order % numOfItems;
      el.style.order = `${newOrder}` ;
    })
    slider.style.transform = `translateX(0px)`
    await wait(50)
    slider.classList.add('slider-container-transition');
    slider.style.transform = `translateX(-200px)`
  }

});

function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms);
  })
  
}