$(function() {

    // --------- Mobile navigation --------- 
  $('#menu-mobile-switcher').on('click', function(){
    $('#header-nav').toggleClass('open');
  });




  // --------- Main page pet slides --------- 

function petSlider(){
var $sliderBlock = $('.intro__pet');

if ($sliderBlock.length) {
    var slides = [
        { text: 'and 2+ years with' },
        { text: 'and 3+ years with' },
        { text: 'and 4+ years with' },
        { text: 'and 5+ years with' }
    ];
    
    var current = 0;
    var $txt = $('.intro__pet__text');

    function showSlide(index) {
        $txt.text(slides[index].text);
    }

    function nextSlide() {
        showSlide(current);
        setTimeout(function() {
            $sliderBlock.removeClass('pet-' + current);
            current = (current + 1) % slides.length;
            $sliderBlock.addClass('pet-' + current);
            showSlide(current);
        }, 400);
    }

    showSlide(current);
    setInterval(nextSlide, 1500);
    }
}


// ----------- Pet Slider Parallax ----------
var $intro = $('#intro');
var $pet = $('#intro-pet');

if ($intro.length && $pet.length) {
  var petWidth = $pet.outerWidth();
  var petHeight = $pet.outerHeight();
  var sliderAppear = false;

  $(window).on('scroll', function() {
    if (!sliderAppear){
        var introOffset = $intro.offset().top;
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        var introHeight = $intro.outerHeight();
    
        // introTopInView: distance from intro top to viewport top
        var introTopInView = introOffset - scrollTop;
        var introBottomInView = introTopInView + introHeight;
    
        // Define entry and exit scroll points
        var entryPoint = windowHeight * 0.1;
        var exitPoint = -(introHeight - petHeight);
    
        // Calculate progress for the animation
        var progress = 1;
        if (introTopInView < entryPoint && introTopInView > exitPoint) {
          var total = entryPoint - exitPoint;
          progress = (introTopInView - exitPoint) / total;
          progress = Math.max(0, Math.min(1, progress));
        } else if (introTopInView <= exitPoint) {
          progress = 0;
        }
    
        // Animate the right property (from -petWidth to 16px)
        var finalRight = 16;
        var right = -petWidth + progress * (petWidth + finalRight);
        $pet.css('right', right + 'px');
        petSlider();
        sliderAppear = true;
    }
   
  });
}




  // --------- Random facts --------- 
var $factText = $('#fact-text');
var $refreshFact = $('#refresh-fact');

if ($factText.length && $refreshFact.length) {
    var facts = [
        "Fact 1: I love hiking.",
        "Fact 2: Passionate about mentoring, supporting over 25 designers through Women in Tech and ADPList via various long and short term sessions.",
        "Fact 3: Continuously invest in learning, recently completing advanced courses in data-driven product management and smart interface design patterns.",
        "Fact 4: Began my IT career as a front-end developer, skilled in HTML, CSS, and JavaScript. I built this site myself completely from scratch, without any platforms.",
        "Fact 5: With attention to detail and interaction, this site is packed with 15 interactive moments for a richer journey",
        "Fact 6: This portfolio website is fully optimised for mobile devices—smooth browsing everywhere",
        "Fact 7: I've travelled to 15 countries.",
        "Fact 8: I enjoy cooking Italian food.",
        "Fact 9: I play the guitar.",
        "Fact 10: I'm a morning person.",
        "Fact 11: I practise meditation daily.",
        "Fact 12: My favourite colour is blue.",
        "Fact 13: I run marathons.",
        "Fact 14: I'm a film buff.",
        "Fact 15: I collect vintage cameras.",
        "Fact 16: I love painting.",
        "Fact 17: I'm learning to code in Python.",
        "Fact 18: I enjoy birdwatching.",
        "Fact 19: I have a small garden.",
        "Fact 20: I write short stories."
    ];

    function refreshFact() {
        var randomIndex = Math.floor(Math.random() * facts.length);
        $factText.text(facts[randomIndex]);
    }

    $refreshFact.on('click', function() {
        refreshFact();
    });

    // Show a random fact on initial load
    refreshFact();
}


 



// --------- Sticky Case Study Navigation --------- 

var $nav = $('#case-study-nav');
var $start = $('#start-scroll-nav');
var $end = $('#end-scroll-nav');
var $navSections = $('.nav-section');
var $navH1s = $('.nav-h1');
var $navH2Links = $('.nav-h2');
var $blocks = $('.case-study__block');

// Exit early if anything essential is missing
if (
    $nav.length &&
    $start.length &&
    $end.length &&
    $navSections.length &&
    $navH1s.length &&
    $navH2Links.length &&
    $blocks.length
) {

    function handleStickyNav() {
        var startRect = $start[0].getBoundingClientRect();
        var endRect = $end[0].getBoundingClientRect();
        var navHeight = $nav.outerHeight();

        if (startRect.bottom > 0) {
            $nav.css({
                position: 'absolute',
                top: $start.offset().top + 'px',
                display: 'flex'
            });
        } else if (endRect.top < navHeight) {
            $nav.css({
                position: 'absolute',
                top: ($end.offset().top - navHeight) + 'px',
                display: 'flex'
            });
        } else {
            $nav.css({
                position: 'fixed',
                top: '2rem',
                display: 'flex'
            });
        }
    }

    $(window).on('scroll resize', handleStickyNav);
    handleStickyNav();

    // --- Accordion functionality ---
    $navH1s.on('click', function() {
        $navSections.removeClass('open');
        $(this).parent().addClass('open');
        $navH1s.removeClass('active');
        $(this).addClass('active');
    });

    // --- Smooth scroll with highlight and temporary disabling of scrollspy ---
    var scrollSpyDisabled = false;

    $navH2Links.on('click', function(e) {
        e.preventDefault();
        var targetId = $(this).attr('href').substring(1);
        var $target = $('#' + targetId);
        if ($target.length) {
            scrollSpyDisabled = true;

            // Highlight the clicked .nav-h2 and open its section
            $navH2Links.removeClass('active');
            $(this).addClass('active');
            $navSections.removeClass('open');
            $(this).closest('.nav-section').addClass('open');

            $target[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(function() {
                scrollSpyDisabled = false;
            }, 700); // Adjust this if your smooth scroll duration is different
        }
    });

    // --- Scrollspy logic, skipped when scrollSpyDisabled ---
    $(window).on('scroll', function() {
        if (scrollSpyDisabled) return;

        var currentSectionId = null;
        var currentBlockId = null;
        var minDistance = Infinity;
        var offset = 320;

        $blocks.each(function() {
            var rect = this.getBoundingClientRect();
            var distance = Math.abs(rect.top - offset);
            if (rect.top - offset <= 0 && distance < minDistance) {
                minDistance = distance;
                currentBlockId = this.id;
            }
        });

        // Expand only the current section in nav
        $navSections.each(function() {
            var $btn = $(this).find('.nav-h1').first();
            if ($btn.data('target') === currentSectionId) {
                $(this).addClass('open');
                $btn.addClass('active');
            } else {
                $(this).removeClass('open');
                $btn.removeClass('active');
            }
        });

        // Highlight current H2 link
        $navH2Links.each(function() {
            var $link = $(this);
            if ($link.attr('href').substring(1) === currentBlockId) {
                $link.addClass('active');
                $link.closest('.nav-section').addClass('open');
            } else {
                $link.removeClass('active');
            }
        });
    });

    // Expand the first section by default
    $navSections.first().addClass('open');
}


// --------- Sticky Case Study Navigation, for Short Nav --------- 


var $navShort = $('#case-study-nav-short');

if (
    $navShort.length && $start.length && $end.length && $navH2Links.length && $blocks.length
) {

    function handleStickyNav() {
        // Defensive: check for start/end existence each call
        if (!$start.length || !$end.length) return;

        var startRect = $start[0].getBoundingClientRect();
        var endRect = $end[0].getBoundingClientRect();
        var navHeight = $navShort.outerHeight();

        if (startRect.bottom > 0) {
            // Before start marker: nav in absolute position at top
            $navShort.css({
                position: 'absolute',
                top: $start.offset().top + 'px',
                display: 'flex'
            });
        } else if (endRect.top < navHeight) {
            // After end marker: nav in absolute position at bottom
            $navShort.css({
                position: 'absolute',
                top: ($end.offset().top - navHeight) + 'px',
                display: 'flex'
            });
        } else {
            // Between start & end: nav is fixed at the top
            $navShort.css({
                position: 'fixed',
                top: '2rem',
                display: 'flex'
            });
        }
    }

    $(window).on('scroll resize', handleStickyNav);
    handleStickyNav();

    // --- Smooth scroll + active highlight ---
    var scrollSpyDisabled = false;
    $navH2Links.on('click', function(e) {
        var targetId = $(this).attr('href');
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            var $target = $(targetId);
            if ($target.length) {
                scrollSpyDisabled = true;

                $navH2Links.removeClass('active');
                $(this).addClass('active');

                // Native scrollIntoView for smooth scroll
                $target[0].scrollIntoView({ behavior: 'smooth', block: 'start' });

                setTimeout(function() {
                    scrollSpyDisabled = false;
                }, 700);
            }
        }
    });

    // --- Scrollspy for active state ---
    $(window).on('scroll', function() {
        if (scrollSpyDisabled) return;

        var currentBlockId = null;
        var minDistance = Infinity;
        var offset = 320;

        $($blocks).each(function() {
            if (!this) return; // Defensive: skip if not found
            var rect = this.getBoundingClientRect();
            var distance = Math.abs(rect.top - offset);
            if (rect.top - offset <= 0 && distance < minDistance) {
                minDistance = distance;
                currentBlockId = this.id;
            }
        });

        if (!currentBlockId) return;

        $navH2Links.each(function() {
            var $link = $(this);
            if ($link.attr('href').substring(1) === currentBlockId) {
                $link.addClass('active');
            } else {
                $link.removeClass('active');
            }
        });
    });
} else {
    // Optional: fallback if no markers, just fix nav at top (no errors)
    if ($navShort.length && $navH2Links.length && $blocks.length) {
        $navShort.css({
            position: 'fixed',
            top: '2rem',
            display: 'flex'
        });
    }
}






// --------- Finhealth benchmark auto-opening --------- 

var $wraps = $('.finhealth-screens__wrap');
var currentIndex = 0;
var autoOpenInterval = null;
var hoverActive = false;

if ($wraps.length) {
    // Function to open a benchmark by adding 'hover' class
    function openBenchmark(index) {
        $wraps.each(function(i) {
            if (i === index) {
                $(this).addClass('hover');
            } else {
                $(this).removeClass('hover');
            }
        });
    }

    // Start auto-opening benchmarks in sequence
    function startAutoOpen() {
        if (autoOpenInterval) return; // Prevent multiple intervals
        autoOpenInterval = setInterval(function() {
            if (!hoverActive) {
                openBenchmark(currentIndex);
                currentIndex = (currentIndex + 1) % $wraps.length;
            }
        }, 2000); // Adjust delay as needed (ms)
    }

    // Stop auto-opening
    function stopAutoOpen() {
        clearInterval(autoOpenInterval);
        autoOpenInterval = null;
    }

    // Add event listeners for hover
    $wraps.on('mouseenter', function() {
        hoverActive = true;
        stopAutoOpen();
        $wraps.removeClass('hover');
        $(this).addClass('hover');
    });

    $wraps.on('mouseleave', function() {
        hoverActive = false;
        $(this).removeClass('hover');
        startAutoOpen();
    });

    // Initialise
    openBenchmark(0);
    startAutoOpen();
}

// --------- YooMoney Widget Slider Before After --------- 
var $beforeAfterWrap = $('.before-after-wrap');
if ($beforeAfterWrap.length) {
    var $afterImgWrap = $beforeAfterWrap.find('.img-wrap.is-after');
    var $dragger = $beforeAfterWrap.find('.dragger');

    Draggable.create($dragger[0], {
        type: "x",
        bounds: $beforeAfterWrap[0],
        onDrag: function () {
            var x = $beforeAfterWrap.outerWidth() / 2 - gsap.getProperty(this.target, "x");
            $afterImgWrap.css('clip-path', 'inset(0px ' + x + 'px 0px 0px)');
        }
    });
}


// --------- SVG Switcher --------- 
var $svgContainers = $('.svg-switcher');

if ($svgContainers.length) {
  $svgContainers.each(function() {
    var $container = $(this);
    var $img = $container.find('img').first();

    // Collect all data-src attributes dynamically
    var svgLinks = [];
    var i = 1;
    while ($img.attr('data-src' + i)) {
      svgLinks.push($img.attr('data-src' + i));
      i++;
    }

    if (svgLinks.length === 0) return; // No SVGs? Skip this container

    var currentIndex = 0;

    function switchSVG() {
      $img.css('opacity', 0);
      setTimeout(function() {
        currentIndex = (currentIndex + 1) % svgLinks.length;
        $img.attr('src', svgLinks[currentIndex]);
        $img.css('opacity', 1);
      }, 150); // Duration matches the CSS transition
    }

    // Initial display
    $img.attr('src', svgLinks[0]);

    // Start cycling
    setInterval(switchSVG, 2500);
  });
}





// --- Show Sandbox iframe when scrolling to it ---
var $iframeWrap = $('#sandbox-frame-wrap');
var iframeShown = false;

if ($iframeWrap.length) {
    var observer = new window.IntersectionObserver(function(entries, obs) {
        entries.forEach(function(entry) {
            if (!iframeShown && entry.isIntersecting) {
                $('#sandbox-frame').show();   // Show the iframe inside the wrapper
                iframeShown = true;
                obs.unobserve(entry.target); // Stop further observing
            }
        });
    }, {
        threshold: 0.2 // 20% of the wrapper must be visible
    });

    observer.observe($iframeWrap[0]);
}




// --- Auto-play videos on scroll to ---
var $scrollToVideos = $('video.play-after-scrollto');
if ($scrollToVideos.length) {
    var scrollToObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            var video = entry.target;
            video.playbackRate = 1.15;
            video.muted = true;
            if (entry.isIntersecting) {
                $(video).trigger('play');
            } else {
                $(video).trigger('pause');
            }
        });
    }, { threshold: 0.5 });

    $scrollToVideos.each(function() {
        scrollToObserver.observe(this);
    });
}

