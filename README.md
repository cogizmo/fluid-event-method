# `<fluid-triggered-method>`

Listens for an event on one or more subjects and calls a method on one or more
targets when that event is handled.

## Usage

Invoke the `remote` method on the parent element every time a `trigger` event is received by the `window`.
```html
<fluid-triggered-method handle="trigger" call="remote">
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

`String<CSS Selector>`

Array of element nodes to handle the event on. If omitted, `<fluid-triggered-method>` will listen on the `window` or `global` object.

```html
<fluid-triggered-method handle="">
</fluid-triggered-method>
```

### `targets` attribute

`String<CSS Selector>`

Array of element nodes to invoke the method on when the event is handled. If omitted, `<fluid-triggered-method>` will invoke the method on its `parentElement` or its `host`.

```html
<fluid-triggered-method targets="">
</fluid-triggered-method>
```

## Imperative API (JS/ES)

### `element.targets`

Returns `Array` - *ReadOnly*

An Array of element nodes that the method will be `call`ed on.

## DOM Events

`<fluid-triggered-method>` is intended as a method proxy that is triggerd when events are handled. It does not currently dispatch its own events.
