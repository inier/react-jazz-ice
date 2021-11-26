import { request } from 'ice';

export async function fakeAccountLogin() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: '管理员',
        mail: 'admin@gmail.com',
      });
    }, 2000);
  });
}
