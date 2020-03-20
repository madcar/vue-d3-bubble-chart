<template>
  <transition name="bubble" @beforeEnter="exit">
    <g
      class="bubble-group"
      :key="bubble.data.name"
      :style="{ transform: position }"
    >
      <slot name="leaf" v-bind="bubble">
        <circle
          class="babyname-circle"
          :r="radius"
          :fill="color"
          ref="circle"
        />
        <text>{{ bubble.data.name }}<br />{{ offsetX }}</text>
      </slot>
    </g>
  </transition>
</template>

<script>
import gsap from "gsap";
export default {
  data() {
    return {
      offsetX: this.bubble.x || 0,
      offsetY: this.bubble.y || 0,
      radius: 0,
      entered: false
    };
  },
  props: {
    bubble: {
      default: () => ({ x: 0, y: 0 }),
      type: Object
    },
    color: String
  },
  computed: {
    position() {
      return `translate(${this.offsetX}px, ${this.offsetY}px)`;
    }
  },
  watch: {
    bubble: {
      handler(data) {
        gsap.to(this.$data, {
          duration: 0.5,
          offsetX: data.x,
          offsetY: data.y,
          radius: data.r
        });
      },
      immediate: true
    }
  },
  methods: {
    exit(el) {
      console.log(el);
    }
  }
};
</script>

<style></style>
