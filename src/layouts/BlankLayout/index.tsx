import { Shell } from '@alifd/next';

export default function BlankLayout({ children }: { children: React.ReactNode }) {
  return (
    <Shell
      style={{
        minHeight: '100vh',
      }}
      type="brand"
      fixedHeader={false}
    >
      <Shell.Content>{children}</Shell.Content>
    </Shell>
  );
}
