export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface RootState {
  posts: Post[];
}

export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => RootState): void;
}
