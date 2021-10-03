import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FsExplorer {
  private readonly logger = new Logger(FsExplorer.name);
  constructor() {}

  checkDir(path: string) {
    if (!fs.existsSync(path)) {
      this.logger.log(`Result directory doesn't exits`);
      this.logger.log(`Creating directory results...`);
      fs.mkdirSync(path);
    }
  }

  checkFile(path: string, files: string[]) {
    files.forEach((file) => {
      let fullPath = `${path}/${file}`;
      if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, '');
      }
    });
  }

  writeFile(path: string, file: string, links: string[]) {
    let fullPath = `${path}/${file}`;
    for (let link of links) {
      fs.appendFileSync(fullPath, link + '\n');
    }
  }

  fileToArray(path: string, file: string) {
    let fullPath = `${path}/${file}`;
    return fs.readFileSync(fullPath, 'utf8').split('\n').filter(Boolean);
  }
}
