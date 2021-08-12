export {};

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
