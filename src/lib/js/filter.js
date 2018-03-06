/**
 * Author: LyonWong
 * Date: 2018-02-26
 */
import Vue from 'vue';


export const StrFilter = function() {
    Vue.filter('lastPathName', (data) => {
        return data.split('/').pop();
    })
};