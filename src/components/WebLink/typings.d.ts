interface WebLinkInterface {
  openURL(url: string, headers?: {}): Promise<void>;
}
