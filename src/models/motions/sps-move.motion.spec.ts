import { ScrollRise } from '../../scroll-rise';
import { StickyPlatformScene } from '../scenes/sticky-platform.scene';
import { StaticActor } from '../actors/static.actor';
import { TimeFrame } from '../time-frame.model';
import { MoveMotion } from './move.motion';
import { Util } from '../../util';

describe("Sticky Platforms Scene's move motion test", function() {
    let sceneElement: HTMLElement;
    let scene: StickyPlatformScene;
    let blockElement: HTMLElement;
    let block: StaticActor;
    let sr: ScrollRise;

    let blockData = {
      width: 10,
      height: 10
    };

    beforeEach(function () {
        const fixture = `
            <div id="test-body">
                <div class="display"></div>
                <div id="scene">
                    <div id="block" style="width: ${blockData.width}px; height: ${blockData.height}px;"></div>
                </div>
                <div class="display"></div>
                <div class="display"></div>
            </div>
        `;

        document.body.insertAdjacentHTML('afterbegin', fixture);

        sceneElement = document.getElementById('scene');

        scene = new StickyPlatformScene(
            sceneElement,
            (w: number, h: number) => h,
        );

        sr = new ScrollRise(scene);

        blockElement = document.getElementById('block');

        block = new StaticActor(blockElement, {
            initSize: false,
            initOpacity: false,
        });
    });

    afterEach(function () {
        sr.stop();
        document.body.removeChild(document.getElementById('test-body'));
    });

    it("should be inited", function() {
        expect(blockElement).toBeTruthy();
        expect(block).toBeTruthy();
        expect(sceneElement).toBeTruthy();
        expect(scene).toBeTruthy();
        expect(sr).toBeTruthy();
    });

    it("should have a correct Y coord", function(done) {
        let afterScroll: () => void;

        block.addFrames([
            new TimeFrame(new MoveMotion({
                startX: () => 0,
                endX: (w: number) => 0,
                startY: () => 0,
                endY: (w: number, h: number) => h,
            }), (w: number, h: number) => 0, (w: number, h: number) => h),
        ]);

        scene.add(block);

        block.afterRender = () => afterScroll();

        expect(blockElement.getBoundingClientRect().x).toEqual(0);
        expect(blockElement.getBoundingClientRect().y).toEqual(Util.displayHeight());

        afterScroll = () => {
            expect(blockElement.getBoundingClientRect().x).toEqual(0);
            expect(blockElement.getBoundingClientRect().y).toEqual(0);
        };
        window.scrollTo(0, Util.displayHeight());

        afterScroll = () => {
            expect(blockElement.getBoundingClientRect().x).toEqual(0);
            expect(blockElement.getBoundingClientRect().y).toEqual(0);
        };
        window.scrollTo(0, Util.displayHeight() * 2);

        afterScroll = () => {
            expect(blockElement.getBoundingClientRect().x).toEqual(0);
            expect(blockElement.getBoundingClientRect().y).toEqual(-Util.displayHeight());
            done();
        };
        window.scrollTo(0, Util.displayHeight() * 3);
    });

    it("should have a correct X coord", function(done) {
        let afterScroll: () => void;

        block.addFrames([
            new TimeFrame(new MoveMotion({
                startX: () => 0,
                endX: (w: number) =>  w - blockData.width,
                startY: () => 0,
                endY: (w: number, h: number) => h,
            }), (w: number, h: number) => 0, (w: number, h: number) => h),
        ]);

        scene.add(block);

        block.afterRender = () => afterScroll();

        expect(blockElement.getBoundingClientRect().x).toEqual(0);
        expect(blockElement.getBoundingClientRect().y).toEqual(Util.displayHeight());

        afterScroll = () => {
            expect(blockElement.getBoundingClientRect().x).toEqual(0);
            expect(blockElement.getBoundingClientRect().y).toEqual(0);
        };
        window.scrollTo(0, Util.displayHeight());

        afterScroll = () => {
            expect(blockElement.getBoundingClientRect().x).toEqual(Util.displayWidth() - blockData.width);
            expect(blockElement.getBoundingClientRect().y).toEqual(0);
        };
        window.scrollTo(0, Util.displayHeight() * 2);

        afterScroll = () => {
            expect(blockElement.getBoundingClientRect().x).toEqual(Util.displayWidth() - blockData.width);
            expect(blockElement.getBoundingClientRect().y).toEqual(-Util.displayHeight());
            done();
        };
        window.scrollTo(0, Util.displayHeight() * 3);
    });
});
