$(document).ready(function() {

  $('.codepen_btn').hover(function() {

    $(".codepen_able").each(function() {

      el = $(this),
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

      previewText = $('.preview_text').val();

      data = {
        title              : "A Type Scale",
        description        : "Custom type scale and CSS from https://type-scale.com",
        html               : HTML + '<h1>' + previewText + '</h1>\n\n<p>What looked like a small patch of purple grass, above five feet square, was moving across the sand in their direction.</p>\n\n<p>When it came near enough he perceived that it was not grass; there were no blades, but only purple roots. The roots were revolving, for each small plant in the whole patch, like the spokes of a rimless wheel.</p>\n\n<h2>' + previewText + '</h2>\n\n<p>What looked like a small patch of purple grass, above five feet square, was moving across the sand in their direction.</p>\n\n<p>When it came near enough he perceived that it was not grass; there were no blades, but only purple roots. The roots were revolving, for each small plant in the whole patch, like the spokes of a rimless wheel.</p>\n\n<h3>' + previewText + '</h3>\n\n<p>What looked like a small patch of purple grass, above five feet square, was moving across the sand in their direction.</p>\n\n<p>When it came near enough he perceived that it was not grass; there were no blades, but only purple roots. The roots were revolving, for each small plant in the whole patch, like the spokes of a rimless wheel.</p>\n\n<h4>' + previewText + '</h4>\n\n<p>What looked like a small patch of purple grass, above five feet square, was moving across the sand in their direction.</p>\n\n<p>When it came near enough he perceived that it was not grass; there were no blades, but only purple roots. The roots were revolving, for each small plant in the whole patch, like the spokes of a rimless wheel.</p>\n\n<h5>' + previewText + '</h5>\n\n<p>What looked like a small patch of purple grass, above five feet square, was moving across the sand in their direction.</p>\n\n<p>When it came near enough he perceived that it was not grass; there were no blades, but only purple roots. The roots were revolving, for each small plant in the whole patch, like the spokes of a rimless wheel.</p>\n\n<p class="text_small">— Excerpt from A Voyage to Arcturus, by David Lindsay.</p>',
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
