<template>
    <div class="digits">
        <div class="digits-content">
            <div :class="['digits-top-content-bg', displayNumber.hundred]">
                <span class="d1"></span>
                <span class="d2"></span>
                <span class="d3"></span>
                <span class="d4"></span>
                <span class="d5"></span>
                <span class="d6"></span>
                <span class="d7"></span>
            </div>
        </div>
        <div class="digits-content">
            <div :class="['digits-top-content-bg', displayNumber.ten]">
                <span class="d1"></span>
                <span class="d2"></span>
                <span class="d3"></span>
                <span class="d4"></span>
                <span class="d5"></span>
                <span class="d6"></span>
                <span class="d7"></span>
            </div>
        </div>
        <div class="digits-content">
            <div :class="['digits-top-content-bg', displayNumber.one]">
                <span class="d1"></span>
                <span class="d2"></span>
                <span class="d3"></span>
                <span class="d4"></span>
                <span class="d5"></span>
                <span class="d6"></span>
                <span class="d7"></span>
            </div>
        </div>
    </div>
</template>
<style src="./ledNumber.css" type="text/css"></style>
<script>
export default {
  name: 'LedNumber',
  props: ['displayNumber']
}
</script>
