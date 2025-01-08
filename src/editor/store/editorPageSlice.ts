import { createAppSlice } from "../../app/store";
import { objectsToEditorData } from "../service/dataMapper.service.ts";
import { EditorData, EditorLineValue } from "../types/EditorData.ts";
import jsonSample from "../data/json-10000.json";
import {
  addLine as doAddLine,
  addRow as doAddRow,
  deleteLine as doDeleteLine,
  deleteRow as doDeleteRow,
  updateLineValue as doUpdateLineValue,
} from "../service/dataUpdater.service.ts";
import { AddLineData } from "../components/AddLineModal/AddLineModal.tsx";

export interface IEditorSlice {
  data: EditorData;
}

const initialState: IEditorSlice = {
  data: objectsToEditorData(jsonSample as Array<Record<string, unknown>>),
};

export const editorPageSlice = createAppSlice({
  name: "editor",
  initialState,

  reducers: (create) => ({
    setData: create.reducer<{
      newDataObjects: unknown[];
    }>((state, { payload: { newDataObjects } }) => {
      state.data = objectsToEditorData(
        newDataObjects as Array<Record<string, unknown>>,
      );
    }),

    addRow: create.reducer<{ prevRowIndex: number }>(
      (state, { payload: { prevRowIndex } }) => {
        state.data = doAddRow(state.data, prevRowIndex);
      },
    ),

    deleteRow: create.reducer<{ rowIndex: number }>(
      (state, { payload: { rowIndex } }) => {
        state.data = doDeleteRow(state.data, rowIndex);
      },
    ),

    addLine: create.reducer<{
      rowIndex: number;
      prevLineIndex: number;
      data: AddLineData;
    }>((state, { payload: { rowIndex, prevLineIndex, data } }) => {
      state.data = doAddLine(state.data, rowIndex, prevLineIndex, data);
    }),

    updateLine: create.reducer<{
      rowIndex: number;
      lineIndex: number;
      newValue: EditorLineValue;
    }>((state, { payload: { rowIndex, lineIndex, newValue } }) => {
      state.data = doUpdateLineValue(state.data, rowIndex, lineIndex, newValue);
    }),

    deleteLine: create.reducer<{ rowIndex: number; lineIndex: number }>(
      (state, { payload: { rowIndex, lineIndex } }) => {
        state.data = doDeleteLine(state.data, rowIndex, lineIndex);
      },
    ),
  }),

  selectors: {
    selectEditorData: (state) => state.data,
  },
});

export const { selectEditorData } = editorPageSlice.selectors;

export const { setData, addRow, deleteRow, addLine, updateLine, deleteLine } =
  editorPageSlice.actions;
