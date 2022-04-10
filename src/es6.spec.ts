import { StickyPlatformScene, ScrollRise } from '../lib/index.es';

describe("Init test", function() {
    let sceneElement: HTMLElement;
    let scene: unknown;
    let sr: unknown;

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
            (w: number, h: number) => h,
        );

        sr = new ScrollRise(scene);
    });

    it("should be inited", function() {
        expect(sceneElement).toBeTruthy();
        expect(scene).toBeTruthy();
        expect(sr).toBeTruthy();
    });
});
