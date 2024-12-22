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
  background: url('/desktop-light.webp') no-repeat fixed;
  background-size: cover;
  filter: brightness(1.3) blur(5px);
}

@media (prefers-color-scheme: dark) {
  .bg {
    background: url('/desktop-dark.webp') no-repeat fixed;
    background-size: cover;
    filter: blur(5px);
  }
}
</style>
