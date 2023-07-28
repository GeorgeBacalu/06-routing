import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { AuthGuard } from './auth-guard.service';
import { ConfirmLeaveGuard } from './servers/edit-server/confirm-leave-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: 'full' },
  { path: "users", component: UsersComponent, children: [
    { path: ":id/:name", component: UserComponent }
  ] },
  { path: "servers", canActivateChild: [AuthGuard], component: ServersComponent, children: [
    { path: ":id", component: ServerComponent, resolve: { server: ServerResolver } },
    { path: ":id/edit", component: EditServerComponent, canDeactivate: [ConfirmLeaveGuard] }
  ] },
  { path: "not-found", component: ErrorPageComponent, data: { message: "Page not found!" } },
  { path: "**", redirectTo: "/not-found" }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
    // RouterModule.forRoot(routes, { useHash: true }) // "hashtag mode" should be enabled in a production environment (it informs the server to handle only the part of the URL before the '#' => the part after will be parsed by Angular) 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
