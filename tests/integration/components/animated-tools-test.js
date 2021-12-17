import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Components | AnimatedTools', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(function () {
    localStorage.clear();
  });

  test('it renders with no hideUntilKeys argument', async function (assert) {
    await render(hbs`<AnimatedTools />`);

    assert.dom('.animated-tools').exists();
  });

  test('it does not render with hideUntilKeys argument', async function (assert) {
    await render(hbs`<AnimatedTools @hideUntilKeys="ctrl-KeyA" />`);

    assert.dom('.animated-tools').doesNotExist();
  });

  test('it renders with hideUntilKeys argument once the keys pressed', async function (assert) {
    await render(hbs`<AnimatedTools @hideUntilKeys="Ctrl-KeyA" />`);

    assert.dom('.animated-tools').doesNotExist();

    await triggerEvent(document, 'keydown', {
      ctrlKey: true,
      code: 'KeyA',
    });
    assert.dom('.animated-tools').exists();
  });
});
