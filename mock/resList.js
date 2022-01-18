const resList = {
  result: '0',
  total: null,
  data: [
    {
      resourceCode: 5000,
      resourceName: '商品',
      extras: {
        icon: 'cry',
        routePath: '/appList',
      },
      resourceList: [
        {
          resourceCode: 50001,
          resourceName: '商品管理',
          extras: {
            icon: 'cry',
            routePath: '/demo/demos',
          },
          resourceList: [
            {
              resourceCode: 500011,
              resourceName: '商品管理',
              extras: {
                icon: 'cry',
                routePath: '/demo/demos',
              },
            },
          ],
        },
        {
          resourceCode: 50002,
          resourceName: '商品分类',
          extras: {
            icon: 'cry',
            routePath: '/demo/demos',
          },
          resourceList: [
            {
              resourceCode: 500021,
              resourceName: '前台分类',
              extras: {
                icon: 'cry',
                routePath: '/demo/demos',
              },
            },
          ],
        },
      ],
    },
    {
      resourceCode: 5001,
      resourceName: '订单',
      extras: {
        icon: 'cry',
        routePath: '/demo/demos',
      },
      resourceList: [
        {
          resourceCode: 50011,
          resourceName: '订单管理',
          extras: {
            icon: 'cry',
            routePath: '/order/orderCenter',
          },
          resourceList: [
            {
              resourceCode: 500111,
              resourceName: '订单总览',
              extras: {
                icon: 'cry',
                routePath: '/order/orderCenter',
              },
            },
          ],
        },
      ],
    },
    {
      resourceCode: 5003,
      resourceName: '营销',
      extras: {
        icon: 'cry',
        routePath: '/demo/demos',
      },
      resourceList: [
        {
          resourceCode: 50031,
          resourceName: '促销推广',
          extras: {
            icon: 'cry',
            routePath: '/demo/demos',
          },
          resourceList: [
            {
              resourceCode: 500311,
              resourceName: '页面管理',
              extras: {
                icon: 'cry',
                routePath: '/demo/demos',
              },
            },
          ],
        },
        {
          resourceCode: 50032,
          resourceName: '会员管理',
          extras: {
            icon: 'cry',
            routePath: '/demo/demos',
          },
          resourceList: [
            {
              resourceCode: 500321,
              resourceName: '会员类型管理',
              extras: {
                icon: 'cry',
                routePath: '/demo/demos',
              },
            },
            {
              resourceCode: 500322,
              resourceName: '会员折扣管理',
              extras: {
                icon: 'cry',
                routePath: '/demo/demos',
              },
            },
          ],
        },
      ],
    },
    {
      resourceCode: 5004,
      resourceName: '商家',
      extras: {
        icon: 'cry',
        routePath: '/demo/demos',
      },
      resourceList: [
        {
          resourceCode: 50041,
          resourceName: '店铺管理',
          extras: {
            icon: 'cry',
            routePath: '/demo/demos',
          },
          resourceList: [
            {
              resourceCode: 500411,
              resourceName: '店铺列表',
              extras: {
                icon: 'cry',
                routePath: '/demo/demos',
              },
            },
          ],
        },
        {
          resourceCode: 50042,
          resourceName: '门店管理',
          extras: {
            icon: 'cry',
            routePath: '/demo/demos',
          },
          resourceList: [
            {
              resourceCode: 500421,
              resourceName: '门店列表',
              extras: {
                icon: 'cry',
                routePath: '/demo/demos',
              },
            },
          ],
        },
      ],
    },
  ],
};

export default resList;
