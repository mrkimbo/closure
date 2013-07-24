goog.provide('Main');

// ----------------------------------- //
// Goog package dependencies
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.ui.Component');
goog.require('goog.ui.registry');
//goog.require('goog.ui.Gauge');

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

	if(!goog.dom) {setTimeout(this.init, 10); return;}

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

	/*var gauge = new goog.ui.Gauge(200, 200);
    gauge.addBackgroundColor(50, 60, goog.ui.Gauge.RED);
    gauge.addBackgroundColor(35, 50, goog.ui.Gauge.YELLOW);
    gauge.addBackgroundColor(15, 25, goog.ui.Gauge.GREEN);
    gauge.setMinimum(15);
    gauge.setMaximum(60);
    gauge.setTicks(3, 6);
    gauge.setValue(40);
    gauge.setTitleBottom("RPM");

  this.content_ = gauge;
  this.content_.setModel(data.content);
  this.content_.render(this.container_);*/
};

var app = new Main();
app.init();

// Expose methods //
goog.exportSymbol('app', app);
goog.exportProperty(Main.prototype, 'init', Main.prototype.init);
goog.exportProperty(Main.prototype, 'initData', Main.prototype.initData);


