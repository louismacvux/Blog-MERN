import Feed from './components/feed.js';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route exact path = "/feed" element = {<Feed/>}/>
        </Routes>
    </div>
  );
}

export default App;
