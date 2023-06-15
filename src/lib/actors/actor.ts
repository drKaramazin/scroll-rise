import { TimeFrame } from '../time-frame';
import { Scene } from '../scenes/scene';
import { Wrapped } from '../decorators/wrapped';
import { RenderingActorStrategy } from '../strategies/rendering-actor.strategy';

export abstract class Actor {

  public element?: HTMLElement;
  abstract bindElement(scrollPosOnFrame: number, scene: Scene<any>): HTMLElement | undefined;

  protected frames: TimeFrame[] = [];

  abstract findFirstMoveMotionFrame(): TimeFrame;

  afterBindElement(): void {}

  renderActorStrategy = new RenderingActorStrategy();

  beforeRender: () => void;
  afterRender: () => void;
  @Wrapped({ before: 'beforeRender', after: 'afterRender' })
  render(scrollPos: number, scene: Scene<any>): void {
    if (this.element) {
      const frame = this.renderActorStrategy.takeRenderFrame(scrollPos);
      if (frame) {
        frame.motion.make(scrollPos, frame, this.element, scene);
      }
    } else {
      throw new Error('Here isn\'t an element');
    }
  }

  addFrame(frame: TimeFrame): void {
    this.addFrames([frame]);
  }

  addFrames(frames: TimeFrame[]): void {
    this.frames = this.frames.concat(frames);
    this.renderActorStrategy.prerender(this.frames);
  }

  initElement(scrollPosOnFrame: number, scene: Scene<any>): void {
    this.element = this.bindElement(scrollPosOnFrame, scene);
    this.afterBindElement();
  }

}
