goog.provide('Main');

// ----------------------------------- //
// Goog package dependencies
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.ui.Component');
goog.require('goog.ui.registry');
goog.require('goog.ui.CustomButton');
goog.require('goog.ui.PopupColorPicker');

// ----------------------------------- //
// Custom package dependencies

/**
 * Main
 * @constructor
 */
Main = function()
{
  /** @type {Element} @private */
  this.container_ = null;
};

/**
 * Initialise and render.
 * @param {Object=} data
 */
Main.prototype.init = function(data)
{
 // if(!goog.dom || !goog.dom.getElement) {setTimeout(this.init, 10); return;}

  this.container_ = goog.dom.getElement('main') || goog.dom.createDom(
    goog.dom.TagName.DIV, {'id':'main'}
  );

  this.start_(data);
};

/**
 * Start
 * @param {Object} data
 */
Main.prototype.start_ = function(data)
{
  this.render_(data);
};

/**
 * @param {Object} data
 * @private
 */
Main.prototype.render_ = function(data)
{
  goog.global.console.log(this + '::render()');

  this.pickerBtn_ = new goog.ui.CustomButton('Select Colour');
  this.pickerBtn_.decorate(goog.dom.getElement('pickerBtn'));
  this.pickerBtn_.enterDocument();

  this.picker_ = new goog.ui.PopupColorPicker();
  this.picker_.render();
  this.picker_.attach(this.pickerBtn_.getElement());

  goog.events.listen(this.picker_, 'change', goog.bind(this.onColourSelect, this));
};

/**
 * Handle picker change events and update button background colour.
 * @param {Object} e event object.
 */
Main.prototype.onColourSelect = function(e)
{
    goog.global.console.log(this + '::onColourSelect: ' +
    this.picker_.getSelectedColor().toUpperCase());
    this.pickerBtn_.getElement().style.backgroundColor = this.picker_.getSelectedColor();
}

/**
 * @override
 * @returns {string}
 */
Main.prototype.toString = function()
{
    return 'Main';
}

var app = new Main();

// Expose methods //
goog.exportSymbol('app', app);
goog.exportProperty(Main.prototype, 'init', Main.prototype.init);


