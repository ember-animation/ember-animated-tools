# Ember Animated Tools

A widget useful for slowing down and debugging Ember Animated animations.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v3.4 or above
* Node.js v12 or above


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


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
