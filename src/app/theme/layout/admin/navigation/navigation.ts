import { Injectable } from '@angular/core';
import { Permission } from 'src/app/theme/shared/enums/permission';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  icon?: string;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  permissions?:string[];
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}
const NavigationItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Default',
        type: 'item',
        classes: 'nav-item',
        url: '/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'security',
    title: 'Security',
    type: 'group',
    icon: 'icon-navigation',
    // permissions:[Permission.CAN_VIEW_USERS,Permission.CAN_VIEW_ROLES],
    children: [
      {
        id: 'security-list',
        title: 'Security List',
        type: 'collapse',
        icon: 'ti ti-shield-lock',
        // permissions:[Permission.CAN_VIEW_USERS,Permission.CAN_VIEW_ROLES],
        children: [
          {
            id: 'users-list',
            title: 'Users',
            type: 'item',
            url: '/users',
            icon: 'ti ti-users',
            // permissions:[Permission.CAN_VIEW_USERS]
          },
          {
            id: 'roles-list',
            title: 'Roles',
            type: 'item',
            url: '/roles',
            icon: 'ti ti-layers-intersect',
            // permissions:[Permission.CAN_VIEW_ROLES]
          }
        ]
      }
    ]
  },
  {
    id: 'elements',
    title: 'Elements',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'typography',
        title: 'Typography',
        type: 'item',
        classes: 'nav-item',
        url: '/typography',
        icon: 'ti ti-typography'
      },
      {
        id: 'color',
        title: 'Colors',
        type: 'item',
        classes: 'nav-item',
        url: '/color',
        icon: 'ti ti-brush'
      },
      // {
      //   id: 'tabler',
      //   title: 'Tabler',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: 'https://tabler-icons.io/',
      //   icon: 'ti ti-plant-2',
      //   target: true,
      //   external: true
      // },
      {
        id: 'icons',
        title: 'Icons',
        type: 'item',
        classes: 'nav-item',
        url: '/icons',
        icon: 'ti ti-plant-2'
      },
      {
        id: 'tables',
        title: 'Tables',
        type: 'item',
        classes: 'nav-item',
        url: '/tables',
        icon: 'ti ti-table'
      },
      {
        id: 'cards',
        title: 'Cards',
        type: 'item',
        classes: 'nav-item',
        url: '/cards',
        icon: 'ti ti-id'
      },
      {
        id: 'buttons',
        title: 'Buttons',
        type: 'item',
        classes: 'nav-item',
        url: '/buttons',
        icon: 'ti ti-click'
      },
      {
        id: 'forms',
        title: 'Forms',
        type: 'item',
        classes: 'nav-item',
        url: '/forms',
        icon: 'ti ti-forms'
      }
    ]
  },
  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'ti ti-brand-chrome',
        breadcrumbs: true
      }
    ]
  },
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
