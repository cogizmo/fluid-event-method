"use strict";
(function defineElement() {
// -----------------------------------------------------------------------------
//  ELEMENT DEFINITION
// -----------------------------------------------------------------------------
    const _PRIVATE_ = new WeakMap();
    class FluidEventMethod extends Cogizmo {
        static get is() {   return 'fluid-event-method';   }

    /* Lifecycle Callbacks  - - - - - - - - - - - - - - - - - - - - - - - - - */
        constructor() {
            super();
            _PRIVATE_.set(this, Object.create(null));

            _PRIVATE_.get(this).onEvent = onEvent.bind(this);
        }

        connectedCallback() {
            super.connectedCallback();

            this.setAttribute('hidden', '');
            this.setAttribute('aria-hidden', 'true');
            if (this.on)
                addListeners.call(this, this.on);
        }

        disconnectedCallback() {
            if (this.on)
                removeListeners.call(this, this.on);

            super.disconnectedCallback();
        }

    /* Element Attributes - - - - - - - - - - - - - - - - - - - - - - - - - - */
        static get observedAttributes() {
            // List attributes here.
            let attrs = [
                'on',
                'emits',
                'method',
                'no-bubble',
                'cancel'
            ];

            // Get superclasses observed attributes
            let a = [];
            if (!!super.observedAttributes
            &&  super.observedAttributes instanceof Array)
                a = super.observedAttributes;
            // Merge arrays without duplicates
            return a.concat(attrs.filter(item => { a.indexOf(item) < 0 }));

        }

        attributeChangedCallback(name, old, value) {
        // Maintain native behavior and (if applicable) enhancements
            if ("function" === typeof super.attributeChangedCallback)
                super.attributeChangedCallback(name, old, value);

        }

        onSelectorChanged(newValue, oldValue) {
        // Exit Condition:
            if (!this.isAttached) return;

        // Remove all Event Listeners
            if (oldValue && oldValue !== newValue)
                removeListeners.call(this, oldValue);

            if (!newValue)
                this.on = 'parent';
            else if (this.isAttached) {
                addListeners.call(this, newValue);
            }
        }

        onEventNameChanged(newValue, oldValue) {
        // Exit Condition:
            if (!this.isAttached) return;

            oldValue &&	(oldValue !== newValue) && removeListeners.call(this, this.on);
            newValue &&	addListeners.call(this, this.on);
        }

        /* Public Methods (below) - - - - - - - - - - - - - - - - - - - - - - - - */
        activate(node, method, event) {
            if (node && 'function' === typeof node[method])
                node[method](event);
        }
    }

    _PRIVATE_.set(FluidEventMethod, Object.create(null));
    if ("function"=== typeof FluidEventMethod.manage)
        FluidEventMethod.manage();
    else customElements.define(FluidEventMethod, FluidEventMethod.is)

/* ----------------------------- STATIC PRIVATE ----------------------------- */

/* ---------------------------- PRIVATE METHODS ----------------------------- */
    function callRemoteMethod(node, method, event) {
        if (node && 'function' === typeof node[method])
            node[method](event);
    }

    function onEvent(event) {
        var i, node, n, nodes;

        nodes = getNodeList.call(this, this.on);
    // Exit condition: No nodes
        if (!nodes || !(n = nodes.length)) return;

        if (this.method) {
            if (this.cancel) event.preventDefault();
            if (this.noBubble) event.stopPropagation();
            for (i = 0; i < n; i++) {
                callRemoteMethod(nodes[i], this.method, event);
            }
        }
    }

    function getNodeList(selector) {
        if (selector === 'parent')
            return [this.parentElement];
        else if (selector === 'document')
            return [document];
        else if (selector)
            return document.querySelectorAll(selector);
    }

    function addListeners(selector) {
        var i, node, n, nodes;

    // Exit condition: No selector
        if (!selector) return;
        nodes = getNodeList.call(this, selector);
    // Exit condition: No nodes
        if (!nodes || !(n = nodes.length)) return;

        for (i = 0; i < n; i++) {
            node = nodes[i];
            if (node && node.addEventListener) {
                node.addEventListener(this.event, this._boundEventHandler);
            }
        }
    }

    function removeListeners(selector) {
        var i, node, n, nodes;

    // Exit condition: No selector
        if (!selector) return;
        nodes = getNodeList.call(this, selector);
    // Exit condition: No nodes
        if (!nodes || !(n = nodes.length)) return;

        for (i = 0; i < n; i++) {
            node = nodes[i];
            if (node && node.removeEventListener) {
                node.removeEventListener(this.event, this._boundEventHandler);
            }
        }
    }


}) ();
