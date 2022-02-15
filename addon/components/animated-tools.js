import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AnimatedTools extends Component {
  @tracked isOpen = false;

  // always hidden in fastboot
  @tracked isHidden = true;

  constructor() {
    super(...arguments);

    if (typeof FastBoot === 'undefined') {
      this.isOpen = !!localStorage.getItem('animated-tools-open');

      // hidden if we're using hideUntilKeys and the keys haven't been pressed yet.
      this.isHidden =
        this.args.hideUntilKeys &&
        !localStorage.getItem('animated-tools-activated');

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
    return this.args.hideUntilKeys.split('-').map((part) => {
      if (part === 'Ctrl') {
        return (event) => event.ctrlKey;
      }
      if (part === 'Alt') {
        return (event) => event.altKey;
      }
      if (part === 'Shift') {
        return (event) => event.shiftKey;
      }
      return (event) => event.code === part;
    });
  }

  _keyListener(event) {
    if (this.tests.every((test) => test(event))) {
      if (localStorage.getItem('animated-tools-activated')) {
        this.deactivate();
      } else {
        this.activate();
        this.open();
      }
    }
  }

  @action toggle() {
    if (this.isOpen) {
      this.hide();
    } else {
      this.open();
    }
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
