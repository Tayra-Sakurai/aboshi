import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import type React from "react";

export type MoneyStatusSelectOption = {
  name: string;
  id: number;
};

type MoneyStatusSelectProps = {
  moneyStatus?: MoneyStatusSelectOption[];
  moneyStatuses?: MoneyStatusSelectOption[];
  options?: MoneyStatusSelectOption[];
  value: number | null;
  setValue: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function MoneyStatusSelect({
  moneyStatus,
  moneyStatuses,
  options,
  value,
  setValue,
}: MoneyStatusSelectProps) {
  const selectionOptions = options ?? moneyStatuses ?? moneyStatus ?? [];

  return (
    <Autocomplete
      options={selectionOptions}
      renderInput={(params) => <TextField {...params} required label="状態" />}
      getOptionKey={(option: MoneyStatusSelectOption) => option.id}
      getOptionValue={(option: MoneyStatusSelectOption) => option.id}
      getOptionLabel={(option: MoneyStatusSelectOption) => option.name}
      value={value}
      onChange={(_event, newValue) => setValue(newValue)}
      fullWidth
    />
  );
}
