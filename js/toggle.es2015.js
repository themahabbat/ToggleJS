class ToggleUL {
  
  constructor(props) {
    if (props['border'] == true) {
      this.border = ["1px", "solid", "#212121"];
      
      if(props['borderWidth']) this.border[0] = props['borderWidth']
      if(props['borderStyle']) this.border[1] = props['borderStyle']
      if(props['borderColor']) this.border[2] = props['borderColor']
    }

    this.mainClass = props['mainClass'] ? props['mainClass'] : 'main'
    this.subClass = props['subClass'] ? props['subClass'] : 'sub'
    this.icons = props['iconOff'] && props['iconOn'] ? [props['iconOff'], props['iconOn']] : ['off', 'on']
    this.indent = props['indent'] ? props['indent'] : null
    this.initElements(this.mainClass, this.subClass, this.icons, this.indent, this.border)
    this.handleClick(this.subClass, this.icons)
  }
  
  initElements(mainClass, subClass, icons, indents, border) {

    if (border) $("ul." + subClass).css("border-left", border[0] + ' ' + border[1] + ' ' + border[2]);
    
    $("ul." + subClass).css({
      'display': 'none',
      'margin-top': '2px',
      'border-radius': '2px'
    });

    $("ul li").each(function (k, v) {
      
      if ($(this).next("ul").length) {
        $(this).append('<span style="float: right" class="--toggle-icon">'+icons[0]+'</span>');
      }

    });

    if (indents !== null) {
      let indent = indents[0];
      $("ul."+mainClass)
        .find("li")
        .each(function(k, v) {
          if ($(this).next("ul."+subClass).length) {
            indent = indent + indents[1];

            let elements = $(this)
              .next("ul."+subClass)
              .find("li");
            $(elements).css("text-indent", indent + "px");
          }
        });
    }
    


    
  }

  handleClick(subClass, icons) {
    $("ul")
      .find("li")
      .click(e => {
        let sub = $(e.target).next("ul."+subClass);
        let active = $(sub).css("display") == "none" ? false : true;

        if (active) $(sub).slideUp(200, function() {
            $(e.target)
              .find("span")
              .html(icons[0]);
          });
        else $(sub).slideDown(200, function() {
            $(e.target)
              .find("span")
              .html(icons[1]);
          });
      });
  }
  
}

