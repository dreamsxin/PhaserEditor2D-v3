namespace phasereditor2d.scene.ui.sceneobjects {

    export function interactive_getAlpha_SharedTexture(hitArea, x: number, y: number, obj: ITransformLikeObject) {

        const sprite = obj as unknown as Phaser.GameObjects.Sprite;

        const textureManager = obj.getEditorSupport().getScene().textures;

        const alpha = textureManager.getPixelAlpha(x, y, sprite.texture.key, sprite.frame.name);

        return alpha > 0;
    }

    export function interactive_getAlpha_RenderTexture(hitArea, x: number, y: number, obj: ITransformLikeObject) {

        const sprite = obj as unknown as Phaser.GameObjects.Sprite;

        // TODO: lets fix the bound checking.
        // const hitBounds = x >= 0 && y >= 0 && x <= sprite.width && y <= sprite.height;
        // if (!hitBounds) {
        //     return false;
        // }

        const scene = obj.getEditorSupport().getScene();

        const renderTexture = new Phaser.GameObjects.RenderTexture(scene, 0, 0, 5, 5);

        const scaleX = sprite.scaleX;
        const scaleY = sprite.scaleY;
        const originX = sprite.originX;
        const originY = sprite.originY;
        const angle = sprite.angle;

        sprite.setScale(1, 1);
        sprite.setOrigin(0, 0);
        sprite.setAngle(0);

        renderTexture.draw([sprite], -x, -y);

        sprite.setScale(scaleX, scaleY);
        sprite.setOrigin(originX, originY);
        sprite.setAngle(angle);

        const colorArray: Phaser.Display.Color[] = [];

        renderTexture.snapshotPixel(0, 0, (c: Phaser.Display.Color) => {
            colorArray[0] = c;
        });

        renderTexture.destroy();

        const color = colorArray[0];
        const alpha = color ? color.alpha : 0;

        return alpha > 0;
    }
}