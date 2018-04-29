"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToggleUL = function () {
  function ToggleUL(props) {
    _classCallCheck(this, ToggleUL);

    if (props['border'] == true) {
      this.border = ["1px", "solid", "#212121"];

      if (props['borderWidth']) this.border[0] = props['borderWidth'];
      if (props['borderStyle']) this.border[1] = props['borderStyle'];
      if (props['borderColor']) this.border[2] = props['borderColor'];
    }

    this.mainClass = props['mainClass'] ? props['mainClass'] : 'main';
    this.subClass = props['subClass'] ? props['subClass'] : 'sub';
    this.icons = props['iconOff'] && props['iconOn'] ? [props['iconOff'], props['iconOn']] : ['off', 'on'];
    this.indent = props['indent'] ? props['indent'] : null;
    this.initElements(this.mainClass, this.subClass, this.icons, this.indent, this.border);
    this.handleClick(this.subClass, this.icons);
  }

  _createClass(ToggleUL, [{
    key: "initElements",
    value: function initElements(mainClass, subClass, icons, indents, border) {

      if (border) $("ul." + subClass).css("border-left", border[0] + ' ' + border[1] + ' ' + border[2]);

      $("ul li").each(function (k, v) {

        if ($(this).next("ul").length) {
          $(this).append('<span style="float: right" class="--toggle-icon">' + icons[0] + '</span>');
        }
      });

      if (indents !== null) {
        var indent = indents[0];
        $("ul." + mainClass).find("li").each(function (k, v) {
          if ($(this).next("ul." + subClass).length) {
            indent = indent + indents[1];

            var elements = $(this).next("ul." + subClass).find("li");
            $(elements).css("text-indent", indent + "px");
          }
        });
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(subClass, icons) {
      $("ul").find("li").click(function (e) {
        var sub = $(e.target).next("ul." + subClass);
        var active = $(sub).css("display") == "none" ? false : true;

        if (active) $(sub).slideUp(200, function () {
          $(e.target).find("span").html(icons[0]);
        });else $(sub).slideDown(200, function () {
          $(e.target).find("span").html(icons[1]);
        });
      });
    }
  }]);

  return ToggleUL;
}();
