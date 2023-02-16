import {NativeModules} from 'react-native';
const {WebLink} = NativeModules;

interface WebLinkInterface {
  openURL(name: string, headers?: {}): Promise<void>;
}

export default WebLink as WebLinkInterface;
