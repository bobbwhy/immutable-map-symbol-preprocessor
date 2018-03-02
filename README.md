# Immutable Map Symbol Preprocessor
**version 0.0.1, March 2, 2018**
Allows the creation of Immutable maps from JavaScript objects that contain Symbols as keys.

While Immutable Maps can be created that use Symbols as keys, they do not allow this by just passing a JavaScript object into the constructor.

**So Immutable supports this:**
```
    const SY = Symbol('SY');
    const map = Map([[SY, 22]]);
    map.get(SY);// 22
```

**Immutable does NOT support this:**
```
    const SY = Symbol('SY');
    const data = { [SY]: 22 }
    const map = Map(data);
    map.get(SY) // undefined
```

This library contains two functions to help with this.

**createMap:** returns a Map from a JavaScript object that has symbols as keys.  This does not create deep nested maps.
**createMapDeep:** same as above, but allows for nesting;

**createMap Example**
```
    import { createMap } from 'immutable-map-symbol-preprocessor';

    const data = { [SY]: 22 }
    const map = createMap(data);
```

**createMapDeep Example**
```
    import { createMapDeep } from 'immutable-map-symbol-preprocessor';

    const data = { [SY]: 22, more: {one: 2}, [MORE]: {two: 4}}
    const map = createMapDeep(data);
```

**alternative imports/require**
```
    import createMap from 'immutable-map-symbol-preprocessor/create-map';
    import createMapDeep from 'immutable-map-symbol-preprocessor/create-map-deep'
```

Of course, you can use createMapDeep on a non-nested object.  The first version, however is lighter and should be more performant.


### Random Note.
Support for symbols in the constructor was the topic of [this pull request](https://github.com/facebook/immutable-js/pull/1392/files/a731e4fbb7fba4ce862010a15bf987bf30e0ac0c) on the Immutable github page.  You may wish to visit that page if you want to see this made a permanent feature of the Immutable map library.









