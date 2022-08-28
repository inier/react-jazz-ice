const resList = {
  result: '0',
  total: null,
  data: [
    {
      resourceCode: 3000,
      resourceName: '示例',
      extras: {
        icon: 'cry',
        routePath: '/demo',
      },
      resourceList: [
        {
          resourceCode: 30001,
          resourceName: '综合示例',
          extras: {
            icon: 'cry',
            routePath: '/demo/demos',
          },
        },
        {
          resourceCode: 30002,
          resourceName: 'RouteTabs示例',
          extras: {
            icon: 'cry',
            routePath: '/demo/testRouteTabs',
          },
          resourceList: [
            {
              resourceCode: 300021,
              resourceName: '列表测试页面',
              extras: {
                icon: 'cry',
                routePath: '/demo/testRouteTabs/index',
              },
            },
            {
              resourceCode: 300022,
              resourceName: '详情测试页面',
              extras: {
                icon: 'cry',
                routePath: '/demo/testRouteTabs/detail',
              },
            },
            {
              resourceCode: 300023,
              resourceName: '长列表页',
              extras: {
                icon: 'cry',
                routePath: '/demo/testRouteTabs/list',
              },
            },
            {
              resourceCode: 300024,
              resourceName: '详情测试页面2',
              extras: {
                icon: 'cry',
                routePath: '/demo/testRouteTabs/type/:type',
              },
            },
          ],
        },
      ],
    },
    {
      resourceCode: 5000,
      resourceName: '菜单项1',
      extras: {
        icon: 'cry',
        routePath: '/menu1',
      },
      resourceList: [
        {
          resourceCode: 50001,
          resourceName: '子菜单项11',
          extras: {
            icon: 'cry',
            routePath: '/demo/dashboard',
          },
          resourceList: [
            {
              resourceCode: 500011,
              resourceName: '子菜单项111',
              extras: {
                icon: 'cry',
                routePath: '/demo/dashboard/workplace',
              },
            },
          ],
        },
        {
          resourceCode: 50002,
          resourceName: '子菜单项12',
          extras: {
            icon: 'cry',
            routePath: '/demo/form',
          },
          resourceList: [
            {
              resourceCode: 500021,
              resourceName: '子菜单项121',
              extras: {
                icon: 'cry',
                routePath: '/demo/form/basic',
              },
            },
          ],
        },
      ],
    },
    {
      resourceCode: 5001,
      resourceName: '菜单项2',
      extras: {
        icon: 'cry',
        routePath: '/menu2',
      },
      resourceList: [
        {
          resourceCode: 50011,
          resourceName: '子菜单项21',
          extras: {
            icon: 'cry',
            routePath: '/demo/list',
          },
          resourceList: [
            {
              resourceCode: 500111,
              resourceName: '子菜单项212',
              extras: {
                icon: 'cry',
                routePath: '/demo/list/basic',
              },
            },
          ],
        },
      ],
    },
    {
      resourceCode: 5003,
      resourceName: '菜单项3',
      extras: {
        icon: 'cry',
        routePath: '/menu3',
      },
      resourceList: [
        {
          resourceCode: 50031,
          resourceName: '子菜单项31',
          extras: {
            icon: 'cry',
            routePath: '/demo21',
          },
          resourceList: [
            {
              resourceCode: 500311,
              resourceName: '子菜单项311',
              extras: {
                icon: 'cry',
                routePath: '/demo/list/card',
              },
            },
          ],
        },
        {
          resourceCode: 50032,
          resourceName: '子菜单项32',
          extras: {
            icon: 'cry',
            routePath: '/demo21',
          },
          resourceList: [
            {
              resourceCode: 500321,
              resourceName: '子菜单项321',
              extras: {
                icon: 'cry',
                routePath: '/demo/detail/basic',
              },
            },
            {
              resourceCode: 500322,
              resourceName: '子菜单项322',
              extras: {
                icon: 'cry',
                routePath: '/demo/detail/advanced',
              },
            },
          ],
        },
      ],
    },
    {
      resourceCode: 5004,
      resourceName: '菜单项4',
      extras: {
        icon: 'cry',
        routePath: '/menu4',
      },
      resourceList: [
        {
          resourceCode: 50041,
          resourceName: '子菜单项41',
          extras: {
            icon: 'cry',
            routePath: '/demo/list',
          },
          resourceList: [
            {
              resourceCode: 500411,
              resourceName: '子菜单项411',
              extras: {
                icon: 'cry',
                routePath: '/demo/list/table/basic',
              },
            },
          ],
        },
        {
          resourceCode: 50042,
          resourceName: '子菜单项42',
          extras: {
            icon: 'cry',
            routePath: '/demo/list',
          },
          resourceList: [
            {
              resourceCode: 500421,
              resourceName: '子菜单项421',
              extras: {
                icon: 'cry',
                routePath: '/demo/list/table/filter',
              },
            },
          ],
        },
      ],
    },
  ],
};

export default resList;
