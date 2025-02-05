export interface IFormTodo {
  isCompleted: boolean;
  title: string;
}

export interface ITodo extends IFormTodo {
  _created: number;
  _data_type: string;
  _is_deleted: boolean;
  _modified: number;
  _self_link: string;
  _user: string;
  _uuid: string;
}
