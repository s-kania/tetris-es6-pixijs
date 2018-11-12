const GAME_DATA = {
    WIDTH: 10,
    HEIGHT: 20,
    BLOCK_SIZE: 16,
    PREVIEW_BOARD_WIDTH: 4,
    PREVIEW_BOARD_HEIGHT: 4,
    MOVING_TETROMINO_GENERATE_COORDINATES: {
        COLUMN: 4,
        ROW: 0
    },
    INIT_BLOCK_FALL_TIME: 1000,
    TETROMINO_DATA: [
        { name: "I", rotations: [0x0F00, 0x2222, 0x00F0, 0x4444], textureId: "block_cyan" },
        { name: "J", rotations: [0x44C0, 0x8E00, 0x6440, 0x0E20], textureId: "block_blue" },
        { name: "L", rotations: [0x4460, 0x0E80, 0xC440, 0x2E00], textureId: "block_orange" },
        { name: "O", rotations: [0xCC00, 0xCC00, 0xCC00, 0xCC00], textureId: "block_yellow" },
        { name: "S", rotations: [0x06C0, 0x8C40, 0x6C00, 0x4620], textureId: "block_green" },
        { name: "T", rotations: [0x0E40, 0x4C40, 0x4E00, 0x4640], textureId: "block_purple" },
        { name: "Z", rotations: [0x0C60, 0x4C80, 0xC600, 0x2640], textureId: "block_red" }
    ],
    MOVE: {
        LEFT: { X: -1, Y: 0, DIRECTION: "LEFT" },
        RIGHT: { X: 1, Y: 0, DIRECTION: "RIGHT" },
        DOWN: { X: 0, Y: 1, DIRECTION: "DOWN" },
        UP: { DIRECTION: "ROTATE" }
    },
    STATES: {
        LOADING: 0,
        PLAYING: 1,
        GAME_OVER: 2
    }
};

export default GAME_DATA;