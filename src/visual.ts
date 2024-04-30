// /* eslint-disable powerbi-visuals/no-inner-outer-html */
// "use strict";
// import powerbi from "powerbi-visuals-api";
// import "./../style/visual.less";

// import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
// import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
// import IVisual = powerbi.extensibility.visual.IVisual;
// import IVisualHost = powerbi.extensibility.visual.IVisualHost;
// import DialogAction = powerbi.DialogAction;
// import DataView = powerbi.DataView;
// import { TestDialog } from './test-dialog';
// import { VisualSettings } from "./settings";

// export class Visual implements IVisual {
//     private target: HTMLElement;
//     private updateCount: number;
//     private settings: VisualSettings;
//     private textNode: Text;
//     private dialogActionsButtons = [DialogAction.OK, DialogAction.Cancel];
//     private host: IVisualHost;

//     constructor(options: VisualConstructorOptions) {
//         console.log('Visual constructor', options);
//         this.target = options.element;
//         this.host = options.host;
//         this.updateCount = 0;
//         if (document) {
//             const button = document.createElement("BUTTON");
//             button.innerHTML = "Open Dialog, please";
//             button.onclick = () => {
//                 console.log('Hello!');
//                 const dialogOptions = {
//                     title: "Dialog Feature",
//                     actionButtons: this.dialogActionsButtons,
//                 };
//                 this.host.openModalDialog(TestDialog.id, dialogOptions).catch(error => console.log("error:", error));
//             };
//             this.target.appendChild(button);
//         }
//     }

//     public update(options: VisualUpdateOptions) {

//         console.log('Visual update', options);
//         this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
//         console.log('Visual update', options);
//         if (this.textNode) {
//             this.textNode.textContent = (this.updateCount++).toString();
//         }
//     }

//     private static parseSettings(dataView: DataView): VisualSettings {
//         return <VisualSettings>VisualSettings.parse(dataView);
//     }

//     /**
//      * Returns properties pane formatting model content hierarchies, properties and latest formatting values, Then populate properties pane.
//      * This method is called once every time we open properties pane or when the user edit any format property.
//      */

//     }

/* eslint-disable powerbi-visuals/no-inner-outer-html */
"use strict";
import powerbi from "powerbi-visuals-api";
import "./../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import DialogAction = powerbi.DialogAction;
import DataView = powerbi.DataView;
import { TestDialog } from "./test-dialog";
import { VisualSettings } from "./settings";
import showColorPicker from "purejs-color-picker";
import { select } from "d3";

export class Visual implements IVisual {
  private target: HTMLElement;
  private settings: VisualSettings;
  private dialogActionsButtons = [DialogAction.OK, DialogAction.Cancel];
  private host: IVisualHost;
  private isDialog: boolean = false;

  constructor(options: VisualConstructorOptions) {
    console.log("Visual constructor", options);
    this.target = options.element;
    this.host = options.host;

    select(this.target).append("div").attr("type", "color").attr("id", "colorPicker");
    if (document) {
      const button = document.createElement("BUTTON");
      button.innerHTML = "Open Dialog, please";
      button.onclick = () => {
        console.log("Hello!");
        const size = { width: 300, height: 400 };
        const dialogOptions = {
          title: "",
          showCloseButton: false,
          actionButtons: this.dialogActionsButtons,
          size: size,
        };

        this.host.openModalDialog(TestDialog.id, dialogOptions).catch((error) => console.log("error:", error));
      };
      this.target.appendChild(button);
    }
  }

  public update(options: VisualUpdateOptions) {
    console.log("Visual update", options);
    this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
    console.log("Visual update", options);
    const colorPicker = document.getElementById("colorPicker");

    colorPicker.addEventListener("click", (event) => {
      showColorPicker({
        host: this.target,
        handler: (color) => {
          // Do something with the selected color
          console.log("Selected Color:", color);
        },
        pickerStyle: ".colorPicker",
      });
    });
  }

  private static parseSettings(dataView: DataView): VisualSettings {
    return <VisualSettings>VisualSettings.parse(dataView);
  }
}
