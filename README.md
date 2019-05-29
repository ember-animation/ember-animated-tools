# Ember Animated Tools

A widget useful for slowing down and debugging Ember Animated animations.


Installation
------------------------------------------------------------------------------

```
ember install ember-animated-tools
```

Usage
------------------------------------------------------------------------------

Add the slideable widget:

```hbs
<AnimatedTools />
```

Or add it, but keep it hidden until a hotkey reveals it:

```hbs
<AnimatedTools @hideUntilKeys="Ctrl-Shift-KeyA" />
```

Or if you want to use the lower-level pieces, you can directly place the `<MotionIndicator />` or `<TimeControl />` components wherever you like.


Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
