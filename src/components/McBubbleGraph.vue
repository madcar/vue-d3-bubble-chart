<template>
  <div>
    <transition-group
      name="bubbles"
      tag="svg"
      :width="dimensions.width"
      :height="dimensions.height"
    >
      <g
        class="bubble-group"
        v-for="bubble in chartData.children"
        :key="bubble.data.name"
        :style="{ transform: `translate(${bubble.x}px, ${bubble.y}px)` }"
      >
        <slot name="chart" v-bind="bubble">
          <circle class="babyname-circle" r="20" fill="gray" />
        </slot>
      </g>
    </transition-group>
    <p>Everything here</p>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  props: {
    data: Array,
    dimensions: {
      type: Object,
      default: () => ({ width: 500, height: 500 })
    }
  },
  //   data() {},
  computed: {
    chartData() {
      const { width, height } = this.dimensions;
      console.log(width, height);
      return d3
        .pack()
        .size([width, height])
        .padding(0)(d3.hierarchy({ children: this.data }).sum(d => d.value));
      // .sort((a, b) => b.value - a.value)
      // .sum(d => d.value);
    }
  },
  methods: {
    async _data() {}
  }
};
</script>

<style>
.bubble-group {
  transition: transform 1s;
}
</style>
