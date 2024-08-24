import Feed from './components/Blog/feed.js';
import FourOhFour from './components/Blog/fourohfour.js';
import Post from './components/Blog/post.js'
import AppNotes from './components/Notes/AppNotes.js';
import LandingPage from './components/Notes/Landing.js';
import { GoogleOAuthProvider } from "@react-oauth/google";
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="959862397513-s2a064dmgp6jgijeirute5vjfnjno363.apps.googleusercontent.com">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/feed" element={<Feed />} />
          <Route exact path="/notes" element={<AppNotes />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/oops" element={<FourOhFour />} />
          <Route path="*" element={<FourOhFour />} />
        </Routes>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
