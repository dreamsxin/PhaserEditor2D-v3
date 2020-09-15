namespace phasereditor2d.pack.ui.importers {

    import io = colibri.core.io;
    import ide = colibri.ui.ide;

    export abstract class Importer {

        private _type: string;
        private _multipleFiles: boolean;

        constructor(type: string) {
            this._type = type;
            this._multipleFiles = false;
        }

        isMultipleFiles() {

            return this._multipleFiles;
        }

        setMultipleFiles(multipleFiles: boolean) {

            this._multipleFiles = multipleFiles;
        }

        getType() {
            return this._type;
        }

        abstract acceptFile(file: io.FilePath): boolean;

        abstract createItemData(file: io.FilePath | io.FilePath[]);

        async autoImport(pack: core.AssetPack, files: io.FilePath[]) {

            if (this.isMultipleFiles()) {

                return [await this.importMultipleFiles(pack, files)];

            } else {

                const items: core.AssetPackItem[] = [];

                for (const file of files) {

                    items.push(await this.importFile(pack, file))
                }

                return items;
            }
        }

        async importFile(pack: core.AssetPack, file: io.FilePath | io.FilePath[]): Promise<core.AssetPackItem> {

            const computer = new ide.utils.NameMaker(i => i.getKey());

            computer.update(pack.getItems());

            const data = this.createItemData(file);

            const firstFile = Array.isArray(file) ? file[0] : file;

            data.type = this.getType();
            data.key = computer.makeName(firstFile.getNameWithoutExtension());

            const item = pack.createPackItem(data);

            pack.getItems().push(item);

            await item.preload();

            return item;
        }

        async importMultipleFiles(pack: core.AssetPack, files: io.FilePath[]): Promise<core.AssetPackItem> {

            const computer = new ide.utils.NameMaker(i => i.getKey());

            computer.update(pack.getItems());

            const data = this.createItemData(files);

            data.type = this.getType();
            data.key = computer.makeName(files[0].getNameWithoutExtension());

            const item = pack.createPackItem(data);

            pack.getItems().push(item);

            await item.preload();

            return item;
        }
    }

}