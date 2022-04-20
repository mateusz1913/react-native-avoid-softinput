import { App } from '@avoid-softinput-example/app';
import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root'),
});
