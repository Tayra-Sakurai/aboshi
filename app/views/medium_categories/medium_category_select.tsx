import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

type MediumCategorySelectOption = {
  name: string;
  id: number;
  large_categories: {
    id: number;
    name: string;
  };
};

type MediumCategorySelectProps = {
  largeCategoryId?: number | null;
  options: MediumCategorySelectOption[];
  value: number | null;
  setValue: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function MediumCategorySelect({
  largeCategoryId,
  options,
  value,
  setValue
}: MediumCategorySelectProps) {
  const [selectionOptions, setSelectionOptions] = useState<MediumCategorySelectOption[]>([]);
  useEffect(() => {
    const func = async () => {
      const sortFunc1 = (
        a: MediumCategorySelectOption,
        b: MediumCategorySelectOption
      ) => {
        if ((a.large_categories.id === largeCategoryId) && (b.large_categories.id !== largeCategoryId))
          return -1;
        else if ((a.large_categories.id !== largeCategoryId) && (b.large_categories.id === largeCategoryId))
          return 1;
        else
          return a.large_categories.id - b.large_categories.id;
      };
      const sortFunc2 = (
        a: MediumCategorySelectOption,
        b: MediumCategorySelectOption
      ) => a.name.localeCompare(b.name) || (a.id - b.id);
      setSelectionOptions(options.toSorted(sortFunc2).toSorted(sortFunc1));
    };
    func();
  }, [options, largeCategoryId]);
  return (
    <Autocomplete
      options={selectionOptions}
      renderInput={(params) => <TextField label="中分類" {...params} />}
      getOptionLabel={(option: MediumCategorySelectOption) => option.name}
      groupBy={(option: MediumCategorySelectOption) => option.large_categories.name}
      getOptionValue={(option: MediumCategorySelectOption) => option.id}
      value={value}
      onChange={(_event, newValue) => setValue(newValue)}
    />
  );
}