import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
  menu: any = [
    {
      title: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'ProgressBar', url: '/progress' },
        { title: 'Graph', url: '/graficas1' },
        { title: 'Promise', url: '/promise' },
        { title: 'RXJS', url: '/rxjs' }
      ]
    },
    {
      title: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Usuarios', url: '/usuarios' },
        { title: 'Hospitales', url: '/hospitales' },
        { title: 'Médicos', url: '/medicos' }
      ]
    }
  ];
  constructor() { }

}
