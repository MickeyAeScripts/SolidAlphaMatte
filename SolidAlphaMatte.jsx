// SolidAlphaMatte.jsx
// 1 layer selected : create a white solid above it, trimmed to its in/out,
//                    set that layer's track matte to Alpha, solid video off.
// 2+ layers selected: create ONE white solid above the topmost selected layer,
//                    trimmed to the union of all their in/outs, and alpha-matte
//                    every selected layer to that same solid, solid video off.
(function () {
    var comp = app.project.activeItem;
    if (!(comp && comp instanceof CompItem)) return;

    var sel = comp.selectedLayers.slice(0);
    if (sel.length === 0) return;

    app.beginUndoGroup("Solid Alpha Matte");
    try {
        if (sel.length === 1) {
            var layer = sel[0];
            var solid = comp.layers.addSolid([1, 1, 1], layer.name + " MATTE",
                comp.width, comp.height, comp.pixelAspect, comp.duration);
            solid.moveBefore(layer);
            solid.startTime = layer.startTime;
            solid.inPoint = layer.inPoint;
            solid.outPoint = layer.outPoint;
            if (typeof layer.setTrackMatte === "function") {
                layer.setTrackMatte(solid, TrackMatteType.ALPHA); // AE 23.0+
            } else {
                layer.trackMatteType = TrackMatteType.ALPHA; // legacy: matte must sit directly above
            }
            solid.enabled = false; // video switch off
        } else {
            // shared matte: needs setTrackMatte (AE 23.0+) so one solid can feed many layers
            if (typeof sel[0].setTrackMatte !== "function") {
                alert("Multi-layer shared matte needs After Effects 23.0 or newer.");
                return;
            }

            var top = sel[0];            // topmost = lowest index
            var minIn = sel[0].inPoint;
            var maxOut = sel[0].outPoint;
            for (var i = 1; i < sel.length; i++) {
                if (sel[i].index < top.index) top = sel[i];
                if (sel[i].inPoint < minIn) minIn = sel[i].inPoint;
                if (sel[i].outPoint > maxOut) maxOut = sel[i].outPoint;
            }

            var shared = comp.layers.addSolid([1, 1, 1], top.name + " MATTE",
                comp.width, comp.height, comp.pixelAspect, comp.duration);
            shared.moveBefore(top);
            shared.startTime = 0;
            shared.inPoint = minIn;
            shared.outPoint = maxOut;

            for (var j = 0; j < sel.length; j++) {
                sel[j].setTrackMatte(shared, TrackMatteType.ALPHA);
            }
            shared.enabled = false; // video switch off

            // leave the shared matte selected so it's ready to mask/animate
            for (var k = 0; k < sel.length; k++) sel[k].selected = false;
            shared.selected = true;
        }
    } finally {
        app.endUndoGroup();
    }
})();
