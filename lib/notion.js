import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Notion上のデータベースに含まれるページのリストを取得する
// 「公開」にチェックが入っているものだけ取得するように制限をかける
export const getDatabase = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter:{
      or:[
        {
          property: "公開",
          checkbox:{
            equals: true,
          }
        }
      ]
    }
  });
  return response.results;
};

// PageIDを取り出す
export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId) => {
  const blocks = [];
  let cursor;
  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId,
    });
    blocks.push(...results);
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }
  return blocks;
};
