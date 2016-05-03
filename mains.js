/*
 * mains.js
 */
var MainsMain = require(__dirname+'/main.js');

/**
 * Create a new Mains that let users create sub-mains.
 * @return {Mappings}
 */
function Mains() { }

/**
 * Create a new MainsMain object.
 * @return {MainsMain}
 */
Mains.prototype.main = function() {
  return new MainsMain();
}

module.exports = Mains;
