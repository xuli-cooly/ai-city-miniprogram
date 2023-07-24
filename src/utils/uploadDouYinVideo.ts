import Taro, { getCurrentInstance, PageInstance } from '@tarojs/taro'

const $instance = getCurrentInstance() as MyCurrentType

interface PageType extends PageInstance {
  onUploadDouyinVideo?: (options) => void
}

interface MyCurrentType {
  page: PageType
}

interface ParamsType {
  /**
   * 本地视频/图片资源路径
   */
  path: string
  /**
   * 视频上的文字贴纸
   */
  stickerTexts: {
    /**
     * 视频上的文字贴图内容
     */
    text: string
    /**
     * 视频上的文字贴图颜色
     */
    color: string
    /**
     * 视频上的文字贴图大小
     */
    fontSize: string
    /**
     * 视频上的文字贴图缩放比例
     */
    scale: number
    /**
     * 视频上的文字贴图x轴坐标位置
     */
    x: number
    /**
     * 视频上的文字贴图y轴坐标位置
     */
    y: number
  }[]

  /**
   * 视频上的话题贴图
   */
  stickerHashtags: {
    /**
     * 视频上的话题贴图名称
     */
    name: string
    /**
     * 视频上的话题贴图x轴坐标偏移量
     */
    x: number
    /**
     * 视频上的话题贴图y轴坐标偏移量
     */
    y: number
  }[]

  /**
   * 挂载锚点的标题
   */
  anchorText: string
  /**
   * 挂载锚点的类型，"none" 表示不挂载，"app" 表示将小程序锚点挂载到发布的抖音视频上
   */
  anchorType: 'none' | 'app'
  /**
   * 点击锚点时打开小程序的页面。是相对路径，相对于小程序根目录，如 page/aboutUs/aboutUs，默认是小程序首页
   */
  anchorPath: string

  /**
   * 发布作品的标题
   */
  title: string

  /**
   * 标题里要@ 的人
   */
  mentionMarkers: {
    start?: number // 在title中插入要插入@ 的人的起始下标
    openId: string // @的人的openid
  }[]
  /**
   * 标题里要 # 的话题
   */
  hashtagMarkers: {
    start?: number // 在title中插入要# 的话题的起始下标
    hashtag: string // 话题名称
  }[]
  success: (videoId: string) => void
}

/**
 * 抖音小程序-一键发抖音方法
 * @param params - path及文字贴纸参数
 */
function uploadDouYinVideo(params: Partial<ParamsType>) {
  const {
    path,
    stickerTexts,
    title,
    hashtagMarkers,
    anchorText,
    mentionMarkers,
    anchorType,
    anchorPath,
    stickerHashtags,
    success
  } = params

  $instance.page.onUploadDouyinVideo = _uploadOptions => {
    // 返回值（文档中称之为 uploadParams）将被当作发布参数传入视频发布器，发布视频
    return {
      videoPath: path,
      titleConfig: {
        title,
        mentionMarkers,
        hashtagMarkers
      },
      extra: {
        anchor: {
          anchorType,
          title: anchorText,
          path: anchorPath
        }
      },
      stickersConfig: {
        text: stickerTexts,
        hashtag: stickerHashtags
      },
      success: res => {
        // 只有当发布成功且挂载成功时，success callback 才会有 videoId
        console.log('success: ', res)
        success && success(res.videoId)
      },
      fail: e => {
        Taro.showToast({
          title: '视频发布器调起失败，稍后再试试吧~',
          icon: 'none',
          duration: 2500
        })
        console.log('视频发布器调起失败: ', e)
      }
    }
  }
}

export default uploadDouYinVideo
