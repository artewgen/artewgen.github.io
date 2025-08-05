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
  setInterval(nextSlide, 3500);
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
var $iframe = $('#sandbox-frame-wrap');
var iframeShown = false;

var observer = new window.IntersectionObserver(function(entries, obs) {
    entries.forEach(function(entry) {
        if (!iframeShown && entry.isIntersecting) {
            $('#sandbox-frame').show();   // Show the iframe
            iframeShown = true;
            obs.unobserve(entry.target); // Stop observing to improve performance
        }
    });
}, {
    threshold: 0.2 // 20% of the iframe must be visible
});

observer.observe($iframe[0]);




//Start auto-playing videos after scroll to
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
      var video = entry.target;
      // Playback speed
      video.playbackRate = 1.15;
      // Mute video to ensure autoplay is allowed
      video.muted = true;
      if (entry.isIntersecting) {
          $(video).trigger('play');
      } else {
          $(video).trigger('pause');
      }
  });
}, {
  threshold: 0.5 // 50% visible
});

// jQuery: select only videos with the class play-after-scrollto
$('video.play-after-scrollto').each(function() {
  observer.observe(this);
});

 // Start auto-playing videos of widget concept in sequence
var widgetVideo1 = $('#widget-concept-1')[0];
var widgetVideo2 = $('#widget-concept-2')[0];
var widgetVideo3 = $('#widget-concept-3')[0];

var sequenceStarted = false;

// Set up Intersection Observer to watch the first video
var observer = new window.IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting && !sequenceStarted) {
            sequenceStarted = true;
            playVideoSequence();
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% visible

observer.observe(widgetVideo1);


function playVideoSequence() {
    // Play first video
    widgetVideo1.currentTime = 0;
    widgetVideo2.currentTime = 0;
    widgetVideo3.currentTime = 0;
    
    widgetVideo1.play();
    setTimeout(function() {
        widgetVideo1.pause();
        // Play second video immediately
        widgetVideo2.currentTime = 0;
        $(widgetVideo2).removeClass('transparent');
        widgetVideo2.play();
        setTimeout(function() {
            widgetVideo2.pause();
            // Play third video immediately
            widgetVideo3.currentTime = 0;
            $(widgetVideo3).removeClass('transparent');
            widgetVideo3.play();
            setTimeout(function() {
                widgetVideo3.pause();
                // Immediately restart the loop from first video
                playVideoSequence();
            }, 8500); // Play video 3 for 7 seconds + 1.5 sec delay
        }, 6000); // Play video 2 for 6 seconds
    }, 9000); // Play video 1 for 9 seconds
    $(widgetVideo2).addClass('transparent');
    $(widgetVideo3).addClass('transparent');
    
}

playVideoSequence();


//Random facts

});




