(function umd(root, factory) {

  if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.landmark = factory();
  }

})(this, function factory() {

  var api = {};

  api.create = function(DOMNode, options) {
    // track the collapsed state
    var collapsed = true;
    var visited = false;
    var position = options.position || 'landmark-top-left';

    // static nodes are not supported, so we change them to relative
    if (DOMNode.style.position === 'static') {
      DOMNode.style.position = 'relative';
    }

    // main point of interest toggler
    var poi = document.createElement('div');
    poi.className = 'landmark-poi ' + position;

    // contains arrow elements
    var arrowContainer = document.createElement('div');
    arrowContainer.className = 'arrow-container';
    poi.appendChild(arrowContainer);

    // main arrow holder
    var arrow = document.createElement('div');
    arrow.className = 'landmark-arrow collapsed';
    arrowContainer.appendChild(arrow);

    // upper arrow indicator
    var arrowUpper = document.createElement('span');
    arrowUpper.className = 'landmark-arrow-upper';
    arrow.appendChild(arrowUpper);

    // lower arrow indicator
    var arrowLower = document.createElement('span');
    arrowLower.className = 'landmark-arrow-lower';
    arrow.appendChild(arrowLower);

    // add poi
    DOMNode.appendChild(poi);

    /**************************************************
     * Event Listeners
     */

    poi.addEventListener('click', function(e) {
      e.preventDefault();
      collapsed = !collapsed;
      arrow.className = 'landmark-arrow';
      arrow.className += collapsed ? ' collapsed' : '';
      poi.className += visited ? '' : ' visited';
      visited = true;

      // if the poi got uncollapsed call the onOpen handler
      if (typeof options.onOpen === 'function' && !collapsed) {
        options.onOpen(DOMNode, e);
      }

      // if the poi got collapsed cal the onClose handler
      if (typeof options.onClose === 'function' && collapsed) {
        options.onClose(DOMNode, e);
      }
    });

    return poi;

  };

  return api;

});
