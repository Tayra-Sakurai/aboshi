import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

export type SmallCategorySelectOption = {
  name: string;
  id: number;
  medium_categories: {
    id: number;
    name: string;
    large_categories?: {
      id: number;
      name: string;
    };
  };
};

type SmallCategorySelectProps = {
  mediumCategoryId?: number | null;
  options?: SmallCategorySelectOption[];
  smallCategories?: SmallCategorySelectOption[];
  value: number | null;
  setValue: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function SmallCategorySelect({
  mediumCategoryId,
  options,
  smallCategories,
  value,
  setValue
}: SmallCategorySelectProps) {
  const [selectionOptions, setSelectionOptions] = useState<SmallCategorySelectOption[]>([]);

  useEffect(() => {
    const list = options ?? smallCategories ?? [];
    const sortFunc1 = (
      a: SmallCategorySelectOption,
      b: SmallCategorySelectOption
    ) => {
      if (mediumCategoryId != null) {
        if ((a.medium_categories.id === mediumCategoryId) && (b.medium_categories.id !== mediumCategoryId))
          return -1;
        else if ((a.medium_categories.id !== mediumCategoryId) && (b.medium_categories.id === mediumCategoryId))
          return 1;
      }
      return a.medium_categories.id - b.medium_categories.id;
    };
    const sortFunc2 = (
      a: SmallCategorySelectOption,
      b: SmallCategorySelectOption
    ) => a.name.localeCompare(b.name) || (a.id - b.id);

    setSelectionOptions(list.toSorted(sortFunc2).toSorted(sortFunc1));
  }, [options, smallCategories, mediumCategoryId]);

  return (
    <Autocomplete
      options={selectionOptions}
      renderInput={(params) => <TextField label="小分類" required {...params} />}
      getOptionLabel={(option: SmallCategorySelectOption) => option.name}
      groupBy={(option: SmallCategorySelectOption) => option.medium_categories.name}
      getOptionKey={(option: SmallCategorySelectOption) => option.id}
      getOptionValue={(option: SmallCategorySelectOption) => option.id}
      value={value}
      onChange={(_event, newValue) => setValue(newValue)}
      fullWidth
    />
  );
}
