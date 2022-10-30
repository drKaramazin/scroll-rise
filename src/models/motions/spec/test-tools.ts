import { Actor } from '../../actors/actor.model';

export interface ChangeStage {
  scrollTo?: {
    x: number;
    y: number;
  };
  x: number;
  y: number;
  withContext: string;
}

export class TestTools {

  static testGoingStages(block: Actor, blockElement: HTMLElement, stages: ChangeStage[]): Promise<void> {
    let promise: Promise<void> = Promise.resolve();

    for (const stage of stages) {
      promise = promise.then(() => {
        return new Promise(resolve => {
          block.afterRender = () => {
            // console.log('expect', blockElement.getBoundingClientRect().x, blockElement.getBoundingClientRect().y);
            expect(blockElement.getBoundingClientRect().x).withContext(stage.withContext).toEqual(stage.x);
            expect(blockElement.getBoundingClientRect().y).withContext(stage.withContext).toEqual(stage.y);
            resolve();
          };
          if (stage.scrollTo) {
            // console.log('scrollTo', stage.scrollTo.y);
            window.scrollTo(stage.scrollTo.x, stage.scrollTo.y);
          }
        });
      });
    }

    return promise;
  }

}
