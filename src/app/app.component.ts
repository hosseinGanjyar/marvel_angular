import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import tippy from 'tippy.js';


declare var $: any;
declare var particlesJS: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  //theme
  currentTheme: string = 'light';
  lightColor = '328A7A';
  darkColor = 'FFFFFF';
  aboutMe: any = {
    'titlestart': '',
    'subTitle1': '',
    'subTitle2': '',
    'subTitle3': '',
    'titleend': '',
    'description': '',
    'icon': '',
    'instagram': '',
    'twitter': '',
    'github': '',
  }

  config: any;
  fullpage_api: any;
  employeeList: any[] = []
  loading: any = {
    'aboutme': false,
    'employee': false
  }
  services: any[] = []
  products: any[] = []
  roadMap: any[] = []
  currectService = 0;
  currectProduct = 0;
  eventsMinDistance: any = 60
  menuItems = [
    {
      "href": "#about",
      "target": "_self",
      "title": "از خودم",
      "active": true
    },
    {
      "href": "#services",
      "target": "_self",
      "title": "سرویس هام",
      "active": false
    },
    {
      "href": "#products",
      "target": "_self",
      "title": "محصولاتم",
      "active": false
    },
    {
      "href": "#ourteam",
      "target": "_self",
      "title": "دوستام",
      "active": false
    }
  ]
  tippyInstance: any;


  constructor(private http: HttpClient) {
    // fullpage options
    this.config = {
      licenseKey: 'YOUR LICENSE KEY HERE',
      anchors: ['about', 'services', 'products', 'ourteam'],
      menu: '#menu',
      afterLoad: (origin, destination, direction) => {
        this.activeMenuItem(destination.index)
      }
    };

    // about me
    this.loading['aboutme'] = true
    this.http.get('../assets/data/aboutMe.json').subscribe(
      (data: any) => {
        this.aboutMe = data
        // this.aboutMe['title'] = data['title']
        // this.aboutMe['description'] = data['description']
        // this.aboutMe['subTitle1'] = data['subTitle1']
        // this.aboutMe['subTitle2'] = data['subTitle2']
        // this.aboutMe['subTitle3'] = data['subTitle3']
        // this.aboutMe['icon'] = data['icon']
        // this.aboutMe['twitter'] = data['twitter']
        // this.aboutMe['instagram'] = data['instagram']
        // this.aboutMe['github'] = data['github']
        // this.aboutMe['subTitle1'] = data['subTitle1']
        // this.aboutMe['subTitle2'] = data['subTitle2']
        // this.aboutMe['subTitle3'] = data['subTitle3']
        this.loading['aboutme'] = false
      })

    this.loading['employee'] = true
    this.http.get('../assets/data/Employee.json').subscribe(
      (data: any) => {
        data.forEach((item) => {
          this.employeeList.push(item)
        });
        this.loading['employee'] = false

        setTimeout(() => {
          var $carousel = $('.carouselx').flickity({
            wrapAround: true,
            initialIndex: 2
          })
          // $carousel.flickity('reloadCells').
        }, 1000);
      })
  }

  async ngOnInit() {
    var _this = this;
    // particlesJS.load('particles-js', 'assets/data/particles.json', null);
    // this.toggleTheme()
    this.currentTheme = localStorage.getItem('currentTheme')
    this.setTheme()

    $('.color-mode').click(function () {
      _this.toggleTheme()
    })

    // services
    try {
      this.services = await this.getServices()
    } catch (error) {
      console.error('خطایی برای دریافت داده پیش آمده، مجدد تلاش کنید')
    }

    // products
    try {
      this.products = await this.getProducts()
      this.activeRoadmap(this.currectProduct)
    } catch (error) {
      console.error('خطایی برای دریافت داده پیش آمده، مجدد تلاش کنید')
    }
  }

  getServices(): any {
    return new Promise((resolve, reject) => {
      this.http.get('./assets/data/services.json').subscribe(
        (data: any) => {
          resolve(data)
        },
        (error: any) => {
          reject()
        },
      )
    })
  }

  getProducts(): any {
    return new Promise((resolve, reject) => {
      this.http.get('./assets/data/roadmap.json').subscribe(
        (data: any) => {
          resolve(data)
        },
        (error: any) => {
          reject()
        },
      )
    })
  }



  getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
  }

  toggleTheme() {
    $('body').toggleClass('dark-mode')
    $('.color-mode-icon').toggleClass('active')

    if (this.currentTheme == 'light') {
      particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: this.darkColor },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
            image: { src: "img/github.svg", width: 100, height: 100 }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: this.darkColor,
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: false, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
          }
        },
        retina_detect: true
      });
      this.currentTheme = 'dark'
    } else {
      particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: this.lightColor },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
            image: { src: "img/github.svg", width: 100, height: 100 }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: this.lightColor,
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: false, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
          }
        },
        retina_detect: true
      });
      this.currentTheme = 'light'
    }

    this.saveTheme(this.currentTheme)
  }

  open(url) {
    window.open(url, "_blank");
  }

  roadmap() {
    var timelines,
      eventsMinDistance = this.eventsMinDistance;

    setTimeout(() => {
      timelines = $('.cd-horizontal-timeline');
      (timelines.length > 0) && initTimeline(timelines);

      // tooltip
      this.tippyInstance = tippy('.tooltip_desc', {
        animateFill: false,
        animation: 'shift-away',
        // trigger: 'click'
      })
    }, 0);


    function initTimeline(timelines) {
      timelines.each(function () {
        var timeline = $(this),
          timelineComponents = {};
        //cache timeline components 
        timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
        timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
        timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
        timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
        timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
        timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
        timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
        timelineComponents['eventsContent'] = timeline.children('.events-content');

        //assign a left postion to the single events along the timeline
        setDatePosition(timelineComponents, eventsMinDistance);
        //assign a width to the timeline
        var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
        //the timeline has been initialize - show it
        timeline.addClass('loaded');

        //detect click on the next arrow
        timelineComponents['timelineNavigation'].on('click', '.next', function (event) {
          event.preventDefault();
          updateSlide(timelineComponents, timelineTotWidth, 'next');
        });
        //detect click on the prev arrow
        timelineComponents['timelineNavigation'].on('click', '.prev', function (event) {
          event.preventDefault();
          updateSlide(timelineComponents, timelineTotWidth, 'prev');
        });
        //detect click on the a single event - show new event content
        timelineComponents['eventsWrapper'].on('click', 'a', function (event) {
          event.preventDefault();
          timelineComponents['timelineEvents'].removeClass('selected');
          $(this).addClass('selected');
          updateOlderEvents($(this));
          updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
          updateVisibleContent($(this), timelineComponents['eventsContent']);
        });

        //on swipe, show next/prev event content
        timelineComponents['eventsContent'].on('swipeleft', function () {
          var mq = checkMQ();
          (mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'next');
        });
        timelineComponents['eventsContent'].on('swiperight', function () {
          var mq = checkMQ();
          (mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'prev');
        });

        //keyboard navigation
        $(document).keyup(function (event) {
          if (event.which == '37' && elementInViewport(timeline.get(0))) {
            showNewContent(timelineComponents, timelineTotWidth, 'prev');
          } else if (event.which == '39' && elementInViewport(timeline.get(0))) {
            showNewContent(timelineComponents, timelineTotWidth, 'next');
          }
        });
      });
    }

    function updateSlide(timelineComponents, timelineTotWidth, string) {
      //retrieve translateX value of timelineComponents['eventsWrapper']
      var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
        wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
      //translate the timeline to the left('next')/right('prev') 
      (string == 'next')
        ? translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth)
        : translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance, undefined);
    }

    function showNewContent(timelineComponents, timelineTotWidth, string) {
      //go from one event to the next/previous one
      var visibleContent = timelineComponents['eventsContent'].find('.selected'),
        newContent = (string == 'next') ? visibleContent.next() : visibleContent.prev();

      if (newContent.length > 0) { //if there's a next/prev event - show it
        var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
          newEvent = (string == 'next') ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');

        updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
        updateVisibleContent(newEvent, timelineComponents['eventsContent']);
        newEvent.addClass('selected');
        selectedDate.removeClass('selected');
        updateOlderEvents(newEvent);
        updateTimelinePosition(string, newEvent, timelineComponents, timelineTotWidth);
      }
    }

    function updateTimelinePosition(string, event, timelineComponents, timelineTotWidth: any) {
      //translate timeline to the left/right according to the position of the selected event
      var eventStyle = window.getComputedStyle(event.get(0), null),
        eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
        timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
        timelineTotWidth: any = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
      var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

      if ((string == 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < - timelineTranslate)) {
        translateTimeline(timelineComponents, - eventLeft + timelineWidth / 2, timelineWidth - timelineTotWidth);
      }
    }

    function translateTimeline(timelineComponents, value, totWidth) {
      var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
      value = (value > 0) ? 0 : value; //only negative translate value
      value = (!(typeof totWidth === 'undefined') && value < totWidth) ? totWidth : value; //do not translate more than timeline width
      setTransformValue(eventsWrapper, 'translateX', value + 'px');
      //update navigation arrows visibility
      (value == 0) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
      (value == totWidth) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
    }

    function updateFilling(selectedEvent, filling, totWidth) {
      //change .filling-line length according to the selected event
      var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
        eventLeft: any = eventStyle.getPropertyValue("left"),
        eventWidth = eventStyle.getPropertyValue("width");
      eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', '')) / 2;
      var scaleValue = eventLeft / totWidth;
      setTransformValue(filling.get(0), 'scaleX', scaleValue);
    }

    function setDatePosition(timelineComponents, min) {
      for (let i = 0; i < timelineComponents['timelineDates'].length; i++) {
        var distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]),
          distanceNorm = Math.round(distance / timelineComponents['eventsMinLapse']) + 2;
        timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm * min + 'px');
      }
    }

    function setTimelineWidth(timelineComponents, width) {
      var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length - 1]),
        timeSpanNorm = timeSpan / timelineComponents['eventsMinLapse'],
        timeSpanNorm = Math.round(timeSpanNorm) + 4,
        totalWidth = timeSpanNorm * width;
      timelineComponents['eventsWrapper'].css('width', totalWidth + 'px');
      updateFilling(timelineComponents['timelineEvents'].eq(0), timelineComponents['fillingLine'], totalWidth);

      return totalWidth;
    }

    function updateVisibleContent(event, eventsContent) {
      var eventDate = event.data('date'),
        visibleContent = eventsContent.find('.selected'),
        selectedContent = eventsContent.find('[data-date="' + eventDate + '"]'),
        selectedContentHeight = selectedContent.height();

      if (selectedContent.index() > visibleContent.index()) {
        var classEnetering = 'selected enter-right',
          classLeaving = 'leave-left';
      } else {
        var classEnetering = 'selected enter-left',
          classLeaving = 'leave-right';
      }

      selectedContent.attr('class', classEnetering);
      visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
        visibleContent.removeClass('leave-right leave-left');
        selectedContent.removeClass('enter-left enter-right');
      });
      eventsContent.css('height', selectedContentHeight + 'px');
    }

    function updateOlderEvents(event) {
      event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
    }

    function getTranslateValue(timeline) {
      var timelineStyle = window.getComputedStyle(timeline.get(0), null),
        timelineTranslate: any = timelineStyle.getPropertyValue("-webkit-transform") ||
          timelineStyle.getPropertyValue("-moz-transform") ||
          timelineStyle.getPropertyValue("-ms-transform") ||
          timelineStyle.getPropertyValue("-o-transform") ||
          timelineStyle.getPropertyValue("transform");

      if (timelineTranslate.indexOf('(') >= 0) {
        var timelineTranslate = timelineTranslate.split('(')[1];
        timelineTranslate = timelineTranslate.split(')')[0];
        timelineTranslate = timelineTranslate.split(',');
        translateValue = timelineTranslate[4];
      } else {
        var translateValue = 0;
      }

      return Number(translateValue);
    }

    function setTransformValue(element, property, value) {
      element.style["-webkit-transform"] = property + "(" + value + ")";
      element.style["-moz-transform"] = property + "(" + value + ")";
      element.style["-ms-transform"] = property + "(" + value + ")";
      element.style["-o-transform"] = property + "(" + value + ")";
      element.style["transform"] = property + "(" + value + ")";
    }

    //based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
    function parseDate(events) {
      var dateArrays = [];
      events.each(function () {
        var dateComp = $(this).data('date').split('/'),
          newDate = new Date(dateComp[2], dateComp[1] - 1, dateComp[0]);
        dateArrays.push(newDate);
      });
      return dateArrays;
    }

    function parseDate2(events) {
      var dateArrays = [];
      events.each(function () {
        var singleDate = $(this),
          dateComp = singleDate.data('date').split('T');
        if (dateComp.length > 1) { //both DD/MM/YEAR and time are provided
          var dayComp = dateComp[0].split('/'),
            timeComp = dateComp[1].split(':');
        } else if (dateComp[0].indexOf(':') >= 0) { //only time is provide
          dayComp = ["2000", "0", "0"],
            timeComp = dateComp[0].split(':');
        } else { //only DD/MM/YEAR
          dayComp = dateComp[0].split('/'),
            timeComp = ["0", "0"];
        }
        var newDate = new Date(dayComp[2], dayComp[1] - 1, dayComp[0], timeComp[0], timeComp[1]);
        dateArrays.push(newDate);
      });
      return dateArrays;
    }

    function daydiff(first, second) {
      return Math.round((second - first));
    }

    function minLapse(dates) {
      //determine the minimum distance among events
      var dateDistances = [];
      for (let i = 1; i < dates.length; i++) {
        var distance = daydiff(dates[i - 1], dates[i]);
        dateDistances.push(distance);
      }
      return Math.min.apply(null, dateDistances);
    }

    /*
      How to tell if a DOM element is visible in the current viewport?
      http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
    */
    function elementInViewport(el) {
      var top = el.offsetTop;
      var left = el.offsetLeft;
      var width = el.offsetWidth;
      var height = el.offsetHeight;

      while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
      }

      return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
      );
    }

    function checkMQ() {
      //check if mobile or desktop device
      return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
    }
  }

  nextService() {
    $('.carousel.service').carousel('next')
    // check end of slide
    if (this.currectService == this.services.length - 1)
      this.currectService = 0
    else
      this.currectService++
  }

  prevService() {
    $('.carousel.service').carousel('prev')
    // check begin of slide
    if (this.currectService == 0)
      this.currectService = this.services.length - 1
    else
      this.currectService--
  }

  nextProduct() {
    $('.carousel.product').carousel('next')
    // check end of slide
    if (this.currectProduct == this.products.length - 1)
      this.currectProduct = 0
    else
      this.currectProduct++

    this.activeRoadmap(this.currectProduct)
  }

  prevProduct() {
    $('.carousel.product').carousel('prev')
    // check begin of slide
    if (this.currectProduct == 0)
      this.currectProduct = this.products.length - 1
    else
      this.currectProduct--

    this.activeRoadmap(this.currectProduct)
  }

  activeRoadmap(currectProduct: any) {
    this.roadMap = this.products[currectProduct]['roadMap']
    this.roadmap()
  }

  activeMenuItem(index) {
    if (index < 3) {
      this.menuItems.forEach(element => {
        element['active'] = false
      });
      this.menuItems[index]['active'] = true
    }
  }

  saveTheme(themeName: string) {
    localStorage.setItem('currentTheme', themeName)
  }

  setTheme() {
    if (this.currentTheme == 'dark') {
      $('body').toggleClass('dark-mode')
      $('.color-mode-icon').toggleClass('active')
      particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: this.darkColor },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
            image: { src: "img/github.svg", width: 100, height: 100 }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: this.darkColor,
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: false, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
          }
        },
        retina_detect: true
      });
    } else { // light theme
      particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: this.lightColor },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
            image: { src: "img/github.svg", width: 100, height: 100 }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: this.lightColor,
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: false, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
          }
        },
        retina_detect: true
      });
    }
  }


}

