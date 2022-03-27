import { Actor } from '../actors/actor.model';
import { Util } from '../../util';

export interface SceneOptions {
    offset?: (deviceWidth: number, deviceHeight: number, sceneHeight: number) => number;
}

export abstract class SceneModel<Options extends SceneOptions> {

    protected _list: Actor[] = [];
    public abstract name: string;

    protected abstract init(): void;
    protected abstract resizeHeight(): void;

    constructor(
        protected el: HTMLElement,
        protected height: (deviceWidth: number, deviceHeight: number) => number,
        protected options?: Options,
    ) {
        this.setDefaults();
        this.init();
    }

    protected setDefaults() {
        this.options = {
            ...this.defaults(),
            ...this.options,
        };
    }

    defaults(): SceneOptions {
        return {
            offset: () => 0,
        };
    }

    offset(): number {
        return this.options.offset(
            Util.displayWidth(),
            Util.displayHeight(),
            this.height(Util.displayWidth(), Util.displayHeight()),
        );
    }

    elementY(): number {
        return this.el.getBoundingClientRect().y;
    }

    add(actor: Actor) {
        this._list.push(actor);
    }

    get list(): Actor[] {
        return this._list;
    }

}
