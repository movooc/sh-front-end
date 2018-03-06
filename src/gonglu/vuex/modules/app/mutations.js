import {
  CHANGE_APP_INFO,
} from './mutation-type'

const mutations = {
  // 改变loading状态
  [CHANGE_APP_INFO](state, info) {
    state.appInfo = info;
  },
};
export default mutations;
