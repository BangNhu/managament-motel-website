// TokenDataLoader.ts
import { useEffect, useState } from 'react';
import { getTokenData } from './check-token';

const useTokenData = () => {
    const [tokenData, setTokenData] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTokenData();
            setTokenData(data);
        };

        if (tokenData === null) {
            fetchData();
        }
    }, [tokenData]);

    return tokenData;
};

export default useTokenData;
