<template>
  <div class="header">
    <font-awesome-icon
      style="font-size: 28px"
      icon="fa-solid fa-chalkboard-user"
      size="xl"
    />
    <span
      class="text-large"
      style="font-size: 20px; font-weight: bold; margin-left: 5px"
    >
      Manage Duties</span
    >
  </div>
  <div
    class="parent-container"
    style="
      padding: 15px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    "
  >
    <div class="iframe">
      <iframe
        src="http://localhost:9980/#requests"
        height="iframeHeight"
        scrolling="iframeScrollable"
        frameborder="0"
        style="width: 1200px; height: 600px;"
      />
    </div>
  </div>
</template>

<script></script>

<style>
.header {
  color: white;
  background: #006c66;
  padding: 16px 20px;
  width: 100% !important;
}
</style>
