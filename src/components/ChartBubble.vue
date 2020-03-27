<template>
  <transition name="bubble">
    <g
      class="bubble-group"
      :key="bubble.data.name"
      :style="{ transform: position }"
      :transform="position"
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
      // offsetX: this.bubble.x || 0,
      // offsetY: this.bubble.y || 0,
      // radius: this.bubble.r || 0,
      // transColor: this.color,
      // entered: false,
      leaf: this.bubble,
    }
  },
  props: {
    bubble: {
      default: () => ({ x: 0, y: 0 }),
      type: Object,
    },
    color: String,
  },
  computed: {
    position() {
      return `matrix(1, 0, 0, 1, ${this.leaf.x}, ${this.leaf.y})`
    },
  },
  watch: {
    bubble: {
      handler(data) {
        console.log('handler data', data)
        // gsap.to(this.$data, {
        //   offsetX: data.x,
        //   offsetY: data.y,
        //   radius: data.r,
        // })
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
    color(val) {
      gsap.to(this.$data, {
        transColor: val,
      })
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
