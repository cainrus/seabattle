import {getIndexFrom9bitMask} from "./getIndexFrom9bitMask";
import {mask9bit71, mask9bitSpecial, mask9bit68, mask9bit24, mask9bit17} from "../masks/mocks";

describe('getIndexFrom9bitMask', () => {

    it('case special', () => {
        const tileIndex = getIndexFrom9bitMask(mask9bitSpecial);
        expect(tileIndex).toBe(-0);
    });

    it('case 71', () => {
        const tileIndex = getIndexFrom9bitMask(mask9bit71);
        expect(tileIndex).toBe(71);
    });
    it('case 68', () => {
        const tileIndex = getIndexFrom9bitMask(mask9bit68);
        expect(tileIndex).toBe(68);
    });
    it('case 24', () => {

        const tileIndex = getIndexFrom9bitMask(mask9bit24);
        expect(tileIndex).toBe(24);
    });
    it('case 17', () => {
        const tileIndex = getIndexFrom9bitMask(mask9bit17);
        expect(tileIndex).toBe(17);

    })
})
