// Component
import Home from './components/home/home';
import Login from './components/login/login';
import Root from './components/root';
import Auth from './components/login/Auth';
import NotFound from './components/404/404';
import UserJourney from './components/user_journey';

const routes = {
  component: Root,
  childRoutes: [
    {
      path: '/',
      exact: true,
      getComponent: (location, callback) => {
        if (Auth.isUserAuth()) {
          callback(null, Home);
        }else{
          callback(null, Login);
        }
      }
    },
    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.removeToken();
        replace('/');
      }
    },
    {
      path: '*',
      component: NotFound
    },
  ]
};
export default routes;