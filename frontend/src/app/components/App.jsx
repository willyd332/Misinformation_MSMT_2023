import AdminLogin from './Admin/AdminLogin/AdminLogin';
import UserLogin from './User/UserLogin/UserLogin';
import UserLoginWithQualtricsId from './User/UserLogin/UserLoginWithQualtricsId';
import UserResponse from './User/UserResponse/UserResponse';
import AdminPortal from './Admin/AdminPortal/AdminPortalDrawer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CustomSnackbar from './Common/Snackbar';
import "./App.css";

function App() {
  // ?url1=&url2=&url3=&url4=&url5=
  // agnostic-augusto-1
  // agnostic-augusto-10
  // agnostic-augusto-11
  // agnostic-augusto-12
  // agnostic-augusto-13
  // Full auto URL
    // http://localhost:8080/466049?url1=agnostic-augusto-1&url2=agnostic-augusto-2&url3=agnostic-augusto-11&url4=agnostic-augusto-12&url5=agnostic-augusto-13&userid=696969
  // ?url1=agnostic-augusto-1&url2=agnostic-augusto-10&url3=agnostic-augusto-11&url4=agnostic-augusto-12&url5=agnostic-augusto-13&userid=123456
    // Also add qualtrics ID and inject it into the Auth-Box
  // Ultimately it all goes into DynamicMedia.jsx

  // http://localhost:8080/466049?url1=agnostic-augusto-1-cropped&url2=agnostic-augusto-2-cropped&url3=agnostic-augusto-3-cropped&url4=agnostic-augusto-4-cropped&url5=agnostic-augusto-5-cropped&userid=696969

  const urlString = window.location.href
  let paramString = "?" + urlString.split('?')[1]

  return (
    <>
    <div className="wrapper">
      <CustomSnackbar />
      <BrowserRouter>
        <Switch>
          <Route exact path="/admin/configure">
            <AdminPortal />
          </Route>
          <Route exact path="/admin">
            <AdminLogin />
          </Route>
          <Route exact path="/:accessCode/user-response">
            <UserResponse />
          </Route>
          <Route exact path="/:accessCode/participantId">
            <UserLoginWithQualtricsId/>
          </Route>
          <Route exact path="/:accessCode?">
            <UserLogin paramString={paramString} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
