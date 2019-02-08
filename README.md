# `<fluid-triggered-method>`

Listens for an event on one or more subjects and calls a method on one or more
targets when that event is handled.

## Usage

Invoke the `remote` method on the parent element every time a `trigger` event is received by the `window`.
```html
<fluid-triggered-method handle="trigger" method="remote">
</fluid-triggered-method>
```

## Installation

`<fluid-triggered-method>` is available on [NPM](https://www.npmjs.com/package/@cogizmo/fluid-triggered-method) and may be installed as  a dependency.

```
> npm install @cogizmo/fluid-triggered-method
```

1. Place the files on your server.

2. Install the appropriate [cogizmo/Cogizmo](https://github.com/cogizmo/cogizmo).
    * From npm
    ```
    > npm install @cogizmo/cogizmo
    ```

    * From github

3. Add Cogizmo to your document `<head>`.

    ```html
    <script src="path/to/Cogizmo.js"></script>
    ```

4. Add `<fluid-triggered-method>` element to your document.

    ```html
    <script src="path/to/fluid-triggered-method.js"></script>
    ```

6. Use element whereever you want to transclude html.

    ```html
    <fluid-triggered-method></fluid-triggered-method>
    ```

## Declarative API (HTML)

### `handle` attribute

`String<EventName>`

The event that the proxy handler listens for to trigger the method call. Will listen for `'trigger'`, unless specified.

```html
<fluid-triggered-method handle="my-event">
</fluid-triggered-method>
```

### `listens` attribute

`String<CSS Selector>`

Will trigger the method for each element returned by a valid CSS query
selector. If omitted, `<fluid-triggered-method>` will listen on the `window` or
`global` object.

```html
<fluid-triggered-method handle="multi-event" listens=".Class">
</fluid-triggered-method>
```

### `method` attribute

`String<MethodName>` *Case-Sensitive*

The method to call on the target element(s) when the event is handled. The
method must be ***publicly accessible*** on the element object, not an internal
or private API.

```
<fluid-triggered-method method="callMe">
</fluid-triggered-method>
```

### `targets` attribute

`String<CSS Selector>`

Array of element nodes to invoke the method on when the event is handled. If
omitted, `<fluid-triggered-method>` will invoke the method on it's `host` or
it's `parentElement`.

```html
<fluid-triggered-method targets="">
</fluid-triggered-method>
```

### `cancel` attribute

`Boolean`

Event behaves as if `preventDefault()` has been called on it.

```html
<fluid-triggered-method handle="cancelme" cancel></fluid-triggered-method>
```

### `stop` attribute

`Boolean`

Calls `stopPropagation()` on the event when it is handled.

```html
<fluid-triggered-method handle="happening" stop></fluid-triggered-method>
```

### `immediate` attribute

`Boolean`

If [`stop` attribute](#stopattribute) is `true`, then when the event is handled, `stopImmediatePropagation()` will be called on it, preventing further bubbling.

```html
<fluid-triggered-method handle="trigger" stop immediate>
</fluid-triggered-method>
```
## Imperative API (JS/ES)

### `element.handle`

Returns `String`

The name of the event that `<fluid-triggered-method>` is listening for.
Changing the event will remove all listeners for the previous event name and
add new listeners for the new name.

### `element.listensSelector`

Returns `String<CSSSelector>`

Gets or sets the selector on which to listen for the desired event on. Will
remove listeners and add new listeners when the selector is changed.

### `element.listens`

Returns `Array` - *ReadOnly*

An Array of element nodes that listeners will be added to.

### `element.targetSelector`

Returns `String<CSSSelector>`

Gets or sets the selector on which to invoke the method and forward the event.
Will remove listeners and add new listeners when the selector is changed.


### `element.targets`

Returns `Array` - *ReadOnly*

An Array of element nodes that the method will be `call`ed on.

### `element.cancel`

Returns `Boolean`

Whether to call `preventDefault()` on the handled event.


### `element.stop`

Returns `Boolean`

Whether to call `stopPropagation()` on the handled event.

### `element.immediate`

Returns `Boolean`

Whether to call `stopImmediatePropagation()` on the handled event.

## DOM Events

`<fluid-triggered-method>` is intended as a method proxy that is triggerd when events are handled. It does not currently dispatch its own events.
