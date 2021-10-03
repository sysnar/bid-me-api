import { Injectable } from '@nestjs/common';
import { FsExplorer } from './fsExplorer.model';
import axios from 'axios';

@Injectable()
export class Agent {
  private _queue;
  constructor(private fsExplorer: FsExplorer) {}

  // Scrap bid data from queue
  readQueue(path: string, file: string): string[] {
    this._queue = this.fsExplorer.fileToArray(path, file);
    return this.fsExplorer.fileToArray(path, file);
  }

  scrapData = async (queue: string[]) => {
    for (let link of queue) {
      await axios.get(link);

      // Store bid data to crawlled.txt & DB
    }
    // update data in queue.txt
  };
}
