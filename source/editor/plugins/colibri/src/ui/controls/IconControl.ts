namespace colibri.ui.controls {

    export class IconControl {

        private _icon: IImage;
        _context: CanvasRenderingContext2D;
        private _canvas: HTMLCanvasElement;

        constructor(icon?: IImage) {

            const size = RENDER_ICON_SIZE;

            this._canvas = document.createElement("canvas");

            this._canvas.width = this._canvas.height = size;
            this._canvas.style.width = this._canvas.style.height = size + "px";

            this._context = this._canvas.getContext("2d");

            this._context.imageSmoothingEnabled = false;

            Controls.adjustCanvasDPI(this._canvas, size, size);

            this.setIcon(icon);
        }

        repaint() {

            if (this._icon) {

                const size = RENDER_ICON_SIZE;

                this._context.clearRect(0, 0, size, size);

                this._icon.paint(this._context, 0, 0, size, size, true);
            }
        }

        getCanvas() {

            return this._canvas;
        }

        getIcon() {

            return this._icon;
        }

        setIcon(icon: IImage, repaint = true) {
            this._icon = icon;

            if (repaint) {

                this.repaint();
            }
        }
    }
}