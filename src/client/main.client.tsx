const playerGui = game.GetService('Players').LocalPlayer.FindFirstChild('PlayerGui') as PlayerGui;

import Roact from '@rbxts/roact';
import Warning from './warning/warning';

const warningGui = (
    <screengui>
        <Warning />
    </screengui>
);

game.GetService('Players').LocalPlayer.CharacterAdded.Connect(() => Roact.mount(warningGui, playerGui, 'WarningGUI'));
