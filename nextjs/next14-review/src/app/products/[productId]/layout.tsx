// function getRandomInt(count: number) {
//   return Math.floor(Math.random() * count)
// }

export default function ProductDetailLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    // const random = getRandomInt(2)
    // if (random === 1) {
    //   throw new Error('Error loading products by JanessaTech')
    // }
    return (
      <>
        {children}
        <h2>Features products</h2>
      </> 
    );
  }
  