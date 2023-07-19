import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ServersService {
  private servers: { id: number, name: string, status: string }[] = [
    { id: 1, name: "Productionserver", status: "online" },
    { id: 2, name: "Testserver", status: "offline" },
    { id: 3, name: "Devserver", status: "offline" },
  ];

  getServers(): { id: number, name: string, status: string }[] {
    return this.servers;
  }

  getServer(id: number): { id: number, name: string, status: string } {
    return this.servers.find(server => server.id === id);
  }

  updateServer(id: number, serverInfo: { name: string, status: string}): void {
    const serverToUpdate = this.servers.find(server => server.id === id);
    if (serverToUpdate) {
      serverToUpdate.name = serverInfo.name;
      serverToUpdate.status = serverInfo.status;
    }
  }
}
