import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-api',
  templateUrl: './edit-api.component.html',
  styleUrls: ['./edit-api.component.scss']
})
export class EditApiComponent implements OnInit {


  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((data) => {
      console.log(this.route.snapshot.params['name']);
    });
  }

}
