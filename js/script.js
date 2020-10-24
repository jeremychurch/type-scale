
$(document).ready(function() {

  function paramArticlePreview() {
    if (getQueryVariable('preview') === 'true') {
      $('.article_preview_button').removeClass('fa-chevron-left').addClass('fa-times');
      $('.article_preview').addClass('article_preview_open');
      if ($(window).innerWidth() >= 767) {
        $('.article_content').focus();
      }
    };
  };
  paramArticlePreview();

  $('.article_preview_button').click(function() {
    $(this).toggleClass('fa-times').toggleClass('fa-chevron-left');
    $('.article_preview').toggleClass('article_preview_open');
    if ($(window).innerWidth() >= 767) {
      $('.article_preview_open .article_content').focus();
    }
  });

  $('.js_css_button').click(function(e) {
    e.preventDefault();
    $(this).children('.fa').toggleClass('fa-times').toggleClass('fa-chevron-down');
  });

  $('.js_permalink').click(function(e) {
    e.preventDefault();
    $('.js_permalink_field').val($('.js_param_url').text()).toggle().select();
    // $(this).attr('href', $('.js_param_url').text())
  });

  $('.js_permalink_field').click(function() {
    $(this).val($('.js_param_url').text()).select();
  });

  $('[data-toggle]').click(function(e){
    e.preventDefault();
    $($(this).data('toggle')).toggle();
  });

  $('.js_scale_add_high').click(function(e) {
    e.preventDefault();
    $('.js_scale_add_high_section').after($('.js_scale_section_high').first().prop('outerHTML'));
    $('.js_scale_section_high').first().hide().show().css('color', '#ff8787');
    scaleCalc();
  });

  $('.js_scale_add_low').click(function(e) {
    e.preventDefault();
    $('.js_scale_add_low_section').before($('.js_scale_section_low').last().prop('outerHTML'));
    $('.js_scale_section_low').last().hide().show().css('color', '#ff8787');
    scaleCalc();
  });

  function getQueryVariable(variable) {
    var vars = window.location.search.substring(1).split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] == variable){return decodeURIComponent(pair[1]);}
  }
  return(false);
  };



  function paramSize() {
    if (getQueryVariable('size') === false) {
      baseSize = 1;
      $('.base_size').val(16);
    }
    else {
      baseSize = getQueryVariable('size') / 16;
      $('.base_size').val(getQueryVariable('size'));
    };
    setBaseSize();
  };
  paramSize();

  $('.base_size').on("change paste keyup", function() {
    setBaseSize();
  });

  function setBaseSize() {
    fontSize = $('.base_size').val();
    if($.isNumeric(fontSize)){
      baseSize = fontSize / 16;
    }
    else {
      baseSize = 0;
    };
    $('.base_em').text(Math.round(baseSize*1000)/1000);
    scaleSelect();
    $('.js_param_size').text(fontSize);
    $('.article_container').css('font-size', Math.round(baseSize*1000)/1000 + 'em');
    $('.js_css_font_size').text(Math.round(baseSize*1000)/10);
    $('.js_css_font_size_px').text(fontSize);
  };



  function setScale() {
    if (getQueryVariable('scale') === false) {
      scaleRatio = 1.250;
    }
    else {
      scaleRatio = getQueryVariable('scale');
      $('.font_scale').val(scaleRatio);

      if (!$('.font_scale').val()) {
        $('.js_scale_div').addClass('col_two_thirds');
        $('.js_custom_scale_div').removeClass('hide').addClass('col_one_third');
        $('.font_scale').val('custom');
        $('.font_scale_custom input').val(scaleRatio);
      }
      else {
        $('.font_scale').val(scaleRatio);
      };

      $('.js_param_scale').text(scaleRatio);
    };
    scaleCalc();
  };
  setScale();

  $('.font_scale').on("change paste keyup", function() {
    if ($(this).val() === 'custom') {
      $('.js_scale_div').addClass('col_two_thirds');
      $('.js_custom_scale_div').removeClass('hide').addClass('col_one_third');
      $('.font_scale_custom input')
        .val(scaleRatio)
        .focus()
        .select();
    }
    else {
      scaleSelect();
      $('.js_scale_div').removeClass('col_two_thirds');
      $('.js_custom_scale_div').addClass('hide');
      $('.js_param_scale').text($(this).val());
    };
  });

  $('.font_scale_custom input').on("change paste keyup", function() {
    scaleRatio = $(this).val();
    scaleCalc();
    $('.js_param_scale').text($(this).val());
  });

  function scaleSelect() {
    scaleRatio = $('.font_scale').val();
    scaleCalc();
  };



  function paramPreviewText() {
    if (getQueryVariable('text') !== false) {
      $('.preview_text').val(getQueryVariable('text'));
      setPreviewText();
    };
  };
  paramPreviewText();

  $('.preview_text').on("change paste keyup", function() {
    setPreviewText();
  });

  function setPreviewText() {
    previewText = $('.preview_text').val();
    $('.scale_preview_text, .article_header').text(previewText);
    $('.js_param_text').text(encodeURIComponent(previewText));
  };
  setPreviewText();



  function createWebFontList() {
    $.getJSON('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBExIvFSO_6mtbJ5upWmYq8kR967HqREYM', function(response) {
      items = response.items;
      listElements = '';
      items.forEach(function(item){
        if (item.category === 'handwriting') {
          fallback = 'cursive';
        } else if (item.category === 'display') {
          // This isn't ideal, but since Google doesn't provide the fallback font in their JSON, this is probably the most sane fallback, and not too horrible even if the original is a serif or script.
          fallback = 'sans-serif';
        } else {
          fallback = item.category;
        };
        setWebFontListFamily = "'" + item.family + "', " + fallback;
        listElements+='<option value="' + item.family + '" data-font-family="' + setWebFontListFamily + ';">' + item.family + '</option>';
      });
      $('.js_font, .js_body_font').append(listElements);
      $('.js_font').val('Poppins');
      setFont();
      paramFont();
      paramFontWeight();
      paramBodyFont();
      paramBodyFontWeight();
    });
  };
  createWebFontList();



  function paramFont() {
    if (getQueryVariable('font') !== false) {
      $('.js_font').val(getQueryVariable('font'));
      setFont();
    };
  };
  // These run within createWebFontList(), otherwise the vals are not ready in time

  $('.js_font').on("change paste keyup", function() {
    setFont();
  });

  function setFont() {
    webFont = $('.js_font').val();
    setWebFontUrl();
    webFontFamily = $('.js_font option:selected').data('font-family');
    $('.scale_webfont, .article_content').attr('style', "font-family:" + webFontFamily);
    $('.js_param_font').text(encodeURIComponent(webFont));
    $('.js_css_font_family').text(webFontFamily);
    setBodyFont();
    setBodyFontWeight();
  };



  function paramFontWeight() {
    if (getQueryVariable('fontweight') !== false) {
      $('.js_weight').val(getQueryVariable('fontweight'));
      setFontWeight();
    };
  };
  // These run within createWebFontList(), otherwise the vals are not ready in time

  $('.js_weight').on("change paste keyup", function() {
    setFontWeight();
  });

  function setFontWeight() {
    fontWeight = $('.js_weight').val();
    setWebFontUrl();
    $('.js_style_weight').html('.scale_webfont, .article_header {font-weight:' + fontWeight + ';}');
    $('.js_param_weight').text(fontWeight);
    $('.js_css_weight').text(fontWeight);
    setBodyFontWeight();
  };



  function paramBodyFont() {
    if (getQueryVariable('bodyfont') !== false) {
      $('.js_body_font').val(getQueryVariable('bodyfont'));
      setBodyFont();
    };
  };
  // These run within createWebFontList(), otherwise the vals are not ready in time

  $('.js_body_font').on("change paste keyup", function() {
    setBodyFont();
  });

  function setBodyFont() {
    bodyFont = $('.js_body_font').val();
    bodyWebFontFamily = $('.js_body_font option:selected').data('font-family');
    if (bodyFont === "body_font_default") {
      bodyFont = $(".js_font").val();
      bodyWebFontFamily = $('.js_font option:selected').data('font-family');
    }
    setWebFontUrl();
    $('.js_style_body_font').html('.article_content p {font-family:' + bodyWebFontFamily + '}');
    $('.js_param_body_font').text(encodeURIComponent(bodyFont));
    $('.js_css_body_font_family').text(bodyWebFontFamily);
    setPreviewHeight();
  };



  function paramBodyFontWeight() {
    if (getQueryVariable('bodyfontweight') !== false) {
      $('.js_body_weight').val(getQueryVariable('bodyfontweight'));
      setBodyFontWeight();
    };
  };
  // These run within createWebFontList(), otherwise the vals are not ready in time

  $('.js_body_weight').on("change paste keyup", function() {
    setBodyFontWeight();
  });

  function setBodyFontWeight() {
    bodyFontWeight = $('.js_body_weight').val();
    if (bodyFontWeight === "body_weight_default") {
      bodyFontWeight = $(".js_weight").val();
    }
    setWebFontUrl();
    $('.js_style_body_weight').html('.article_content p {font-weight:' + bodyFontWeight + ';}');
    $('.js_param_body_weight').text($('.js_body_weight').val());
    $('.js_css_body_weight').text(bodyFontWeight);
  };



  function setWebFontUrl() {
    headerFont = $('.js_font').val().replace(/\s/g, '+');
    bodyFont = $('.js_body_font').val().replace(/\s/g, '+');
    headerWeight = $('.js_weight').val();
    bodyWeight = $('.js_body_weight').val();
    if (bodyWeight === "body_weight_default") {
      bodyWeight = headerWeight;
    }
    if (bodyFont === headerFont || bodyFont === "body_font_default") {
      if (bodyWeight === headerWeight) {
        bodyWeight = "";
      } else {
        bodyWeight = bodyWeight + ",";
      }
      webFontUrl = 'https://fonts.googleapis.com/css?family=' + headerFont + ":" + bodyWeight + headerWeight;
    } else {
      webFontUrl = 'https://fonts.googleapis.com/css?family=' + bodyFont + ":" + bodyWeight + "|" + headerFont + ":" + headerWeight;
    }
    $('.webfont_url').attr('href', webFontUrl);
    $('.js_css_webfont_url').text(webFontUrl);
  };


  function rgb2hex(orig){
   var rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
   return (rgb && rgb.length === 4) ? "#" +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig;
  }

  function paramBackgroundColor() {
    if (getQueryVariable('backgroundcolor') !== false) {
      $('.js_bg_color').val(getQueryVariable('backgroundcolor'));
      $('.js_bg_color_picker').val(getQueryVariable('backgroundcolor'));
      setBackgroundColor();
    };
  };
  paramBackgroundColor();

  $('.js_bg_color').on("change paste keyup", function() {
    setBackgroundColorInput();
  });

  $('.js_bg_color_picker').on("change paste keyup", function() {
    setBackgroundColorPicker();
  });

  function setBackgroundColorInput() {
    backgroundColor = $('.js_bg_color').val();
    setBackgroundColor();
    bgColorHex = rgb2hex($(".article_preview").css("background-color"));
    $(".js_bg_color_picker").val(bgColorHex);
  };

  function setBackgroundColorPicker() {
    backgroundColor = $('.js_bg_color_picker').val();
    $(".js_bg_color").val(backgroundColor);
    setBackgroundColor();
  };

  function setBackgroundColor() {
    backgroundColor = $('.js_bg_color').val();
    $('.js_style_background_color').html('.article_preview {background-color:' + backgroundColor + ';}');
    $('.js_css_background_color').text(backgroundColor);
    bgColorHex = rgb2hex($(".article_preview").css("background-color"));
    $('.js_param_background_color').text(encodeURIComponent(bgColorHex));
  };



  function paramFontColor() {
    if (getQueryVariable('fontcolor') !== false) {
      $('.js_font_color').val(getQueryVariable('fontcolor'));
      $('.js_font_color_picker').val(getQueryVariable('fontcolor'));
      setFontColor();
    };
  };
  paramFontColor();

  $('.js_font_color').on("change paste keyup", function() {
    setFontColorInput();
  });

  $('.js_font_color_picker').on("change paste keyup", function() {
    setFontColorPicker();
  });

  function setFontColorInput() {
    fontColor = $('.js_font_color').val();
    setFontColor();
    fontColorHex = rgb2hex($(".article_preview").css("color"));
    $(".js_font_color_picker").val(fontColorHex);
  };

  function setFontColorPicker() {
    fontColor = $('.js_font_color_picker').val();
    $('.js_font_color').val(fontColor);
    setFontColor();
  };

  function setFontColor() {
    fontColor = $('.js_font_color').val();
    $('.js_style_font_color').html('.article_preview {color:' + fontColor + ';}');
    $('.js_css_color').text(fontColor);
    fontColorHex = rgb2hex($(".article_preview").css("color"));
    $('.js_param_font_color').text(encodeURIComponent(fontColorHex));
  };



  function paramLineHeight() {
    if (getQueryVariable('lineheight') !== false) {
      $('.js_line_height').val(getQueryVariable('lineheight'));
      setLineHeight();
    };
  };
  paramLineHeight();

  $('.js_line_height').on("change paste keyup", function() {
    setLineHeight();
  });

  function setLineHeight() {
    lineHeight = $('.js_line_height').val();
    $('.js_style_line_height').html('.article_content {line-height:' + lineHeight + ';}');
    $('.js_param_line_height').text(encodeURIComponent(lineHeight));
    $('.js_css_line_height').text(lineHeight);
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
        $(this).text(Math.round(result*1000)/1000 + 'rem/' + ((baseSize*16)*result).toFixed(2) + 'px');
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

      $($('.js_css_header_size').get().reverse()).each(function(index) {
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
        $(this).text(Math.round(result*1000)/1000 + 'rem/' + ((baseSize*16)*result).toFixed(2) + 'px');
      });
    };

    function cssFontSmall() {
      a = 1;
      b = scaleRatio;
      result = 1;

      $('.js_css_small_size').each(function(index) {
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

  $(".js_current_year").text(new Date().getFullYear());

});

//@prepros-append codepen.js
