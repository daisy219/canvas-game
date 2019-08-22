/** 获取像素比 */
/** 这个地方是兼容高清屏的 */
let getPixelRatio = function (ctx) {
    let backingStore =
        ctx.backingStorePixelRatio ||
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio ||
        1;

    return (window.devicePixelRatio || 1) / backingStore;
};

let myCanvas = document.getElementById('my_canvas');
let ctx = myCanvas.getContext('2d');
let ratio = getPixelRatio(ctx);

myCanvas.style.width = myCanvas.width + 'px';
myCanvas.style.height = myCanvas.height + 'px';
myCanvas.width = myCanvas.width * ratio;
myCanvas.height = myCanvas.height * ratio;

ctx.scale(ratio, ratio);
ctx.font = '18px Georgia';
ctx.strokeStyle = '#999';



createMap();

let mapArr = [];
for (let i = 0; i < 20; i++) {
    let rowArr = [];
    for (let j = 0; j < 12; j++) {
        rowArr[j] = 0;
    }
    mapArr[i] = rowArr;
}



/** 绘制格子画板 */
function createMap(mapArr) {
    for (let j = 0; j < 20; j++) {
        for (let i = 0; i < 12; i++) {
            ctx.strokeRect(i * wh, j * wh, wh, wh);
            if (mapArr && mapArr[j][i] === 1){
                ctx.fillRect(i * wh, j * wh, wh, wh);
            }
        }
    }
}

function checkMap(){
    for (let j = 0; j < 20; j++) {
        for (let i = 0; i < 12; i++) {
           if(mapArr[j][i]){

           }
        }
    }
 
}



let wh = 30; // 组成图形的每个小方块的宽度
// 七种固定图形起始坐标
let blockArr = [
    
    [4, 0, 4, 1, 5, 1, 6, 1],
    [4, 1, 5, 1, 6, 1, 6, 0],
    [4, 0, 5, 0, 5, 1, 6, 1],
    [4, 1, 5, 0, 5, 1, 6, 0],
    [5, 0, 4, 1, 5, 1, 6, 1],
    [4, 0, 5, 0, 6, 0, 7, 0],
    [5, 0, 6, 0, 5, 1, 6, 1]
];
let nowRect = blockArr[Math.floor(Math.random() * blockArr.length)];

/** 绘制随机图形类 */
class Shape {
    constructor(nowRect) {
        this.nowRect = nowRect;
    }
    createRect(down = 0, lr = 0) {
        let nowRect = this.nowRect;
        let wh = 30;
        let lastPoint = [];
        ctx.fillStyle = 'hsla(200,100%,50%,.5)'; // 图形样式
        for (let i = 0, len = nowRect.length; i < len; i += 2) {
            ctx.fillRect(
                (nowRect[i] + lr) * wh,
                (nowRect[i + 1] + down) * wh,
                wh,
                wh
            );
            lastPoint.push(nowRect[i] + lr, nowRect[i + 1] + down);
        }
        return lastPoint;
    }
    upData(nowRect) {
        this.nowRect = nowRect;
        return this;
    }
}


/** 图形停止下落判断 */
function judge_stop(lastPoint) {
    for (let i = 0; i < lastPoint.length; i++) {
        if (lastPoint[i] >= 19) {
            return false;
        }

    }
    return true;
}
let row = 0; // 第几行
let line = 0; // 第几列
let lastPoint = [];
/** 每秒运动一次 */
// createMap();
let nowShape = new Shape(nowRect);

function run() {
    // console.log(lastPoint);
    // clear_color(lastPoint);
    ctx.clearRect(0, 0, 1000, 1000);
    createMap(mapArr);
    lastPoint = nowShape.createRect(row, line);
    // console.log(lastPoint);
    // row++;
    if (judge_stop(lastPoint)) {
        // lastPoint[0].y++;
        row++;
    } else {
        const stop_point = lastPoint;
        // new Shape(nowRect).createRect(end_row, end_line);
        // for (let i = 0; i < stop_point.length; i += 2) {
        //     ctx.fillRect(
        //         stop_point[i] * wh,
        //         stop_point[i + 1] * wh,
        //         wh,
        //         wh
        //     );
        // }

        // console.log(stop_point);
        for (let i = 0; i < stop_point.length; i += 2) {
            mapArr[stop_point[i + 1]][stop_point[i]] = 1;
        }

        console.log(mapArr);




        // have_done_point.push(stop_point);
        // console.log(have_done_point);
        nowRect = blockArr[Math.floor(Math.random() * blockArr.length)];
        row = 0;
        line = 0;
        lastPoint = nowShape.upData(nowRect).createRect(row, line);
    }
    setTimeout(() => {
        run();
    }, 1000);
}
run();

/** 清空指定位置图形 */
function clear_color(coordinate_arr) {
    let top_row = 0;
    let coordinate_arr_tran = [];

    for (let i = 1; i < coordinate_arr.length; i += 2) {
        if (coordinate_arr[i] > top_row) {
            top_row = coordinate_arr[i];
        }
    }
    for (let i = 0; i < coordinate_arr.length; i += 2) {
        coordinate_arr_tran.push([coordinate_arr[i], coordinate_arr[i + 1]]);
    }

    let coordinate_axis = creat_up_arr(12, top_row + 1);

    coordinate_arr_tran.forEach((item, index) => {
        if (coordinate_axis.includes(item)) {
            coordinate_axis.splice(index, 1);
        }
    });
    console.log(coordinate_arr_tran);
    // console.log(coordinate_axis);

    coordinate_axis.forEach((item) => {
        ctx.clearRect(item[0] * wh, item[1] * wh, wh, wh);
    });
}
/** 监听键盘上下左右事件 */
document.addEventListener('keydown', function (e) {
    // console.log(e.keyCode);
    console.log(lastPoint);

    if (e.keyCode === 87) {
        console.log('up');
    }

    if (e.keyCode === 65) {
        line--;
        ctx.clearRect(0, 0, 1000, 1000);
        createMap(mapArr);
        lastPoint = nowShape.createRect(row, line);

    }
    if (e.keyCode === 68) {
        line++;
        ctx.clearRect(0, 0, 1000, 1000);
        createMap(mapArr);
        lastPoint = nowShape.createRect(row, line);
    }
    if (e.keyCode === 83) {
        row++;
        ctx.clearRect(0, 0, 1000, 1000);
        createMap(mapArr);
        lastPoint = nowShape.createRect(row, line);

    }

});

/** 创建坐标轴（顺序数组） */
function creat_up_arr(row_length, line_length) {
    let new_arr = [];
    for (let i = 0; i < row_length; i++) {
        for (let j = 0; j < line_length; j++) {
            new_arr.push([i, j]);
        }
    }
    return new_arr;
}
// console.log(creat_up_arr(3, 4));
// creat_up_arr();
// ctx.save();

// ctx.fillStyle = 'red';
// ctx.fillRect(2 * wh, 1 * wh, wh, wh);
// ctx.restore()

// ctx.fillRect(3 * wh, 1 * wh, wh, wh);