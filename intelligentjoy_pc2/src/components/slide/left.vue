<template lang="html">
  <div class="slide-nav">
    <ul>
      <li v-for="item in slideList">
        <router-link :to="{ name: item }"  :class="[item == activeIndex?'active':'']" >
          {{ $t("footer."+item) }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: this.$route.name,
      slideList: [
        // "aboutUs",
        "contact",
        "agreement",
        "statement"
      ]
    }
  },
  watch: {
    $route(to) {
      this.activeIndex = to.name;
    }
  }
}
</script>

<style lang ="less">
.slide-nav {
    width: 200px;
    overflow: hidden;
    border-radius: 2px;
    & ul {
        li a {
            display: block;
            height: 59px;
            line-height: 59px;
            padding: 0 0 0 31px;
            font-size: 16px;
            color: #333;
            background: #fff;
            border-bottom: 1px solid #f2f2f2;
            &.active {
                color: #fff;
                background: #63acff url("../slide/images/arrow.png") 171px
                    center no-repeat;
                background-size: 17px 17px;
            }
        }
    }
}
</style>
