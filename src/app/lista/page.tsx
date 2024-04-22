'use client'
import Boards from "../../../components/Boards"
import {SessionProvider} from "next-auth/react";

 export default function Home() {
  return(
      <SessionProvider>
          <div>
              <Boards/>
          </div>
      </SessionProvider>

  );
 }
