import { inject } from '@ember/service';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  class=\"eat-motion-indicator {{if this.motionService.isAnimating \"active\"}}\"\n  ...attributes\n/>");

class MotionIndicator extends Component {
  static {
    g(this.prototype, "motionService", [inject('-ea-motion')]);
  }
  #motionService = (i(this, "motionService"), void 0);
}
setComponentTemplate(TEMPLATE, MotionIndicator);

export { MotionIndicator as default };
//# sourceMappingURL=motion-indicator.js.map
