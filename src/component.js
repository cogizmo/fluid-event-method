"use strict";
(function defineElement() {
// -----------------------------------------------------------------------------
//  ELEMENT DEFINITION
// -----------------------------------------------------------------------------
    const _PROPERTIES_ = new WeakMap();
    class FluidTriggeredMethod extends Cogizmo {
        static get is() {   return 'fluid-triggered-method';   }

    /* Lifecycle Callbacks  - - - - - - - - - - - - - - - - - - - - - - - - - */
        constructor() {
            super();
            _PROPERTIES_.set(this, Object.create(null));

            _PROPERTIES_.get(this).onEvent = onEvent.bind(this);
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

        get targets() {
            if (!!_PROPERTIES_.get(this).targets)
                return _PROPERTIES_.get(this).targets;
            else if (!!this.parentElement)
                return _PROPERTIES_.get(this).targets = [this.parentElement];
            else
                return _PROPERTIES_.get(this).targets = [this.parentNode.host];
        }

        get stop() {
            return this.hasAttribute('stop');
        }

        set stop(value) {
            if (!!value)
                this.setAttribute('stop', '');
            else
                this.removeAttribute('stop');
        }

        get immediate() {
            return this.hasAttribute('immediate');
        }

        set immediate(value) {
            if (!!value)
                this.setAttribute('immediate', '');
            else
                this.removeAttribute('immediate');
        }

        get cancel() {
            return this.hasAttribute('cancel');
        }

        set cancel(value) {
            if (!!value)
                this.setAttribute('cancel', '');
            else
                this.removeAttribute('cancel');
        }

    /* Element Attributes - - - - - - - - - - - - - - - - - - - - - - - - - - */
        static get observedAttributes() {
            // List attributes here.
            let attrs = [
                'event',
                'select',
                'call',
                'targets',
                'stop',
                'immediate',
                'cancel'
            ];

            // Get superclasses observed attributes
            let a = [];
            if (!!super.observedAttributes
            &&  super.observedAttributes instanceof Array)
                a = super.observedAttributes;
            // Merge arrays without duplicates
            return a.concat(attrs.filter(item => a.indexOf(item) < 0));

        }

        attributeChangedCallback(name, old, value) {
        // Maintain native behavior and (if applicable) enhancements
            if ("function" === typeof super.attributeChangedCallback)
                super.attributeChangedCallback(name, old, value);

        }

        onEventChanged(newValue, oldValue) {
        // Exit Condition:
            if (!this.isConnected) return;

            oldValue &&	(oldValue !== newValue) && removeListeners.call(this, this.on);
            newValue &&	addListeners.call(this, this.on);
        }

        onCallChanged(newValue, old) {

        }

        onSelectChanged(newValue, oldValue) {
        // Exit Condition:
            if (!this.isConnected) return;

        // Remove all Event Listeners
            if (oldValue && oldValue !== newValue)
                removeListeners.call(this, oldValue);

            if (!newValue)
                this.on = 'parent';
            else if (this.isAttached) {
                addListeners.call(this, newValue);
            }
        }

        onTargetsChanged(newValue, old) {
            if (!!newValue)
                _PROPERTIES_.get(this).targets = [].map.call(document.querySelectorAll(newValue), (v) => {
                    return v;
                });
            else if (!!this.parentElement)
                _PROPERTIES_.get(this).targets = [this.parentElement];
            else
                _PROPERTIES_.get(this).targets = [this.parentNode.host];
        }

        /* Public Methods (below) - - - - - - - - - - - - - - - - - - - - - - - - */
        activate(node, method, event) {
            if (node && 'function' === typeof node[method])
                node[method](event);
        }
    }

    _PROPERTIES_.set(FluidTriggeredMethod, Object.create(null));
    //if ("function"=== typeof FluidTriggeredMethod.manage)
        FluidTriggeredMethod.manage();
    //else customElements.define(FluidTriggeredMethod, FluidEventMethod.is)

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
            if (this.stop) event.stopPropagation();
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
