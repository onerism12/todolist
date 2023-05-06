// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export interface Activity {
  id?: number;
  email: string;
  title: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface Todolist {
  id?: number;
  activity_group_id: number;
  title: string;
  is_active?: string;
  priority?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
