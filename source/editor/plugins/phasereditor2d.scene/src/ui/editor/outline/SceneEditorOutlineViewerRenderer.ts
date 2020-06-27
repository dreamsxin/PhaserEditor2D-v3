namespace phasereditor2d.scene.ui.editor.outline {

    import controls = colibri.ui.controls;

    export class SceneEditorOutlineViewerRenderer extends controls.viewers.TreeViewerRenderer {

        constructor(viewer: controls.viewers.TreeViewer) {
            super(viewer, 48);
        }

        protected prepareContextForRenderCell(args: controls.viewers.RenderCellArgs) {

            if (this.isNonTopPrefabObject(args.obj)) {

                args.canvasContext.globalAlpha = 0.3;
            }
        }

        private isNonTopPrefabObject(obj: any) {

            const support = sceneobjects.EditorSupport.getEditorSupport(obj);

            if (support) {

                return support.getScene().isNonTopPrefabObject(obj);
            }

            return false;
        }


        prepareContextForText(args: controls.viewers.RenderCellArgs) {

            if (args.obj instanceof Phaser.GameObjects.GameObject) {

                const obj = args.obj as sceneobjects.ISceneObject;

                if (obj.getEditorSupport().isPrefabInstance()) {

                    args.canvasContext.font = `italic ${controls.FONT_HEIGHT}px ${controls.FONT_FAMILY}`;
                }
            }

            if (this.isNonTopPrefabObject(args.obj)) {

                args.canvasContext.globalAlpha = 0.3;
            }

            super.prepareContextForText(args);
        }
    }
}