import { useState, useEffect } from 'react'

const useDebounce = (value, delay = 250) => {

    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {

        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => clearTimeout(handler)
    })

    return debouncedValue

}

export default useDebounce