import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './app/layout/App';
import { store } from "./app/store/configureStore";
import './index.css';
import "swiper/css";
import "swiper/css/pagination";
import "react-image-gallery/styles/css/image-gallery.css";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
  <Provider store={store}>
      <App />
  </Provider>
</BrowserRouter>
)
