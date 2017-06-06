var $ = go.GraphObject.make;
var myDiagram =
    $(go.Diagram, "myDiagramDiv",
        {
            initialContentAlignment: go.Spot.Center, // center Diagram contents
            "undoManager.isEnabled": false, // enable Ctrl-Z to undo and Ctrl-Y to redo
            layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
                { angle: 0, layerSpacing: 35 })
        });

// the template we defined earlier
myDiagram.nodeTemplate =
    $(go.Node, "Auto",
        new go.Binding("background","",getBackGroudColor),
        $(go.Panel, "Table",
            { margin: 6, maxSize: new go.Size(100, 70) },
            // the two TextBlocks in column 0 both stretch in width
            // but align on the left side
            $(go.RowColumnDefinition,
                {
                    column: 0,
                    stretch: go.GraphObject.Horizontal,
                    alignment: go.Spot.Left
                }),
            // the name
            $(go.TextBlock,
                {
                    row: 0, column: 0,
                    maxSize: new go.Size(160, NaN), margin: 2,
                    stroke: "white",
                    font: "500 16px Roboto, sans-serif",
                    alignment: go.Spot.Top
                },
                new go.Binding("text", "name")),
            // the additional textual information
            $(go.TextBlock,
                {
                    row: 1, column: 0, columnSpan: 2,
                    stroke: "white",
                    font: "12px Roboto, sans-serif"
                },
                new go.Binding("text", "", theInfoTextConverter))
        )  // end Table Panel
    );

var model = $(go.TreeModel);
model.nodeDataArray =
    [
        { key: "1",              name: "控制箱组装" },
        { key: "2", parent: "1", name: "主控箱组装",day:8 },
        { key: "3", parent: "1", name: "电路板焊接",day:10 },
        { key: "4", parent: "1", name: "外围线路连接",day:4 },
        { key: "5", parent: "2", name: "功能模块放置",day:1,operator:"外委",state:"end" },
        { key: "6", parent: "2", name: "配线", day:4, operator:"外委",state:"error"},
        { key: "7", parent: "2", name: "主体组装", day:3,state:"going"},
        { key: "8", parent: "7", name: "控制箱", day:3, operator:"杜迎涛" },
        { key: "9", parent: "7", name: "触摸屏", day:3, operator:"张弛" },
        { key: "10", parent: "7", name: "电源盒", day:3, operator:"林强" },
        { key: "11", parent: "7", name: "侧面航插", day:3, operator:"侯佳伟" },
        { key: "12", parent: "3", name: "电路板制作", day:7, operator:"外委" },
        { key: "13", parent: "3", name: "电路板刷膏", day:1, operator:"张建平" },
        { key: "14", parent: "3", name: "放置元件", day:1, operator:"张建平" },
        { key: "15", parent: "3", name: "钎焊", day:1, operator:"张建平" },
        { key: "16", parent: "4", name: "航空插头焊接", day:3, operator:"林强" },
        { key: "17", parent: "4", name: "控制线缆制作", day:3, operator:"杜迎涛" },
        { key: "18", parent: "4", name: "手持盒制作", day:3, operator:"张建平" }
    ];
myDiagram.linkTemplate =
    $(go.Link,
        // default routing is go.Link.Normal
        // default corner is 0
        { routing: go.Link.Orthogonal, corner: 5 },
        $(go.Shape, { strokeWidth: 3, stroke: "#555" }) // the link shape

        // if we wanted an arrowhead we would also add another Shape with toArrow defined:
        // $(go.Shape, { toArrow: "Standard", stroke: null }
    );

myDiagram.model = model;
// This function provides a common style for most of the TextBlocks.
// Some of these values may be overridden in a particular TextBlock.
function theInfoTextConverter(info) {
    var str = "";
    if (info.operator) str += "\n负责人: " + info.operator;
    if (info.day) str += "\n预计时间: " + info.day + "天";
    if(info.state){
        if(info.state == "end"){
            str += "\n状态: 完成";
        }
        else if(info.state == "going"){
            str += "\n状态: 进行中";
        }
        else if(info.state == "error"){
            str += "\n状态: 延误";
        }
    }
    else{
        str += "\n状态: 未开始";
    }

    return str;
}

function getBackGroudColor(info){
    if(info.state){
        if(info.state == "error"){
            return "#FF3300";
        }
    }
    return "#44CCFF";
}