import { request } from 'ice';

export async function fakeAccountLogin() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'admin',
      });
    }, 2000);
  });
}
