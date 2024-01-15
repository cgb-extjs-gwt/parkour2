<template>
  <div>
    <div
      id="header"
      style="
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        border: 1px solid black;
      "
    >
      <div style="height: 120px; background: #1bace6; width: 290px">
        <font-awesome-icon
          style="font-size: 28px"
          icon="fa-solid fa-chalkboard-user"
          size="xl"
        />
        <span
          class="text-large"
          style="font-size: 20px; font-weight: bold; margin-left: 5px"
        >
          Parkour LIMS</span
        >
      </div>
      <div style="height: 120px; background: #eeeeee; flex: 1"></div>
    </div>
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between">
      <div id="navigation-bar">
        <ul>
          <li v-for="(url, index) in object.data['urls']" :key="index">
            <div style="height: 60px; background: #1bace6; width: 290px">
              <font-awesome-icon
                style="font-size: 28px"
                icon="fa-solid fa-chalkboard-user"
                size="xl"
              />
              <span
                class="text-large"
                style="font-size: 20px; font-weight: bold; margin-left: 5px"
              >
                {{ url }}</span
              >
            </div>
          </li>
        </ul>
      </div>
      <div style="background: #eeeeee; flex: 1">
        <div class="iframe">
          <iframe
            src="http://localhost:9980/#requests"
            height="iframeHeight"
            scrolling="iframeScrollable"
            frameborder="0"
            style="width: 1200px; height: 600px"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      object: {
        userData: {},
        navigationItems: [
          { name: "Requests", icon: "", url: "#requests", children: [] },
          {
            name: "Libraries & Samples",
            icon: "",
            url: "#libraries",
            children: [],
          },
          {
            name: "Incoming Libraries & Samples",
            icon: "",
            url: "#incoming-libraries",
            children: [],
          },
          {
            name: "Index Generator",
            icon: "",
            url: "#index-generator",
            children: [],
          },
          {
            name: "Preparation",
            icon: "",
            url: "#preparation",
            children: [],
          },
          { name: "Pooling", icon: "", url: "#pooling", children: [] },
          {
            name: "Load Flowcell",
            icon: "",
            url: "#flowcells",
            children: [],
          },
          { name: "Invoicing", icon: "", url: "#invoicing", children: [] },
          { name: "Usage", icon: "", url: "#usage", children: [] },
          {
            name: "Statistics",
            icon: "",
            url: "",
            children: [
              { name: "Runs", icon: "", url: "#run-statistics" },
              { name: "Sequences", icon: "", url: "#sequences-statistics" },
            ],
          },
        ],
        headerItems: [
          { name: "Site Administration", icon: "", url: "admin" },
          {
            name: "Statistics",
            icon: "",
            url: "https://github.com/maxplanck-ie/parkour2/wiki/Introduction",
          },
          { name: "Statistics", icon: "", url: "vue/duties" },
          { name: "Statistics", icon: "", url: "logout" },
        ],
      },
    };
  },
};
</script>
<style>
/*
 * This is is imported by virtue of "sass.etc" in "app.json".
 */

 .color-mpg-green {
    color: #006c66 !important;
}

.color-bluish-grey {
    color: #29485d !important;
}

.bg-color-beige {
    background-color: #ecebe5 !important;
}

.display-none {
    display: none !important;
}

.header-username {
    font-weight: bold !important;
}

.x-treelist-item-tool,
.x-treelist-navigation .x-treelist-row-over > * > .x-treelist-item-icon {
    transition: all .2s ease-in-out; 
}

.x-treelist-item-tool:hover,
.x-treelist-navigation .x-treelist-row-over > * > .x-treelist-item-icon {
    color: #006c66 !important;
    transform: scale(1.3); 
}

.x-treelist-navigation .x-treelist-item-selected > .x-treelist-row,
.x-treelist-item-selected.x-treelist-item-tool,
.x-treelist-item-selected.x-treelist-item-expanded, 
.x-treelist-item-tool:hover,
.x-treelist-row-over,
.x-treelist-item-expanded > ul > li {
    background-color: #dbdbd4 !important;
}

.x-treelist-navigation .x-treelist-item-floated > .x-treelist-row,
.x-treelist-item-tool,
.x-treelist-item-leaf,
.x-treelist-item-expandable {
    background-color: #ecebe5 !important;
}

.x-treelist-item-text,
.x-treelist-item-expander {
    color: #29485d !important;
    font-weight: bold !important;
}

.x-treelist-item-expanded > ul > li > div > div {
    margin-left: 22px !important;
}

.noty_bar.noty_type__success {
    background-color: #00b1ea !important;
    border-color: #00b1ea !important;
    color: #ffffff !important;
}

.noty_bar.noty_type__error {
    background-color: #e74c3c !important;
    border-color: #c0392b !important;
    color: #ffffff !important;
}

.noty_bar.noty_type__warning {
    background-color: #ef7c00 !important;
    border-color: #d66f00 !important;
    color: #ffffff !important;
}

.noty_bar.noty_type__information {
    background-color: #006c66 !important;
    border-color: #005555 !important;
    color: #ffffff !important;
}
</style>

