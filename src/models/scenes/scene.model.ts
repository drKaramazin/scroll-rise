import { Actor } from '../actors/actor.model';
import { Util } from '../../util';

export interface SceneOptions {
  offset: (deviceWidth: number, deviceHeight: number, sceneHeight: number) => number;
}

export abstract class SceneModel<Options extends SceneOptions> {

  protected _actors: Actor[] = [];
  public abstract name: string;

  protected abstract init(): void;
  public abstract resizeHeight(): void;

  constructor(
    protected el: HTMLElement,
    protected height: (deviceWidth: number, deviceHeight: number) => number,
    protected options?: Options,
  ) {
    this.setDefaults();
    this.init();
  }

  protected setDefaults(): void {
    this.options = {
      ...this.defaults(),
      ...this.options,
    } as Options;
  }

  defaults(): SceneOptions {
    return {
      offset: () => 0,
    };
  }

  offset(): number {
    return this.options!.offset(
      Util.clientWidth(),
      Util.clientHeight(),
      this.height(Util.clientWidth(), Util.clientHeight()),
    );
  }

  elementY(): number {
    return this.el.getBoundingClientRect().y;
  }

  add(actor: Actor): void {
    this._actors.push(actor);
  }

  get actors(): Actor[] {
    return this._actors;
  }

}
