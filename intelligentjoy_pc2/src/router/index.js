import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            meta: {
                title: "homeTitle"
                // keepAlive:true
            },
            component: function(resolve) {
                require(["@/page/home/home.vue"], resolve);
            }
        },
        {
            path: "/course",
            name: "course",
            meta: {
                title: "courseTitle"
                // keepAlive:true
            },
            component: function(resolve) {
                require(["@/page/course/course.vue"], resolve);
            }
        },
        {
            path: "/teacher",
            name: "teacher",
            meta: {
                title: "teacherTitle"
                // keepAlive:true
            },
            component: function(resolve) {
                require(["@/page/teacher/teacher.vue"], resolve);
            }
        },
        {
            path: "/rent",
            name: "rent",
            meta: {
                title: "rentTitle"
                // keepAlive:true
            },
            component: function(resolve) {
                require(["@/page/rent/rent.vue"], resolve);
            }
        },
        {
            path: "/top",
            name: "top",
            meta: {
                title: "topTitle"
                // keepAlive:true
            },
            component: function(resolve) {
                require(["@/page/top/top.vue"], resolve);
            }
        },
        {
            path: "/news",
            name: "news",
            meta: {
                title: "newsTitle"
                // keepAlive:true
            },
            component: function(resolve) {
                require(["@/page/news/news.vue"], resolve);
            }
        },
        {
            path: "/newsDetail/:id",
            name: "newsDetail",
            meta: {
                title: "newsDetailTitle"
                // keepAlive:true
            },
            component: function(resolve) {
                require(["@/page/newsDetail/index.vue"], resolve);
            }
        },
        {
            path: "/user/:id",
            // name: 'user',
            component: function(resolve) {
                require(["@/page/user/user.vue"], resolve);
            },
            children: [
                {
                    path: "/myCourse",
                    name: "myCourse",
                    meta: {
                        title: "myCourseTitle",
                        needLogin: true
                    },
                    component: function(resolve) {
                        require([
                            "@/page/user/children/myCourse/myCourse.vue"
                        ], resolve);
                    }
                },
                {
                    path: "/myOrder",
                    name: "myOrder",
                    meta: {
                        title: "myOrderTitle",
                        needLogin: true
                    },
                    component: function(resolve) {
                        require([
                            "@/page/user/children/myOrder/myOrder.vue"
                        ], resolve);
                    }
                },
                {
                    path: "/coupons",
                    name: "coupons",
                    meta: {
                        title: "couponsTitle",
                        needLogin: true
                    },
                    component: function(resolve) {
                        require([
                            "@/page/user/children/coupons/coupons.vue"
                        ], resolve);
                    }
                },
                {
                    path: "/userCenter",
                    name: "userCenter",
                    meta: {
                        title: "userCenterTitle",
                        needLogin: true
                    },
                    component: function(resolve) {
                        require([
                            "@/page/user/children/userCenter/userCenter.vue"
                        ], resolve);
                    }
                }
            ]
        },
        {
            path: "/player",
            name: "player",
            meta: {
                title: "playerTitle",
                hiddenFooter: true,
                hiddenHeader: true,
                needLogin: true
            },
            component: function(resolve) {
                require(["@/page/player/player.vue"], resolve);
            }
        },
        {
            path: "/courseDetail",
            name: "courseDetail",
            meta: {
                title: "courseDetailTitle"
                // needLogin:true
            },
            component: function(resolve) {
                require(["@/page/courseDetail/courseDetail.vue"], resolve);
            }
        },
        {
            path: "/teacherDetail",
            name: "teacherDetail",
            meta: {
                title: "teacherDetailTitle"
                // needLogin:true
            },
            component: function(resolve) {
                require(["@/page/teacherDetail/teacherDetail.vue"], resolve);
            }
        },
        {
            path: "/comfireOrder",
            name: "comfireOrder",
            meta: {
                title: "comfireOrderTitle",
                needLogin: true
            },
            component: function(resolve) {
                require(["@/page/comfireOrder/comfireOrder.vue"], resolve);
            }
        },
        {
            path: "/au",
            component: function(resolve) {
                require(["@/page/aboutUs/index.vue"], resolve);
            },
            children: [
                {
                    path: "/contact",
                    name: "contact",
                    meta: {
                        title: "contact"
                    },
                    component: function(resolve) {
                        require(["@/page/aboutUs/contact.vue"], resolve);
                    }
                },
                {
                    path: "/agreement",
                    name: "agreement",
                    meta: {
                        title: "agreement"
                    },
                    component: function(resolve) {
                        require(["@/page/aboutUs/agreement.vue"], resolve);
                    }
                },
                {
                    path: "/statement",
                    name: "statement",
                    meta: {
                        title: "statement"
                    },
                    component: function(resolve) {
                        require(["@/page/aboutUs/statement.vue"], resolve);
                    }
                }
            ]
        },
        {
            path: "/aboutUs",
            name: "aboutUs",
            meta: {
                title: "aboutUs"
            },
            component: function(resolve) {
                require(["@/page/aboutUs/aboutUs.vue"], resolve);
            }
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});
