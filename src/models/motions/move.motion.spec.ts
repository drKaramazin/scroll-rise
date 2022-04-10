import { ScrollRise, StickyPlatformScene, StaticActor, TimeFrame, MoveMotion } from '../../../lib/index.es';

describe("Move motion test", function() {
    let sceneElement: HTMLElement;
    let scene: any;
    let blockElement: HTMLElement;
    let sr: any;

    beforeEach(function () {
        const fixture = `
            <div id="scene">
                <div id="block"></div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', fixture);

        sceneElement = document.getElementById('scene');

        scene = new StickyPlatformScene(
            sceneElement,
            (w: number, h: number) => h * 2,
        );

        sr = new ScrollRise(scene);

        blockElement = document.getElementById('block');
    });

    it("should be inited", function() {
        const block = new StaticActor(blockElement, {
            initSize: false,
            initOpacity: false,
        });

        block.addFrames([
            new TimeFrame(new MoveMotion({
                startX: () => 0,
                endX: (w: number) => w,
                startY: () => 0,
                endY: (w: number, h: number) => h,
            }), (w: number, h: number) => 0, (w: number, h: number) => h),
        ]);

        scene.add(block);

        window.scrollTo(0, 500);

        console.log(blockElement.getBoundingClientRect().x, blockElement.getBoundingClientRect().y);

        expect(blockElement).toBeTruthy();
        expect(block).toBeTruthy();
        expect(sceneElement).toBeTruthy();
        expect(scene).toBeTruthy();
        expect(sr).toBeTruthy();
    });
});
