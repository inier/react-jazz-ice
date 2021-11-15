import { request } from 'ice';
import { avatar } from '@/assets';

export async function fakeAccountLogin() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        avatar,
        name: 'admin',
      });
    }, 2000);
  });
}
