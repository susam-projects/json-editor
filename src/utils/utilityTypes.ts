import React from "react";

export type WithChildren = {
  children?: React.ReactNode | React.ReactNode[];
};

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
