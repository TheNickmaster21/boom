export {};

const PlayerService = game.GetService('Players');

type Leaderstats = BoolValue & {
    'Seconds Alive': IntValue;
};

PlayerService.PlayerAdded.Connect((player) => {
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
});

function leaderstatsOfPlayer(player: Player): undefined | Leaderstats {
    const leaderstats = player.FindFirstChild('leaderstats');
    if (!leaderstats) {
        return undefined;
    }
    return leaderstats as Leaderstats;
}

let elapsed = 0;

game.GetService('RunService').Stepped.Connect((time: number, delta: number) => {
    elapsed += delta;
    if (elapsed > 1) {
        elapsed -= 1;
        for (let player of PlayerService.GetPlayers()) {
            const leaderstats = leaderstatsOfPlayer(player);
            const alive = (player.Character?.FindFirstChild('Humanoid') as Humanoid)?.Health > 0;
            if (!leaderstats || !alive) continue;
            leaderstats['Seconds Alive'].Value += 1;
        }
    }
});
