namespace phasereditor2d.scene.ui.sceneobjects {

    export class EllipseExtension extends SceneGameObjectExtension {

        private static _instance: EllipseExtension;

        static getInstance(): EllipseExtension {

            return this._instance ?? (this._instance = new EllipseExtension());
        }

        constructor() {
            super({
                icon: ScenePlugin.getInstance().getIconDescriptor(ICON_GROUP),
                phaserTypeName: "Phaser.GameObjects.Ellipse",
                typeName: "Ellipse"
            });
        }

        acceptsDropData(data: any): boolean {

            return false;
        }

        createSceneObjectWithAsset(args: ICreateWithAssetArgs): ISceneGameObject {

            // not supported

            return null;
        }

        createGameObjectWithData(args: ICreateWithDataArgs): ISceneGameObject {

            const obj = new Ellipse(args.scene, 0, 0);

            obj.getEditorSupport().readJSON(args.data as any);

            return obj;
        }

        createDefaultSceneObject(args: ICreateDefaultArgs): ISceneObject[] {

            const obj = new Ellipse(args.scene, args.x, args.y);

            obj.isFilled = true;

            return [obj];
        }

        async getAssetsFromObjectData(args: IGetAssetsFromObjectArgs): Promise<any[]> {

            return [];
        }

        getCodeDOMBuilder(): GameObjectCodeDOMBuilder {

            return new EllipseCodeDOMBuilder();
        }
    }
}