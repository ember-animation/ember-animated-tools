import { helper } from '@ember/component/helper';

function eatRounded([value]) {
  if (value != null) {
    return Math.round(value);
  }
}
var EatRounded = helper(eatRounded);

export { EatRounded as default, eatRounded };
//# sourceMappingURL=-eat-rounded.js.map
