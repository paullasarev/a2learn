import {Component, ViewEncapsulation, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params } from "@angular/router";
import "rxjs/add/operator/filter";

interface IBreadcrumb {
  label: string;
  route?: string;
}

@Component({
  selector: 'breadcrumbs',
  template: require('./breadcrumbs.component.html'),
  styles: [
    require('./breadcrumbs.styles.scss'),
  ],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbsComponent implements OnInit {

  private breadcrumbs: IBreadcrumb[]=[];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
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
      this.changeDetectorRef.markForCheck();
    });
  }

  private getBreadcrumbs(route: ActivatedRoute) {

    for (let child of route.children) {

      let snapshot = child.snapshot;

      if (snapshot.data.breadcrumb) {
        for (let bc of snapshot.data.breadcrumb) {
          let breadcrumb: IBreadcrumb = {
            label: bc.expr ? bc.expr(snapshot.params) : bc.label,
            route: bc.route,
          };
          this.breadcrumbs.push(breadcrumb);
        }
      }

      this.getBreadcrumbs(child);
    }
  }

}
