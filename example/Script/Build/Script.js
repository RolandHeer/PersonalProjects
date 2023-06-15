"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class CustomComponentScript extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(CustomComponentScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "CustomComponentScript added to ";
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* NODE_DESERIALIZED */:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
    }
    Script.CustomComponentScript = CustomComponentScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    /// GAME HIRARCHIE \\\
    let canvas;
    let crc2;
    let graph;
    let viewport;
    let camNode;
    let cmpCamera;
    let point1;
    let point2;
    let point3;
    let camSpeed = 0.5;
    let bounceSpeed = 0.01;
    let x1 = 0;
    let x2 = 1.05;
    let x3 = 2.1;
    let chair1;
    let chairMetal1;
    let chair2;
    let chairMetal2;
    let toggle = false;
    window.addEventListener("load", init);
    document.addEventListener("interactiveViewportStarted", start);
    function init(_event) {
        window.addEventListener("keydown", startViewport);
        window.addEventListener("mousedown", startViewport);
        window.addEventListener("touchend", startViewport);
    }
    function startViewport() {
        window.removeEventListener("keydown", startViewport);
        window.removeEventListener("mousedown", startViewport);
        window.removeEventListener("touchend", startViewport);
        window.addEventListener("keydown", hndKeydown);
        canvas = document.querySelector("canvas");
        startInteractiveViewport();
    }
    async function startInteractiveViewport() {
        // load resources referenced in the link-tag
        await FudgeCore.Project.loadResourcesFromHTML();
        FudgeCore.Debug.log("Project:", FudgeCore.Project.resources);
        // pick the graph to show
        graph = FudgeCore.Project.resources["Graph|2023-06-14T22:31:41.192Z|38185"];
        FudgeCore.Debug.log("Graph:", graph);
        if (!graph) {
            alert("Nothing to render. Create a graph with at least a mesh, material and probably some light");
            return;
        }
        // setup the viewport
        let cmpCamera = new FudgeCore.ComponentCamera();
        viewport = new FudgeCore.Viewport();
        viewport.initialize("InteractiveViewport", graph, cmpCamera, canvas);
        viewport.draw();
        canvas.dispatchEvent(new CustomEvent("interactiveViewportStarted", { bubbles: true, detail: viewport }));
    }
    function start(_event) {
        viewport = _event.detail;
        camNode = graph.getChildrenByName("camCenter")[0];
        viewport.camera = cmpCamera = camNode.getChildren()[0].getComponent(ƒ.ComponentCamera);
        point1 = graph.getChildrenByName("light")[0].getChildrenByName("points")[0].getChildren()[0];
        point2 = graph.getChildrenByName("light")[0].getChildrenByName("points")[0].getChildren()[1];
        point3 = graph.getChildrenByName("light")[0].getChildrenByName("points")[0].getChildren()[2];
        chair1 = graph.getChildrenByName("phong")[0].getChildren()[0];
        chairMetal1 = graph.getChildrenByName("phong")[0].getChildren()[1];
        chair2 = graph.getChildrenByName("gouraud")[0].getChildren()[0];
        chairMetal2 = graph.getChildrenByName("gouraud")[0].getChildren()[1];
        console.log(point1);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        viewport.draw();
        camNode.mtxLocal.rotateY(camSpeed);
        chair1.getComponent(ƒ.ComponentMesh).activate(!toggle);
        chairMetal1.getComponent(ƒ.ComponentMesh).activate(!toggle);
        chair2.getComponent(ƒ.ComponentMesh).activate(toggle);
        chairMetal2.getComponent(ƒ.ComponentMesh).activate(toggle);
        if (x1 < Math.PI) {
            x1 += bounceSpeed;
        }
        else {
            x1 = 0;
        }
        if (x2 < Math.PI) {
            x2 += bounceSpeed;
        }
        else {
            x2 = 0;
        }
        if (x3 < Math.PI) {
            x3 += bounceSpeed;
        }
        else {
            x3 = 0;
        }
        point1.mtxLocal.translation = new ƒ.Vector3(0.15, Math.sin(x1) / 2, 0);
        point2.mtxLocal.translation = new ƒ.Vector3(-0.15, Math.sin(x2) / 2, 0);
        point3.mtxLocal.translation = new ƒ.Vector3(0, Math.sin(x3) / 2, 0.15);
    }
    function hndKeydown(_event) {
        if (_event.code == "KeyT")
            toggle = !toggle;
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map