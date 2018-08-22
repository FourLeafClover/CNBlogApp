<template>
<div class="loading lds-css ng-scope">
  <div class="lds-dual-ring">
    <div></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'vLoading'
}
</script>

<style lang="scss" scoped>

@import '@/assets/styles/variable.scss';
.loading {
  margin: 0 auto;
  margin-top:10px;
}

@keyframes lds-dual-ring {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes lds-dual-ring {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.lds-dual-ring {
  position: relative;
  width:30px;
  margin:0 auto;
}

.lds-dual-ring div {
  position: absolute;
  width: 30px;
  height: 30px;
  top: 0px;
  left: 0px;
  border-radius: 50%;
  border: 3px solid #000;
  @include themify {
    border-color: themed('color') transparent themed('color') transparent;
  }
  -webkit-animation: lds-dual-ring 1.1s linear infinite;
  animation: lds-dual-ring 1.1s linear infinite;
}

.lds-dual-ring {
  width: 30px !important;
  height: 30px !important;
  -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
  transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
}
</style>
