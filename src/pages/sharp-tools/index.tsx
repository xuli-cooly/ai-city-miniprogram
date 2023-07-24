import { compressionImageApi } from '@/services/modules/upload'
import { Button, Field, Form, Input, Uploader } from '@taroify/core'
import { BaseEventOrig, FormProps, View } from '@tarojs/components'
import { useState } from 'react'

const SharpTools: React.FC = () => {
  const [file, setFile] = useState('')

  const [tempfile, setTempFile] = useState<Uploader.File>()
  const onUpload = async () => {
    // @ts-ignore
    wx.chooseMedia({
      count: 1,
      mediaType: 'image',
      sizeType: ['compressed'],
      success: async res => {
        const { tempFiles } = res
        console.log(tempFiles)

        setTempFile({
          url: tempFiles[0].path,
          type: tempFiles[0].type,
          name: tempFiles[0].originalFileObj?.name
        })
        const file = tempFiles[0].tempFilePath

        const fileName = file.split('/').reverse()[0]

        // @ts-ignore
        wx.uploadFile({
          url: 'http://localhost:8888/upload',
          filePath: file,
          name: 'file',
          formData: {
            key: `faceplus/${fileName}`
          },
          success: res => {
            console.log('successfully uploaded', res.data)
            setFile(res.data)
          },
          fail: error => {
            console.error('上传照片出错：', error)
          }
        })
      }
    })
  }

  const onSubmit = async (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    const value = event.detail.value
    console.log(value)
    const res = await compressionImageApi({
      ...value,
      path: file
    })
    save(res.data)
  }

  const save = data => {
    // @ts-ignore
    const fileManager = wx.getFileSystemManager()
    fileManager.writeFile({
      // @ts-ignore
      filePath: wx.env.USER_DATA_PATH + '/test.png',
      data,
      encoding: 'base64',
      success: res => {
        // @ts-ignore
        wx.saveImageToPhotosAlbum({
          // @ts-ignore
          filePath: wx.env.USER_DATA_PATH + '/test.png',
          success: function (res) {
            // @ts-ignore
            wx.showToast({
              title: '保存成功'
            })
          },
          fail: function (err) {
            console.log(err)
          }
        })
        console.log(res)
      },
      fail: err => {
        console.log(err)
      }
    })
  }

  return (
    <View>
      <Form onSubmit={onSubmit} style={{ padding: 20 }}>
        <Field
          name='level'
          label={{ align: 'left', children: '压缩级别' }}
          rules={[{ required: true, message: '请填写level' }]}
        >
          <Input placeholder='请输入level' />
        </Field>
        <Field
          name='color'
          label={{ align: 'left', children: '颜色数量' }}
          rules={[{ required: true, message: '请填写color' }]}
        >
          <Input placeholder='请输入color' />
        </Field>
        <Field name='file' label={{ align: 'left', children: '上传图片' }}>
          <Uploader onUpload={onUpload} value={tempfile} onChange={setTempFile} />
        </Field>
        <View style={{ margin: '16px' }}>
          <Button shape='round' block color='primary' formType='submit'>
            压缩
          </Button>
        </View>
      </Form>
    </View>
  )
}

export default SharpTools
