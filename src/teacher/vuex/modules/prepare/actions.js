import vue from 'vue';

/**
 * get请求
 * @param  {String} options.url   api地址
 * @param  {String} options.query query参数
 * @return {Promise}               Promise
 */
const _prefix = process.env.NODE_ENV == 'production' ? process.env.TEACHER_HOST.replace(/\/$/,'') : '/api';

const _get = ({ url, query }, commit) => {
  if (commit) commit('START_LOADING');
  let _url;
  if (query) {
    // 是否是对象
    if(Object.prototype.toString.call(query) == '[object Object]'){
      let temp = '';
      for(let q in query){
        temp = `${(temp?temp+'&':temp)}${q}=${query[q]}`;
      }
      //
      query = temp;
    }
    _url = `${url}?${query}`
  } else {
    _url = `${url}`
  }

  return vue.http.get(_url)
    .then((res) => {
      if (commit) commit('FINISH_LOADING');
      if (res.status >= 200 && res.status < 300) {
        return res.data
      }
      return Promise.reject(new Error(res.status))
    })
};

const _post = ({ url, body }, commit) => {
  if (commit) commit('START_LOADING');
  let _url = url;

  return vue.http.post(_url, body, {emulateJSON:true})
    .then((res) => {
      if (commit) commit('FINISH_LOADING');
      if (res.status >= 200 && res.status < 300) {
        return res.data
      }
      return Promise.reject(new Error(res.status))
    },(err)=>{
      if (commit) commit('FINISH_LOADING');
      return Promise.reject(new Error(err))
    })
};

// 获取七牛权限
export const fetchPrepareDraft = ({commit}, query) => {
  const url = `${_prefix}/prepare-draft.api`;

  return _get({ url, query }, commit)
    .then((json) => {
      if (json.error == 0) {
        //
        return Promise.resolve(json.data);
      }
      return Promise.reject(json)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
};

// 获取备课列表
export const fetchPrepareSlice = ({commit}, query) => {
  const url = `${_prefix}/prepare-slice.api`;

  return _get({ url, query }, commit)
    .then((json) => {
      if (json.error == 0) {
        //
        commit('UPDATE_PREPARE_LIST', json.data);
        return Promise.resolve(json.data);
      }
      return Promise.reject(json)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
};

export const fetchPrepareCreateAudio = ({commit}, body) => {
  const url = `${_prefix}/prepare-create-audio.api`;

  return _post({ url, body }, commit)
    .then((json) => {
      if (json.error == 0) {
        //
        return Promise.resolve(json.data);
      }
      return Promise.reject(json)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
};

export const fetchPrepareCreateImage = ({commit}, body) => {
  const url = `${_prefix}/prepare-create-image.api`;

  return _post({ url, body }, commit)
    .then((json) => {
      if (json.error == 0) {
        //
        return Promise.resolve(json.data);
      }
      return Promise.reject(json)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
};

export const fetchPrepareCreateText = ({commit}, body) => {
  const url = `${_prefix}/prepare-create-text.api`;

  return _post({ url, body }, commit)
    .then((json) => {
      if (json.error == 0) {
        //
        return Promise.resolve(json.data);
      }
      return Promise.reject(json)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
};

export const fetchPrepareCreateVideo = ({commit}, body) => {
  const url = `${_prefix}/prepare-create-video.api`;

  return _post({ url, body }, commit)
    .then((json) => {
      if (json.error == 0) {
        //
        return Promise.resolve(json.data);
      }
      return Promise.reject(json)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
};

export const fetchPrepareSwap = ({commit}, body) => {
  const url = `${_prefix}/prepare-swap.api`;

  return _post({ url, body }, commit)
    .then((json) => {
      if (json.error == 0) {
        //
        return Promise.resolve(json.data);
      }
      return Promise.reject(new Error('Fetch_Prepare_Swap failure'))
    })
    .catch((error) => {
      return Promise.reject(error)
    })
};

export const fetchPrepareJump = ({commit}, body) => {
  const url = `${_prefix}/prepare-jump.api`;

  return _post({ url, body }, commit)
    .then((json) => {
      if (json.error == 0) {
        //
        return Promise.resolve(json.data);
      }
      return Promise.reject(json)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
};

export const fetchPrepareDelete = ({commit}, body) => {
  const url = `${_prefix}/prepare-delete.api`;

  return _post({ url, body }, commit)
    .then((json) => {
      if (json.error == 0) {
        //
        return Promise.resolve(json.data);
      }
      return Promise.reject(json)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
};
