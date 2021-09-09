// External imports
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { logoutUser, setCurrentUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
// Internal imports
import './App.css';
import AddEducation from './components/add-credentials/AddEducation';
import AddExperience from './components/add-credentials/AddExperience';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import Dashboard from './components/dashboard/Dashboard';
import EditProfile from './components/edit-profile/EditProfile';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Post from './components/post/Post';
import Posts from './components/posts/Posts';
import Profile from './components/profile/Profile';
import Profiles from './components/profiles/Profiles';
import store from './store';
import setAuthToken from './utils/setAuthToken';

// Check the token
if (localStorage.jwtToken) {
  // Set auth token into header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login page
    window.location.href = '/login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <div className='container'>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/profiles' component={Profiles} />
          <Route exact path='/profile/:handle' component={Profile} />
          <Switch>
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path='/create-profile'
              component={CreateProfile}
            />
          </Switch>
          <Switch>
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path='/add-experience'
              component={AddExperience}
            />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path='/add-education'
              component={AddEducation}
            />
          </Switch>
          <Switch>
            <PrivateRoute exact path='/feed' component={Posts} />
          </Switch>
          <Switch>
            <PrivateRoute exact path='/post/:id' component={Post} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
