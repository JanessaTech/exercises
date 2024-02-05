import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const Item = ({index}) => {
    return (
        <Box sx={{ width: 500, height:100, my: 2, border:'10px solid blue', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Typography> index = {index}</Typography>
        </Box>
    )
}

function generateArray(start, count) {
    var res = []
    for (var i = start; i < start + count; i++) {
        res.push(i)
    }
    return res
}

export default function InfiniteScrollDemo() {
    const [items, setItems] = useState([])
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        const data = generateArray(0, 12)
        setItems(data)
    }, [])

    const fetchMoreData  = () => {
        console.log('fetchMoreData ....')
        const newItems = generateArray(items.length, 10)
        setItems([...items, ...newItems])
        if (items.length + newItems.length > 50) {
            setHasMore(false)
        } else {
            setHasMore(true)
        }
    }


    return (
        <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Typography>Loading...</Typography>}
        >
            
            {
                items.map( (item) => (
                    <Item index={item}/>
                ))
            }
    
        </InfiniteScroll>
    )
}

