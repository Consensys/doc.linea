function getPropValue(element, name) {
  return getComputedStyle(element).getPropertyValue(name).trim()
}

function getTheme(element) {
  return {
    sidebar: {
      backgroundColor: getPropValue(element, '--dt-api-nav-bg-color'),
      textColor: getPropValue(element, '--md-default-fg-color'),
    }
  }
}

function redocInitDone(param) {
  $(".redoc-container[fullscreen='false'] a[href='https://redocly.com/redoc/']").parent().css(
      {'position': 'absolute', 'bottom': '0'});
}

function isAPIFullScreen(redocContainer) {
  const fullScreen = redocContainer.attr('fullscreen')
  return typeof fullScreen !== "undefined" ? fullScreen === 'true'
      : true
}

$(function () {
  $(".redoc-container").each(function (index) {
    Redoc.init(
        $(this).attr('spec-url'),
        {
          scrollYOffset: $('header').height(),
          nativeScrollbars: !isAPIFullScreen($(this)),
          theme: getTheme(document.body)
        },
        $(this)[0],
        redocInitDone
    )
  });

});

const element = document.querySelector('body');
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === "attributes") {

      $(".redoc-container").each(function (index) {
        Redoc.init(
            $(this).attr('spec-url'),
            {
              scrollYOffset: $('header').height(),
              nativeScrollbars: !isAPIFullScreen($(this)),
              theme: getTheme(mutation.target)
            },
            $(this)[0],
            redocInitDone
        )
      });
    }
  });
});

observer.observe(element, {
  attributeFilter: ['data-md-color-scheme'],
  attributes: true //configure it to listen to attribute changes
});
