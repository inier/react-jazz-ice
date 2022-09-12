import cryptoJs from 'crypto-js';

class CryptoHelper {
  key: string;
  constructor(key: string) {
    /**
     * 如需秘钥，可以在实例化时传入
     */
    this.key = key;
  }
  /**
   * 加密
   * @param word
   */
  encrypt(word: string | undefined): string {
    if (!word) {
      return '';
    }
    const encrypted = cryptoJs.MD5(word);
    // eslint-disable-next-line @iceworks/best-practices/recommend-polyfill
    return encrypted.toString();
  }
}

export default CryptoHelper;
