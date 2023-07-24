import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { TOOLS_LIST } from './constants'
import styles from './index.module.less'

const Home: React.FC = () => {
  return (
    <View className={styles['home']}>
      {TOOLS_LIST.map(item => (
        <View className={styles['home-list']} key={item.id}>
          <View
            className={styles['home-list-item']}
            onClick={() =>
              Taro.navigateTo({
                url: item.navigate
              })
            }
          >
            {item.name}
          </View>
        </View>
      ))}
    </View>
  )
}

export default Home
