import request from '@/services'

/**
 * 上传图片
 */
export const uploadImageApi = file => {
  return request.post('/upload', { file }, { isShowLoading: false })
}

/**
 * 压缩图片
 */
export const compressionImageApi = params => {
  return request.get('/upload/compression', params, {
    isShowLoading: false,
    responseType: 'arraybuffer'
  })
}
