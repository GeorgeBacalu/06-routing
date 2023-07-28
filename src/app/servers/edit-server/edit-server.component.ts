import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './confirm-leave-guard.service';
import { Observable, Subscription } from 'rxjs';
import { Server } from '../server/server.model';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: Server;
  serverName: string = "";
  serverStatus: string = "";
  allowEdit: boolean = false;
  changesSaved: boolean = false;
  paramsSubscription: Subscription;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const { params, queryParams, fragment } = this.route.snapshot;
    console.log(queryParams);
    console.log(fragment);
    this.route.queryParams.subscribe((queryParams: Params) => this.allowEdit = queryParams["allowEdit"] === "true");
    this.route.fragment.subscribe();
    // These observables allow to react to changes to the query parameters or fragment while being on this component.
    this.server = this.serversService.getServer(+params["id"]);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params["id"]);
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    }); // Subscribed to route params to update the id if params changed
  }

  onUpdateServer(): void {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    this.changesSaved = true;
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return !this.allowEdit || ((this.serverName === this.server.name && this.serverStatus === this.server.status) || this.changesSaved) ? true : confirm("Are you sure you want to discard the changes?");
  }
}
