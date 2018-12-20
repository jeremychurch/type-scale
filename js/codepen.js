$(document).ready(function() {

  $('.codepen_btn').hover(function() {

    $(".codepen_able").each(function() {

      var el = $(this),
          type = el.data("type"),
          codeInside = el.find("code"),
          isCodeInside = codeInside.length,
          HTML = "",
          CSS = "";

      if (type == "html") {
        if (codeInside) {
          HTML = codeInside.html();
        } else {
          HTML = el.html();
        }
      } else if (type == "css") {
        if (codeInside) {
          CSS = codeInside.text();
        } else {
          CSS = el.html();
        }
      }

      var webFont = $('.web_font').val();

      var data = {
        title              : "A Type Scale",
        description        : "Custom type scale and CSS from https://type-scale.com",
        html               : HTML + '<link href="https://fonts.googleapis.com/css?family=' + webFont + '" rel="stylesheet" type="text/css">\n\n<h1>One Morning, When Gregor Samsa Woke</h1>\n\n<p>From troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.</p>\n\n<p>His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. “What’s happened to me?” he thought. It wasn’t a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.</p>\n\n<h2>One Morning, When Gregor Samsa Woke</h2>\n\n<p>From troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.</p>\n\n<p>His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. “What’s happened to me?” he thought. It wasn’t a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.</p>\n\n<h3>One Morning, When Gregor Samsa Woke</h3>\n\n<p>From troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.</p>\n\n<p>His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. “What’s happened to me?” he thought. It wasn’t a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.</p>\n\n<h4>One Morning, When Gregor Samsa Woke</h4>\n\n<p>From troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.</p>\n\n<p>His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. “What’s happened to me?” he thought. It wasn’t a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.</p>',
        css                : CSS
      };

      var JSONstring =
        JSON.stringify(data)
        // Quotes will screw up the JSON
        // .replace(/"/g, "&quot;")
        // .replace(/'/g, "&apos;");

      $('.codepen_json').val(JSONstring);

    });
  });
});
