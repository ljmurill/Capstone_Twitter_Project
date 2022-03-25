import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './components/ModalContext/Modal';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faHouse, faCalendarDays, faEllipsis, faXmark, faImage} from '@fortawesome/free-solid-svg-icons'
import { faUser, faComment, faHeart} from '@fortawesome/free-regular-svg-icons'

library.add(fab, faHouse, faUser, faComment,faCalendarDays, faEllipsis, faHeart, faLinkedin, faGithub, faXmark, faImage)

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
