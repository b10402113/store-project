// app/blog/[slug]/page.tsx
import { MDXRemote } from "next-mdx-remote/rsc"; // 注意這裡引入的是 /rsc
import { notFound } from "next/navigation";
import { components } from "@/components/mdx-components"; // 引入上面的設定
// 模擬從後端獲取資料的函數
async function fetchMdxFromBackend(slug: string) {
  // 這裡替換成你真實的 fetch 請求
  // const res = await fetch(`https://api.yourbackend.com/posts/${slug}`);
  // const data = await res.json();

  // 模擬回傳資料
  return {
    title: "Next.js v15 與 MDX",
    // 這是後端回傳的原始 MDX 字串
    content: `
# 哈囉，Next.js v15!

這是一段來自 **後端** 的內容。

- 支援 Markdown 語法
- 也支援 React Component
    `,
  };
}

// Next.js v15 params 需要 await
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPage({ params }: Props) {
  const { slug } = await params; // v15 變更點：params 必須被 await
  const data = await fetchMdxFromBackend(slug);

  if (!data) {
    return notFound();
  }

  return (
    <article>
      <MDXRemote
        source={data.content}
        components={components} // 傳入對照表
      />
    </article>
  );
}
