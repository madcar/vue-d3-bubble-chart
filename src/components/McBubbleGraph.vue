<template>
  <div>
    <transition-group
      name="bubbles"
      tag="svg"
      :width="dimensions.width"
      :height="dimensions.height"
      id="bubble-canvas"
      ref="canvas"
    >
      >
      <slot v-bind="chartData.children">
        <McBubble
          v-for="bubble in chartData.children"
          :bubble="bubble"
          :key="bubble.data.name"
          :color="colorFunc(bubble.data.value)"
          ref="bubble"
        />
      </slot>
    </transition-group>
    <p>Everything here</p>
  </div>
</template>

<script>
import * as d3 from "d3";
// import gsap from "gsap";
import McBubble from "@/components/McBubble";
export default {
  components: {
    McBubble
  },
  props: {
    data: Array,
    dimensions: {
      type: Object,
      default: () => ({ width: 500, height: 500 })
    },
    colorScheme: {
      type: String,
      default: "Sinebow"
    }
  },
  //   data() {},
  computed: {
    circles() {
      return this.canvas.selectAll("circle");
    },
    canvas() {
      return d3.select("#bubble-canvas");
    },
    chartData() {
      const { width, height } = this.dimensions;
      return d3
        .pack()
        .size([width, height])
        .padding(0)(d3.hierarchy({ children: this.data }).sum(d => d.value));
      // .sort((a, b) => b.value - a.value)
      // .sum(d => d.value);
    }
  },
  methods: {
    // enter(el, done) {
    //   console.log("entering");
    //   console.log(el);
    //   done();
    // },
    async _data() {},
    colorFunc(color) {
      const scaleFunc = d3
        .scaleLinear()
        .domain(d3.extent(this.data, d => d.value))
        .range([0, 1]);
      return d3["interpolate" + this.colorScheme](scaleFunc(color));
      // return scaleFunc(color);
    }
  },
  mounted() {
    // console.log(this.$refs.bubble.map(bubble => bubble.$refs.circle));
  }
};
</script>

<style>
/* .bubble-group {
  transition: transform 1s;
} */
.bubbles-enter {
  transform: scale(0, 0);
}
.bubbles-enter-to {
  transition-property: scale(1, 1);
}
.bubbles-enter-active {
  transition: transform 1s;
}
</style>
