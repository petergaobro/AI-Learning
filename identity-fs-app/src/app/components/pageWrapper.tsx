import { type ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
  title: string;
  description?: string;
  className?: string;
};

const PageWrapper = ({
  children,
  title,
  description,
  className,
}: PageWrapperProps) => {


  return (
    <>
      <div>
        <title>{title}</title>
        <meta
          name="description"
          content={description ?? "Identity-fs-collective"}
        />
      </div>
      <main className={className ?? "bg-white pb-2"}>
        {children}
      </main>
    </>
  );
};

export default PageWrapper;