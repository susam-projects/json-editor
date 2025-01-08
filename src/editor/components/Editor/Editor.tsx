import React from "react";
import {
  ListItemProps,
  WindowScrollVirtualList,
  getOptimalBufferSize,
  getOptimalScrollThreshold,
} from "../../../uiKit/VirtualList";
import {
  EditorData,
  EditorDataLine,
  EditorDataRow,
} from "../../types/EditorData.ts";
import {
  AddLineHandler,
  ChangeLineHandler,
  DeleteLineHandler,
  EditorListLine,
} from "../EditorList/EditorListLine/EditorListLine.tsx";
import { AddRowButton } from "../EditorList/AddRowButton/AddRowButton.tsx";
import { RowControls } from "../EditorList/RowControls/RowControls.tsx";
import { EditorList } from "../EditorList/EditorList/EditorList.tsx";
import { EditorListRow } from "../EditorList/EditorListRow/EditorListRow.tsx";

export type AddRowHandler = (prevRowIndex: number) => void;
export type DeleteRowHandler = (rowIndex: number) => void;

type EditorProps = {
  data: EditorData;
  onAddRow: AddRowHandler;
  onDeleteRow: DeleteRowHandler;
  onAddLine: AddLineHandler;
  onChangeLine: ChangeLineHandler;
  onDeleteLine: DeleteLineHandler;
};

const getRowKey = (row: EditorDataRow, rowIndex: number) => {
  return `${row[0]?.value || rowIndex}`;
};

const getLineKey = (
  line: EditorDataLine,
  rowIndex: number,
  lineIndex: number,
) => {
  return `${rowIndex} ${lineIndex} ${line.value}`;
};

const EditorComponent: React.FC<EditorProps> = ({
  data,
  onAddRow,
  onDeleteRow,
  onAddLine,
  onChangeLine,
  onDeleteLine,
}) => {
  const handleAddFirstLine = React.useCallback(
    (rowIndex: number) => {
      onAddLine(rowIndex, -1);
    },
    [onAddLine],
  );

  const ListItem = React.useMemo(() => {
    const DataRow: React.FC<ListItemProps<EditorDataRow>> = ({
      item: row,
      itemIndex: rowIndex,
    }) => {
      return (
        <>
          <RowControls
            rowIndex={rowIndex}
            onAddFirstLineClick={handleAddFirstLine}
            onDeleteRowClick={onDeleteRow}
          />
          <EditorListRow>
            {row.map((line, lineIndex) => (
              <EditorListLine
                key={getLineKey(line, rowIndex, lineIndex)}
                data={line}
                rowIndex={rowIndex}
                lineIndex={lineIndex}
                onAddLine={onAddLine}
                onChange={onChangeLine}
                onDelete={onDeleteLine}
              />
            ))}
          </EditorListRow>
          {rowIndex === data.length - 1 ? (
            <AddRowButton rowIndex={rowIndex} onClick={onAddRow} />
          ) : (
            <EditorListRow>
              <AddRowButton rowIndex={rowIndex} onClick={onAddRow} />
            </EditorListRow>
          )}
        </>
      );
    };

    return DataRow;
  }, [
    data.length,
    handleAddFirstLine,
    onAddRow,
    onDeleteRow,
    onAddLine,
    onChangeLine,
    onDeleteLine,
  ]);

  const estimatedItemHeight = 550;
  const minBufferSize = 5;
  const maxBufferSize = 30;
  const bufferSize = getOptimalBufferSize(
    estimatedItemHeight,
    data.length,
    minBufferSize,
    maxBufferSize,
  );
  const scrollThreshold = getOptimalScrollThreshold(
    estimatedItemHeight,
    bufferSize,
  );

  return (
    <EditorList>
      <EditorListRow>
        <AddRowButton rowIndex={-1} onClick={onAddRow} />
      </EditorListRow>
      <WindowScrollVirtualList
        data={data}
        estimatedItemHeight={estimatedItemHeight}
        bufferSize={bufferSize}
        scrollThreshold={scrollThreshold}
        ListItem={ListItem}
        getItemKey={getRowKey}
      />
    </EditorList>
  );
};

export const Editor = React.memo(EditorComponent);
