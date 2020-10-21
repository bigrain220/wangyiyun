import Vue from 'vue'

Vue.filter('capitalizeGlobal', function (value) {
    if (!value) return ''
    value = value.toString();
    return value.toUpperCase();
})