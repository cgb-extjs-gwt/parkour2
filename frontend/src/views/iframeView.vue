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
        data: {
          urls: ["url1", "url2", "url3"],
        },
      },
    };
  },
};
</script>
<style></style>
