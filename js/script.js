
$(document).ready(function() {

  //viewportHeight = $(window).innerHeight();
  $('.stage').css('min-height', $(window).innerHeight());

  $('.article_preview_button').click(function() {
    $(this).toggleClass('fa-times').toggleClass('fa-chevron-left');
    $('.article_preview').toggleClass('article_preview_open');
  });

  function getQueryVariable(variable) {
    var query = unescape(window.location.search.substring(1));
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] == variable){return pair[1];}
  }
  return(false);
  };

  function setBaseSize() {
    if (getQueryVariable('size') === false) {
      baseSize = 1.25;
      $('.base_size').val(20);
    }
    else {
      baseSize = getQueryVariable('size') / 16;
      $('.base_size').val(getQueryVariable('size'));
      $('.article_container').css('font-size', Math.round(baseSize*1000)/1000 + 'em');
      $('.param_size').text(getQueryVariable('size'));
    };
    $('.base_em').text(Math.round(baseSize*1000)/1000);
  };
  setBaseSize();

  function setScale() {
    if (getQueryVariable('scale') === false) {
      scaleRatio = 1.414;
    }
    else {
      scaleRatio = getQueryVariable('scale');
      $('.font_scale').val(getQueryVariable('scale'));
      $('.param_scale').text(getQueryVariable('scale'));
    };
    scaleCalc();
  };
  setScale();

  function setPreviewText() {
    if (getQueryVariable('text') !== false) {
      $('.preview_text').val(getQueryVariable('text'));
      $('.scale_preview_text').text(getQueryVariable('text'));
      $('.param_text').text(getQueryVariable('text'));
    };
  };
  setPreviewText();

  function setTag() {
    if (getQueryVariable('webfont') !== false) {
      $('.web_font').val(getQueryVariable('webfont'));
      $('.webfont_url').attr('href', 'http://fonts.googleapis.com/css?family=' + getQueryVariable('webfont'));
      $('.param_font').text(getQueryVariable('webfont'));
    };
  };
  setTag();

  function setCss() {
    if (getQueryVariable('font-family') !== false) {
      $('.web_font_name').val(getQueryVariable('font-family'));
      $('.scale_webfont, .article_content').attr('style', "font-family:" + getQueryVariable('font-family'));
      $('.param_css').text(getQueryVariable('font-family'));
    };
  };
  setCss();

  $('.input_select_all').click(function () {
    $(this).select();
  });

  $('.base_size').bind("change paste keyup", function() {
    if($.isNumeric($(this).val())){
      baseSize = $(this).val() / 16;
    }
    else {
      baseSize = 0;
    };
    $('.base_em').text(Math.round(baseSize*1000)/1000);
    $('.param_size').text($(this).val());
    $('.article_container').css('font-size', Math.round(baseSize*1000)/1000 + 'em');
    scaleSelect();
  });

  $('.font_scale').bind("change paste keyup", function() {
    scaleSelect();
    $('.param_scale').text($(this).val());
  });

  $('.preview_text').bind("change paste keyup", function() {
    previewText = $(this).val();
    $('.scale_preview_text').text(previewText);
    $('.param_text').text($(this).val());
  });

  $('.web_font').bind("change paste keyup", function() {
    $('.webfont_url').attr('href', 'http://fonts.googleapis.com/css?family=' + $(this).val());
    $('.param_font').text($(this).val());
  });

  $('.web_font_name').bind("change paste keyup", function() {
    webFontName = $(this).val();
    $('.scale_webfont, .article_content').attr('style', "font-family:" + webFontName);
    $('.param_css').text($(this).val());
  });

  function scaleSelect() {
    scaleRatio = $('.font_scale').val();
    scaleCalc();
  };

  function scaleCalc() {

    function scaleHigh() {
      a = baseSize;
      b = scaleRatio;
      result = baseSize;

      $($('.scale_high').get().reverse()).each(function(index) {
        $(this).css('font-size', Math.round(result*1000)/1000 + 'em');
        result = a*b;
        a = result;
      });
    };

    function scaleHighLabel() {
      a = 1;
      b = scaleRatio;
      result = 1;

      $($('.scale_high_label').get().reverse()).each(function(index) {
        $(this).text(Math.round(result*1000)/1000 + 'em');
        result = a*b;
        a = result;
      });
    };

    function articleHeader() {
      a = 1;
      b = scaleRatio;
      result = 1;

      $($('.article_header').get().reverse()).each(function(index) {
        result = a*b;
        a = result;
        $(this).css('font-size', Math.round(result*1000)/1000 + 'em');
      });
    };

    function scaleLow() {
      a = baseSize;
      b = scaleRatio;
      result = baseSize;

      $('.scale_low').each(function(index) {
        result = a/b;
        a = result;
        $(this).css('font-size', Math.round(result*1000)/1000 + 'em');
      });
    };

    function scaleLowLabel() {
      a = 1;
      b = scaleRatio;
      result = 1;

      $('.scale_low_label').each(function(index) {
        result = a/b;
        a = result;
        $(this).text(Math.round(result*1000)/1000 + 'em');
      });
    };

    scaleHigh();
    scaleHighLabel();
    articleHeader();
    scaleLow();
    scaleLowLabel();

    $('body').delay(650).queue(function(next) {
      $(this).css('min-height', $('.article_preview_inner').outerHeight());
      next();
    });
  };

  $('.param_url').hover(function() {
    $(this).attr('href', $(this).text())
  });

});
