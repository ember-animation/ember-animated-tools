import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import TimeControl from 'ember-animated/test-support/time-control';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { task } from 'ember-animated';
import { inject } from '@ember/service';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div class=\"eat-time-control\">\n  <div>\n    <label>Speed {{-eat-rounded this.speedPercent}}%</label>\n    <div>\n      <div class=\"eat-time-control--tick-marks\">\n        {{#each this.tickMarks as |tickMark|}}\n          {{! template-lint-disable no-inline-styles }}\n          <div style={{tickMark.position}} role=\"button\" {{on \"click\" (fn this.tickMarkChosen tickMark)}}>\n            <span>{{tickMark.text}}</span>\n          </div>\n        {{/each}}\n      </div>\n      <input\n        class=\"eat-time-control--slider\"\n        type=\"range\"\n        value={{this.logSpeed}}\n        min=\"0\"\n        max=\"200\"\n        step=\"1\"\n        aria-label=\"Speed slider\"\n        oninput={{this.updateLogSpeed}}\n      >\n    </div>\n  </div>\n</div>");

function toLogSpeed(speedPercent) {
  let percent = speedPercent;
  if (percent <= 1) {
    // Log of zero is infinity. Log of 1% is as low as we go, which
    // counts as paused for us.
    percent = 1;
  }
  return 200 * Math.log(percent) / Math.log(200);
}
function fromLogSpeed(logSpeed) {
  let percent = Math.exp(Math.log(200) * logSpeed / 200);
  if (percent <= 1) {
    percent = 0;
  }
  return percent;
}
class TimeControlComponent extends Component {
  static {
    g(this.prototype, "speedPercent", [tracked], function () {
      return 100;
    });
  }
  #speedPercent = (i(this, "speedPercent"), void 0);
  static {
    g(this.prototype, "motionService", [inject('-ea-motion')]);
  }
  #motionService = (i(this, "motionService"), void 0);
  get logSpeed() {
    return toLogSpeed(this.speedPercent);
  }
  tickMarks = [{
    value: 0,
    text: 'Paused'
  }, {
    value: 5,
    text: '5%'
  }, {
    value: 10,
    text: '10%'
  }, {
    value: 25,
    text: '25%'
  }, {
    value: 50,
    text: '50%'
  }, {
    value: 100,
    text: '100%'
  }].map(entry => {
    entry.position = htmlSafe(`left: ${toLogSpeed(entry.value) / 2}%`);
    return entry;
  });

  // didInsertElement() {
  //   // weirdly, ember is not initializing this for me correctly
  //   this.element.querySelector('input').value = this.logSpeed;
  // }

  willDestroy() {
    super.willDestroy();
    if (this.time) {
      this.time.finished();
      this.time = null;
    }
  }
  updateLogSpeed(event) {
    this._setSpeed(fromLogSpeed(event.target.valueAsNumber));
  }
  static {
    n(this.prototype, "updateLogSpeed", [action]);
  }
  tickMarkChosen(tickMark) {
    this._setSpeed(tickMark.value);
  }
  static {
    n(this.prototype, "tickMarkChosen", [action]);
  }
  _setSpeed(speed) {
    this._speedSetter.perform(speed);
  }
  static {
    g(this.prototype, "_speedSetter", [task(function* (speed) {
      if (speed === 100) {
        // at normal speed, we want to disable our time control
        // entirely. This means we won't intefere with things like
        // acceptance tests that may already want to take over the
        // timing.
        //
        // But if there's an animation in progress, we must wait until
        // it's done. Otherwise there will be a jarring jump from our
        // fake time to the real time.
        if (this.time) {
          this.time.runAtSpeed(1);
          this.speedPercent = speed;
          yield this.motionService.waitUntilIdle?.perform();
          this.time.finished();
          this.time = null;
        }
      } else {
        if (!this.time) {
          this.time = new TimeControl();
        }
        if (speed === 0) {
          this.time.pause();
        } else {
          this.time.runAtSpeed(speed / 100);
        }
        this.speedPercent = speed;
      }
    }).restartable()]);
  }
  #_speedSetter = (i(this, "_speedSetter"), void 0);
}
setComponentTemplate(TEMPLATE, TimeControlComponent);

export { TimeControlComponent as default };
//# sourceMappingURL=time-control.js.map
