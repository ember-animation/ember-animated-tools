import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import './animated-tools.css';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#unless this.isHidden}}\n  <div class=\"animated-tools {{if this.isOpen \"is-open\"}}\" ...attributes>\n    <div class=\"animated-tools-launcher\" role=\"button\" {{on \"click\" this.toggle}}>\n      <MotionIndicator />\n      ⏱{{! <--- there\'s an emoji here, in case your editor doesn\'t show it }}\n    </div>\n    <div class=\"animated-tools-panel\">\n      <TimeControl />\n    </div>\n  </div>\n{{/unless}}\n");

class AnimatedTools extends Component {
  static {
    g(this.prototype, "isOpen", [tracked], function () {
      return false;
    });
  }
  #isOpen = (i(this, "isOpen"), void 0);
  static {
    g(this.prototype, "isHidden", [tracked], function () {
      return true;
    });
  }
  #isHidden = (i(this, "isHidden"), void 0); // always hidden in fastboot
  constructor() {
    super(...arguments);
    if (typeof FastBoot === 'undefined') {
      this.isOpen = !!localStorage.getItem('animated-tools-open');

      // hidden if we're using hideUntilKeys and the keys haven't been pressed yet.
      this.isHidden = this.args.hideUntilKeys && !localStorage.getItem('animated-tools-activated');
      if (this.args.hideUntilKeys) {
        this._keyListener = this._keyListener.bind(this);
        document.addEventListener('keydown', this._keyListener);
      }
    }
  }
  willDestroy() {
    super.willDestroy(...arguments);
    if (typeof FastBoot === 'undefined' && this.args.hideUntilKeys) {
      document.removeEventListener('keydown', this._keyListener);
    }
  }
  get tests() {
    if (!this.args.hideUntilKeys) {
      return null;
    }
    return this.args.hideUntilKeys.split('-').map(part => {
      if (part === 'Ctrl') {
        return event => event.ctrlKey;
      }
      if (part === 'Alt') {
        return event => event.altKey;
      }
      if (part === 'Shift') {
        return event => event.shiftKey;
      }
      return event => event.code === part;
    });
  }
  _keyListener(event) {
    if (this.tests.every(test => test(event))) {
      if (localStorage.getItem('animated-tools-activated')) {
        this.deactivate();
      } else {
        this.activate();
        this.open();
      }
    }
  }
  toggle() {
    if (this.isOpen) {
      this.hide();
    } else {
      this.open();
    }
  }
  static {
    n(this.prototype, "toggle", [action]);
  }
  open() {
    localStorage.setItem('animated-tools-open', true);
    this.isOpen = true;
  }
  hide() {
    localStorage.removeItem('animated-tools-open');
    this.isOpen = false;
  }
  activate() {
    localStorage.setItem('animated-tools-activated', true);
    this.isHidden = false;
  }
  deactivate() {
    localStorage.removeItem('animated-tools-activated');
    this.isHidden = true;
  }
}
setComponentTemplate(TEMPLATE, AnimatedTools);

export { AnimatedTools as default };
//# sourceMappingURL=animated-tools.js.map
