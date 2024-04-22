'use client'

import {SessionProvider} from "next-auth/react";
import Board from "../../../../components/Board";

export default function Home() {
    return(
        <SessionProvider>
            <div>
                <Board></Board>
            </div>
        </SessionProvider>

    );
}