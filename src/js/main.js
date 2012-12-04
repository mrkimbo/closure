goog.provide('Main');

// ----------------------------------- //
// Goog package dependencies
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.ui.Component');
goog.require('goog.ui.registry');

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
  /** @type {goog.ui.Component} @private */
  this.content_ = null;
};

/**
 * Initialise and render.
 */
Main.prototype.init = function() {
  this.container_ = goog.dom.getElement('main') || goog.dom.createDom(
    goog.dom.TagName.DIV, {'id':'main'}
  );

  this.start_({});
};

/**
 * Init data
 * @param {Object} data
 */
Main.prototype.initData = function(data)
{
  this.start_(data);
};

/**
 * Start
 * @param {Object} data
 */
Main.prototype.start_ = function(data)
{
  if(this.content_) return;

  if(!this.container_.hasChildNodes())
  {
    this.render_(data);
  }
  else
  {
    var childElement = goog.dom.getFirstElementChild(this.container_);
    this.content_ = goog.ui.registry.getDecorator(childElement);
    this.content_.setModel(data);
    this.content_.decorate(childElement);
  }
};

/**
 *
 * @param {Object} data
 * @private
 */
Main.prototype.render_ = function(data)
{
  goog.global.console.log('Main::render()');

  this.content_ = new goog.ui.Component();
  this.content_.setModel(data.content);
  this.content_.render(this.container_);
};

var app = new Main();
app.init();

// Expose methods //
goog.exportSymbol('app', app);
goog.exportProperty(Main.prototype, 'initData', Main.prototype.initData);


