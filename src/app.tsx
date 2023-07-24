import { store } from '@/store'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'

import './app.less'

function App(props) {
  const { children } = props

  return (
    <StrictMode>
      <Provider store={store}>{children}</Provider>
    </StrictMode>
  )
}

export default App
