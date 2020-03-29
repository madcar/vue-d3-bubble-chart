<template>
  <transition name="bubble">
    <g
      class="bubble-group"
      :key="bubble.data.name"
      :style="{ transform: position }"
      :transform="position"
      :data-x="bubble.x"
      :data-y="bubble.y"
    >
      <slot :leaf="leaf">
        <circle
          class="babyname-circle"
          :r="$data.radius"
          :fill="leaf.color"
          ref="circle"
        />
        <text
          class="bubble-label"
          :font-size="(bubble.r * 2) / bubble.data.name.length"
          :style="{ width: bubble.r * 2, height: bubble.r * 2 }"
          >{{ bubble.data.name }}</text
        >
      </slot>
    </g>
  </transition>
</template>

<script>
import gsap from 'gsap'
export default {
  data() {
    return {
      leaf: this.bubble,
    }
  },
  props: {
    bubble: {
      default: () => ({ x: 0, y: 0 }),
      type: Object,
    },
  },
  computed: {
    position() {
      return `matrix(1, 0, 0, 1, ${this.leaf.x}, ${this.leaf.y})`
    },
  },
  watch: {
    bubble: {
      handler(data) {
        gsap.to(this.$data.leaf, {
          x: data.x,
          y: data.y,
          r: data.r,
          color: data.color,
          delay: 0.3,
          duration: 1,
        })
      },
      immediate: true,
    },
  },
}
</script>

<style>
.bubble-group {
  dominant-baseline: central;
  text-anchor: middle;
}
</style>
