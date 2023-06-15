namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  /// GAME HIRARCHIE \\\
  let canvas: HTMLCanvasElement;
  let crc2: CanvasRenderingContext2D;
  let graph: ƒ.Node;
  let viewport: ƒ.Viewport;
  let camNode: ƒ.Node;
  let cmpCamera: ƒ.ComponentCamera;
  let point1: ƒ.Node;
  let point2: ƒ.Node;
  let point3: ƒ.Node;

  let camSpeed: number = 0.5;
  let bounceSpeed: number = 0.01;
  let x1: number = 0;
  let x2: number = 1.05;
  let x3: number = 2.1;

  let chair1: ƒ.Node;
  let chairMetal1: ƒ.Node;

  let chair2: ƒ.Node;
  let chairMetal2: ƒ.Node;

  let toggle: boolean = false;

  window.addEventListener("load", init);
  document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);

  function init(_event: Event): void {
    window.addEventListener("keydown", startViewport);
    window.addEventListener("mousedown", startViewport);
    window.addEventListener("touchend", startViewport);
  }

  function startViewport(): void {
    window.removeEventListener("keydown", startViewport);
    window.removeEventListener("mousedown", startViewport);
    window.removeEventListener("touchend", startViewport);

    window.addEventListener("keydown", hndKeydown);
    canvas = document.querySelector("canvas");
    startInteractiveViewport();
  }

  async function startInteractiveViewport(): Promise<void> {
    // load resources referenced in the link-tag
    await FudgeCore.Project.loadResourcesFromHTML();
    FudgeCore.Debug.log("Project:", FudgeCore.Project.resources);
    // pick the graph to show
    graph = <ƒ.Graph>FudgeCore.Project.resources["Graph|2023-06-14T22:31:41.192Z|38185"];
    FudgeCore.Debug.log("Graph:", graph);
    if (!graph) {
      alert("Nothing to render. Create a graph with at least a mesh, material and probably some light");
      return;
    }
    // setup the viewport
    let cmpCamera: ƒ.ComponentCamera = new FudgeCore.ComponentCamera();
    viewport = new FudgeCore.Viewport();
    viewport.initialize("InteractiveViewport", graph, cmpCamera, canvas);

    viewport.draw();
    canvas.dispatchEvent(new CustomEvent("interactiveViewportStarted", { bubbles: true, detail: viewport }));
  }

  function start(_event: CustomEvent): void {
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

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    viewport.draw();
    camNode.mtxLocal.rotateY(camSpeed);

    chair1.getComponent(ƒ.ComponentMesh).activate(!toggle);
    chairMetal1.getComponent(ƒ.ComponentMesh).activate(!toggle);
    chair2.getComponent(ƒ.ComponentMesh).activate(toggle);
    chairMetal2.getComponent(ƒ.ComponentMesh).activate(toggle);

    if (x1 < Math.PI) {
      x1 += bounceSpeed;
    } else {
      x1 = 0;
    }
    if (x2 < Math.PI) {
      x2 += bounceSpeed;
    } else {
      x2 = 0;
    }
    if (x3 < Math.PI) {
      x3 += bounceSpeed;
    } else {
      x3 = 0;
    }

    point1.mtxLocal.translation = new ƒ.Vector3(0.15, Math.sin(x1) / 2, 0);
    point2.mtxLocal.translation = new ƒ.Vector3(-0.15, Math.sin(x2) / 2, 0);
    point3.mtxLocal.translation = new ƒ.Vector3(0, Math.sin(x3) / 2, 0.15);
  }

  function hndKeydown(_event: any){
    if(_event.code == "KeyT") toggle = !toggle;
  }
}