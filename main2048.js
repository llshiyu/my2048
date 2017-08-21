var board = new Array();//游戏数据
var score = 0;//游戏分数

$(document).ready(function () {
    newgame();
});

function newgame() {
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

//初始化
function init() {
    //通过js设置每个小个子的位置
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $('#grid-cell-' + i + '-' + j);//获取每一格小格子
            gridCell.css('top', getPosTop(i, j));//通过传入坐标值计算相应的top值，函数在support2048.js中
            gridCell.css('left', getPosLeft(i, j));//通过传入坐标值计算相应的left值
        }
    }
    // 设置每一格的初始值为0
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    //每一次初始化的时候新建number-cell
    updateBoardView();
}

//根据board变量的值对前端的 number-cell 进行操作
function updateBoardView() {
    $('.number-cell').remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('#gridContainer').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);
            if (board[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                //把number-cell放到grid-cell的中间位置
                theNumberCell.css('top', getPosTop(i, j) + 50);
                theNumberCell.css('left', getPosLeft(i, j) + 50);
            }
            else {
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                //把number-cell放到grid-cell的中间位置
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                //不同数值的不同背景色  不同文字颜色  在support2048.js
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
        }
    }

}

//如果有空位随机生成一个
function generateOneNumber() {
    //nospace(board) 判断有没有空位 support2048.js
    if (nospace(board)) {
        return false;
    }
    //随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4)); // random 范围在0-1之间  *4 0-4之间的数  floor 向下取整
    var randy = parseInt(Math.floor(Math.random() * 4)); // random 范围在0-1之间  *4 0-4之间的数  floor 向下取整
    //判断当前位置是否可用
    while (true) {
        if (board[randx][randy] == 0) {
            break;
        }
        //如果不可用，再随机生成一个位置，循环
        var randx = parseInt(Math.floor(Math.random() * 4)); // random 范围在0-1之间  *4 0-4之间的数  floor 向下取整
        var randy = parseInt(Math.floor(Math.random() * 4));
    }
    //随机一个数字 2或者4
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    ////展示数字时的动画效果 show_animation2048.js
    showNumberWithAnimation(randx, randy, randNumber);
    return true;
}