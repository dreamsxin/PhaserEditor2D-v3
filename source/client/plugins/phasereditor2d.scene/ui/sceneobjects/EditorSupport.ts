namespace phasereditor2d.scene.ui.sceneobjects {

    import read = colibri.core.json.read;
    import write = colibri.core.json.write;

    export abstract class EditorSupport<T extends SceneObject> {

        private _extension: SceneObjectExtension;
        private _object: T;
        private _label: string;
        private _scene: GameScene;
        private _serializers: json.JSONSerializer[];

        constructor(extension: SceneObjectExtension, obj: T) {
            this._extension = extension;
            this._object = obj;
            this._serializers = [];
        }

        abstract getScreenBounds(camera: Phaser.Cameras.Scene2D.Camera);

        addSerializer(...serializer: json.JSONSerializer[]) {
            this._serializers.push(...serializer);
        }

        getExtension() {
            return this._extension;
        }

        getObject() {
            return this._object;
        }

        getId() {
            return this._object.name;
        }

        setId(id: string) {
            this._object.name = id;
        }

        getLabel() {
            return this._label;
        }

        setLabel(label: string) {
            this._label = label;
        }

        getScene() {
            return this._scene;
        }

        setScene(scene: GameScene) {
            this._scene = scene;
        }

        writeJSON(data: any) {

            write(data, "id", this.getId());
            write(data, "type", this._extension.getTypeName());

            for (const s of this._serializers) {
                s.writeJSON(data);
            }
        }

        readJSON(data: any) {

            this.setId(read(data, "id"));

            for (const s of this._serializers) {
                s.readJSON(data);
            }
        }
    }
}