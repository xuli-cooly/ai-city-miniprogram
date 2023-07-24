export default {
  pages: ['pages/home/index', 'pages/user/index', 'pages/sharp-tools/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarTitleText: 'AI都市'
  },
  tabBar: {
    backgroundColor: '#1E1E21',
    color: '#aaa',
    selectedColor: '#fff',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'assets/index_off.png',
        selectedIconPath: 'assets/index_on.png'
      },
      {
        pagePath: 'pages/user/index',
        text: '我的',
        iconPath: 'assets/mine_off.png',
        selectedIconPath: 'assets/mine_on.png'
      }
    ]
  }
}
