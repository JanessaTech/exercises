
export default function ReviewDetails({params}: {params: {
    slug: string[]
}}) {
    if (params.slug.length === 2) {
        return (<div>view docs for feature {params.slug[0]} from concept {params.slug[1]}</div>)
    } else if (params.slug.length === 1) {
        return (<div>view docs for feature {params.slug[0]}</div>)
    }
    return (
      <div>Doc home page</div> 
    );
  }