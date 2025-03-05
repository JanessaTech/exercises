
const ListTest = () => {
    return (
        <div className="grid grid-cols-5 grid-rows-5 gap-5">
            <div className="bg-red-300">
                <div>1. How to use list-inside list-image</div>
                <div>
                    <ul className="list-inside my-3">
                        <li className="list-image-[url(https://media.geeksforgeeks.org/wp-content/uploads/20240303100755/academic-cap.png)]">5 cups chopped Porcini mushrooms</li>
                        <li className="list-image-[url(https://media.geeksforgeeks.org/wp-content/uploads/20240303100851/battery.png)]">1/2 cup of olive oil</li>
                        <li className="list-image-[url(https://media.geeksforgeeks.org/wp-content/uploads/20240303100856/bell-alert.png)]">3lb of celery</li>
                    </ul>
                </div>
            </div>
            <div className="bg-red-300">
                <div>1. How to use list-outside list-disc</div>
                <div>
                    <ul className="list-outside my-3 list-disc">
                        <li>5 cups chopped Porcini mushrooms</li>
                        <li>1/2 cup of olive oil</li>
                        <li>3lb of celery</li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default ListTest