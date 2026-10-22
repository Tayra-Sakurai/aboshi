import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { Form } from "react-router";
import LargeCategorySelect from "../large_categories/large_category_select";
import MediumCategorySelect from "../medium_categories/medium_category_select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import BackButton from "../back_button";

type SmallCategoryFormProps = {
  data?: {
    name: string;
    medium_categories: {
      large_categories: {
        id: number;
      };
      id: number;
    };
    monthly_budget: number;
  };
  large_categories: {
    id: number;
    name: string;
  }[];
  medium_categories: {
    id: number;
    name: string;
    large_categories: {
      id: number;
      name: string;
    };
  }[];
};

export default function SmallCategoryForm({
  data,
  large_categories,
  medium_categories
}: SmallCategoryFormProps) {
  const [lc, setLc] = useState<number | null>(null);
  const [mc, setMc] = useState<number | null>(null);
  const [displayedMediumCategories, setDisplayedMediumCategories] = useState<{
    id: number;
    name: string;
    large_categories: {
      id: number;
      name: string;
    }
  }[]>([]);
  const [cname, setCname] = useState<string>('');
  const [cmdCategory, setCmdCategory] = useState<{
    id: number;
  } | null>(null);
  const [clgCategory, setClgCategory] = useState<{
    id: number;
  } | null>(null);
  const [cmonthly, setCmonthly] = useState<number>(0);
  useEffect(() => {
    const func = async () => {
      if (data) {
        const {
          name,
          monthly_budget,
          medium_categories: {
            large_categories: lgCategory,
            ...mdCategory
          }
        } = data;
        setCname(name);
        setClgCategory(lgCategory);
        setCmdCategory(mdCategory);
        setCmonthly(monthly_budget);
      }
      else {
        setCname('');
        setClgCategory(null);
        setCmdCategory(null);
        setCmonthly(0);
      }
    };
    func();
  }, [data]);
  useEffect(() => {
    const func = async () => setLc(clgCategory?.id ?? null);
    func();
  }, [clgCategory]);
  useEffect(() => {
    const func = async () => setMc(cmdCategory?.id ?? null);
    func();
  }, [cmdCategory]);
  useEffect(() => {
    const func = async () => setDisplayedMediumCategories(medium_categories.filter(({ large_categories: { id } }) => id === lc));
    func();
  }, [lc]);
  useEffect(() => {
    const func = async () => setMc(displayedMediumCategories.length > 0 ? displayedMediumCategories[0].id : null);
    func();
  }, [displayedMediumCategories]);
  return (
    <Form method="post">
      <input type="hidden" name="medium_category_id" value={mc ?? ''} />
      <Stack spacing={4}>
        <LargeCategorySelect
          largeCategories={large_categories}
          value={lc}
          setValue={setLc}
        />
        <MediumCategorySelect
          largeCategoryId={lc}
          value={mc}
          setValue={setMc}
          options={displayedMediumCategories}
        />
        <TextField
          name="name"
          type="text"
          required
          fullWidth
          label="名称"
          placeholder="分類名を入力"
          value={cname}
          onChange={(event) => setCname(event.target.value)}
        />
        <TextField
          fullWidth
          name="monthly_budget"
          type="number"
          required
          label="予算額"
          placeholder="1000"
          value={cmonthly}
          onChange={(event) => setCmonthly(parseFloat(event.target.value))}
        />
        <BackButton />
        <Button
          type="submit"
          color="success"
          startIcon={<SaveIcon />}
          fullWidth
          variant="contained"
        >
          保存
        </Button>
      </Stack>
    </Form>
  );
}