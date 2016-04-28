import { withPluginApi } from 'discourse/lib/plugin-api';

export default {
  name: 'discourse-simplepost',
  initialize() {

     withPluginApi('0.1', api => {
      api.onToolbarCreate(toolbar => {
        // this code assumes the existing structure of a post tool bar which contains 3 groups of edit buttons
        if(toolbar.groups.length < 3) {
          return;
        }

        var firstGroup = toolbar.groups[0];
        var secondGroup = toolbar.groups[1];
        var thirdGroup = toolbar.groups[2];

        // move the emoji button into the second group, remove the code, quote, link buttons and remove the third button group completely
        toolbar.groups.forEach((g) => {
          for (var i = g.buttons.length - 1; i >= 0; i--) {
            var b = g.buttons[i]

            if(b.id == "emoji") {
              g.buttons.removeObject(b);
              secondGroup.buttons.addObject(b);
            }

            if(b.id == "code" || b.id == "quote" || b.id == "link") {
              g.buttons.removeObject(b);
            }
          };
        });

        toolbar.groups.removeObject(thirdGroup);
      });

     });
  }
}