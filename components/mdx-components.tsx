// components/mdx-components.tsx
import Image from "next/image";
import Link from "next/link";

export const components = {
  // 替換標準 HTML 標籤
  h1: (props: any) => (
    <h1 {...props} className="text-3xl font-bold text-blue-600 my-4" />
  ),
  a: (props: any) => {
    // 判斷是否為內部連結，使用 Next.js 的 Link 優化跳轉
    const isInternal =
      props.href && (props.href.startsWith("/") || props.href.startsWith("#"));
    if (isInternal) {
      return <Link {...props} className="text-blue-500 hover:underline" />;
    }
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        {...props}
        className="text-blue-500 hover:underline"
      />
    );
  },
  // 自定義元件 (後端 MDX 裡可以直接寫 <Alert />)
  Alert: ({
    children,
    type = "info",
  }: {
    children: React.ReactNode;
    type: string;
  }) => (
    <div
      className={`p-4 rounded border ${type === "error" ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-200"}`}
    >
      {children}
    </div>
  ),
};
