(function () {
  var s = document.createElement('script'),
    e = !document.body ? document.querySelector('head') : document.body;
  s.src = 'https://acsbapp.com/apps/app/dist/js/app.js';
  s.async = true;
  s.onload = function () {
    acsbJS.init({
      statementLink: '',
      footerHtml: '',
      hideMobile: false,
      hideTrigger: false,
      language: 'en',
      position: 'left',
      leadColor: '#146ff8',
      triggerColor: '#2c6fdd',
      triggerRadius: '50%',
      triggerPositionX: 'left',
      triggerPositionY: 'bottom',
      triggerIcon: 'settings2',
      triggerSize: 'medium',
      triggerOffsetX: 20,
      triggerOffsetY: 20,
      mobile: {
        triggerSize: 'small',
        triggerPositionX: 'left',
        triggerPositionY: 'bottom',
        triggerOffsetX: 10,
        triggerOffsetY: 10,
        triggerRadius: '50%'
      }
    });
  };
  e.appendChild(s);
}());
