import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { Form } from "react-router";
import type { Database } from "~/typing/supabase";
import LargeCategorySelect from "../large_categories/large_category_select";
import MediumCategorySelect from "../medium_categories/medium_category_select";
import SmallCategorySelect from "../small_categories/small_category_select";
import MoneyStatusSelect from "../money_status/money_status_select";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";

type LargeCategory = Pick<Database["public"]["Tables"]["large_categories"]["Row"], "id" | "name">;
type MediumCategory = Pick<Database["public"]["Tables"]["medium_categories"]["Row"], "id" | "name"> & {
  large_categories: LargeCategory;
};
type SmallCategory = Pick<Database["public"]["Tables"]["small_categories"]["Row"], "id" | "name"> & {
  medium_categories: MediumCategory;
};

/** Payment method data type. */
type Method = Pick<Database["public"]["Tables"]["money_status"]["Row"], "id" | "name">;

type ItemFormProps = {
  itemData?: Pick<
    Database["public"]["Tables"]["items"]["Row"],
    "name" | "is_income" | "amount" | "timestamp"
  > & {
    small_categories: {
      id: number;
      medium_categories: {
        id: number;
        large_categories: {
          id: number;
        };
      };
    };
    money_status: {
      id: number;
    };
  };
  smallCategories: SmallCategory[];
  mediumCategories: MediumCategory[];
  largeCategories: LargeCategory[];
  methods: Method[];
};

/** Gets the ISO style date string for input element. */
function getISOStringLocal(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

export default function ItemForm({
  itemData,
  smallCategories,
  mediumCategories,
  largeCategories,
  methods
}: ItemFormProps) {
  const [name, setName] = useState<string>('');
  const [sc, setSc] = useState<number | null>(null);
  const [mc, setMc] = useState<number | null>(null);
  const [lc, setLc] = useState<number | null>(null);
  const [displayedSc, setDisplayedSc] = useState<SmallCategory[]>([]);
  const [displayedMc, setDisplayedMc] = useState<MediumCategory[]>([]);
  const [mtd, setMtd] = useState<number | null>(null);
  const [isIncome, setIsIncome] = useState<string>('income');
  const [amount, setAmount] = useState<number>(0);
  const [ts, setTs] = useState<string>(getISOStringLocal(new Date()));

  useEffect(() => setDisplayedMc(mediumCategories.filter(({ large_categories: { id }}) => id === lc)), [lc]);
  useEffect(() => setDisplayedSc(smallCategories.filter(({ medium_categories: { id }}) => id === mc)), [mc]);
  useEffect(() => setMc(displayedMc.length > 0 ? displayedMc[0].id : null), [displayedMc]);
  useEffect(() => setSc(displayedSc.length > 0 ? displayedSc[0].id : null), [displayedSc]);
  useEffect(() => {
    if (itemData) {
      setIsIncome(itemData.is_income ? 'income' : 'expense');
      setName(itemData.name);
      setSc(itemData.small_categories.id);
      setMc(itemData.small_categories.medium_categories.id);
      setLc(itemData.small_categories.medium_categories.large_categories.id);
      setMtd(itemData.money_status.id);
      setAmount(itemData.amount);
      setTs(getISOStringLocal(new Date(itemData.timestamp)));
    }
  }, [itemData]);

  const timestamp = new Date(ts);
  const timestampValue = Number.isFinite(timestamp.getTime()) ? timestamp.toISOString() : "";

  return (
    <Form method="post">
      <input type="hidden" name="method_id" value={mtd ?? ''} />
      <input type="hidden" name="small_category_id" value={sc ?? ''} />
      <input type="hidden" name="timestamp" value={timestampValue} />
      <Stack spacing={4} sx={{ marginTop: 4 }}>
        <LargeCategorySelect
          largeCategories={largeCategories}
          value={lc}
          setValue={setLc}
        />
        <MediumCategorySelect
          options={displayedMc}
          value={mc}
          setValue={setMc}
        />
        <SmallCategorySelect
          options={displayedSc}
          value={sc}
          setValue={setSc}
        />
        <MoneyStatusSelect
          moneyStatus={methods}
          value={mtd}
          setValue={setMtd}
        />
        <FormControl>
          <FormLabel>項目の区分</FormLabel>
          <RadioGroup
            name="is_income"
            row
            value={isIncome}
            onChange={(_, newValue) => setIsIncome(newValue)}
          >
            <FormControlLabel value="income" label="収入" control={<Radio />} />
            <FormControlLabel value="expense" label="支出" control={<Radio />} />
          </RadioGroup>
        </FormControl>
        <TextField
          name="name"
          type="text"
          fullWidth
          required
          label="項目名"
          placeholder="項目名を入力"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          name="amount"
          label="金額"
          fullWidth
          required
          placeholder="1000"
          value={Number.isNaN(amount) ? '' : amount}
          onChange={(event) => setAmount(parseFloat(event.target.value))}
        />
        <TextField
          label="日時"
          fullWidth
          required
          type="datetime-local"
          value={ts}
          onChange={(event) => setTs(event.target.value)}
        />
        <Button
          variant="contained"
          color="success"
          startIcon={<SaveIcon />}
          type="submit"
          fullWidth
        >
          保存
        </Button>
      </Stack>
    </Form>
  );
}