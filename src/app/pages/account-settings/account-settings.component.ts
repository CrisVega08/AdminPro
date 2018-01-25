import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    public _settings: SettingsService
  ) { }

  ngOnInit() {
    this.check();
  }
  changeColor(theme: string, link: any) {
    let selectors: any = document.getElementsByClassName('selector');
    for (let ele of selectors ) {
      ele.classList.remove('working');
    }
    link.classList.add('working');
    this._settings.applytheme(theme);
  }

  check() {
    const selectors: any = document.getElementsByClassName('selector');
    const theme = this._settings.setting.theme;
    for (let ele of selectors ) {
      if ( ele.getAttribute('data-theme') === theme ) {
        ele.classList.add('working');
        break;
      }
    }
  }
}
