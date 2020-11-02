export default `// Prefix
@css-prefix : base-;
@css-darkname : black;
@css-app : gsjl; // 变量名字需要和 getApp 返回的变量名称一致

// 主色
@primary-color: #1b87ed;
@night-primary-color: #1b87ed;

// 辅助色，股票跌（绿）
@stock-down: #00cd97;
@night-stock-down: #00cd97;

// 辅助色，股票涨 （红）
@stock-up: #fc512a;
@night-stock-up: #fc512a;

// 辅助色，用于免费价格等（橙）
@sub-orange: #ff9411;
@night-sub-orange: #ff9411;

// 辅助色，用于提示文字或图数据图表等（黄）
@sub-yellow: #ffda44;
@night-sub-yellow: #ffda44;

// 文字颜色 标题及正文
@primary-text: #212832;
@night-primary-text: #212832;

// 文字颜色，二级标题或次要文字颜色
@text-sub: #5d646e;
@night-text-sub: #5d646e;

// 文字颜色，列表备注文案，提示性文字颜色
@text-tip: #adb4be;
@night-text-tip: #adb4be;

// 文字颜色  注释辅助失效颜色
@text-desc: #ccc;
@night-text-desc: #ccc;

// 不可点击按钮颜色
@disabled-button: #e4e4e4;
@night-disabled-button: #e4e4e4;

// 不可点文字颜色
@disabled-text: #bbb;
@night-disabled-text: #bbb;

// 全局线条颜色
@regular-border: #e6ecf0;
@night-regular-border: #e6ecf0;

// 辅助色   通用语全局背景、间隔颜色
@sub-card: #f1f6f9;
@night-sub-card: #f1f6f9;

// 卡片色
@card-bg: #fff;
@night-card-bg: #fff;

// 引入颜色基础变量
@import './varbasic-color.less';
// 命名规范：
// 颜色分类-颜色用途-大致颜色/使用位置
// exp:
// primary-text (用于文本的主色红色)
// mid-text-tip (用于提示的文本色)
// primary 主色
// sub 辅助色
// mid 文本色
// other 其他颜色
/*-------------------------@ white style---------------------------*/
// 主色
.primary-text{
    color: @primary-color;
}
.primary-bg{
    background-color: @primary-color;
}
.primary-bd{
    border-color: @primary-color;
}
// 辅助色
.sub-bg-global {
    background-color: @sub-card;
}
.sub-bg-card {
    background-color: @card-bg;
}
.sub-bg-line{
    background-color: @regular-border;
}
.sub-bd-line{
    border-color:@regular-border;
}
.sub-text-green{
    color:@stock-down;
}
.sub-bg-green{
    background-color: @stock-down;
}
.sub-bd-green{
    border-color:@stock-down;
}
.sub-text-orange{
    color:@sub-orange;
}
.sub-bg-orange{
    background-color:@sub-orange;
}
.sub-bd-orange{
    border-color:@sub-orange;
}
.sub-text-yellow{
    color:@sub-yellow;
}
.sub-bg-yellow{
    background-color: @sub-yellow;
}
.sub-bd-yellow{
    border-color: @sub-yellow;
}
.sub-text-red {
    color:@stock-up
}
.sub-bg-red {
    background-color: @stock-up;
}
.sub-bd-red {
    border-color: @stock-up;
}
.sub-bg-disabled{
    background-color: @disabled-button;
}
//文本色
.mid-text-primary{
    color:@primary-text;
}
.mid-text-sub{
    color:@text-sub;
}
.mid-text-tip{
    color:@text-tip;
}
.mid-text-desc{
    color:@text-desc;
}
.mid-text-disabled {
    color: @disabled-text
}
[theme-mode="black"]{
    .primary-text{
        color: @night-primary-color;
    }
    .primary-bg{
        background-color: @night-primary-color;
    }
    .primary-bd{
        border-color: @night-primary-color;
    }
    .sub-bg-global {
        background-color: @night-sub-card;
    }
    .sub-bg-card {
        background-color: @night-card-bg;
    }
    .sub-bg-line{
        background-color: @night-regular-border;
    }
    .sub-bd-line{
        border-color:@night-regular-border;
    }
    .sub-text-green{
        color:@night-stock-down;
    }
    .sub-bg-green{
        background-color: @night-stock-down;
    }
    .sub-bd-green{
        border-color:@night-stock-down;
    }
    .sub-text-orange{
        color:@night-sub-orange;
    }
    .sub-bg-orange{
        background-color:@night-sub-orange;
    }
    .sub-bd-orange{
        border-color:@night-sub-orange;
    }
    .sub-text-yellow{
        color:@night-sub-yellow;
    }
    .sub-bg-yellow{
        background-color: @night-sub-yellow;
    }
    .sub-bd-yellow{
        border-color: @night-sub-yellow;
    }
    .sub-text-red {
        color:@night-stock-up
    }
    .sub-bg-red {
        background-color: @night-stock-up;
    }
    .sub-bd-red {
        border-color: @night-stock-up;
    }
    .sub-bg-disabled{
        background-color: @night-disabled-button;
    }
    .mid-text-primary{
        color:@night-primary-text;
    }
    .mid-text-sub{
        color:@night-text-sub;
    }
    .mid-text-tip{
        color:@night-text-tip;
    }
    .mid-text-desc{
        color:@night-text-desc;
    }
    .mid-text-disabled {
    color: @night-disabled-text
}
}
`