import { OnInit, OnStart, Service } from '@rbxts/crochet';

const PlayerService = game.GetService('Players');

type Leaderstats = BoolValue & {
    'Seconds Alive': IntValue;
};

export class LeaderboardService extends Service implements OnInit, OnStart {
    private deltaElapsed = 0;

    public onInit(): void {
        PlayerService.PlayerAdded.Connect((player) => {
            this.createLeaderstatsForPlayer(player);
        });
    }

    public onStart(): void {
        game.GetService('RunService').Stepped.Connect((time: number, delta: number) => {
            this.onStepped(delta);
        });
    }

    public getLeaderstatsOfPlayer(player: Player): undefined | Leaderstats {
        const leaderstats = player.FindFirstChild('leaderstats');
        if (!leaderstats) {
            return undefined;
        }
        return leaderstats as Leaderstats;
    }

    private createLeaderstatsForPlayer(player: Player): void {
        const leaderstats = new Instance('BoolValue');
        leaderstats.Name = 'leaderstats';
        const secondsAlive = new Instance('IntValue');
        secondsAlive.Name = 'Seconds Alive';
        secondsAlive.Parent = leaderstats;

        player.CharacterAdded.Connect((character) => {
            (character.WaitForChild('Humanoid') as Humanoid).Died.Connect(() => {
                secondsAlive.Value = 0;
            });
        });

        leaderstats.Parent = player;
    }

    private onStepped(delta: number): void {
        this.deltaElapsed += delta;
        if (this.deltaElapsed > 1) {
            this.deltaElapsed -= 1;
            for (let player of PlayerService.GetPlayers()) {
                const leaderstats = this.getLeaderstatsOfPlayer(player);
                const alive = (player.Character?.FindFirstChild('Humanoid') as Humanoid)?.Health > 0;
                if (!leaderstats || !alive) continue;
                leaderstats['Seconds Alive'].Value += 1;
            }
        }
    }
}
