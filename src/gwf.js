var $ = go.GraphObject.make;
var myDiagram =
    $(go.Diagram, "myDiagramDiv",
        {
            initialContentAlignment: go.Spot.Center, // center Diagram contents
            "undoManager.isEnabled": false, // enable Ctrl-Z to undo and Ctrl-Y to redo
            layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
                { angle: 90, layerSpacing: 35 })
        });

// the template we defined earlier
myDiagram.nodeTemplate =
    $(go.Node, "Horizontal",
        { background: "#44CCFF" },
        $(go.Picture,
            { margin: 10, width: 50, height: 50, background: "red" },
            new go.Binding("source")),
        $(go.TextBlock, "Default Text",
            { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
            new go.Binding("text", "name"))
    );

var model = $(go.TreeModel);
model.nodeDataArray =
    [
        { key: "1",              name: "设备制造",   source: "cat1.png" },
        { key: "2", parent: "1", name: "设备制造1",    source: "cat2.png" },
        { key: "3", parent: "1", name: "设备制造2",   source: "cat3.png" },
        { key: "4", parent: "3", name: "设备制造3", source: "cat4.png" },
        { key: "5", parent: "3", name: "设备制造4",     source: "cat5.png" },
        { key: "6", parent: "2", name: "设备制造5", source: "cat6.png" }
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