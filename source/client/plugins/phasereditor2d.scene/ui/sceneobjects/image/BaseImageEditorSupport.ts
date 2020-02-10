namespace phasereditor2d.scene.ui.sceneobjects {

    export class BaseImageEditorSupport<T extends ISceneObject> extends EditorSupport<T> {

        constructor(extension: SceneObjectExtension, obj: T, scene: Scene) {
            super(extension, obj, scene);

            this.addComponent(

                new TextureComponent(obj as unknown as ITextureLikeObject),
                new TransformComponent(obj as unknown as ITransformLikeObject),
                new OriginComponent(obj as unknown as IOriginLikeObject),
                new FlipComponent(obj as unknown as IFlipLikeObject)
            );
        }

        getCellRenderer(): colibri.ui.controls.viewers.ICellRenderer {

            return new TextureCellRenderer();
        }

        getTextureComponent() {

            return this.getComponent(TextureComponent) as TextureComponent;
        }

        setInteractive() {

            this.getObject().setInteractive(interactive_getAlpha_SharedTexture);
        }
    }
}