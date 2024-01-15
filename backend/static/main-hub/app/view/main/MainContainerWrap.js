Ext.define("MainHub.view.main.MainContainerWrap", {
  extend: "Ext.container.Container",
  xtype: "maincontainerwrap",

  requires: [],

  scrollable: "y",

  layout: {
    type: "hbox",
    align: "stretchmax",

    // Tell the layout to animate the x/width of the child items.
    animate: true,
    animatePolicy: {
      x: true,
      width: true,
    },
  },

  beforeLayout: function () {
    // We setup some minHeights dynamically to ensure we stretch to fill the height
    // of the viewport minus the top toolbar

    var me = this, height = Ext.Element.getViewportHeight();

    me.minHeight = height;
    me.setHeight(height);
    me.callParent(arguments);
  },
});
