export default function ProductDetailLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        {children}
        <h2>Features products</h2>
      </> 
    );
  }
  