import Feed from './components/Blog/feed.js';
import FourOhFour from './components/Blog/fourohfour.js';
import Post from './components/Blog/post.js'
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route exact path = "/feed" element = {<Feed/>}/>
            <Route path = "/post/:id" element = {<Post/>} />
            <Route path = "/oops" element = {<FourOhFour/>} />
            <Route path = "*" element = {<FourOhFour/>} />
        </Routes>
    </div>
  );
}

export default App;
