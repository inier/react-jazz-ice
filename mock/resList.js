export default {
    result: '0',
    total: null,
    data: [
        {
            resourceCode: 'appList',
            resourceName: '应用管理',
            type: '1',
            isCheck: null,
            extras: {
                loadUrl: [],
                icon: 'cry',
                routePath: '/appList',
                isTopMenu: true,
            },
            resourceList: [
                {
                    resourceCode: 'merchant',
                    resourceName: '商家平台',
                    type: '1',
                    isCheck: null,
                    extras: {
                        loadUrl: [
                            '//g.alicdn.com/icestark-demo/child/0.2.0/js/index.js',
                            '//g.alicdn.com/icestark-demo/child/0.2.0/css/index.css',
                        ],
                        icon: 'cry',
                        routePath: '/merchant?tt=123',
                        url: 'https://mall.changan.com.cn/ca-web/home/',
                    },
                    resourceList: [
                        {
                            resourceCode: '/digitalsigns/dataSigns/getStoreSigns',
                            resourceName: '商家列表',
                            type: '3',
                            isCheck: null,
                            resourceList: null,
                            extras: {
                                loadUrl: [
                                    '//g.alicdn.com/icestark-demo/child/0.2.0/js/index.js',
                                    '//g.alicdn.com/icestark-demo/child/0.2.0/css/index.css',
                                ],
                                icon: 'cry',
                                routePath: '/merchant/list',
                                url: 'https://cloud.mall.changan.com.cn/reactcaecapp/',
                            },
                        },
                        {
                            resourceCode: '/digitalsigns/dataSigns/getStores',
                            resourceName: '商家详情',
                            type: '3',
                            isCheck: null,
                            resourceList: null,
                            extras: {
                                loadUrl: [
                                    '//g.alicdn.com/icestark-demo/child/0.2.0/js/index.js',
                                    '//g.alicdn.com/icestark-demo/child/0.2.0/css/index.css',
                                ],
                                icon: 'cry',
                                routePath: '/merchant/detail',
                                url: 'https://unpkg.com/@icedesign/order-management-scaffold@3.0.4/build/index.html',
                            },
                        },
                    ],
                },
                {
                    resourceCode: 'waiter',
                    resourceName: '小二平台',
                    type: '0',
                    isCheck: null,
                    extras: {
                        loadUrl: [
                            '//g.alicdn.com/icestark-demo/child2/0.2.1/js/index.js',
                            '//g.alicdn.com/icestark-demo/child2/0.2.1/css/index.css',
                        ],
                        icon: 'cry',
                        routePath: '/waiter',
                    },
                    resourceList: [
                        {
                            resourceCode: 'waiterlist',
                            resourceName: '小二列表',
                            type: '2',
                            isCheck: null,
                            resourceList: null,
                            extras: {
                                loadUrl: [
                                    '//g.alicdn.com/icestark-demo/child2/0.2.1/js/index.js',
                                    '//g.alicdn.com/icestark-demo/child2/0.2.1/css/index.css',
                                ],
                                icon: 'cry',
                                routePath: '/waiter/list',
                                url: 'https://www.tmall.com/',
                            },
                        },
                        {
                            resourceCode: 'waiterdetail',
                            resourceName: '小二详情小二详情小二详情小二详情小二详情小二详情小二详情小二详情',
                            type: '2',
                            isCheck: null,
                            resourceList: null,
                            extras: {
                                loadUrl: [
                                    '//g.alicdn.com/icestark-demo/child2/0.2.1/js/index.js',
                                    '//g.alicdn.com/icestark-demo/child2/0.2.1/css/index.css',
                                ],
                                icon: 'cry',
                                routePath: '/waiter/detail',
                                url: 'https://www.taobao.com/',
                            },
                        },
                    ],
                },
                {
                    resourceCode: 'rcmtest',
                    resourceName: '权限中心',
                    type: '0',
                    isCheck: null,
                    extras: {
                        loadUrl: [
                            '//ssl.mall.changan.com.cn/rcmtest/0.0.5/js/index.js',
                            '//ssl.mall.changan.com.cn/rcmtest/0.0.5/css/index.css',
                        ],
                        icon: 'cry',
                        routePath: '/rcmtest',
                    },
                    resourceList: [
                        {
                            resourceCode: 'reslist',
                            resourceName: '资源列表',
                            type: '2',
                            isCheck: null,
                            resourceList: null,
                            extras: {
                                loadUrl: [
                                    '//ssl.mall.changan.com.cn/rcmtest/0.0.5/js/index.js',
                                    '//ssl.mall.changan.com.cn/rcmtest/0.0.5/css/index.css',
                                ],
                                icon: 'cry',
                                routePath: '/rcmtest/list',
                                url: 'https://www.jd.com/',
                            },
                        },
                        {
                            resourceCode: 'resdetail',
                            resourceName: '资源详情',
                            type: '2',
                            isCheck: null,
                            resourceList: null,
                            extras: {
                                loadUrl: [
                                    '//ssl.mall.changan.com.cn/rcmtest/0.0.5/js/index.js',
                                    '//ssl.mall.changan.com.cn/rcmtest/0.0.5/css/index.css',
                                ],
                                icon: 'cry',
                                routePath: '/rcmtest/detail',
                                url: 'https://www.suning.com/',
                            },
                        },
                        {
                            resourceCode: 'resabout',
                            resourceName: '关于',
                            type: '2',
                            isCheck: null,
                            resourceList: null,
                            extras: {
                                loadUrl: [
                                    '//ssl.mall.changan.com.cn/rcmtest/0.0.5/js/index.js',
                                    '//ssl.mall.changan.com.cn/rcmtest/0.0.5/css/index.css',
                                ],
                                icon: 'cry',
                                routePath: '/rcmtest/about',
                                url: 'https://ice.work/scaffold',
                            },
                        },
                    ],
                },
            ],
        },
        {
            resourceCode: 'elseList',
            resourceName: '其他管理',
            type: '1',
            isCheck: null,
            extras: {
                loadUrl: [],
                icon: 'cry',
                routePath: '/elseList',
                isTopMenu: true,
            },
            resourceList: [
                {
                    resourceCode: 'waiter1',
                    resourceName: '小二平台11',
                    type: '0',
                    isCheck: null,
                    extras: {
                        loadUrl: [
                            '//g.alicdn.com/icestark-demo/child2/0.2.1/js/index.js',
                            '//g.alicdn.com/icestark-demo/child2/0.2.1/css/index.css',
                        ],
                        icon: 'cry',
                        routePath: '/waiter1',
                    },
                    resourceList: [
                        {
                            resourceCode: 'waiterlist1',
                            resourceName: '小二列表11',
                            type: '2',
                            isCheck: null,
                            resourceList: null,
                            extras: {
                                loadUrl: [
                                    '//g.alicdn.com/icestark-demo/child2/0.2.1/js/index.js',
                                    '//g.alicdn.com/icestark-demo/child2/0.2.1/css/index.css',
                                ],
                                routePath: '/waiter1/list',
                                url: 'https://www.tmall.com/',
                            },
                        },
                        {
                            resourceCode: 'waiterdetail',
                            resourceName: '小二详情11',
                            type: '2',
                            isCheck: null,
                            resourceList: null,
                            extras: {
                                loadUrl: [
                                    '//g.alicdn.com/icestark-demo/child2/0.2.1/js/index.js',
                                    '//g.alicdn.com/icestark-demo/child2/0.2.1/css/index.css',
                                ],
                                routePath: '/waiter1/detail',
                                url: 'https://www.taobao.com/',
                            },
                        },
                    ],
                },
                {
                    resourceCode: 'rcmtest1',
                    resourceName: '权限中心11',
                    type: '0',
                    isCheck: null,
                    extras: {
                        loadUrl: [
                            '//ssl.mall.changan.com.cn/rcmtest/0.0.5/js/index.js',
                            '//ssl.mall.changan.com.cn/rcmtest/0.0.5/css/index.css',
                        ],
                        icon: 'cry',
                        routePath: '/rcmtest1',
                    },
                    resourceList: [
                        {
                            resourceCode: 'reslist1',
                            resourceName: '资源列表11',
                            type: '2',
                            isCheck: null,
                            resourceList: null,
                            extras: {
                                loadUrl: [
                                    '//ssl.mall.changan.com.cn/rcmtest/0.0.5/js/index.js',
                                    '//ssl.mall.changan.com.cn/rcmtest/0.0.5/css/index.css',
                                ],
                                routePath: '/rcmtest1/list',
                                url: 'https://www.jd.com/',
                            },
                        },
                        {
                            resourceCode: 'resdetail1',
                            resourceName: '资源详情11',
                            type: '2',
                            isCheck: null,
                            resourceList: null,
                            extras: {
                                loadUrl: [
                                    '//ssl.mall.changan.com.cn/rcmtest/0.0.5/js/index.js',
                                    '//ssl.mall.changan.com.cn/rcmtest/0.0.5/css/index.css',
                                ],
                                routePath: '/rcmtest1/detail',
                                url: 'https://www.suning.com/',
                            },
                        },
                        {
                            resourceCode: 'resabout1',
                            resourceName: '关于11',
                            type: '2',
                            isCheck: null,
                            resourceList: null,
                            extras: {
                                loadUrl: [
                                    '//ssl.mall.changan.com.cn/rcmtest/0.0.5/js/index.js',
                                    '//ssl.mall.changan.com.cn/rcmtest/0.0.5/css/index.css',
                                ],
                                routePath: '/rcmtest1/about',
                                url: 'https://ice.work/scaffold',
                            },
                        },
                    ],
                },
                {
                    resourceCode: 'merchant1',
                    resourceName: '商家平台11',
                    type: '1',
                    isCheck: null,
                    extras: {
                        loadUrl: [
                            '//g.alicdn.com/icestark-demo/child/0.2.0/js/index.js',
                            '//g.alicdn.com/icestark-demo/child/0.2.0/css/index.css',
                        ],
                        icon: 'cry',
                        routePath: '/merchant1?tt=123',
                        url: 'https://mall.changan.com.cn/ca-web/home/',
                    },
                    resourceList: [
                        {
                            resourceCode: '/digitalsigns/dataSigns/getStoreSigns',
                            resourceName: '商家列表11',
                            type: '3',
                            isCheck: null,
                            resourceList: null,
                            extras: {
                                loadUrl: [
                                    '//g.alicdn.com/icestark-demo/child/0.2.0/js/index.js',
                                    '//g.alicdn.com/icestark-demo/child/0.2.0/css/index.css',
                                ],
                                routePath: '/merchant1/list',
                                url: 'https://cloud.mall.changan.com.cn/reactcaecapp/',
                            },
                        },
                        {
                            resourceCode: '/digitalsigns/dataSigns/getStores',
                            resourceName: '商家详情11',
                            type: '3',
                            isCheck: null,
                            resourceList: null,
                            extras: {
                                loadUrl: [
                                    '//g.alicdn.com/icestark-demo/child/0.2.0/js/index.js',
                                    '//g.alicdn.com/icestark-demo/child/0.2.0/css/index.css',
                                ],
                                routePath: '/merchant1/detail',
                                url: 'https://unpkg.com/@icedesign/order-management-scaffold@3.0.4/build/index.html',
                            },
                        },
                    ],
                },
            ],
        },
        {
            resourceCode: 'ddList',
            resourceName: '单独管理',
            type: '1',
            isCheck: null,
            extras: {
                loadUrl: [],
                icon: 'cry',
                routePath: '/ddList',
            },
        },
    ],
};
