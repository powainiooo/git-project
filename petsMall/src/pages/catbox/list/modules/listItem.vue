<style>
.c-list-item {
   width: 660px;
   height: 320px;
   background: #DDC9A8;
   box-shadow: 0 20px 50px -20px rgba(0, 0, 0, 0.2);
   border-radius: 15px;
}
.c-list-item img { width: 660px; height: 200px; display: block; }
.c-list-item .name { height: 120px; display: flex; flex-direction: column; justify-content: center; padding-left: 40px; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAToAAAD0BAMAAAD5+fcfAAAAJ1BMVEUAAAD///////////////////////////////////////////////+uPUo5AAAADXRSTlMAMwctDRMiAykaJhce8JPz8gAACLJJREFUeNrs2cuvC1EcB/BvRnW8Nl/jVotF671U78em9QiJTYlHxEY9SsRigoRgYVgQK12QiI0uLCQWSkSEhUZIJP4oHa95dOZMBzO/k5jP7vbm5n57Oud7fjNFoVAoFAqFQuH/cb0FSYb6t04NkhZA5SrZgqAGVPrkCQgaIcZKACWSiyHHIGIMW8A8kosgZwERo78FaJOsQU4jPt1SYECyCjmj+HSWXaLLhhSD8en4okxSslIWqNKta9D1AlIaqnQzQ5KShddVpVvi0LUOQgyq0rkk67icmE6yjtvR6cyVxx99dfjTUgjpRqQzjp1r0q8CGSVOpDOPNBliQca8iXTGiJPqENEOpzP7jNCCCCecbhej3IeE2XSFX5j0BBJmhdMNGSZ4WBygK3HpuBACzGYoXYPRZiBgLoPpTIe/ydfxpVC6MuPYyF8/mM7sckyXSjEYTLePpD7bohxMt5pj+lx4jUC61VTpIG9df7obHNPooy3Rl252k0pVG/ma50tnjpjgDvLV9qVbyyTVOnLl+NL1mWgj8uSd+F5SpRfI0Sx/Ok6hYiM/B9Km4y3kxmymTme1kJf5THHd5X7XfSmQbsSpnEUegh3yu/u0KT3fZcff54Y2pTeXntCPGswql+j5Vc36lF4/OFmWOKZN6Rnh0Y3U6LOdR88JjA04rUodWTsQfvw15NSWvES2SvQsg6vBFM4gUyvoWQzXAqaxw0Z2TIee+147T6+WYbxr9Fg2vlvLVDYhM92IucPsMpWTyEg58sFhacBU3iAb/ehyNT4yDSubYinRpwqf/aeYxtMstsYl+ixCwOVU61c5in9upHya/oopWKcxhYsr9xw+/O7to0ePHr979+7w4UO7l69BjNmK70nS791tNsauLF++3I78MvBY73aTUTbc6315fWiN6ohlJSF9sh3HPt9t0rX9014ErHroMMnWM/X4f74Qk3bxj21+sBM/GLvfO5yK9eygHfPBfcAko8m/YN3rXeidv53ub56/3okx81XwZVsxI+TEe1e9AQNqQPTiaWELIrWphU5c6eigGj/Ya2AG0HjxnkDnxWtB48WrIN6Q0hYqHz5K+6AeoIXZUFhAWTUodSlqC5TKFNWBkjmgoCoSXKWgGXj0G6QWwaPfIPV77bQ8zpbhO00beQkSzaOcOnTeF+vxi45jntVCkjlM5T/atXyBBCYFLQWg8aByX+fjgkt13hZkR+dtkTwKOBRk1fXt47GbUJtFSTWNB4Gxltb3PjehNJeiZnSuFFo2VAzK6kCJsp5AaUBRC7W983HVdD4suARKDcqyNZ6hvrV3/a5RREF4XA8SJYVzm9vEJMVqEUUscv4GLTYxWojFFoKCjQpaqMWKIoiNiqJocxF/FFoYC5VgETvtThBE8I8yEGU93+6+b5yHTpGvvly+3Xnvmx9v3hxzRparjD3Lcsyv7CY+K5gxHH9aF7yO4bTMWypbx/8VE6bjTzYd4TGZjvAsp7TMZDrCs1yHWmOnAdCvp4Kend0WAcv1T2YynVmQ6TDAdpGMTJehTFe2mUwHKabr7kymnYXhU1qA3RX+n7DcHvCTndlePDItKWRaUogsR3hElmMo040fbLvxg0w3flBISdn9cGlp6cLFdw92d7kC8fsTQscIzAQFsHoBpqASQ1vnj5x+efHBL5oH3jydA4/Lw+/Z82n9hbL5+bmtBRhr4+zwOk98Unij/Z/62efSC7L/Mr7bTDhmQ7JrMYAZwjGsZCe/XrZMOFoB2bW6DKAQTlPCEWCVJCSBSI8D+NgOSTAcit0Qli62SYJWKHbbmVVbVq94aruKx5VuCcIuWmQMfcLQ7GovAeyAhCLmP5CLZxZVoT+NsPOOiXzMfyAjCqApfTqMs5vmGkw6UUuqmG1TokdDCyi7m1yH3Hl2EiKqYUctx49IPdgeoqs8gHGS4kOds74BsYtqNWkiJRoBHJnctMtVi13oC3uu2k9SENPmVU0coCKVdl3BoNlHSWnakp2z9ETV2CSt8EVtUpjWUc0bPnbX6/draXjQzeJ3hvKqWRSSO4znymot6mZxQc6rAqPaoUcu9lZ3mPdIjpFqds7Sw1/d5qK6hybXDqUqv8ZZenD7zlRaPjnuyPAwKq/yomhwmKQ1GXisGNZaZ4JjdexGPG/O+epEOyCoZOfSw6K6e4WTGmCuAr8+vFwVvyE5SfzF8USoq8Al7wxV0ANy/yRrKoeOKSYsN7mco7wCf6Z+fsCqjqO9pRhi3Lh+dzKzb0/sO+mpNvQVE9GaE4CbXW5+3fEXb8UxV0yT83jE1tlGwx7K/HKQaoYYerZX1FDojJ8ARgHEGKy+TYgmvE1lQIghEmOPemWCmPVgAanBpGbwaKPiNSnFXsiH42IMZAhtWIKSAmwW2EQKLDrFcWiPxzl6wfFVsEmGHKNB1x04a+mpp4+XKDD1Hi9gIQXEGD2/jMHS1VvgmbVi7Kr/FPY/E4EHDze4ldvYGr1PHkSAwMuLAmegj8Z+a3Vda+j1OIWW3S6BUHVIhVl42Y0A2xD/xUE5u/3QJxOJRcbCscugcKstSZY3kQqfYT1xUjfE0c6QBhvg/GRYUgZeL8t5kCg2DbbsaBjQKLAShQnFgkTBNurYuYNl4wyTsI4on+orp6OjygR4u7Dsott4TjHk2Api1wuTku0BXed4Aa07RH6AhgjYsx+W5FjrEXZ4APAWFYlR2VfnIYQ4KVB2Y7KYNlepCb54NwqWeQvaa2hDRAd+1bFsU8jZRducLZHBB3+jwsCnIBmOd/lQOhixv8YT81yWw58jGU6tVnqnnZAYUse7mFT9LbkdTlcGvK+iRX7kN9S1T9+/fQTSY/Ro8Q78x3PkxbSnLAPFXYDUqd0Pc5vUPUY5BcSs6mR2AbCrApHuwT/j7az6In6sq8QG/7W4K8CT4yfa8TIFxRbWnZAd49/xlSj0u9OdQV17dmEVl1+cAMyqME1ckC0MdDR0aA2m8QOAW2JRW5ZB2AAAAABJRU5ErkJggg==) no-repeat; background-size: 157px; background-position: right center; }
.c-list-item .name p { font-size: 30px; color: #ffffff; text-shadow: var(--textShadow); }
.c-list-item .name p.en { font-size: 34px; font-family: HelveThin; }
</style>

<template>
<div class="c-list-item">
   <img src="/static/images/catbox/img.png" class="img" />
   <div class="name">
      <p class="en">Ziwipeak® Cat box</p>
      <p>滋益巅峰® 猫盒套餐</p>
   </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {}
}
</script>
