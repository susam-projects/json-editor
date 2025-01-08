import { EditorData } from "../types/EditorData.ts";
import { editorDataToObjectsArray } from "./dataMapper.service.ts";
import { downloadFile } from "../../utils/downloadFile.ts";

export const downloadEditorData = (data: EditorData) => {
  const dataObjects = editorDataToObjectsArray(data);
  const dataString = JSON.stringify(dataObjects, null, 2);
  downloadFile(dataString, "updated-json.json");
};
