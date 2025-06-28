export const adminMenu = [
    {
        name: 'menu.admin.user',
        menus: [
            {
                name: 'menu.admin.user',
                icon: 'fa-user',
                subMenus: [
                    { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                    { name: 'menu.admin.manage-admin', link: '/system/user-redux' }
                ]
            }
        ]
    },
    {
        name: 'menu.admin.category',
        menus: [
            {
                name: 'menu.admin.category',
                icon: 'fa-list',
                link: '/system/user-manage',
                subMenus: [
                    { name: 'menu.admin.manage-cate', link: '/system/user-manage' },
                    { name: 'menu.admin.position', link: '/system/user-redux' },
                    { name: 'menu.admin.level', link: '/system/user-redux' }
                ]
            }
        ]
    },
    {
        name: 'menu.admin.company',
        menus: [
            {
                name: 'menu.admin.company',
                icon: 'fa-building',
                link: '/system/company-manage'
            }
        ]
    }
];
