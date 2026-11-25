import { createClient } from '~/utils/supabase.server';
import type { Route } from './+types/chat_page';
import { AIFeature } from '~/ai_feature/gemini.server';
import type { Interactions, Model } from '@google/genai';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { readItems, readLargeCategories, readMediumCategories, readMoneyStatus, readSmallCategories } from '~/ai_feature/tools/db_read.server';
import { insertItem, insertLargeCategory, insertMediumCategory, insertMoneyStatus, insertSmallCategory } from '~/ai_feature/tools/db_insert.server';
import { updateItem, updateLargeCategory, updateMediumCategory, updateMoneyStatus, updateSmallCategory } from '~/ai_feature/tools/db_update.server';
import { deleteItem, deleteLargeCategory, deleteMediumCategory, deleteMoneyStatus, deleteSmallCategory } from '~/ai_feature/tools/db_delete.server';
import { DEFAULT_MODEL, SYSTEM_INSTRUCTION_NORMAL } from '~/ai_feature/constants.server';
import { allDatabaseDeclarations } from '~/ai_feature/tools/index.server';
import { data, redirect } from 'react-router';
import ChatCard from './chat_card';
import Box from '@mui/material/Box';
import ChatForm from './chat_form';

export function mata(): Route.MetaDescriptors {
  return [
    {
      title: 'チャット',
    },
    {
      name: 'description',
      content: 'Gemini 4とチャット',
    },
  ];
}

const geminiClient = AIFeature.createClient();

export async function action({
  request
}: Route.ActionArgs) {
  const formData = await request.formData();
  const { supabase, headers } = createClient(request);
  const name = formData.get('name');
  const model = formData.get('model');
  const prompt = formData.get('prompt');
  if (typeof name === 'string') {
    const args = formData.get('args');
    const stepId = formData.get('step_id');
    if ((!args || typeof args === 'string') && typeof stepId === 'string') {
      const funcArgs = JSON.parse(args || '{}');
      let result: any;
      switch (name) {
        case 'read_items':
          result = await readItems(supabase);
          break;
        case 'read_large_categories':
          result = await readLargeCategories(supabase);
          break;
        case 'read_medium_categories':
          result = await readMediumCategories(supabase);
          break;
        case 'read_small_categories':
          result = await readSmallCategories(supabase);
          break;
        case 'read_money_status':
          result = await readMoneyStatus(supabase);
          break;
        case 'insert_item':
          result = await insertItem(supabase, funcArgs);
          break;
        case 'insert_large_category':
          result = await insertLargeCategory(supabase, funcArgs);
          break;
        case 'insert_medium_category':
          result = await insertMediumCategory(supabase, funcArgs);
          break;
        case 'insert_small_category':
          result = await insertSmallCategory(supabase, funcArgs);
          break;
        case 'insert_money_status':
          result = await insertMoneyStatus(supabase, funcArgs);
          break;
        case 'update_item':
          result = await updateItem(supabase, funcArgs);
          break;
        case 'update_large_category':
          result = await updateLargeCategory(supabase, funcArgs);
          break;
        case 'update_medium_category':
          result = await updateMediumCategory(supabase, funcArgs);
          break;
        case 'update_small_category':
          result = await updateSmallCategory(supabase, funcArgs);
          break;
        case 'update_money_status':
          result = await updateMoneyStatus(supabase, funcArgs);
          break;
        case 'delete_item':
          result = await deleteItem(supabase, funcArgs);
          break;
        case 'delete_large_category':
          result = await deleteLargeCategory(supabase, funcArgs);
          break;
        case 'delete_medium_category':
          result = await deleteMediumCategory(supabase, funcArgs);
          break;
        case 'delete_small_category':
          result = await deleteSmallCategory(supabase, funcArgs);
          break;
        case 'delete_money_status':
          result = await deleteMoneyStatus(supabase, funcArgs);
          break;
      }
      const resultStep: Interactions.FunctionResultStep = {
        call_id: stepId,
        result,
        type: 'function_result',
      };
      const interaction = await geminiClient.interactions.create({
        model: DEFAULT_MODEL,
        tools: allDatabaseDeclarations.map(value => ({
          type: 'function',
          ...value
        })),
        input: [
          resultStep,
        ],
        system_instruction: SYSTEM_INSTRUCTION_NORMAL,
    });
      throw redirect(`chat/${interaction.id}`, { headers });
    }
  }

  if (typeof model === 'string' && typeof prompt === 'string') {
    const interaction = await geminiClient.interactions.create({
      model,
      input: prompt,
      tools: allDatabaseDeclarations.map(value => ({
        type: 'function',
        ...value
      })),
      system_instruction: SYSTEM_INSTRUCTION_NORMAL,
    });
    throw redirect(`chat/${interaction.id}`, { headers });
  }
}

type ChatPageDataType = {
  model: string;
  models: Model[];
  interactions: Interactions.Interaction[];
}

export async function loader({
  params: {
    chatid
  }
}: Route.LoaderArgs) {
  const models: Model[] = [];
  for await (const model of await geminiClient.models.list())
    models.push(model);
  const result: ChatPageDataType = {
    model: DEFAULT_MODEL,
    models,
    interactions: [],
  };
  if (!chatid)
    return data(result, 200);
  let interaction = await geminiClient.interactions.get(chatid);
  result.model = interaction.model ? `models/${interaction.model}` : DEFAULT_MODEL;
  result.interactions.push(interaction)
  while (interaction.previous_interaction_id) {
    interaction = await geminiClient.interactions.get(interaction.previous_interaction_id);
    result.interactions.push(interaction);
  }
  return data(result, 200);
}

export default function ChatPage({
  loaderData: {
    interactions,
    model,
    models
  }
}: Route.ComponentProps) {
  return (
    <Paper>
      <Stack spacing={4}>
        {interactions.map(value => <ChatCard interaction={value} />)}
      </Stack>
      <Box
        sx={{
          position: 'sticky',
          bottom: 0,
          left: 0,
        }}
      >
        <ChatForm models={models} defaultModel={model} />
      </Box>
    </Paper>
  );
}