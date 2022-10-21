import {TimeFrame} from "../../time-frame.model";
import {MoveMotion} from "../move.motion";

export abstract class MotionFixture {

    static block = {
        width: 17,
        height: 12,
    };

    static htmlTemplate(): string {
        return `
            <div id="test-body">
                <div class="display"></div>
                <div id="scene">
                    <div id="block" style="width: ${MotionFixture.block.width}px; height: ${MotionFixture.block.height}px;"></div>
                </div>
                <div class="display"></div>
                <div class="display"></div>
            </div>
        `;
    }

    static changeXTimeFrame(): TimeFrame {
        return new TimeFrame(new MoveMotion({
            startX: () => 0,
            endX: (w: number) =>  w - MotionFixture.block.width,
            startY: () => 0,
            endY: (w: number, h: number) => 0,
        }), (w: number, h: number) => 0, (w: number, h: number) => h);
    };

    static changeYTimeFrame(): TimeFrame {
        return new TimeFrame(new MoveMotion({
            startX: () => 0,
            endX: (w: number) => 0,
            startY: () => 0,
            endY: (w: number, h: number) => h - MotionFixture.block.height,
        }), (w: number, h: number) => 0, (w: number, h: number) => h);
    }

    static changeXYTimeFrame(): TimeFrame {
        return new TimeFrame(new MoveMotion({
            startX: () => 0,
            endX: (w: number) =>  w - MotionFixture.block.width,
            startY: () => 0,
            endY: (w: number, h: number) => h - MotionFixture.block.height,
        }), (w: number, h: number) => 0, (w: number, h: number) => h);
    }

}
