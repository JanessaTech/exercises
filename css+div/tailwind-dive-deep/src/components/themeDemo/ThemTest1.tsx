

const ThemeTest1 = () => {
    return (
        <div className="grid grid-cols-4 grid-rows-5 grid-flow-col">
            <div>
                <div>1. How to defined custom variable in theme</div>
                <div>Note: In tailwind.config.ts, define pair midnight: "hsl(96 100% 50%)" in theme.extend.colors</div>
                <div>
                    <div className="text-midnight">
                        <span>Janessa</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThemeTest1