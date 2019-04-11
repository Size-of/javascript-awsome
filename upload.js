const customRequest = (detail) => {
    let file = detail.file
    fetch('/estore/oss/getSign')
      .then(res => {
        return res.json()
      })
      .then(res => {
        const serverURL = res.host
        const xhr = new XMLHttpRequest()
        const fd = new FormData()
        const key = `${new Date().getTime()}_${file.name}`;
        fd.append('OSSAccessKeyId', res.accessid);
        fd.append('policy', res.policy);
        fd.append('Signature', res.signature);
        fd.append('key', res.dir + key);
        fd.append('success_action_status', '200');
        const successFn = (response) => {
          detail.onSuccess(res.host + '/' + res.dir + key)
          // this.props.uploadSuccess(this.state.fileList)
        }
        const progressFn = (event) => {
          // 上传进度发生变化时调用param.progress
          let percent = event.loaded / event.total * 100
          detail.onProgress && detail.onProgress({
            percent
          })
        }
        const errorFn = (response) => {
          // 上传发生错误时调用param.error
          detail.onError(response)
        }
        xhr.upload.addEventListener("progress", progressFn, false)
        xhr.addEventListener("load", successFn, false)
        xhr.addEventListener("error", errorFn, false)
        xhr.addEventListener("abort", errorFn, false)
        fd.append('file', file)
        xhr.open('POST', serverURL, true)
        xhr.send(fd)
      })
    return false
  }
  
  
  export {customRequest};