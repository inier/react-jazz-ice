export default {
  'GET /api/system/picCode': {
    result: '0',
    data: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBwz/9k=',
  },
  'GET /api/system/getkey': {
    result: '0',
    data: {
      exp: '010001',
      mod: '00bf127296c4e328ecb5352329f656e8b590a1',
    },
  },
  'POST /api/system/uploadPic': (req, res) => {
    const { file } = req.body;

    res.send({
      result: 0,
      data: `data:image\/\w+;base64,${file}`,
    });
  },
  'POST /api/system/login': {
    result: '0',
    data: {
      token: 'xxxxx',
      refreshToken: 'xxxxx',
      tokenType: 'Bearer',
      expiresIn: 7199,
      userCode: '12345',
      loginName: 'xxx@xx.com',
    },
    timeStamp: 1637198818935,
  },
  'GET /api/system/logout': {
    result: '0',
    data: true,
  },
  'POST /api/verification/send?key=': {
    result: '0',
    data: {
      data: 'iVBORw0KGgoAAAANSUhEUgAAAH0AAAggg==',
      timeStamp: 1637199073867,
    },
  },
};
