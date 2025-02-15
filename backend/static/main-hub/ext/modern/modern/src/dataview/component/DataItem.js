/**
 * A DataItem is a container for records inside of {@link Ext.dataview.DataView} with useComponents: true.
 * It ties together {@link Ext.data.Model records} to its contained Components. Consider the following example:
 *
 *      @example phone portrait preview
 *     // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! MODEL
 *
 *     Ext.define('TestModel', {
 *         extend: 'Ext.data.Model',
 *         config: {
 *             fields: [{
 *                 name: 'val1'
 *             }, {
 *                 name: 'val2'
 *             }]
 *         }
 *     });
 *
 *     // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! STORE
 *
 *     Ext.define('TestStore', {
 *         extend: 'Ext.data.Store',
 *         config: {
 *             data: [{
 *                 val1: 'A Button',
 *                 val2: 'with text'
 *             }, {
 *                 val1: 'The Button',
 *                 val2: 'more text'
 *             }, {
 *                 val1: 'My Button',
 *                 val2: 'My Text'
 *             }],
 *             model: 'TestModel',
 *             storeId: 'TestStore'
 *         }
 *     });
 *
 *     // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! DATA ITEM
 *
 *     Ext.define('MyDataItem', {
 *         extend: 'Ext.dataview.component.DataItem',
 *         alias: 'widget.mydataitem',
 *         config: {
 *             padding: 10,
 *             layout: {
 *                 type: 'hbox'
 *             },
 *             defaults: {
 *                 margin: 5
 *             },
 *             items: [{
 *                 xtype: 'button',
 *                 text: 'Val1'
 *             }, {
 *                 xtype: 'component',
 *                 flex: 1,
 *                 html: 'val2',
 *                 itemId: 'textCmp'
 *             }]
 *         },
 *         updateRecord: function(record) {
 *             var me = this;
 *
 *             me.down('button').setText(record.get('val1'));
 *             me.down('#textCmp').setHtml(record.get('val2'));
 *
 *             me.callParent(arguments);
 *         }
 *     });
 *
 *     // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! DATA VIEW
 *
 *     Ext.define('MyDataView', {
 *         extend: 'Ext.dataview.DataView',
 *         config: {
 *             defaultType: 'mydataitem',
 *             useComponents: true
 *         }
 *     });
 *
 *     // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! RUN
 *
 *     Ext.create('MyDataView', {
 *         fullscreen: true,
 *         store: Ext.create('TestStore')
 *     });
 *
 * Another way to accomplish this is via a {@link #dataMap dataMap} configuration.
 *
 * For example, lets say you have a `text` configuration which, when applied, gets turned into an instance of an
 * Ext.Component. We want to update the {@link #html} of a sub-component when the 'text' field of the record gets
 * changed.
 *
 * As you can see below, it is simply a matter of setting the key of the object to be the getter of the config
 * (getText), and then give that property a value of an object, which then has 'setHtml' (the html setter) as the key,
 * and 'text' (the field name) as the value. You can continue this for a as many sub-components as you wish.
 *
 *     dataMap: {
 *         // When the record is updated, get the text configuration, and
 *         // call setHtml with the 'text' field of the record.
 *         getText: {
 *             setHtml: 'text'
 *         },
 *
 *         // When the record is updated, get the userName configuration, and
 *         // call setHtml with the 'from_user' field of the record.
 *         getUserName: {
 *             setHtml: 'from_user'
 *         },
 *
 *         // When the record is updated, get the avatar configuration, and
 *         // call `setSrc` with the 'profile_image_url' field of the record.
 *         getAvatar: {
 *             setSrc: 'profile_image_url'
 *         }
 *     }
 */
Ext.define("Ext.dataview.component.DataItem", {
  extend: "Ext.Container",
  xtype: "dataitem",

  config: {
    defaultType: "component",

    /**
     * @cfg {Ext.data.Model} record The model instance of this DataItem. It is controlled by the Component DataView.
     * @accessor
     */
    record: null,

    /**
     * @cfg {String} itemCls
     * An additional CSS class to apply to items within the DataView.
     * @accessor
     */
    itemCls: null,

    /**
     * @cfg dataMap
     * The dataMap allows you to map {@link #record} fields to specific configurations in this component.
     *
     * For example, lets say you have a `text` configuration which, when applied, gets turned into an instance of an Ext.Component.
     * We want to update the {@link #html} of this component when the 'text' field of the record gets changed.
     * For example:
     *
     *      dataMap: {
     *          getText: {
     *              setHtml: 'text'
     *          }
     *      }
     *
     * In this example, it is simply a matter of setting the key of the object to be the getter of the config (`getText`), and then give that
     * property a value of an object, which then has `setHtml` (the html setter) as the key, and `text` (the field name) as the value.
     */
    dataMap: {},

    /**
     * @private
     * @cfg dataview
     */
    dataview: null,

    width: "100%",

    items: [
      {
        xtype: "component"
      }
    ]
  },

  classCls: Ext.baseCSSPrefix + "dataitem",

  updateBaseCls: function (newBaseCls, oldBaseCls) {
    var me = this;

    me.callParent(arguments);
  },

  updateItemCls: function (newCls, oldCls) {
    if (oldCls) {
      this.removeCls(oldCls);
    }
    if (newCls) {
      this.addCls(newCls);
    }
  },

  doMapData: function (dataMap, data, item) {
    var componentName, component, setterMap, setterName;

    for (componentName in dataMap) {
      setterMap = dataMap[componentName];
      component = this[componentName]();
      if (component) {
        for (setterName in setterMap) {
          if (
            data &&
            component[setterName] &&
            data[setterMap[setterName]] !== undefined &&
            data[setterMap[setterName]] !== null
          ) {
            component[setterName](data[setterMap[setterName]]);
          }
        }
      }
    }

    if (item) {
      // Bypassing setter because sometimes we pass the same object (different properties)
      item.updateData(data);
    }
  },

  /**
   * Updates this container's child items, passing through the `dataMap`.
   * @param {Ext.data.Model} newRecord
   * @private
   */
  updateRecord: function (newRecord) {
    if (!newRecord) {
      return;
    }
    this._record = newRecord;

    var me = this,
      dataview = me.dataview || this.getDataview(),
      data = dataview.prepareData(
        newRecord.getData(true),
        dataview.getStore().indexOf(newRecord),
        newRecord
      ),
      items = me.getItems(),
      item = items.first(),
      dataMap = me.getDataMap();

    if (!item) {
      return;
    }
    if (dataMap) {
      this.doMapData(dataMap, data, item);
    }

    /**
     * @event updatedata
     * Fires whenever the data of the DataItem is updated.
     * @param {Ext.dataview.component.DataItem} this The DataItem instance.
     * @param {Object} newData The new data.
     */
    me.fireEvent("updatedata", me, data);
  }
});
