import { OnInit, Service } from '@rbxts/crochet';

export class BoomService extends Service implements OnInit {
    public onInit(): void {
        game.GetService('ProximityPromptService').PromptTriggered.Connect((prompt, player) => {
            if (prompt.GetAttribute('PromptType') !== 'Boom') {
                return;
            }
            const character = player.Character;
            if (character?.PrimaryPart) {
                const boom = new Instance('Explosion');
                boom.Position = character.PrimaryPart.Position;
                boom.Parent = character.PrimaryPart;
            }
        });
    }
}
