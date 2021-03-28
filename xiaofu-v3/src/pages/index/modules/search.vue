<style scoped>
.c-search { width: 100%; position: fixed; top: 100px; left: 0; z-index: 500; }
.c-search-bar { margin: 47px 25px; display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 5; }
.c-search-bar input { width: 508px; height: 67px; line-height: 67px; background-color: #ffffff; border-radius: 34px; border: none; font-size: 24px; box-sizing: border-box; padding-left: 32px; }
.c-search-bar input.holder { background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAMAAAAPzWOAAAAAllBMVEUAAADe3t7b3t7c3d3c3t7c3d3f4ODh4eHn5+fb3Nzc3d3l5eXc3d3c3t7d3t7c3d3c3Nzb3d3d3d3c3d3d3t7e39/h4eHc3d3c3d3b3Nzc3d3c3d3c3d3c3t7d3d3d3d3e3t7d3d3e39/g4OD////////c3t7c3t7d3d3b3Nzc3d3c3d3c3d3c3d3d39/d4ODc3Nzc3d1+r6HxAAAAMXRSTlMAY2TweNQoEgr7rw7eg13446uUfnE5GaBY8+fayYpRSkU0MB0GA21qWc7DuLKHPySpuEcpSAAAAjpJREFUWMPtlseSo0AQBUuDEx7kkHcjb0aT//9zG5wU20BDx+xpY/KuFGVegSh45yUqi+GnGNC3LUqiYDXqTXunOHco8QeTropjLwNY2q68mZzvKTAb9js5dg5g2dX/DJMImK+lnWkK6cqTOg6jOTBsdcTAd3MDwxWQ60vqB8BIdGxmcNWOKQBrI3rcCJxQW0vkShveDR7Hxp6C5Uo74QKeTbNNYSNdeFmQ1O+Yo/RUw9ZnVru8PfiWrtgwqJtuRto9YIcI/1XrXkl3LpBX52ZheWLAFXaicAJbTNhCIQpLmIgRGZaaIViKGQNYVyS2oWRbnTK4hpKDhaNKIjElh74iCYwlQ9grkpWx5AJTRTIylnzBWZH0jCW7ykSZGktciH/8JPvqk5yMJWPUHxEbS9aVG0luLLFhrEgcY0kBniJhYiqZk1UCeDbva1GR3A0lz+q7Z0EamkkcUq8ayZ7hqlWD/+kTHUwkD9jUncyRWYRvUmEyY27QlSWM6w/VyuAg1Z/C/lypUoNr4btNgZp1O/neAuLmyxt50s7xjuau53AL2x2F9suvf4XFq62WO/i6bfh0wNrqe7oAHz6kmfABvq1Z3akFzgi95fgEokvTni6BIJRei0WSGXCtq2n/APxytu2WycAHssH2r6rGTwcgcEU6WeSVU2Llw8vXzt2P13Yxp+RW5qWrRXaFhUoalKkwsUh/PXB4kxXJe5lVi160n57t2D4lY0WgsWj5tfxa/ifLB5D8C0smPybJ4j8ENld/KE2VEgAAAABJRU5ErkJggg==) no-repeat; background-size: 35px; background-position: 32px center; background-color: #ffffff; }
.c-search-bar button { width: 177px; height: 67px; background-color: transparent; border: none; }
.c-search-bar button img { width: 100%; height: 100%; }
.c-search-cover { width: 100%; height: calc(100vh - 100px); background-color: rgba(0, 0, 0, 0.4); position: absolute; top: 0; left: 0; }
.c-search-dates {
  width: 230px;
  height: 67px;
  background: linear-gradient(330deg, #5B85E6 0%, #6D9AF4 100%);
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 26px;
  color: #ffffff;
  position: relative;
  font-family: HelveL;
}
.c-search-dates:before, .c-search-dates:after { content: ''; width: 2px; height: 40px; background-color: #ffffff; transform: scaleX(.5); position: absolute; top: 13px; left: 96px; }
.c-search-dates:after { left: 162px; }
</style>

<template>
<div class="c-search">
  <div class="c-search-cover" v-if="showMask"></div>
  <div class="c-search-bar" v-if="!isSearch">
    <input v-model="keyword"
           :class="{'holder': keyword === ''}"
           @focus="showMask = true"
           @blur="showMask = false"
           @confirm="handleSearch"/>
    <button @click="openCalendar"><img src="/static/images/common/date.png" /></button>
  </div>
  <div class="c-search-bar" v-if="isSearch">
    <div class="c-tag" v-if="keyword !== ''">{{keyword}}</div>
    <div class="c-search-dates" v-if="date !== ''">
      <span>{{dates[0]}}</span>
      <span>{{dates[1]}}</span>
      <span>{{dates[2]}}</span>
    </div>
  </div>

  <c-calendar ref="calendar" @confirm="searchBydate" />
</div>
</template>

<script type='es6'>
import cCalendar from './calendar'
export default {
  name: 'app',
  components: {
    cCalendar
  },
  computed: {
    dates () {
      return this.date.split('-')
    }
  },
  data () {
    return {
      showMask: false,
      keyword: '',
      date: '',
      isSearch: false
    }
  },
  methods: {
    handleSearch () {
      this.date = ''
      this.isSearch = true
      this.$emit('search', {
        keyword: this.keyword,
        date: this.date
      })
    },
    searchBydate (date) {
      this.keyword = ''
      this.date = date
      this.isSearch = true
      this.$emit('search', {
        keyword: this.keyword,
        date
      })
    },
    reset () {
      this.isSearch = false
      this.keyword = ''
      this.date = ''
      this.hideCalendar()
    },
    openCalendar () {
      this.$refs.calendar.toggleShow(true)
      this.$emit('change', 'calendar')
    },
    hideCalendar () {
      this.$refs.calendar.toggleShow(false)
    }
  }
}
</script>
