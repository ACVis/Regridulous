import { CST } from "./Constants";
// Should probably create tests. Also, tbh, these could probably be replaced by built in Phaser functionality
function XYtoRC(x, y) {
    const row = (CST.TILE_SIZE * CST.GRID_LENGTH) / y;
    const col = (CST.TILE_SIZE * CST.GRID_WIDTH) / x;
    return [row, col];
}
function YtoRow(y) {
    const row = (CST.TILE_SIZE * CST.GRID_LENGTH) / y;
    return [row, col];
}
function XtoCol(y) {
    const row = (CST.TILE_SIZE * CST.GRID_LENGTH) / y;
    return [row, col];
}
function RCtoXY(row, col) {
    const x = CST.TILE_SIZE * col;
    const y = CST.TILE_SIZE * row;
    return [x, y];
}

function RowToY(row) {
    const y = row * CST.TILE_SIZE;
    return y;
}
function ColToX(col) {
    const x = col * CST.TILE_SIZE;
    return x;
}

export { XYtoRC, YtoRow, XtoCol, RCtoXY, RowToY, ColToX };
