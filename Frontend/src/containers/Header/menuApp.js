export const adminMenu = [
    {
        name: 'menu.admin.user',
        menus: [
            {
                name: 'menu.admin.user',
                icon: 'fa-user',
                subMenus: [

                    { name: 'menu.admin.manage-admin', link: '/system/user-manage' }
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
                    { name: 'menu.admin.manage-cate', link: '/system/category-manage' },
                    { name: 'menu.admin.position', link: '/system/professional-position-manage' },
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
                subMenus: [
                    { name: 'manageCompany.add', link: '/system/add-company' },
                    { name: 'manageCompany.list', link: '/system/company-manage' },

                ]

            }
        ]
    }
];
