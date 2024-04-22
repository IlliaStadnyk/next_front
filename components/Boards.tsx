'use client';
import { list } from "postcss";
import React, { useEffect, useState } from "react";
import {getServerSession} from "next-auth";
import {SessionProvider, useSession} from "next-auth/react";
// import {session} from "next-auth/core/routes";

const Boards: React.FC = () => {
  const [boards, setBoards] = useState<Array<{ id: string, title: string, body: string, name: string }>>([]);
  const {data: session  } = useSession();
  const handleClick = () => {
    fetchData();
  };
  const handleDelete = async (boardId: number) => {
    try {
      // Отправить запрос на сервер для удаления поста с указанным идентификатором
      const response = await fetch(`http://3.143.224.54/api/posts/${boardId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Добавьте любые необходимые заголовки, например, авторизационный токен
          'Authorization': `Bearer ${session?.accessToken}`,
        },
      });
      if (response.ok) {
        // Пост успешно удален, обновите список постов
        fetchData(); // Предположим, что у вас есть функция для загрузки данных
      } else {
        // Обработайте сценарий ошибки, если не удалось удалить пост
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://3.143.224.54/api/posts",{
        method: 'GET',
        headers: {
          Accept: "application/ld+json",
          authorization: `Bearer ${session?.accessToken}`,
        },

      });
      const responseData = await response.json();
      const data = responseData.data;
      console.log(data);
      console.log("token",session?.accessToken)
      setBoards(data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
      <SessionProvider session={session}>
        <div>
          <button style={{backgroundColor: 'red'}} onClick={handleClick}>Click here!!!!</button>
          <h1>Posts</h1>
          <div className="grid grid-cols-2 text-white p-4">
            <div>
              {/* Итерация по списку "lists" и отображение каждого элемента */}
              {boards === undefined || boards.length===0 ? (
                      <div>After Log in click on &ldquo;Click here!!!!&rdquo;. </div>
                ) : (
                boards.map((board, index  ) => (
                    <div key={index} style={{padding: '10px', margin: '15px 30px', backgroundColor: "blue"}}>
                      <b>Title: {board.title}</b>
                      <ul style={{marginLeft: '20px'}}>
                        Body: {board.body}
                      </ul>
                      <button onClick={() => handleDelete(board.id)}>Delete</button>
                    </div>
                ))
              )}
            </div>
          </div>
        </div>
      </SessionProvider>

  );
}

export default Boards;
