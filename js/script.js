
$(document).ready(function() {

  //viewportHeight = $(window).innerHeight();
  $('.stage').css('min-height', $(window).innerHeight());

  $('.article_preview_button').click(function() {
    $(this).toggleClass('fa-times').toggleClass('fa-chevron-left');
    $('.article_preview').toggleClass('article_preview_open');
  });

  $('.expand_down').click(function(e) {
    e.preventDefault();
    $(this).children('.fa').toggleClass('fa-times').toggleClass('fa-chevron-down');
    if ($(this).hasClass('more_options_button')) {
      setPreviewHeight();
    };
  });

  $('.param_url').hover(function() {
    $(this).attr('href', $(this).text())
  });

  $('[data-toggle]').click(function(e){
    e.preventDefault();
    $($(this).data('toggle')).toggle();
  });

  // $('.input_select_all').click(function () {
  //   $(this).select();
  // });

  function getQueryVariable(variable) {
    var vars = window.location.search.substring(1).split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] == variable){return decodeURIComponent(pair[1]);}
  }
  return(false);
  };



  function setBaseSize() {
    if (getQueryVariable('size') === false) {
      baseSize = 1;
      $('.base_size').val(16);
      $('.css_font_size').text(1);
    }
    else {
      baseSize = getQueryVariable('size') / 16;
      $('.base_size').val(getQueryVariable('size'));
      $('.article_container').css('font-size', Math.round(baseSize*1000)/1000 + 'em');
      $('.param_size').text(getQueryVariable('size'));
      $('.css_font_size').text(Math.round(baseSize*1000)/1000);
    };
    $('.base_em').text(Math.round(baseSize*1000)/1000);
  };
  setBaseSize();

  $('.base_size').bind("change paste keyup", function() {
    if($.isNumeric($(this).val())){
      baseSize = $(this).val() / 16;
    }
    else {
      baseSize = 0;
    };
    $('.base_em').text(Math.round(baseSize*1000)/1000);
    scaleSelect();
    $('.param_size').text($(this).val());
    $('.article_container').css('font-size', Math.round(baseSize*1000)/1000 + 'em');
    $('.css_font_size').text(Math.round(baseSize*1000)/1000);
  });



  function setScale() {
    if (getQueryVariable('scale') === false) {
      scaleRatio = 1.414;
    }
    else {
      scaleRatio = getQueryVariable('scale');
      $('.font_scale').val(getQueryVariable('scale'));
      $('.font_scale_custom input').val(getQueryVariable('scale'));
      $('.param_scale').text(getQueryVariable('scale'));
    };
    scaleCalc();
  };
  setScale();

  $('.font_scale').bind("change paste keyup", function() {
    if ($(this).val() === 'custom') {
      $('.font_scale_custom').removeClass('hide');
      $('.font_scale_custom input')
        .val(scaleRatio)
        .focus()
        .select();
    }
    else {
      scaleSelect();
      $('.font_scale_custom').addClass('hide');
      $('.param_scale').text($(this).val());
    };
  });

  $('.font_scale_custom input').bind("change paste keyup", function() {
    scaleRatio = $(this).val();
    scaleCalc();
    $('.param_scale').text($(this).val());
  });

  function scaleSelect() {
    scaleRatio = $('.font_scale').val();
    scaleCalc();
  };



  function setPreviewText() {
    if (getQueryVariable('text') !== false) {
      $('.preview_text').val(getQueryVariable('text'));
      $('.scale_preview_text').text(getQueryVariable('text'));
      $('.param_text').text(getQueryVariable('text'));
    };
  };
  setPreviewText();

  $('.preview_text').bind("change paste keyup", function() {
    previewText = $(this).val();
    $('.scale_preview_text').text(previewText);
    $('.param_text').text(encodeURIComponent($(this).val()));
  });



  function setTag() {
    if (getQueryVariable('webfont') !== false) {
      $('.web_font').val(getQueryVariable('webfont'));
      $('.webfont_url').attr('href', 'https://fonts.googleapis.com/css?family=' + getQueryVariable('webfont'));
      $('.param_font').text(getQueryVariable('webfont'));
    };
  };
  setTag();

  $('.web_font').bind("change paste keyup", function() {
    $('.webfont_url').attr('href', 'https://fonts.googleapis.com/css?family=' + $(this).val());
    $('.param_font').text(encodeURIComponent($(this).val()));
  });



  function setCss() {
    if (getQueryVariable('font-family') !== false) {
      $('.web_font_name').val(getQueryVariable('font-family'));
      $('.scale_webfont, .article_content').attr('style', "font-family:" + getQueryVariable('font-family'));
      $('.param_css').text(getQueryVariable('font-family'));
      $('.css_font_family').text(getQueryVariable('font-family'));
    };
  };
  setCss();

  $('.web_font_name').bind("change paste keyup", function() {
    webFontName = $(this).val();
    $('.scale_webfont, .article_content').attr('style', "font-family:" + webFontName);
    $('.param_css').text(encodeURIComponent($(this).val()));
    $('.css_font_family').text($(this).val());
  });



  function setFontWeight() {
    if (getQueryVariable('font-weight') !== false) {
      $('.i_weight').val(getQueryVariable('font-weight'));
      $('.style_weight').html('.scale_webfont, .article_container {font-weight:' + getQueryVariable('font-weight') + ';}');
      $('.param_weight').text(getQueryVariable('font-weight'));
      $('.css_weight').text(getQueryVariable('font-weight'));
    };
  };
  setFontWeight();

  $('.i_weight').bind("change paste keyup", function() {
    $('.style_weight').html('.scale_webfont, .article_container {font-weight:' + $(this).val() + ';}');
    $('.param_weight').text($(this).val());
    $('.css_weight').text($(this).val());
  });



  function setFontWeightHeaders() {
    if (getQueryVariable('font-weight-headers') !== false) {
      $('.i_weight_headers').val(getQueryVariable('font-weight-headers'));
      $('.style_weight_headers').html('.article_header {font-weight:' + getQueryVariable('font-weight-headers') + ';}');
      $('.param_weight_headers').text(getQueryVariable('font-weight-headers'));
      $('.css_weight_headers').text(getQueryVariable('font-weight-headers'));
    };
  };
  setFontWeightHeaders();

  $('.i_weight_headers').bind("change paste keyup", function() {
    $('.style_weight_headers').html('.article_header {font-weight:' + $(this).val() + ';}');
    $('.param_weight_headers').text($(this).val());
    $('.css_weight_headers').text($(this).val());
  });



  function setFontHeaders() {
    if (getQueryVariable('font-family-headers') !== false) {
      $('.font_family_headers').val(getQueryVariable('font-family-headers'));
      $('.style_font_headers').html('.article_header {font-family:' + getQueryVariable('font-family-headers') + ';}');
      $('.param_font_headers').text(getQueryVariable('font-family-headers'));
      $('.css_font_headers').html('<br>  font-family: ' + getQueryVariable('font-family-headers') + ';');
    };
  };
  setFontHeaders();

  $('.font_family_headers').bind("change paste keyup", function() {
    $('.style_font_headers').html('.article_header {font-family:' + $(this).val() + ';}');
    $('.param_font_headers').text(encodeURIComponent($(this).val()));
    if($(this).val() !== false) {
      $('.css_font_headers').html('<br>  font-family: ' + $(this).val() + ';');
    };
    setPreviewHeight();
  });



  function setBackgroundColor() {
    if (getQueryVariable('background-color') !== false) {
      $('.background_color').val(getQueryVariable('background-color'));
      $('.style_background_color').html('.article_preview_open {background-color:' + getQueryVariable('background-color') + ';}');
      $('.param_background_color').text(getQueryVariable('background-color'));
      $('.css_background_color').text(getQueryVariable('background-color'));
    };
  };
  setBackgroundColor();

  $('.background_color').bind("change paste keyup", function() {
    $('.style_background_color').html('.article_preview_open {background-color:' + $(this).val() + ';}');
    $('.param_background_color').text(encodeURIComponent($(this).val()));
    $('.css_background_color').text($(this).val());
  });



  function setFontColor() {
    if (getQueryVariable('font-color') !== false) {
      $('.font_color').val(getQueryVariable('font-color'));
      $('.style_font_color').html('.article_preview_open {color:' + getQueryVariable('font-color') + ';}');
      $('.param_font_color').text(getQueryVariable('font-color'));
      $('.css_color').text(getQueryVariable('font-color'));
    };
  };

  setFontColor();
  $('.font_color').bind("change paste keyup", function() {
    $('.style_font_color').html('.article_preview_open {color:' + $(this).val() + ';}');
    $('.param_font_color').text(encodeURIComponent($(this).val()));
    $('.css_color').text($(this).val());
  });



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

    function cssHeader() {
      a = 1;
      b = scaleRatio;
      result = 1;

      $($('.css_header_size').get().reverse()).each(function(index) {
        result = a*b;
        a = result;
        $(this).text(Math.round(result*1000)/1000);
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

    function cssFontSmall() {
      a = 1;
      b = scaleRatio;
      result = 1;

      $('.css_small_size').each(function(index) {
        result = a/b;
        a = result;
        $(this).text(Math.round(result*1000)/1000);
      });
    };

    scaleHigh();
    scaleHighLabel();
    articleHeader();
    cssHeader();
    scaleLow();
    scaleLowLabel();
    cssFontSmall();
    setPreviewHeight();
  };

  function setPreviewHeight() {
    $('body').delay(650).queue(function(next) {
      $(this).css('min-height', $('.article_preview_inner').outerHeight());
      next();
    });
  };

});

//@prepros-append codepen.js
