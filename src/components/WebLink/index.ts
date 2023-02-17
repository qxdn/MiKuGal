import Toast from 'react-native-toast-message';
import AndroidWebLink from './androidWebLink';
import {Linking, Platform} from 'react-native';

class WebLink {
  static async openURL(url: string, headers?: {}): Promise<void> {
    if (Platform.OS === 'android') {
      AndroidWebLink.openURL(url, headers || {});
    } else {
      Toast.show({type: 'error', text1: 'ios跳转页面暂不支持referer'});
      Linking.openURL(url);
    }
  }
}

export default WebLink;
