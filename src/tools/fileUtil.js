import xhr from '@/tools/http/http'

const downloadFileFromPath = function (path) {
  return new Promise((resolve, reject) => {
    xhr.download(path)
      .then(res => {
        downloadFileFromRes(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
  })
}

const downloadFileFromRes = function (res) {
  const blob = new Blob([res.data])
  if ('download' in document.createElement('a')) { // 非IE下载
    const elink = document.createElement('a')
    elink.download = decodeURI(res.headers.filename)
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
  } else { // IE10+下载
    navigator.msSaveBlob(blob, res.filename)
  }
}

export {
  downloadFileFromRes,
  downloadFileFromPath
}
