import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import type React from "react";

type LargeCategorySelectOption = {
  name: string;
  id: number;
};

type LargeCategorySelectProps = {
  largeCategories: LargeCategorySelectOption[];
  value: number | null;
  setValue: React.Dispatch<React.SetStateAction<number | null>>
};

export default function LargeCategorySelect({
  largeCategories,
  value,
  setValue
}: LargeCategorySelectProps) {
  return (
    <Autocomplete
      options={largeCategories}
      renderInput={(params) => <TextField {...params} required label="大分類" />}
      getOptionKey={(option: LargeCategorySelectOption) => option.id}
      getOptionValue={(option: LargeCategorySelectOption) => option.id}
      getOptionLabel={(option: LargeCategorySelectOption) => {
        return option.name;
      }}
      value={value}
      onChange={(_event, newValue) => setValue(newValue)}
      fullWidth
    />
  );
}