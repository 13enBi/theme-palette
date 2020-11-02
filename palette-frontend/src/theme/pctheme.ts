export default `
//red
@red-1: #FFEAE6;
@red-2: #FFAFA3;
@red-3: #FF887A;
@red-4: #F2594E;
@red-5: #E62B25;
@red-6: #DA0000;
@red-7: #A60006;
@red-8: #800006;
@red-9: #590108;
@red-10: #330007;

@night-red-1: #FFABAB;
@night-red-2: #FF8C8C;
@night-red-3: #FF6D6D;
@night-red-4: #FF4D4D;
@night-red-5: #FF2F2E;
@night-red-6: #E42920;
@night-red-7: #BA1c0F;
@night-red-8: #8C0000;
@night-red-9: #590000;
@night-red-10: #240202;

//green
@green-1: #DEF2DA;
@green-2: #9EE693;
@green-3: #73D968;
@green-4: #4ACC41;
@green-5: #24BF1F;
@green-6: #00B300;
@green-7: #008C05;
@green-8: #006B07;
@green-9: #004006;
@green-10: #001A03;

@night-green-1: #B3F2B3;
@night-green-2: #80EA80;
@night-green-3: #66E666;
@night-green-4: #33DE33;
@night-green-5: #00EA00;
@night-green-6: #48B839;
@night-green-7: #3D9F27;
@night-green-8: #068000;
@night-green-9: #004900;
@night-green-10: #002E00;


//blue
@blue-1: #E6F7FF;
@blue-2: #BAE7FF;
@blue-3: #91D5FF;
@blue-4: #69C0FF;
@blue-5: #40A9FF;
@blue-6: #1790FF;
@blue-7: #096CD9;
@blue-8: #0050B3;
@blue-9: #003A8C;
@blue-10: #012766;

@night-blue-1: #E6F7FF;
@night-blue-2: #BAE7FF;
@night-blue-3: #91D5FF;
@night-blue-4: #69C0FF;
@night-blue-5: #40A9FF;
@night-blue-6: #1790FF;
@night-blue-7: #096CD9;
@night-blue-8: #0050B3;
@night-blue-9: #003A8C;
@night-blue-10: #012766;


//gold
@gold-1: #FFFBE6;
@gold-2: #FFEEA3;
@gold-3: #FFE27A;
@gold-4: #FFD452;
@gold-5: #FFC229;
@gold-6: #F7A800;
@gold-7: #D18800;
@gold-8: #AB6900;
@gold-9: #854D00;
@gold-10: #5E3300;

@night-gold-1: #FFFBE6;
@night-gold-2: #FFEEA3;
@night-gold-3: #FFE27A;
@night-gold-4: #FFD452;
@night-gold-5: #FFC229;
@night-gold-6: #F7A800;
@night-gold-7: #D18800;
@night-gold-8: #AB6900;
@night-gold-9: #854D00;
@night-gold-10: #5E3300;





//grey 颜色
@grey-1: #FAFAFA;
@grey-2: #F0F0F0;
@grey-3: #D9D9D9;
@grey-4: #BFBFBF;
@grey-5: #8C8C8C;
@grey-6: #666666;
@grey-7: #4C4C4C;
@grey-8: #333;
@grey-9: #191919;
@grey-10: #000;

@night-grey-1: #000;
@night-grey-2: #191919;
@night-grey-3: #333;
@night-grey-4: #4C4C4C;
@night-grey-5: #666666;
@night-grey-6: #8C8C8C;
@night-grey-7: #BFBFBF;
@night-grey-8: #D9D9D9;
@night-grey-9: #F0F0F0;
@night-grey-10: #FAFAFA;


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

.loopprimary(@counter) when (@counter > 0) {
    .loopprimary((@counter - 1));

    //primary
    .primary-text-@{counter} {
        @val: "red-@{counter}";
        color: @@val;
    }

    .primary-bg-@{counter} {
        @val: "red-@{counter}";
        background-color: @@val;
    }

    .primary-bd-@{counter} {
        @val: "red-@{counter}";
        border-color: @@val;
    }

    [theme-mode="black"] {
        .primary-text-@{counter} {
            @val: "night-red-@{counter}";
            color: @@val;
        }

        .primary-bg-@{counter} {
            @val: "night-red-@{counter}";
            background-color: @@val;
        }

        .primary-bd-@{counter} {
            @val: "night-red-@{counter}";
            border-color: @@val;
        }
    }
}

.loopprimary(10);


.loopsub(@counter) when (@counter > 0) {
    .loopsub((@counter - 1));

    // green
    .sub-text-green-@{counter} {
        @val: "green-@{counter}";
        color: @@val;
    }

    .sub-bg-green-@{counter} {
        @val: "green-@{counter}";
        background-color: @@val;
    }

    .sub-bd-green-@{counter} {
        @val: "green-@{counter}";
        border-color: @@val;
    }

    [theme-mode="black"] {
        .sub-text-green-@{counter} {
            @val: "night-green-@{counter}";
            color: @@val;
        }

        .sub-bg-green-@{counter} {
            @val: "night-green-@{counter}";
            background-color: @@val;
        }

        .sub-bd-green-@{counter} {
            @val: "night-green-@{counter}";
            border-color: @@val;
        }
    }


    // gold
    .sub-text-gold-@{counter} {
        @val: "gold-@{counter}";
        color: @@val;
    }

    .sub-bg-gold-@{counter} {
        @val: "gold-@{counter}";
        background-color: @@val;
    }

    .sub-bd-gold-@{counter} {
        @val: "gold-@{counter}";
        border-color: @@val;
    }

    [theme-mode="black"] {
        .sub-text-gold-@{counter} {
            @val: "night-gold-@{counter}";
            color: @@val;
        }

        .sub-bg-gold-@{counter} {
            @val: "night-gold-@{counter}";
            background-color: @@val;
        }

        .sub-bd-gold-@{counter} {
            @val: "night-gold-@{counter}";
            border-color: @@val;
        }
    }

    // blue
    .sub-text-blue-@{counter} {
        @val: "blue-@{counter}";
        color: @@val;
    }

    .sub-bg-blue-@{counter} {
        @val: "blue-@{counter}";
        background-color: @@val;
    }

    .sub-bd-blue-@{counter} {
        @val: "blue-@{counter}";
        border-color: @@val;
    }

    [theme-mode="black"] {
        .sub-text-blue-@{counter} {
            @val: "night-blue-@{counter}";
            color: @@val;
        }

        .sub-bg-blue-@{counter} {
            @val: "night-blue-@{counter}";
            background-color: @@val;
        }

        .sub-bd-blue-@{counter} {
            @val: "night-blue-@{counter}";
            border-color: @@val;
        }
    }
}

.loopsub(10);




.loopmid(@counter) when (@counter > 0) {
    .loopmid((@counter - 1));

    // mid
    .mid-text-@{counter} {
        @val: "grey-@{counter}";
        color: @@val;
    }

    .mid-bg-@{counter} {
        @val: "grey-@{counter}";
        background-color: @@val;
    }

    .mid-bd-@{counter} {
        @val: "grey-@{counter}";
        border-color: @@val;
    }

    [theme-mode="black"] {
        .mid-text-@{counter} {
            @val: "night-grey-@{counter}";
            color: @@val;
        }

        .mid-bg-@{counter} {
            @val: "night-grey-@{counter}";
            background-color: @@val;
        }

        .mid-bd-@{counter} {
            @val: "night-grey-@{counter}";
            border-color: @@val;
        }
    }
}

.loopmid(10);

`