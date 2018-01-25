import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {
  setting: Settings = {
    themeUrl: 'assets/css/colors/blue.css',
    theme: 'blue'
  };
  constructor(@Inject(DOCUMENT) private _document) {
    this.obtainSetting();
  }

  saveSettings() {
    localStorage.setItem('settings', JSON.stringify(this.setting));
  }

  obtainSetting() {
    if ( localStorage.getItem('settings')) {
      this.setting = JSON.parse( localStorage.getItem('settings'));
      this.applytheme(this.setting.theme);
    } else {
      this.applytheme(this.setting.theme);
    }
  }

  applytheme(theme: string) {
    let url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', url );

    this.setting.theme = theme;
    this.setting.themeUrl = url;
    this.saveSettings();
  }

}

interface Settings {
  themeUrl: String;
  theme: string;
}