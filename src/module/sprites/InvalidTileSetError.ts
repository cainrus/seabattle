export class InvalidTileSetError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidTileSetError';
    }
}
