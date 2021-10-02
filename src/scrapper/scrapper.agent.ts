import { Injectable } from '@nestjs/common';
import { FsExplorer } from './fsExplorer.model';

@Injectable()
export class Agent {
  constructor(private fsExplorer: FsExplorer) {}

  // Scrap bid data from queue
  readQueue(path: string, file: string): string[] {
    return this.fsExplorer.fileToArray(path, file).split('\n').filter(Boolean);
  }
}
