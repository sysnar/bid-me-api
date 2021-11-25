import { DateCalculator } from '../libs/date-calculator';
import { FsExplorer } from './fsExplorer.model';
import { Agent } from './scrapper.agent';
import { Frontier } from './scrapper.frontier';

const dCalculater = new DateCalculator();
const fsExplorer = new FsExplorer();
const frontier = new Frontier(dCalculater, fsExplorer);
const agent = new Agent(fsExplorer);

const naraURL = `http://www.g2b.go.kr/index.jsp`;
frontier.main(naraURL, { headless: true });

const _path = 'results';
const _filename = 'queue.txt';
const queue = agent.readQueue(_path, _filename);
// console.log(queue);
// agent.scrapData(queue);
