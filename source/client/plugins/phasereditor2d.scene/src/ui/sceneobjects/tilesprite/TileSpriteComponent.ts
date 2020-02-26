namespace phasereditor2d.scene.ui.sceneobjects {

    export class TileSpriteComponent extends Component<TileSprite> {

        static width = SimpleProperty("width", undefined, "Width", "The TileSprite width");
        static height = SimpleProperty("height", undefined, "Height", "The TileSprite height");
        static tilePositionX = SimpleProperty("tilePositionX", 0, "X", "phaser:Phaser.GameObjects.TileSprite.tilePositionX");
        static tilePositionY = SimpleProperty("tilePositionY", 0, "Y", "phaser:Phaser.GameObjects.TileSprite.tilePositionY");
        static tileScaleX = SimpleProperty("tileScaleX", 1, "X", "Phaser.GameObjects.TileSprite.tileScaleX");
        static tileScaleY = SimpleProperty("tileScaleY", 1, "Y", "Phaser.GameObjects.TileSprite.tileScaleY");

        static size: IPropertyXY = {
            label: "Size",
            tooltip: "The TileSprite size",
            x: TileSpriteComponent.width,
            y: TileSpriteComponent.height
        };

        static tilePosition: IPropertyXY = {
            label: "Tile Position",
            tooltip: "phaser:Phaser.GameObjects.TileSprite.setTilePosition",
            x: TileSpriteComponent.tilePositionX,
            y: TileSpriteComponent.tilePositionY
        };

        static tileScale: IPropertyXY = {
            label: "Tile Scale",
            tooltip: "phaser:Phaser.GameObjects.TileSprite.setTileScale",
            x: TileSpriteComponent.tileScaleX,
            y: TileSpriteComponent.tileScaleY
        };

        constructor(obj: TileSprite) {
            super(obj, [
                TileSpriteComponent.width,
                TileSpriteComponent.height,
                TileSpriteComponent.tilePositionX,
                TileSpriteComponent.tilePositionY,
                TileSpriteComponent.tileScaleX,
                TileSpriteComponent.tileScaleY
            ]);
        }

        buildSetObjectPropertiesCodeDOM(args: ISetObjectPropertiesCodeDOMArgs): void {

            this.buildSetObjectPropertyCodeDOM_FloatProperty(args,
                TileSpriteComponent.tilePositionX,
                TileSpriteComponent.tilePositionY,
                TileSpriteComponent.tileScaleX,
                TileSpriteComponent.tileScaleY
            );
        }
    }
}