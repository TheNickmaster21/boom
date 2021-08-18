import { Controller, OnStart } from '@rbxts/crochet';

import Roact from '@rbxts/roact';
import Warning from './warning/warning';

export class WarningController extends Controller implements OnStart {
    private localPlayer: Player;
    private playerGui: PlayerGui;

    constructor() {
        super();
        this.localPlayer = game.GetService('Players').LocalPlayer;
        this.playerGui = this.localPlayer.FindFirstChild('PlayerGui') as PlayerGui;
    }

    public onStart(): void {
        game.GetService('Players').LocalPlayer.CharacterAdded.Connect(() => this.bindWarningGui());

        if (this.localPlayer.Character) {
            this.bindWarningGui();
        }
    }

    private bindWarningGui(): void {
        const warningGui = (
            <screengui>
                <Warning />
            </screengui>
        );

        Roact.mount(warningGui, this.playerGui, 'WarningGUI');
    }
}
