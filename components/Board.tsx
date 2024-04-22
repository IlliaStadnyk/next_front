'use client'

import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const Board: React.FC = () => {
    const {data: session} = useSession();
    const [boardData, setBoardData] = useState<Array<{ id: string, title: string, content: Array<{ text: string }> }>>([]);
    console.log(session?.accessToken);



    const data = async function fetchData(id: string, accessToken: string) {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/show-board/'+id, {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            const data = await response.json();
            setBoardData(data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        if(session?.accessToken){
            const token = typeof session?.accessToken === 'string' ? session.accessToken : '';
            console.log('tokken', token);
            data('9b8c26e2-ea02-4038-a2e2-73d1036ee65a', token);
        }
    }, [session]);

    return (
        <div>
            {boardData ? boardData.map((item) => (
                <div key={item.id}>
                    <h2>{item.title}</h2>
                </div>
            )): null}
        </div>

    );

}

export default Board