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

            _PROPERTIES_.get(this).handler = onEvent.bind(this);
            _PROPERTIES_.get(this).listen = addListeners.bind(this);
            _PROPERTIES_.get(this).deafen = removeListeners.bind(this);
        }

        connectedCallback() {
            super.connectedCallback();

            this.setAttribute('hidden', '');
            this.setAttribute('aria-hidden', 'true');
            if (this.on)
                _PROPERTIES_.get(this).listen(this.on);
        }

        disconnectedCallback() {
            if (this.on)
                _PROPERTIES_.get(this).deafen(this.on);

            super.disconnectedCallback();
        }

        get method() {
            return _PROPERTIES_.get(this).method;
        }

        get targets() {
            return findNodes.call(
                this,
                this.targetSelector,
                !!this.parentElement ? this.parentElement : this.parentNode.host
            )
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
                'handle',
                'select',
                'method',
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

        onHandleChanged(newValue, oldValue) {
        // Exit Condition:
            if (!this.isConnected) return;

            oldValue &&	(oldValue !== newValue) && _PROPERTIES_.get(this).deafen(this.on);
            newValue &&	_PROPERTIES_.get(this).listen(this.on);
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

        onMethodChanged(newValue, old) {
            _PROPERTIES_.get(this).method = newValue;
        }

        onTargetsChanged(newValue, old) {
            _PROPERTIES_.get(this).targets = newValue;
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
    function onEvent(event) {
        if (this.method) {
            if (this.cancel)
                event.preventDefault();

            if (this.stop) {
                if (this.immediate)
                    event.stopImmediatePropagation();
                else
                    event.stopPropagation();
            }

            this.targets.forEach(el => {
                if (!!el[this.method]
                &&  "function" === typeof el[this.method])
                    el[this.method].call(el, event);
            })
        }
    }

    function findNodes(selector) {
        let nodes;

        if (selector) {
            nodes = [].map.call(
                document.querySelectorAll(selector),
                node => node
            );
            if (!nodes.length && !!defaultValue)
                nodes = [defaultValue];
        }
        else if (!!defaultValue)
            nodes = [defaultValue];

        return nodes;
    }

    function addListeners() {
        let nodes = findNodes(
            this.listenSelector,
            window.document
        );
        nodes.forEach(el => {
            el.addEventListener(this.handle, _PROPERTIES_.get(this).handler);
        })
    }

    function removeListeners() {
        let nodes = findNodes(
            this.listenSelector,
            window.document
        );
        nodes.forEach(el => {
            el.removeEventListener(this.handle, _PROPERTIES_.get(this).handler);
        })
    }
}) ();