// --- Widget concept sequential auto-play logic ---
var $widgetVideo1 = $('#widget-concept-1');
var $widgetVideo2 = $('#widget-concept-2');
var $widgetVideo3 = $('#widget-concept-3');

// Only run sequence logic if all required videos are present
if ($widgetVideo1.length && $widgetVideo2.length && $widgetVideo3.length) {
    var widgetVideo1 = $widgetVideo1[0];
    var widgetVideo2 = $widgetVideo2[0];
    var widgetVideo3 = $widgetVideo3[0];
    var widgetSequenceStarted = false;

    function playWidgetVideoSequence() {
        widgetVideo1.currentTime = 0;
        widgetVideo2.currentTime = 0;
        widgetVideo3.currentTime = 0;

        $widgetVideo2.addClass('transparent');
        $widgetVideo3.addClass('transparent');

        widgetVideo1.play();
        setTimeout(function() {
            widgetVideo1.pause();
            widgetVideo2.currentTime = 0;
            $widgetVideo2.removeClass('transparent');
            widgetVideo2.play();
            setTimeout(function() {
                widgetVideo2.pause();
                widgetVideo3.currentTime = 0;
                $widgetVideo3.removeClass('transparent');
                widgetVideo3.play();
                setTimeout(function() {
                    widgetVideo3.pause();
                    playWidgetVideoSequence();
                }, 8500); // Video 3: 7s play + 1.5s
            }, 6000); // Video 2: 6s
        }, 9000); // Video 1: 9s
    }

    // Observe only once per session to avoid overlapping triggers
    var widgetObserver = new window.IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !widgetSequenceStarted) {
                widgetSequenceStarted = true;
                playWidgetVideoSequence();
                observer.unobserve(widgetVideo1); // no unnecessary observers left behind
            }
        });
    }, { threshold: 0.5 });

    widgetObserver.observe(widgetVideo1);
}



});




