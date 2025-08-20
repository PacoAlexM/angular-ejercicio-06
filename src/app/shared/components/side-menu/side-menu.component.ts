import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
    title: string;
    route: string;
}

const reactiveItems = reactiveRoutes[0].children ?? [];

@Component({
    selector: 'side-menu',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
    reactiveMenuItem: MenuItem[] = reactiveItems
        .filter(i => i.path !== '**')
        .map(i => ({
            title: `${i.title}`,
            route: `reactive/${i.path}`,
        }));

    authMenu: MenuItem[] = [{
        title: 'Registro',
        route: './auth',
    }];

    countryMenu: MenuItem[] = [{
        title: 'Países',
        route: './country',
    }];
}
