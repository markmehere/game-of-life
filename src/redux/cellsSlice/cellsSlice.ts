import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { regenerate } from "core/regenerate";
import { BOARD_COLS, BOARD_ROWS } from "shared/constants";
import { CellPoint, CellBoard } from "shared/types";
import { clone } from "shared/utils";
import { RootState, AppThunk } from "../store";

export interface CellsState {
  board: CellBoard;
}

const initialState: CellsState = {
  board: Array(BOARD_ROWS)
    .fill([])
    .map(() => Array(BOARD_COLS).fill(false)),
};

export const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<CellPoint>) => {
      const board = clone(state.board);
      board[action.payload.r][action.payload.c] =
        !board[action.payload.r][action.payload.c];
      return { ...state, board };
    },
    revise: (state, action: PayloadAction<CellBoard>) => ({
      ...state,
      board: action.payload,
    }),
    reset: (state) => ({
      ...state,
      board: initialState.board,
    }),
  },
});

export const selectBoard = (state: RootState) => state.cells.board;

export const { toggle, revise, reset } = cellsSlice.actions;

export const next = (): AppThunk => (dispatch, getState) => {
  const board = getState().cells.board;
  dispatch(revise(regenerate(board)));
};

export default cellsSlice.reducer;
