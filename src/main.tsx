import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { store } from 'Redux/store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'; 
import { persistStore } from 'redux-persist'

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')!).render(

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App/>
      </PersistGate>
    </Provider>,
)
