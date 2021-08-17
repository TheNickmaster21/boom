import Roact from '@rbxts/roact';

const fill = new UDim2(1, 0, 1, 0);

export default () => (
    <frame Size={new UDim2(0, 200, 0, 70)} Position={new UDim2(0.5, 0, 0.8, 0)} AnchorPoint={new Vector2(0.5, 0.5)}>
        <textlabel Size={fill} Text="Do not press the button!"></textlabel>
    </frame>
);
