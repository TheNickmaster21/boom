import { BoomService } from './boom.service';
import { CrochetServer } from '@rbxts/crochet';
import { LeaderboardService } from './leaderboard.service';

CrochetServer.registerServices([LeaderboardService, BoomService]);
CrochetServer.start();
