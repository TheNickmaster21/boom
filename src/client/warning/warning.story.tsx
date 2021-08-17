import Roact from '@rbxts/roact';
import Warning from './warning';

export = (target: Instance) => {
    const handle = Roact.mount(<Warning />, target);
    return () => Roact.unmount(handle);
};
