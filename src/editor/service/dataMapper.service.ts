import {
  EditorData,
  EditorDataLineType,
  EditorLineValue,
} from "../types/EditorData.ts";
import isPlainObject from "lodash/isPlainObject";
import dayjs from "dayjs";
import { DATA_DATE_FORMAT } from "../const/dateConst.ts";

export const objectsToEditorData = (
  objects: Array<Record<string, unknown>>,
): EditorData => {
  return objects
    .map((object) => {
      if (!isPlainObject(object)) {
        return [];
      }

      return Object.entries(object)
        .map(([label, value]) => {
          const lineType = getLineType(label, value);
          if (lineType === EditorDataLineType.Unknown) {
            return null;
          }
          return {
            type: lineType,
            label,
            value: value as EditorLineValue,
            isVisible: true,
          };
        })
        .filter((line) => !!line); // skip unknown data lines
    })
    .filter((row) => !!row.length); // skip empty rows
};

type LineInfo = {
  label: string;
  value: unknown;
};

const getLineType = (label: string, value: unknown): EditorDataLineType => {
  const lineInfo: LineInfo = { label, value };

  if (isId(lineInfo)) {
    return EditorDataLineType.Id;
  }
  if (isText(lineInfo)) {
    // it should be one of the first to quickly skip long strings from processing
    return EditorDataLineType.Text;
  }
  if (isBoolean(lineInfo)) {
    return EditorDataLineType.Boolean;
  }
  if (isNumber(lineInfo)) {
    return EditorDataLineType.Number;
  }
  if (isEmail(lineInfo)) {
    return EditorDataLineType.Email;
  }
  if (isDate(lineInfo)) {
    return EditorDataLineType.Date;
  }
  if (isString(lineInfo)) {
    return EditorDataLineType.String;
  }
  return EditorDataLineType.Unknown;
};

const isId = (line: LineInfo) => {
  return String(line.label).toLowerCase() === "id";
};

const isText = (line: LineInfo): line is LineInfo & { value: string } => {
  return isString(line) && line.value.length > 100;
};

const isString = (line: LineInfo): line is LineInfo & { value: string } => {
  return typeof line.value === "string";
};

const isNumber = (line: LineInfo): line is LineInfo & { value: number } => {
  return typeof line.value === "number" && !Number.isNaN(line.value);
};

// was also thinking about variant:
// /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
// but decided to go with the simplest one
// the main drawback in performance is not the data processing anyway
const SIMPLE_EMAIL_REGEXP = /\S+@\S+\.\S+/;
const isEmail = (line: LineInfo): line is LineInfo & { value: string } => {
  return SIMPLE_EMAIL_REGEXP.test(String(line.value));
};

const isDate = (line: LineInfo) => {
  return dayjs(String(line.value), DATA_DATE_FORMAT).isValid();
};

const isBoolean = (line: LineInfo): line is LineInfo & { value: boolean } => {
  return [true, false, "true", "false"].some(
    (possibleValue) => possibleValue === line.value,
  );
};

export const editorDataToObjectsArray = (
  data: EditorData,
): Array<Record<string, EditorLineValue>> => {
  return data.map((row) => {
    return row.reduce<Record<string, EditorLineValue>>((result, line) => {
      result[line.label] = line.value;
      return result;
    }, {});
  });
};
