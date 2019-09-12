import { createAppContainer, createDrawerNavigator } from 'react-navigation';

import Login from './pages/Login';
import Main from './pages/Main';

export default createAppContainer(
	createDrawerNavigator({
		Login,
		Main
	})
);