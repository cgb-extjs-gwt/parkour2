Ext.define("MainHub.view.requests.FilePathsWindow", {
  extend: "Ext.window.Window",
  requires: ["MainHub.view.requests.FilePathsWindowController"],
  controller: "requests-filePathsWindow",

  height: 485,
  width: 450,
  modal: true,
  resizable: false,
  autoShow: true,
  layout: {
    type: "vbox",
    align: "stretch"
  },

  items: [
    {
      xtype: "container",
      itemId: "filepaths-container",
      padding: 10,
      border: 0,
      defaults: {
        labelWidth: 100
      },
      items: [
        {
          xtype: "container",
          items: [
            {
              xtype: "label",
              text: "Request Name:",
              style: {
                fontWeight: "bold"
              },
              margin: "10 10 10 0"
            },
            {
              xtype: "label",
              itemId: "request-name",
              name: "request-name",
              margin: "10 0 10 0"
            }
          ],
          style: {
            border: "1px solid #d4d4d4"
          },
          margin: "0 0 10 0",
          padding: "5"
        },
        {
          xtype: "container",
          items: [
            {
              xtype: "container",
              layout: {
                type: "hbox",
                align: "middle"
              },
              items: [
                {
                  xtype: "label",
                  text: "Request File Paths:",
                  name: "file-paths-label",
                  style: {
                    fontWeight: "bold"
                  },
                  flex: 1
                },
                {
                  xtype: "combobox",
                  reference: "osComboBox",
                  store: ["Linux", "macOS", "Windows"],
                  queryMode: "local",
                  displayField: "name",
                  valueField: "name",
                  width: 150,
                  margin: "0 0 0 10"
                }
              ]
            },
            {
              xtype: "container",
              itemId: "dynamic-container",
              margin: "10 0 10 15",
              padding: "5",
              style: {
                height: "270px",
                overflowY: "scroll"
              }
            }
          ],
          style: {
            border: "1px solid #d4d4d4"
          },
          margin: "0 0 10 0",
          padding: "5"
        }
      ]
    }
  ],

  bbar: [
    "->",
    {
      xtype: "button",
      itemId: "close-button",
      text: "Close",
      handler: function () {
        this.up("window").close();
      }
    }
  ],

  listeners: {
    afterrender: "getFilePaths"
  }
});
