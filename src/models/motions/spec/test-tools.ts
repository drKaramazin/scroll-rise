import { Actor } from '../../actors/actor.model';
import { MotionFixture, TestStage } from './motion.fixture';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jasmine {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<T> {
      // eslint-disable-next-line @typescript-eslint/method-signature-style
      approximatelyEqualTo(expected: number, margin: number): boolean;
    }
  }
}

export type StageContextFn = (stage: number, label?: string) => string;
export const DefaultContextFn: StageContextFn = (stage: number, label?: string) => `stage ${stage}` + (label ? ` (${label})` : '');
export interface StageValue {
  value: number;
  withContext?: StageContextFn;
  margin?: number;
}

export interface ChangeStage {
  scrollTo?: TestStage;
  coords?: {
    x: StageValue;
    y: StageValue;
  };
  size?: {
    width: StageValue;
    height: StageValue;
  };
}

export class TestTools {

  static testGoingStages(block: Actor, blockElement: HTMLElement, stages: ChangeStage[]): Promise<void> {
    let promise: Promise<void> = Promise.resolve();

    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i];
      promise = promise.then(() => {
        return new Promise(resolve => {
          block.afterRender = () => {
            if (stage.coords) {
              const contextX = stage.coords.x.withContext ? stage.coords.x.withContext(i, 'x') : DefaultContextFn(i, 'x');
              const contextY = stage.coords.y.withContext ? stage.coords.y.withContext(i, 'y') : DefaultContextFn(i, 'y');

              if (stage.coords.x.margin) {
                expect(blockElement.getBoundingClientRect().x)
                  .withContext(contextX)
                  .approximatelyEqualTo(stage.coords.x.value, stage.coords.x.margin);
              } else {
                expect(blockElement.getBoundingClientRect().x)
                  .withContext(contextX)
                  .toEqual(stage.coords.x.value);
              }

              if (stage.coords.y.margin) {
                expect(blockElement.getBoundingClientRect().y)
                  .withContext(contextY)
                  .approximatelyEqualTo(stage.coords.y.value, stage.coords.y.margin);
              } else {
                expect(blockElement.getBoundingClientRect().y)
                  .withContext(contextY)
                  .toEqual(stage.coords.y.value);
              }
            }

            if (stage.size) {
              const contextWidth = stage.size.width.withContext ? stage.size.width.withContext(i, 'width') : DefaultContextFn(i, 'width');
              const contextHeight = stage.size.height.withContext ? stage.size.height.withContext(i, 'height') : DefaultContextFn(i, 'height');

              if (stage.size.width.margin) {
                expect(blockElement.clientWidth)
                  .withContext(contextWidth)
                  .approximatelyEqualTo(stage.size.width.value, stage.size.width.margin);
              } else {
                expect(blockElement.clientWidth)
                  .withContext(contextWidth)
                  .toEqual(stage.size.width.value);
              }

              if (stage.size.height.margin) {
                expect(blockElement.clientHeight)
                  .withContext(contextHeight)
                  .approximatelyEqualTo(stage.size.height.value, stage.size.height.margin);
              } else {
                expect(blockElement.clientHeight)
                  .withContext(contextHeight)
                  .toEqual(stage.size.height.value);
              }
            }
            resolve();
          };
          if (stage.scrollTo) {
            window.scrollTo(stage.scrollTo.x, stage.scrollTo.y);
          } else {
            const scrollTo = MotionFixture.stages()[i];
            window.scrollTo(scrollTo.x, scrollTo.y);
          }
        });
      });
    }

    return promise;
  }

}
