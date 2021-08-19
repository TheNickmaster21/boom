import { OnInit, Service } from '@rbxts/crochet';

export class BoomService extends Service implements OnInit {
    public onInit(): void {
        game.GetService('ProximityPromptService').PromptTriggered.Connect((prompt, player) => {
            // TODO Use attributes once they are supported by rojo
            // if (prompt.GetAttribute('PromptType') !== 'Boom') {
            if (prompt.Name !== 'Boom') {
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
