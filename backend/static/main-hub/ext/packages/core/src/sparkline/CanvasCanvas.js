/**
 * @private
 */
Ext.define("Ext.sparkline.CanvasCanvas", {
  extend: "Ext.sparkline.CanvasBase",

  statics: {
    contextOverrides: (function () {
      var ratio = window.devicePixelRatio || 1;
      return {
        moveTo: function (x, y) {
          // Convert to RTL
          if (this.rtl) {
            x = this.canvas.width - x - 1;
          }
          this.$moveTo(x * ratio, y * ratio);
        },
        lineTo: function (x, y) {
          // Convert to RTL
          if (this.rtl) {
            x = this.canvas.width - x - 1;
          }
          this.$lineTo(x * ratio, y * ratio);
        },
        arc: function (x, y, radius, startAngle, endAngle, counterclockwise) {
          // Convert to RTL
          if (this.rtl) {
            x = this.canvas.width - x - 1;
          }
          this.$arc(
            x * ratio,
            y * ratio,
            radius * ratio,
            startAngle,
            endAngle,
            counterclockwise
          );
        },
        clearRect: function (x, y, width, height) {
          // Convert to RTL
          if (this.rtl) {
            x = this.canvas.width - x - width;
          }
          this.$clearRect(x * ratio, y * ratio, width * ratio, height * ratio);
        }
      };
    })()
  },

  setWidth: function (width) {
    this.callParent(arguments);
    this.owner.element.dom.width = width * (window.devicePixelRatio || 1);
  },

  setHeight: function (height) {
    this.callParent(arguments);
    this.owner.element.dom.height = height * (window.devicePixelRatio || 1);
  },

  onOwnerUpdate: function () {
    var me = this;

    me.el = me.owner.element;
    me.interact = !me.owner.initialConfig.disableInteraction;
    me.shapes = {};
    me.shapeseq = [];
    me.currentTargetShapeId = me.lastShapeId = null;
  },

  _getContext: function (lineColor, fillColor, lineWidth) {
    var context = this.el.dom.getContext("2d"),
      overrides = Ext.sparkline.CanvasCanvas.contextOverrides,
      name;

    if (!this.context) {
      for (name in overrides) {
        context["$" + name] = context[name];
      }
      Ext.apply(context, overrides);
      context.rtl = this.rtl;
      this.context = context;
    }
    if (lineColor != null) {
      context.strokeStyle = lineColor;
    }
    context.lineWidth = lineWidth || 1;
    if (fillColor != null) {
      context.fillStyle = fillColor;
    }
    return context;
  },

  reset: function () {
    var context = this._getContext();
    context.clearRect(0, 0, this.pixelWidth, this.pixelHeight);
    this.shapes = {};
    this.shapeseq = [];
    this.currentTargetShapeId = this.lastShapeId = null;
  },

  _drawShape: function (shapeid, path, lineColor, fillColor, lineWidth) {
    var context = this._getContext(lineColor, fillColor, lineWidth),
      xIncr = this.rtl ? -0.5 : 0.5,
      i,
      plen;

    context.beginPath();
    context.moveTo(path[0][0] + xIncr, path[0][1] + 0.5);
    for (i = 1, plen = path.length; i < plen; i++) {
      context.lineTo(path[i][0] + xIncr, path[i][1] + 0.5); // the 0.5 offset gives us crisp pixel-width lines
    }
    if (lineColor != null) {
      context.stroke();
    }
    if (fillColor != null) {
      context.fill();
    }
    if (
      this.targetX != null &&
      this.targetY != null &&
      context.isPointInPath(this.targetX, this.targetY)
    ) {
      this.currentTargetShapeId = shapeid;
    }
  },

  _drawCircle: function (
    shapeid,
    x,
    y,
    radius,
    lineColor,
    fillColor,
    lineWidth
  ) {
    var context = this._getContext(lineColor, fillColor, lineWidth);

    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    if (
      this.targetX != null &&
      this.targetY != null &&
      context.isPointInPath(this.targetX, this.targetY)
    ) {
      this.currentTargetShapeId = shapeid;
    }
    if (lineColor != null) {
      context.stroke();
    }
    if (fillColor != null) {
      context.fill();
    }
  },

  _drawPieSlice: function (
    shapeid,
    x,
    y,
    radius,
    startAngle,
    endAngle,
    lineColor,
    fillColor
  ) {
    var context = this._getContext(lineColor, fillColor);

    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, radius, startAngle, endAngle, false);
    context.lineTo(x, y);
    context.closePath();
    if (lineColor != null) {
      context.stroke();
    }
    if (fillColor) {
      context.fill();
    }
    if (
      this.targetX !== undefined &&
      this.targetY !== undefined &&
      context.isPointInPath(this.targetX, this.targetY)
    ) {
      this.currentTargetShapeId = shapeid;
    }
  },

  _drawRect: function (shapeid, x, y, width, height, lineColor, fillColor) {
    return this._drawShape(
      shapeid,
      [
        [x, y],
        [x + width, y],
        [x + width, y + height],
        [x, y + height],
        [x, y]
      ],
      lineColor,
      fillColor
    );
  },

  appendShape: function (shape) {
    this.shapes[shape.id] = shape;
    this.shapeseq.push(shape.id);
    this.lastShapeId = shape.id;
    return shape.id;
  },

  replaceWithShape: function (shapeid, shape) {
    var shapeseq = this.shapeseq,
      i;
    this.shapes[shape.id] = shape;
    for (i = shapeseq.length; i--; ) {
      if (shapeseq[i] === shapeid) {
        shapeseq[i] = shape.id;
      }
    }
    delete this.shapes[shapeid];
  },

  replaceWithShapes: function (shapeids, shapes) {
    var shapeseq = this.shapeseq,
      shapemap = {},
      sid,
      i,
      first;

    for (i = shapeids.length; i--; ) {
      shapemap[shapeids[i]] = true;
    }
    for (i = shapeseq.length; i--; ) {
      sid = shapeseq[i];
      if (shapemap[sid]) {
        shapeseq.splice(i, 1);
        delete this.shapes[sid];
        first = i;
      }
    }
    for (i = shapes.length; i--; ) {
      shapeseq.splice(first, 0, shapes[i].id);
      this.shapes[shapes[i].id] = shapes[i];
    }
  },

  insertAfterShape: function (shapeid, shape) {
    var shapeseq = this.shapeseq,
      i;
    for (i = shapeseq.length; i--; ) {
      if (shapeseq[i] === shapeid) {
        shapeseq.splice(i + 1, 0, shape.id);
        this.shapes[shape.id] = shape;
        return;
      }
    }
  },

  removeShapeId: function (shapeid) {
    var shapeseq = this.shapeseq,
      i;
    for (i = shapeseq.length; i--; ) {
      if (shapeseq[i] === shapeid) {
        shapeseq.splice(i, 1);
        break;
      }
    }
    delete this.shapes[shapeid];
  },

  getShapeAt: function (x, y) {
    // Convert to RTL
    if (this.rtl) {
      x = this.el.dom.width - x - 1;
    }
    this.targetX = x;
    this.targetY = y;
    this.render();
    return this.currentTargetShapeId;
  },

  render: function () {
    var shapeseq = this.shapeseq,
      shapes = this.shapes,
      shapeCount = shapeseq.length,
      context = this._getContext(),
      shapeid,
      shape,
      i;

    context.clearRect(0, 0, this.pixelWidth, this.pixelHeight);
    for (i = 0; i < shapeCount; i++) {
      shapeid = shapeseq[i];
      shape = shapes[shapeid];
      this["_draw" + shape.type].apply(this, shape.args);
    }
    if (!this.interact) {
      // not interactive so no need to keep the shapes array
      this.shapes = {};
      this.shapeseq = [];
    }
  }
});
