namespace phasereditor2d.pack.ui.properties {

    import controls = colibri.ui.controls;
    import ide = colibri.ui.ide;

    export class ImagePreviewSection
        extends colibri.ui.ide.properties.BaseImagePreviewSection<core.AssetPackItem> {

        constructor(page: controls.properties.PropertyPage) {
            super(page, "pack.ImageSection", "Image Preview", true);
        }

        protected getSelectedImage(): controls.IImage {

            const obj = this.getSelection()[0];

            let img: controls.IImage;

            if (obj instanceof core.AssetPackItem) {

                img = core.AssetPackUtils.getImageFromPackUrl(obj.getData().url);

            } else {

                img = obj;
            }

            return img;
        }

        canEdit(obj: any): boolean {
            return obj instanceof core.AssetPackItem && obj.getType() === "image" || obj instanceof controls.ImageFrame;
        }
    }
}