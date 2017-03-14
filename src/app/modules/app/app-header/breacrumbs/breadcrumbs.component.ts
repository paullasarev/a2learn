import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params } from "@angular/router";
import "rxjs/add/operator/filter";

interface IBreadcrumb {
  label: string;
  params: Params;
}

@Component({
  selector: 'breadcrumbs',
  template: require('./breadcrumbs.component.html'),
  styles: [
    require('./breadcrumbs.styles.scss'),
  ],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbsComponent implements OnInit {

  private breadcrumbs: IBreadcrumb[]=[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  public ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event) => {
      this.breadcrumbs = [];
      for (let root of this.activatedRoute.pathFromRoot) {
        this.getBreadcrumbs(root);
      }
      // console.log('NavigationEnd', this.breadcrumbs)
    });
  }

  private getBreadcrumbs(route: ActivatedRoute) {

    for (let child of route.children) {

      let snapshot = child.snapshot;

      if (snapshot.data.breadcrumb) {
        let prop = snapshot.data.breadcrumb;
        let breadcrumbs = Array.isArray(prop) ? prop : [prop];
        for (let bc of breadcrumbs) {
          let breadcrumb: IBreadcrumb = {
            label: typeof bc === "string" ? bc : bc(snapshot.params),
            params: snapshot.params,
          };
          this.breadcrumbs.push(breadcrumb);
        }
      }

      this.getBreadcrumbs(child);
    }
  }

}
