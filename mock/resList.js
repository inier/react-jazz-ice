const resList = {
  result: '0',
  total: null,
  data: [
    {
      resourceCode: 'appList',
      resourceName: '应用管理',
      extras: {
        isTopMenu: true,
      },
      resourceList: [
        {
          resourceCode: 'merchant',
          resourceName: '商家',
          resourceList: [
            {
              resourceCode: '/digitalsigns/dataSigns/getStoreSigns',
              resourceName: '商家列表',
            },
            {
              resourceCode: '/digitalsigns/dataSigns/getStores',
              resourceName: '商家详情',
            },
          ],
        },
      ],
    },
  ],
};

export default resList;
