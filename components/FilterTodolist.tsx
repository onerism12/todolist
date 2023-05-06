// FilterTodolist.tsx

import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Todolist } from "../interfaces";

type FilterTodolistProps = {
  todolist: Todolist[];
  setFilteredTodolist: (filteredTodolist: Todolist[]) => void;
};

enum sortOption {
  DEFAULT = "default",
  NEWEST = "newest",
  OLDEST = "oldest",
  AZ = "a-z",
  ZA = "z-a",
  UNFINISHED = "unfinished",
}

const FilterTodolist = ({
  todolist,
  setFilteredTodolist,
}: FilterTodolistProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("default");

  useEffect(() => {
    const fetchFilteredTodolist = () => {
      let filteredTodolist = todolist.slice();

      switch (selectedFilter) {
        case sortOption.NEWEST:
          filteredTodolist.sort((a, b) =>
            a.created_at < b.created_at ? 1 : -1
          );
          break;
        case sortOption.OLDEST:
          filteredTodolist.sort((a, b) =>
            a.created_at > b.created_at ? 1 : -1
          );
          break;
        case sortOption.AZ:
          filteredTodolist.sort((a, b) => (a.title > b.title ? 1 : -1));
          break;
        case sortOption.ZA:
          filteredTodolist.sort((a, b) => (a.title < b.title ? 1 : -1));
          break;
        case sortOption.UNFINISHED:
          filteredTodolist = filteredTodolist.filter((item) => !item.is_active);
          break;
        default:
          break;
      }

      setFilteredTodolist(filteredTodolist);
    };

    fetchFilteredTodolist();
  }, [selectedFilter, todolist, setFilteredTodolist]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <Select value={selectedFilter} onChange={handleFilterChange} w="240">
      <option value={sortOption.DEFAULT}>Default</option>
      <option value={sortOption.NEWEST}>Newest</option>
      <option value={sortOption.OLDEST}>Oldest</option>
      <option value={sortOption.AZ}>A-Z</option>
      <option value={sortOption.ZA}>Z-A</option>
      <option value={sortOption.UNFINISHED}>Unfinished</option>
    </Select>
  );
};

export default FilterTodolist;
