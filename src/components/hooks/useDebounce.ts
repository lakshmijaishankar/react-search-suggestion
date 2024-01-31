import { useEffect, useState } from "react";


export const useDebounce = <T>(value: T, delay: number = 100): T => {
    const [debounceValue, setDebounceValue] = useState<T>(value)
    useEffect(() => {
        let clearTime = setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        return () => {
            clearTimeout(clearTime)
        }
    }, [value])
    return debounceValue;
}