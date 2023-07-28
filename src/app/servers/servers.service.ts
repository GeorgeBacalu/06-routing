import { Injectable } from '@angular/core';
import { Server } from './server/server.model';

@Injectable({ providedIn: 'root' })
export class ServersService {
  private servers: Server[] = [
    { id: 1, name: "Productionserver", status: "online" },
    { id: 2, name: "Testserver", status: "offline" },
    { id: 3, name: "Devserver", status: "offline" },
  ];

  getServers(): Server[] { return this.servers; }

  getServer(id: number): Server { return this.servers.find(server => server.id === id); }

  updateServer(id: number, serverInfo: { name: string, status: string}): void {
    const serverToUpdate = this.servers.find(server => server.id === id);
    if (serverToUpdate) {
      serverToUpdate.name = serverInfo.name;
      serverToUpdate.status = serverInfo.status;
    }
  }
}
