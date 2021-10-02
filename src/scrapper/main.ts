import { FsExplorer } from './fsExplorer.model';
import { Agent } from './scrapper.agent';
import { DateCalculator, Frontier } from './scrapper.frontier';

const dCalculater = new DateCalculator();
const fsExplorer = new FsExplorer();
const frontier = new Frontier(dCalculater, fsExplorer);
const agent = new Agent(fsExplorer);

const naraURL = `http://www.g2b.go.kr/index.jsp`;
// const naraURL = `http://c-up.io`;
// frontier.main(naraURL, { headless: true });

const _path = 'results';
const _filename = 'queue.txt';
console.log(agent.readQueue(_path, _filename));
