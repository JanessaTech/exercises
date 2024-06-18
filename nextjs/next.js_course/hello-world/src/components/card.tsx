const Card = ({children}: {children: React.ReactNode}) => {
    const cardstyle = {
        padding: "100px",
        margin:"10px",
        boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2)",
        display:"flex",
        justifyContent: "center"
    };
    return <div style={cardstyle}>{children}</div>
}

export default Card;