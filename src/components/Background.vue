<template>
  <div class="bg" aria-hidden="true" />
</template>

<style scoped>
.bg {
  pointer-events: none;
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/bg-sm.webp') no-repeat fixed;
  background-size: cover;
  filter: brightness(0.5);
}

@media screen and (min-width: 1024px) {
  .bg {
    background: url('/bg-md.webp') no-repeat fixed;
  }
}

@media screen and (min-width: 2048px) {
  .bg {
    background: url('/bg.webp') no-repeat fixed;
  }
}
</style>
