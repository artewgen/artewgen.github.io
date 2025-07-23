


$(function() {

  /* Mobile navigation */
  $('#menu-mobile-switcher').on('click', function(){
    $('#header-nav').toggleClass('open');
  });


  /* Main page pet slides */
  const sliderBlock = document.querySelector('.intro__pet');
  if (sliderBlock!=null){
  const slides = [
    {
      text: 'and 2+ years with'
    },
    {
      text: 'and 3+ years with'
    },
    {
      text: 'and 4+ years with'
    },
    {
      text: 'and 5+ years with'
    }
  ];
  
  let current = 0;
  const txt = document.querySelector('.intro__pet__text');
  
  function showSlide(index) {
    txt.textContent = slides[index].text;
  }
  function nextSlide() {
    showSlide(current);    
    setTimeout(() => {
      sliderBlock.classList.remove('pet-'+current);
      current = (current + 1) % slides.length;
      sliderBlock.classList.add('pet-'+current);
      showSlide(current);
    }, 400);
  }
  
  showSlide(current); 
  setInterval(nextSlide, 1500);
  }
 


/* YooMoney Widget Slider Before After */
  const beforeAfterWrap = document.querySelector(".before-after-wrap");
  if (beforeAfterWrap){
    const afterImgWrap = beforeAfterWrap.querySelector(".img-wrap.is-after");
    const dragger = beforeAfterWrap.querySelector(".dragger");

    Draggable.create(dragger, {
      type: "x",
      bounds: beforeAfterWrap,
      onDrag: function () {
        const x =
          beforeAfterWrap.offsetWidth / 2 - gsap.getProperty(this.target, "x");
        afterImgWrap.style.clipPath = `inset(0px ${x}px 0px 0px)`;
      },
    });
  }
  



/* Case Study Navigation */
const nav = document.querySelector('#case-study-nav');
const start = document.querySelector('.start-scroll-nav');
const end = document.querySelector('.end-scroll-nav');

function handleStickyNav() {
  const startRect = start.getBoundingClientRect();
  const endRect = end.getBoundingClientRect();
  const navHeight = nav.offsetHeight;

  // If we're above the start block
  if (startRect.bottom > 320) {
    nav.style.position = 'absolute';
    nav.style.top = `${start.offsetTop}px`;
  }
  // If we're below the end block
  else if (endRect.top < navHeight) {
    nav.style.position = 'absolute';
    nav.style.top = `${end.offsetTop - navHeight}px`;
  }
  // In between: sticky
  else {
    nav.style.position = 'fixed';
    nav.style.top = '2rem';
  }
  nav.style.display = 'flex';
}
window.addEventListener('scroll', handleStickyNav);
window.addEventListener('resize', handleStickyNav);
handleStickyNav(); // Initial call


const navSections = document.querySelectorAll('.nav-section');
  const navH1s = document.querySelectorAll('.nav-h1');
  const navH2Links = document.querySelectorAll('.nav-h2');
  const blocks = document.querySelectorAll('.case-study__block');

  // Accordion: open one section at a time on click
  navH1s.forEach(btn => {
    btn.addEventListener('click', function() {
      navSections.forEach(section => section.classList.remove('open'));
      this.parentElement.classList.add('open');
      navH1s.forEach(h1 => h1.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Smooth scroll for H2 links
  navH2Links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.getElementById(this.getAttribute('href').substring(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ScrollSpy logic
  window.addEventListener('scroll', () => {
    let currentSectionId = null;
    let currentBlockId = null;
    let minDistance = Infinity;
    const offset = 320; // Adjust for your header height

blocks.forEach(block => {
  const rect = block.getBoundingClientRect();
  const distance = Math.abs(rect.top - offset);
  if (rect.top - offset <= 0 && distance < minDistance) {
    minDistance = distance;
    currentBlockId = block.id;
  }
});

    // Expand only the current section in nav
    navSections.forEach(section => {
      const btn = section.querySelector('.nav-h1');
      if (btn.dataset.target === currentSectionId) {
        section.classList.add('open');
        btn.classList.add('active');
      } else {
        section.classList.remove('open');
        btn.classList.remove('active');
      }
    });

    // Highlight current H2 link
    navH2Links.forEach(link => {
      if (link.getAttribute('href').substring(1) === currentBlockId) {
        link.classList.add('active');
        // Ensure parent section is open
        link.closest('.nav-section').classList.add('open');
      } else {
        link.classList.remove('active');
      }
    });
  });

  // Optional: Expand the first section by default
  if (navSections.length) navSections[0].classList.add('open');


const videos = document.querySelectorAll('video');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const video = entry.target;
    video.playbackRate = 1.15;
    // Only control playback if the video is muted (autoplay policy)
    video.muted = true;
    if (entry.isIntersecting) {
      video.play();
    } else {
      video.pause();
    }
  });
}, {
  threshold: 0.5 // Adjust: 0.5 means 50% of the video must be visible to play
});

// Observe each video
videos.forEach(video => observer.observe(video));


//--- Finhealth benchmark auto-opening

const wraps = document.querySelectorAll('.finhealth-screens__wrap');
let currentIndex = 0;
let autoOpenInterval = null;
let hoverActive = false;

// Function to open a benchmark by adding 'hover' class
function openBenchmark(index) {
  wraps.forEach((wrap, i) => {
    if (i === index) {
      wrap.classList.add('hover');
    } else {
      wrap.classList.remove('hover');
    }
  });
}

// Start auto-opening benchmarks in sequence
function startAutoOpen() {
  if (autoOpenInterval) return; // Prevent multiple intervals
  autoOpenInterval = setInterval(() => {
    if (!hoverActive) {
      openBenchmark(currentIndex);
      currentIndex = (currentIndex + 1) % wraps.length;
    }
  }, 2000); // Adjust delay as needed (ms)
}

// Stop auto-opening
function stopAutoOpen() {
  clearInterval(autoOpenInterval);
  autoOpenInterval = null;
}

// Add event listeners for hover
wraps.forEach((wrap, i) => {
  wrap.addEventListener('mouseenter', () => {
    hoverActive = true;
    stopAutoOpen();
    wraps.forEach(w => w.classList.remove('hover'));
    wrap.classList.add('hover');
  });
  wrap.addEventListener('mouseleave', () => {
    hoverActive = false;
    wrap.classList.remove('hover');
    startAutoOpen();
  });
});

// Initialise
openBenchmark(0);
startAutoOpen();

//SVG Switcher
const svgContainers = document.querySelectorAll('.svg-switcher');

svgContainers.forEach(container => {
  const img = container.querySelector('img');
  // Collect all data-src attributes dynamically
  const svgLinks = [];
  let i = 1;
  while (img.getAttribute(`data-src${i}`)) {
    svgLinks.push(img.getAttribute(`data-src${i}`));
    i++;
  }
  let currentIndex = 0;

  function switchSVG() {
    img.style.opacity = 0;
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % svgLinks.length;
      img.src = svgLinks[currentIndex];
      img.style.opacity = 1;
    }, 150); // Duration matches the CSS transition
  }

  // Initial display
  img.src = svgLinks[0];

  // Start the loop
  setInterval(switchSVG, 2500);
});

/*Show Sandbox iframe when scrolling to it*/
$(window).on('scroll load resize', function() {
  var 
  $frameWrap = $('#sandbox-frame-wrap'),
  $frame = $('#sandbox-frame');
  //if ($frame.is(':visible')) return; // Already shown

  var winTop = $(window).scrollTop();
  var winBottom = winTop + $(window).height();
  var elTop = $frameWrap.offset().top;

  /*
  if (elTop < winBottom) {
    $frame.show(); // Or .show() for instant
  }*/
});



});




