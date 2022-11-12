import './App.css';
import store from './app/store';
import Subreddit from './features/subreddit/subreddit';
import Reddit from './features/reddit/reddit';
import Search from './components/search/search';
import { Provider } from 'react-redux';
import React from 'react';
import logo from './assets/reddit-logo.png'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header>
          <div className='logo'>
            <img src={logo} alt="reddit logo" className='logoImg'/>
            <div className='logoName'>reddit</div>
          </div>
          <Search/>
        </header>
        <div className='container'>
          <main>
            <Reddit/>

          </main>
          <aside>
            <Subreddit/>
          </aside>
        </div>
      </div>
    </Provider>
  );
}

export default App;
