import { request, apiUrls } from '@/api';

export async function fakeAccountLogin() {
  return request.get(apiUrls.GET_USER_INFO, {}, { loading: true }).then((res) => {
    return res.data;
  });
}
