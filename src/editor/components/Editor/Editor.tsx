import React from "react";
import noop from "lodash/noop";
import {
  ListItemProps,
  WindowScrollVirtualList,
} from "../../../uiKit/VirtualList/WindowScrollVirtualList.tsx";
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
import { useVirtualListController } from "../../../uiKit/VirtualList/useVirtualListController.ts";

export type AddRowHandler = (prevRowIndex: number) => void;
export type DeleteRowHandler = (rowIndex: number) => Promise<void>;

type EditorProps = {
  data: EditorData;
  onAddRow: AddRowHandler;
  onDeleteRow: DeleteRowHandler;
  onAddLine: AddLineHandler;
  onChangeLine: ChangeLineHandler;
  onDeleteLine: DeleteLineHandler;
};

const getRowKey = (row: EditorDataRow, rowIndex: number) => {
  return `${row[0]?.value} ${rowIndex}`;
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
  const virtualListController = useVirtualListController();

  const handleAddFirstLine = React.useCallback(
    (rowIndex: number) => {
      onAddLine(rowIndex, -1);
    },
    [onAddLine],
  );

  const handleAddRow = React.useCallback<AddRowHandler>(
    (prevRowIndex) => {
      onAddRow(prevRowIndex);
      virtualListController.current?.addItemAfter(prevRowIndex);
    },
    [onAddRow, virtualListController],
  );

  const handleDeleteRow = React.useCallback(
    (rowIndex: number) => {
      onDeleteRow(rowIndex)
        .then(() => {
          virtualListController.current?.removeItem(rowIndex);
        })
        .catch(noop);
    },
    [onDeleteRow, virtualListController],
  );

  const ListItem_ = React.useMemo(() => {
    const DataRow: React.FC<ListItemProps<EditorDataRow>> = ({
      item: row,
      itemIndex: rowIndex,
    }) => {
      return (
        <>
          <RowControls
            rowIndex={rowIndex}
            onAddFirstLineClick={handleAddFirstLine}
            onDeleteRowClick={handleDeleteRow}
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
            <AddRowButton rowIndex={rowIndex} onClick={handleAddRow} />
          ) : (
            <EditorListRow>
              <AddRowButton rowIndex={rowIndex} onClick={handleAddRow} />
            </EditorListRow>
          )}
        </>
      );
    };

    return DataRow;
  }, [
    data.length,
    handleAddFirstLine,
    handleAddRow,
    handleDeleteRow,
    onAddLine,
    onChangeLine,
    onDeleteLine,
  ]);

  const getItemKey_ = (itemIndex: number) => {
    return getRowKey(data[itemIndex], itemIndex);
  };
  const getItemKey = React.useCallback(getItemKey_, [data]);

  const estimatedItemHeight = 550;
  // const bufferSize = Math.min(Math.round(0.02 * data.length), 30);
  const bufferSize = 5;
  const scrollThreshold = (estimatedItemHeight * bufferSize) / 2;

  return (
    <EditorList>
      <EditorListRow>
        <AddRowButton rowIndex={-1} onClick={handleAddRow} />
      </EditorListRow>
      <WindowScrollVirtualList
        data={data}
        estimatedItemHeight={estimatedItemHeight}
        bufferSize={bufferSize}
        scrollThreshold={scrollThreshold}
        ListItem={ListItem_}
        getItemKey={getItemKey}
        controller={virtualListController}
      />
    </EditorList>
  );
};

export const Editor = React.memo(EditorComponent);
