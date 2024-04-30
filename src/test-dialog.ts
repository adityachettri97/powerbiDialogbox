// import DialogConstructorOptions = powerbi.extensibility.visual.DialogConstructorOptions;
// import DialogAction = powerbi.DialogAction;

// export class TestDialog {
//     static id = "MyTestDialog";
//     private target: HTMLElement;
//     private host;
//     constructor(options: DialogConstructorOptions, initialState: object) {
//         this.host = options.host;
//         this.target = options.element;
//         // … dialog rendering implementation …
//         const div = document.createElement('div');
//         div.className = 'test';
//         const text = document.createTextNode('New Dialog Feature in Custom Visual');
//         div.appendChild(text);
//         const Buttondiv = document.createElement('button');
//         Buttondiv.textContent = "test";
//         this.target.appendChild(div);
//         this.target.appendChild(Buttondiv);
//     }
// }

// globalThis.dialogRegistry = globalThis.dialogRegistry || {};
// globalThis.dialogRegistry[TestDialog.id] = TestDialog;

// import powerbi from "powerbi-visuals-api";
import DialogConstructorOptions = powerbi.extensibility.visual.DialogConstructorOptions;
import showColorPicker from "purejs-color-picker";

export class TestDialog {
  static id = "showcolorPicker";
  private target: HTMLElement;
  private host;
  constructor(options: DialogConstructorOptions, initialState: object) {
    this.host = options.host;
    this.target = options.element;

    showColorPicker({
      host: this.target,
      handler: (color) => {
        // Do something with the selected color
        console.log("Selected Color:", color);
      },
      pickerStyle: ".colorPicker",
    });
  }
}

globalThis.dialogRegistry = globalThis.dialogRegistry || {};
globalThis.dialogRegistry[TestDialog.id] = TestDialog;
