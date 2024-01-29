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
        <ul class="list-style-none">
          <li v-for="item in navigationItems" :id="item.id">
            <div style="height: 60px; background: #1bace6; width: 290px">
              <font-awesome-icon
                style="font-size: 28px"
                :icon="item.icon"
                size="xl"
              />
              <span
                class="text-large"
                style="font-size: 20px; font-weight: bold; margin-left: 5px"
              >
                {{ item.name }}</span
              >
            </div>
          </li>
        </ul>
      </div>
      <div style="background: #eeeeee; flex: 1">
        <div class="navigation-page">
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
      userData: {},
      navigationItems: [
        {
          id: "requests",
          name: "Requests",
          icon: "fa-solid fa-file-text",
          url: "#requests",
          children: [],
        },
        {
          id: "libraries-and-samples",
          name: "Libraries & Samples",
          icon: "fa-solid fa-flask",
          url: "#libraries",
          children: [],
        },
        {
          id: "incoming-libraries-and-samples",
          name: "Incoming Libraries & Samples",
          icon: "fa-solid fa-arrow-down",
          url: "#incoming-libraries",
          children: [],
        },
        {
          id: "index-generator",
          name: "Index Generator",
          icon: "fa-solid fa-cogs",
          url: "#index-generator",
          children: [],
        },
        {
          id: "preparation",
          name: "Preparation",
          icon: "fa-solid fa-table",
          url: "#preparation",
          children: [],
        },
        {
          id: "pooling",
          name: "Pooling",
          icon: "fa-solid fa-sort-amount-desc",
          url: "#pooling",
          children: [],
        },
        {
          id: "load-flowcell",
          name: "Load Flowcell",
          icon: "fa-solid fa-level-down",
          url: "#flowcells",
          children: [],
        },
        {
          id: "invoicing",
          name: "Invoicing",
          icon: "fa-solid fa-eur",
          url: "#invoicing",
          children: [],
        },
        {
          id: "usage",
          name: "Usage",
          icon: "fa-solid fa-pie-chart",
          url: "#usage",
          children: [],
        },
        {
          id: "statistics",
          name: "Statistics",
          icon: "fa-solid fa-line-chart",
          url: "",
          children: [
            {
              id: "statistics-runs",
              name: "Runs",
              icon: "",
              url: "#run-statistics",
            },
            {
              id: "statistics-sequences",
              name: "Sequences",
              icon: "",
              url: "#sequences-statistics",
            },
          ],
        },
      ],
      headerItems: [
        {
          id: "site-administration",
          name: "Site Administration",
          icon: "fa-cog",
          url: "admin",
        },
        {
          id: "documentation",
          name: "Documentation",
          icon: "fa-book",
          url: "https://github.com/maxplanck-ie/parkour2/wiki/Introduction",
        },
        {
          id: "duties",
          name: "Duties",
          icon: "fa-calendar",
          url: "vue/duties",
        },
        { id: "logout", name: "Logout", icon: "fa-sign-out", url: "logout" },
      ],
    };
  },
};
</script>
<style>
.header-username {
  font-weight: bold !important;
}

.x-treelist-item-tool,
.x-treelist-navigation .x-treelist-row-over > * > .x-treelist-item-icon {
  transition: all 0.2s ease-in-out;
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
</style>
