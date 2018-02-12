import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Title, Meta } from '@angular/platform-browser';
import { MetaDefinition } from '@angular/platform-browser';
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  page: String = '';
  constructor(
    private _router: Router,
    public _title: Title,
    public _meta: Meta
  ) {

    this.getDataRouter()
      .subscribe( data => {
        this.page = data.title;
        this._title.setTitle(data.title);

        // let metaTag: MetaDefinition = {
        //   name: 'description',
        //   content: this.page
        // };

        // this._meta.updateTag(metaTag);
      });
  }

  ngOnInit() {
  }

  getDataRouter() {
    return this._router.events
    .filter( event => event instanceof ActivationEnd)
    .filter( (event: ActivationEnd ) => event.snapshot.firstChild === null )
    .map( (event: ActivationEnd) => event.snapshot.data);
  }

}
